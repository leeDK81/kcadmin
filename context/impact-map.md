# KC Admin — 정책 변경 영향 파일 매핑

> 정책이 바뀔 때 이 파일을 먼저 열어 수정 대상 파일을 확인한다.
> 진실원 파일 수정 → 아래 "영향 파일" 순서로 반영한다.

---

## 정책별 영향 파일

| 변경 항목 | 진실원 파일 | 영향 받는 파일 |
|---|---|---|
| **체인 수·T코드** | `context/project.md` · `context/decisions.md` | `policy/01·02·06`, `mockups_v2/10_chain-visualizer` · `11_dry-run` |
| **wf-tracker 단계 수** | `context/workflow.md` | `agents/06·08`, `policy/01`, `mockups_v2/` 편집기 7개 (04~08·16·16b) |
| **카드 상태 종류** | `context/card-policy.md` | `agents/06·08`, `mockups_v2/` 전체 목록 6개 + 편집기 전체 |
| **금지어·대체어 추가** | `guides/copywriting.md` | `mockups_v2/` 전수 확인 (에이전트 파일 수정 불필요 — 참조 방식) |
| **CONNECT_RULES 변경** | `context/card-policy.md` | `agents/03·04·05·06·08`, `mockups_v2/00_canvas·06·07·08` 편집기 |
| **Case 1~4 매트릭스** | `context/answer-logic.md` | `agents/01·03·04·06`, `mockups_v2/13_answer-logic` |
| **PROFILE 필드 수·종류** | `context/card-types.md` | `agents/03·04·06·08`, `mockups_v2/07_card-editor-rule` · `11_dry-run` · `17_system-data-guide` |
| **MYDATA 담보코드 구조** | `context/card-types.md` | `agents/03·04·06·08`, `mockups_v2/07·11·12·17` |
| **PROMAGE 필드 구조** | `context/card-types.md` | `agents/03·04·06·08`, `mockups_v2/07·11·17` |
| **Evidence 수·데이터** | `context/decisions.md` | `mockups_v2/01_guide·05_evidence-list·11_dry-run·17_system-data-guide` |
| **Policy 편집기 필드** | `context/card-types.md` | `agents/03·04·05·06·08`, `mockups_v2/08_card-editor-policy` |
| **RAG 아키텍처** | `context/answer-logic.md` | `agents/01·03·04·06`, `mockups_v2/13_answer-logic·19_faq-rag` |
| **Risk-type 우선순위** | `context/card-types.md` | `agents/01·03·04·06`, `mockups_v2/04_card-editor-risk-type·13_answer-logic` |
| **사이드바 메뉴 구조** | `context/project.md` | `guides/ux-patterns.md` (사이드바 HTML 패턴), `mockups_v2/` 전체 26개 |
| **파일 수 (mockups_v2/)** | `context/project.md` | `agents/02·04·05·06`, `CLAUDE.md` |
| **Playbook 규칙** | `context/card-types.md` | `agents/04·04b·05·06·08`, `mockups_v2/16_playbook-list·16_card-editor-playbook` |
| **승인 단계·흐름** | `context/workflow.md` | `agents/06·08`, `mockups_v2/08_card-editor-policy·09_review-workflow` |
| **FAQ RAG 정책** | `context/answer-logic.md` | `agents/03·04·06`, `mockups_v2/19_faq-rag` |
| **matching-policy** | `context/matching-policy.md` | `policy/09_matching-policy` |

---

## 신규 화면 추가 시 체크리스트

새 HTML 파일을 mockups_v2/에 추가할 때 반드시 아래 순서로 반영한다.

1. `context/project.md` — 파일 목록에 추가, 파일 수 업데이트
2. `context/decisions.md` — 변경 이력에 한 줄 추가
3. `agents/02_po.md` — 화면 우선순위 표에 추가
4. `guides/ux-patterns.md` — 사이드바 HTML 패턴 업데이트
5. `mockups_v2/` — **전체 26개** 파일의 사이드바 HTML 업데이트
6. `CLAUDE.md` — 에이전트 표의 "계층 2 참조" 업데이트 (해당 에이전트만)

---

## 신규 에이전트 추가 시 체크리스트

1. `agents/` — 새 파일 생성 (역할 + 읽어야 할 파일 목록 + 판단 기준 + 체크리스트)
2. `CLAUDE.md` — 에이전트 구성 표에 한 줄 추가
3. `context/rules.md` — 체크리스트 수정 허용 조건에 번호 추가

---

## 신규 카드 타입 추가 시 체크리스트

1. `context/card-policy.md` — CONNECT_RULES에 추가
2. `context/card-types.md` — 새 카드 스펙 섹션 추가
3. `guides/ux-patterns.md` — 배지 CSS 클래스 추가, 사이드바 메뉴 추가
4. `mockups_v2/` — 목록·편집기 신규 HTML 생성
5. `agents/03·04·05·06·08` — 체크리스트에 새 카드 타입 항목 추가
