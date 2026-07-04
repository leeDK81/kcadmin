# KC Admin — 트랙 간 교차 영향 매핑

> **서비스 기획 트랙**(`mockups_v2/`, `agents/01~08`)과 **컨텐츠 기획 트랙**(`contents/`, `contents/agents/01~05`)이 공통으로 의존하는 "공유 계약" 파일이 바뀔 때, 두 트랙 중 어느 쪽을 확인해야 하는지 매핑한다.
> 트랙별 내부 영향 파일(예: mockups_v2 HTML 여러 개, contents 카드 파일 여러 개)은 각각 `context/impact-map.md`(서비스)와 `contents/agents/00_workflow.md`(컨텐츠)에 있다 — 이 파일은 **트랙 경계를 넘는** 영향만 다룬다.

---

## 왜 이 파일이 필요한가

2026-07-03 발견 사례: `contents/agents/`가 이미 존재했는데 `CLAUDE.md`(서비스 트랙 최상위 문서)가 이를 몰라서, 같은 정책(컨텐츠 저작 파이프라인)이 두 곳에서 따로 만들어지는 중복이 발생했다. 공유 계약 파일이 바뀔 때 한쪽 트랙만 갱신되고 반대편이 모르는 채로 남는 것을 막기 위한 교차 확인 장부.

---

## 공유 계약 파일 → 확인 대상

| 공유 계약 파일 | 바뀌면 서비스 트랙에서 확인할 것 | 바뀌면 컨텐츠 트랙에서 확인할 것 |
|---|---|---|
| `context/card-types.md` (카드 필드 스펙) | 해당 카드 편집기 HTML(`mockups_v2/0X_card-editor-*.html`)의 입력 필드 | `contents/agents/02_insurance-domain.md`·`03_copywriter.md`의 필드 스키마, 기존 카드 파일(`contents/01~06_*/`)이 새 필드 규칙을 따르는지 |
| `context/card-policy.md` (CONNECT_RULES, 카드 상태, 카디널리티) | `00_canvas-main.html`의 `CONNECT_RULES` 객체·연결 UI | `contents/agents/04_content-po.md`의 검토 항목·`chain-map.json` 스키마 |
| `guides/insurance-domain.md` (T코드·담보코드) | 편집기 select 옵션, `12_coverage-code-table.html` | `contents/02_risk-type/risk-types.md`·`03_rule/*.md`의 T코드·담보코드 값 전체 |
| `context/answer-logic.md` (Case 매트릭스, RAG 정책) | `13_answer-logic.html` 시각화, `19_faq-rag.html`의 등록 가능 범위 안내 카피(2026-07-04: "계약 특정적 vs 일반 판단 노하우" 구분 반영), FAQ RAG 매칭 방식(2026-07-05: `matching-policy.md` 엔진 재사용 명시) | `contents/html/08_ai-preview.html` 채팅 시뮬레이션 흐름(2026-07-05: 진단 선언·운영자 식별자 비노출·Evidence 출처+연도 인용 원칙 반영, T01~T32 전체 모바일 폰 목업 전환), `contents/agents/03_copywriter.md`의 답변 구조, FAQ RAG 콘텐츠 저작 시 등록 기준 |
| `context/matching-policy.md` (Concept·Playbook 매칭) | `policy/09_matching-policy.html` | `contents/04_concept/concepts.md`·`06_playbook/playbooks.md` 작성 시 동의어·키워드 작성 기준 |
| `guides/customer-messaging.md` (고객향 메시지 워싱) | 해당 없음 (서비스 트랙은 운영자 UI 텍스트만 다룸 — `guides/copywriting.md`) | `contents/agents/03_copywriter.md`·`04_content-po.md`·`05_html-publisher.md` |
| `context/rules.md` (협업 규칙, 리서치 도구 정책 등) | 전체 `agents/01~08` | 전체 `contents/agents/01~05` |

---

## 반대 방향 — 트랙별 산출물이 공유 계약에 영향을 주는 경우

컨텐츠 트랙에서 실제 카드를 저작하다가 필드 스펙 자체의 문제를 발견하는 경우(예: "이 필드로는 실제 조건을 못 만든다")가 있다. 이때:

1. 컨텐츠 에이전트는 직접 `context/card-types.md` 등 공유 계약 파일을 고치지 않는다.
2. `contents/decisions.md` 미결 항목에 등록하고 PO에게 에스컬레이션한다.
3. PO가 공유 계약 파일 변경을 확정하면, 위 표를 따라 서비스 트랙에도 반영되었는지 확인한다.

---

## 점검 절차 (공유 계약 파일 수정 시)

1. 위 표에서 해당 파일 행을 찾는다.
2. "서비스 트랙에서 확인할 것"과 "컨텐츠 트랙에서 확인할 것" 둘 다 확인한다 — 한쪽만 확인하고 끝내지 않는다.
3. `context/decisions.md`(서비스)와 `contents/decisions.md`(컨텐츠) 양쪽에 변경 사실을 남긴다. 어느 한쪽에만 기록하면 반대편 트랙이 변경을 모르게 된다.
