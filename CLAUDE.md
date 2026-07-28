# KC Admin — 팀 브리핑 (최상위 인덱스)

> KC Admin 프로젝트는 **두 개의 별개 트랙**으로 진행된다. 어느 트랙에서 시작하든 이 파일을 먼저 읽고 반대편 트랙의 존재를 확인한다.
> **2026-07-03 교훈:** 컨텐츠 기획 트랙(`contents/agents/`)이 이미 존재했는데 이 파일에 등록돼 있지 않아, 서비스 기획 트랙 세션에서 같은 파이프라인을 중복으로 만든 사고가 있었다. 새 트랙·새 폴더를 만들면 **반드시 이 파일에 먼저 등록**한다.

---

## 두 트랙 개요

| | ① 서비스 기획 트랙 | ② 컨텐츠 기획 트랙 |
|---|---|---|
| **산출물** | `mockups_v2/` — KC Admin 어드민 UI 목업(26개 HTML) | `contents/` — Clark AI가 실제로 쓰는 카드 콘텐츠(Evidence·Risk-type·Rule·Concept·Policy·Playbook 실 데이터) |
| **에이전트** | `.claude/agents/kc-*.md`(10개) | `.claude/agents/kc-content-*.md`(5개) |
| **진입점** | 이 파일 → `context/rules.md` → 아래 "① 서비스 기획 트랙" 섹션 | 이 파일 → `contents/agents/00_workflow.md` |
| **결정·미결 이력** | `context/decisions.md` | `contents/decisions.md` |
| **변경 이력** | `CHANGELOG.md` | `contents/CHANGELOG.md` |
| **내부 영향 매핑** | `context/impact-map.md` | `contents/agents/00_workflow.md` (Step 구조 자체가 영향 순서) |

**두 트랙이 공유하는 계약** (카드가 "무엇"인지에 대한 정의 — 트랙별로 나뉘지 않음, 아래 "공유 계약" 섹션 참조)이 바뀌면 `context/cross-track-impact.md`를 먼저 확인해 양 트랙 모두 반영됐는지 점검한다.

---

## 공유 계약 (두 트랙 필수 공통 참조)

| 파일 | 내용 |
|---|---|
| `context/rules.md` | 협업 고정 규칙, 단일 진실원 원칙 |
| `context/card-policy.md` | CONNECT_RULES, 카드 상태/엣지, 공개범위, 카드블록 구조 |
| `context/card-types.md` | 카드별 상세 스펙 (Evidence/Rule/Concept/Policy/Playbook/Risk-type 필드 정의) |
| `context/answer-logic.md` | Case 0~4 매트릭스, RAG 정책, FAQ RAG 스펙 |
| `context/matching-policy.md` | Concept·Playbook 감지 정책 (임베딩 유사도) |
| `guides/insurance-domain.md` | T코드·담보코드·KCD 도메인 지식 (T코드 상태의 유일한 진실원 — 다른 파일에 사본 두지 않음) |
| `context/cross-track-impact.md` | 위 공유 계약이 바뀔 때 양 트랙에서 확인할 파일 매핑 |

---

## ① 서비스 기획 트랙 — mockups_v2/

### 파일 읽기 순서

**계층 1 (전원 필수):** 이 파일 · `context/rules.md`
**계층 2 (역할 선택):** `context/` + `guides/` 필요한 파일
**계층 3 (전담 파일):** `agents/` 각 역할 파일

### 에이전트 구성

> **2026-07-27: 실제 Claude Code 서브에이전트로 등록, 같은 날 단일 소스로 통합.** `.claude/agents/kc-*.md`가 역할 정의의 유일한 진실원이다 — `Agent` 도구에서 `subagent_type`으로 지정하면 이 파일 자체가 시스템 프롬프트로 스폰된다. 원래는 `agents/0X_역할명.md` 문서를 원본으로, `.claude/agents/kc-*.md`를 실행형 사본으로 이원화했으나, 그날 안에 사본에만 개선 사항(예: `kc-ui-reviewer`의 "Playwright 실측 필수" 추가)이 반영되고 원본에는 반영되지 않는 드리프트가 실제로 발생한 것을 확인해 원본 문서 10개를 삭제하고 이 파일로 일원화했다. 역할을 고칠 때는 `.claude/agents/kc-*.md`만 수정하면 된다.

| 서브에이전트 | 역할 | 계층 2 참조 |
|---|---|---|
| `kc-ai-rag-architect` | AI/RAG 아키텍트 | card-policy + card-types + answer-logic + insurance-domain |
| `kc-po` | PO — 범위·조율 | decisions + card-policy + card-types + answer-logic + workflow |
| `kc-ui-designer` | UI 디자이너 | card-policy + card-types + answer-logic + workflow + design-system |
| `kc-coder` | 코더 | card-policy + card-types + answer-logic + workflow + design-system + ux-patterns |
| `kc-coder-evidence` | Evidence 편집기 전담 | card-types + ux-patterns + insurance-domain |
| `kc-coder-playbook` | Playbook 편집기 전담 | card-types + answer-logic + ux-patterns + design-system |
| `kc-code-reviewer` | 코딩 검수자 | card-policy + card-types + design-system |
| `kc-spec-reviewer` | 기획 검수자 | project + decisions + card-policy + card-types + answer-logic + workflow |
| `kc-insurance-expert` | 보험 도메인 전문가 (검수 전용) | project + insurance-domain |
| `kc-ui-reviewer` | UI 검수자 (Playwright 브라우저 실측 가능) | card-policy + card-types + design-system + ux-patterns + copywriting |

> **kc-insurance-expert·kc-ui-reviewer 참고 (2026-07-03):** 한때 kc-insurance-expert에 저작 권한을, kc-ui-reviewer에 컨텐츠 카피 검수를 추가했었으나, 그 역할은 이미 `kc-content-insurance-domain`·`kc-content-copywriter`가 전담하고 있었음이 밝혀져 원복했다. kc-insurance-expert는 mockups_v2 검수 전용, kc-ui-reviewer의 contents/html 관련 범위는 순수 UI 표시 오류만(Section J).

### 파일 맵

```
context/
  project.md          ← mockups_v2 개요, 화면 목록 26개, policy/ 문서 목록 (서비스 트랙 전용)
  decisions.md        ← 서비스 트랙 미결 항목, Phase 범위, 변경 이력 인덱스
  workflow.md         ← 카드 라이프사이클, 캔버스 UX, 사이드바 v2 표준 (mockups_v2 구현)
  impact-map.md       ← 서비스 트랙 내부 정책 변경 → 영향 파일 매핑 테이블
  (card-policy.md·card-types.md·answer-logic.md·matching-policy.md·rules.md는 공유 계약 — 위 섹션 참조)
  cross-track-impact.md ← 공유 계약 변경 시 양 트랙 확인 매핑

guides/
  design-system.md    ← Pretendard 폰트, :root CSS 변수 전체, 컴포넌트 CSS
  ux-patterns.md       ← 사이드바·편집기·테이블 HTML 패턴
  copywriting.md       ← 금지/대체 표현 단일 원본 — KC Admin 운영자 화면 UI 텍스트 전용
  customer-messaging.md ← 고객향 Clark AI 채팅 메시지 워싱 원칙 (소유자: `kc-content-copywriter` — 서비스 트랙은 미사용)
  insurance-domain.md ← 공유 계약 (위 섹션 참조)

CHANGELOG.md      ← 서비스 기획 트랙 변경 이력
mockups_v2/       ← 현행 작업 폴더. 26개 HTML (캔버스 UX 기준)
policy/           ← 설계 정책 문서 10개 HTML (00_index~09_matching-policy)
mockups/          ← Phase 1 완료 산출물 24개 (참조용 — 신규 작업은 mockups_v2/ 사용)
Data/             ← 원천 기획서 — 별도 지시 없이 접근 금지
```

### 새 세션 진입 절차

1. 이 파일 읽기 (CLAUDE.md)
2. `context/rules.md` 읽기 (협업 규칙)
3. 작업 성격에 따라 계층 2 파일 추가 읽기:
   - HTML 수정 → `guides/design-system.md` + `guides/ux-patterns.md`
   - 기획 검토 → `context/project.md` + `context/decisions.md`
   - 카피라이팅 → `guides/copywriting.md`
   - 정책 변경 시 영향 파일 확인 → `context/impact-map.md`
4. 작업 대상 폴더: **`mockups_v2/`** (mockups/ 아님)
5. "시작해" 신호 대기

현재 상태·이력은 `CHANGELOG.md` 참조.

---

## ② 컨텐츠 기획 트랙 — contents/

> **진입점은 이 섹션이 아니라 `contents/agents/00_workflow.md`다.** 아래는 최상위에서 존재를 확인할 수 있도록 하는 요약이며, 상세 절차·에이전트 역할·산출물 형식은 그 파일이 진실원이다.

### 개요

Clark AI 채팅에서 실제로 쓰이는 카드 콘텐츠(공인 통계·위험 유형·판단 조건·동의어·면책 문구·전환 시나리오)를 저작하고, 카드 간 연결 구조를 확정해 `contents/html/`에 반영하는 트랙.

### 폴더 구조

```
contents/
  agents/           ← 00_workflow.md(전체 프로세스 가이드)만 유지 — 개별 역할 정의는 `.claude/agents/kc-content-*.md`(위 표 참조)
  00_taxonomy/      ← 시장 리서치(market-research.md) + 통계 근거 코퍼스(source-corpus.md)
  01_evidence/      ← Evidence 카드 (도메인별 통합 .md)
  02_risk-type/     ← Risk-type 카드 (risk-types.md)
  03_rule/          ← Rule 카드 (도메인별 통합 .md)
  04_concept/       ← Concept 카드 (concepts.md)
  05_policy/        ← Policy 카드 (policies.md)
  06_playbook/      ← Playbook 카드 (playbooks.md)
  07_connections/   ← 연결 구조 확정본 (chain-map.json)
  08_faq/           ← FAQ RAG 콘텐츠 (faq-rag.md, 2026-07-04 신규 — 계약 무관 보험 판단 노하우 + 서비스 이용 안내 Q&A)
  09_query-messages/← Case 0(조회형 게이트) 감지용 예시 발화 (query-messages.md, 2026-07-07 신규)
  10_synonym/       ← 상품유형 유사어 결정론적 연결 (synonyms.md, 2026-07-07 신규 — AI 유사도 매칭 아님)
  html/             ← 브라우저에서 직접 여는 콘텐츠 어드민 + Clark AI 채팅 시뮬레이션 (16개 HTML + sidebar.js, mockups_v2와 별개·서버 불필요)
  decisions.md      ← 컨텐츠 트랙 미결 항목·결정 이력 인덱스
  CHANGELOG.md      ← 컨텐츠 트랙 변경 이력 (카드 데이터 변경 상세 포함)
```

### 에이전트 구성

> **2026-07-27: 실제 Claude Code 서브에이전트로 등록, 같은 날 단일 소스로 통합.** 서비스 트랙과 동일한 이유(사본에만 개선 사항이 반영되고 원본은 갱신되지 않는 드리프트 실제 발생 확인)로 `contents/agents/01~05_*.md` 개별 역할 문서는 삭제했다 — `.claude/agents/kc-content-*.md`가 유일한 진실원이다. `00_workflow.md`는 개별 역할이 아니라 전체 프로세스 가이드라 그대로 유지하며, 각 kc-content-* 서브에이전트가 계속 이 파일을 참조한다.

| 서브에이전트 | 역할 | 담당 카드 |
|---|---|---|
| `kc-content-researcher` | 공인 통계 수집·검증, `source-corpus.md` 관리 | Evidence |
| `kc-content-insurance-domain` | 위험 유형 정의 + Rule 조건 설계 (+ 담보코드 적합성 게이트) | Risk-type, Rule |
| `kc-content-copywriter` | 사용자 언어 작성 + 고객향 채팅 메시지 워싱 | Concept, Policy, Playbook |
| `kc-content-po` | 연결 정합성 검토 + 체인 완성 승인 | 전체 연결 구조 |
| `kc-content-html-publisher` | 확정 콘텐츠를 `contents/html/`에 실제 반영 (Playwright 브라우저 실측 가능) | contents/html/*.html |

### contents/html/ 파일 목록 (16개 + sidebar.js)

| 파일 | 설명 |
|---|---|
| 00_index.html | 홈 |
| 01_evidence.html | Evidence 카드 편집기 |
| 02_risk-type.html | Risk-type 카드 편집기 |
| 03_rule.html | Rule 카드 편집기 |
| 04_concept.html | Concept 카드 편집기 |
| 05_policy.html | Policy 카드 편집기 |
| 06_playbook.html | Playbook 카드 편집기 (CTA 버튼 포함) |
| 07_chain-report.html | 체인 검토 보고서 |
| 08_ai-preview.html | Clark AI 채팅 답변 시뮬레이션(KC 체인 진단형 전용, 2026-07-14 Case 0 섹션을 13_query-ai-preview.html로 분리) |
| 09_faq-rag.html | FAQ RAG 콘텐츠 미리보기 (2026-07-05 신규, 2026-07-15 카테고리 A 70건으로 갱신) |
| 10_faq-ai-preview.html | FAQ RAG Clark AI 채팅 답변 시뮬레이션 (2026-07-06 신규, 2026-07-15 카테고리 A 70건 전체 반영) |
| 11_query-messages.html | Case 0(조회형 게이트) 예시 발화 미리보기 (2026-07-07 신규) |
| 12_synonym-management.html | 상품유형 유사어 관리 콘텐츠 (2026-07-07 신규, 2026-07-08 5차 갱신) |
| 13_query-ai-preview.html | Case 0(조회형 게이트) Clark AI 채팅 답변 시뮬레이션 (2026-07-14 신규, 08_ai-preview.html에서 분리, QM-01~05 5종 전체) |
| 14_card-hook-sample.html | 결과 카드 경각심 강화 Before/After 샘플 (2026-07-20 신규, 제안·검토중 — 실 콘텐츠 미반영) |
| 15_coverage-amount-reference.html | 담보코드별 참고 기준액 조회 (2026-07-27 신규, 152개 코드 전체 리서치 결과 — `contents/00_taxonomy/coverage-amount-research.md` 원본. 2026-07-28 2·3차 확장조사 반영 + 헤드라인+접기 UI 전면 재설계) |
| sidebar.js | 좌측 공통 사이드바 JS 인젝션 |

### Clark AI 채팅 답변 표준 구조 (`guides/customer-messaging.md` 진실원 — 2026-07-05 갱신)

```
사용자 질의 → Concept 감지 → Risk-type 선정(N개, N:N 가능) → Rule 조건 확인 → Clark AI 채팅 답변:
  1. 진단 선언 우선 — "고객님은 [위험유형명(한글)]에 해당하는 상태예요" (T코드·영문 표기 절대 비노출)
  2. 상황 설명 + Evidence 통계를 자연스러운 문장으로 (출처 기관은 한글 자연스럽게, 영문 약어 비노출)
  3. (선택) 프롬에이지 선택조건 매칭 시 등급명(고위험/위험/경고/주의/양호)만 반영해 경각심 문장 추가
  4. 면책 고지 (Policy appDisplayText 원문 그대로, 분리 블록)
  5. CTA 버튼 — Playbook 감지 시 "보닥 플래너와 상담하기" 계열 (가산 요소)
  ※ N:N 다건 매칭 시 1번 대신 말풍선+결과 카드 리스트 → 카드 탭 시 해당 항목의 1~4단계가 같은 스레드에 이어짐
```

### 미결 작업

상세는 `contents/decisions.md` 참조(2026-07-28 갱신 기준: FAQ 서비스 이용 안내 3건(FAQ-008~010) 플레이스홀더, 결과 카드 경각심 강화 방향(샘플 검토 대기), A5100(질병수술) 이진→부족형 미전환 사유(마이데이터 A5100 필드가 종별 세분화인지 통합 합산인지 스펙 확인 필요), A5508(인공관절수술) 신규 제안(기존 RU-T28을 부족형 전환할지 편측/양측 별도 Risk-type을 신설할지 PM 결정 필요) 4건 남음). 담보코드 참고금액 리서치 확장(연령대별 평균 가입금액, 2026-07-27 등록)은 2026-07-28 2차(핀테크 앱)·3차(KIDI·KLIA·KNIA·KIRI 공식통계) 조사까지 완료돼 해소됨 — A5100·A5508 신규 확인, 나머지 5개는 공식통계가 이 단위로는 애초에 공표되지 않는다는 구조적 사실 확인. 그 결과가 위 A5100·A5508 두 신규 미결 항목으로 이어짐. T01 AND 조건 사각지대(실손 없음+사망보장 있음 미감지)는 2026-07-14 RU-T01 필수→선택 조건 재배치로 해소 완료(신규 카드 없이 처리 — T01·T11이 실손 유무로 이미 배타 분리돼 있던 구조 활용). T01 나이 상한 65→85세 확장, EV038(T29 근거) 원문 재확인, 어린이보험 "아동보험"·"키즈보험" 유사어 6차 재검증, PASONA 후킹 설계 브리프 전체 카피 개정(23개 Risk-type·30개 Evidence·12개 Playbook) 항목은 2026-07-09 완료. 준법감시인(컴플라이언스) 검토 항목은 2026-07-09 삭제 — 오프라인 별도 프로세스로 처리돼 미결 추적 대상 아님(PO 판단). mockups_v2 서비스 트랙 미결 5건(PROFILE 입력·Playbook 연결·FAQ 기준값·결과카드 실장·Case 0 세부)은 2026-07-14 목업 동결 방침에 따라 `context/decisions.md`에서 정리(개발팀 참고사항은 각 진실원 파일에 유지). 이 노트는 매번 `contents/decisions.md`의 실제 미결 항목과 대조해 갱신할 것.

---

## 새 PC에서 작업 시작하기

새 PC 셋업·Vercel 연결·배포 루틴은 `guides/setup.md` 참조(2026-07-27 분리 — 매 세션 로드되는 이 파일에서 세션당 로드 비용이 없는 별도 파일로 이동).
