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
| `context/matching-policy.md` | 벡터 유사도 매칭 처리, 기준값, Concept·Playbook 병렬 검색 정책 |
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
| **A3201 공통 이슈** | A3201을 입원일당 대리 지표로 사용하는 Rule: T01·T12·T19 (T06·T15·T16은 2026-06-29 제거). A3xxx는 담보코드 테이블상 후유장해 계열이나 실제 MYDATA 스펙 미확인. 개발팀 확인 후 전수 교체 or 유지 결정 필요. | 개발팀 MYDATA 스펙 확인 선행 필요 | 2026-06-29 |
| **사전 테스트 PROFILE 입력 — 사용 필드만 표시** | 현재 Rule 조건과 무관하게 5개 필드(나이·성별·결혼여부·자녀유무·운전여부) 항상 전체 표시. 현재 Rule 조건에서 실제 사용하는 필드만 렌더링하도록 `buildProfileInputHTML(ruleId)` 개선 예정. | 미구현 (다음 세션 예정) | 2026-06-30 |

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
| 2026-06-30 | **사전 테스트 — 라이브 전환 버튼 추가**: 조건: KC 통과 AND 체인 내 approved 카드 존재. 위치: 패널 푸터 고정(테스트 실행 전 숨김). 클릭 시 체인 내 approved 카드 → active 전환, 캔버스 즉시 갱신. `testHasRun` 플래그, `updateFooterGoLive()`, `goLive()` 신규. 데모 데이터: PO001 status=approved, RU001→PO001 edge=pending. | `mockups_v2/00_canvas-main.html` |
| 2026-06-30 | **사전 테스트 RAG 결과 설정 — 약관 RAG 제거, FAQ RAG·LLM Fallback 2개로 단순화**: 약관 RAG는 사용자 실제 보험 계약 정보(MYDATA) 없이 테스트 불가 — 사전 테스트는 운영자 배포 판단 관문이므로 검증 불가 항목 제거. `ragMockState`: `{yakgwan,faq}` → `'faq'\|'llm'`. `buildRagPresetHTML` 2버튼, `renderAnswerChain` Step 2→FAQ RAG·Step 3→LLM Fallback으로 재번호. hint 텍스트에 약관 RAG 제외 이유 명시. | `mockups_v2/00_canvas-main.html` |
| 2026-06-30 | **사전 테스트 PROMAGE 조건 — 충족/미충족 토글로 통일**: 기존 위험/주의/양호/미설정 4개 등급 버튼 → MYDATA와 동일한 `✓ 충족 / ✗ 미충족` 토글. 조건에 이미 "암 종합 등급 EQ 위험"처럼 기댓값이 명시되어 있으므로 등급 재선택 불필요. `buildRuleCondRowsHTML` PROMAGE 분기, `updateTestSummary` 칩, `evaluateTestResult` 평가 로직 단순화 (`testProfile.conditions[key]` 기준으로 통일). | `mockups_v2/00_canvas-main.html` |
| 2026-06-29 | **T06·T15·T16 체인 전체 제거**: ① T06(갱신형 보험료 급등) — MYDATA에 갱신형/비갱신형 구분 담보코드 없어 직접 감지 불가. ② T15(자녀 건강보장 공백) — 마이데이터 사업자는 본인 계약만 조회, 자녀 보험 접근 구조적 불가. ③ T16(실손보험 노후화) — 실손 세대(1~4세대) 구분 담보코드 없음. 제거 범위 각 체인당: Risk-type·Rule·Concept·Policy 카드 + 전용 Evidence(EV017·EV020·EV025·EV032). 체인 23→20개, Risk-type 23→20장, Rule 23→20장, Concept 20→17장, Policy 19→16장, Evidence 33→29장. | `contents/html/01~05_*.html` |
| 2026-06-29 | **데이터 기반 Rule·Evidence 재설계**: 심평원·금감원·보험개발원·국민건강보험공단·중앙치매센터·통계청·보험연구원(KIRI) 등 6개 도메인 전문 데이터 수집 후 교차 검증. ① RU-T06 나이 45→**40세** 하향(40대 진입 시 갱신보험료 3만→10만원 233% 폭등 실사례). ② RU-T17 나이 상한 80→**85세** 상향(85세 이상 치매 유병률 21.18%) + 하한 55→**50세** 하향(MCI→치매 전환율 10~15%). ③ Evidence 카드 6개 수치 최신화(EV007·008·013·015·024·025). ④ EV030~EV033 신규 4장 추가(암 5년 생존율·진단금-사망률 상관·갱신 실사례·건보 보장률). Evidence 총 29→**33장**. | `contents/html/03_rule.html`, `contents/html/01_evidence.html` |
| 2026-06-29 | **Rule 카드 편집기 입력 벨리데이션 추가**: ① 나이 BETWEEN — step=1(정수 강제), from>to 역전 감지, 0~100 범위 체크, 실시간 오류 표시(빨간 테두리+메시지). ② 담보금액 MYDATA — type=text→number, min=0, 상한 없음(법정 상한 없음 확인 — 생명보험 단일담보 법정 상한 규정 없음), 실시간 단위 변환 레이블(억/만원). `validateAgeRange()`, `onCoverageInput()`, `formatCoverageLabel()` 함수 추가. | `mockups_v2/07_card-editor-rule.html` |
| 2026-06-29 | **감지·매칭 정책 HTML 문서 신규 추가**: `policy/09_matching-policy.html` 생성. 개요(역할비교표)·매칭방식·인덱싱대상·실행구조(병렬흐름도)·결과처리규칙·미결항목 포함. `policy/00_index.html` 사이드바·그리드 카드 추가. | `policy/09_matching-policy.html`, `policy/00_index.html` |
| 2026-06-29 | **Concept·Playbook 매칭 정책 확정**: 임베딩 의미 유사도 방식, Concept·Playbook 동시 병렬 검색, 각 최고점 1개 선택, KC 답변 + CTA 병렬 노출(additive). 임계값·모델·인덱스 업데이트 타이밍은 개발팀 미결. | `context/matching-policy.md` (신규) |
| 2026-06-29 | **캔버스 UX 3건 개선**: ① 사이드바 "카드 연결"→"연결·테스트·배포" 전체 26개 파일 일괄 변경. ② 캔버스 필터 바 추가: 상태 필터(전체/라이브/승인완료) + 카드명·ID 검색 (`getFilteredPickerCards()`, `setStatusFilter()`, `onCanvasSearch()`). ③ Playbook 캔버스 제외: 피커 패널·그리드 컬럼 모두 제거(KC 체인과 독립, 캔버스 연결 불필요). | `mockups_v2/00_canvas-main.html`, `context/workflow.md` |
| 2026-06-29 | **캔버스 테스트 모드 — RAG 결과 사전 설정 방식으로 변경**: 기존 인터랙티브(테스트 결과 내 버튼 클릭) → 사전 설정(설정 패널 "④ RAG 결과 설정" 토글 먼저 선택 후 실행). 기본값: 약관=결과있음, FAQ=결과없음. 약관=결과있음이면 FAQ 토글 비활성. `ragMockState` null 제거(항상 boolean). `buildRagPresetHTML()`, `setRagPreset()` 신규, `onRagResult()` 내부만 유지. | `mockups_v2/00_canvas-main.html`, `context/workflow.md` |
| 2026-06-29 | **PROFILE 5번째 필드 추가 — 운전여부(drives)**: EQ 무관/유/무. RU-T14에 운전여부=유 필수 조건 추가 (오탐 방지). 10개 파일 전수 수정: context/card-types.md, CLAUDE.md, mockups_v2/ 6개(07_card-editor-rule / 12_coverage-code-table / 17_system-data-guide / 11_dry-run / 00_canvas-main / 13_answer-logic), contents/html/03_rule.html. commit 미정 (다음 세션 push 예정). | `context/card-types.md`, `contents/html/03_rule.html`, `CLAUDE.md`, `mockups_v2/` 6개 |
| 2026-06-29 | **컨텐츠 업데이트 v1.4**: T20~T23 신규 4개 체인 추가 (후유장해·치과·상해 특화·골절), T14 Rule 담보코드 교체(A3001→A9607+A9604+A9605), 전수 감사(T01~T23) 완료. 체인 19→23개, 카드 112→132장. MD 6개+HTML 7개 업데이트. commit c0a44ee. | `contents/` 전체 |
| 2026-06-29 | **T15 제거 결정**: 마이데이터 사업자는 본인 데이터만 조회 가능 — 자녀 보험 계약 데이터 접근 구조적 불가. "자녀 건강보장 공백" 감지는 개인화 오해 소지. 미결 항목 등록, 다음 컨텐츠 업데이트 세션에서 처리. | `context/decisions.md` (미결) |
| 2026-06-29 | **RU-T16·A3201 이슈 식별**: RU-T16 — A3201 분류 불확실 + 입원일당=실손보험 논리 비약. A3201 공통 이슈 — T01·T06·T12·T16·T19 5개 Rule에서 입원일당 대리 지표 사용. 모두 개발팀 MYDATA 스펙 확인 후 처리. 미결 항목 등록. | `context/decisions.md` (미결) |
| 2026-06-27 | "답변 제공 조건" 종합 테이블 추가: 프로파일·마이데이터·프롬에이지 O/X 조합 × 상태·답변 우선순위·Playbook 6컬럼 구성. context/answer-logic.md 기존 5컬럼 테이블을 7컬럼(답변 우선순위·Playbook 추가)으로 확장. mockups_v2/13_answer-logic.html에 전용 섹션("답변 제공 조건 — 사용자 데이터 상태별 요약") 신규 추가(Playbook 감지 조건 테이블 아래). | `context/answer-logic.md`, `mockups_v2/13_answer-logic.html` |
| 2026-06-26 | 전수 검사 완료: 분기(fallback) 구조 전파 — KC·RAG·LLM은 순차 누적 아님, 앞 단계 성공 시 뒤 단계 호출 없음. "두 체인 동시 출력" 오표현 제거(policy/02_card-purpose.html, mockups/13_answer-logic.html). 나머지 17개 md·14개 html 파일은 이미 올바른 분기 구조로 기술 확인. | `policy/02_card-purpose.html`, `mockups/13_answer-logic.html` |
| 2026-06-26 | Case 1~4 출력 구조 명시: KC 체인(Case 1·2)과 RAG·LLM(Case 3·4)은 대체(fallback) 관계 — 동시 출력 없음. KC 구조화 답변에 Evidence(LLM 선택·인용)·Policy(appDisplayText) 포함. CTA 버튼만 Playbook 감지 시 가산(additive). Evidence "전부 참조" → "LLM 선택·인용" 오류 수정. | `context/answer-logic.md`, `mockups_v2/13_answer-logic.html` |
| 2026-06-26 | Risk-type 3순위 타이브레이크 변경: 카드코드 오름차순 → 최근 배포순(가장 최근 라이브 전환일 우선). 11개 파일 전수 반영. | `context/card-types.md`, `agents/01·03·04·06·08_*.md`, `guides/ux-patterns.md`, `policy/02·06_*.html`, `mockups_v2/13_answer-logic.html`, `CLAUDE.md` |
| 2026-06-26 | 사용자 상태 3→4가지로 확장: ①미가입(전체null) / ②회원+마이데이터·프롬에이지미연동(mydata·promage null) / ③마이데이터연동+프롬에이지미이용(promage null) / ④전체데이터(메인 이용). PROMAGE가 MYDATA와 독립 축으로 확정. Case 1~4는 MYDATA 있는 ③④ 전용. | `context/answer-logic.md`, `mockups_v2/13_answer-logic.html` |
| 2026-06-26 | Playbook 데이터 미보유 감지 조건 확정: user_state 파라미터 방식 → null 체크 방식으로 전면 교체. Clark은 profile/mydata/promage를 null 포함 그대로 전달. KC Engine이 null 여부로 상태 판단. Playbook 카드에 "PROFILE 없음/MYDATA 없음/PROMAGE 없음" 체크박스 추가(선택), 해당 데이터 null 사용자에게만 감지. 16_card-editor-playbook.html UI 추가. | `context/answer-logic.md`, `mockups_v2/13_answer-logic.html`, `mockups_v2/16_card-editor-playbook.html` |
| 2026-06-26 | 사용자 데이터 상태 3-분기 확정: ①미가입(데이터 없음→FAQ RAG→Fallback+회원가입CTA) / ②가입+마이데이터미연결(PROFILE Rule만 평가→KC부분답변 또는 FAQ RAG→Fallback+마이데이터연결유도) / ③가입+마이데이터연결(전체평가→Case 1~4). 약관 RAG는 ③ 상태에서만 가능. Clark과 KC Engine 별개 법인 구조 명시. | `context/answer-logic.md`, `mockups_v2/13_answer-logic.html` |
| 2026-06-26 | Evidence 활용 방식 확정: LLM이 "활용 방법" 필드 기준으로 맥락에 맞는 Evidence 선택·인용 (전부 나열 아님). Rule당 Evidence 3개 이하 권장(하드 제한 없음). Policy는 연결된 전부 적용(AND), Rule당 1~2개 권장. | `context/answer-logic.md` |
| 2026-06-26 | **카드 연결 카디널리티 재확정**: Concept:Risk-type=N:N / Risk-type:Rule=**1:1** (핵심변경, 전속 소속, 공유 불가) / Rule:Evidence=N:N / Rule:Policy=N:N. 전체 파일 전수 반영. | `context/card-policy.md`, `policy/02·03·06_*.html`, `mockups_v2/00·01·04·07·10·11·13_*.html` |
| 2026-06-26 | PROFILE 4개 필드 확정: age(BETWEEN)+gender(EQ 무관/남/여)+married(EQ 무관/기혼/미혼)+has_child(EQ 무관/있음/없음). 9개 파일 전수 반영(mockups_v2/). policy/ 5개 파일 최신 정책 동기화 완료. | `context/card-types.md`, `policy/01~02·06·08_*.html`, `mockups_v2/11·13·17·00·09_*.html` |
| 2026-06-25 | Rule 조건 빌더 단순화 1차: PROFILE→나이(BETWEEN)+성별(2개), MYDATA→담보금액만(필드 드롭다운 제거), PROMAGE→위험도 단일 카테고리(암위험도+질병위험도 50개 통합, 생체나이·의료비예측 삭제, EQ only). 7개 파일 전수 반영. | `context/card-types.md`, `mockups_v2/07_card-editor-rule.html`, `mockups_v2/12_coverage-code-table.html` 외 |
| 2026-06-25 | 캔버스 테스트 모드 개선: 체크박스 캔버스 그리드 카드로 이동(피커 패널→카드 직접 선택), PROFILE 나이 BETWEEN 조건 추가(40~65/50~70세), MYDATA 갱신일 EQ bool 조건 추가(RU001/002), PROMAGE 신체나이 삭제. 사이드바 "사전 테스트" 메뉴 26개 파일 전수 제거. | `mockups_v2/00_canvas-main.html`, `mockups_v2/07_card-editor-rule.html` |
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
