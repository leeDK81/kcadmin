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
| T01 Rule 고령층(70~80대) 실손 미가입 세분화 | 80세 이상 실손 가입률 1.1%(KIRI) — 신규 카드 아니고 T01 Rule 조건 보완으로 처리 권장 | 착수 대기 | 2026-07-03 |
| T29·T30·T32 일부 근거 통계 재확인 권장 | EV038(요양병원 암환자 비율, 언론 경유) — 조사 시 1차 원문 직접 대조 못한 항목. EV041(180일 한도)은 2026-07-04 8개사 비교로 해소됨(아래 이력 참조), 국가 단위 장기입원 환자수 통계 부재만 잔존 | 상품 기획 확정 전 원문(KCI 논문 등) 재확인 권장 | 2026-07-03 |
| 준법감시인(컴플라이언스) 검토 전체 미착수 | `policies.md` 헤더에 "준법감시인 2단계 승인 필요"가 명시돼 있으나, 이번 도메인 전문가 검수는 AI 에이전트 기반 콘텐츠 품질 검수였을 뿐 실제 보험업법·약관 준수 여부에 대한 법무/컴플라이언스 검토는 아님 | 콘텐츠 저작으로 대체할 수 없는 별도 조직 프로세스 — 실제 준법감시인 검토 착수 필요 | 2026-07-04 |

---

## Phase 범위

컨텐츠 트랙은 서비스 기획의 Phase 구분(`context/decisions.md` 참조)을 그대로 따른다. 별도 Phase 구분 없음 — Playbook 리드 스코어링·GA 연동 등 Phase 1.5+/2 이관 항목은 컨텐츠 저작 대상에서도 동일하게 보류.

---

## 변경 이력 (최신순)

> 컨텐츠 카드 콘텐츠(Evidence/Risk-type/Rule/Concept/Policy/Playbook 실 데이터) 변경 이력은 `contents/CHANGELOG.md` 참조. 이 표는 **프로세스·구조 결정**만 기록한다.

| 날짜 | 내용 | 관련 파일 |
|---|---|---|
| 2026-07-04 | **T31(정신피해치료비 미보장형) 최종 폐지 — 23개 체인으로 축소**: PO 판단으로 T31을 완전히 삭제 확정. A9616(정신피해치료비) 미보유 조건은 특약 자체의 낮은 가입률 때문에 사실상 특약 미가입 성인 전체를 잡아내며, PROMAGE 50개 위험도 항목(암위험도 23개+질병위험도 27개) 전체를 재확인해도 범죄·정신건강 관련 카테고리가 없어 판별 신호를 더 좁힐 방법이 근본적으로 없음을 최종 확인. 무고한 사용자에게 범죄 피해를 전제한 진단을 내릴 위험까지 고려해 성별 조건 추가·중요도 하향 같은 부분 개선 대신 완전 폐지로 결론. RU-T31·CN-T31·PO-T31·EV040 전부 삭제, `chain-map.json` v1.8→v1.9(24→23개 체인, Evidence 33→32). 이 조치로 T31 관련 미결 항목은 해소되지만, 별도 항목인 준법감시인 검토 미착수는 그대로 남음(T31과 무관한 전체 카드 대상 프로세스). | `contents/02_risk-type/risk-types.md`, `contents/03_rule/rules-생명보험-노후-특종.md`, `contents/04_concept/concepts.md`, `contents/05_policy/policies.md`, `contents/01_evidence/evidence-건강보험.md`, `contents/07_connections/chain-map.json`, `guides/insurance-domain.md`, `contents/00_taxonomy/market-research.md`, `contents/00_taxonomy/source-corpus.md` |
| 2026-07-04 | **T02/T10 Clark AI 답변 문구 차별화 완료**: 08_ai-preview.html에서 두 답변이 거의 동일하게 반복되던 문제를 실제로 수정. T10 답변을 "이미 5,000만원(T02) 기준으로도 부족했는데, 3,000만원(T10)에도 못 미치는 더 시급한 케이스"로 재구성해 T02 위에 쌓이는 명시적 escalation으로 만들고, 담보 현황 표시도 "부족"→"여성 기준 크게 부족"으로 톤 차별화. | `contents/html/08_ai-preview.html` |
| 2026-07-04 | **미결 항목 심화 재조사 및 근거 보강(4건)**: 사용자 요청으로 "재확인 권장"으로만 남겨뒀던 항목들을 실제로 조사해 해소 시도. ① **T25**: 소액암 진단금 비율을 "일반암 대비 10~30% 추정"에서 "2022년 금융감독원 행정지도 이후 손보사 8개사·생보업계 전반이 20%로 수렴(언론 5건+한화생명 약관 원문으로 확인)"으로 재근거화, RU-T25 기준값을 500만원→1,000만원(T02 5천만원 기준선의 20%)으로 상향해 두 Rule을 정합적으로 연결. ② **T32**: "삼성화재 1건" 근거를 현대해상·DB손해보험·메리츠화재·한화손해보험·KB손해보험·하나생명·AIG손해보험까지 8개사 비교로 확장, 법정 표준약관에는 규정이 없다는 점(자율적 수렴)까지 명확히 기술. ③ **T14**: 형사합의금·변호사선임비가 "출처 확인 필요한 미완성 상태"가 아니라 "사적 화해금·자유계약 보수라는 법적 성격상 공인 통계가 구조적으로 존재할 수 없는 영역"임을 확인 — 재조사 대상에서 제외하고 카드 문구의 "확인 필요" 뉘앙스 제거. ④ **T23**: "레저상해 수술 평균 423만원"이 실제로는 NHIS 「2023년 주요수술 통계연보」의 "34개 주요수술 전국 평균"(레저상해와 무관한 다른 모집단)과 정확히 일치하는 **데이터 오귀속(misattribution)**임을 발견, 423만원·441만원·73.9% 전부 삭제하고 환자 수(225만명, HIRA 공식)만으로 근거를 재구성. 이 과정에서 T31 구조적 한계(PROMAGE 50개 카테고리 전체 재확인 결과 범죄·정신건강 카테고리 없음 최종 확인)와 준법감시인 검토 미착수 사실도 미결 항목에 명시적으로 등록. | `contents/02_risk-type/risk-types.md`, `contents/03_rule/rules-건강보험.md`, `contents/03_rule/rules-생명보험-노후-특종.md`, `contents/01_evidence/evidence-건강보험.md`, `contents/01_evidence/evidence-생명보험-노후.md`, `contents/00_taxonomy/source-corpus.md` |
| 2026-07-04 | **Evidence 단일 진실원 위반 발견·수정**: Step 8 반영 중 `contents/html/01_evidence.html`에 EV030(암 5년 상대생존율)·EV031(암진단금-사망률 상관관계)·EV033(건강보험 보장률·실손 미가입 현황) 3장이 존재하지만 `contents/01_evidence/evidence-건강보험.md`(원본)에는 없던 것을 발견 — HTML이 원본보다 앞서 나가 있던 드리프트(05_html-publisher 원칙 위반). 3장 모두 원본에 이관하고 `chain-map.json`에 연결(EV030→T02·T18, EV031→T02, EV033→T01·T19). Evidence 30→33장. | `contents/01_evidence/evidence-건강보험.md`, `contents/07_connections/chain-map.json` |
| 2026-07-04 | **도메인 전문가 전수 검수 및 6개 심각 항목 수정 — 25→24개 체인**: 3개 병렬 에이전트로 25개 체인 전체를 "Rule 조건 정밀도·근거 신뢰도·상호 배타성·서비스 관점 정확성" 기준으로 검수. 발견된 6개 심각 항목 전부 수정: ① **T25** — Rule에 나이 조건이 통째로 누락돼 전 연령 발화하던 버그 수정(30~70세 추가). ② **T31** — A9616 미보유+나이 조건만으로는 "범죄 피해자"를 특정 못 하고 사실상 특약 미가입 성인 전체를 잡아내는 구조적 한계 확인 → 중요도 보통→낮음 하향, 성별(여) 선택 조건 추가, 미결 항목 등록. ③ **T28** — domain_notes가 "T19와 나이대 배타적 분리"라 주장했으나 실제로는 50~59세 구간이 겹치는 오류 발견·정정(co-fire 정당화로 재작성). ④ **T19** — 2026-07-03에 나이 상한을 70→59세로 좁히며 생긴 "60~85세, 수술비 없음+입원일당 있음" 사각지대 발견 → 85세로 원복, T24·T30·T32와의 co-fire를 명시적으로 정당화. ⑤ **T32** — "180일 한도가 업계 관행"이라는 서술이 삼성화재 개별 상품 사례 하나에 불과함을 스스로 부인하는 근거와 모순됨을 발견 → 과장 표현 제거, 정확한 스코프로 재기술. ⑥ **T09 폐지** — Rule 조건이 T05의 순수 부분집합이라 항상 동반 발화하는 중복 진단 확인, 존재 근거 자체도 source-corpus.md에서 "미확인"으로 자인돼 있어 T05로 흡수(선례: T13→T11). CN-T09 동의어는 CN-T05로 이관, EV012·EV013·EV019(전부 T09 전용, EV019는 출처 미확인 상태) 제거. 추가로 T11 Risk-type 설명 문구가 Rule의 실제 발화 범위(선택조건인 결혼·자녀유무)와 불일치하던 것도 정정, T02/T10 co-fire를 의도된 계층 메시지로 명시적 확정. `chain-map.json` v1.6→v1.7, 25→24개 체인, Evidence 33→30장. `guides/insurance-domain.md`(T코드 단일 진실원) 전체 갱신. | `contents/02_risk-type/risk-types.md`, `contents/03_rule/rules-건강보험.md`, `contents/03_rule/rules-생명보험-노후-특종.md`, `contents/01_evidence/evidence-생명보험-노후.md`, `contents/04_concept/concepts.md`, `contents/05_policy/policies.md`, `contents/07_connections/chain-map.json`, `guides/insurance-domain.md`, `contents/html/*` |
| 2026-07-03 | **2순위 백로그 4건(T29~T32) 저작 완료 — 25개 체인으로 확장**: 암요양병원 장기입원 미보장형(T29)·중환자실입원일당 미보장형(T30)·정신피해치료비 미보장형(T31)·장기입원비 미보장형(T32) 전체 저작(Risk-type·Rule·Evidence·Concept·Policy 20개 카드 신규). Step 0 시장 리서치를 4개 병렬 에이전트로 수행해 공인 통계 확보(스마일센터·HIRA·NHIS·법무부 등 1차 출처 우선, 조사 중 할루시네이션 1건 자체 검증으로 배제). Step 0.5 담보코드 게이트: `mockups_v2/12_coverage-code-table.html`에서 A6200/A6201·A6112/A6302·A9616·A6510/A6550 전부 확인. T02·T18과의 개념 중복은 "보유 확인(GTE 1원)" 조건으로 차별화(T29), 일반 입원일당 "있음"을 필수 조건으로 둬 T24·T01·T19와 배타적으로 구분(T30·T32). `chain-map.json` v1.5→v1.6, 21→25개 체인. Step 8(05_html-publisher)까지 완료 — `contents/html/*.html` 8개 파일 전체 동기화(00_index·01_evidence·02_risk-type·03_rule·04_concept·05_policy·07_chain-report·08_ai-preview, 06_playbook은 변경 없음). 반영 과정에서 `concepts.md`의 CN-T32 동의어 목록에 인공관절 관련 문구 2건이 잘못 섞여 있던 오류를 발견해 원본에서 제거. | `contents/02_risk-type/risk-types.md`, `contents/03_rule/rules-건강보험.md`, `contents/03_rule/rules-생명보험-노후-특종.md`, `contents/01_evidence/evidence-건강보험.md`, `contents/04_concept/concepts.md`, `contents/05_policy/policies.md`, `contents/07_connections/chain-map.json`, `contents/html/*` |
| 2026-07-03 | **신규 Risk-type 4건(T25~T28) 저작 완료 — 21개 체인으로 확장**: 갭 분석 1순위 승인 후보 소액암 진단금 부족형(T25)·통원치료비 미보장형(T26)·간병 지원 공백형(T27)·인공관절수술 미보장형(T28) 전체 저작(Risk-type·Rule·Evidence·Concept·Policy 20개 카드 신규). `chain-map.json` v1.4→v1.5, 17→21개 체인. `source-corpus.md`에 4개 클러스터(13~16절) 추가, `market-research.md` 우선순위표 21개 기준 갱신. | `contents/02_risk-type/risk-types.md`, `contents/03_rule/rules-건강보험.md`, `contents/01_evidence/evidence-건강보험.md`, `contents/04_concept/concepts.md`, `contents/05_policy/policies.md`, `contents/07_connections/chain-map.json`, `contents/00_taxonomy/source-corpus.md`, `contents/00_taxonomy/market-research.md`, `contents/html/*` |
| 2026-07-03 | **T11=구 T13 통합 재검토 종결**: PO 결정 — 현행 유지(T11은 사망보장 단일 초점, 노후소득 통계는 T09가 이미 담당). T13 관련 추가 작업 없음. | (결정만, 파일 변경 없음) |
| 2026-07-03 | **CN-T24(입원일당보험) 신규 저작 완료 — 17개 체인 전부 완결**: T24(폐렴 입원보장 공백형)의 마지막 끊긴 참조였던 Concept 카드 신규 작성. `chain-map.json` CHAIN-018 issues 해소. 폐렴·고령자 입원 특화 동의어 12개(입원일당보험·폐렴보험·"입원하면 하루에 얼마 받나요" 등), T19(수술비 도메인)와 용어 중복 없도록 설계. | `contents/04_concept/concepts.md`, `contents/07_connections/chain-map.json`, `contents/html/*` |
| 2026-07-03 | **market-research.md 우선순위 권고표 재작성 완료**: 구 23개 체계(T06·T07·T08·T12·T13·T15·T16 포함) → 17개 활성 체인 기준 전면 재작성. 중요도(높음/보통) 1차 기준 + 시장 규모·긴급성 2차 기준으로 순위 재산정. | `contents/00_taxonomy/market-research.md` |
| 2026-07-03 | **T15(자녀 건강보장 공백형) 최종 제거 확정**: PO 확인 결과 "마이데이터로 자녀 명의 보험 계약 조회 불가"(원래 제거 사유)가 여전히 사실로 확정. Risk-type·Rule(RU-T15)·Concept(CN-T15)·Policy(PO-T15)·Evidence(EV020) 5개 카드 전체 삭제, `chain-map.json` CHAIN-010 제거·removed_types에 등록(v1.3→v1.4), `contents/html/` 전체 동기화. 활성 체인 18→17개. Playbook PB09(어린이보험 상담 전환)는 KC 체인과 독립 동작이라 그대로 유지(키워드 감지만으로 작동, MYDATA 감지 불필요). | `contents/02_risk-type/risk-types.md`, `contents/03_rule/rules-생명보험-노후-특종.md`, `contents/04_concept/concepts.md`, `contents/05_policy/policies.md`, `contents/01_evidence/evidence-생명보험-노후.md`, `contents/07_connections/chain-map.json`, `contents/html/*` |
| 2026-07-03 | **18개 체인 전수 감사 및 일괄 수정** (담보코드 게이트→데이터 대조→연결무결성 3단계 + 신규 Risk-type 갭 분석). 상세 수정 내역은 `contents/CHANGELOG.md` 참조. A3201·EV020 미결 항목 종결(해소 확인), T11/T13·market-research·T15(MYDATA 사실확인)만 미결 유지. | `contents/CHANGELOG.md`, 아래 "전수감사" 항목 |
| 2026-07-03 | **서비스·컨텐츠 트랙 분리 확정**: `contents/agents/`(01~04 기존 + 05 신규)를 컨텐츠 기획 트랙 공식 에이전트로 확정하고 `CLAUDE.md`에 등록. 이 파일·`contents/CHANGELOG.md` 신설. 상세는 최상위 `context/decisions.md` 2026-07-03 항목 참조. | `CLAUDE.md`, `contents/agents/00_workflow.md` |
| 2026-07-03 | **통계 근거 코퍼스(source-corpus.md) 신설**: 매번 온라인 검증 대신 1회 구축 후 재사용하는 구조로 전환. T01~T24(18개 활성 체인)를 12개 도메인 클러스터로 묶어 병렬 조사, 클러스터당 1개 에이전트가 공식기관 1차 출처 우선으로 조사(deep-research 대비 약 1/4 비용). 관리 담당: `contents/agents/01_researcher.md`. 리서치 도구 정책(insane-research skill 채택) 자체는 공유 규칙이라 `context/decisions.md` 참조. | `contents/00_taxonomy/source-corpus.md` |
