# KC Admin — 확정된 설계 결정

> 세션 논의를 거쳐 확정된 설계 결정. 기획서(`Data/`)와 충돌 시 이 파일이 우선.
> 에이전트 03·04·04a·04b·05·06·08이 읽는다.
> **관리 주체: PO(02)** — 결정 확정 시 즉시 업데이트. 미확정 항목은 아래 `## 미결 항목`에 먼저 등록.

---

## 미결 항목

> 논의됐지만 아직 확정되지 않은 항목. 확정 시 본문 섹션으로 이동, 폐기 시 행 삭제.

| 항목 | 논의 내용 | 미결 이유 | 등록일 |
|---|---|---|---|
| (현재 없음) | — | — | — |

---

## Evidence = 쿼리 정의 카드 (2026-06-09 확정, 2026-06-10 유형 통합)

수치 직접 입력 없음. 담보코드·조회지표·모집단만 지정 → KC Engine이 상담 시 자동 조회.

**유형 2종** (마이데이터 기반 → 보닥통계 통합, 질병코드 기반 → `12_coverage-code-table.html` 이관, 2026-06-16 약관면책 Evidence 제거 → Rule 약관 DB 연동 플래그로 대체):

| 유형 | select값 | 표시 섹션 | 추가 필드 |
|---|---|---|---|
| 보닥통계 기반 | `stat` | `#staticSection` | 담보코드 + 조회지표 + 모집단 라디오 |
| 프롬에이지 기반 | `fromage` | `#promageSection` | 카테고리·항목 선택 + 출력형식 체크박스 |

- 2개 옵션 플랫 select 구조
- **약관 면책사항 처리 방식 (2026-06-16 확정):** Evidence 카드 방식(운영자 수동 입력) 폐기. 약관 DB 크롤링 파이프라인이 보험사 약관을 자동 수집·DB화. Rule 카드에 "약관 DB 연동" 플래그(선택사항) 추가 → Rule 조건 충족 시 해당 담보코드 기준으로 약관 DB 자동 조회 → Clark 답변에 ⚠️ 면책조항 섹션 자동 포함.
- **Evidence ID 자동생성 형식 (fromage 전용, 백단 처리):** `EVID.HEALTH.{idKey}.{fieldCode}.V1` — UI 비노출
- 프롬에이지 선택 시 §3-8 민감정보 배너 표시 (원본 수치 노출 금지)

**조회지표 8종 (2026-06-10 확정, 5종 → 8종 확장):**

| 계열 | 지표 | 답변 패턴 | 연관 위험유형 |
|---|---|---|---|
| 비율(%) | 미보유율 | "X%가 해당 담보 없음" | T01 T02 T05 |
| 비율(%) | 보유율 | "X%가 해당 담보 보유" | T03 T04 |
| 비율(%) | 소액가입비율 | "X%가 기준금액 미만 가입" (기준: KC Engine 내부 정의) | T02 T03 T07 |
| 비율(%) | 갱신형비율 | "X%가 갱신형 가입" | T06 T09 |
| 금액(원) | 평균보장금액 | "평균 보장금액 X만원" | T02 T08 |
| 금액(원) | 중위보장금액 | "절반이 X만원 이상 보유" | T02 T08 |
| 금액(원) | 평균월보험료 | "월 평균 보험료 X만원" | T10 T06 |
| 기간(년) | 평균납입기간 | "평균 납입 기간 X년" | T06 T09 |

- UI: optgroup 2depth select (비율 계열 / 금액 계열 / 기간 계열)
- 소액가입비율의 임계금액은 KC Engine 스펙에서 담보별 표준 정의 — Admin UI 입력 없음
- 중복가입비율은 담보 간 교차 집계 필요 → Phase 2 이관

**보닥통계 기반 — 모집단 라디오 구조 (2026-06-10 확정):**

| 선택 | 노출 UI |
|---|---|
| ○ 전체 보닥 사용자 (`value="all"`) | "전체 보닥 사용자 기준" 안내 div (`#allPopInfo`) |
| ● 세그먼트 지정 (`value="segment"`) | `#segmentSection` 노출 |

**세그먼트 지정 시 필드:**
- 연령대 select + 성별 select — **필수 2개**
- 추가축 (`#extraSegmentSection`) — **선택사항, N개 동적 추가** (중복 필드 불가, 최대 5개)
  - [프로파일 항목 select] [값 select] [× 삭제] 행을 동적으로 추가
  - 항목: 결혼여부 / 자녀유무 / 직업위험도 / 출산예정 / 거주지
  - 나이·성별은 필수 연령+성별 축과 중복이므로 추가축에서 제외
  - 이미 선택된 항목은 다른 행의 드롭다운에서 비활성 처리
  - 모든 5개 항목이 선택되면 "추가" 버튼 숨김

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

## 프롬에이지 연동 설계 (2026-05-20 확정)

Clark 앱 Step 5 → "더 정밀한 진단" → Step 6 건강정보 연동 동의 → Step 7 고도화 진단.

**Evidence 카드 2개 (KC 엔진 스펙 확정 후 실질화):**
- `EV.FROMAGE.CANCER_RISK.V1` — 암 위험도 등급
- `EV.FROMAGE.METABOLIC_AGE.V1` — 대사나이 격차

**처리 원칙:**
- 원본 수치 → 보닥 서버(국내)에만 저장
- Clark 출력 → 위험/주의/양호 3단계 등급명만 (수치·percentile 노출 금지)
- Promage 결과는 Rule 조건 없이 Evidence 카드로 직접 참조

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
라이브 카드만 연결 가능: 임시저장·승인요청은 비활성 표시 (opacity:0.4, pointer-events:none)
