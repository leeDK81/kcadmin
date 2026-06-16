# KC Admin — 프로젝트 컨텍스트

> KC Admin 전체 구조를 이해하는 데 필요한 맥락. 에이전트 01·02·03·06·07이 읽는다.

---

## KC Admin이란

Clark AI가 정확한 KC(Knowledge Core) 기반 답변을 하기 위한 카드 등록·승인·관리 도구.
목표: 개발자·운영자에게 전달 가능한 HTML 인터랙티브 목업 제작 (`mockups/` 24개).

- **KC Admin** = 운영자가 카드를 사전 등록·승인·관리하는 UI 도구 (이 목업)
- **KC Engine(API)** = 런타임에 카드를 실행·참조하는 처리 엔진
- KC Admin은 사용자 데이터를 받지 않음. 런타임 처리는 KC Engine이 담당.

---

## KC 카드 체계

등록 순서: **① Risk-type → ② Evidence → ③ Concept → ④ Rule → ⑤ Policy**
(뒤 카드가 앞 카드를 연결 대상으로 참조하므로 앞 카드가 먼저 라이브여야 함)

| 순서 | 카드 | 역할 | CSS 변수 |
|---|---|---|---|
| ① | Risk-type | 위험 유형 정의 — Clark AI 진단 분류 기준 | `--card-risk: #C94B1A` |
| ② | Evidence | 판단 근거 데이터 쿼리 정의 | `--card-evidence: #1A7A4A` |
| ③ | Concept | 사용자 질문 동의어 매핑 — KC 답변 입구 | `--card-concept: #1A4A9A` |
| ④ | Rule | Risk-type 판정 조건 (3가지 소스) | `--card-rule: #9A1A1A` |
| ⑤ | Policy | 출력 규제·면책 통제 | `--card-policy: #5A5A55` |
| ⑥ | Playbook | 리드 전환 시나리오 (MVP 구현) | `--card-playbook: #6B4A9A` |
| ⑦ | Case | Phase 1.5+ 잠금 | — |

---

## 카드 등록 워크플로우

```
각 카드 공통 흐름: 편집기에서 내용+연결 입력 → 임시저장 → 승인요청 → 승인완료 → 라이브

연결 처리 위치 (편집기 내):
  ③ Concept 편집기 : Risk-type 선택 (선택사항. N개 다중 선택. 라이브 카드만)
  ④ Rule 편집기   : Risk-type 연결 (필수. 1개. 별도 .card 블록)
                   + Evidence 연결 (필수. 1개 이상. 별도 .card 블록)
  ⑤ Policy 편집기 : Rule 선택 (선택사항. 라이브 카드만. 준법감시인 승인 포함)
  ①② Risk-type·Evidence: outgoing connection 없음 (타 카드가 선택해 옴)
```

---

## 5단계 상태 모델

| 상태 | 이모지 | CSS 클래스 |
|---|---|---|
| 임시저장 | 📝 | `badge-draft` |
| 승인요청 | ⏳ | `badge-review` |
| 승인완료 | ✔ | `badge-approved` |
| 라이브 | 🟢 | `badge-active` |
| 일시중지 | ⏸ | `badge-paused` |

CSS 변수값 → `guides/design-system.md` 참조.

---

## 공개범위 3종 (카드 타입별 고정 — 운영자 변경 불가)

| 한글 | 카드 유형 | 의미 |
|---|---|---|
| 고객 공개 | Risk-type, Concept | 카드 텍스트가 Clark 답변에 원문 그대로 포함. AIO 색인 대상 |
| 내부 전용 | Evidence, Policy, Playbook | 원문 내부 보관, 처리 결과(생성 문장·면책 고지·CTA)만 고객 도달. AIO 제외 |
| 공통 기준 | Rule | 고객 출력 없음. 어떤 카드를 활성화할지 판단 로직만 담당. AIO 차단 |

> CSS 변수명은 `--scope-public/baseline/internal` 유지 (내부 코드). UI 표시 레이블은 고객 공개/내부 전용/공통 기준 사용.

---

## 사용자 질의 답변 케이스 4종

| 케이스 | KC Concept 매칭 | Playbook 키워드 감지 | Clark 출력 |
|---|---|---|---|
| Case 1 | ✓ 매칭 | — | KC 구조화 답변 |
| Case 2 | ✓ 매칭 | ✓ 감지 | KC 구조화 답변 + CTA 버튼 |
| Case 3 | — 미매칭 | — | LLM 일반 생성형 답변 |
| Case 4 (Standalone) | — 미매칭 | ✓ 감지 | LLM 생성형(Standalone 가이드 주입) + CTA 버튼 |

Case 3/4: Standalone = KC Concept 미매칭 시 자동 동작. Concept 카드에 설정하는 속성 아님.

---

## KC 카드 체인 (답변 생성 순서)

```
사용자 질문
  ↓ ① Concept — 동의어 매칭 (미매칭 → Case 3/4)
  ↓ ② Risk-type — 위험 유형 판정
  ↓ ③ Rule — 조건 평가 (마이데이터 / 프롬에이지 / 프로파일 3가지 소스)
  ↓ ④ Evidence — 판정 근거 인용 (상담 시 데이터 출처에서 자동 조회)
  ↓ ⑤ Policy — 출력 형식·범위 통제 (금소법·면책 문구)
  → Clark 구조화 답변
```

---

## 검수·승인 구조

- 검수·승인 메뉴는 검수자·준법감시인 권한에만 표시 (작성자 뷰 없음)
- 카드 내용과 연결 정보를 한 번에 검수·승인/반려 (단일 통합 검수)
- Policy 카드: 도메인 검수 후 준법감시인 추가 승인 필요
- 반려 시: 사유 입력 모달 → 작성자에게 전달

---

## Playbook MVP 개요

리드 전환 레이어만 구현. 발화 키워드 감지 → CTA 버튼 노출 → GA 리드 데이터 전달.
공개범위: 내부 전용 고정. 버튼 유형 3종: 💬 상담 연결 / 🔗 앱 내 이동 / 🌐 외부 링크.
Phase 1.5 이관: 리드 스코어링 (GA 수신 스펙 대기). Phase 2: 배정 최적화.

---

## 화면 파일 목록 (mockups/ 24개)

| 파일 | 화면 |
|---|---|
| 00_design-system.html | CSS 변수·컴포넌트 레퍼런스 |
| 01_guide.html | 업무 가이드 |
| 02_dashboard.html | 운영 현황 대시보드 |
| 03_card-library.html | 전체 카드 목록 |
| 04_risk-type-list.html | ① Risk-type 목록 |
| 04_card-editor-risk-type.html | ① Risk-type 편집기 |
| 05_evidence-list.html | ② Evidence 목록 |
| 05_card-editor-evidence.html | ② Evidence 편집기 |
| 06_concept-list.html | ③ Concept 목록 |
| 06_card-editor-concept.html | ③ Concept 편집기 (Risk-type N개 다중 선택) |
| 07_rule-list.html | ④ Rule 목록 |
| 07_card-editor-rule.html | ④ Rule 편집기 (5-card 구조) |
| 08_policy-list.html | ⑤ Policy 목록 |
| 08_card-editor-policy.html | ⑤ Policy 편집기 |
| 09_review-workflow.html | 검수·승인 |
| 10_chain-visualizer.html | 카드 연결 현황 |
| 11_dry-run.html | 사전 테스트 |
| 12_coverage-code-table.html | 담보코드·필드 레퍼런스 |
| 13_answer-logic.html | AI 답변 생성 로직 (개발자 스펙) |
| 14_answer-logic-guide.html | AI 답변 생성 예시 (기획자 시나리오) |
| 15_aio-guide.html | AIO 가이드 |
| 16_playbook-list.html | ⑥ Playbook 목록 |
| 16_card-editor-playbook.html | ⑥ Playbook 편집기 |
| 17_system-data-guide.html | KC 엔진 데이터 연결 구조 [신규 2026-06-10] |

Case 편집기: Phase 1.5+, 파일 없음. 사이드바에 잠금(🔒) 표시만.
