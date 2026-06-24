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
| 2026-06-24 | 약관 RAG 버전 매핑 방법 확정: 보험사+상품명+계약시작일(연도) 조합을 매핑 키로 사용. 크롤러가 effective_start/end 메타데이터 저장 → 계약일 범위 쿼리로 약관 버전 특정. Phase 2에서 보험사 API 직접 연동으로 정확도 개선 예정. | `context/answer-logic.md` |
| 2026-06-24 | Rule 카드 약관 DB 연동 플래그 제거. 약관 DB는 엔진 자동 처리(있으면 참조, 없으면 없이 답변) → 운영자 제어 불필요. 전수 반영 17개 파일. | `context/card-types.md`, `guides/ux-patterns.md`, `mockups_v2/07_card-editor-rule.html` 외 |
| 2026-06-24 | 카드 상세 슬라이드 패널 구현: 00_canvas-main.html renderCardDetailHTML() 전면 교체(편집기 필드명 일치), 09_review-workflow.html 모달→슬라이드 패널 전환(pending: 승인완료+반려, 그 외: 닫기만) | `mockups_v2/00_canvas-main.html`, `mockups_v2/09_review-workflow.html` |
| 2026-06-24 | 카드 편집기 6개 입력항목·카피라이팅 전수 감사. 07_card-editor-rule.html: "제목"→"Rule 이름", "조건 빌더"→"판단 조건" 통일. 16_card-editor-playbook.html: 설명 필드 필수(*) 마크 추가 | `mockups_v2/07_card-editor-rule.html`, `mockups_v2/16_card-editor-playbook.html` |
| 2026-06-24 | 사이드바 메뉴 순서 변경: "카드 연결"을 "검수·승인" 하단으로 이동 (워크플로우 순서 반영: 등록→검수·승인→카드 연결→사전 테스트). 14_answer-logic-guide.html 삭제 (불필요). 파일 수 27→26 | `guides/ux-patterns.md`, `context/workflow.md` |
| 2026-06-24 | mockups_v2/ 27개 전수 수정: 사이드바 표준화(FAQ Q&A 서브메뉴 추가), 6단계 상태 모델 반영, rejected 필터/데이터 추가, 임계값→기준값, KC 엔진→Clark AI, 18_system-settings RAG 설정 카드 제거, 17_system-data-guide MYDATA 5종·PROFILE 7종 완전 표기 | `guides/ux-patterns.md` |
| 2026-06-24 | 목록 6개 파일 UI 통일: 필터탭 순서(라이브→승인완료→검수중→임시저장→일시중지→반려), 액션 버튼 btn-sm 단일 스타일(색상 제거), guide-box 파란 박스 통일, 신규 등록 버튼 btn-primary 통일 | `guides/ux-patterns.md` |
| 2026-06-23 | FAQ RAG 승인 프로세스 제거, 상태 2종(active/draft) | `context/answer-logic.md` |
| 2026-06-22 | Concept→Risk-type 필수 재확정, Case 매트릭스 최종, Policy 필드 2개, Playbook Standalone 선택사항, 가중치 제거, PROMAGE 기본=선택, CONNECT_RULES 최종 | `context/card-policy.md`, `context/card-types.md`, `context/answer-logic.md` |
| 2026-06-21 | FAQ RAG = Clark 서비스 전용 Q&A 확정, 카드 연결 카디널리티 확정 | `context/answer-logic.md`, `context/card-policy.md` |
| 2026-06-19 | LLM 기본 응답 가이드라인(18_system-settings), Risk-type 우선순위 재설계, Rule 필수/선택 구분 | `context/card-types.md` |
| 2026-06-18 | 카드 라이프사이클 재설계 (approved→캔버스 연결→Dry-run→라이브) | `context/workflow.md` |
| 2026-06-17 | v2 캔버스 UX 확정, Evidence 단일 유형(공인 외부 통계), 편집기 연결 UI 읽기 전용 | `context/workflow.md`, `context/card-types.md` |
| 2026-06-16 | 공개범위 필드 제거(카드 유형 자동 고정), Rule 약관 DB 연동 플래그 | `context/card-policy.md`, `context/card-types.md` |
| 2026-06-10 | Phase 1 완료, Playbook MVP 확정 | `context/card-types.md` |
| 2026-06-08 | Rule 3-source 확정 (MYDATA+Promage+프로파일, Amplitude 제거) | `context/card-types.md` |
