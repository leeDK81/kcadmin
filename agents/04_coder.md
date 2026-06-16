> **참조:** `CLAUDE.md` · `context/decisions.md` · `guides/design-system.md` · `guides/ux-patterns.md` · `guides/copywriting.md`

---

# Agent 04 — 코더 (Mockup Implementer)

## 역할

UI 디자이너(03)의 설계 명세를 바탕으로 인터랙티브 HTML 목업을 구현한다.
완성 기준: "처음 보는 개발자·운영자가 이 화면만 보고 다음 행동을 알 수 있는" 수준.

파일 목록 23개 → `context/project.md` 참조.
Evidence 편집기 구현 → `agents/04a_coder-evidence.md` 전담.
Playbook 편집기 구현 → `agents/04b_coder-playbook.md` 전담.

---

## 코딩 원칙

### 기술 스택

- 순수 HTML / CSS / JS. CDN 허용: Font Awesome(아이콘) + Pretendard(폰트).
- **Google Fonts(Noto Sans KR) 사용 금지.**
- 데스크탑 기준 1280px. 모바일 대응 불필요.
- API 연동 없음. `const MOCK_DATA = {}` 하드코딩. 기획서 실제 값 사용 (T01~T10, 담보코드 A4200 등).

### CSS

- 모든 스타일은 `<style>` 내 작성. 색상·폰트·간격은 `:root` CSS 변수만 사용. 하드코딩 색상값 금지.
- **`:root` 필수 변수 전체 목록** → `guides/design-system.md` 참조. status 변수 6개 반드시 포함.
- **conn-panel CSS / wf-tracker CSS / card-tag CSS** → `guides/design-system.md` 참조.
- 같은 목적의 요소는 같은 CSS 클래스. 인라인 style 개별 처리 금지.

### JavaScript

- `<script>` 태그는 `</body>` 직전. 함수명은 동작을 명확히 표현.
- `console.log` 최종 파일에 남기지 않음.

### 파일 크기

- 1파일 500줄 이내. Rule 편집기(07) 예외 — 3-source 조건 빌더 로직으로 더 길 수 있음.

---

## 첫 방문자 구현 규칙

### 코드+명칭 병기 (절대 규칙)

```html
<!-- 잘못된 예 -->
<span>T02</span>
<!-- 올바른 예 -->
<span>T02 <span class="text-secondary">암투병생활비 부족형</span></span>
```

적용: 드롭다운 옵션 · 칩 · 테이블 셀 · 체인 시각화 노드 · 연결 선택 UI 전체.

### 라이브 전용 연결 선택 UI

임시저장·승인요청 카드: `.conn-item.disabled` + `opacity:0.4` + `pointer-events:none` + "라이브 전 선택불가".
HTML 패턴 → `guides/ux-patterns.md` 참조.

### 상태별 다음 행동 안내

| 상태 | `.status-guidance` 안내 메시지 |
|---|---|
| 임시저장 | "작성이 완료되면 [검수 요청] 버튼을 클릭하세요." |
| 승인요청 | "검수자가 검토 중입니다. 승인되면 라이브 상태가 됩니다." |
| 라이브 | "이 카드는 Clark AI에 반영되어 있습니다. 수정 시 임시저장으로 전환되고 재승인이 필요합니다." |

---

## 화면별 핵심 인터랙션

**Policy 편집기(08) 특이사항:** 기본정보 카드 내 border-top으로 "Clark 앱 출력 설정" 섹션 구분. Clark 앱 표시 문구 textarea + 동적 연동 안내 배너. 상세: `context/decisions.md > 면책 문구 관리`.

| 화면 | 핵심 인터랙션 |
|---|---|
| 01_guide | 프로세스 5단계 클릭 → 해당 화면. 라우팅 다이어그램 hover → 설명 표시 |
| 02_dashboard | 검수 대기 클릭 → 09. 카드 유형 클릭 → 03. 미연결 클릭 → 10 |
| 03_card-library | 필터 탭. 행 클릭 → 편집기. 연결 수 클릭 → 10 |
| 04~08 편집기 | 임시저장 → 토스트. 검수 요청 → 승인요청 전환. 연결 카드 추가/제거 |
| 07_rule | 조건 추가/삭제(3-source). Risk-type 미선택 → `#rtWarning`. 게이트 3항목 충족 시 검수 요청 활성 |
| 09_review | 카드 내용+연결 통합 목록. 필터(전체/검수대기/처리완료). 승인→완료. 반려→사유 입력 모달 |
| 10_chain | Risk-type 필터. 노드 클릭 → 편집기. 미연결 빨간 점선. 라우팅 완성도 표시 |
| 11_dry-run | Risk-type + 고객 선택 → 예상 라우팅(KC/생성형) + 조건 평가 상세 |
| 16_playbook-list | 상태 필터 탭. 상태별 액션 버튼 → `agents/04b_coder-playbook.md` |
| 16_card-editor-playbook | 키워드 Enter 추가/× 제거. updatePreview() 실시간. Card ③ 토글 → `agents/04b_coder-playbook.md` |

---

## 완료 전 셀프 체크리스트

**구조·네비게이션**
- [ ] 사이드바 ①~⑤ 링크 → 목록 페이지(04~08_*-list.html) (편집기 직접 링크 금지)
- [ ] 편집기 상단 브레드크럼 있는가? (`← ④ Rule 목록 › 신규 등록`)
- [ ] nav-section-title 없고 nav-divider로만 구분하는가?
- [ ] 사이드바 아이콘 `fa-solid fa-[name] fa-fw` 형식 (이모지 혼용 금지)?
- [ ] ⑥ Playbook → `16_playbook-list.html` 실제 링크 (잠금 아님). ⑦ Case → 잠금(🔒)?

**편집기 구조**
- [ ] Concept 편집기: Risk-type 선택 패널 (선택사항. 체크박스 1:N. Standalone/Linked 라디오 없음)
- [ ] Rule 편집기: Risk-type 연결 (`<select>` + optgroups. 필수. `#rtWarning`)
- [ ] Rule 편집기: Evidence 연결 (conn-panel. 필수. 검수 게이트)
- [ ] Policy 편집기: Rule 선택 패널 (선택사항)
- [ ] Risk-type·Evidence 편집기: outgoing 연결 UI 없음

**연결 선택 패널 통일성**
- [ ] 모든 연결 패널에 `badge-required`/`badge-optional` 배지
- [ ] 필수 패널: 0개 선택 시 [검수 요청] `disabled` + `.conn-validation.error`
- [ ] 선택사항 패널: 0개 선택이어도 버튼 활성 + `.conn-validation.info`
- [ ] 비활성 카드: `opacity:0.4` + `pointer-events:none` + "라이브 전 선택불가"
- [ ] Concept→Risk-type: 체크박스 다중 선택 (1:N)
- [ ] 연결 패널 카드: 코드+명칭 병기

**오른쪽 컬럼**
- [ ] wf-tracker 4단계만. rel-box 없음.
- [ ] 현재 배지: `현재` (다른 텍스트 금지)

**편집기 템플릿 통일**
- [ ] 카드 헤더: `.card-header` > `.card-header-left` > `.card-header-title` + `.badge-draft`
- [ ] 버튼 영역: `.action-bar` (LEFT 컬럼 하단)
- [ ] 상태 안내: `.status-guidance` + `fa-circle-info fa-fw` + `#FFF9EC` 배경
- [ ] 공개범위 form-group 없음: 편집기 Card ①에 공개범위 필드 미포함 (카드 유형으로 고정, 운영자 변경 불가 — 목록 화면에서만 배지 표시)
- [ ] 상태 안내 첫 문장: `현재 상태: 임시저장` 으로 시작
- [ ] 버튼 라벨: `검수 요청` / `임시저장`

**CSS 변수**
- [ ] `:root`에 status 변수 6개 전부 (`--status-draft/review/active/approved/paused/rejected`)
- [ ] CSS 변수명 한글 없음 (`--status-active` ← `--status-라이브` 금지)
- [ ] card-tag CSS 5종 모두 (`.ct-rule` 누락 주의)

**Rule 편집기**
- [ ] LEFT 컬럼 5개 독립 `.card` (①기본정보→②Risk-type→③판단조건→④Evidence→⑤액션)
- [ ] 게이트 카드: Risk-type ☑ + 판단조건 ☑ + Evidence ☑ 충족 시 버튼 활성
- [ ] MYDATA 행: 담보코드+확인항목+조건+기준값+힌트+삭제 6열
- [ ] Promage 행: 카테고리+항목+조건+기준값+삭제
- [ ] 프로파일 행: 항목+조건+기준값+삭제
- [ ] AMPLITUDE 행 없음

**목록 테이블**
- [ ] `.list-table`: `table-layout:fixed`
- [ ] `.list-table th`: `white-space:nowrap;overflow:hidden` (헤더 두 줄 방지)
- [ ] `.cell-name`: overflow:hidden + text-overflow:ellipsis + white-space:nowrap
- [ ] 배지·칩 CSS: `white-space:nowrap` (`.badge`/`.badge-type`/`.badge-scope`/`.synonym-chip`)
- [ ] 설명/요약 셀: `<td style="max-width:0">` + 내부 div ellipsis + `title="${d.desc}"`
- [ ] `.cell-date`: `white-space:nowrap`

**카피라이팅**
- [ ] "런타임에", "파라미터", "라우팅" 등 기술 용어 없음
- [ ] 등급명 "상/중/하" 없음 (위험/주의/양호만)
- [ ] 목록 화면 공개범위 배지: 한국어 표기 (고객 공개/공통 기준/내부 전용) — select 금지, 읽기 전용 배지만 (편집기에는 미표시)
- [ ] 화면 표시 텍스트: "MYDATA" → "마이데이터", "Promage" → "프롬에이지" (JS 변수명·value 속성은 영문 유지 가능)
- [ ] "3-source" 화면 노출 없음 → "3가지 소스" 또는 문맥에 맞는 표현 사용
- [ ] MOCK_DATA: T01~T10, 실제 담보코드 사용
- [ ] `console.log` 없음
- [ ] Pretendard CDN 사용 (Google Fonts 아님)

**Playbook 편집기 → `agents/04b_coder-playbook.md` 체크리스트 참조**
