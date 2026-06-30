# KC Admin — 세션별 변경 이력

> 에이전트가 참조하지 않는 히스토리 문서. 에이전트는 `CLAUDE.md` → `context/` → `agents/` 순서로 읽는다.

---

## 2026-06-30 — 전수감사 2차 소스코드 검증 · 13개 파일 잔재 수정

### 수정 파일 (커밋 76f81db)

| 파일 | 내용 |
|---|---|
| `mockups_v2/shared.js` | "26개 파일" → "24개 파일" 수 정정 |
| `mockups_v2/shared.css` | 동일 |
| `mockups_v2/00_design-system.html` | 화면 목록 26개→24개, 삭제된 11_dry-run·14 항목 제거, 17·18·19 링크 추가, 이모지 제거 |
| `mockups_v2/00_canvas-main.html` | 삭제된 11_dry-run.html 링크 제거→alert 대체, "연결 검수중"→"승인요청 엣지" |
| `mockups_v2/01_guide.html` | 11_dry-run.html 링크 → 00_canvas-main.html 캔버스 패널로 교체 |
| `mockups_v2/02_dashboard.html` | 제거된 T06 항목 삭제, "(Rule 검수중)"→"(Rule 승인요청)" |
| `mockups_v2/04_risk-type-list.html` | 필터탭·ST 객체 "검수중" → "승인요청" 통일 |
| `mockups_v2/05_evidence-list.html` | 동일 |
| `mockups_v2/06_concept-list.html` | 동일, CO006 riskTypes에서 T06 참조 제거 |
| `mockups_v2/07_rule-list.html` | 동일, RU005 riskType T06 참조 제거 |
| `mockups_v2/08_policy-list.html` | 동일, `limit` 컬럼 → `appDisplayText` 컬럼으로 교체 (데이터·헤더·렌더 함수 일괄) |
| `mockups_v2/13_answer-logic.html` | GA 전달 데이터 예시 "(부분 매칭)"→"(임베딩 의미 유사도)" |
| `mockups_v2/17_system-data-guide.html` | Risk-type 설명 "T01~T10"→"T01~T23" |

### 검증 방법

스크린샷 18개 시각 검증 + grep 전수 패턴 검사 (`11_dry-run`, `10_chain-visualizer`, `26개 파일`, `검수중`, `T01~T10`, `부분 매칭`, `명칭 미확인`, `T06 납입`, `.limit`, `badge-scope`, `badge-conn-cr/pr`, `banner-info` 단독 사용 등)

---

## 2026-06-30 — 전수 감사 결과 일괄 수정 (🔴🟡 이슈 전체 해소)

### 삭제
| 파일 | 사유 |
|---|---|
| `mockups_v2/10_chain-visualizer.html` | 캔버스 UX v2로 대체됨. 사이드바에서도 제거됨 |
| `mockups_v2/11_dry-run.html` | `00_canvas-main.html` 사전 테스트 패널로 통합됨 |

### 기획 정합성 수정
| 파일 | 내용 |
|---|---|
| `mockups_v2/13_answer-logic.html` | Concept→Risk 연결 "선택사항" → "필수 (미연결 시 KC 체인 진입 불가)" |
| `mockups_v2/13_answer-logic.html` | Concept 매칭: 키워드 일치 방식 → 임베딩 의미 유사도 (코사인 유사도 ≥ 기준값) |
| `mockups_v2/13_answer-logic.html` | Playbook 감지: "사용자 발화 부분 매칭" → 임베딩 의미 유사도 (2곳) |
| `mockups_v2/13_answer-logic.html` | 약관 RAG 가능 상태: "③ 상태에서만" → "상태 ③④에서 가능" |
| `mockups_v2/13_answer-logic.html` | Risk-type 정렬: "카드코드 오름차순" → ①중요도 서열 → ②선택조건 충족 개수 → ③최근 배포순 |
| `mockups_v2/13_answer-logic.html` | Policy 필드: `limit`/`scope` → `appDisplayText` (단일 진실원 필드) |
| `policy/02_card-purpose.html` | Concept 매칭: "완전 일치/포함 일치" → 임베딩 의미 유사도, 타이브레이킹도 정합성 수정 |

### context/ 업데이트
| 파일 | 내용 |
|---|---|
| `context/impact-map.md` | policy/ 파일명 3개 정정, 10·11 참조 전체 제거, 섹션 12 RAG 함수명 업데이트 |
| `context/workflow.md` | "사전 테스트 (11_dry-run.html)" → "캔버스 사전 테스트 패널 (00_canvas-main.html)" |
| `context/project.md` | policy/ 9개 → 10개, 09_matching-policy 추가, 파일 목록 26개 → 24개 |
| `context/decisions.md` | A3201 공통 이슈 T코드 표기 정리 |
| `context/card-policy.md` | 타입코드 섹션 T01~T10 → T01~T23 확장, T11~T23 행 추가 |

### agents/ 업데이트
| 파일 | 내용 |
|---|---|
| `agents/03_ui-designer.md` | review↔approved 배지 혼동 수정, "연결 검수중" 배지 제거 |
| `agents/04_coder.md` | T코드 범위 T01~T23, risk→rule 카디널리티 "정확히 1개 (1:1)" |
| `agents/06_spec-reviewer.md` | 섹션 E T코드 체크리스트 T01~T23 전체로 확장 |
| `agents/07_insurance-expert.md` | T11~T23 섹션 신규 추가 |
| `agents/08_ui-reviewer.md` | 경로 `mockups/` → `mockups_v2/` |

### guides/ + 공통 업데이트
| 파일 | 내용 |
|---|---|
| `guides/insurance-domain.md` | T11~T23 섹션 추가 (T01~T23 전체) |
| `guides/copywriting.md` | T코드 범위 T01~T23 업데이트 |
| `mockups_v2/shared.js` | `CARD_NAMES`에 EV005 추가 |
| `mockups_v2/00_design-system.html` | `.badge-locked` 미정의 주석 추가 |

### HTML UI 수정
| 파일 | 내용 |
|---|---|
| `policy/01~08_*.html` (8개) | 사이드바에 `09_matching-policy.html` 링크 추가 |
| `mockups_v2/08_policy-list.html` | `.badge-scope`/`.sc-internal` → shared.css `.badge-internal`로 교체 |
| `mockups_v2/12_coverage-code-table.html` | h1 이모지 제거, `class="banner-info"` → `class="banner banner-info"` (3곳) |
| `mockups_v2/16_card-editor-playbook.html` | `banner-purple` → `banner banner-info` |
| `mockups_v2/09_review-workflow.html` | `badge-conn-cr/pr` → `badge-concept`/`badge-policy` |
| `mockups_v2/07_card-editor-rule.html` | hint 텍스트 이모지 제거 |

---

## 2026-06-30 — 리팩터링 후속 버그 수정 · PROFILE 레이아웃 수정

### 변경 사항

| 파일 | 내용 |
|---|---|
| `mockups_v2/00_canvas-main.html` | `.test-profile-row`에 `flex-wrap:wrap;gap:8px 14px;overflow:hidden` 추가 → 사전 테스트 패널 PROFILE 항목 줄바꿈 |
| `mockups_v2/00_canvas-main.html` | `.panel-bd`에 `overflow-x:hidden` 추가 → 패널 가로 스크롤 방지 |
| `mockups_v2/shared.css` | `.form-control`에 `max-width:100%;box-sizing:border-box` 추가 → 체인경로 select 가로 overflow 방지 |
| `mockups_v2/11_dry-run.html` | `buildProfileInputHTML(fields)` 함수 개선: row1/row2 구분 제거 → 단일 flex-wrap 컨테이너, select `width:72px` 고정, 반환 div에 `width:100%` 추가 |
| `mockups_v2/11_dry-run.html` | `.custom-profile-wrap`에 `overflow:hidden` 추가 |
| 26개 HTML 전체 | `href="../shared.css"` → `href="shared.css"` 경로 오류 일괄 수정 |
| 11개 HTML (스크립트 순서 오류) | `<script src="shared.js">` 위치를 인라인 `<script>` **앞**으로 이동 — `renderSidebar is not defined` 에러 수정 |
| `mockups_v2/00_canvas-main.html` | `--panel-w:480px` CSS 변수 복원 (리팩터링 중 `:root` 블록 제거 시 같이 삭제됨) |

### 원인 및 조치 요약

- **경로 오류**: 에이전트들이 `../shared.css` (상위 폴더)로 참조. shared.css/js는 `mockups_v2/` 같은 폴더이므로 상대 경로 불필요. PowerShell 일괄 치환으로 수정.
- **스크립트 순서**: 11개 파일에서 shared.js가 인라인 스크립트 이후에 로드 → `renderSidebar` 미정의 에러. 순서 재정렬로 수정.
- **PROFILE 레이아웃**: 5개 항목(나이/성별/결혼/자녀/운전)이 flex 한 줄에 나열 → 480px 패널에서 우측 항목 overflow. flex-wrap 추가로 수정.
- **체인경로 select overflow**: 긴 option 텍스트가 select 너비를 확장 → `max-width:100%` 추가로 수정.

---

## 2026-06-30 — shared.css + shared.js 구조 리팩터링

### 변경 사항

| 파일 | 내용 |
|---|---|
| `mockups_v2/shared.css` | **신규** — 26개 파일 공통 CSS 단일화 (`:root` 변수 superset, 사이드바, 버튼, 뱃지, 폼, 토스트 등) |
| `mockups_v2/shared.js` | **신규** — 사이드바 렌더링(`SIDEBAR_ITEMS` + `renderSidebar()`), 공통 함수(`showToast`, `toggleStep`), 공통 데이터(`CARD_TYPE`, `TYPE_COLOR`, `CARD_NAMES`, `typeColor`, `cardTag`, `usedChip`) |
| `mockups_v2/` 26개 HTML | 각 파일에 `shared.css` 링크·`shared.js` 스크립트 추가, 사이드바 HTML → `<nav id="sidebar"></nav>` 단일 태그로 교체, 공통 CSS/JS 블록 전체 제거 |
| `context/impact-map.md` | **항목 18 → 22개로 세분화** — 파일 수준 → 변수·함수·CSS 규칙 수준. shared.css/js 도입 반영 (사이드바·CSS토큰·카드타입 3개 항목 추가). 체크리스트도 shared.js 기준으로 갱신 |
| `mockups_v2/11_dry-run.html` | 사전 테스트 PROFILE 입력: 5개 고정 필드 → `profileFields` 배열 기반 동적 렌더링 (`buildProfileInputHTML()` 신규 함수, T02 클러스터 카드 4개에 `age`·`gender` 필드만 표시) |

### 구조 변경 효과

- **사이드바 수정**: `shared.js` → `SIDEBAR_ITEMS` 배열 1곳만 수정 → 26개 파일 자동 반영
- **CSS 디자인 토큰 수정**: `shared.css` → `:root { }` 1곳만 수정 → 26개 파일 자동 반영
- **공통 함수/데이터 수정**: `shared.js` 1곳만 수정 → 즉시 반영
- **각 HTML 파일**: 페이지 고유 CSS/JS만 남겨 파일 크기 대폭 감소

---

## 2026-06-30 — MD 구조 리팩터링 (단일 진실원 + 확장성)

### 변경 사항

| 파일 | 내용 |
|---|---|
| `context/rules.md` | **신규** — 협업 고정 규칙·단일 진실원 원칙·에이전트 수정 조건·업데이트 절차 단일화 |
| `context/impact-map.md` | **신규** — 정책 변경 → 영향 파일 매핑 테이블 (18개 항목, 체크리스트 3종) |
| `CLAUDE.md` | 380줄 → ~100줄 슬림화. 협업 지침 → rules.md 위임. 현재 상태/이력 → CHANGELOG.md. 계층 2에 rules.md·impact-map.md 추가 |
| `guides/ux-patterns.md` | 금지어 목록 16줄 제거 → `guides/copywriting.md` 참조 1줄로 |
| `guides/copywriting.md` | 금지어 단일 원본 유지 (변경 없음) |
| `agents/01_ai-rag-architect.md` | 금지 용어 테이블 9행 제거 → `guides/copywriting.md` 참조 1줄로 |
| `agents/02_po.md` | 진실원 파일 표에 rules.md · impact-map.md 2행 추가 |
| `agents/03_ui-designer.md` | 금지어 테이블 11행 제거 → `guides/copywriting.md` 참조 1줄로 |
| `agents/04_coder.md` | 카피라이팅 체크리스트 10개 → 4줄 단순화 (copywriting.md 참조 + MOCK_DATA/console.log/Pretendard 핵심만) |
| `agents/05_code-reviewer.md` | G 섹션 금지 표현 개별 항목 제거 → `guides/copywriting.md` 참조 1줄로 |
| `agents/06_spec-reviewer.md` | I 섹션 카피라이팅 검수 7개 항목 → `guides/copywriting.md` 참조 1줄로 |
| `agents/08_ui-reviewer.md` | E-1 섹션 11행 표 → 2행으로 단순화 (copywriting.md 참조 + Evidence 구조 핵심만 유지) |

### 구조 변경 원칙

- **단일 진실원**: 금지어는 `guides/copywriting.md` 한 곳에만. 에이전트/가이드는 참조만.
- **impact-map.md**: 정책 변경 시 전수 감사 불필요 — 해당 항목 행만 보고 영향 파일 수정.
- **rules.md**: 협업 규칙·업데이트 절차가 흩어지지 않도록 단일 관리.

---

## 2026-06-30 — 사전 테스트 UX 개선 · Vercel 배포

### 변경 사항

| 파일 | 내용 |
|---|---|
| `mockups_v2/00_canvas-main.html` | ① PROMAGE 조건: 위험/주의/양호 등급 버튼 → 충족/미충족 토글 (MYDATA와 통일) |
| `mockups_v2/00_canvas-main.html` | ② RAG 결과 설정: 약관RAG 제거 → FAQ RAG · LLM Fallback 2버튼. KC미매칭 흐름 3단계로 재구성. |
| `mockups_v2/00_canvas-main.html` | ③ 라이브 전환 버튼: 패널 푸터 고정. KC 통과 + approved 카드 존재 시 표시. 클릭 시 approved→active 전환·캔버스 갱신. |
| `mockups_v2/00_canvas-main.html` | ④ 데모 데이터: PO001 status=approved, RU001→PO001 edge=pending (T01 라이브 전환 시나리오) |
| `context/decisions.md` | 2026-06-30 변경 이력 2건 추가, 미결 항목 1건 추가 (PROFILE 사용 필드만 표시) |
| `CLAUDE.md` | 현재 상태 2026-06-30 섹션 최신화 |

### 결정 근거 — 약관 RAG 제거

약관 RAG는 실사용자의 MYDATA(보험 계약 정보) 없이는 발동 조건 자체를 특정할 수 없음.  
사전 테스트는 운영자 배포 판단 관문이므로 검증 불가 경로를 선택지에 두면 안 됨.  
가상 인물로 테스트 가능한 경로: KC 조건 평가 → FAQ RAG → LLM Fallback.

### 미결 (다음 세션 예정)

- 사전 테스트 PROFILE 입력: 현재 Rule 조건에서 실제 사용 필드만 렌더링

---

## 2026-06-22 — policy 전수검사 + 에이전트 전체 동기화

### 핵심 확정 사항

| 항목 | 이전 | 확정 |
|---|---|---|
| Concept → Risk-type | 선택 (chip-opt) | **필수 (chip-req)** — 미연결 시 KC 체인 미진입 |
| Concept Standalone | 일부 언급 잔존 | **완전 제거** — Case 4(Playbook)가 담당 |
| Policy 카드 필드 | 6개 이상 | **2개만** (Policy 이름 + Clark 앱 표시 문구) |
| Playbook Standalone | 20자 이상 필수 | **선택사항** — 비워두면 Clark 기본 안내 문구 |
| Risk-type 우선순위 | 가중치(×3/×2/×1) | **서열만** (높음>보통>낮음, 가중치 없음) |
| Rule PROMAGE 기본 | 미정 | **required=false** (선택, 미연동 사용자 대응) |
| 금지어 추가 | — | **임계값 → 기준값/판단 기준** |

### 수정 파일 목록

**`mockups_v2/16_card-editor-playbook.html`**
- Standalone 답변 가이드 20자 필수 게이트 제거 → 선택사항
- `requestReview()` 20자 체크 제거
- 카운터 라벨 `(20자 이상 필수)` → `(선택 — 비워두면 Clark 기본 안내 문구 사용)`

**`policy/` 전수검사 — 9개 파일, 총 22건 수정**

| 파일 | 수정 건수 | 주요 내용 |
|---|---|---|
| `00_index.html` | 1건 | 화면 수 26→27개 (19_faq-rag.html 반영) |
| `01_glossary.html` | 6건 | Case 1~4 SOT 매트릭스 재정의, Concept Standalone 없음, 임계값→기준값 |
| `02_card-purpose.html` | 3건 | Concept Risk-type 연결 필수 명시, Policy 출력 제한 잔존 제거, 임계값→기준값 |
| `03_connect-policy.html` | 4건 | Concept→Risk-type 선택→필수, "비활성"→"잠김", Risk-type 유입도 필수 |
| `04_lifecycle.html` | 1건 | "비활성화"→"잠금 처리" (금지어) |
| `05_approval.html` | 0건 | SOT와 완전 일치 — 변경 없음 |
| `06_field-data.html` | 3건 | Concept linkedRiskTypes 필수화, Promage→PROMAGE, 임계값→판단 기준값 |
| `07_permission.html` | 1건 | RAG 유사도 임계값→기준값 |
| `08_screen-policy.html` | 3건 | Policy 목록 준수 상태 제거, Promage→PROMAGE, 임계값 2곳→기준값 |

**지침·가이드·에이전트 전체 동기화 — 14개 md 파일**

| 파일 | 주요 업데이트 |
|---|---|
| `CLAUDE.md` | policy/ 9개 반영, 금지어 임계값 추가 |
| `context/decisions.md` | `## 2026-06-22 확정 사항` 섹션 신규 추가 (7개 결정) |
| `context/project.md` | CONNECT_RULES 필수 명시, Policy 2필드, Case 3/4 RAG 순서 |
| `guides/ux-patterns.md` | Case 매트릭스·CONNECT_RULES·Policy·Playbook·RAG·금지어 7개 섹션 추가 |
| `guides/copywriting.md` | 임계값→기준값 추가, 비활성화 명시, PROMAGE/PROFILE 코드 노트 |
| `agents/01_ai-rag-architect.md` | Case 1~4 재확정, PROMAGE required=false, Policy 2필드, Standalone 선택 |
| `agents/02_po.md` | Rule 소스 기본값, Case 표, CONNECT_RULES, 카드별 역할 표 갱신 |
| `agents/03_ui-designer.md` | Concept 편집기 Standalone 없음, Policy 2필드, Playbook Standalone 선택 |
| `agents/04_coder.md` | Policy 2필드 구현, standaloneGuide 선택사항, PROMAGE required=false |
| `agents/04b_coder-playbook.md` | Standalone 필수→선택, minlength 제거, chip-opt 적용 |
| `agents/05_code-reviewer.md` | Policy 2필드 검수, Standalone 선택 검수 항목 추가 |
| `agents/06_spec-reviewer.md` | 최신 스펙 반영 |
| `agents/07_insurance-expert.md` | Policy 2필드(면책 고지 직접 작성), 약관DB≠Policy 구분 |
| `agents/08_ui-reviewer.md` | Concept Standalone 없음, Policy 2필드, Standalone chip-opt 검수 |

---

## 2026-06-18 — 카드 라이프사이클 재설계 (승인완료 → 캔버스 → Dry-run → 라이브 전환)

### 핵심 변경: 카드 라이프사이클 흐름

**기존:** 승인완료 → 라이브 전환 → 캔버스 연결 → Dry-run
**신규:** 승인완료 → 캔버스 연결(준비 연결, pending edge) → Dry-run → 라이브 전환 → KC Engine 반영

### 수정 파일 목록

**`context/decisions.md`**
- 카드 라이프사이클 섹션 신규 추가 (흐름 테이블 포함)
- 캔버스 표시 범위: `active + review` → `active + approved + review`
- 연결 가능 범위: `active`만 → `active + approved` (준비 연결 개념 추가)
- 카드 상태 배지 매핑 수정: review→"승인요청"(주황), approved→"승인완료"(파랑) [기존 잘못된 매핑 수정]
- pending 엣지(점선 파랑) / active 엣지(실선 초록) 개념 추가

**`context/project.md`**
- 카드 등록 워크플로우 섹션 전면 재작성 (연결 구성 + 라이브 전환 단계 분리)

**`mockups_v2/00_canvas-main.html`**
- CSS: `gc-badge-approved`(파랑 신규), `gc-badge-review`(주황 신규), `gc-badge-pending`, `pk-card-status.approved`
- CARDS 데이터: CN004 status `review` → `approved`
- EDGES 데이터: CN004→RT02 status `review` → `pending`
- `pickerCardHTML`: tri-state 상태 도트 + 라벨 (active/approved/review)
- `chainCardHTML`, `availableCardHTML`: tri-state 상태 배지
- `openConnect` 모달: 준비 연결/연결 추가 분기 설명
- `confirmAction`: edgeStatus 로직 (approved 포함 시 'pending', 모두 active면 'active')
- SVG 마커/선: `arr-review` → `arr-pending` (파랑, 점선); `arr-active`(초록) 구분

**`mockups_v2/09_review-workflow.html`**
- 가이드 박스: 신규 라이프사이클 흐름 설명
- 버튼 로직: pending→"승인완료", approved→"라이브 전환" + "상세 보기"
- `doApprove()` 토스트: "카드 캔버스에서 연결 구성 후 라이브 전환하세요."
- `doGoLive()` 함수 신규 추가

**`mockups_v2/01_guide.html`**
- 카드 등록 흐름 7단계 재작성: ①내용입력→②임시저장→③검수요청→④승인완료→⑤캔버스연결→⑥사전테스트→⑦라이브전환
- 연결 유형 테이블 조건: "라이브 카드만" → "승인완료 이상"
- 연결 원칙 박스: 승인완료 이상 연결 가능, 준비 연결(점선 파랑) 설명 추가
- processData[]: 전 항목 신규 라이프사이클 기준 재작성
- 카드 유형 바로가기: "모든 카드를 라이브로 만든 뒤" → "승인완료된 카드부터"

**`agents/02_po.md`**
- 운영 관점 전체 프로세스: 캔버스 표시 범위 / 연결 범위 / 라이브 전환 단계 추가

**`agents/04_coder.md`**
- 연결 선택 UI: "라이브 전 선택불가" → "승인완료 후 연결 가능"
- 상태별 다음 행동 안내: 승인완료 상태 항목 추가
- 화면별 인터랙션: 00_canvas 항목 전면 업데이트
- 캔버스 체크리스트: 표시 범위·배지·엣지 스타일 업데이트

**`agents/08_ui-reviewer.md`**
- 캔버스 H 체크리스트: 카드 표시 범위, 상태 배지, pending 엣지, review 연결 불가 기준 업데이트

---

## 2026-06-17 (v2 정합성 전수 수정 — 세션 2)

### 전수 검사 및 35개 이슈 일괄 수정

**목적:** v2 캔버스 UX 정책 기반으로 mockups_v2/ 전체 25개 파일 전수 감사 후 모든 이슈 수정

**Pattern B — 편집기 연결 UI v2 전환 (4파일)**
- `04_card-editor-risk-type.html`: CSS var() garbage 수정, Rule 연결 카드 제거, 연결 안내 문구 추가
- `06_card-editor-concept.html`: Risk-type 피커 → 읽기전용 배지 + "캔버스에서 변경" 버튼, JS 5개 함수 제거
- `07_card-editor-rule.html`: Risk-type·Evidence 피커 → 읽기전용 배지, Policy 연결 섹션 완전 제거, JS 20개 함수 제거 (6→6카드, Policy 제거로 5카드 의도이나 약관DB 유지)
- `08_card-editor-policy.html`: Rule 피커 → 읽기전용 배지 + "캔버스에서 변경" 버튼, banner "동적 연동 안내", JS 6개 함수 제거

**Pattern A — wf-tracker ④ 링크 수정 (5파일)**
- 04·05·06·07·08 편집기 — `10_chain-visualizer.html` → `00_canvas-main.html`

**Pattern D — CSS var() 문법 오류 수정**
- `02_dashboard.html`: `.rt-chip.no` color 오류 수정
- `04_card-editor-risk-type.html`: `.badge-rejected` / `.btn-danger` garbage var() 수정

**Pattern C — 폐기 링크 수정 (2파일)**
- `02_dashboard.html`: 배너·stat-card onclick — `10_chain-visualizer.html` → `00_canvas-main.html`
- `03_card-library.html`: 가이드박스·JS chain-link — 동일 교체, Step bar → 6종 카드 배지로 교체

**Pattern E — 폐기 프롬에이지 데이터 교체**
- `02_dashboard.html`: EV004 "프롬에이지 암위험도 등급 분포" → "고혈압 유병률 (HIRA 2024)"
- `03_card-library.html`: RU003 조건 source PROMAGE → MYDATA
- `12_coverage-code-table.html`: 프롬에이지 설명 — "Evidence 카드 참조 전용" → Rule 조건 빌더 소스로 재정의

**개별 이슈 수정**
- `07_rule-list.html`: "적용 Policy" 컬럼 제거
- `04_risk-type-list.html`: 필터 탭 6→4개, 수정일 컬럼 100px→110px
- `05_evidence-list.html`: 수정일 컬럼 100px→110px
- `16_card-editor-playbook.html`: 연결 정보 카드 문구 수정(Phase 1.5+ 예정), Standalone 링크 13→14
- `01_guide.html`: Rule 카드 설명 수정, "드래그 연결" 4건 → "캔버스에서 연결"
- `11_dry-run.html`: "미활성화" → "적용 불가", Case 배지 추가, 소스 레이블 추가
- `05_card-editor-evidence.html`: "연결 정보" 카드 기본정보 카드로 통합
- `00_canvas-main.html`: `.gc-review-badge` CSS 클래스 정의, chainCardHTML 인라인→클래스

**사이드바 전체 표준화 (24개 파일 일괄)**
- `<div class="nav-section">` 레이블 3종 제거 (업무 흐름·참조·시스템) — `nav-divider`만 사용
- 참조 섹션에 `14_answer-logic-guide.html` ("AI 답변 생성 예시") 추가 — 23개 파일 누락 → 전파일 추가
- PowerShell 스크립트로 일괄 처리 (UTF-8 without BOM 보존)

**에이전트·가이드 문서 업데이트 (세션 1 — 캔버스 UX 확정 반영)**
- `context/decisions.md`: 캔버스 v2 UX 전체 섹션, CONNECT_RULES 확정, Playbook 미결 항목 등록
- `context/project.md`: 카드 등록 워크플로우 v2 반영
- `guides/ux-patterns.md`: 사이드바 표준 (14_answer-logic-guide 포함), 캔버스 UX 패턴 섹션
- `agents/02_po.md`: v2 워크플로우 (편집기·캔버스 분리)
- `agents/03_ui-designer.md`: 캔버스 연결 규칙 기준 v2
- `agents/04_coder.md`: 캔버스 체크리스트, 화면별 인터랙션
- `agents/08_ui-reviewer.md`: v2 편집기 연결 UI 검수, 캔버스 체크리스트

---

## 2026-06-17 (v2 캔버스 UX 세션)

### mockups_v2/ 신규 — 카드 캔버스 UX 적용

**신규 파일:**
- `mockups_v2/00_canvas-main.html` — 그래프 기반 카드 연결 캔버스 (v2 핵심 신규)
  - 하드코딩 노드 + SVG bezier 엣지 + 슬라이드 패널(읽기 전용)
  - AI 답변 체인 순서로 배치: Concept → Risk → Rule → Evidence → Policy
  - Playbook 독립 배치 (메인 체인과 병렬)
  - CONNECT_RULES: concept→risk, risk→rule, rule→evidence/policy (Policy outgoing 없음)
  - 패널: viewCard() + viewPanelHTML() — 편집기와 동일 필드 읽기 전용
  - 툴바: 타입 필터 (Concept·Risk·Rule·Evidence·Policy·Playbook 순)

**mockups_v2/ 전체 (24개 복사 + 1개 신규 = 25개):**
- 모든 파일 사이드바 통일: v2 배지 + "카드 캔버스" 메뉴 + chain-visualizer 제거
- 편집기 3종 연결 UI 제거 → 읽기 전용으로 전환:
  - `06_card-editor-concept.html`: Risk-type 체크박스 → 읽기 전용 배지 + "캔버스에서 변경"
  - `07_card-editor-rule.html`: Risk-type select·Evidence 패널 → 읽기 전용 배지
  - `08_card-editor-policy.html`: Rule 선택 목록 → 읽기 전용 배지 + "캔버스에서 변경"

### 가이드·문서 업데이트

- `01_guide.html`: 편집기 흐름 재작성 (연계 카드 선택 제거), 연결 테이블 캔버스 기준, Step3 chain-visualizer→canvas, 카드 등록 순서 → 카드 유형 바로가기
- `13_answer-logic.html`: "프롬에이지 기반 Evidence" 폐기 각주 제거
- 전체 25개 파일: `10_chain-visualizer.html` 사이드바 메뉴 제거

### 에이전트 파일 업데이트

- `CLAUDE.md`: v2 캔버스 UX 현재 상태 반영, mockups_v2/ 폴더 명시
- `context/project.md`: 등록 순서 의존성 제거, 캔버스 연결 방향, 파일 목록 25개
- `context/decisions.md`: v2 캔버스 UX 결정 추가 (연결 정책, CONNECT_RULES, 편집기 읽기 전용, 등록 순서 자유화)
- `agents/02_po.md`: 카드 등록 순서 → 카드 역할 표, chain-visualizer 참조 제거
- `agents/04_coder.md`: 파일 수 25개, 편집기 구조 v2, 화면별 인터랙션 캔버스 추가
- `agents/06_spec-reviewer.md`: 워크플로우 v2 캔버스 기준, 체크리스트 편집기 읽기 전용 기준

---

## 2026-06-17

### 전수 조사 3차 — 정책 정합성 검사 후 추가 수정

**발견 및 수정:**
- `context/project.md` — Evidence 역할 설명 "쿼리 정의"→"공인 외부 통계 등록", "자동 조회"→"운영자 등록 고정값" 수정
- `mockups/15_aio-guide.html` — "프롬에이지 Evidence" 표현 제거, Evidence 공개범위 설명 재작성

---

### 전수 조사 2차 — 잔여 구식 Evidence 참조 전면 수정

**추가 수정 파일:**
- `mockups/17_system-data-guide.html` — FAQ Q2 "프롬에이지 기반 Evidence" 표현 수정, 섹션 3 내용 업데이트
- `mockups/03_card-library.html` — Evidence MOCK_DATA 5종 전면 교체 (stat/fromage → external 공인 통계 명칭)
- `mockups/07_card-editor-rule.html` — Evidence MOCK_DATA 명칭 교체
- `mockups/07_rule-list.html` — Rule evidences 배열 명칭 교체
- `mockups/09_review-workflow.html` — EV001/EV003 명칭 교체
- `mockups/10_chain-visualizer.html` — Evidence 노드 EV001~EV005 명칭 전체 교체
- `mockups/11_dry-run.html` — Evidence 참조 결과 명칭 교체
- `mockups/13_answer-logic.html` — Evidence 2종→단일유형 스펙 표, 출력 예시, 데이터 소스 칩 전면 수정
- `mockups/05_card-editor-evidence.html` — 고아 `.fromage-warn` CSS 제거
- `guides/copywriting.md` — Fromage 예외 규칙 삭제, 보닥통계→공인 외부 통계 표현 수정
- `agents/06_spec-reviewer.md` — 17_system-data-guide Evidence 2종 체크 항목 업데이트

**통일된 Evidence MOCK_DATA 명칭:**
- EV001: '암 평균 입원 진료비 (심평원 2024)' — HIRA
- EV002: '암 5년 생존율 (건보공단 2023)' — NHIS
- EV003: '뇌졸중 평균 입원 진료비 (심평원 2024)' — HIRA
- EV004: '고혈압 유병률 (통계청 2023)' — KOSTAT (draft)
- EV005: '65세 이상 간병보험 미가입률 (금감원 2024)' — FSS

---

### Evidence 아키텍처 재확정 — 공인 외부 통계 기반 단일 유형

**배경:** TF 리뷰에서 Rule의 기준(근거)을 보닥 내부 통계로 설정하면 통계가 바뀔 때마다 Rule 기준이 흔들린다는 문제 제기. 마이데이터·프롬에이지는 어차피 상담 시 자동 전달되므로 별도 Evidence 카드 등록이 불필요하다는 결론.

**확정 사항:**
- Evidence 2종(보닥통계·프롬에이지) → 단일 유형(공인 외부 통계, code: `external`) 전환
- 마이데이터: 상담 시 자동 전달, Evidence 카드 불필요
- 프롬에이지: 상담 시 자동 전달, Evidence 카드 불필요
- 공인 기관 출처: HIRA(심평원) / NHIS(건보공단) / KOSTAT(통계청) / FSS(금감원) / 기타
- 8개 필드: 제목·출처기관·보고서명·기준연도·지표명·기준값(단위 포함)·출처URL(선택)·활용방법
- 조회지표 8종·N-segment 빌더·프롬에이지 출력형식 체크박스 전면 폐기

**업데이트된 파일 (전수 조사):**
- `mockups/05_card-editor-evidence.html` — 폼 전체 재작성 (stat/fromage → external 단일 유형)
- `mockups/05_evidence-list.html` — 유형 뱃지·DATA 배열 업데이트
- `context/decisions.md` — Evidence 섹션 재작성
- `guides/insurance-domain.md` — Evidence 조회지표 8종 → 공인 외부 통계 섹션
- `agents/04a_coder-evidence.md` — 전면 재작성
- `agents/05_code-reviewer.md` — Section F Evidence 체크리스트 업데이트
- `agents/06_spec-reviewer.md` — 라인 24·G섹션 Evidence 항목 업데이트
- `agents/07_insurance-expert.md` — Evidence 조회지표 8종 섹션 → 공인 외부 통계
- `agents/08_ui-reviewer.md` — E-1 Evidence 구조 검수 항목 업데이트
- `agents/01_ai-rag-architect.md` — Evidence 임베딩 전략 항목 업데이트
- `agents/02_po.md` — Evidence 유형 설명·등록순서·화면우선순위 업데이트
- `agents/03_ui-designer.md` — Evidence 유형 2종 → 단일 유형 업데이트
- `CLAUDE.md` — 현재 상태 섹션 업데이트

---

## 2026-06-10

### Evidence 아키텍처 개편
- Evidence 유형 4종 → 2종 확정: 보닥통계(`stat`) + 프롬에이지(`fromage`)
- 마이데이터 기반(mydata) → stat 타입으로 통합
- 질병코드 기반(disease) → 12_coverage-code-table.html 이관

### Evidence 기능 확장
- 조회지표 5종 → 8종 (소액가입비율·평균월보험료·평균납입기간 추가)
- 추가 세그먼트: 단일 select → N-segment 동적 빌더 (행 추가/삭제)
- 프롬에이지 출력형식 체크박스 추가 (절대값/백분위)
- 프롬에이지 필드 코드 hidden 처리 (백단 처리)

### 용어 통일
- MYDATA → 마이데이터, Promage/Fromage → 프롬에이지 (전체 파일)
- 금지어 추가: 3-source / 비활성 / 파라미터 / 런타임 / 매핑

### 에이전트 업데이트
- agents/01~08 전체: Evidence 2종·조회지표 8종·출력형식·용어 반영
- agents/06: Evidence 편집기 정합성 섹션(G) 신규 추가
- agents/08: Evidence 구조 검수 항목 9개 추가
- guides/insurance-domain.md: Risk-type 명칭 정정, 조회지표 8종 표 업데이트

---

## 2026-06-16 세션 후반 (4개 가이드 HTML 정합성 정비)

### 수정 내용

**공통 (4개 파일):**
- 사이드바 `<div class="nav-section">참조 문서</div>` 제거 — nav-divider로만 구분하는 ux-patterns 원칙 적용
  - 대상: `01_guide.html`, `13_answer-logic.html`, `17_system-data-guide.html`, `15_aio-guide.html`

**`01_guide.html`:**
- 연결 유형 표 Playbook 행 수정: "Risk-type 스코어 설정 (독립 설정)" → "발화 키워드·전환 액션 설정 (KC 메인 체인과 독립)"
- Playbook 행 설명: "Risk-type 스코어 참조 → 리드 전환" → "KC 매칭 시 CTA 버튼 추가(Case 2), KC 미매칭 시 Standalone 가이드 기반 답변+CTA(Case 4)"
- 카드 grid Playbook 설명: "Risk-type 스코어 기반 리드 전환 → 원수사·GA에 고객 DB 전달" → "KC 매칭 시 CTA 추가, KC 미매칭 시 Standalone 답변+CTA"
- 사유: Playbook 편집기에 Risk-type 연결 패널 없음; 리드 스코어링 UI는 Phase 1.5 이관

**`17_system-data-guide.html`:**
- `공개범위이 "내부 전용"` → `공개범위가 "내부 전용"` (문법 오류 수정)

**`15_aio-guide.html`:**
- guide-box: `Policy 카드가 출력 범위를 최종 통제합니다` → Evidence·Rule·Policy·Playbook AIO 색인 자동 제외 설명으로 대체
- 사유: Policy는 앱 내 답변 통제, AIO 색인 범위는 공개범위로만 결정

---

## 2026-06-16 세션 (공개범위 편집기 제거 + 용어 복원 + AIO 가이드 개편)

### 핵심 결정

**공개범위 필드 편집기 완전 제거 (2026-06-16 확정)**
- 공개범위는 카드 유형에 따라 자동 고정 → 운영자 변경 불가 → 편집기에 표시 불필요
- 편집기 5개에서 공개범위 form-group 완전 제거: 04_risk-type, 06_concept, 07_rule, 08_policy, 16_playbook
- 목록 화면·card-library에서는 badge-public/baseline/internal 배지 계속 표시

**용어 일괄 복원**
- 지난 세션 잘못 치환된 신조어 → 기획서 원래 용어 복원
- 출력 방식 → 공개범위 / 직접 출력 → 고객 공개 / 판단 전용 → 공통 기준 / 가공 출력 → 내부 전용
- 대상: mockups/*.html, agents/*.md, guides/*.md, context/*.md, CHANGELOG.md

**AIO 가이드 구조 단순화**
- `15_aio-guide.html` ⑥ 운영 기준 섹션 완전 삭제 (③ AIO 활용 필드와 실질적 중복)
- ③ AIO 활용 필드: 고객 공개 카드(Concept·Risk-type) 필드만
- 프롬에이지 caution → ③ 하단 이동 / AIO 효과 측정 ok-box → ⑤ llms.txt 하단 이동
- 문법 수정: `공개범위이` → `공개범위가` 3곳

**`13_answer-logic.html`**
- 예시로 보기 탭 하단 mapping-table: 데이터 출처·답변에 쓰이지 않는 내용 컬럼 165px → 495px

### 변경된 파일

**mockups:**
- `04_card-editor-risk-type.html` — 공개범위 form-group 제거
- `06_card-editor-concept.html` — 공개범위 form-group 제거
- `07_card-editor-rule.html` — 공개범위 form-group 제거
- `08_card-editor-policy.html` — 공개범위 form-group 제거
- `16_card-editor-playbook.html` — 공개범위 form-group 제거
- `13_answer-logic.html` — 컬럼 너비 3배 확장
- `15_aio-guide.html` — ⑥ 섹션 삭제, ③ 단순화, caution/ok-box 이동, 문법 수정

**context/guides/agents:**
- `context/decisions.md` — Playbook Card ① 설명, Policy 편집기 순서 수정, 신규 섹션 2개 추가
- `guides/ux-patterns.md` — badge 주석 "목록 화면 전용" 명시
- `agents/02_po.md` — 공개범위 정책 업데이트
- `agents/03_ui-designer.md` — 편집기 템플릿 확정 요소 업데이트
- `agents/04_coder.md` — 체크리스트 2항목 업데이트
- `agents/04b_coder-playbook.md` — Playbook Card ① 체크리스트 업데이트
- `agents/05_code-reviewer.md` — 공개범위 배지 검증 기준 업데이트
- `agents/06_spec-reviewer.md` — D섹션 전면 개편, Playbook 체크 업데이트, 문법 수정
- `agents/08_ui-reviewer.md` — C섹션 공개범위 배지 행 업데이트

---

## 2026-05-21 세션 (Rule→Risk-type 필수 연결 + CRUD 원칙 확정)

**핵심 결정:**
- Rule 편집기 4-card → **5-card** 구조 확정: ①기본정보 → ②Risk-type 연결(필수) → ③판단 조건 설정 → ④Evidence 연결(필수) → ⑤액션
- Rule→Risk-type 연결: Rule→Evidence 연결과 동등한 **필수 게이트 조건**. 미선택 시 검수 요청 불가.
- 원칙 6에 **CRUD 관점** 추가: Create/Read/Update/Delete 작업 유형이 같으면 동일한 UI 구조 사용.

**변경된 파일:**
- `mockups/01_guide.html` — 카드 연결 표에 Rule→Risk-type 행 추가
- `mockups/07_card-editor-rule.html` — 4-card → 5-card 재편 (Risk-type 별도 연결 패널)
- `mockups/07_rule-list.html` — guide-box 업데이트
- `agents/02_po.md` ~ `agents/08_ui-reviewer.md` — Rule 5-card 반영

---

## 2026-06-08 세션 (Playbook MVP 구현)

**핵심 결정:**
- Playbook 배정 최적화 레이어 MVP 제외 (원수사·GA 내부 관할)
- Playbook 공개범위: 내부 전용 고정
- Playbook 색상: `--card-playbook: #6B4A9A` (보라)
- 버튼 유형 3종 확정: 💬상담연결 / 🔗앱내이동 / 🌐외부링크
- 추가 버튼 N개: extraActions 배열 기반
- Card ③ 스코어링: 상담 연결 버튼이 있을 때만 활성화
- GA 전달 데이터 설정 + 리드 스코어 설정 → deferred

**신규 파일:**
- `mockups/16_playbook-list.html`
- `mockups/16_card-editor-playbook.html`

**일괄 업데이트:**
- 기존 21개 HTML 사이드바: ⑥ Playbook 잠금 → `16_playbook-list.html` 실제 링크로 교체

---

## 2026-06-08 세션 후반 (Rule 3-source 확장 + Evidence 구조 재설계)

**핵심 결정:**
- Rule 조건 빌더 **2-source → 3-source**: MYDATA + Promage + **프로파일** (나이·성별·결혼·자녀·직업위험도·출산예정·거주지)
- AMPLITUDE 완전 제거
- Evidence 편집기 폼 구조 완전 분리: staticSection(집단통계) vs promageSection(프롬에이지)
- 등급명 확정: **위험/주의/양호** (기존 "상/중/하" 오류 수정)
- `12_coverage-code-table.html` 3-tab 구성: MYDATA / 프롬에이지 / 프로파일

**변경된 파일:**
- `mockups/07_card-editor-rule.html` — USER_PROFILE_FIELDS 추가, PROFILE 분기 구현
- `mockups/05_card-editor-evidence.html` — 유형별 분리 폼
- `mockups/12_coverage-code-table.html` — 프로파일 탭 신규, Amplitude 탭 제거

---

## 2026-06-09 세션 (Montage 디자인 시스템 전면 적용 + 폰트 리프트)

**핵심 결정:**
- **Pretendard Variable** 폰트 전체 교체: Noto Sans KR(Google Fonts) 완전 제거
- **Montage 디자인 시스템** CSS 토큰 이식 (React 라이브러리 import 불가 → CSS 변수로 추출)
- **폰트 계층 전체 리프트**: 14px base → 15px (Pretendard x-height 낮아 동일 px에서 더 작게 보임)
- `--card-playbook` 활성화: `#D0CFC9`(잠금) → `#6B4A9A`(MVP 활성)

**변경된 파일:**
- 전 23개 HTML — Pretendard CDN 교체, Montage CSS 변수 적용, 폰트 크기 계층 리프트
- `00_design-system.html` — Playbook 스워치 활성화, Montage 토큰 섹션 추가

---

## 2026-06-09 세션 후반 (Evidence 아키텍처 확정 + 전수 카피라이팅 + 에이전트 재편)

**핵심 결정:**
1. **Evidence = 쿼리 정의 카드 최종 확정**: 수동 수치 입력 완전 제거 → KC Engine 런타임 자동 조회
2. **전수 감사 결과:**
   - 등급명 "상/중/하" → "위험/주의/양호" 전체 통일
   - 기술 용어 → 운영자 용어 전수 변환 완료
3. **에이전트 구조 재편:**
   - `guides/` 폴더 신설 (copywriting · insurance-domain · ux-patterns)
   - `agents/04a_coder-evidence.md` 서브에이전트 신설
   - `agents/03_ui-designer.md`, `04_coder.md` 중복 제거 다이어트

**변경된 파일:**
- `mockups/05_card-editor-evidence.html` — Evidence 편집기 전면 재설계
- 전 23개 파일 — 카피라이팅 운영자 눈높이 정비
- `guides/copywriting.md`, `guides/insurance-domain.md`, `guides/ux-patterns.md` (신규)
- `agents/04a_coder-evidence.md` (신규)

---

## 2026-06-10 세션 전반 (전체 검수 완료 + 보류 항목 정리)

**핵심 결정:**
- GA 수신 스펙 → **Phase 1.5 이관** 확정 (Playbook Card ③ 표시 업데이트)

**발견 및 수정된 버그:**

| 파일 | 항목 | 내용 |
|---|---|---|
| `07_card-editor-rule.html` | CSS 변수 | `--status-approved`, `--status-paused` 누락 → 추가 |
| `07_card-editor-rule.html` | 인터랙션 | `validateRiskType()` 누락, `checkSubmitState()` Risk-type 체크 없음 → 구현 |
| `07_card-editor-rule.html` | MOCK_DATA | T09·T10 누락 → 추가 |
| `07_rule-list.html` | MOCK_DATA | T09·T10 Rule 항목 누락 → RU010·RU011 추가 |
| `04_card-editor-risk-type.html` | MOCK_DATA | T10 누락 → 추가 |
| 10개 파일 | CSS 변수 | `--status-approved`, `--status-paused` 누락 → 일괄 추가 |
| 5개 편집기 | CSS 클래스 | `.sum-라이브` 한글 클래스명 → `.sum-active` 일괄 변경 |
| `16_card-editor-playbook.html` | Phase 표시 | Card ③ "Phase 1.5 이관" 표시 추가 |

---

## 2026-06-10 세션 후반 (Concept 설계 재정의 + 이슈 1~7 일괄 수정)

**핵심 결정:**
1. **Concept 편집기 Standalone 옵션 제거**: Standalone = Case 3/4 자동 동작. 카드 속성 아님.
2. **Concept → Risk-type 1:1 → 1:N 다중 선택**: 체크박스 리스트 + 칩 미리보기. MOCK_DATA `linkedRiskTypes` 배열.

**이슈 수정:**

| 이슈 | 파일 | 내용 |
|---|---|---|
| 3 | 편집기 5개 (04~08_card-editor) | `badge-라이브`/`status-라이브-guide`/JS `'라이브'` → 영문 클래스로 일괄 교체 |
| 4 | `05_card-editor-evidence.html` | Evidence 가이드박스 중복 설명 제거 |
| 5 | `04_card-editor-risk-type.html` | status-guidance "ID(자동생성)" 항목 제거 |
| 6 | `16_playbook-list.html` | 필터 탭 "✔ 승인완료" 추가 |
| 7 | `04_risk-type-list.html` | guide-box 중복 내용 제거 |
| 8 | `06_concept-list.html`, `07_rule-list.html` | page-header 설명 명사형 통일 |

**에이전트 업데이트:**
- `agents/02_po.md`, `03_ui-designer.md`, `04_coder.md`, `06_spec-reviewer.md` — 1:N 다중 선택 반영
- `agents/05_code-reviewer.md`, `08_ui-reviewer.md` — Concept 체크박스 검수 항목 추가

---

## 2026-06-10 세션 3차 (에이전트 팀 구조 재편)

**핵심 결정:**
- 3계층 정보 아키텍처 도입: CLAUDE.md(팀 브리핑) → context/(컨텍스트 패키지) → agents/(역할 전용)
- `context/project.md`, `context/decisions.md` 신규 생성
- `guides/design-system.md` 신규 생성 (CSS/폰트 전담)
- `agents/04b_coder-playbook.md` 신규 생성 (Playbook 전담)
- `CLAUDE.md` 팀 브리핑 전용으로 재작성 (~80줄)
- `agents/03_ui-designer.md` 슬림화 (화면별 상세 명세 제거)
- `agents/04_coder.md` 슬림화 (CSS/파일목록/Playbook JS 분리)
