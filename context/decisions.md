# KC Admin — 확정된 설계 결정 (인덱스)

> 세션 논의를 거쳐 확정된 설계 결정. 기획서(`Data/`)와 충돌 시 이 파일이 우선.
> **관리 주체: PO(02)** — 결정 확정 시 즉시 업데이트. 미확정 항목은 `## 미결 항목`에 먼저 등록.
> **정책 상세는 아래 진실원 파일들을 읽는다. 이 파일은 인덱스+미결+이력 전용.**

---

## 진실원 파일 인덱스

| 파일 | 내용 |
|---|---|
| `context/card-policy.md` | CONNECT_RULES, 카드 상태/엣지, 공개범위, 카드블록 구조, 타입코드 |
| `context/card-types.md` | 카드별 상세 스펙 (Evidence/Rule/Concept/Policy/Playbook/Risk-type 필드 정의) |
| `context/answer-logic.md` | Case 1~4 매트릭스, RAG 정책, FAQ RAG 스펙, Fallback |
| `context/workflow.md` | 카드 라이프사이클, 캔버스 UX, 캔버스 JS 함수, 사이드바 v2 표준 |
| `guides/design-system.md` | CSS 변수, 컴포넌트 CSS, 폰트 |
| `guides/ux-patterns.md` | 사이드바·편집기·테이블 HTML 패턴 |
| `guides/copywriting.md` | 금지/대체 표현, 상태 메시지 템플릿 |
| `guides/insurance-domain.md` | T코드, 담보코드, KCD 도메인 지식 |

---

## 미결 항목

> 논의됐지만 아직 확정되지 않은 항목. 확정 시 진실원 파일로 이동, 폐기 시 행 삭제.

| 항목 | 논의 내용 | 미결 이유 | 등록일 |
|---|---|---|---|
| Playbook ← Risk-type 연결 | Risk-type 관점의 리드 전환·배정 최적화. CONNECT_RULES.risk에 'playbook' 추가 필요 | Phase 1.5+ 이관 (리드 스코어링 스펙 확정 시 추가) | 2026-06-17 |

---

## Phase 범위

**Phase 1 완료 (2026-06-10):** mockups/ 23개, 코딩·UI·기획 검수 전체.

**Phase 1.5 이관 (GA 수신 스펙 대기):**
- Playbook Card ③ 리드 스코어링 UI
- GA 전달 데이터 필드 설정 UI

**Phase 2 이관:**
- 배정 최적화 레이어 (원수사·GA API 직접 연동 필요)
- Case 편집기 (⑦ Case 카드 CRUD)

---

## 변경 이력 (최신순)

| 날짜 | 내용 | 진실원 파일 |
|---|---|---|
| 2026-06-23 | FAQ RAG 승인 프로세스 제거, 상태 2종(active/draft) | `context/answer-logic.md` |
| 2026-06-22 | Concept→Risk-type 필수 재확정, Case 매트릭스 최종, Policy 필드 2개, Playbook Standalone 선택사항, 가중치 제거, PROMAGE 기본=선택, CONNECT_RULES 최종 | `context/card-policy.md`, `context/card-types.md`, `context/answer-logic.md` |
| 2026-06-21 | FAQ RAG = Clark 서비스 전용 Q&A 확정, 카드 연결 카디널리티 확정 | `context/answer-logic.md`, `context/card-policy.md` |
| 2026-06-19 | LLM 기본 응답 가이드라인(18_system-settings), Risk-type 우선순위 재설계, Rule 필수/선택 구분 | `context/card-types.md` |
| 2026-06-18 | 카드 라이프사이클 재설계 (approved→캔버스 연결→Dry-run→라이브) | `context/workflow.md` |
| 2026-06-17 | v2 캔버스 UX 확정, Evidence 단일 유형(공인 외부 통계), 편집기 연결 UI 읽기 전용 | `context/workflow.md`, `context/card-types.md` |
| 2026-06-16 | 공개범위 필드 제거(카드 유형 자동 고정), Rule 약관 DB 연동 플래그 | `context/card-policy.md`, `context/card-types.md` |
| 2026-06-10 | Phase 1 완료, Playbook MVP 확정 | `context/card-types.md` |
| 2026-06-08 | Rule 3-source 확정 (MYDATA+Promage+프로파일, Amplitude 제거) | `context/card-types.md` |
