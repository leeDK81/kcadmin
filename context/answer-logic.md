# KC Admin — AI 답변 로직

> **진실원.** Case 매트릭스, RAG 정책, FAQ RAG 스펙은 이 파일이 기준.
> 변경 시 PO(02)가 이 파일을 즉시 업데이트한다.

---

## 사용자 데이터 상태 — 선행 분기 (2026-06-26 확정)

> **Clark과 KC Engine은 별개 서비스·별개 법인이다.**
> KC Engine은 Clark의 회원 DB에 접근할 수 없다. Clark이 API 호출 시 `user_state` 파라미터를 명시적으로 전달해야 KC Engine이 분기를 결정할 수 있다.

### Clark → KC Engine API 호출 구조

```json
{
  "query": "암진단금 얼마야",
  "user_state": "ANONYMOUS" | "MEMBER_NO_MYDATA" | "MEMBER_WITH_MYDATA",
  "profile": { ... } or null,
  "mydata":   { ... } or null,
  "promage":  { ... } or null
}
```

KC Engine은 `user_state` 값으로 두 가지를 결정한다:
1. **Rule 평가 범위** — 어떤 데이터 조건을 평가할 수 있는지
2. **Playbook CTA 타입** — 감지 시 어떤 전환 액션을 반환할지

### Clark → KC Engine 전달 데이터 (상태별)

| 사용자 상태 | PROFILE | MYDATA | PROMAGE | 약관 RAG | KC 체인 평가 범위 |
|---|---|---|---|---|---|
| ① 미가입 | 없음 | 없음 | 없음 | 불가 | 전체 불가 |
| ② 가입 + 마이데이터 미연결 | 있음 | 없음 | 없음 | 불가 | PROFILE 조건만 |
| ③ 가입 + 마이데이터 연결 | 있음 | 있음 | 연동 시 | 가능 | 전체 가능 → Case 1~4 |

**약관 RAG 가능 조건**: 마이데이터에서 가입 상품 목록을 알아야 어떤 약관을 검색할지 특정 가능. ①② 상태에서는 불가.

### 상태별 답변 흐름

```
[상태 ① — ANONYMOUS]
KC 체인 평가 전체 불가 (전달 데이터 없음)
  └─ FAQ RAG → 결과 없으면 → Fallback LLM
     + Playbook 병렬: 감지 시 → user_state=ANONYMOUS → 회원가입 유도 CTA

[상태 ② — MEMBER_NO_MYDATA]
KC 체인 → PROFILE 조건 Rule만 평가
  ├─ PROFILE Rule 통과
  │    └─ KC 구조화 답변 + 마이데이터 연결 유도 문구 *
  └─ PROFILE Rule 미통과
       └─ FAQ RAG → 결과 없으면 → Fallback LLM
          (모든 ② 답변에 마이데이터 연결 유도 문구 공통 포함)
  + Playbook 병렬: 감지 시 → user_state=MEMBER_NO_MYDATA → 마이데이터 연결 유도 CTA

[상태 ③ — MEMBER_WITH_MYDATA]
KC 체인 전체 평가 → Case 1~4 매트릭스 적용 (하단 참조)
RAG 순서: 약관 RAG → FAQ RAG → Fallback LLM
+ Playbook 병렬: 감지 시 → user_state=MEMBER_WITH_MYDATA → Playbook 카드 정의 CTA (리드 전환)
```

### Playbook CTA — user_state별 매핑

| user_state | Playbook 감지 시 CTA |
|---|---|
| `ANONYMOUS` | 회원가입 유도 ("무료로 가입하고 내 보험을 진단받아보세요") |
| `MEMBER_NO_MYDATA` | 마이데이터 연결 유도 ("마이데이터를 연결하면 맞춤 상담이 가능합니다") |
| `MEMBER_WITH_MYDATA` | Playbook 카드에 운영자가 설정한 리드 전환 CTA |

KC Engine은 `user_state` 파라미터만으로 CTA를 결정. Clark 회원 DB 직접 조회 없음.

---

## Case 1~4 분기 매트릭스 — 상태 ③ 전용 (2026-06-22 확정)

> 아래 Case 1~4는 **상태 ③(가입 + 마이데이터 연결)** 에서만 적용된다.
> 상태 ①②는 위 "사용자 데이터 상태 — 선행 분기" 섹션을 따른다.

KC 매칭 × Playbook 감지 2×2 매트릭스로 모든 답변 경로를 정의.

| | Playbook 미감지 | Playbook 감지 |
|---|---|---|
| **KC Concept 매칭** | **Case 1**: KC 구조화 답변 | **Case 2**: KC 구조화 답변 + CTA 버튼 |
| **KC 미매칭** | **Case 3**: RAG(약관→FAQ) → Fallback 생성형 | **Case 4**: Standalone 가이드 주입 + CTA 버튼 |

- Concept Standalone 기능 없음 — Case 4(Playbook)가 미매칭 시나리오 전담
- Case 3·4 Fallback: `18_system-settings.html` 설정 적용 (경쟁사/외부 서비스 언급 금지 등)
- KC 체인 진입 조건: **Concept → Risk-type 연결 필수** (미연결 시 KC 체인 자체가 시작되지 않음)

---

## KC 메인 체인 vs Playbook 병렬 체인

KC 메인 체인과 Playbook 체인은 **동시에 독립 분석**한다. 두 결과의 조합으로 Case 1~4가 결정됨.

```
사용자 질문
  ├─ [KC 메인 체인] Concept 동의어 매칭
  │    ├─ 매칭O → Risk-type 판정 → Rule 평가
  │    └─ 미매칭
  └─ [Playbook 체인] 발화 키워드 감지 (독립 동작)
       ├─ 감지O
       └─ 미감지

결과 조합:
  매칭O + 미감지 → Case 1: KC 구조화 답변
  매칭O + 감지O  → Case 2: KC 구조화 답변 + CTA 버튼
  미매칭 + 미감지 → Case 3: RAG(약관→FAQ) → Fallback 생성형
  미매칭 + 감지O  → Case 4: Standalone 가이드 주입 + CTA 버튼
```

---

## RAG 아키텍처 (2026-06-21 확정)

```
사용자 질문
├─ KC 카드 매칭 → 구조화 답변 (Case 1/2)
└─ KC 미매칭 → RAG 레이어
   ├─ 약관 RAG: 가입 상품 약관 자동 파싱·인덱스 (크롤러 자동, KC Admin 직접 관리 불가)
   └─ Clark 서비스 FAQ RAG: 운영자 직접 등록 → 즉시 인덱스 등록 (19_faq-rag.html, 승인 없음)
      → RAG 결과 없으면 → Fallback 제한 생성형 (18_system-settings 설정 적용)
```

| RAG 유형 | 담당 영역 | 관리 방식 |
|---|---|---|
| 약관 RAG | 가입 상품 약관 원문 검색·인용 | 크롤러 자동 파이프라인 |
| Clark 서비스 FAQ RAG | Clark 앱 사용 안내, 보닥 플래너 연결, 서비스 정책 등 서비스 고유 Q&A | 운영자 직접 등록 → 즉시 인덱스 등록 |

**FAQ RAG에 약관·보장 관련 Q&A 등록 금지** — 약관 RAG가 원문을 직접 검색하므로 중복 불필요.

---

## 약관 RAG 버전 매핑 방법 (2026-06-24 확정)

같은 보험사·상품이라도 **계약 시작일에 따라 약관 세부 내용이 다름**. 상품 고유코드(상품코드)는 마이데이터에 미포함.

### 매핑 키 (Phase 1)

마이데이터 가입 정보에서 추출 가능한 값:

```
보험사명 + 상품명 + 계약시작일(연도 단위)
예) "삼성생명" × "무배당 암보험" × "2019년 가입분" → 약관 v2019
```

크롤러 파이프라인이 약관 파일을 저장할 때 아래 메타데이터를 함께 인덱싱:

| 메타데이터 | 예시 |
|---|---|
| insurer | 삼성생명 |
| product_name | 무배당 암보험 |
| effective_start | 2018-04-01 |
| effective_end | 2021-03-31 |

조회 쿼리: `insurer = X AND product_name 포함 AND effective_start ≤ 계약시작일 ≤ effective_end`

### 한계 및 Phase 2 개선 방향

| 구분 | 내용 |
|---|---|
| Phase 1 한계 | 같은 연도 내 중간 개정이 있을 경우 버전 불일치 가능성 있음 |
| 답변 면책 | "가입 시점에 따라 세부 약관 내용이 다를 수 있습니다" 문구 자동 포함 |
| Phase 2 목표 | 보험사 API 직접 연동 → 계약번호로 정확한 약관 버전 조회 |

---

## 19_faq-rag.html 화면 스펙 (2026-06-23 최종)

**역할:** Clark 서비스 전용 FAQ Q&A 등록·관리

**상태 2종:**

| 상태 | 코드 | 설명 |
|---|---|---|
| 초안 | `draft` | 임시 저장 상태 |
| 인덱스 등록됨 | `active` | 등록 즉시 RAG 인덱스에 반영됨 |

**승인 프로세스 없음** — 운영자 직접 등록 → 즉시 인덱스 반영.

**삭제된 상태:** 검수대기(review) / 반려됨(rejected) — 코드·문서에서 완전 제거. badge-review, badge-rejected 클래스 사용 금지.

**주요 기능:**
- 목록 테이블: 상태 필터(전체/인덱스등록됨/초안) + 검색
- 직접 등록 패널: 인라인 패널 (Q·A 입력)
- 상세 모달: 수정·삭제·인덱스 등록 액션

**등록 금지:** 약관·보장·담보 관련 Q&A

**사이드바 위치:** 18_system-settings.html 하위 항목

---

## Evidence · Policy 활용 방식 (2026-06-26 확정)

### Evidence — LLM 맥락 선택

| 항목 | 정책 |
|---|---|
| 선택 방식 | LLM이 사용자 질문 맥락에 맞는 Evidence를 **"활용 방법" 필드** 기준으로 선택·인용. 연결된 전부를 나열하지 않음 |
| 권장 연결 수 | Rule 1개당 Evidence **3개 이하** 권장 (하드 제한 없음. 초과 시 LLM 선택 품질 저하 가능) |
| "활용 방법" 필드 역할 | LLM의 선택 기준. 어떤 Rule 조건의 근거인지, 왜 이 수치가 기준인지 명확히 작성할수록 맥락 인용 품질 향상 |

### Policy — 연결된 전부 적용

| 항목 | 정책 |
|---|---|
| 적용 범위 | Rule에 연결된 모든 라이브 Policy의 `appDisplayText`를 Clark 답변에 포함 (AND) |
| 전부 적용 이유 | Policy는 규제·고지 문구 — 누락 시 규제 위반 가능성 |
| 권장 연결 수 | Rule 1개당 Policy **1~2개** 권장. 중복 내용의 Policy 중복 연결 금지 |
| 복수 충돌 시 | 더 제한적인 Policy 우선 적용 |

---

## 보험금 청구 이력 미활용 (의도적 설계)

Clark 앱 Step 2 "보험금 청구 이력(최근 2년)"은 Rule 조건으로 사용하지 않음.
이유: 금소법·개인정보보호법 저촉 소지. 수집은 하되 Rule 활용 금지.
