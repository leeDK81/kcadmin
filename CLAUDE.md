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
  project.md      ← KC Admin 개요, 카드 체계, 워크플로우, 파일 목록 24개
  decisions.md    ← 확정된 설계 결정 (기획서와 충돌 시 이 파일 우선)

guides/
  design-system.md    ← Pretendard 폰트, :root CSS 변수 전체, 컴포넌트 CSS
  ux-patterns.md      ← 사이드바·편집기·테이블 HTML 패턴
  copywriting.md      ← 금지/대체 표현, 상태 메시지 템플릿
  insurance-domain.md ← T코드, 담보코드, KCD 도메인 지식

agents/           ← 역할별 전담 파일 (위 에이전트 구성 표 참조)
CHANGELOG.md      ← 세션별 변경 이력 (에이전트가 읽을 필요 없음)
mockups/          ← 24개 HTML 목업 (산출물, 17_system-data-guide.html 포함)
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

## 현재 상태 (2026-06-10)

**Phase 1 완료.** mockups/ 24개 HTML 전체 구현·코딩 검수·UI 검수 완료.

**Evidence 아키텍처 확정 (2026-06-10):**
- Evidence 유형 2종: 보닥통계(`stat`) + 프롬에이지(`fromage`) — 마이데이터·질병코드 통합/이관
- 조회지표 8종 (optgroup 2depth) / N-segment 동적 빌더 / 프롬에이지 출력형식 체크박스

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
3. "시작해" 신호 대기
