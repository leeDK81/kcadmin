# KC 콘텐츠 생성 — 에이전트 워크플로우

> KC Admin 개발 완료 가정. 실제 카드 콘텐츠를 생성하고 연결 구조까지 정의하는 에이전트 협업 가이드.

---

## 에이전트 구성

| 번호 | 파일 | 역할 | 담당 카드 |
|---|---|---|---|
| 01 | `01_researcher.md` | 공인 통계 수집·검증 | Evidence |
| 02 | `02_insurance-domain.md` | 위험 유형 정의 + Rule 조건 설계 | Risk-type, Rule |
| 03 | `03_copywriter.md` | 사용자 언어 작성 | Concept, Policy, Playbook |
| 04 | `04_content-po.md` | 연결 정합성 검토 + 체인 완성 승인 | 전체 연결 구조 |

---

## 콘텐츠 생성 순서 (의존성 기준)

```
Step 0  [01] 시장 리서치 — 보험 영역별 공백·민원·미가입률 조사
             → 산출물: contents/00_taxonomy/market-research.json
             ※ Risk-type 정의의 근거가 되는 선행 리서치. 생략 불가.

Step 1  [02] 시장 리서치 기반 Risk-type 전체 목록 확정
             → 산출물: contents/00_taxonomy/risk-types.json

Step 2  [01] Risk-type별 Evidence 통계 수집
             → 산출물: contents/01_evidence/*.json

Step 3  [02] Risk-type별 Rule 조건 설계
             → 산출물: contents/03_rule/*.json

Step 4  [03] Concept 동의어 매핑
             → 산출물: contents/04_concept/*.json

Step 5  [03] Policy 면책 문구 작성
             → 산출물: contents/05_policy/*.json

Step 6  [03] Playbook 발화 키워드·전환 시나리오
             → 산출물: contents/06_playbook/*.json

Step 7  [04] 전체 연결 구조 검토 및 확정
             → 산출물: contents/07_connections/chain-map.json
```

---

## 폴더 구조

```
contents/
  agents/           ← 에이전트 역할 정의 (이 폴더)
  00_taxonomy/      ← 보험 영역별 Risk-type 분류 체계
  01_evidence/      ← Evidence 카드 초안 (JSON)
  02_risk-type/     ← Risk-type 카드 초안 (JSON)
  03_rule/          ← Rule 카드 초안 (JSON)
  04_concept/       ← Concept 카드 초안 (JSON)
  05_policy/        ← Policy 카드 초안 (JSON)
  06_playbook/      ← Playbook 카드 초안 (JSON)
  07_connections/   ← 캔버스 연결 구조 정의 (JSON)
```

---

## 출력 파일 명명 규칙

| 카드 | 파일명 패턴 | 예시 |
|---|---|---|
| Risk-type | `RT{순번}_{도메인코드}.json` | `RT01_cancer.json` |
| Evidence | `EV{순번}_{출처코드}.json` | `EV001_HIRA.json` |
| Rule | `RU{순번}_{RT코드}.json` | `RU001_RT01.json` |
| Concept | `CN{순번}_{키워드}.json` | `CN001_cancer.json` |
| Policy | `PO{순번}_{RT코드}.json` | `PO001_RT01.json` |
| Playbook | `PB{순번}_{목적}.json` | `PB001_consult.json` |

---

## 협업 원칙

- **에이전트는 순서를 지킨다.** Step 0 완료 전에 Step 1 진행 불가. Step 1 완료 전에 Step 3 진행 불가.
- **Step 0은 생략 불가.** 리서치 없이 정의한 Risk-type은 현장 근거가 없는 추정이다.
- **JSON만 출력한다.** 설명 텍스트 없이 스키마에 맞는 JSON만 작성.
- **검증은 04_content-po가 최종 확인한다.** 개별 에이전트가 연결 구조를 임의로 결정하지 않는다.
- **수정 요청은 원 담당 에이전트로 돌아간다.** PO가 Evidence 내용을 직접 수정하지 않음.
- **한국어로 작성한다.** 카드 내용 전체는 한국어. 필드 코드(coverage_code 등)는 영문 유지.
