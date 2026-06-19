# KC Admin — 확정된 설계 결정

> 세션 논의를 거쳐 확정된 설계 결정. 기획서(`Data/`)와 충돌 시 이 파일이 우선.
> 에이전트 03·04·04a·04b·05·06·08이 읽는다.
> **관리 주체: PO(02)** — 결정 확정 시 즉시 업데이트. 미확정 항목은 아래 `## 미결 항목`에 먼저 등록.

---

## 미결 항목

> 논의됐지만 아직 확정되지 않은 항목. 확정 시 본문 섹션으로 이동, 폐기 시 행 삭제.

| 항목 | 논의 내용 | 미결 이유 | 등록일 |
|---|---|---|---|
| Playbook ← Risk-type 연결 | Risk-type 관점의 리드 전환·배정 최적화. CONNECT_RULES.risk에 'playbook' 추가 필요 | Phase 1.5+ 이관 (리드 스코어링 스펙 확정 시 추가) | 2026-06-17 |

---

## 카드 라이프사이클 — 승인완료 후 연결·테스트·라이브 전환 (2026-06-18 확정)

**흐름:** 임시저장 → 승인요청 → **승인완료(캔버스 연결 가능)** → Dry-run → **라이브 전환** → KC Engine 반영

| 단계 | 상태 | 캔버스 연결 | KC Engine |
|---|---|---|---|
| 내용 작성 | 임시저장(draft) | ❌ 불가 | ❌ 미반영 |
| 검수 중 | 승인요청(review) | ❌ 불가 | ❌ 미반영 |
| 승인 후 | **승인완료(approved)** | ✅ **준비 연결 가능** | ❌ 미반영 (pending edge) |
| 배포 완료 | 라이브(active) | ✅ 라이브 연결 | ✅ 반영 |

- 승인완료 카드 간 연결 = **준비 연결(pending edge)**: 캔버스에는 표시되지만 KC Engine에는 미반영
- **라이브 전환** 시 pending edge → active edge: KC Engine에 즉시 반영
- Dry-run(사전 테스트) 통과 후 "배포 요청"으로 라이브 전환

---

## v2 캔버스 UX — 카드 연결 정책 (2026-06-17 확정, 2026-06-18 수정)

**작업 폴더: `mockups_v2/`** (mockups/ 는 Phase 1 완료 참조용)

### 캔버스 = 연결 전용, 편집기 = 내용 전용

| 역할 | 화면 |
|---|---|
| 카드 내용 등록·수정 | 각 카드 편집기 (`06_card-editor-concept.html` 등) |
| 카드 연결 추가·변경 | **카드 캔버스** (`00_canvas-main.html`) |
| 연결 상태 확인 (읽기 전용) | 각 카드 편집기 — "캔버스에서 변경" 버튼으로 이동 |

### 캔버스 연결 방향 (CONNECT_RULES — 확정)

```javascript
const CONNECT_RULES = {
  concept:  ['risk'],
  risk:     ['rule'],
  rule:     ['evidence', 'policy'],
  evidence: [],
  policy:   [],
  playbook: [],
};
```

- Policy → Playbook 연결: **없음** (Policy는 outgoing 없음)
- 캔버스 카드 배치 순서: Concept → Risk → Rule → Evidence → Policy (AI 답변 체인 순서)

### 캔버스 화면 구조 — 피커 + 그리드 (2026-06-17 확정)

**상단 피커 패널 (204px 고정):** 5컬럼 카드 목록
- 컬럼: CONCEPT / RISK-TYPE / RULE / EVIDENCE·POLICY (합침) / PLAYBOOK
- active + review 카드 표시 (draft 제외)
- 카드 클릭 → 하단 그리드 갱신 (포컬 카드 지정)

**Evidence·Policy 합침 근거:** 둘 다 Rule의 output 레벨 — 동일 단계에 위치

**하단 그리드 섹션 (flex-1):**
- 선택 전: 빈 상태 안내 ("위에서 카드를 선택하세요")
- 선택 후: 포컬 카드 기준 5컬럼 그리드
  - **포컬 컬럼**: 선택된 카드 상세 (타입 배지, 상태 배지, 상세보기·편집 버튼)
  - **연결됨 섹션** (초록 헤더, `sh-connected`): `computeChain()` 반환 Set 내 카드
  - **연결 가능 섹션** (파란 헤더, `sh-available`): `findDirectTarget()` 성공한 미연결 카드 + "연결 추가" 버튼
  - **해당 없음**: 연결 불가 컬럼 (불투명 처리)

**핵심 JS 함수 (확정):**
- `computeChain(cardId)`: 양방향 BFS → 전체 연결 체인 반환 (Set)
- `findDirectTarget(card, focalCard)`: CONNECT_RULES 기반 직접 연결 가능성만 체크 (체인 경유 금지)
- `findChainEdge(cardId, chainSet, focalId)`: 포컬 카드 직접 엣지 우선 반환
- `visibleCards = CARDS.filter(c => c.status !== 'draft')`: active + approved + review 표시 (draft 제외)
- 연결 가능 범위: `active` + `approved` 상태 카드만. `review`(승인요청)는 캔버스에 표시되나 연결 불가.

**카드 상태 배지 표시 (2026-06-18 수정):**
- active → `"라이브"` 배지 (초록, `gc-badge-live`)
- approved → `"승인완료"` 배지 (파랑, `gc-badge-approved`)
- review → `"승인요청"` 배지 (주황, `gc-badge-review`)

**엣지(연결) 상태:**
- `active` 엣지 → 실선 초록 — KC Engine 반영 완료
- `pending` 엣지 → 점선 파랑 — 준비 연결 (승인완료 카드 연결, 라이브 전환 시 KC Engine 반영)

**연결 액션:**
- 연결 추가: "연결 가능" 카드의 전폭 파란 "연결 추가" 버튼 → 확인 모달
  - 양쪽 카드가 모두 active: edge status = `'active'`
  - 한쪽이라도 approved: edge status = `'pending'` (준비 연결)
- 연결 제거: 연결된 카드의 "연결 제거" 버튼 → 확인 모달 (`findChainEdge` 반환 엣지 대상)

### 카드 등록 순서 자유화 (확정)

- 편집기 내 연결 선택 UI 제거 → 등록 순서 의존성 없어짐
- 각 카드는 순서 무관하게 등록·검수·승인 가능
- **승인완료(approved) 상태부터 캔버스에서 연결 구성 가능** (라이브 전환 전 사전 연결 허용)
- Dry-run 통과 후 라이브 전환 → KC Engine 반영

### 사이드바 v2 표준 (확정 — 2026-06-17)

- 로고 옆 "v2" 배지 추가
- "카드 캔버스" 메뉴 항목 추가 → `00_canvas-main.html`
- "카드 연결 현황" (10_chain-visualizer.html) 메뉴 제거
- **`<div class="nav-section">` 섹션 레이블 완전 제거** — `nav-divider`만 사용 (업무 흐름·참조·시스템 레이블 불가)
- **참조 섹션 구성 (nav-divider 아래 4항목 순서):**
  1. `13_answer-logic.html` — AI 답변 로직
  2. `14_answer-logic-guide.html` — AI 답변 생성 예시
  3. `17_system-data-guide.html` — 데이터 연결 구조
  4. `15_aio-guide.html` — AIO 가이드
  5. `12_coverage-code-table.html` — 담보코드
- 표준 사이드바 HTML → `guides/ux-patterns.md` 참조

---

## Concept → Risk-type: 편집기 읽기 전용 (2026-06-17 확정)

기존: Concept 편집기 내 Risk-type 체크박스 선택 UI
변경: 읽기 전용 배지 표시 + "캔버스에서 변경" 버튼

선택 동작은 `00_canvas-main.html` 캔버스에서 처리.

> ⚠️ 이전 결정 "Concept → Risk-type: 1:N 다중 선택 (편집기 내)" 의 **UI 위치** 변경. 연결 자체의 N:M 관계는 유지.

---

## Rule / Policy 편집기 연결 UI 읽기 전용 (2026-06-17 확정)

| 편집기 | 기존 | 변경 |
|---|---|---|
| Rule 편집기 — Risk-type 연결 | select 드롭다운 | 읽기 전용 배지 + "캔버스에서 변경" |
| Rule 편집기 — Evidence 연결 | 체크박스·칩 패널 | 읽기 전용 배지 목록 |
| Policy 편집기 — Rule 연결 | 클릭 가능 목록 | 읽기 전용 배지 + "캔버스에서 변경" |

연결은 캔버스에서만 가능. 편집기 검수 요청 게이트: 내용 필드만 체크 (연결 여부 게이트 제거).

---

## Evidence = 공인 외부 통계 카드 (2026-06-17 재확정)

**단일 유형: 공인 외부 통계 기반** (code: `external`)

KC 엔진이 자동으로 알 수 없는 공인 기관의 통계 수치를 운영자가 직접 입력·등록하는 카드.

**역할 구분 (확정):**
- 마이데이터(고객 보험 현황) → Rule 조건 빌더에서 필드 직접 참조. Evidence 카드 불필요.
- 프롬에이지(개인 건강 위험도) → 상담 시 자동 전달. Evidence 카드 불필요.
- 공인 외부 통계 → KC 엔진이 자동 접근 불가 → **Evidence 카드로 등록 필수.**

**Evidence 편집기 필드 (2026-06-17 확정):**

| 필드 | 필수 | 설명 |
|---|---|---|
| 제목 | ✅ | 핵심 내용 한 줄 요약 |
| 출처 기관 | ✅ | HIRA(건강보험심사평가원) / NHIS(국민건강보험공단) / 통계청 / FSS(금융감독원) / 기타 |
| 보고서명 | ✅ | 인용한 공식 보고서명 |
| 기준 연도 | ✅ | 통계 발행 연도 |
| 지표명 | ✅ | 활용할 통계 지표 명칭 |
| 기준값 | ✅ | 단위 포함 입력 (예: 3,800만원, 68%) |
| 출처 URL | 선택 | 원본 자료 링크 |
| 활용 방법 | ✅ | 어떤 Rule 임계값의 근거인지, 왜 이 수치가 기준인지 |

**유형 select 제거:** 단일 유형이므로 편집기에서 유형 select 불필요. 모든 Evidence = 공인 외부 통계.

**폐지 결정 (2026-06-17):**
- 보닥통계 기반 (`stat`) — 마이데이터 집계치. 내부 DB 실시간 조회 구현 어려움. Rule 조건 빌더에서 직접 처리.
- 프롬에이지 기반 (`fromage`) — 상담 시 자동 전달. Evidence 카드 등록 불필요.
- 조회지표 8종·모집단 라디오·N-segment 빌더 → 폐지.

약관 면책사항은 Rule 카드의 "약관 DB 연동" 플래그로 처리. Evidence에서 불필요.

---

## Concept → Risk-type: 1:N 다중 선택 (2026-06-10 확정)

하나의 질문 개념이 사용자 데이터에 따라 여러 Risk-type에 동시 해당 가능.

- **UI:** 체크박스 리스트 + 선택 칩 상단 미리보기 (`#selectedRiskChips`)
- **MOCK_DATA:** `linkedRiskTypes: [{id:'T02', name:'암투병생활비 부족형'}, {id:'T01', name:'무보장형'}]`
- **JS:** `toggleRiskType(id, name)` + `renderSelectedChips()`
- **CSS:** `.rt-item` / `.rt-selected`
- 선택사항 — 연결 없어도 동의어 매칭 유효

## Concept 편집기 Standalone 제거 (2026-06-10 확정)

Standalone = Case 3/4 자동 동작. 카드에 설정하는 속성 아님 → Concept 편집기 Standalone/Linked 라디오 완전 제거.
⚠️ Playbook 편집기의 "Standalone 답변 가이드" textarea는 별개 — Case 4 전용 Playbook 설정, 유지.

---

## Rule 약관 DB 연동 플래그 (2026-06-16 확정)

Rule 카드에 "약관 DB 연동" 체크박스(선택사항) 추가.

- **활성화 시:** Rule 조건 충족 → 해당 Rule의 마이데이터 담보코드 기준으로 약관 DB 자동 조회 → Clark 답변에 ⚠️ 면책조항 섹션 자동 포함
- **약관 DB 관리:** 크롤링 파이프라인이 담당 — KC Admin에서 직접 수정 불가
- **UI 위치:** Evidence 연결 카드 아래, 액션 카드 위 (별도 카드 블록)
- **담보코드 매핑:** UI에서 별도 지정 없이, 해당 Rule의 마이데이터 소스 담보코드 자동 적용

---

## Rule 조건 빌더 3-source (2026-06-08 확정)

**MYDATA + Promage + 프로파일** — Amplitude 완전 제거.

| source | 행 구조 | 배경색 클래스 |
|---|---|---|
| MYDATA | 담보코드 select + 확인항목 select + 조건 + 기준값 | `.cond-row-mydata` (기본 회색) |
| Promage | 카테고리 select (암위험도/생체나이/질병위험도/의료비예측) + 항목 select + 조건 + 기준값 | `.cond-row-promage` (보라, `#FAF8FD`) |
| 프로파일 | 항목 select (7개) + 조건 + 기준값 | `.cond-row-profile` (초록, `#F4FBF8`) |

**MYDATA 확인항목 5종:** coverage_amt / renewal_status / insu_type / start_date / end_date

**USER_PROFILE_FIELDS (확정):**

| 필드코드 | 레이블 | 타입 | 선택값 |
|---|---|---|---|
| age | 나이(만) | number | — |
| gender | 성별 | enum | 남/여 |
| marital | 결혼여부 | enum | 기혼/미혼 |
| has_children | 자녀유무 | enum | Y/N |
| job_risk | 직업위험도 | enum | 비위험/중위험/고위험 |
| expecting | 출산예정 | enum | Y/N |
| region | 거주지 | enum | 서울/경기/인천/부산/대구/광주/대전/울산/세종/강원/충북/충남/전북/전남/경북/경남/제주 |

**등급명 (§3-8 확정):** 위험 / 주의 / 양호 — "상/중/하" "고/중/저" 표기 금지.

---

## 프롬에이지 연동 설계 (2026-06-17 재확정)

Clark 앱 Step 5 → "더 정밀한 진단" → Step 6 건강정보 연동 동의 → Step 7 고도화 진단.

**프롬에이지는 Evidence 카드 불필요 — 상담 시 자동 전달:**
- 마이데이터·프롬에이지·프로파일은 상담 시 KC 엔진에 실시간 자동 전달
- Rule 조건 판단에 직접 활용 (Evidence 카드 별도 등록 없음)
- ~~EV.FROMAGE.CANCER_RISK.V1, EV.FROMAGE.METABOLIC_AGE.V1~~ — **[폐기 2026-06-17]** Evidence 카드로서의 프롬에이지 유형 폐기

**처리 원칙:**
- 원본 수치 → 보닥 서버(국내)에만 저장
- Clark 출력 → 위험/주의/양호 3단계 등급명만 (수치·percentile 노출 금지)

**Promage Evidence 출력 형식 (2026-06-10 확정):**

| 형식 | 답변 예시 | 데이터 소스 |
|---|---|---|
| 절대값 | "대사나이 실제 나이 대비 +5세" | 개인 Promage 수치 |
| 백분위 | "심혈관 위험도 동년배 상위 20%" | 보닥 Promage 전체 분포 (KC Engine 산출) |

- UI: 체크박스 복수 선택 (`pFmtAbsolute` / `pFmtPercentile`), 기본값 절대값 checked
- 최소 1개 필수, 둘 다 선택 가능 — 두 정보를 함께 근거로 제공할 수 있음
- 백분위 계산 기준 데이터는 KC Engine 내부 처리 (Admin UI 입력 없음)

---

## Playbook MVP (2026-06-08 확정)

공개범위: 내부 전용 고정 (변경 불가). 색상: `--card-playbook: #6B4A9A`.

**편집기 5-card 구조:**

| 카드 | 내용 |
|---|---|
| Card ① | 기본정보 — Playbook명, 설명 (공개범위: 내부 전용 고정, 편집기 미표시) |
| Card ② | 리드 전환 레이어 — 발화 키워드(최소 3개) + 전환 액션(기본 버튼 필수 + 추가 버튼 N개) + Standalone 답변 가이드(20자 이상 필수) |
| Card ③ | 리드 스코어링 — Phase 1.5 이관. scoring-inactive/active 토글 구현 |
| Card ④ | 배정 최적화 — Phase 2 잠금 UI |
| Card ⑤ | 액션 — 검수 요청 / 임시저장 |

**버튼 유형 3종:**

| value | 표시 | 역할 |
|---|---|---|
| `consult` | 💬 상담 연결 | GA lead data 전송 트리거. Card ③ 활성화 조건 |
| `deeplink` | 🔗 앱 내 이동 | 딥링크 기반 인앱 이동 |
| `external` | 🌐 외부 링크 | 외부 URL 이동 |

**Playbook 상태별 액션 버튼:**

| 상태 | 버튼 |
|---|---|
| draft | 편집 + 삭제 |
| review | 요청 취소 |
| approved | 라이브 전환 + 편집 |
| active | 일시중지 + 편집 |
| paused | 재시작 + 편집 |

**Standalone 배너 링크:** `14_answer-logic-guide.html` (`17_playbook-answer-guide.html`은 삭제된 파일 — 사용 금지)

---

## 면책 문구 관리 — Policy 카드 (B안 확정)

Clark 앱 면책 고지 문구는 **Policy 카드 "Clark 앱 표시 문구" 필드**로 관리.
준법감시인 승인 후 KC API를 통해 앱에 즉시 반영. 앱 코드 하드코딩 금지.

**Policy 편집기 기본정보 카드 순서:**
규제 문서명 → 적용 범위 → 핵심 조항 요약 → **[border-top] Clark 앱 출력 설정 섹션** → 준수 체크리스트(3번: "Clark 앱 표시 문구 입력 완료")

---

## LLM 기본 응답 가이드라인 — 시스템 설정 (2026-06-19 확정)

**배경:** KC Concept 카드 미매칭 시 LLM이 자유 생성형 답변을 출력하면 경쟁사·유사 서비스를 안내할 위험이 있음. Policy 카드(KC 체인 연결 구조)와 구분되는 **시스템 수준 설정**으로 관리한다.

**위치:** `18_system-settings.html` — 카드 등록·검수 흐름과 무관. 사이드바 ④ 사전 테스트 하단 별도 항목.

**동작:**
- Case 3·4 (Concept 미매칭) 발생 시 시스템이 이 설정을 자동 로드
- 금지 사항·허용 범위·마무리 문구를 LLM 시스템 프롬프트에 주입
- KC 카드 체인(Rule·Evidence·Policy)과 완전히 독립 동작

**설정 필드:**

| 필드 | 필수 | 설명 |
|---|---|---|
| 금지 사항 | ✅ | 경쟁사·외부 서비스 언급 금지 등 LLM 금지 규칙 (줄바꿈 구분) |
| 허용 답변 범위 | 선택 | LLM이 답변할 수 있는 허용 범위 정의 |
| 마무리 안내 문구 | 선택 | 모든 Fallback 답변 끝에 자동 추가되는 전문가 연결 유도 문구 |

**반영:** 저장 즉시 Clark AI에 반영. 카드 등록·검수·승인 흐름 없음. 상태 개념 없음 (항상 라이브).

---

## Risk-type 다중 감지 시 노출 우선순위 (2026-06-19 확정)

**배경:** 사용자 보험 진단 결과 복수 Risk-type이 동시에 감지될 때 노출 순서 기준 필요. 운영자 번호 필드 방식은 카드 수 증가 시 관리 불가.

**확정 방식:** 운영자 중요도 가중치 × 시스템 자동 Rule 충족 강도 산출

**최종 점수 공식:**

```
점수 = 중요도 가중치 × (Rule 충족 개수 + 충족 심각도)
```

**중요도 가중치 (3단계):**

| 중요도 | 가중치 | 의미 |
|---|---|---|
| 높음 | 3 | 진단 우선 노출 |
| 보통 | 2 | 기본 (default) |
| 낮음 | 1 | 후순위 노출 |

**운영자 설정:** Risk-type 편집기에 "중요도" 라디오 (높음/보통/낮음) 추가. 세부 순서는 시스템 자동 계산.

**동점 처리:** 동점 시 카드 코드 오름차순(T01 우선).

---

## 보험금 청구 이력 미활용 (의도적 설계)

Clark 앱 Step 2 "보험금 청구 이력(최근 2년)"은 Rule 조건으로 사용하지 않음.
이유: 금소법·개인정보보호법 저촉 소지. 수집은 하되 Rule 활용 금지.

---

## 타입코드 운영 정책 (T01~T10)

| ID | 명칭 | 상태 |
|---|---|---|
| T01 | 무보장형 | active |
| T02 | 암투병생활비 부족형 | active |
| T03 | 심혈관질환보장 협소형 | active |
| T04 | 뇌혈관질환보장 협소형 | active |
| T05 | 노후돌봄보장 공백형 | active |
| T06 | 납입여력부족 우려형 | active |
| T07 | 비용 대비 보장 비효율형 | active |
| T08 | 생애주기 적합도 저조형 | active |
| T09 | 단기납 만기 후 공백형 | active |
| T10 | 고액 보험료 유지 부담형 | paused (시장 기준 개정 중) |

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

## 카드 편집기 공개범위 필드 제거 (2026-06-16 확정)

공개범위는 카드 유형에 따라 자동 고정되므로 운영자가 변경할 수 없다. 따라서 모든 카드 편집기에서 공개범위 form-group을 완전 제거.

| 카드 유형 | 공개범위 (고정) | 편집기 표시 |
|---|---|---|
| Concept | 고객 공개 (`badge-public`) | ❌ 미표시 |
| Risk-type | 고객 공개 (`badge-public`) | ❌ 미표시 |
| Rule | 공통 기준 (`badge-baseline`) | ❌ 미표시 |
| Evidence | 내부 전용 (`badge-internal`) | ❌ 미표시 |
| Policy | 내부 전용 (`badge-internal`) | ❌ 미표시 |
| Playbook | 내부 전용 (`badge-internal`) | ❌ 미표시 |

**배지는 목록 화면(card-library, 각 *-list.html)에서만 표시. 편집기(card-editor-*.html)에는 공개범위 form-group 없음.**

---

## AIO 가이드 구조 단순화 (2026-06-16 확정)

`15_aio-guide.html` 섹션 구조:

① AIO란? → ② AI 참조 메커니즘 → ③ AIO 활용 필드 (고객 공개 카드 전용 + 프롬에이지 caution) → ④ Schema.org → ⑤ llms.txt (+ AIO 효과 측정)

- ③ AIO 활용 필드: 고객 공개 카드(Concept·Risk-type)의 필드별 활용 방식만 정의. Evidence·Rule·Policy·Playbook은 AIO 색인 제외 (내부 전용 또는 공통 기준 카드).
- ⑥ 운영 기준 섹션: ③와 실질적으로 동일한 내용 → 완전 삭제.

---

## 카드 편집기 카드 블록 구조 (원칙 6)

| 편집기 | card 수 | 구성 |
|---|---|---|
| ① Risk-type, ② Evidence | 2-card | 기본정보 / 액션 |
| ③ Concept, ⑤ Policy | 3-card | 기본정보 / 연결 패널(1개) / 액션 |
| ④ Rule | 5-card | 기본정보 / Risk-type 연결(필수) / 판단 조건 / Evidence 연결(필수) / 액션 |

연결 패널을 기본정보 카드 안에 섞지 않는다.

---

## 카피라이팅 핵심 (상세: guides/copywriting.md)

| 금지 | 대체 |
|---|---|
| 런타임에 | 상담 시 자동으로 |
| 파라미터 | 조회 조건 |
| 라우팅 | AI 답변 경로 |
| 매핑 | 연결 |
| 비활성 | 선택 불가 |
| 상/중/하 | 위험/주의/양호 |

코드+명칭 병기 필수: `T02 암투병생활비 부족형` (코드 단독 표시 금지)
연결 가능 카드: 승인완료(approved)·라이브(active) — 임시저장·승인요청은 비활성 표시 (opacity:0.4, pointer-events:none). 승인완료 카드 연결 = 준비 연결(pending edge, 점선 파랑)
