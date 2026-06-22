# KC Admin — 팀 브리핑

## 파일 읽기 순서

모든 에이전트는 3계층 순서로 읽는다.

**계층 1 (전원 필수):** `CLAUDE.md` (이 파일)
**계층 2 (역할 선택):** `context/` + `guides/` 필요한 파일
**계층 3 (전담 파일):** `agents/` 각 역할 파일

---

## 에이전트 구성

| 번호 | 파일 | 역할 | 계층 2 참조 |
|---|---|---|---|
| 01 | `agents/01_ai-rag-architect.md` | AI/RAG 아키텍트 | context/project.md + context/decisions.md |
| 02 | `agents/02_po.md` | PO — 범위·조율 | context/project.md + context/decisions.md |
| 03 | `agents/03_ui-designer.md` | UI 디자이너 | context/project.md + context/decisions.md + guides/design-system.md |
| 04 | `agents/04_coder.md` | 코더 | context/decisions.md + guides/design-system.md + guides/ux-patterns.md |
| 04a | `agents/04a_coder-evidence.md` | Evidence 편집기 전담 | context/decisions.md + guides/ux-patterns.md + guides/insurance-domain.md |
| 04b | `agents/04b_coder-playbook.md` | Playbook 편집기 전담 | context/decisions.md + guides/ux-patterns.md + guides/design-system.md |
| 05 | `agents/05_code-reviewer.md` | 코딩 검수자 | context/decisions.md + guides/design-system.md |
| 06 | `agents/06_spec-reviewer.md` | 기획 검수자 | context/project.md + context/decisions.md |
| 07 | `agents/07_insurance-expert.md` | 보험 도메인 전문가 | context/project.md + guides/insurance-domain.md |
| 08 | `agents/08_ui-reviewer.md` | UI 검수자 | context/decisions.md + guides/design-system.md + guides/ux-patterns.md + guides/copywriting.md |

---

## 파일 맵

```
context/
  project.md      ← KC Admin 개요, 카드 체계, 워크플로우, 파일 목록 27개 (v2)
  decisions.md    ← 확정된 설계 결정 (기획서와 충돌 시 이 파일 우선)

guides/
  design-system.md    ← Pretendard 폰트, :root CSS 변수 전체, 컴포넌트 CSS
  ux-patterns.md      ← 사이드바·편집기·테이블 HTML 패턴
  copywriting.md      ← 금지/대체 표현, 상태 메시지 템플릿
  insurance-domain.md ← T코드, 담보코드, KCD 도메인 지식

agents/           ← 역할별 전담 파일 (위 에이전트 구성 표 참조)
CHANGELOG.md      ← 세션별 변경 이력 (에이전트가 읽을 필요 없음)
mockups/          ← Phase 1 완료 산출물 24개 (참조용 — 신규 작업은 mockups_v2/ 사용)
mockups_v2/       ← 현행 작업 폴더. 27개 HTML (캔버스 UX 기준)
policy/           ← 설계 정책 문서 9개 HTML (00_index~08_screen-policy)
Data/             ← 원천 기획서 — 별도 지시 없이 접근 금지
```

---

## 협업 지침 (고정 규칙)

- **"시작해"라고 할 때만 다음 작업을 진행한다. 먼저 자동으로 진행하지 않는다.**
- `Data/` 폴더는 별도 지시 없이 접근하지 않는다.
- HTML 파일 레이아웃 이상 시: PowerShell로 `<div>`/`</div>` 수를 카운트해 불균형 위치 추적.
- 커뮤니케이션: 한국어. 기술 용어(RAG, LLM 등)는 영문 병기 허용.
- **설계 결정 확정 시:** PO(02)가 `context/decisions.md`를 즉시 업데이트한다. 미확정 항목은 `decisions.md > ## 미결 항목`에 먼저 등록.

---

## 현재 상태 (2026-06-22)

**Rule 필수/선택 조건 + Risk-type 우선순위 재설계 전수 반영 완료 (2026-06-22):**
- Rule 조건 빌더: 필수/선택 구분 추가 (ConditionRow.required). PROMAGE 기본=선택, MYDATA/PROFILE 기본=필수
- Risk-type 다중 감지 우선순위 재확정: ①중요도(서열) → ②선택 조건 충족 개수(시스템 자동) → ③카드코드 오름차순
- 중요도 가중치(×3/×2/×1) 개념 제거 — 높음/보통/낮음 서열만 사용
- 전수 반영 파일: 07_card-editor-rule.html / 04_card-editor-risk-type.html / 13_answer-logic.html / 17_system-data-guide.html / policy/02_card-purpose.html / policy/06_field-data.html / agents/01_ai-rag-architect.md / agents/03_ui-designer.md / agents/04_coder.md / guides/ux-patterns.md / context/decisions.md

**메타 문서 전수 업데이트 완료 (2026-06-21):**
- 19_faq-rag.html 신규 추가 (Clark 서비스 전용 FAQ Q&A 등록·검수·관리): 파일 수 26→27
- FAQ RAG 역할 재정의: "일반 보험 Q&A" → "Clark 서비스 전용 Q&A" (앱 사용 안내·서비스 정책·보닥 플래너 연결)
- 약관에서 Q&A 초안 생성 기능 삭제 (약관 RAG가 직접 원문 검색하므로 중복 불필요)
- RAG 아키텍처 확정: 약관 RAG(자동 파이프라인) + Clark 서비스 FAQ RAG(운영자 직접 등록)
- policy/ 폴더 신규 추가 (설계 정책 문서 8개: 00_index~08_screen-policy)
- 19_faq-rag.html 사이드바 위치: 18_system-settings.html 하위 항목
- CLAUDE.md·project.md·decisions.md·agents/ 전 파일 동기화

**에이전트 학습 + 가이드 전면 업데이트 완료 (2026-06-19 세션 2):**
- mockups_v2/ 최신 변경사항을 context/ + agents/ + guides/ 전체에 동기화
- Risk-type 중요도 라디오 (높음×3/보통×2/낮음×1): 03·04·05·06·08 에이전트 + ux-patterns.md 반영
- Risk-type 다중 감지 우선순위 3단계 공식 (①중요도×Rule충족수→②조건수합계→③코드 오름차순): 01·context/decisions.md 반영
- 18_system-settings.html (LLM Fallback 시스템 설정, 26번째 파일): project.md·CLAUDE.md·02·04 에이전트 반영
- Case 3: "LLM 일반 생성형" → "Fallback Policy 적용 제한 생성형": 01·02·project.md 반영
- 검수·승인 흐름: 승인완료=캔버스에서연결(라이브전환 없음), 승인요청=연결정보없음: 02·04·05·08 에이전트 반영
- 파일 수 25→26 전체 동기화 (CLAUDE.md·project.md·04_coder.md)

**기능 개발 완료 (2026-06-19 세션 1):**
- Risk-type 편집기: 중요도 라디오 필드 추가 (04_card-editor-risk-type.html)
- Risk-type 목록: 중요도 컬럼(배지) 추가 (04_risk-type-list.html)
- AI 답변 로직: Step 2-B 우선순위 공식 섹션 추가 (13_answer-logic.html)
- 검수·승인: 승인완료 "라이브 전환" 버튼 제거 → "캔버스에서 연결" 버튼 (09_review-workflow.html)
- 검수·승인: 승인요청 카드 conn 데이터 제거 (09_review-workflow.html)
- Playbook 목록: "Playbook 등록" → "신규 등록" 버튼 텍스트 통일 (16_playbook-list.html)
- context/decisions.md: Risk-type 노출 우선순위 확정 섹션 추가

**전수 정합성 검사·수정 완료 (2026-06-19 세션 1):**
- 26개 파일 전수 검사 → Critical 9건·Warning 14건·Minor 8건 수정 완료
- 6단계 상태 모델 확정: draft/review/approved/active/paused/rejected (context/project.md 반영)
- 공식 엣지 타입 2종 확정: pending(점선 파랑 #1A4A9A) / active(실선 초록 #0F6E56). crossCluster 폐기
- EV004 전면 교체: "갱신형 납입 부담(금감원 2023)" → "고혈압 유병률(HIRA 2024)" — 5개 파일 일괄 수정
- decisions.md 프롬에이지 Evidence 카드(EV.FROMAGE.*) 폐기 처리
- 운영자 화면 "KC Engine" 표현 → "Clark AI" 교체 (01_guide/09_review)
- "시뮬레이션" 금지 표현 → "사전 테스트/테스트 결과" 교체 (00_canvas/02_dashboard)
- 체인 번호 순서 통일: ①Concept→②Risk→③Rule→④Evidence→⑤Policy (13_answer-logic/17_system-data-guide)
- ux-patterns.md 연결 가능 범위 수정: "라이브만" → "approved+active"
- 10_chain-visualizer.html: 00_design-system.html 화면 목록에서 삭제, 00_canvas-main.html 등재

**카드 라이프사이클 재설계 완료 (2026-06-18):**
- 신규 흐름: 승인완료 → 캔버스 연결(준비 연결, pending edge) → Dry-run → 라이브 전환
- 캔버스 표시 범위: active + approved + review (draft 제외)
- 연결 가능: active + approved만. review(승인요청) 카드는 연결 불가
- pending 엣지: 점선 파랑 (`stroke-dasharray:6,4`, `#1A4A9A`) — approved 카드 포함 연결, Clark AI 미반영
- active 엣지: 실선 초록 (`#0F6E56`) — 모두 active 카드 연결, Clark AI 즉시 반영

**Phase 1 완료.** mockups/ 24개 HTML 전체 구현·코딩 검수·UI 검수 완료.

**v2 정합성 전수 수정 완료 (2026-06-17 세션 2):**
- `mockups_v2/` 25개 파일 전수 검사 → 35개 🔴 이슈 전면 수정 완료
- 편집기 연결 UI v2 전환: 06_concept·07_rule·08_policy — 피커 패널 제거, 읽기전용 배지 + "캔버스에서 변경" 버튼 추가. 04_risk-type — Rule 연결 카드 제거
- wf-tracker ④ 링크: 5개 편집기 `10_chain-visualizer.html` → `00_canvas-main.html`
- CSS var() 오류 수정: `04_card-editor-risk-type.html`, `02_dashboard.html`
- 프롬에이지 Evidence 데이터 교체: EV004 → 고혈압 유병률 (HIRA 2024)
- Step bar·적용Policy 컬럼·연결 정보 카드 등 폐기 UI 제거
- 사이드바 전체 표준화 (25개): `nav-section` 레이블 제거(divider만 사용), `14_answer-logic-guide.html` 참조 섹션에 추가

**v2 캔버스 UX 적용 (2026-06-17):**
- `mockups_v2/` 신규 작업 폴더. Phase 1 mockups/를 기반으로 아래 변경 적용:
  - `00_canvas-main.html` 신규: 카드 캔버스 (그래프 기반 연결 시각화 + 연결 편집)
  - 카드 연결 정책 변경: 편집기 내 연결 선택 UI → 캔버스에서 연결 (편집기는 읽기 전용)
  - AI 답변 체인 순서로 캔버스 배치: Concept → Risk → Rule → Evidence → Policy
  - Policy → Playbook 연결 제거 (Policy는 outgoing 없음)
  - 10_chain-visualizer.html 사이드바 메뉴에서 제거
  - 전체 사이드바 통일: v2 배지 + 카드 캔버스 메뉴 포함
  - 가이드·로직 문서 v2 정책에 맞게 업데이트

**Evidence 아키텍처 재확정 (2026-06-17):**
- Evidence 단일 유형: 공인 외부 통계 기반(`external`) — HIRA/NHIS/KOSTAT/FSS/기타
- 마이데이터·프롬에이지는 상담 시 자동 전달 → Evidence 카드 불필요
- 이전 보닥통계(`stat`)·프롬에이지(`fromage`) 유형 폐기

| 이관 단계 | 항목 | 트리거 |
|---|---|---|
| Phase 1.5 | Playbook Card ③ 리드 스코어링, GA 데이터 필드 설정 | GA 수신 스펙 확정 시 |
| Phase 2 | 배정 최적화 레이어, Case 편집기 | 원수사·GA API 연동 확정 시 |

---

## 새 세션 진입 절차

1. 이 파일 읽기 (CLAUDE.md)
2. 작업 성격에 따라 계층 2 파일 추가 읽기:
   - HTML 수정 → `guides/design-system.md` + `guides/ux-patterns.md`
   - 기획 검토 → `context/project.md` + `context/decisions.md`
   - 카피라이팅 → `guides/copywriting.md`
   - Evidence 구현 → `agents/04a_coder-evidence.md`
   - Playbook 구현 → `agents/04b_coder-playbook.md`
   - 캔버스 작업 → `context/decisions.md` (v2 캔버스 UX 섹션)
3. 작업 대상 폴더: **`mockups_v2/`** (mockups/ 아님)
4. "시작해" 신호 대기

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

**방법 A — GitHub에서 클론 (권장, 항상 최신):**
```bash
git clone https://github.com/leeDK81/kcadmin.git KC_Admin
cd KC_Admin
```

**방법 B — 폴더 복사:**
```bash
# 기존 PC에서 폴더 전체를 USB / 공유 드라이브로 복사
# 새 PC에서 원하는 경로에 붙여넣기
cd KC_Admin
git remote set-url origin https://github.com/leeDK81/kcadmin.git
```

### Vercel 연결 (새 PC 최초 1회)

```bash
vercel login          # 브라우저 인증
vercel link           # 프로젝트 선택: kris-2792s-projects/kcadmin
```

### Claude Code 시작

```bash
# KC_Admin 폴더에서 실행
claude
```

Claude Code가 CLAUDE.md를 자동으로 읽어 컨텍스트를 복원한다.

### 작업 → 배포 루틴

```bash
# 1. 파일 수정 후 커밋 & 푸시
git add <파일>
git commit -m "..."
git push origin main

# 2. Vercel alias 업데이트 (push마다 실행 필요)
#    최신 배포 URL 확인
vercel ls --scope kris-2792s-projects

#    alias 갱신 (URL 부분만 교체)
vercel alias set <최신배포URL>.vercel.app kc-admin-v2.vercel.app
```

> **주의:** `git push` 후 Vercel이 자동 배포하지만 `kc-admin-v2.vercel.app` alias는 자동으로 최신을 따라가지 않는다. 매 push 후 `vercel alias set` 을 수동으로 실행해야 한다.

### 배포 URL

| 구분 | URL |
|---|---|
| 고정 alias (공유용) | https://kc-admin-v2.vercel.app/mockups_v2/ |
| GitHub 저장소 | https://github.com/leeDK81/kcadmin |
