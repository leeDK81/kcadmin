# KC Admin — 카드 체계 및 연결 정책

> **진실원.** 카드 유형·상태·연결 규칙·편집기 구조 관련 모든 정책은 이 파일이 기준.
> 변경 시 PO(02)가 이 파일을 즉시 업데이트한다.

---

## CONNECT_RULES (2026-06-22 최종 확정)

```javascript
const CONNECT_RULES = {
  concept:  ['risk'],               // 필수 (미연결 시 KC 체인 진입 불가)
  risk:     ['rule'],               // 필수, 정확히 1개 (1:1)
  rule:     ['evidence', 'policy'], // evidence 필수/최소 1개, policy 선택
  evidence: [],                     // 단말
  policy:   [],                     // 단말
  playbook: [],                     // 단말, 독립 체인
};
```

| 연결 | 필수/선택 | 비고 |
|---|---|---|
| concept → risk-type | **필수** (최소 1개) | 미연결 시 KC 체인 진입 불가 |
| risk → rule | **필수** (정확히 1개) | 1:1 — 공유 불가. Rule이 이미 다른 Risk-type에 연결돼 있으면 연결 차단 |
| rule → evidence | **필수** (최소 1개) | |
| rule → policy | 선택 | |
| evidence → (단말) | — | outgoing 연결 없음 |
| policy → (단말) | — | outgoing 연결 없음 |
| playbook → (단말) | 독립 체인 | KC 카드 연결 불필요 |

---

## 카드 연결 카디널리티 (2026-06-21 확정)

| 연결 | 카디널리티 | 설명 |
|---|---|---|
| Concept ↔ Risk-type | **N:N** | 여러 Concept이 같은 Risk-type을 트리거 가능, 하나의 Concept이 여러 Risk-type을 동시에 트리거 가능(확정 2026-06-21). N개 매칭 시 답변 처리(카드 우선 UI 등)·실제 등록된 그룹 Concept 현황·"전체 진단" 처리 방식은 **`context/answer-logic.md`**(단일 진실원, 2026-07-07 정리 — 이전엔 저작 이력이 여기 그대로 복사돼 있었음) 참조 |
| Risk-type ↔ Rule | **1:1** | Risk-type 1개에 Rule 1개 전속. 공유 불가. 조건이 여러 개이면 Rule 카드 내 Row를 추가 |
| Rule ↔ Evidence | **N:N** | 하나의 Rule이 여러 Evidence를 근거로 인용 가능. 동일 Evidence를 여러 Rule이 공유 가능 |
| Rule ↔ Policy | **N:N** | 하나의 Rule에 여러 Policy 고지 연결 가능. 동일 Policy를 여러 Rule이 공유 가능 |

---

## 카드 상태 모델 (6종)

| 상태 | 코드 | 배지 | 의미 |
|---|---|---|---|
| 임시저장 | `draft` | `badge-draft` | 내용 작성 중 |
| 승인요청 | `review` | `badge-review` | 검수 중 |
| 승인완료 | `approved` | `badge-approved` | 캔버스 연결 가능 |
| 라이브 | `active` | `badge-active` | KC Engine 반영 완료 |
| 일시중지 | `paused` | `badge-paused` | 운영 중지 |
| 반려 | `rejected` | `badge-rejected` | 검수 반려 |

**캔버스 표시 범위:** active + approved + review (draft 제외)
**연결 가능 범위:** active + approved만 (review는 캔버스에 표시되나 연결 불가)

---

## 엣지(연결) 상태

| 엣지 상태 | 표시 | KC Engine | 조건 |
|---|---|---|---|
| `active` | 실선 초록 (#0F6E56) | 반영 완료 | 양쪽 카드 모두 active |
| `pending` | 점선 파랑 (stroke-dasharray:6,4, #1A4A9A) | 미반영 | 한쪽이라도 approved |

---

## 공개범위 필드 (2026-06-16 확정)

공개범위는 카드 유형에 따라 자동 고정 — 운영자 변경 불가.

| 카드 유형 | 공개범위 (고정) | 배지 |
|---|---|---|
| Concept | 고객 공개 | `badge-public` |
| Risk-type | 고객 공개 | `badge-public` |
| Rule | 공통 기준 | `badge-baseline` |
| Evidence | 내부 전용 | `badge-internal` |
| Policy | 내부 전용 | `badge-internal` |
| Playbook | 내부 전용 | `badge-internal` |

**표시 원칙:**
- 목록 화면(*-list.html)에서만 읽기 전용 배지 표시
- 편집기(card-editor-*.html)에는 공개범위 form-group 미표시
- 영문 표기(Public/Baseline/Internal) 금지 — 한국어만 사용

---

## 카드 편집기 카드 블록 구조 (원칙 6)

| 편집기 | card 수 | 구성 |
|---|---|---|
| ① Risk-type, ② Evidence | 2-card | 기본정보 / 액션 |
| ③ Concept, ⑤ Policy | 3-card | 기본정보 / 연결 패널(1개) / 액션 |
| ④ Rule | 5-card | 기본정보 / Risk-type 연결(필수) / 판단 조건 / Evidence 연결(필수) / 액션 |

연결 패널을 기본정보 카드 안에 섞지 않는다.

---

## 타입코드 (T코드) 목록

> **진실원:** `guides/insurance-domain.md` "Risk-type 타입코드" 섹션. 활성/제거 상태·명칭·개수는 그 파일 및 `contents/02_risk-type/risk-types.md`가 기준이며, 이 파일에는 사본을 두지 않는다(2026-07-03 정리 — 구버전 사본이 T07·T08·T12·T13을 active로 잘못 기재해 드리프트가 발생했던 사례가 있어 재발 방지 차원에서 참조로 전환).
