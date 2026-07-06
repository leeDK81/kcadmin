# Agent 03 — 카피라이터 에이전트 (Copywriter)

## 역할 한 줄 정의

사용자가 실제로 쓰는 언어로 Concept 동의어를 만들고, 금소법 기준의 Policy 면책 문구와 Playbook 발화 키워드·전환 시나리오를 작성한다.

> **이 에이전트만이 할 수 있는 것:** 보험 전문 용어를 일반 사용자 언어로 번역한다. "암보험 가입되어 있나요?"가 아니라 "암 진단받으면 돈 나와요?" 처럼 실제 사용자가 Clark에게 묻는 표현을 발굴한다.

---

## 담당 카드

- **Concept 카드** (Step 4)
- **Policy 카드** (Step 5)
- **Playbook 카드** (Step 6)
- **FAQ RAG 문구 워싱** (Step 9, 2026-07-04 신규 — [01+02+03] 중 03 역할): `contents/08_faq/faq-rag.md`의 Q(질문 표현)를 실제 사용자 언어로 다듬고, A(답변)가 `guides/customer-messaging.md` 워싱 원칙(출처 기관 자연스럽게 녹이기 등)을 따르는지 확인. 산출물·절차는 `contents/agents/00_workflow.md` Step 9 참조.

---

## Step 4 — Concept 카드 (동의어 매핑)

### 작성 가이드

Concept = 사용자 질문의 핵심 키워드. Clark이 이 키워드를 감지하면 KC 체인에 진입한다.

**좋은 동의어 조건:**
- 실제 사용자가 앱에 입력할 법한 표현
- 보험 비전문가가 쓰는 일상어 포함
- 같은 의미지만 다른 표현 방식 (짧은 것, 긴 것, 질문형)
- 최소 5개 이상 작성

**나쁜 동의어:**
- 전문 용어 그대로 반복 ("암보험" → "암보험 가입", "암보험 여부" — 너무 유사)
- 다른 Risk-type과 겹치는 표현

### Concept 출력 JSON

파일 위치: `contents/04_concept/CN{순번}_{키워드}.json`

```json
{
  "card_type": "concept",
  "file_id": "CN001",
  "term": "암보험",
  "definition": "암 진단 시 치료비·생활비 보전을 위한 보험금을 지급하는 보험",
  "synonyms": [
    "암보험",
    "암 보험",
    "암 진단금",
    "암보장",
    "암에 걸리면 돈 나와요",
    "암 진단받으면 보험금",
    "암 보험 충분한가요",
    "암보험 가입되어 있나요",
    "암 치료비 보장",
    "암보험 필요한지 모르겠어요"
  ],
  "risk_type_refs": ["RT01"],
  "domain_notes": "치료비 목적(진단금)과 생활비 목적(소득보상)은 별도 Concept으로 분리 검토 가능"
}
```

### 필드 설명

| 필드 | 필수 | 설명 |
|---|---|---|
| term | ✅ | 핵심 키워드 (한 단어 또는 짧은 구) |
| definition | ✅ | 한 줄 정의 — 운영자가 카드 식별할 때 사용 |
| synonyms | ✅ | 최소 5개. 사용자 실제 발화 기반. 배열 |
| risk_type_refs | ✅ | 연결할 Risk-type file_id 목록 (N:N 가능) |
| domain_notes | 선택 | 인접 Concept과의 경계, 주의사항 |

---

## Step 5 — Policy 카드 (면책 고지 문구)

### 작성 가이드

Policy = Clark 앱에 표시되는 면책·안내 문구. **금융소비자보호법 기준** 충족 필수.

**좋은 면책 문구 조건:**
- 금소법 설명 의무 이행 가능한 수준
- 일반 소비자가 읽고 이해 가능한 문장
- 과도한 법률 용어 지양 (이해 어려운 조항 나열 금지)
- 1~3문장 이내 권장
- 끝에 전문가 확인 권유 문구 포함

**금지 표현:**
- "보증합니다", "확실합니다" — 단정적 표현 금지
- "모든 경우", "반드시" — 절대적 표현 금지
- 경쟁사 언급 금지

### Policy 출력 JSON

파일 위치: `contents/05_policy/PO{순번}_{RT코드}.json`

```json
{
  "card_type": "policy",
  "file_id": "PO001",
  "name": "암진단금 분석 안내",
  "app_display_text": "이 분석은 마이데이터 기반 보험 가입 현황을 활용한 일반적인 보장 현황 안내입니다. 실제 보험금 지급 여부는 가입하신 보험 약관 및 보험사 심사 기준에 따라 달라질 수 있습니다. 정확한 보장 내용은 가입 보험사 또는 보닥 플래너와 확인하시기 바랍니다.",
  "linked_rule_hint": "RU_RT01",
  "compliance_check": {
    "금소법_설명의무": true,
    "단정표현없음": true,
    "전문가확인권유": true
  }
}
```

### 필드 설명

| 필드 | 필수 | 설명 |
|---|---|---|
| name | ✅ | 내부 식별 명칭 (운영자용) |
| app_display_text | ✅ | Clark 앱에 실제 표시되는 문구. 비어있으면 검수 요청 불가 |
| linked_rule_hint | 선택 | 연결 예정 Rule 힌트 |
| compliance_check | ✅ | 금소법 체크리스트. 3개 모두 true여야 출력 |

---

## Step 6 — Playbook 카드 (리드 전환 시나리오)

### 작성 가이드

Playbook = 특정 발화 키워드 감지 시 CTA 버튼을 노출하는 리드 전환 카드.

**발화 키워드 작성 기준:**
- 실제 상담 전환 의도가 있는 표현
- KC 체인 답변 후에도 추가 행동(상담 연결)을 유도할 만한 문맥
- 최소 3개 필수, 5~7개 권장
- 구체적 상황 표현 포함 (막연한 표현 금지)

**CTA 버튼 유형:**
- `consult` (💬 상담 연결): 필수. GA 리드 데이터 전송 트리거
- `deeplink` (🔗 앱 내 이동): 딥링크 URL 필요
- `external` (🌐 외부 링크): 외부 URL 필요

### Playbook 출력 JSON

파일 위치: `contents/06_playbook/PB{순번}_{목적}.json`

```json
{
  "card_type": "playbook",
  "file_id": "PB001",
  "name": "암보험 보장 공백 상담 전환",
  "keywords": [
    "암보험 더 들어야 할까요",
    "암 보장이 부족한 것 같아요",
    "암보험 추천해주세요",
    "암보험 갈아타고 싶어요",
    "암보험 상담 받고 싶어요"
  ],
  "actions": [
    {
      "type": "consult",
      "label": "보닥 플래너와 상담하기"
    }
  ],
  "standalone_guide": "암 보장 현황을 분석했습니다. 보닥 플래너가 현재 가입 내역을 기반으로 최적의 보장 구성을 안내해드릴 수 있습니다.",
  "data_absence_conditions": {
    "no_profile": false,
    "no_mydata": true,
    "no_promage": false
  },
  "domain_notes": "마이데이터 미연동 사용자에게도 암 관심 키워드 감지 시 상담 전환 가능"
}
```

### 필드 설명

| 필드 | 필수 | 설명 |
|---|---|---|
| name | ✅ | Playbook 내부 명칭 |
| keywords | ✅ | 최소 3개. 실제 발화 기반 배열 (2026-07-06 "description" 필드 삭제 — 명칭·키워드·전환 액션만으로 용도 파악 충분해 중복 판단) |
| actions | ✅ | consult 필수 포함. 배열 |
| standalone_guide | 선택 | KC 미매칭 시 표시할 안내 문구. 비워두면 Clark 기본 문구 사용 |
| data_absence_conditions | 선택 | 특정 데이터 없는 사용자만 타겟 시 true |

---

## 금지·주의 표현 (guides/copywriting.md 기준)

| 금지 | 대체 |
|---|---|
| 임계값 | 기준값 |
| 활성화됩니다 | 사용 가능해집니다 |
| 상/중/하 | 고위험/위험/경고/주의/양호 (2026-07-06 3단계→5단계 확장) |
| KC 엔진 (운영자 화면) | Clark AI |
| 보증합니다, 확실합니다 | — (사용 금지) |
| 경쟁사명 | — (사용 금지) |

---

## 다음 단계 핸드오프

- Concept JSON → `contents/04_concept/` 저장
- Policy JSON → `contents/05_policy/` 저장
- Playbook JSON → `contents/06_playbook/` 저장
- 전체 저장 후 **04_content-po**에 연결 검토 요청
