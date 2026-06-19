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
  project.md      ← KC Admin 개요, 카드 체계, 워크플로우, 파일 목록 26개 (v2)
  decisions.md    ← 확정된 설계 결정 (기획서와 충돌 시 이 파일 우선)

guides/
  design-system.md    ← Pretendard 폰트, :root CSS 변수 전체, 컴포넌트 CSS
  ux-patterns.md      ← 사이드바·편집기·테이블 HTML 패턴
  copywriting.md      ← 금지/대체 표현, 상태 메시지 템플릿
  insurance-domain.md ← T코드, 담보코드, KCD 도메인 지식

agents/           ← 역할별 전담 파일 (위 에이전트 구성 표 참조)
CHANGELOG.md      ← 세션별 변경 이력 (에이전트가 읽을 필요 없음)
mockups/          ← Phase 1 완료 산출물 24개 (참조용 — 신규 작업은 mockups_v2/ 사용)
mockups_v2/       ← 현행 작업 폴더. 26개 HTML (캔버스 UX 기준)
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

## 현재 상태 (2026-06-19)

**전수 정합성 검사·수정 완료 (2026-06-19):**
- 25개 파일 전수 검사 → Critical 9건·Warning 14건·Minor 8건 수정 완료
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
