# KC 콘텐츠 생성 — 에이전트 워크플로우

> KC Admin 개발 완료 가정. 실제 카드 콘텐츠를 생성하고 연결 구조까지 정의하는 에이전트 협업 가이드.
> **이 폴더(`contents/agents/`)는 "컨텐츠 기획" 트랙 전용이다.** "서비스 기획"(mockups_v2 어드민 UI) 트랙은 최상위 `agents/`(01~08)가 별도로 담당하며, 두 트랙의 관계는 `CLAUDE.md`를 참조한다.
> 두 트랙이 공통으로 따라야 하는 카드 필드·연결 규칙·T코드/담보코드는 이 폴더가 아니라 `context/card-types.md`·`context/card-policy.md`·`guides/insurance-domain.md`(공유 계약, 아래 "공유 계약 참조" 섹션)에 있다 — 여기 사본을 두지 않는다.

---

## ⚠️ 출력 형식에 대한 중요 공지 (2026-07-03)

01~04 각 에이전트 파일의 JSON 예시는 **필드 정의 참고용**이며, **실제 산출물 형식이 아니다**. 실제로 이미 만들어진 산출물은 아래처럼 카드별 개별 JSON이 아니라 **도메인별로 묶은 Markdown 파일**이다:

| 산출물 | 실제 형식 |
|---|---|
| `contents/01_evidence/` | `evidence-{도메인}.md` (도메인별 통합, 예: `evidence-건강보험.md`) |
| `contents/02_risk-type/` | `risk-types.md` (전체 통합 1개 파일) |
| `contents/03_rule/` | `rules-{도메인}.md` (도메인별 통합) |
| `contents/04_concept/` | `concepts.md` (전체 통합 1개 파일) |
| `contents/05_policy/` | `policies.md` (전체 통합 1개 파일) |
| `contents/06_playbook/` | `playbooks.md` (전체 통합 1개 파일) |
| `contents/07_connections/` | `chain-map.json` (이것만 실제로 JSON — 연결 구조 데이터는 JSON이 적합) |

**다음에 이 워크플로우를 실행하는 에이전트는 새 카드를 위 형식(도메인별 통합 .md, 연결구조만 JSON)에 맞춰 기존 파일에 추가한다. `EV{순번}_{출처코드}.json` 같은 개별 파일 생성 규칙은 따르지 않는다.** 각 에이전트 파일의 필드 스키마(무슨 필드가 필수인지)는 그대로 유효하다 — 파일을 어떻게 쪼개는지만 다르다.

---

## 공유 계약 참조 (두 트랙 공통, 여기서 재정의하지 않음)

| 계약 | 진실원 |
|---|---|
| 카드 필드 스펙 (Evidence/Rule/Concept/Policy/Playbook/Risk-type) | `context/card-types.md` |
| 카드 연결 규칙 (CONNECT_RULES, 카디널리티) | `context/card-policy.md` |
| T코드·담보코드 | `guides/insurance-domain.md` |
| Case 매트릭스·RAG 정책 | `context/answer-logic.md` |
| Concept·Playbook 매칭 정책 | `context/matching-policy.md` |
| 고객향 채팅 메시지 워싱 원칙 | `guides/customer-messaging.md` |

---

## 에이전트 구성

| 번호 | 파일 | 역할 | 담당 카드 |
|---|---|---|---|
| 01 | `01_researcher.md` | 공인 통계 수집·검증, `source-corpus.md` 관리 | Evidence |
| 02 | `02_insurance-domain.md` | 위험 유형 정의 + Rule 조건 설계 (+ 담보코드 적합성 게이트) | Risk-type, Rule |
| 03 | `03_copywriter.md` | 사용자 언어 작성 + 고객향 채팅 메시지 워싱 | Concept, Policy, Playbook |
| 04 | `04_content-po.md` | 연결 정합성 검토 + 체인 완성 승인 | 전체 연결 구조 |
| 05 | `05_html-publisher.md` | 확정된 카드 콘텐츠를 `contents/html/`에 실제 반영 | contents/html/*.html |

---

## 콘텐츠 생성 순서 (의존성 기준)

```
Step 0  [01] 시장 리서치 — 보험 영역별 공백·민원·미가입률 조사
             → 산출물: contents/00_taxonomy/market-research.md
             ※ Risk-type 정의의 근거가 되는 선행 리서치. 생략 불가.
             ※ 공인 통계는 먼저 contents/00_taxonomy/source-corpus.md를 대조 — 없는 지표만 신규 조사 후 그 파일에 반영(01_researcher 담당)

Step 0.5 [02] 담보코드 적합성 게이트 (2026-07-03 신규)
             → Step 0에서 나온 후보 Risk-type이 마이데이터로 실제 탐지 가능한 담보코드에
               근거하는지 `mockups_v2/12_coverage-code-table.html`로 먼저 확인한다.
             → 탐지 불가능한 후보는 Step 1로 넘기지 않는다.
             → 선례: T06(갱신형 구분 코드 없음)·T15(자녀 계약 조회 불가)·T16(실손 세대 구분
               코드 없음) — 이 게이트를 나중에(등록 후) 적용해 체인을 통째로 제거해야 했던 사례.
               다음부터는 Step 1 이전에 걸러 재작업을 없앤다.

Step 1  [02] 시장 리서치 + 담보코드 게이트 통과 기준 Risk-type 전체 목록 확정
             → 산출물: contents/02_risk-type/risk-types.md

Step 2  [01] Risk-type별 Evidence 통계 수집
             → 산출물: contents/01_evidence/evidence-{도메인}.md
             → source-corpus.md에 이미 있는 지표는 재조사하지 않고 인용

Step 3  [02] Risk-type별 Rule 조건 설계
             → 산출물: contents/03_rule/rules-{도메인}.md

Step 4  [03] Concept 동의어 매핑
             → 산출물: contents/04_concept/concepts.md

Step 5  [03] Policy 면책 문구 작성
             → 산출물: contents/05_policy/policies.md

Step 6  [03] Playbook 발화 키워드·전환 시나리오
             → 산출물: contents/06_playbook/playbooks.md
             → Step 4~6 전체에 걸쳐 `guides/customer-messaging.md` 기준 고객향 문구 워싱 적용

Step 7  [04] 전체 연결 구조 검토 및 확정
             → 산출물: contents/07_connections/chain-map.json

Step 8  [05] 확정된 콘텐츠를 contents/html/*.html에 실제 반영 (2026-07-03 신규)
             → chain-map.json + Step 1~6 산출물 기준으로 contents/html/00~08 갱신
             → 반영 후 chain-map.json 대비 담보코드·수치·카드 상태 불일치 없는지 자체 대조
```

---

## 폴더 구조

```
contents/
  agents/           ← 에이전트 역할 정의 (이 폴더)
  00_taxonomy/      ← 보험 영역별 Risk-type 분류 체계 + market-research.md + source-corpus.md
  01_evidence/      ← Evidence 카드 (도메인별 통합 .md)
  02_risk-type/     ← Risk-type 카드 (통합 .md)
  03_rule/          ← Rule 카드 (도메인별 통합 .md)
  04_concept/       ← Concept 카드 (통합 .md)
  05_policy/        ← Policy 카드 (통합 .md)
  06_playbook/      ← Playbook 카드 (통합 .md)
  07_connections/   ← 캔버스 연결 구조 정의 (chain-map.json)
  html/             ← Step 8 산출물 — 브라우저에서 직접 여는 콘텐츠 어드민 + 채팅 시뮬레이션 (05 담당)
```

---

## 협업 원칙

- **에이전트는 순서를 지킨다.** Step 0 완료 전에 Step 1 진행 불가. Step 0.5(담보코드 게이트) 통과 못한 후보는 Step 1에 올리지 않는다. Step 1 완료 전에 Step 3 진행 불가.
- **Step 0은 생략 불가.** 리서치 없이 정의한 Risk-type은 현장 근거가 없는 추정이다.
- **Step 0.5도 생략 불가.** 담보코드 근거 없이 정의한 Risk-type은 나중에 전체 체인을 제거해야 하는 재작업으로 이어진다(T06·T15·T16 선례).
- **출력 형식은 위 "출력 형식에 대한 중요 공지" 표를 따른다.** 01~04 파일 내 JSON 예시는 필드 스키마 참고용.
- **검증은 04_content-po가 최종 확인한다.** 개별 에이전트가 연결 구조를 임의로 결정하지 않는다.
- **HTML 반영은 05_html-publisher만 한다.** 01~04는 `contents/html/`을 직접 수정하지 않는다.
- **수정 요청은 원 담당 에이전트로 돌아간다.** PO(04)가 Evidence 내용을 직접 수정하지 않음.
- **한국어로 작성한다.** 카드 내용 전체는 한국어. 필드 코드(coverage_code 등)는 영문 유지.
- **이 파일과 `context/`·`guides/`가 충돌하면 `context/`·`guides/`(공유 계약)가 우선한다.** 이 워크플로우는 컨텐츠 트랙 내부 절차일 뿐, 카드 정의 자체의 진실원이 아니다.
