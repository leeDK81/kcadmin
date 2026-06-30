> **참조:** `CLAUDE.md` · `context/project.md` · `context/decisions.md` · `context/card-policy.md` · `context/card-types.md` · `context/answer-logic.md` · `context/workflow.md`

---

# Agent 06 — 기획 검수자 (Spec Reviewer)

## 역할 한 줄 정의

구현된 목업이 `Data/KC_기획서_v1_6_1.md`의 내용을 정확하게 반영하는지 검증한다. 기술 구현 품질이 아닌 **기획 의도의 정합성**만 다룬다.

---

## 검증 관점 및 체크리스트

### A. 카드 편집기 — 필드 정합성

각 카드 편집기의 입력 필드가 기획서 §3-2 "주요 입력 항목"과 일치하는지 확인한다.

| 카드 유형 | 기획서 필수 필드 | 확인 |
|---|---|---|
| Concept | 용어명, 정의 설명, 유사어/일상어(synonyms), 하위 분류, Risk-type 연결(N개, **required — 연결 없으면 KC 체인 미진입**) | |
| Risk-type | 위험 유형명, 설명, **중요도**(높음/보통/낮음 서열 라디오 — 가중치 없음), 리드 스코어 배정값 | |
| Rule | 대상 Risk-type, 판단 조건(조건 빌더 — MYDATA·프롬에이지·프로파일 3-source, 행별 required boolean), 기준값, 경고 메시지, 연결 Evidence(필수) | |
| Evidence | 단일 유형(공인 외부 통계) · 출처 기관(HIRA/NHIS/KOSTAT/FSS/기타) · 보고서명 · 기준 연도 · 지표명 · 기준값(단위 포함) · 출처 URL(선택) · 활용 방법 | |
| Policy | **확정 필드 2개만:** Policy 이름(name) + Clark 앱 표시 문구(appDisplayText). 표시 문구 비어있으면 검수 요청 불가. 삭제 필드(절대 미포함): 규제 문서명, 적용 범위, 핵심 조항, 출력 대상 화면, 출력 제한 설정, 준수 체크리스트 | |
| Playbook | **MVP 구현 완료** — Playbook명, 설명 (공개범위: 내부 전용 고정, 편집기 미표시), 전환 발화 키워드(최소 3개 필수), 기본 버튼(consult 필수), 추가 버튼 N개, **Standalone 답변 가이드** (선택사항 — 비워두면 Clark 기본 안내 문구 사용) | |
| Case | *(Phase 1.5 이후 — 목업 범위 외)* | — |

### A-1. Case 1~4 매트릭스 — KC매칭 × Playbook감지

KC 체인 매칭 여부와 Playbook 감지 여부의 조합으로 4가지 케이스가 결정된다. Case 1~4는 마이데이터 연동 상태(③④) 전용. 구현된 화면(특히 13_answer-logic.html)이 이 매트릭스를 정확히 반영하는지 확인한다.

| 케이스 | KC Concept 매칭 | Playbook 감지 | 처리 방식 |
|---|---|---|---|
| Case 1 | O | X | KC 구조화 답변 |
| Case 2 | O | O | KC 구조화 + CTA 버튼 |
| Case 3 | X | X | RAG(약관→FAQ) → Fallback 생성형 |
| Case 4 | X | O | Standalone 가이드 주입 + CTA 버튼 |

**핵심 제약:**
- Concept에 Standalone 기능 없음 — 구 기획 흔적(Concept Standalone 표현) 있으면 오류
- Playbook이 Case 4로 KC 미매칭 시나리오 전체를 커버
- Concept 미매칭 시 반드시 Case 3 또는 Case 4로 분기

---

### B. 워크플로우 — v2 캔버스 UX 기준 정합성

v2에서 **카드 연결은 편집기가 아닌 캔버스(`00_canvas-main.html`)에서 처리**한다. 편집기는 내용 입력·검수 요청만 담당.

**편집기 흐름:**
| 워크플로우 | 기준 상태 흐름 |
|---|---|
| 모든 카드 공통 | 내용 입력 → 임시저장 → 검수 요청 → 승인(라이브) / 반려 |
| Policy 카드 | 임시저장 → Clark 앱 표시 문구 입력 → 승인요청 → 준법감시인 2단계 → 라이브 |
| Playbook 카드 | 임시저장 → 키워드(3개 이상)+전환액션 입력 → 승인요청 → 승인완료 → 라이브 전환 → 활성 / 일시중지 |
| Case 카드 | *(Phase 1.5 이후 — 목업 범위 외)* |

**연결 처리 위치 (v2 캔버스 기준):**
| 연결 방향 | 처리 위치 | 편집기 표시 |
|---|---|---|
| Concept → Risk-type | 카드 캔버스 | 읽기 전용 배지 + "캔버스에서 변경" 버튼 |
| Risk-type → Rule | 카드 캔버스 | 읽기 전용 배지 |
| Rule → Evidence | 카드 캔버스 | 읽기 전용 배지 목록 |
| Rule → Policy | 카드 캔버스 | 읽기 전용 배지 |
| Policy, Evidence, Playbook | outgoing 없음 (체인 종단) | — |

**핵심 제약 반영 여부 (v2):**
- [ ] Concept 편집기: Risk-type 선택 패널 없음. 읽기 전용 배지 + "캔버스에서 변경" 버튼인가?
- [ ] Rule 편집기: Risk-type·Evidence 연결 선택 UI 없음. 읽기 전용 배지 표시인가?
- [ ] Policy 편집기: Rule 선택 패널 없음. 읽기 전용 배지 + "캔버스에서 변경" 버튼인가?
- [ ] Policy 카드는 준법감시인의 2단계 승인이 표시되어 있는가?
- [ ] Policy 편집기: Policy 이름(name) + Clark 앱 표시 문구(appDisplayText) 2개 필드만 있는가?
- [ ] Policy 편집기: 규제 문서명·적용 범위·핵심 조항·출력 대상 화면·출력 제한 설정·준수 체크리스트 필드가 없는가?
- [ ] Policy 편집기: Clark 앱 표시 문구 비어있으면 검수 요청 버튼이 비활성화되는가?
- [ ] wf-tracker가 4단계(내용 입력 → 검수 요청 → 승인완료 → 라이브)로 구성되어 있는가?
- [ ] 00_canvas-main.html: 카드 클릭 시 슬라이드 패널이 열리고 읽기 전용 정보가 표시되는가?
- [ ] 00_canvas-main.html: 패널 하단에 "편집기에서 수정" 링크가 있는가?
- [ ] 00_canvas-main.html: 캔버스 카드 배치가 Concept → Risk → Rule → Evidence → Policy 순서인가?
- [ ] 10_chain-visualizer.html이 사이드바 메뉴에서 제거되어 있는가?

**Playbook MVP 특이사항:**
- [ ] Playbook 편집기 공개범위 필드 없음: Card ①에 공개범위 form-group이 없는가? (내부 전용 고정, 편집기 미표시 — 목록 화면에서만 badge-internal 배지 표시)
- [ ] Playbook 편집기 Card ② 하단: Standalone 답변 가이드 textarea가 있는가? (border-top 구분선 분리)
- [ ] Standalone 답변 가이드: **선택사항** — 비워두면 Clark 기본 안내 문구 사용. "20자 이상 필수" 표현이 없는가? (삭제된 스펙, 있으면 오류)
- [ ] Standalone 발동 조건 안내 배너: "KC 카드 미매칭 + Playbook 키워드 감지 시(Case 4)" 설명이 있는가?
- [ ] Standalone 배너의 케이스 가이드 링크: `13_answer-logic.html`로 연결되어 있는가? (`14_answer-logic-guide.html`은 삭제된 파일)
- [ ] Playbook: approved 상태에서 캔버스 연결 없이 직접 "라이브 전환" 가능한가? (Playbook은 단말 카드 — 캔버스 연결 불필요)
- [ ] 가이드 파일(01·13·15·17) 사이드바에 "데이터 연결 구조(17)" 링크(`17_system-data-guide.html`)가 있는가? (14 파일은 삭제됨)
- [ ] `17_system-data-guide.html`의 Evidence 표기가 단일 유형(공인 외부 통계 기반)으로 되어 있는가? (보닥통계·프롬에이지 기반 표기 없어야 함 — 2026-06-17 재확정)
- [ ] Playbook 편집기 Card ③: 상담 연결 버튼 없을 때 비활성(회색) 상태로 표시되는가?
- [ ] Playbook 편집기 Card ③: 상담 연결 버튼 있을 때 "GA 수신 스펙 확정 후 구성 예정" 플레이스홀더 표시되는가?
- [ ] Playbook 편집기: GA 전달 데이터 설정 UI가 없거나 deferred로 명확히 표시되는가? (GA 수신 스펙 미확정)
- [ ] Playbook 목록: 상태별 액션 버튼이 올바른가? (review 상태에서 편집 버튼 없음 등)

### C. 권한 — 역할별 UI 차이

기획서 §3-1의 권한 범위가 UI에 반영되어 있는지 확인한다.

| 역할 | 기획서 권한 | UI 반영 확인 |
|---|---|---|
| 작성자(고객경험팀장) | 전체 카드 CRUD, 검수 요청 발행 | 모든 편집·삭제·검수요청 버튼 활성 |
| 도메인 검수자(더파트너스) | 카드 조회·검수 가능, 생성·수정 불가 | 편집·삭제 버튼 미노출 또는 disabled |
| 준법감시인 | Policy·Rule 규제 항목 최종 승인, 생성·수정 불가 | Policy 카드에 "최종 승인" 버튼만 표시 |

### D. 공개범위 — 편집기 미표시 / 목록 배지 정합성

카드 유형별 공개범위가 편집기에 **표시되지 않아야** 하며, 목록 화면에서만 읽기 전용 배지로 표시된다 (2026-06-16 확정).

| 카드 유형 | 공개범위 (고정) | 편집기 | 목록 화면 |
|---|---|---|---|
| Concept | 고객 공개 | ❌ form-group 없음 | ✅ badge-public |
| Risk-type | 고객 공개 | ❌ form-group 없음 | ✅ badge-public |
| Rule | 공통 기준 | ❌ form-group 없음 | ✅ badge-baseline |
| Evidence | 내부 전용 | ❌ form-group 없음 | ✅ badge-internal |
| Policy | 내부 전용 | ❌ form-group 없음 | ✅ badge-internal |
| Playbook | 내부 전용 | ❌ form-group 없음 | ✅ badge-internal |
| Case | *(Phase 1.5 이후)* | — | — |

**확인 포인트:** 각 카드 편집기(04~08, 16 card-editor-*.html)에 공개범위 `<div class="form-group">` 블록이 없어야 한다.

### E. Risk-type ID·명칭 정합성

기획서 §2-2의 단일 진실원 표와 모든 화면의 표기가 일치하는지 확인한다.

| ID | 명칭 | 비고 |
|---|---|---|
| T01 | 무보장형 | |
| T02 | 암투병생활비 부족형 | |
| T03 | 심혈관질환보장 협소형 | |
| T04 | 뇌혈관질환보장 협소형 | |
| T05 | 노후돌봄보장 공백형 | |
| T07 | 비용 대비 보장 비효율형 | |
| T08 | 생애주기 적합도 저조형 | |
| T09 | 단기납 만기 후 공백형 | |
| T10 | 고액 보험료 유지 부담형 | paused (시장 기준 개정 중) |
| T11 | 실손보장 중복 가입형 | rejected |
| T12~T14 | (명칭은 컨텐츠 관리) | T14: 운전여부=유 필수 |
| T17~T19 | (명칭은 컨텐츠 관리) | T17: 나이 50~85세 |
| T20 | 후유장해형 | |
| T21 | 치과형 | |
| T22 | 상해 특화형 | |
| T23 | 골절형 | |

**제외 코드:** T06·T15·T16 제거됨. T10 paused, T11 rejected.

### F. Rule 조건 빌더 — 필드·연산자 정합성 (2026-06-22 확정: 3-source + 필수/선택 구분)

조건 빌더에서 선택 가능한 source·필드·연산자가 `context/decisions.md` 기준과 일치하는지 확인한다.
**주의: Amplitude는 완전 제거됨. MYDATA + 프롬에이지 + 프로파일 3-source가 정답. 화면 표기는 마이데이터/프롬에이지.**

- [ ] source 선택: **마이데이터(MYDATA) / 프롬에이지(PROMAGE) / 프로파일** 세 가지인가? (AMPLITUDE select는 없어야 함)
- [ ] 각 ConditionRow에 required boolean 속성(필수/선택 구분)이 있는가?
- [ ] MYDATA 행: required=true (기본 필수). 화면에 "필수" 표시인가?
- [ ] 프롬에이지(PROMAGE) 행: required=false (기본 선택 — 미연동 사용자 대응). 화면에 "선택" 표시인가?
- [ ] 프로파일 행: required=true (기본 필수). 화면에 "필수" 표시인가?
- [ ] MYDATA 행 구조: 담보코드(col2) + 확인항목(col3) 분리 — coverage_amt / renewal_status / insu_type / start_date / end_date
- [ ] 프롬에이지 행 구조: 위험도 select (암위험도+질병위험도 50개 항목 통합, 생체나이·의료비예측 없음) + 조건(같음 고정) + 기준값(위험/주의/양호)
- [ ] 프로파일 행 구조: 항목 select (나이/성별/결혼/자녀/운전여부 5개 — 직업위험도/출산예정/거주지 없음) + 조건 + 기준값
- [ ] 연산자: IN / NOT_IN / EQ / LT / GT / GTE / LTE (표기는 한국어 병기)
- [ ] 행별 배경색 구분: MYDATA(기본 회색) / 프롬에이지(보라 계열 `.cond-row-promage`) / 프로파일(초록 계열 `.cond-row-profile`)
- [ ] 등급명: **위험/주의/양호** 사용 — "상/중/하" "고/중/저" 표기 있으면 오류
- [ ] Rule 카드: 약관 DB 연동 **체크박스 없음** (엔진 자동 처리 — 운영자 제어 불필요)

### G. Evidence 편집기 — 데이터 구조 정합성 (2026-06-17 재확정)

- [ ] Evidence 유형 select 없는가? (단일 유형 — 보닥통계/프롬에이지 옵션 없어야 함)
- [ ] 출처 기관 select: **5개 옵션** (HIRA/NHIS/KOSTAT/FSS/OTHER)
- [ ] OTHER 선택 시 기관명 직접 입력 필드(`#agencyOtherSection`) 노출되는가?
- [ ] 보고서명·기준연도·지표명·기준값 필드 모두 있는가?
- [ ] 기준값: 단위 포함 자유 입력 (수치만 입력 강요하는 별도 단위 select 없는가)
- [ ] 출처 URL: 선택사항 표기 있는가? (필수 마크 없어야 함)
- [ ] staticSection / promageSection / metricSection / populationSection 없는가?
- [ ] N-segment 빌더 관련 코드 없는가?

### H. Risk-type 우선순위 — 가중치 완전 제거 확인 (2026-06-22 확정)

Risk-type 다중 감지 시 우선순위 로직이 가중치 없는 서열 방식인지 확인한다.

- [ ] Risk-type 중요도 라디오: 높음/보통/낮음 서열 표기인가? (×3/×2/×1 가중치 표기 있으면 오류)
- [ ] 우선순위 1순위: 중요도 서열 (높음 > 보통 > 낮음)
- [ ] 우선순위 2순위: 선택 조건 충족 개수 (시스템 자동 계산)
- [ ] 우선순위 3순위: 최근 배포순 (가장 최근 라이브 전환일 우선)
- [ ] 코드·문서에서 "가중치" "×3" "×2" "×1" 표현이 없는가?

### I. 카피라이팅 검수

- [ ] `guides/copywriting.md` 금지어 목록 전수 확인 — 화면/레이블/placeholder/문서 텍스트 모두

---

## 리포트 형식

검증 완료 후 PO(02)에게 아래 형식으로 보고한다.

```
## 기획 정합성 검토 리포트 — [파일명]

### 일치 항목
- A(Concept), B(일반 워크플로우), D(공개범위 배지 정합성) ... 

### 불일치 항목 (수정 필요)
| 항목 | 기획서 근거 | 현재 구현 | 수정 방향 |
|---|---|---|---|
| C-도메인검수자 | §3-1 "직접 생성/수정 불가" | 편집기에 [수정] 버튼이 활성화되어 있음 | 도메인 검수자 뷰에서 [수정] 버튼 disabled 처리 |

### 확인 필요 항목 (Open Question)
- 기획서에 명시 없음: Case 카드 편집기의 "태그 추가" 필드는 기획서에 없는 UI. 추가 의도 확인 필요.

### 종합 의견
불일치 항목 해소 후 사용자 검토 가능 / 재검토 필요
```

---

## 행동 원칙

- 기획서 원문을 직접 인용하여 불일치 항목을 지적한다.
- 기획서 해석이 모호한 경우, 구현을 수정하는 대신 `[Open Question]`으로 등록하여 PO에게 보고한다.
- 기획서에 명시되지 않은 UI 요소(코더가 임의 추가한 것)는 "확인 필요"로 표시하되 즉시 삭제를 요구하지 않는다.
- 기술 구현 품질(코드 스타일, 성능 등)은 언급하지 않는다.

---

## 입력 / 출력

**입력:** 코더(04)의 `mockups_v2/` HTML 파일, `Data/KC_기획서_v1_6_1.md` (특히 §2, §3).

**출력:** 화면별 기획 정합성 검토 리포트 (PO에게 전달).

---

## RAG 아키텍처 정합성 검수 (2026-06-21 확정)

- [ ] 약관 RAG: 자동 파이프라인(크롤러 자동). 운영자 관리 화면이 없어야 함
- [ ] Clark 서비스 FAQ RAG: 운영자 직접 등록 → 즉시 인덱스 등록 (`19_faq-rag.html`, 승인 프로세스 없음)
- [ ] Fallback: `18_system-settings.html` 설정 적용 (경쟁사/외부 서비스 언급 금지 등)
- [ ] KC 체인 매칭 실패 시 처리 순서: RAG → Fallback (역순 없음)
- [ ] 약관 RAG와 FAQ RAG가 별도 파이프라인으로 구분되어 있는가?

---

## CONNECT_RULES 정합성 검수 (2026-06-22 확정)

카드 간 연결 방향과 필수/선택 여부가 아래 규칙과 일치하는지 확인한다.

| 연결 방향 | 필수 여부 | 비고 |
|---|---|---|
| Concept → Risk-type | **필수** | 연결 없으면 KC 체인 미진입 |
| Risk-type → Rule | **필수** (최소 1개) | |
| Rule → Evidence | **필수** (최소 1개) | |
| Rule → Policy | 선택 | |
| Evidence | 단말 (outgoing 없음) | |
| Policy | 단말 (outgoing 없음) | |
| Playbook | 단말, 독립 체인 | KC 체인과 별개 |

- [ ] Concept → Risk-type 연결이 필수로 표시되어 있는가? (optional 표현 있으면 오류)
- [ ] Evidence·Policy·Playbook이 단말 카드로 처리되어 있는가? (outgoing 연결 불가)
- [ ] Playbook이 KC 체인과 독립적으로 동작하는 구조인가?
- [ ] 캔버스(00_canvas-main.html) 이외 편집기에서 연결 UI가 없는가?

## 파일 참조 기준 (2026-06-22 확정)

검수 시 아래 파일명을 기준으로 한다. 폐기된 파일명이 화면·문서에 나타나면 오류.

| 용도 | 올바른 파일 | 폐기 파일 (언급 금지) |
|---|---|---|
| 카드 캔버스 (카드 연결·시각화) | `00_canvas-main.html` | `10_chain-visualizer.html` |
| AI 답변 로직 가이드 | `13_answer-logic.html` | — |
| Playbook Standalone 안내 | `13_answer-logic.html` | `14_answer-logic-guide.html` (삭제됨) |
| FAQ RAG 관리 | `19_faq-rag.html` | — |
| 시스템 설정 (Fallback) | `18_system-settings.html` | — |

- [ ] 사이드바 메뉴에서 `10_chain-visualizer.html` 링크가 없는가?
- [ ] wf-tracker ④ 링크가 `00_canvas-main.html`로 연결되어 있는가?
- [ ] 총 화면 수가 26개(mockups_v2/)인가?

---

## 19_faq-rag.html 검수 포인트 (2026-06-21 추가, 2026-06-22 상태 재확정)

**Clark 서비스 전용 FAQ RAG 관리 화면 정합성:**

- [ ] 상단 안내 배너: "약관·보장 관련 Q&A 등록 금지" 문구 있는가?
- [ ] 목록 테이블: 상태 필터 **2종** (전체/인덱스등록됨/초안) 있는가? (검수대기·반려됨 없어야 함)
- [ ] 등록 패널: LLM 초안 자동 생성 버튼 없는가? (운영자 직접 입력만)
- [ ] 상태 **2종**: 초안(`badge-draft`) / 인덱스등록됨(`badge-active`) 배지만 표시되는가? (badge-review·badge-rejected 없어야 함)
- [ ] **승인 프로세스 없음** — 승인·반려·재검수 버튼이 없는가? 등록 즉시 인덱스 반영이어야 함
- [ ] 사이드바: 18_system-settings.html 하위 항목으로 표시되는가?
- [ ] 화면 역할 안내: "Clark 서비스 고유 Q&A(앱 사용·보닥 플래너·서비스 정책)" 등록임이 명시되어 있는가?
