# KC Admin — 프로젝트 컨텍스트 (서비스 기획 트랙 전용)

> KC Admin **서비스 기획 트랙**(`mockups_v2/` 어드민 UI 목업) 전체 구조를 이해하는 데 필요한 맥락. 에이전트 01·02·03·06·07이 읽는다.
> **컨텐츠 기획 트랙**(실제 카드 콘텐츠 저작, `contents/`)은 이 파일이 아니라 `contents/agents/00_workflow.md`를 진입점으로 삼는다. 두 트랙이 공유하는 카드 정의·연결 규칙은 이 파일에 있지 않고 `context/card-types.md`·`context/card-policy.md`·`context/answer-logic.md`·`guides/insurance-domain.md`에 있다 — 아래 내용은 그 공유 계약을 mockups_v2 관점에서 어떻게 화면에 구현했는지에 대한 설명이며, 정책 자체의 진실원이 아니다.

---


## KC Admin이란

Clark AI가 정확한 KC(Knowledge Core) 기반 답변을 하기 위한 카드 등록·승인·관리 도구.
목표: 개발자·운영자에게 전달 가능한 HTML 인터랙티브 목업 제작 (`mockups_v2/` 24개).

- **KC Admin** = 운영자가 카드를 사전 등록·승인·관리하는 UI 도구 (이 목업)
- **KC Engine(API)** = 런타임에 카드를 실행·참조하는 처리 엔진
- KC Admin은 사용자 데이터를 받지 않음. 런타임 처리는 KC Engine이 담당.

---

## KC 카드 체계

카드 6종은 순서 의존성 없이 독립 등록 가능. 연결은 캔버스에서 별도 처리.

| 카드 | 역할 | CSS 변수 | 공개범위 |
|---|---|---|---|
| Concept | 사용자 질문 동의어 매핑 — KC 답변 입구 | `--card-concept: #1A4A9A` | 고객 공개 |
| Risk-type | 위험 유형 정의 — Clark AI 진단 분류 기준 | `--card-risk: #C94B1A` | 고객 공개 |
| Rule | Risk-type 판정 조건 (3가지 소스) | `--card-rule: #9A1A1A` | 공통 기준 |
| Evidence | 공인 외부 통계 등록 (Rule 판단 기준의 근거 데이터) | `--card-evidence: #1A7A4A` | 내부 전용 |
| Policy | 면책 고지 문구 등록 — 2개 필드만: Policy 이름(name) + Clark 앱 표시 문구(appDisplayText). appDisplayText 비어있으면 검수 요청 불가. 승인 2단계: 도메인 검수자 → 준법감시인. | `--card-policy: #5A5A55` | 내부 전용 |
| Playbook | 리드 전환 시나리오 (병렬 독립 체인) | `--card-playbook: #6B4A9A` | 내부 전용 |
| Case | Phase 1.5+ 잠금 | — | — |

---

## KC 카드 체인 (AI 답변 생성 순서)

```
사용자 질문
  ↓ Concept — 동의어 매칭 (미매칭 → Case 3/4)
  ↓ Risk-type — 위험 유형 판정
  ↓ Rule — 조건 평가 (마이데이터 / 프롬에이지 / 프로파일 3가지 소스)
  ↓ Evidence — 판정 근거 인용 (공인 외부 통계 고정값)
  ↓ Policy — 출력 형식·범위 통제 (금소법·면책 문구)
  → Clark 구조화 답변

  Playbook — 발화 키워드 감지 (메인 체인과 병렬 독립 동작)
```

**캔버스 연결 방향 (CONNECT_RULES):** → `context/card-policy.md` "CONNECT_RULES" 섹션 참조 (여기 재서술하지 않음)

---

## 카드 등록 워크플로우

```
[내용 입력] 카드 편집기: 내용 입력 → 임시저장 → 검수 요청 → 승인완료(approved)

[연결 구성] 카드 캔버스: 승인완료(approved) 이상 카드를 선택 → 연결 추가
            → 준비 연결(pending edge) 생성 — KC Engine 미반영
            active + approved + review 카드 표시 (draft 제외)
            연결 가능 범위: active + approved만 (review = 승인요청은 연결 불가)

[테스트] 캔버스 사전 테스트 패널 (00_canvas-main.html): 가상 프로필로 카드 체인 검증

[라이브 전환] "배포 요청": pending edge → active edge, KC Engine 즉시 반영
```

**캔버스 그리드:** 피커에서 카드 클릭 → 4컬럼 그리드에서 연결됨·연결가능·해당없음 구분 표시

---

## 6단계 상태 모델

| 상태 | 이모지 | CSS 클래스 |
|---|---|---|
| 임시저장 | 📝 | `badge-draft` |
| 승인요청 | ⏳ | `badge-review` |
| 승인완료 | ✔ | `badge-approved` |
| 라이브 | 🟢 | `badge-active` |
| 일시중지 | ⏸ | `badge-paused` |
| 반려 | 🚫 | `badge-rejected` |

CSS 변수값 → `guides/design-system.md` 참조.

---

## 공개범위 3종 (카드 타입별 고정 — 운영자 변경 불가)

| 한글 | 카드 유형 | 의미 |
|---|---|---|
| 고객 공개 | Risk-type, Concept | 카드 텍스트가 Clark 답변에 원문 그대로 포함. AIO 색인 대상 |
| 내부 전용 | Evidence, Policy, Playbook | 원문 내부 보관, 처리 결과만 고객 도달. AIO 제외 |
| 공통 기준 | Rule | 고객 출력 없음. 판단 로직만 담당. AIO 차단 |

---

## 사용자 데이터 상태 4종 · 답변 케이스 4종

> **진실원:** `context/answer-logic.md` "사용자 데이터 상태 — 선행 분기" + "Case 1~4 분기 매트릭스" 섹션. mockups_v2 화면(`13_answer-logic.html`)은 이 정책을 시각화한 것일 뿐이며, 정책 내용은 여기 재서술하지 않는다.

---

## 검수·승인 구조

- Policy 카드: 도메인 검수 후 준법감시인 추가 승인 필요
- 반려 시: 사유 입력 모달 → 작성자에게 전달
- 검수 화면(09): 카드 내용 검토 + 승인/반려

---

## Playbook MVP 개요

리드 전환 레이어만 구현. 발화 키워드 감지 → CTA 버튼 노출 → GA 리드 데이터 전달.
공개범위: 내부 전용 고정. 버튼 유형 3종: 💬 상담 연결 / 🔗 앱 내 이동 / 🌐 외부 링크.
Phase 1.5 이관: 리드 스코어링 (GA 수신 스펙 대기). Phase 2: 배정 최적화.

---

## 화면 파일 목록 (mockups_v2/ 24개)

| 파일 | 화면 |
|---|---|
| 00_canvas-main.html | **카드 캔버스** — 그래프 기반 연결 시각화·편집 [v2 신규] |
| 00_design-system.html | CSS 변수·컴포넌트 레퍼런스 |
| 01_guide.html | 업무 가이드 |
| 02_dashboard.html | 운영 현황 대시보드 |
| 03_card-library.html | 전체 카드 목록 |
| 04_risk-type-list.html | Risk-type 목록 |
| 04_card-editor-risk-type.html | Risk-type 편집기 |
| 05_evidence-list.html | Evidence 목록 |
| 05_card-editor-evidence.html | Evidence 편집기 |
| 06_concept-list.html | Concept 목록 |
| 06_card-editor-concept.html | Concept 편집기 (연결 표시: 읽기 전용) |
| 07_rule-list.html | Rule 목록 |
| 07_card-editor-rule.html | Rule 편집기 (5-card 구조) |
| 08_policy-list.html | Policy 목록 |
| 08_card-editor-policy.html | Policy 편집기 (연결 표시: 읽기 전용) |
| 09_review-workflow.html | 검수·승인 |

| 12_coverage-code-table.html | 담보코드·필드 레퍼런스 |
| 13_answer-logic.html | AI 답변 생성 로직·예시 (개발자·기획자) |
| 15_aio-guide.html | AIO 가이드 |
| 16_playbook-list.html | Playbook 목록 |
| 16_card-editor-playbook.html | Playbook 편집기 |
| 17_system-data-guide.html | Clark AI 데이터 연결 구조 (사이드바 미노출 — 직접 URL 접근) |
| 18_system-settings.html | **LLM Fallback 시스템 설정** — Case 3 미매칭 시 답변 제한 규칙 (KC 체인과 독립, 저장 즉시 반영) |
| 19_faq-rag.html | **Clark 서비스 전용 FAQ RAG 관리** — Clark 앱 사용 안내·서비스 정책 Q&A 등록·검수·인덱스 관리 (사이드바: 18_system-settings 하위) |

Case 편집기: Phase 1.5+, 파일 없음. 사이드바에 잠금(🔒) 표시만.

---

## RAG 아키텍처

> **진실원:** `context/answer-logic.md` "RAG 아키텍처" + "19_faq-rag.html 화면 스펙" 섹션. `19_faq-rag.html` 화면은 이 정책의 mockups_v2 구현일 뿐, 정책 내용은 여기 재서술하지 않는다.

---

## policy/ 폴더 (설계 정책 문서) — 10개

| 파일 | 내용 |
|---|---|
| 00_index.html | 정책 문서 인덱스 |
| 01_glossary.html | 용어 정의 |
| 02_card-purpose.html | 카드 목적 |
| 03_connect-policy.html | 연결 정책 |
| 04_lifecycle.html | 카드 라이프사이클 |
| 05_approval.html | 승인 흐름 |
| 06_field-data.html | 필드·데이터 정책 |
| 07_permission.html | 권한 정책 |
| 08_screen-policy.html | 화면별 정책 (19_faq-rag.html 스펙 포함) |
| 09_matching-policy.html | 감지·매칭 정책 |

**2026-06-26 policy/ 전수검사 완료:** 5개 파일 수정 (PROFILE 5개 필드·MYDATA coverage_amt 1종·PROMAGE 50개 항목·14_answer-logic-guide 삭제 처리 반영). 03·04·05·07은 이상 없음.
