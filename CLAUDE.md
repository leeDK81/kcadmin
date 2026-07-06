# KC Admin — 팀 브리핑 (최상위 인덱스)

> KC Admin 프로젝트는 **두 개의 별개 트랙**으로 진행된다. 어느 트랙에서 시작하든 이 파일을 먼저 읽고 반대편 트랙의 존재를 확인한다.
> **2026-07-03 교훈:** 컨텐츠 기획 트랙(`contents/agents/`)이 이미 존재했는데 이 파일에 등록돼 있지 않아, 서비스 기획 트랙 세션에서 같은 파이프라인을 중복으로 만든 사고가 있었다. 새 트랙·새 폴더를 만들면 **반드시 이 파일에 먼저 등록**한다.

---

## 두 트랙 개요

| | ① 서비스 기획 트랙 | ② 컨텐츠 기획 트랙 |
|---|---|---|
| **산출물** | `mockups_v2/` — KC Admin 어드민 UI 목업(24개 HTML) | `contents/` — Clark AI가 실제로 쓰는 카드 콘텐츠(Evidence·Risk-type·Rule·Concept·Policy·Playbook 실 데이터) |
| **에이전트** | `agents/01~08`(+04a·04b) | `contents/agents/01~05` |
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

| 번호 | 파일 | 역할 | 계층 2 참조 |
|---|---|---|---|
| 01 | `agents/01_ai-rag-architect.md` | AI/RAG 아키텍트 | card-policy + card-types + answer-logic + insurance-domain |
| 02 | `agents/02_po.md` | PO — 범위·조율 | decisions + card-policy + card-types + answer-logic + workflow |
| 03 | `agents/03_ui-designer.md` | UI 디자이너 | card-policy + card-types + answer-logic + workflow + design-system |
| 04 | `agents/04_coder.md` | 코더 | card-policy + card-types + answer-logic + workflow + design-system + ux-patterns |
| 04a | `agents/04a_coder-evidence.md` | Evidence 편집기 전담 | card-types + ux-patterns + insurance-domain |
| 04b | `agents/04b_coder-playbook.md` | Playbook 편집기 전담 | card-types + answer-logic + ux-patterns + design-system |
| 05 | `agents/05_code-reviewer.md` | 코딩 검수자 | card-policy + card-types + design-system |
| 06 | `agents/06_spec-reviewer.md` | 기획 검수자 | project + decisions + card-policy + card-types + answer-logic + workflow |
| 07 | `agents/07_insurance-expert.md` | 보험 도메인 전문가 (검수 전용) | project + insurance-domain |
| 08 | `agents/08_ui-reviewer.md` | UI 검수자 | card-policy + card-types + design-system + ux-patterns + copywriting |

> **07·08 참고 (2026-07-03):** 한때 07에 저작 권한을, 08에 컨텐츠 카피 검수를 추가했었으나, 그 역할은 이미 `contents/agents/02_insurance-domain.md`·`03_copywriter.md`가 전담하고 있었음이 밝혀져 원복했다. 07은 mockups_v2 검수 전용, 08의 contents/html 관련 범위는 순수 UI 표시 오류만(Section J).

### 파일 맵

```
context/
  project.md          ← mockups_v2 개요, 화면 목록 24개, policy/ 문서 목록 (서비스 트랙 전용)
  decisions.md        ← 서비스 트랙 미결 항목, Phase 범위, 변경 이력 인덱스
  workflow.md         ← 카드 라이프사이클, 캔버스 UX, 사이드바 v2 표준 (mockups_v2 구현)
  impact-map.md       ← 서비스 트랙 내부 정책 변경 → 영향 파일 매핑 테이블
  (card-policy.md·card-types.md·answer-logic.md·matching-policy.md·rules.md는 공유 계약 — 위 섹션 참조)
  cross-track-impact.md ← 공유 계약 변경 시 양 트랙 확인 매핑

guides/
  design-system.md    ← Pretendard 폰트, :root CSS 변수 전체, 컴포넌트 CSS
  ux-patterns.md       ← 사이드바·편집기·테이블 HTML 패턴
  copywriting.md       ← 금지/대체 표현 단일 원본 — KC Admin 운영자 화면 UI 텍스트 전용
  customer-messaging.md ← 고객향 Clark AI 채팅 메시지 워싱 원칙 (소유자: contents/agents/03_copywriter.md — 서비스 트랙은 미사용)
  insurance-domain.md ← 공유 계약 (위 섹션 참조)

agents/           ← 역할별 전담 파일 (위 에이전트 구성 표 참조)
CHANGELOG.md      ← 서비스 기획 트랙 변경 이력
mockups_v2/       ← 현행 작업 폴더. 24개 HTML (캔버스 UX 기준)
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
  agents/           ← 컨텐츠 트랙 에이전트 (01~05, 아래 표)
  00_taxonomy/      ← 시장 리서치(market-research.md) + 통계 근거 코퍼스(source-corpus.md)
  01_evidence/      ← Evidence 카드 (도메인별 통합 .md)
  02_risk-type/     ← Risk-type 카드 (risk-types.md)
  03_rule/          ← Rule 카드 (도메인별 통합 .md)
  04_concept/       ← Concept 카드 (concepts.md)
  05_policy/        ← Policy 카드 (policies.md)
  06_playbook/      ← Playbook 카드 (playbooks.md)
  07_connections/   ← 연결 구조 확정본 (chain-map.json)
  08_faq/           ← FAQ RAG 콘텐츠 (faq-rag.md, 2026-07-04 신규 — 계약 무관 보험 판단 노하우 + 서비스 이용 안내 Q&A)
  html/             ← 브라우저에서 직접 여는 콘텐츠 어드민 + Clark AI 채팅 시뮬레이션 (11개 HTML, mockups_v2와 별개·서버 불필요)
  decisions.md      ← 컨텐츠 트랙 미결 항목·결정 이력 인덱스
  CHANGELOG.md      ← 컨텐츠 트랙 변경 이력 (카드 데이터 변경 상세 포함)
```

### 에이전트 구성

| 번호 | 파일 | 역할 | 담당 카드 |
|---|---|---|---|
| 01 | `contents/agents/01_researcher.md` | 공인 통계 수집·검증, `source-corpus.md` 관리 | Evidence |
| 02 | `contents/agents/02_insurance-domain.md` | 위험 유형 정의 + Rule 조건 설계 (+ 담보코드 적합성 게이트) | Risk-type, Rule |
| 03 | `contents/agents/03_copywriter.md` | 사용자 언어 작성 + 고객향 채팅 메시지 워싱 | Concept, Policy, Playbook |
| 04 | `contents/agents/04_content-po.md` | 연결 정합성 검토 + 체인 완성 승인 | 전체 연결 구조 |
| 05 | `contents/agents/05_html-publisher.md` | 확정 콘텐츠를 `contents/html/`에 실제 반영 (2026-07-03 신규) | contents/html/*.html |

### contents/html/ 파일 목록 (11개 + sidebar.js)

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
| 08_ai-preview.html | Clark AI 채팅 답변 시뮬레이션 |
| 09_faq-rag.html | FAQ RAG 콘텐츠 미리보기 (2026-07-05 신규) |
| 10_faq-ai-preview.html | FAQ RAG Clark AI 채팅 답변 시뮬레이션 (2026-07-06 신규, 카테고리 A 19건 전체 반영) |
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

상세는 `contents/decisions.md` 참조 (2026-07-03 기준: 2순위 백로그 4건 저작 착수 여부, T25 담보 기준값 재검증 등). T15·market-research·A3201·T11=구T13 통합 여부는 모두 종결됨.

---

## 새 PC에서 작업 시작하기

### 사전 설치 (최초 1회)

```
1. Node.js 18+ 설치  →  https://nodejs.org
2. Vercel CLI 설치   →  npm install -g vercel
3. Git 설치          →  https://git-scm.com
4. Claude Code 설치  →  npm install -g @anthropic-ai/claude-code
```

### 프로젝트 복원 — 방법 A: 폴더 직접 복사 (권장, 커밋 안 된 작업까지 그대로 이어감)

USB·외장SSD·클라우드 동기화 등으로 `KC_Admin` 폴더 전체를 새 PC로 복사한다.

- **`.git/`·`.vercel/` 폴더도 함께 복사할 것** — `.vercel/`은 `.gitignore`에 등록돼 있어 GitHub에는 안 올라가지만, 폴더째 복사하면 그대로 따라와서 **`vercel link`를 새로 할 필요가 없다** (Vercel 계정 재인증만 하면 됨).
- **`git commit`을 안 했어도 상관없다** — 폴더 복사는 디스크에 있는 파일을 그대로 옮기는 것이라 작업 중이던 내용까지 전부 이어진다. (2026-07-03 기준 다수 파일이 커밋 안 된 상태로 남아있음 — 이것도 그대로 복사됨.)
- 복사 전 용량을 줄이고 싶다면 아래 두 폴더는 빼고 복사해도 무방(둘 다 재생성 가능, 프로젝트 파일 아님): `Data/node_modules/`(약 34MB, npm install로 재설치 가능), `.git/`(약 17MB, 이력 없이 시작해도 되면 제외 — 단, 이후 GitHub push 이력 연속성이 필요하면 반드시 포함)
- 복사 후 새 PC에서 `npm install -g vercel`·Claude Code 설치만 하면 바로 이어서 작업 가능. `vercel login`은 새 PC에서 1회 필요.

### 프로젝트 복원 — 방법 B: GitHub에서 새로 clone (커밋된 내용까지만 필요할 때)

```bash
git clone https://github.com/leeDK81/kcadmin.git KC_Admin
cd KC_Admin
```

> 주의: 이 방법은 **마지막 push 시점까지만** 복원된다. 커밋 안 하고 작업 중이던 내용은 포함되지 않으므로, 이어서 작업할 uncommitted 변경사항이 있다면 방법 A(폴더 복사)를 쓸 것.

### Vercel 연결

```bash
vercel login
vercel link   # 프로젝트 선택: kris-2792s-projects/kcadmin (방법 B로 clone한 경우에만 필요 — 방법 A는 .vercel/ 폴더가 이미 있어서 생략)
```

### 작업 → 배포 루틴

```bash
git add <파일>
git commit -m "..."
git push origin master

# alias 갱신 (push마다 실행)
vercel ls --scope kris-2792s-projects
vercel alias set <최신배포URL>.vercel.app kc-admin-v2.vercel.app
```

### 배포 URL

| 구분 | URL |
|---|---|
| 고정 alias | https://kc-admin-v2.vercel.app/mockups_v2/ |
| GitHub | https://github.com/leeDK81/kcadmin |
