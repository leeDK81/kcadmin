# KC Admin UX 패턴 가이드

> HTML 컴포넌트 패턴·CSS 클래스 레퍼런스. 신규 화면 구현 전 먼저 확인.

## CSS 클래스 레퍼런스

### 배지 (Badge)

```css
.badge-draft    /* 📝 임시저장 — 회색 */
.badge-review   /* ⏳ 승인요청 — 주황 */
.badge-active   /* 🟢 라이브 — 초록 */
.badge-approved /* ✔ 승인완료 — 파랑 */
.badge-paused   /* ⏸ 일시중지 — 갈색 */
.badge-rejected /* 반려 — 빨강 */

.badge-risk     /* Risk-type 카드 배지 — 주황빨강 */
.badge-evidence /* Evidence 카드 배지 — 초록 */
.badge-concept  /* Concept 카드 배지 — 파랑 */
.badge-rule     /* Rule 카드 배지 — 다크레드 */
.badge-policy   /* Policy 카드 배지 — 회색 */

.badge-public   /* 고객 공개 — 파랑 (Risk-type, Concept) — 목록 화면 전용, 편집기 미표시 */
.badge-baseline /* 공통 기준 — 주황 (Rule) — 목록 화면 전용, 편집기 미표시 */
.badge-internal /* 내부 전용 — 회색 (Evidence, Policy, Playbook) — 목록 화면 전용, 편집기 미표시 */
```

### 버튼 (Button)

```css
.btn-primary   /* 주 액션 — 네이비 */
.btn-secondary /* 보조 액션 — 흰색 테두리 */
.btn-danger    /* 위험 액션 — 빨강 */
.btn-success   /* 완료 액션 — 초록 */
.btn-warn      /* 경고 액션 — 주황 */
.btn-sm        /* 소형 버튼 (5px 10px) */
```

### 배너 (Banner)

```css
.banner-info    /* 파란 안내 박스 */
.banner-warn    /* 노란 경고 박스 */
.banner-error   /* 빨간 오류 박스 */
.banner-success /* 초록 성공 박스 */
```

### 카드 태그 (Card Tag — AIO/참조 페이지용)

```css
.ct-risk     /* Risk-type */
.ct-evidence /* Evidence */
.ct-concept  /* Concept */
.ct-rule     /* Rule */
.ct-policy   /* Policy */
```

## HTML 컴포넌트 패턴

### 사이드바 (전 파일 공통)

```html
<nav class="sidebar">
  <div class="sidebar-logo">KC Admin</div>
  <a href="01_guide.html"><i class="fa-solid fa-clipboard-list fa-fw"></i> 업무 가이드</a>
  <a href="02_dashboard.html"><i class="fa-solid fa-chart-bar fa-fw"></i> 대시보드</a>
  <div class="nav-divider"></div>
  <a href="03_card-library.html"><i class="fa-solid fa-folder-open fa-fw"></i> 카드 라이브러리</a>
  <a href="04_risk-type-list.html" style="padding-left:20px"><i class="fa-solid fa-circle-exclamation fa-fw"></i> ① Risk-type</a>
  <a href="05_evidence-list.html" style="padding-left:20px"><i class="fa-solid fa-database fa-fw"></i> ② Evidence</a>
  <a href="06_concept-list.html" style="padding-left:20px"><i class="fa-solid fa-lightbulb fa-fw"></i> ③ Concept</a>
  <a href="07_rule-list.html" style="padding-left:20px"><i class="fa-solid fa-scale-balanced fa-fw"></i> ④ Rule</a>
  <a href="08_policy-list.html" style="padding-left:20px"><i class="fa-solid fa-file-shield fa-fw"></i> ⑤ Policy</a>
  <a href="16_playbook-list.html" style="padding-left:20px"><i class="fa-solid fa-bullseye fa-fw"></i> ⑥ Playbook</a>
  <span class="nav-locked" style="padding-left:20px"><i class="fa-solid fa-lock fa-fw"></i> ⑦ Case 🔒</span>
  <div class="nav-divider"></div>
  <a href="09_review-workflow.html"><i class="fa-solid fa-check-double fa-fw"></i> 검수·승인</a>
  <a href="00_canvas-main.html"><i class="fa-solid fa-diagram-project fa-fw"></i> 연결·테스트·배포</a>
  <a href="18_system-settings.html"><i class="fa-solid fa-sliders fa-fw"></i> 시스템 설정</a>
  <a href="19_faq-rag.html" style="padding-left:20px"><i class="fa-solid fa-list-check fa-fw"></i> FAQ Q&A</a>
  <div class="nav-divider"></div>
  <a href="00_design-system.html"><i class="fa-solid fa-palette fa-fw"></i> 디자인 시스템</a>
  <a href="13_answer-logic.html"><i class="fa-solid fa-sitemap fa-fw"></i> AI 답변 생성 로직</a>
  <a href="15_aio-guide.html"><i class="fa-solid fa-magnifying-glass fa-fw"></i> AIO 가이드</a>
  <a href="12_coverage-code-table.html"><i class="fa-solid fa-table-list fa-fw"></i> 담보코드</a>
</nav>
```

### 카드 편집기 뼈대 (2/3/5-card 구조)

```html
<!-- LEFT 컬럼: 편집 폼 -->
<div>
  <!-- Card ①: 기본정보 -->
  <div class="card">
    <div class="card-header">
      <div class="card-header-left">
        <span class="card-header-title">새 {카드유형} 카드</span>
        <span class="badge badge-draft">임시저장</span>
      </div>
    </div>
    <!-- 폼 필드들 -->
  </div>

  <!-- Card ②: 연결 패널 (해당 카드에만) -->
  <!-- Card N: 액션 -->
  <div class="card">
    <div class="action-bar">
      <button class="btn btn-secondary" onclick="saveDraft()">
        <i class="fa-regular fa-floppy-disk"></i> 임시저장
      </button>
      <button class="btn btn-primary" onclick="requestReview()">
        <i class="fa-solid fa-paper-plane"></i> 검수 요청
      </button>
    </div>
    <div class="status-guidance">
      <i class="fa-solid fa-circle-info fa-fw"></i>
      <span><strong>현재 상태: 임시저장</strong> — 작성이 완료되면 [검수 요청] 버튼을 클릭하세요.</span>
    </div>
  </div>
</div>

<!-- RIGHT 컬럼: wf-tracker -->
<div>
  <div class="wf-tracker">
    <div class="wf-title">이 카드의 작업 흐름</div>
    <div class="wf-step">
      <div class="wf-num wf-num-on">①</div>
      <div class="wf-body">
        <div class="wf-label wf-label-on">내용 입력 <span class="wf-tag">현재</span></div>
        <div class="wf-hint">내용과 연결 카드를 입력하세요</div>
      </div>
    </div>
    <div class="wf-step">
      <div class="wf-num wf-num-off">②</div>
      <div class="wf-body">
        <div class="wf-label wf-label-off">검수 요청</div>
        <div class="wf-hint">[검수 요청] 클릭 → 검수자에게 전달</div>
      </div>
    </div>
    <div class="wf-step">
      <div class="wf-num wf-num-off">③</div>
      <div class="wf-body">
        <div class="wf-label wf-label-off">승인완료</div>
        <div class="wf-hint">검수자 승인 후 승인완료 상태</div>
      </div>
    </div>
    <div class="wf-step">
      <div class="wf-num wf-num-off">④</div>
      <div class="wf-body">
        <div class="wf-label wf-label-off">라이브</div>
        <div class="wf-hint">Clark AI에 반영됩니다</div>
      </div>
    </div>
  </div>
</div>
```

### 연결 선택 UI (approved(승인완료) 및 active(라이브) 카드 연결 가능)

```html
<select class="form-control">
  <optgroup label="🟢 라이브 (연결 가능)">
    <option value="EV001">EV001 암 평균 입원 진료비 (심평원 2024)</option>
  </optgroup>
  <optgroup label="✔ 승인완료 (연결 가능 — 준비 연결)">
    <option value="EV004">EV004 고혈압 유병률 (HIRA 2024)</option>
  </optgroup>
  <optgroup label="⏳ 승인요청 (연결 불가)" disabled>
    <option disabled>EV005 승인 대기 중</option>
  </optgroup>
  <optgroup label="📝 임시저장 (연결 불가)" disabled>
  </optgroup>
</select>
```

### 목록 테이블 구조

```html
<table class="list-table" style="table-layout:fixed;width:100%">
  <thead>
    <tr>
      <th style="width:100px;white-space:nowrap">상태</th>
      <th style="width:200px;white-space:nowrap">코드·명칭</th>
      <!-- 전용 컬럼들 -->
      <th style="width:110px;white-space:nowrap">수정일</th>
      <th style="width:80px;white-space:nowrap">액션</th>
    </tr>
  </thead>
  <tbody id="tableBody"></tbody>
</table>
```

**컬럼 폭 배분 (가용 폭 996px = 1280px − 220px 사이드바 − 64px 패딩):**

| 파일 | 상태 | 코드·명칭 | 전용 컬럼 | 연결 컬럼 | 수정일 | 액션 | auto |
|---|---|---|---|---|---|---|---|
| 04 Risk-type | 100px | 200px | 중요도 80px | 참조Rule 320px | 110px | 80px | 설명 106px |
| 05 Evidence | 100px | 185px | 출처기관 140px | 참조Rule 230px | 110px | 80px | 지표명·기준값 151px |
| 06 Concept | 100px | 245px | Risk-type 200px + 동의어수 140px | — | 110px | 80px | 동의어 121px |
| 07 Rule | 90px | 245px | Risk-type 160px | Evidence auto + Policy 180px | 110px | 80px | — |
| 08 Policy | 100px | 230px | 공개범위 110px | 적용Rule 145px | 110px | 80px | 출력제한 221px |

### 목록 페이지 공통 패턴 (2026-06-24 확정)

**Filter 탭 순서 — 6개 목록 파일 공통:**
```html
<button class="filter-tab active" onclick="filter('all',this)">전체 <span id="c-all"></span></button>
<button class="filter-tab" onclick="filter('active',this)">🟢 라이브 <span id="c-active"></span></button>
<button class="filter-tab" onclick="filter('approved',this)">✔ 승인완료 <span id="c-approved"></span></button>
<button class="filter-tab" onclick="filter('review',this)">⏳ 검수중 <span id="c-review"></span></button>
<button class="filter-tab" onclick="filter('draft',this)">📝 임시저장 <span id="c-draft"></span></button>
<button class="filter-tab" onclick="filter('paused',this)">⏸ 일시중지 <span id="c-paused"></span></button>
<button class="filter-tab" onclick="filter('rejected',this)">🚫 반려 <span id="c-rejected"></span></button>
```

**액션 버튼 — 상태별, 색상 없이 `btn btn-sm` 단일 스타일:**
```javascript
function actionBtns(d) {
  const id = d.id || d.code;
  const editUrl = `XX_card-editor-TYPE.html?id=${id}`;  // 파일별 URL 교체
  if (d.status === 'draft')    return `<a href="${editUrl}" class="btn btn-sm">편집</a> <button onclick="delCard('${id}')" class="btn btn-sm">삭제</button>`;
  if (d.status === 'review')   return `<button onclick="cancelReview('${id}')" class="btn btn-sm">요청취소</button>`;
  if (d.status === 'approved') return `<a href="00_canvas-main.html" class="btn btn-sm">캔버스에서 연결</a> <a href="${editUrl}" class="btn btn-sm">편집</a>`;
  if (d.status === 'active')   return `<button onclick="pauseCard('${id}')" class="btn btn-sm">일시중지</button> <a href="${editUrl}" class="btn btn-sm">편집</a>`;
  if (d.status === 'paused')   return `<button onclick="resumeCard('${id}')" class="btn btn-sm">재시작</button> <a href="${editUrl}" class="btn btn-sm">편집</a>`;
  if (d.status === 'rejected') return `<a href="${editUrl}" class="btn btn-sm">편집</a> <button onclick="delCard('${id}')" class="btn btn-sm">삭제</button>`;
  return `<a href="${editUrl}" class="btn btn-sm">편집</a>`;
}
// Playbook 예외: approved → '라이브 전환' (캔버스 연결 불필요, 직접 라이브 가능)
```

> 인라인 색상 스타일 금지. `btn-danger`, `btn-warn`, `btn-success` 목록 행에 사용 금지.
> 신규 등록 버튼: `<a href="XX_card-editor.html" class="btn btn-primary">` — 색상 override 금지.

### Toast 알림

```js
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
```

```html
<div class="toast" id="toast"></div>
```

## CASE 매트릭스 — KC매칭 × Playbook감지

> **진실원:** `context/answer-logic.md` "Case 1~4 분기 매트릭스" 섹션. 캔버스·답변 화면 구현 시 반드시 원본을 대조한다 (여기 재서술하지 않음 — 단일 진실원 원칙).

---

## CONNECT_RULES (카드 연결 정책)

> **진실원:** `context/card-policy.md` "CONNECT_RULES" + "카드 연결 카디널리티" 섹션. 카드 연결은 캔버스(00_canvas-main.html)에서만 수행 — 편집기에서는 읽기 전용 배지 + "캔버스에서 변경" 버튼만 표시.

---

## 캔버스 UX 패턴 (00_canvas-main.html)

### 피커 패널 컬럼 헤더

```html
<div class="picker-col">
  <div class="picker-col-hd">CONCEPT</div>
  <!-- 카드 아이템 반복 -->
  <div class="picker-card" onclick="selectCard('CN001')">
    <div class="pc-title">암보험 보장 내용</div>
    <div class="pc-id">CN001</div>
  </div>
</div>
```

### 그리드 섹션 헤더 (연결됨 / 연결 가능)

```html
<!-- 연결됨 (초록) -->
<div class="gc-section-hd sh-connected">
  <i class="fa-solid fa-link" style="font-size:9px"></i> 연결됨
  <span style="font-weight:400;opacity:.7">(N)</span>
</div>

<!-- 연결 가능 (파란) -->
<div class="gc-section-hd sh-available">
  <i class="fa-solid fa-circle-plus" style="font-size:10px"></i> 연결 가능
  <span style="font-weight:400;opacity:.7">(N)</span>
</div>
```

### 그리드 카드 상태 배지

```html
<!-- active 카드 -->
<span class="gc-status-badge gc-badge-live">라이브</span>

<!-- review 카드 -->
<span class="gc-status-badge gc-badge-approved">승인완료</span>

<!-- review 엣지 경로 배지 -->
<span class="gc-review-badge">연결 검수중</span>
```

### 연결 추가 버튼 (연결 가능 카드)

```html
<button class="btn gc-btn-connect" onclick="addConnection('RU001','EV004')">
  <i class="fa-solid fa-circle-plus"></i> 연결 추가
</button>
```

### 캔버스 전용 CSS 클래스

```css
.gc-section-hd.sh-connected { color:var(--status-active); background:rgba(15,110,86,.06) }
.gc-section-hd.sh-available { color:var(--step-active); background:rgba(26,58,107,.07) }
.gc-card.gc-available { border-style:solid!important; border-width:1.5px!important; background:rgba(26,74,154,.04) }
.gc-btn-connect { border-color:var(--step-active); background:var(--step-active); color:#fff; width:100%; justify-content:center }
.gc-status-badge { font-size:9px; font-weight:700; padding:1px 6px; border-radius:3px; flex-shrink:0; margin-left:auto }
.gc-badge-live     { background:rgba(15,110,86,.1); color:var(--status-active) }
.gc-badge-approved { background:rgba(26,74,154,.1); color:var(--status-approved) }
.gc-review-badge   { font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(184,119,34,.15); color:#B87722 }
```

---

## Risk-type 중요도 라디오 패턴

다중 Risk-type이 동시 감지될 때 노출 순서를 결정하는 중요도 설정 UI.
우선순위: ①중요도 서열(높음 > 보통 > 낮음) → ②선택 조건 충족 개수(시스템 자동) → ③최근 배포순.
가중치(×3/×2/×1) 완전 제거됨 — 코드·문서에서 사용 금지. 중요도는 서열로만 판단.

```html
<div class="form-group">
  <label>중요도 <span style="color:var(--card-risk)">*</span>
    <span class="field-hint">다중 감지 시 노출 순서: ①중요도 → ②선택 조건 충족 개수(시스템 자동) → ③최근 배포순. 운영자는 이 중요도만 설정합니다.</span>
  </label>
  <div style="display:flex;gap:24px;margin-top:8px;padding:12px 14px;background:#FAFAF8;border:1px solid var(--border);border-radius:6px">
    <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
      <input type="radio" name="priority" value="high">
      <span style="color:#A32D2D;font-weight:700">높음</span>
      <span style="color:var(--text-hint);font-size:12px">핵심 — 동시 감지 시 선노출</span>
    </label>
    <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
      <input type="radio" name="priority" value="mid" checked>
      <span style="color:#BA7517;font-weight:700">보통</span>
      <span style="color:var(--text-hint);font-size:12px">기본값 (미설정 시 자동 적용)</span>
    </label>
    <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
      <input type="radio" name="priority" value="low">
      <span style="color:var(--text-hint);font-weight:700">낮음</span>
      <span style="color:var(--text-hint);font-size:12px">보조 — 상위 유형 노출 후 후순위</span>
    </label>
  </div>
  <!-- 가중치(×3/×2/×1) 레이블 없음. 높음/보통/낮음 서열만 사용. -->
</div>
```

적용 위치: `04_card-editor-risk-type.html` — 설명(desc) 필드와 리드스코어(leadScore) 필드 사이.

---

## Rule 조건 빌더 — 필수/선택 라디오 패턴

각 조건 행에 필수/선택 구분을 설정하는 라디오 UI. 조건 행 컬럼 ⑥ 위치.

```javascript
function reqRadioHtml(id, isRequired) {
  const req = isRequired !== false;
  return `<div style="display:flex;flex-direction:column;gap:5px;padding-top:1px">
    <label style="display:flex;align-items:center;gap:4px;cursor:pointer;font-size:12px">
      <input type="radio" name="req-${id}" value="required"${req?' checked':''} style="accent-color:var(--status-rejected);width:13px;height:13px">
      <span style="color:#A32D2D;font-weight:700">필수</span>
    </label>
    <label style="display:flex;align-items:center;gap:4px;cursor:pointer;font-size:12px">
      <input type="radio" name="req-${id}" value="optional"${!req?' checked':''} style="accent-color:var(--text-hint);width:13px;height:13px">
      <span style="color:var(--text-hint);font-weight:600">선택</span>
    </label>
  </div>`;
}
```

**소스별 기본값:**
- MYDATA / PROFILE: `isRequired = true` (필수)
- PROMAGE: `isRequired = false` (선택 — 미연동 사용자 대응)

**동작 원칙:**
- 필수: 미충족 시 Rule 미발동 (AND)
- 선택: 미충족 시에도 Rule 발동. 충족 개수 → Risk-type 우선순위 2순위에 활용

적용 위치: `07_card-editor-rule.html` — 각 조건 행(MYDATA/PROMAGE/PROFILE) 기준값 열 다음, 삭제 버튼 이전.

### Risk-type 목록 중요도 배지 CSS

```css
.pri-high { background:rgba(163,45,45,.1); color:#A32D2D; font-weight:700; }
.pri-mid  { background:rgba(186,117,23,.1); color:#BA7517; font-weight:700; }
.pri-low  { background:rgba(152,155,162,.12); color:var(--text-hint); font-weight:400; }
```

목록 테이블 헤더에 "중요도" 컬럼(80px) 추가 — 코드·명칭 다음, 설명 이전.

---

## Policy 편집기 확정 필드

Policy 카드는 필드 2개만 사용. 나머지 필드(규제 문서명, 적용 범위, 핵심 조항 요약, 출력 대상 화면, 출력 제한 설정, 준수 체크리스트)는 완전 제거됨 — 코드·화면 어디에도 노출 금지.

```html
<!-- Policy 편집기 폼 — 2개 필드만 -->
<div class="form-group">
  <label>Policy 이름 <span style="color:var(--card-policy)">*</span></label>
  <input type="text" class="form-control" id="policyName" placeholder="예: 암 특약 면책 고지">
</div>
<div class="form-group">
  <label>Clark 앱 표시 문구 <span style="color:var(--card-policy)">*</span>
    <span class="field-hint">Clark 앱 화면에 표시되는 면책 고지 문구. 비워두면 검수 요청 불가.</span>
  </label>
  <textarea class="form-control" id="appDisplayText" rows="5"
    placeholder="고객에게 표시될 면책 고지 문구를 직접 작성하세요."></textarea>
</div>
```

**승인 2단계:** 도메인 검수자 → 준법감시인.
**목적:** 운영자가 Clark 앱 표시 면책 고지 문구를 직접 작성.

적용 위치: `08_card-editor-policy.html`

---

## Playbook 편집기 — Standalone 답변 가이드

Standalone 답변 가이드는 선택사항. 비워두면 Clark 기본 안내 문구 사용.

```html
<div class="form-group">
  <label>Standalone 답변 가이드
    <span class="badge-optional" style="font-size:11px;color:var(--text-hint);font-weight:400">(선택)</span>
    <span class="field-hint">비워두면 Clark 기본 안내 문구가 사용됩니다.</span>
  </label>
  <textarea class="form-control" id="standaloneGuide" rows="5"
    placeholder="(선택) Clark이 이 Playbook을 단독으로 사용할 때의 안내 문구를 작성하세요."></textarea>
</div>
```

**확정 규칙:**
- 최소 키워드: 3개 (필수)
- CTA 기본 버튼(`consult`) 필수
- Standalone 답변 가이드: 선택. 최소 글자 수 제한 없음
- approved 상태에서 캔버스 연결 없이 직접 "라이브 전환" 가능

> "최소 20자 필수" 표현 완전 삭제. 코드·화면 어디에도 노출 금지.

적용 위치: `16_card-editor-playbook.html` (Playbook 편집기 Card ② Standalone 섹션)

---

## RAG 아키텍처 참조

| 구분 | 관리 방식 | 운영자 개입 | 관련 화면 |
|---|---|---|---|
| 약관 RAG | 자동 파이프라인 (크롤러 자동) | 불가 | — |
| Clark 서비스 FAQ RAG | 운영자 직접 등록 → 즉시 인덱스 등록 (승인 없음) | 가능 | `19_faq-rag.html` |
| Fallback | 18_system-settings.html 설정 적용 | 설정만 | `18_system-settings.html` |

KC 체인 매칭 실패 시 순서: RAG(약관 → Clark 서비스 FAQ) → Fallback.
경쟁사·외부 서비스 언급 금지 등 제한은 Fallback 설정에서 관리.

---

## 금지어 목록

→ **`guides/copywriting.md` 참조.** 이 파일에 복사하지 않는다.

---

## 폰트·CSS 변수 (guides/design-system.md 참조)

폰트 CDN, 타이포그래피 스케일, :root 변수 전체 목록은 **`guides/design-system.md`** 참조.
신규 파일 작성 시 `guides/design-system.md`의 `:root 필수 변수 목록`을 반드시 포함할 것.
