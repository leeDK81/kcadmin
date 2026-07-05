# KC Admin — 정책 변경 영향 파일 매핑 (서비스 기획 트랙 전용)

> 정책이 바뀔 때 이 파일을 먼저 열어 수정 대상 파일과 구체적 변경 위치를 확인한다.
> **진실원 파일 수정 → 아래 "구체적 변경 위치" 순서로 반영한다.**
> 이 파일은 **서비스 기획 트랙**(`mockups_v2/`) 내부 영향 파일만 다룬다. 컨텐츠 기획 트랙(`contents/`) 내부 영향은 `contents/agents/00_workflow.md`를 참조하고, 트랙 경계를 넘는 공유 계약 변경은 `context/cross-track-impact.md`를 먼저 확인한다.

---

## 정책별 영향 파일 (변수·함수·CSS 수준)

### 1. 체인 수 · T코드 추가/변경

**진실원:** `guides/insurance-domain.md` (T코드 목록·개수·상태, 2026-07-06 정정 — `context/project.md`엔 체인 구조만 있고 T코드별 목록·개수는 없음) · `context/decisions.md` (이력)

| 영향 파일 | 변경 위치 |
|---|---|
| `mockups_v2/shared.js` | `CARD_TYPE` 객체에 새 T코드 추가/삭제 |
| `mockups_v2/shared.js` | `CARD_NAMES` 객체에 표시명 추가/삭제 |
| `policy/04_lifecycle.html` | 체인 수·T코드 기재 텍스트 |
| `policy/02_card-purpose.html` | Risk-type T코드 목록 |
| `policy/06_field-data.html` | 체인-Evidence 매핑 표 |

---

### 2. wf-tracker 단계 수 변경

**진실원:** `context/workflow.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `agents/06_spec-reviewer.md` | 체크리스트 D섹션 단계 수 |
| `agents/08_ui-reviewer.md` | 체크리스트 B섹션 wf-tracker 항목 |
| `policy/04_lifecycle.html` | 단계 흐름도 |
| `mockups_v2/04_card-editor-risk-type.html` | `.wf-tracker` UI 단계 수 |
| `mockups_v2/05_card-editor-evidence.html` | `.wf-tracker` UI 단계 수 |
| `mockups_v2/06_card-editor-concept.html` | `.wf-tracker` UI 단계 수 |
| `mockups_v2/07_card-editor-rule.html` | `.wf-tracker` UI 단계 수 |
| `mockups_v2/08_card-editor-policy.html` | `.wf-tracker` UI 단계 수 |
| `mockups_v2/16_card-editor-playbook.html` | `.wf-tracker` UI 단계 수 |

---

### 3. 카드 상태 종류 변경 (draft / review / approved / active / paused / rejected)

**진실원:** `context/card-policy.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `mockups_v2/shared.css` | `--status-*` CSS 변수 추가/삭제, `.badge-*` 규칙 |
| `agents/06_spec-reviewer.md` | 체크리스트 D섹션 상태 목록 |
| `agents/08_ui-reviewer.md` | 뱃지 색상 매핑 표 |
| 목록 6개 (04~08·16 list) | `STATUS_LABEL` 객체 / `FILTER_OPTIONS` 배열 |
| 편집기 6개 (04~08·16 editor, 2026-07-06 정정 — "16b" 파일 없음) | 상태 select `<option>` 목록 |

---

### 4. 금지어·대체어 추가

**진실원:** `guides/copywriting.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `mockups_v2/` 전수 | 금지어가 사용된 레이블·placeholder·토스트 텍스트 직접 탐색 |
| *(agents/ 수정 불필요)* | 에이전트들은 copywriting.md를 참조만 함 |

---

### 5. CONNECT_RULES 변경 (카드 간 연결 규칙)

**진실원:** `context/card-policy.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `agents/03_ui-designer.md` | 연결 규칙 설명 |
| `agents/04_coder.md` | 유효성 검사 로직 설명 |
| `agents/05_code-reviewer.md` | 체크리스트 연결 규칙 항목 |
| `agents/06_spec-reviewer.md` | 체크리스트 C섹션 |
| `agents/08_ui-reviewer.md` | 연결 UI 검수 항목 |
| `mockups_v2/00_canvas-main.html` | `CONNECT_RULES` 객체, 연결 유효성 함수 `validateConnection()` |
| `mockups_v2/06_card-editor-concept.html` | "연결 가능 카드" 안내 텍스트 |
| `mockups_v2/07_card-editor-rule.html` | Evidence 연결 필수 안내 |
| `mockups_v2/08_card-editor-policy.html` | Rule 연결 안내 |

---

### 6. Case 1~4 매트릭스 변경

**진실원:** `context/answer-logic.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `agents/01_ai-rag-architect.md` | Case 분기 설명 |
| `agents/03_ui-designer.md` | Case 레이아웃 설명 |
| `agents/04_coder.md` | Case 분기 로직 기술 |
| `agents/06_spec-reviewer.md` | 체크리스트 E섹션 |
| `mockups_v2/13_answer-logic.html` | `CASES` 배열, Case 렌더링 함수 `renderCase()` |

---

### 7. PROFILE 필드 수·종류 변경

**진실원:** `context/card-types.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `agents/03_ui-designer.md` | PROFILE 필드 목록 기술 |
| `agents/04_coder.md` | `customProfile.profile` 초기값 참조 |
| `agents/06_spec-reviewer.md` | 체크리스트 PROFILE 항목 |
| `agents/08_ui-reviewer.md` | PROFILE UI 검수 항목 |

| `mockups_v2/00_canvas-main.html` | `testProfile.profile` 초기값 객체, `buildProfileInputHTML()` 함수 (5개 필드 고정 표시), `.test-profile-row` CSS |
| `mockups_v2/07_card-editor-rule.html` | Rule 조건 입력 필드 (나이·성별 등) |
| `mockups_v2/17_system-data-guide.html` | PROFILE 필드 설명 표 |

---

### 8. MYDATA 담보코드 구조 변경

**진실원:** `context/card-types.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `agents/03·04·06·08` | 담보코드 관련 기술 |
| `mockups_v2/07_card-editor-rule.html` | `COVERAGE_CODES` 배열, 조건 빌더 UI |

| `mockups_v2/12_coverage-code-table.html` | 담보코드 전체 표 |
| `mockups_v2/17_system-data-guide.html` | MYDATA 필드 설명 표 |

---

### 9. PROMAGE 필드 구조 변경

**진실원:** `context/card-types.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `agents/03·04·06·08` | PROMAGE 관련 기술 |

| `mockups_v2/17_system-data-guide.html` | PROMAGE 필드 설명 표 |

---

### 10. Evidence 수·데이터 변경

**진실원:** `context/decisions.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `mockups_v2/01_guide.html` | Evidence 총 수 기재 |
| `mockups_v2/05_evidence-list.html` | `EVIDENCE_DATA` 배열 |

| `mockups_v2/17_system-data-guide.html` | Evidence 설명 섹션 |

---

### 11. Policy 편집기 필드 변경

**진실원:** `context/card-types.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `agents/03·04·05·06·08` | Policy 필드 관련 기술 |
| `mockups_v2/08_card-editor-policy.html` | `POLICY_FIELDS` 배열, 폼 렌더링 함수 |

---

### 12. RAG 아키텍처 변경

**진실원:** `context/answer-logic.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `agents/01_ai-rag-architect.md` | RAG 흐름 기술 |
| `agents/03_ui-designer.md` | RAG 결과 표시 UI 기술 |
| `agents/04_coder.md` | RAG 분기 로직 기술 |
| `agents/06_spec-reviewer.md` | 체크리스트 RAG 항목 |
| `mockups_v2/00_canvas-main.html` | `buildRagPresetHTML()` 함수, `ragMockState` 직접 갱신, `renderAnswerChain()` 함수 |
| `mockups_v2/13_answer-logic.html` | RAG 흐름도, `renderFlowChart()` 함수 |
| `mockups_v2/19_faq-rag.html` | FAQ RAG 관리 UI |

---

### 13. Risk-type 우선순위 로직 변경

**진실원:** `context/card-types.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `agents/01·03·04·06` | 우선순위 기술 |
| `mockups_v2/04_card-editor-risk-type.html` | 중요도 select 옵션, 우선순위 설명 텍스트 |
| `mockups_v2/13_answer-logic.html` | Risk-type 감지 단계 설명 |

---

### 14. 사이드바 메뉴 구조 변경 ★ (shared.js 도입 후 단일 수정)

**진실원:** `mockups_v2/shared.js` → `SIDEBAR_ITEMS` 배열

| 영향 파일 | 변경 위치 |
|---|---|
| `mockups_v2/shared.js` | **`SIDEBAR_ITEMS` 배열만 수정** → 24개 파일 자동 반영 |
| `context/project.md` | 파일 목록 설명 (사이드바 순서·분류 반영) |
| `guides/ux-patterns.md` | 사이드바 HTML 패턴 예시 업데이트 |
| *(mockups_v2/ 24개 직접 수정 불필요)* | `renderSidebar()` 호출로 자동 렌더링됨 |

---

### 15. CSS 디자인 토큰(색상·간격) 변경 ★ (shared.css 도입 후 단일 수정)

**진실원:** `mockups_v2/shared.css` → `:root { }` 블록

| 영향 파일 | 변경 위치 |
|---|---|
| `mockups_v2/shared.css` | **`:root` 변수만 수정** → 24개 파일 자동 반영 |
| `guides/design-system.md` | `:root` 변수 참조 문서 동기화 |
| *(mockups_v2/ 24개 직접 수정 불필요)* | CSS 변수 참조로 자동 반영됨 |

---

### 16. 카드 타입 태그 색상·스타일 변경 ★ (shared.css 도입 후 단일 수정)

**진실원:** `mockups_v2/shared.css`

| 영향 파일 | 변경 위치 |
|---|---|
| `mockups_v2/shared.css` | `.badge-*`, `.tag-*`, `.ct-*` CSS 규칙, `--card-*` 변수 |
| `mockups_v2/shared.js` | `TYPE_COLOR` 객체 (JS로 동적 색상을 계산하는 곳) |
| *(24개 파일 직접 수정 불필요)* | shared.css/js 참조로 자동 반영 |

---

### 17. 카드 ID 목록 · 표시명 변경

**진실원:** `context/project.md` (카드 목록)

| 영향 파일 | 변경 위치 |
|---|---|
| `mockups_v2/shared.js` | `CARD_TYPE` 객체, `CARD_NAMES` 객체 |
| `mockups_v2/00_canvas-main.html` | 노드 데이터 배열 |

---

### 18. 파일 수 (mockups_v2/ HTML 추가·삭제)

**진실원:** `context/project.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `agents/02_po.md` | 화면 목록·우선순위 표 |
| `agents/04_coder.md` | 파일 수 기재 |
| `agents/05_code-reviewer.md` | 검수 범위 기재 |
| `agents/06_spec-reviewer.md` | 검수 범위 기재 |
| `CLAUDE.md` | 파일 맵 설명 |
| `mockups_v2/shared.js` | `SIDEBAR_ITEMS` 배열에 새 항목 추가 |

---

### 19. Playbook 규칙 변경

**진실원:** `context/card-types.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `agents/04_coder.md` | Playbook 로직 기술 |
| `agents/04b_coder-playbook.md` | Playbook 전체 스펙 |
| `agents/05_code-reviewer.md` | 체크리스트 Playbook 항목 |
| `agents/06_spec-reviewer.md` | 체크리스트 Playbook 항목 |
| `agents/08_ui-reviewer.md` | Playbook UI 검수 항목 |
| `mockups_v2/16_playbook-list.html` | `PLAYBOOKS` 배열, 목록 렌더링 |
| `mockups_v2/16_card-editor-playbook.html` | `PLAYBOOK_FIELDS` 배열, 폼 렌더링 |

---

### 20. 승인 단계·흐름 변경

**진실원:** `context/workflow.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `agents/06_spec-reviewer.md` | 체크리스트 승인 항목 |
| `agents/08_ui-reviewer.md` | 승인 흐름 UI 검수 항목 |
| `mockups_v2/08_card-editor-policy.html` | 승인 버튼·상태 UI |
| `mockups_v2/09_review-workflow.html` | `WORKFLOW_STEPS` 배열, 흐름도 렌더링 |

---

### 21. FAQ RAG 정책 변경

**진실원:** `context/answer-logic.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `agents/03·04·06` | FAQ RAG 기술 |
| `mockups_v2/19_faq-rag.html` | FAQ 등록 규칙 텍스트, 등록 금지 카테고리 UI |

---

### 22. matching-policy 임계값·가중치 변경

**진실원:** `context/matching-policy.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `policy/09_matching-policy.html` | 기준값 수치 테이블, `THRESHOLDS` 객체 |

---

### 23. 컨텐츠 기획 트랙 파이프라인 변경 (2026-07-03 정정 — 진실원 위치 변경)

> 2026-07-03 초판은 `context/contents-pipeline.md`를 진실원으로 뒀으나, 그날 중 이미 존재하던 `contents/agents/00_workflow.md`와 중복임이 발견돼 그 파일은 삭제하고 아래로 통합했다.

**진실원:** `contents/agents/00_workflow.md` (컨텐츠 트랙 내부), 트랙 경계를 넘는 영향은 `context/cross-track-impact.md`

| 영향 파일 | 변경 위치 |
|---|---|
| `contents/agents/01~05` | 각 담당 Step 스펙 |
| `guides/customer-messaging.md` | 고객향 메시지 워싱 원칙 (소유자: `contents/agents/03_copywriter.md`) |
| `CLAUDE.md` | 컨텐츠 트랙 인덱스 섹션 |
| `mockups_v2/12_coverage-code-table.html` | Step 0.5 게이트 판단 기준(담보코드 표) 자체 — 서비스 트랙 파일이므로 변경 시 양 트랙 모두 확인 |
| `contents/00_taxonomy/source-corpus.md` | Step 0·2 데이터 비축 대상·갱신 주기 (관리: `contents/agents/01_researcher.md`) |

---

### 24. Clark 실제 앱 답변 출력 형식 변경 (진단 선언·운영자 식별자 비노출·Evidence 인용 표기·PROMAGE 선택조건 반영) — 2026-07-05 신설, 2026-07-05 4번째 원칙 추가

**진실원:** `context/answer-logic.md` "Rule 선택 조건(PROMAGE) — 매칭 시 답변 반영 원칙" 및 "FAQ RAG 매칭 방식" 위 섹션·Evidence 활용 표의 "인용 표기 원칙". 선택 조건 자체의 정의는 `context/card-types.md` Rule 조건 구분 표.

| 영향 파일 | 변경 위치 |
|---|---|
| `mockups_v2/13_answer-logic.html` | Step 7 답변 예시 하단 note-box (출력 형식 원칙 4가지) |
| `contents/html/08_ai-preview.html` | T01~T32 23개 체인 전체 — 모바일 폰 프레임 목업, 진단 선언 문장, Evidence 출처+연도 인용. 이 중 17개 체인(PROMAGE 선택조건 등록된 Risk-type)은 "①기본 케이스 ②선택조건 매칭 시" 2-variant 비교 (트랙 경계를 넘는 영향은 `context/cross-track-impact.md` 참조) |

---

## 신규 화면 추가 시 체크리스트 (shared.js 도입 후)

새 HTML 파일을 `mockups_v2/`에 추가할 때:

1. `context/project.md` — 파일 목록·파일 수 업데이트
2. `context/decisions.md` — 변경 이력 한 줄 추가
3. `agents/02_po.md` — 화면 우선순위 표에 추가
4. `mockups_v2/shared.js` — **`SIDEBAR_ITEMS` 배열에 새 항목 추가** (24개 일괄 반영)
5. `guides/ux-patterns.md` — 사이드바 HTML 패턴 예시 업데이트 (필요 시)
6. 신규 HTML 파일 — `<link href="shared.css">` + `<script src="shared.js">` + `renderSidebar('파일명.html')` 추가 (같은 폴더이므로 `../` 없음)
7. `CLAUDE.md` — 에이전트 표의 "계층 2 참조" 업데이트 (해당 에이전트만)

---

## 신규 에이전트 추가 시 체크리스트

1. `agents/` — 새 파일 생성 (역할 + 읽어야 할 파일 목록 + 판단 기준 + 체크리스트)
2. `CLAUDE.md` — 에이전트 구성 표에 한 줄 추가
3. `context/rules.md` — 체크리스트 수정 허용 조건에 번호 추가

---

## 신규 카드 타입 추가 시 체크리스트

1. `context/card-policy.md` — CONNECT_RULES에 추가
2. `context/card-types.md` — 새 카드 스펙 섹션 추가
3. `mockups_v2/shared.css` — `--card-새타입` 변수, `.badge-새타입`, `.tag-새타입`, `.ct-새타입` 추가
4. `mockups_v2/shared.js` — `CARD_TYPE`·`TYPE_COLOR`·`CARD_NAMES`에 새 카드 ID 추가
5. `guides/ux-patterns.md` — 배지 CSS 클래스 설명, 사이드바 메뉴 예시 업데이트
6. `mockups_v2/` — 목록·편집기 신규 HTML 생성 (shared.css/js 참조 포함)
7. `mockups_v2/shared.js` — `SIDEBAR_ITEMS`에 새 목록 링크 추가
8. `agents/03·04·05·06·08` — 체크리스트에 새 카드 타입 항목 추가
