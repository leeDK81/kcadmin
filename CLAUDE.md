# KC Admin — 팀 브리핑

## 파일 읽기 순서

모든 에이전트는 3계층 순서로 읽는다.

**계층 1 (전원 필수):** `CLAUDE.md` (이 파일) · `context/rules.md` (협업 규칙)
**계층 2 (역할 선택):** `context/` + `guides/` 필요한 파일
**계층 3 (전담 파일):** `agents/` 각 역할 파일

---

## 에이전트 구성

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
| 07 | `agents/07_insurance-expert.md` | 보험 도메인 전문가 | project + insurance-domain |
| 08 | `agents/08_ui-reviewer.md` | UI 검수자 | card-policy + card-types + design-system + ux-patterns + copywriting |

---

## 파일 맵

```
context/
  project.md          ← KC Admin 개요, 카드 체계, 파일 목록 26개 (v2)
  decisions.md        ← 미결 항목, Phase 범위, 변경 이력 인덱스
  card-policy.md      ← CONNECT_RULES, 카드 상태/엣지, 공개범위, 타입코드
  card-types.md       ← 카드별 상세 스펙 (Evidence/Rule/Concept/Policy/Playbook/Risk-type)
  answer-logic.md     ← Case 1~4 매트릭스, RAG 정책, FAQ RAG 스펙, Fallback
  matching-policy.md  ← Concept·Playbook 감지 정책 (임베딩 유사도, 병렬 실행)
  workflow.md         ← 카드 라이프사이클, 캔버스 UX, 사이드바 v2 표준
  rules.md            ← 협업 고정 규칙, 단일 진실원 원칙, 업데이트 절차
  impact-map.md       ← 정책 변경 → 영향 파일 매핑 테이블

guides/
  design-system.md    ← Pretendard 폰트, :root CSS 변수 전체, 컴포넌트 CSS
  ux-patterns.md      ← 사이드바·편집기·테이블 HTML 패턴
  copywriting.md      ← 금지/대체 표현 단일 원본 (다른 파일에서 복사 금지)
  insurance-domain.md ← T코드, 담보코드, KCD 도메인 지식

agents/           ← 역할별 전담 파일 (위 에이전트 구성 표 참조)
CHANGELOG.md      ← 세션별 변경 이력 (현재 상태·과거 기록 전체 여기서 관리)
mockups_v2/       ← 현행 작업 폴더. 26개 HTML (캔버스 UX 기준)
policy/           ← 설계 정책 문서 10개 HTML (00_index~09_matching-policy)
mockups/          ← Phase 1 완료 산출물 24개 (참조용 — 신규 작업은 mockups_v2/ 사용)
Data/             ← 원천 기획서 — 별도 지시 없이 접근 금지
```

---

## 새 세션 진입 절차

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

## 새 PC에서 작업 시작하기

### 사전 설치 (최초 1회)

```
1. Node.js 18+ 설치  →  https://nodejs.org
2. Vercel CLI 설치   →  npm install -g vercel
3. Git 설치          →  https://git-scm.com
4. Claude Code 설치  →  npm install -g @anthropic-ai/claude-code
```

### 프로젝트 복원

```bash
git clone https://github.com/leeDK81/kcadmin.git KC_Admin
cd KC_Admin
```

### Vercel 연결 (새 PC 최초 1회)

```bash
vercel login
vercel link   # 프로젝트 선택: kris-2792s-projects/kcadmin
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
