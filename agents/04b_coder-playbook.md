> **참조:** `CLAUDE.md` · `context/card-types.md` · `context/answer-logic.md` · `guides/ux-patterns.md` · `guides/design-system.md`

---

# Agent 04b — Playbook 편집기 전담 코더

## 역할

`16_card-editor-playbook.html` 및 `16_playbook-list.html` 구현·수정 전담.
Playbook 설계 결정 전체는 `context/decisions.md > Playbook MVP` 섹션 참조.

---

## extraActions 배열 패턴

```javascript
const TYPE_ICON = {consult:'💬', deeplink:'🔗', external:'🌐'};
const TYPE_OPTS = `
  <option value="consult">💬 상담 연결</option>
  <option value="deeplink" selected>🔗 앱 내 이동</option>
  <option value="external">🌐 외부 링크</option>`;

let extraActions = []; // {id, type, label, link}
let extraSeq = 0;

function addExtraAction() {
  const id = ++extraSeq;
  extraActions.push({id, type:'deeplink', label:'', link:''});
  renderExtraActions();
}
function removeExtraAction(id) {
  extraActions = extraActions.filter(a => a.id !== id);
  renderExtraActions();
  updatePreview();
}
function updateExtraField(id, field, val) {
  const a = extraActions.find(a => a.id === id);
  if (a) { a[field] = val; updatePreview(); }
}
```

---

## updatePreview() — 미리보기 + Card ③ 활성화 연동

```javascript
function updatePreview() {
  const t1 = document.getElementById('act1Type').value;
  const l1 = document.getElementById('act1Label').value || '버튼명 입력';

  // 앱 미리보기
  let html = `<span class="preview-btn preview-btn-primary">${TYPE_ICON[t1]} ${l1}</span>`;
  extraActions.forEach(a => {
    html += `<span class="preview-btn preview-btn-secondary">${TYPE_ICON[a.type]||'🔗'} ${a.label||'버튼명 입력'}</span>`;
  });
  document.getElementById('btnPreview').innerHTML = html;

  // sum-box 전환 액션 요약
  const sumAct = document.getElementById('sumAct');
  if (sumAct) sumAct.textContent = extraActions.length > 0 ? `${l1} 외 ${extraActions.length}개` : l1;

  // Card ③ 스코어링 활성화 (상담 연결 버튼 1개라도 있으면 활성)
  const hasConsult = t1 === 'consult' || extraActions.some(a => a.type === 'consult');
  document.getElementById('scoring-inactive').style.display = hasConsult ? 'none' : 'flex';
  document.getElementById('scoring-active').style.display   = hasConsult ? 'flex' : 'none';
  document.getElementById('scoring-num').style.background   = hasConsult ? 'var(--card-playbook)' : '#D0CFC9';
  document.getElementById('scoring-num').style.color        = hasConsult ? '#fff' : '#888';
}
```

---

## Standalone 카운터 패턴

```javascript
function updateStandaloneCounter() {
  const val = document.getElementById('standaloneGuide').value;
  const len = val.length;
  const span = document.getElementById('standaloneCount');
  span.textContent = len + '자';
  if (len <= 150) {
    span.style.color = 'var(--text-hint)'; span.style.fontWeight = '400';
  } else {
    span.style.color = '#BA7517'; span.style.fontWeight = '400';
  }
}
```

`standaloneGuide`는 **선택 항목**. `requestReview()`는 standaloneGuide 길이로 진행을 차단하지 않는다.

---

## 상태별 액션 버튼 (16_playbook-list.html)

```javascript
function actionBtns(d) {
  const edit = `<a href="16_card-editor-playbook.html" class="btn btn-sm"
    onclick="event.stopPropagation()" style="margin-right:4px">편집</a>`;
  const map = {
    draft:    edit + `<button class="btn btn-sm btn-danger-sm" onclick="event.stopPropagation();act('delete','${d.id}')">삭제</button>`,
    review:   `<button class="btn btn-sm" onclick="event.stopPropagation();act('cancel','${d.id}')">요청 취소</button>`,
    approved: `<button class="btn btn-sm btn-primary" onclick="event.stopPropagation();act('live','${d.id}')">라이브 전환</button>` + edit,
    active:   `<button class="btn btn-sm btn-warn" onclick="event.stopPropagation();act('pause','${d.id}')">일시중지</button>` + edit,
    paused:   `<button class="btn btn-sm btn-secondary" onclick="event.stopPropagation();act('resume','${d.id}')">재시작</button>` + edit,
  };
  return map[d.status] || edit;
}

function act(type, id) {
  const msgs = {delete:'삭제하시겠습니까?', cancel:'검수 요청을 취소합니까?',
    live:'라이브로 전환합니까?', pause:'일시중지합니까?', resume:'재시작합니까?'};
  if (!confirm(msgs[type])) return;
  const next = {delete:null, cancel:'draft', live:'active', pause:'paused', resume:'active'};
  if (next[type] === null) { DATA.splice(DATA.findIndex(d=>d.id===id), 1); }
  else { const d = DATA.find(d=>d.id===id); if(d) d.status = next[type]; }
  render();
}
```

---

## Playbook 체크리스트

**16_card-editor-playbook.html**
- [ ] Card ①: 공개범위 form-group 없음 (내부 전용 고정, 편집기 미표시 — 목록 화면에서만 badge-internal 배지 표시)
- [ ] Card ②: `act1Type` select + `act1Label` input + `act1Link` input (기본 버튼 필드)
- [ ] Card ②: `extra-actions` div에 추가 버튼 동적 렌더링 (`addExtraAction()` / `removeExtraAction(id)`)
- [ ] Card ②: `btnPreview` div에 `updatePreview()` 실시간 렌더링
- [ ] Card ②: Standalone 답변 가이드 textarea — border-top 구분선으로 구분. chip-opt(선택) 배지. placeholder="비워두면 Clark 기본 안내 문구 사용". minlength 없음.
- [ ] Card ②: Standalone 발동 조건 배너 (`.banner-info`, "KC 카드 미매칭 + Playbook 키워드 감지 시(Case 4)")
- [ ] Card ②: Standalone 배너 링크 → `14_answer-logic-guide.html` (`17` 파일 사용 금지)
- [ ] Card ②: `standaloneCount` span + `updateStandaloneCounter()` 함수 (20자 미만 빨간색 로직 없음)
- [ ] Card ②: `requestReview()`는 standaloneGuide 길이로 차단하지 않음 (선택 항목)
- [ ] Card ③: `scoring-inactive` / `scoring-active` 토글 구현
- [ ] Card ③: `scoring-num` 배지 배경색 동적 변경
- [ ] Card ③: "Phase 1.5 이관" 표시 (헤더·본문·sum-box 행)
- [ ] sum-box: "GA 수신 스펙 확정 후" 표시

**16_playbook-list.html**
- [ ] 상태 필터 탭: 전체/임시저장/승인요청/승인완료/라이브/일시중지
- [ ] 상태별 액션 버튼 패턴 정확한가? (review: 요청취소만, approved: 라이브전환+편집)
- [ ] 행 클릭 → `16_card-editor-playbook.html` 이동
