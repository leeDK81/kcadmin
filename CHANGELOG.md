# KC Admin — 세션별 변경 이력

> 에이전트가 참조하지 않는 히스토리 문서. 에이전트는 `CLAUDE.md` → `context/` → `agents/` 순서로 읽는다.

---

## 2026-06-10

### Evidence 아키텍처 개편
- Evidence 유형 4종 → 2종 확정: 보닥통계(`stat`) + 프롬에이지(`fromage`)
- 마이데이터 기반(mydata) → stat 타입으로 통합
- 질병코드 기반(disease) → 12_coverage-code-table.html 이관

### Evidence 기능 확장
- 조회지표 5종 → 8종 (소액가입비율·평균월보험료·평균납입기간 추가)
- 추가 세그먼트: 단일 select → N-segment 동적 빌더 (행 추가/삭제)
- 프롬에이지 출력형식 체크박스 추가 (절대값/백분위)
- 프롬에이지 필드 코드 hidden 처리 (백단 처리)

### 용어 통일
- MYDATA → 마이데이터, Promage/Fromage → 프롬에이지 (전체 파일)
- 금지어 추가: 3-source / 비활성 / 파라미터 / 런타임 / 매핑

### 에이전트 업데이트
- agents/01~08 전체: Evidence 2종·조회지표 8종·출력형식·용어 반영
- agents/06: Evidence 편집기 정합성 섹션(G) 신규 추가
- agents/08: Evidence 구조 검수 항목 9개 추가
- guides/insurance-domain.md: Risk-type 명칭 정정, 조회지표 8종 표 업데이트

---

## 2026-06-16 세션 후반 (4개 가이드 HTML 정합성 정비)

### 수정 내용

**공통 (4개 파일):**
- 사이드바 `<div class="nav-section">참조 문서</div>` 제거 — nav-divider로만 구분하는 ux-patterns 원칙 적용
  - 대상: `01_guide.html`, `13_answer-logic.html`, `17_system-data-guide.html`, `15_aio-guide.html`

**`01_guide.html`:**
- 연결 유형 표 Playbook 행 수정: "Risk-type 스코어 설정 (독립 설정)" → "발화 키워드·전환 액션 설정 (KC 메인 체인과 독립)"
- Playbook 행 설명: "Risk-type 스코어 참조 → 리드 전환" → "KC 매칭 시 CTA 버튼 추가(Case 2), KC 미매칭 시 Standalone 가이드 기반 답변+CTA(Case 4)"
- 카드 grid Playbook 설명: "Risk-type 스코어 기반 리드 전환 → 원수사·GA에 고객 DB 전달" → "KC 매칭 시 CTA 추가, KC 미매칭 시 Standalone 답변+CTA"
- 사유: Playbook 편집기에 Risk-type 연결 패널 없음; 리드 스코어링 UI는 Phase 1.5 이관

**`17_system-data-guide.html`:**
- `공개범위이 "내부 전용"` → `공개범위가 "내부 전용"` (문법 오류 수정)

**`15_aio-guide.html`:**
- guide-box: `Policy 카드가 출력 범위를 최종 통제합니다` → Evidence·Rule·Policy·Playbook AIO 색인 자동 제외 설명으로 대체
- 사유: Policy는 앱 내 답변 통제, AIO 색인 범위는 공개범위로만 결정

---

## 2026-06-16 세션 (공개범위 편집기 제거 + 용어 복원 + AIO 가이드 개편)

### 핵심 결정

**공개범위 필드 편집기 완전 제거 (2026-06-16 확정)**
- 공개범위는 카드 유형에 따라 자동 고정 → 운영자 변경 불가 → 편집기에 표시 불필요
- 편집기 5개에서 공개범위 form-group 완전 제거: 04_risk-type, 06_concept, 07_rule, 08_policy, 16_playbook
- 목록 화면·card-library에서는 badge-public/baseline/internal 배지 계속 표시

**용어 일괄 복원**
- 지난 세션 잘못 치환된 신조어 → 기획서 원래 용어 복원
- 출력 방식 → 공개범위 / 직접 출력 → 고객 공개 / 판단 전용 → 공통 기준 / 가공 출력 → 내부 전용
- 대상: mockups/*.html, agents/*.md, guides/*.md, context/*.md, CHANGELOG.md

**AIO 가이드 구조 단순화**
- `15_aio-guide.html` ⑥ 운영 기준 섹션 완전 삭제 (③ AIO 활용 필드와 실질적 중복)
- ③ AIO 활용 필드: 고객 공개 카드(Concept·Risk-type) 필드만
- 프롬에이지 caution → ③ 하단 이동 / AIO 효과 측정 ok-box → ⑤ llms.txt 하단 이동
- 문법 수정: `공개범위이` → `공개범위가` 3곳

**`13_answer-logic.html`**
- 예시로 보기 탭 하단 mapping-table: 데이터 출처·답변에 쓰이지 않는 내용 컬럼 165px → 495px

### 변경된 파일

**mockups:**
- `04_card-editor-risk-type.html` — 공개범위 form-group 제거
- `06_card-editor-concept.html` — 공개범위 form-group 제거
- `07_card-editor-rule.html` — 공개범위 form-group 제거
- `08_card-editor-policy.html` — 공개범위 form-group 제거
- `16_card-editor-playbook.html` — 공개범위 form-group 제거
- `13_answer-logic.html` — 컬럼 너비 3배 확장
- `15_aio-guide.html` — ⑥ 섹션 삭제, ③ 단순화, caution/ok-box 이동, 문법 수정

**context/guides/agents:**
- `context/decisions.md` — Playbook Card ① 설명, Policy 편집기 순서 수정, 신규 섹션 2개 추가
- `guides/ux-patterns.md` — badge 주석 "목록 화면 전용" 명시
- `agents/02_po.md` — 공개범위 정책 업데이트
- `agents/03_ui-designer.md` — 편집기 템플릿 확정 요소 업데이트
- `agents/04_coder.md` — 체크리스트 2항목 업데이트
- `agents/04b_coder-playbook.md` — Playbook Card ① 체크리스트 업데이트
- `agents/05_code-reviewer.md` — 공개범위 배지 검증 기준 업데이트
- `agents/06_spec-reviewer.md` — D섹션 전면 개편, Playbook 체크 업데이트, 문법 수정
- `agents/08_ui-reviewer.md` — C섹션 공개범위 배지 행 업데이트

---

## 2026-05-21 세션 (Rule→Risk-type 필수 연결 + CRUD 원칙 확정)

**핵심 결정:**
- Rule 편집기 4-card → **5-card** 구조 확정: ①기본정보 → ②Risk-type 연결(필수) → ③판단 조건 설정 → ④Evidence 연결(필수) → ⑤액션
- Rule→Risk-type 연결: Rule→Evidence 연결과 동등한 **필수 게이트 조건**. 미선택 시 검수 요청 불가.
- 원칙 6에 **CRUD 관점** 추가: Create/Read/Update/Delete 작업 유형이 같으면 동일한 UI 구조 사용.

**변경된 파일:**
- `mockups/01_guide.html` — 카드 연결 표에 Rule→Risk-type 행 추가
- `mockups/07_card-editor-rule.html` — 4-card → 5-card 재편 (Risk-type 별도 연결 패널)
- `mockups/07_rule-list.html` — guide-box 업데이트
- `agents/02_po.md` ~ `agents/08_ui-reviewer.md` — Rule 5-card 반영

---

## 2026-06-08 세션 (Playbook MVP 구현)

**핵심 결정:**
- Playbook 배정 최적화 레이어 MVP 제외 (원수사·GA 내부 관할)
- Playbook 공개범위: 내부 전용 고정
- Playbook 색상: `--card-playbook: #6B4A9A` (보라)
- 버튼 유형 3종 확정: 💬상담연결 / 🔗앱내이동 / 🌐외부링크
- 추가 버튼 N개: extraActions 배열 기반
- Card ③ 스코어링: 상담 연결 버튼이 있을 때만 활성화
- GA 전달 데이터 설정 + 리드 스코어 설정 → deferred

**신규 파일:**
- `mockups/16_playbook-list.html`
- `mockups/16_card-editor-playbook.html`

**일괄 업데이트:**
- 기존 21개 HTML 사이드바: ⑥ Playbook 잠금 → `16_playbook-list.html` 실제 링크로 교체

---

## 2026-06-08 세션 후반 (Rule 3-source 확장 + Evidence 구조 재설계)

**핵심 결정:**
- Rule 조건 빌더 **2-source → 3-source**: MYDATA + Promage + **프로파일** (나이·성별·결혼·자녀·직업위험도·출산예정·거주지)
- AMPLITUDE 완전 제거
- Evidence 편집기 폼 구조 완전 분리: staticSection(집단통계) vs promageSection(프롬에이지)
- 등급명 확정: **위험/주의/양호** (기존 "상/중/하" 오류 수정)
- `12_coverage-code-table.html` 3-tab 구성: MYDATA / 프롬에이지 / 프로파일

**변경된 파일:**
- `mockups/07_card-editor-rule.html` — USER_PROFILE_FIELDS 추가, PROFILE 분기 구현
- `mockups/05_card-editor-evidence.html` — 유형별 분리 폼
- `mockups/12_coverage-code-table.html` — 프로파일 탭 신규, Amplitude 탭 제거

---

## 2026-06-09 세션 (Montage 디자인 시스템 전면 적용 + 폰트 리프트)

**핵심 결정:**
- **Pretendard Variable** 폰트 전체 교체: Noto Sans KR(Google Fonts) 완전 제거
- **Montage 디자인 시스템** CSS 토큰 이식 (React 라이브러리 import 불가 → CSS 변수로 추출)
- **폰트 계층 전체 리프트**: 14px base → 15px (Pretendard x-height 낮아 동일 px에서 더 작게 보임)
- `--card-playbook` 활성화: `#D0CFC9`(잠금) → `#6B4A9A`(MVP 활성)

**변경된 파일:**
- 전 23개 HTML — Pretendard CDN 교체, Montage CSS 변수 적용, 폰트 크기 계층 리프트
- `00_design-system.html` — Playbook 스워치 활성화, Montage 토큰 섹션 추가

---

## 2026-06-09 세션 후반 (Evidence 아키텍처 확정 + 전수 카피라이팅 + 에이전트 재편)

**핵심 결정:**
1. **Evidence = 쿼리 정의 카드 최종 확정**: 수동 수치 입력 완전 제거 → KC Engine 런타임 자동 조회
2. **전수 감사 결과:**
   - 등급명 "상/중/하" → "위험/주의/양호" 전체 통일
   - 기술 용어 → 운영자 용어 전수 변환 완료
3. **에이전트 구조 재편:**
   - `guides/` 폴더 신설 (copywriting · insurance-domain · ux-patterns)
   - `agents/04a_coder-evidence.md` 서브에이전트 신설
   - `agents/03_ui-designer.md`, `04_coder.md` 중복 제거 다이어트

**변경된 파일:**
- `mockups/05_card-editor-evidence.html` — Evidence 편집기 전면 재설계
- 전 23개 파일 — 카피라이팅 운영자 눈높이 정비
- `guides/copywriting.md`, `guides/insurance-domain.md`, `guides/ux-patterns.md` (신규)
- `agents/04a_coder-evidence.md` (신규)

---

## 2026-06-10 세션 전반 (전체 검수 완료 + 보류 항목 정리)

**핵심 결정:**
- GA 수신 스펙 → **Phase 1.5 이관** 확정 (Playbook Card ③ 표시 업데이트)

**발견 및 수정된 버그:**

| 파일 | 항목 | 내용 |
|---|---|---|
| `07_card-editor-rule.html` | CSS 변수 | `--status-approved`, `--status-paused` 누락 → 추가 |
| `07_card-editor-rule.html` | 인터랙션 | `validateRiskType()` 누락, `checkSubmitState()` Risk-type 체크 없음 → 구현 |
| `07_card-editor-rule.html` | MOCK_DATA | T09·T10 누락 → 추가 |
| `07_rule-list.html` | MOCK_DATA | T09·T10 Rule 항목 누락 → RU010·RU011 추가 |
| `04_card-editor-risk-type.html` | MOCK_DATA | T10 누락 → 추가 |
| 10개 파일 | CSS 변수 | `--status-approved`, `--status-paused` 누락 → 일괄 추가 |
| 5개 편집기 | CSS 클래스 | `.sum-라이브` 한글 클래스명 → `.sum-active` 일괄 변경 |
| `16_card-editor-playbook.html` | Phase 표시 | Card ③ "Phase 1.5 이관" 표시 추가 |

---

## 2026-06-10 세션 후반 (Concept 설계 재정의 + 이슈 1~7 일괄 수정)

**핵심 결정:**
1. **Concept 편집기 Standalone 옵션 제거**: Standalone = Case 3/4 자동 동작. 카드 속성 아님.
2. **Concept → Risk-type 1:1 → 1:N 다중 선택**: 체크박스 리스트 + 칩 미리보기. MOCK_DATA `linkedRiskTypes` 배열.

**이슈 수정:**

| 이슈 | 파일 | 내용 |
|---|---|---|
| 3 | 편집기 5개 (04~08_card-editor) | `badge-라이브`/`status-라이브-guide`/JS `'라이브'` → 영문 클래스로 일괄 교체 |
| 4 | `05_card-editor-evidence.html` | Evidence 가이드박스 중복 설명 제거 |
| 5 | `04_card-editor-risk-type.html` | status-guidance "ID(자동생성)" 항목 제거 |
| 6 | `16_playbook-list.html` | 필터 탭 "✔ 승인완료" 추가 |
| 7 | `04_risk-type-list.html` | guide-box 중복 내용 제거 |
| 8 | `06_concept-list.html`, `07_rule-list.html` | page-header 설명 명사형 통일 |

**에이전트 업데이트:**
- `agents/02_po.md`, `03_ui-designer.md`, `04_coder.md`, `06_spec-reviewer.md` — 1:N 다중 선택 반영
- `agents/05_code-reviewer.md`, `08_ui-reviewer.md` — Concept 체크박스 검수 항목 추가

---

## 2026-06-10 세션 3차 (에이전트 팀 구조 재편)

**핵심 결정:**
- 3계층 정보 아키텍처 도입: CLAUDE.md(팀 브리핑) → context/(컨텍스트 패키지) → agents/(역할 전용)
- `context/project.md`, `context/decisions.md` 신규 생성
- `guides/design-system.md` 신규 생성 (CSS/폰트 전담)
- `agents/04b_coder-playbook.md` 신규 생성 (Playbook 전담)
- `CLAUDE.md` 팀 브리핑 전용으로 재작성 (~80줄)
- `agents/03_ui-designer.md` 슬림화 (화면별 상세 명세 제거)
- `agents/04_coder.md` 슬림화 (CSS/파일목록/Playbook JS 분리)
