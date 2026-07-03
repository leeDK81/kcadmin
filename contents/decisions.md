# KC Admin — 컨텐츠 기획 트랙 결정 (인덱스)

> **컨텐츠 기획 트랙**(`contents/` 실 카드 콘텐츠) 전용 결정·미결 항목·이력. 서비스 기획 트랙(`mockups_v2/`) 결정은 `context/decisions.md` 참조.
> 두 트랙이 공유하는 카드 필드·연결 규칙·T코드는 이 파일이 아니라 `context/card-types.md`·`context/card-policy.md`·`guides/insurance-domain.md`(공유 계약)에 있다.
> **관리 주체:** 컨텐츠 트랙에서는 `contents/agents/04_content-po.md`가 연결 정합성을, 사용자(PO)가 최종 확정을 담당한다.
> 2026-07-03 트랙 분리 시 `context/decisions.md`에서 컨텐츠 관련 미결 항목·이력을 이관.

---

## 미결 항목

> 논의됐지만 아직 확정되지 않은 항목. 확정 시 해당 파일로 반영, 폐기 시 행 삭제.

| 항목 | 논의 내용 | 미결 이유 | 등록일 |
|---|---|---|---|
| RU-T25 소액암 진단금 기준값(A4210 LTE 500만원) 재검증 | 공식 통계·상품 비교 데이터 없이 "일반암 대비 10~30%대 설계 관행" 추정으로 설정한 잠정치 | 상품 비교 데이터 확보 후 정식 기준값으로 교체 필요 | 2026-07-03 |
| T01 Rule 고령층(70~80대) 실손 미가입 세분화 | 80세 이상 실손 가입률 1.1%(KIRI) — 신규 카드 아니고 T01 Rule 조건 보완으로 처리 권장 | 착수 대기 | 2026-07-03 |
| T29~T32 일부 근거 통계 재확인 권장 | EV038(요양병원 암환자 비율, 언론 경유)·EV040(스마일센터 임상표본, 전국 대표성 아님)·EV041(장기입원 전국 집계 통계 없음, 대리지표 사용) — 조사 시 1차 원문 직접 대조 못한 항목 | 상품 기획 확정 전 원문(KCI 논문·공공데이터포털 API 등) 재확인 권장 | 2026-07-03 |

---

## Phase 범위

컨텐츠 트랙은 서비스 기획의 Phase 구분(`context/decisions.md` 참조)을 그대로 따른다. 별도 Phase 구분 없음 — Playbook 리드 스코어링·GA 연동 등 Phase 1.5+/2 이관 항목은 컨텐츠 저작 대상에서도 동일하게 보류.

---

## 변경 이력 (최신순)

> 컨텐츠 카드 콘텐츠(Evidence/Risk-type/Rule/Concept/Policy/Playbook 실 데이터) 변경 이력은 `contents/CHANGELOG.md` 참조. 이 표는 **프로세스·구조 결정**만 기록한다.

| 날짜 | 내용 | 관련 파일 |
|---|---|---|
| 2026-07-03 | **2순위 백로그 4건(T29~T32) 저작 완료 — 25개 체인으로 확장**: 암요양병원 장기입원 미보장형(T29)·중환자실입원일당 미보장형(T30)·정신피해치료비 미보장형(T31)·장기입원비 미보장형(T32) 전체 저작(Risk-type·Rule·Evidence·Concept·Policy 20개 카드 신규). Step 0 시장 리서치를 4개 병렬 에이전트로 수행해 공인 통계 확보(스마일센터·HIRA·NHIS·법무부 등 1차 출처 우선, 조사 중 할루시네이션 1건 자체 검증으로 배제). Step 0.5 담보코드 게이트: `mockups_v2/12_coverage-code-table.html`에서 A6200/A6201·A6112/A6302·A9616·A6510/A6550 전부 확인. T02·T18과의 개념 중복은 "보유 확인(GTE 1원)" 조건으로 차별화(T29), 일반 입원일당 "있음"을 필수 조건으로 둬 T24·T01·T19와 배타적으로 구분(T30·T32). `chain-map.json` v1.5→v1.6, 21→25개 체인. Step 8(05_html-publisher)까지 완료 — `contents/html/*.html` 8개 파일 전체 동기화(00_index·01_evidence·02_risk-type·03_rule·04_concept·05_policy·07_chain-report·08_ai-preview, 06_playbook은 변경 없음). 반영 과정에서 `concepts.md`의 CN-T32 동의어 목록에 인공관절 관련 문구 2건이 잘못 섞여 있던 오류를 발견해 원본에서 제거. | `contents/02_risk-type/risk-types.md`, `contents/03_rule/rules-건강보험.md`, `contents/03_rule/rules-생명보험-노후-특종.md`, `contents/01_evidence/evidence-건강보험.md`, `contents/04_concept/concepts.md`, `contents/05_policy/policies.md`, `contents/07_connections/chain-map.json`, `contents/html/*` |
| 2026-07-03 | **신규 Risk-type 4건(T25~T28) 저작 완료 — 21개 체인으로 확장**: 갭 분석 1순위 승인 후보 소액암 진단금 부족형(T25)·통원치료비 미보장형(T26)·간병 지원 공백형(T27)·인공관절수술 미보장형(T28) 전체 저작(Risk-type·Rule·Evidence·Concept·Policy 20개 카드 신규). `chain-map.json` v1.4→v1.5, 17→21개 체인. `source-corpus.md`에 4개 클러스터(13~16절) 추가, `market-research.md` 우선순위표 21개 기준 갱신. | `contents/02_risk-type/risk-types.md`, `contents/03_rule/rules-건강보험.md`, `contents/01_evidence/evidence-건강보험.md`, `contents/04_concept/concepts.md`, `contents/05_policy/policies.md`, `contents/07_connections/chain-map.json`, `contents/00_taxonomy/source-corpus.md`, `contents/00_taxonomy/market-research.md`, `contents/html/*` |
| 2026-07-03 | **T11=구 T13 통합 재검토 종결**: PO 결정 — 현행 유지(T11은 사망보장 단일 초점, 노후소득 통계는 T09가 이미 담당). T13 관련 추가 작업 없음. | (결정만, 파일 변경 없음) |
| 2026-07-03 | **CN-T24(입원일당보험) 신규 저작 완료 — 17개 체인 전부 완결**: T24(폐렴 입원보장 공백형)의 마지막 끊긴 참조였던 Concept 카드 신규 작성. `chain-map.json` CHAIN-018 issues 해소. 폐렴·고령자 입원 특화 동의어 12개(입원일당보험·폐렴보험·"입원하면 하루에 얼마 받나요" 등), T19(수술비 도메인)와 용어 중복 없도록 설계. | `contents/04_concept/concepts.md`, `contents/07_connections/chain-map.json`, `contents/html/*` |
| 2026-07-03 | **market-research.md 우선순위 권고표 재작성 완료**: 구 23개 체계(T06·T07·T08·T12·T13·T15·T16 포함) → 17개 활성 체인 기준 전면 재작성. 중요도(높음/보통) 1차 기준 + 시장 규모·긴급성 2차 기준으로 순위 재산정. | `contents/00_taxonomy/market-research.md` |
| 2026-07-03 | **T15(자녀 건강보장 공백형) 최종 제거 확정**: PO 확인 결과 "마이데이터로 자녀 명의 보험 계약 조회 불가"(원래 제거 사유)가 여전히 사실로 확정. Risk-type·Rule(RU-T15)·Concept(CN-T15)·Policy(PO-T15)·Evidence(EV020) 5개 카드 전체 삭제, `chain-map.json` CHAIN-010 제거·removed_types에 등록(v1.3→v1.4), `contents/html/` 전체 동기화. 활성 체인 18→17개. Playbook PB09(어린이보험 상담 전환)는 KC 체인과 독립 동작이라 그대로 유지(키워드 감지만으로 작동, MYDATA 감지 불필요). | `contents/02_risk-type/risk-types.md`, `contents/03_rule/rules-생명보험-노후-특종.md`, `contents/04_concept/concepts.md`, `contents/05_policy/policies.md`, `contents/01_evidence/evidence-생명보험-노후.md`, `contents/07_connections/chain-map.json`, `contents/html/*` |
| 2026-07-03 | **18개 체인 전수 감사 및 일괄 수정** (담보코드 게이트→데이터 대조→연결무결성 3단계 + 신규 Risk-type 갭 분석). 상세 수정 내역은 `contents/CHANGELOG.md` 참조. A3201·EV020 미결 항목 종결(해소 확인), T11/T13·market-research·T15(MYDATA 사실확인)만 미결 유지. | `contents/CHANGELOG.md`, 아래 "전수감사" 항목 |
| 2026-07-03 | **서비스·컨텐츠 트랙 분리 확정**: `contents/agents/`(01~04 기존 + 05 신규)를 컨텐츠 기획 트랙 공식 에이전트로 확정하고 `CLAUDE.md`에 등록. 이 파일·`contents/CHANGELOG.md` 신설. 상세는 최상위 `context/decisions.md` 2026-07-03 항목 참조. | `CLAUDE.md`, `contents/agents/00_workflow.md` |
| 2026-07-03 | **통계 근거 코퍼스(source-corpus.md) 신설**: 매번 온라인 검증 대신 1회 구축 후 재사용하는 구조로 전환. T01~T24(18개 활성 체인)를 12개 도메인 클러스터로 묶어 병렬 조사, 클러스터당 1개 에이전트가 공식기관 1차 출처 우선으로 조사(deep-research 대비 약 1/4 비용). 관리 담당: `contents/agents/01_researcher.md`. 리서치 도구 정책(insane-research skill 채택) 자체는 공유 규칙이라 `context/decisions.md` 참조. | `contents/00_taxonomy/source-corpus.md` |
