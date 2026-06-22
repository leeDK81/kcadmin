# KC Admin — 프로젝트 컨텍스트

> KC Admin 전체 구조를 이해하는 데 필요한 맥락. 에이전트 01·02·03·06·07이 읽는다.

---

## 2026-06-22 세션 확정 사항

- **Concept → Risk-type 연결: 필수(required).** 연결 없으면 KC 체인 미진입. Concept Standalone 기능 완전 제거됨.
- **Case 1~4 매트릭스 확정:** KC매칭×Playbook감지 조합. Case 4가 미매칭+Playbook 모든 시나리오 커버. Playbook Standalone은 선택사항(비워두면 Clark 기본 안내 사용).
- **Risk-type 우선순위 가중치 제거:** ①중요도 서열(높음>보통>낮음) → ②선택조건 충족 개수 → ③카드코드 오름차순. 가중치(×3/×2/×1) 완전 삭제.
- **Rule 조건 소스:** MYDATA(필수) / PROMAGE(선택, 기본 false) / PROFILE(필수). Amplitude 없음. 약관 DB 연동(useContractDb)은 Rule 카드 선택 옵션.
- **Policy 카드 필드 2개 확정:** name + appDisplayText. 기타 필드 전면 삭제. appDisplayText 비어있으면 검수 요청 불가.
- **Playbook Standalone 가이드:** 선택사항. "최소 20자 필수" 삭제. 최소 키워드 3개 필수. CTA 기본 버튼(consult) 필수. approved 상태에서 캔버스 연결 없이 직접 라이브 전환 가능.
- **policy/ 전수검사 완료:** 8개 파일 수정, 22건 변경 반영.
- **금지어 추가:** 3-source(화면 노출 금지), 상/중/하 → 높음/보통/낮음, 임계값 → 기준값/판단 기준.

---

## KC Admin이란

Clark AI가 정확한 KC(Knowledge Core) 기반 답변을 하기 위한 카드 등록·승인·관리 도구.
목표: 개발자·운영자에게 전달 가능한 HTML 인터랙티브 목업 제작 (`mockups_v2/` 27개).

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

**캔버스 연결 방향 (CONNECT_RULES):**
- Concept → Risk-type (필수 — 연결 없으면 KC 체인 미진입)
- Risk-type → Rule (필수, 최소 1개)
- Rule → Evidence (필수, 최소 1개)
- Rule → Policy (선택)
- Policy, Evidence, Playbook: outgoing 없음 (체인 종단)
- Playbook: 독립 체인 (단말)

---

## 카드 등록 워크플로우

```
[내용 입력] 카드 편집기: 내용 입력 → 임시저장 → 검수 요청 → 승인완료(approved)

[연결 구성] 카드 캔버스: 승인완료(approved) 이상 카드를 선택 → 연결 추가
            → 준비 연결(pending edge) 생성 — KC Engine 미반영
            active + approved + review 카드 표시 (draft 제외)
            연결 가능 범위: active + approved만 (review = 승인요청은 연결 불가)

[테스트] 사전 테스트(11_dry-run.html): 가상 프로필로 카드 체인 검증

[라이브 전환] "배포 요청": pending edge → active edge, KC Engine 즉시 반영
```

**캔버스 그리드:** 피커에서 카드 클릭 → 5컬럼 그리드에서 연결됨·연결가능·해당없음 구분 표시

---

## 6단계 상태 모델

| 상태 | 이모지 | CSS 클래스 |
|---|---|---|
| 임시저장 | 📝 | `badge-draft` |
| 승인요청 | ⏳ | `badge-review` |
| 승인완료 | ✔ | `badge-approved` |
| 라이브 | 🟢 | `badge-active` |
| 일시중지 | ⏸ | `badge-paused` |
| 반려 | ❌ | `badge-rejected` |

CSS 변수값 → `guides/design-system.md` 참조.

---

## 공개범위 3종 (카드 타입별 고정 — 운영자 변경 불가)

| 한글 | 카드 유형 | 의미 |
|---|---|---|
| 고객 공개 | Risk-type, Concept | 카드 텍스트가 Clark 답변에 원문 그대로 포함. AIO 색인 대상 |
| 내부 전용 | Evidence, Policy, Playbook | 원문 내부 보관, 처리 결과만 고객 도달. AIO 제외 |
| 공통 기준 | Rule | 고객 출력 없음. 판단 로직만 담당. AIO 차단 |

---

## 사용자 질의 답변 케이스 4종

| 케이스 | KC Concept 매칭 | Playbook 키워드 감지 | Clark 출력 |
|---|---|---|---|
| Case 1 | ✓ 매칭 | — | KC 구조화 답변 |
| Case 2 | ✓ 매칭 | ✓ 감지 | KC 구조화 답변 + CTA 버튼 |
| Case 3 | — 미매칭 | — | RAG(약관→Clark FAQ) → Fallback 제한 생성형 답변 (18_system-settings 설정 적용) |
| Case 4 | — 미매칭 | ✓ 감지 | Standalone 가이드 주입 (선택사항, 비워두면 Clark 기본 안내 문구) + CTA 버튼 |

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

## 화면 파일 목록 (mockups_v2/ 27개)

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
| 11_dry-run.html | 사전 테스트 |
| 12_coverage-code-table.html | 담보코드·필드 레퍼런스 |
| 13_answer-logic.html | AI 답변 생성 로직·예시 (개발자·기획자) |
| 14_answer-logic-guide.html | 13_answer-logic.html 자동 리다이렉트 |
| 15_aio-guide.html | AIO 가이드 |
| 16_playbook-list.html | Playbook 목록 |
| 16_card-editor-playbook.html | Playbook 편집기 |
| 17_system-data-guide.html | KC 엔진 데이터 연결 구조 |
| 18_system-settings.html | **LLM Fallback 시스템 설정** — Case 3 미매칭 시 답변 제한 규칙 (KC 체인과 독립, 저장 즉시 반영) |
| 19_faq-rag.html | **Clark 서비스 전용 FAQ RAG 관리** — Clark 앱 사용 안내·서비스 정책 Q&A 등록·검수·인덱스 관리 (사이드바: 18_system-settings 하위) |

> 10_chain-visualizer.html: 파일은 존재하나 사이드바에서 제거됨 — v2에서 카드 캔버스로 대체

Case 편집기: Phase 1.5+, 파일 없음. 사이드바에 잠금(🔒) 표시만.

---

## RAG 아키텍처 (2026-06-21 확정)

KC 카드 미매칭(Case 3/4) 발생 시 RAG 레이어가 동작한다.

```
사용자 질문
├─ KC 카드 매칭 → 구조화 답변 (Case 1/2)
└─ KC 미매칭 → RAG 레이어
   ├─ 약관 RAG: 가입 상품 약관 자동 파싱·인덱스 (크롤러 자동, 관리자 설정)
   └─ Clark 서비스 FAQ RAG: 운영자 직접 등록 → 검수자 승인 → 인덱스 등록
      → RAG 결과 없으면 → Fallback 제한 생성형 (18_system-settings 설정 적용)
```

**역할 분리:**

| RAG 유형 | 역할 | 관리 방식 | 등록 금지 |
|---|---|---|---|
| 약관 RAG | 가입 상품 약관 원문 검색 | 크롤러 자동 파이프라인 (KC Admin 직접 관리 불가) | — |
| Clark 서비스 FAQ RAG | Clark 앱 사용 안내·서비스 정책·보닥 플래너 연결 등 서비스 고유 Q&A | 운영자 직접 등록 → 검수자 승인 (19_faq-rag.html) | 약관·보장 관련 Q&A (약관 RAG가 처리) |

**FAQ RAG 등록 원칙:**
- 등록 주체: 운영자 직접 입력 (LLM 초안 자동 생성 없음)
- 승인 주체: 검수자
- 상태 4종: 초안 / 검수대기 / 인덱스 등록됨 / 반려됨
- 약관·보장 관련 Q&A 등록 금지 (약관 RAG가 자동 처리)

---

## policy/ 폴더 (설계 정책 문서) — 9개

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

**2026-06-22 policy/ 전수검사 완료:** 8개 파일 수정, 22건 변경 (Concept→Risk-type 필수 연결, Policy 필드 2개 확정, 가중치 제거, 금지어 교체, Playbook Standalone 선택사항 등 반영)
