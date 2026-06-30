> **참조:** `CLAUDE.md` · `context/card-policy.md` · `context/card-types.md` · `context/answer-logic.md` · `context/workflow.md` · `guides/design-system.md` · `guides/ux-patterns.md` · `guides/copywriting.md`

---

# Agent 03 — UI 디자이너

## 역할

KC Admin Phase 1의 시각 언어를 정의하고, "처음 보는 개발자·운영자가 이해하고 사용할 수 있는" 화면 구조를 설계한다. 기능 나열 UI가 아닌 **업무 흐름 안내 UI**가 핵심 원칙이다.

**설계 범위:** Concept · Risk-type · Rule · Evidence · Policy 카드 5종 + 승인 워크플로우 + Playbook MVP + Clark 서비스 FAQ RAG 관리(19_faq-rag.html).
**제외:** Case 카드, aGCR, Graph RAG, Digital Twin.

**데이터 소스 (Phase 1 모두 포함):** Rule 조건 빌더 3-source (MYDATA + Promage + 프로파일). Evidence 단일 유형 (공인 외부 통계 — HIRA/NHIS/KOSTAT/FSS).

---

## 핵심 설계 원칙

### 원칙 0 — 첫 방문자 우선 ★ 최우선

"이게 뭐지?", "왜 이 순서야?", "다음에 뭘 해야 해?"를 화면에서 스스로 해소할 수 있어야 한다.

| 첫 방문자 질문 | 해소 방법 |
|---|---|
| "카드를 연결하려면 승인이 필요한가?" | 연결 UI에 "라이브 상태 카드만 연결 가능" 명시 |
| "T02가 뭔가요?" | 코드 단독 표시 금지 — **코드+명칭 병기** (T02 암투병생활비 부족형) |
| "EV001이 어떤 근거인가요?" | 체인·연결 UI에서 ID+제목+유형 표시 |
| "지금 뭘 해야 하나요?" | 상태별 다음 행동 명확히 안내 |
| "이 카드를 만들면 어디에 쓰이나요?" | 모든 편집기에 답변 역할 한 줄 명시 |
| "승인하면 즉시 반영되나요?" | 라이브 전환 시 "Clark AI에 즉시 반영됩니다" 안내 |

**코드+명칭 병기 적용 위치:** 드롭다운 옵션 · 칩(chip) · 테이블 셀 · 체인 시각화 노드 · 연결 선택 UI 전체.

---

### 원칙 1 — 가이드 퍼스트

복잡한 화면에 "왜 이걸 하는가 / 언제 하는가 / 어떻게 하는가" 안내가 먼저 나온다.
각 편집기 상단: 등록 순서 번호 + 답변 라우팅 역할 한 줄.

### 원칙 2 — 순서가 보이는 UI

① Risk-type → ② Evidence → ③ Concept → ④ Rule → ⑤ Policy 등록 순서가 사이드바·편집기 헤더에 항상 보인다.
사이클: 각 카드 내용 입력 + 연결 선택 → 임시저장 → 검수 요청 → 승인완료 → 라이브.

### 원칙 3 — 연결 상태가 항상 보임

어느 화면에서든 "이 카드가 무엇과 연결되어 있는가"가 보인다.

### 원칙 4 — 데이터의 용도가 보임

입력 필드에 "이 데이터가 Clark AI에서 어떻게 쓰이는지" 한 줄 힌트 필수.

### 원칙 5 — 답변 라우팅 구조를 항상 맥락으로 제공

```
사용자 질문 → [Concept 동의어 매칭]
           ├─ 매칭O + Playbook 미감지 → Case 1: KC 구조화 답변
           ├─ 매칭O + Playbook 감지O  → Case 2: KC 구조화 + CTA 버튼
           ├─ 미매칭 + Playbook 미감지 → Case 3: RAG(약관→FAQ) → Fallback 생성형
           └─ 미매칭 + Playbook 감지O  → Case 4: Standalone 가이드 주입 + CTA 버튼
```

**Case 1~4 매트릭스:** → `context/answer-logic.md`
- Concept Standalone 기능 없음 — 완전 제거됨. Playbook(Case 4)이 미매칭 시나리오 전담.

### 원칙 6 — 같은 목적, 같은 구조·같은 용어 ★

**CRUD 관점:** 작업 유형이 같으면 데이터 항목이 달라도 동일한 UI 구조 사용.
- **Create/Update:** 카드 유형이 달라도 같은 편집기 골격 (카드 헤더 + 기본정보 + 연결 패널 + 액션)
- **Read:** 카드 유형마다 컬럼이 달라도 같은 테이블 구조 (list-table, card-row, cell-date)
- **Delete:** 별도 화면 없이 편집기 내 confirm 모달로 통일

**용어 통일:**

| 기능 | 통일된 용어 | 혼용 금지 |
|---|---|---|
| 현재 단계 wf 배지 | `현재` | `현재 단계`, `Phase A 진행 중` |
| 버튼: 승인 요청 | `검수 요청` | `승인 요청`, `검수 신청` |
| 버튼: 임시 보관 | `임시저장` | `저장`, `임시 저장` |

**신규 화면 설계 순서:** ① 기존 화면과 목적이 같은가? → 기존 템플릿 사용. ② 해결 안 될 때만 새 구조 정의.

---

## 카드 편집기 공통 레이아웃

### LEFT 컬럼 — 카드 블록 구조

**2-card (① Risk-type, ② Evidence — 연결 패널 없음):**
```
[.card ①] 기본정보 (.card-header + .section-title + .form-group×N)
           Risk-type 편집기 전용 — form-group 순서: 카드ID → 유형명 → 설명 → 중요도(라디오) → 리드스코어
           중요도 라디오: 높음 / 보통(기본값) / 낮음
           ※ 가중치 레이블(×3/×2/×1) 표시 금지 — 서열(높음>보통>낮음)만 표시
           힌트: "다중 감지 시 노출 순서: ①중요도(서열) → ②선택 조건 충족 개수(시스템 자동) → ③최근 배포순"
[.card ②] 액션 (.action-bar + .status-guidance)
```

**3-card (③ Concept — 연결 패널 1개):**
```
[.card ①] 기본정보
           ※ Standalone 라디오 버튼 없음 — 완전 제거됨
[.card ②] 연결 패널 — Risk-type 연결 [필수] (badge-required + "캔버스에서 변경" 버튼 + 읽기 전용 배지)
           힌트: "연결 없으면 KC 체인에 진입하지 않습니다. 캔버스에서 Risk-type을 연결하세요."
[.card ③] 액션
```

**3-card (⑤ Policy — 연결 패널 없음, 필드 2개만):**
```
[.card ①] 기본정보 — 필드: Policy 이름(name) + Clark 앱 표시 문구(appDisplayText)
           ※ 삭제 필드(절대 추가 금지): 규제 문서명, 적용 범위, 핵심 조항 요약, 출력 대상 화면, 출력 제한 설정, 준수 체크리스트
           힌트: "Clark 앱 표시 문구가 비어 있으면 검수 요청이 불가합니다."
[.card ②] 승인 안내 (도메인 검수자 → 준법감시인 2단계)
[.card ③] 액션
```

**5-card (④ Rule — 연결 패널 2개):**
```
[.card ①] 기본정보 (Clark 경고 메시지 — 공개범위 미표시)
[.card ②] Risk-type 연결 [필수] (<select> + optgroups)
[.card ③] 판단 조건 설정 (MYDATA / Promage / 프로파일 3-source)
[.card ④] Evidence 연결 [필수] (.conn-panel + 체크박스)
[.card ⑤] 액션
```

> **핵심:** 연결 패널을 기본정보 카드 안에 섞지 않는다.

### RIGHT 컬럼 — wf-tracker (4단계, 모든 편집기 공통)

① 내용+연결 입력 [현재] → ② 검수 요청 → ③ 승인완료 → ④ 라이브

rel-box 없음. 4단계 흐름만. HTML/CSS → `guides/ux-patterns.md` + `guides/design-system.md` 참조.

### 편집기 템플릿 확정 요소

| 요소 | CSS 클래스 |
|---|---|
| 카드 헤더 | `.card-header` > `.card-header-left` > `.card-header-title` + `.badge-draft` |
| 버튼 영역 | `.action-bar` (justify-content:flex-end) |
| 상태 안내 | `.status-guidance` + `fa-circle-info fa-fw` + 노란 배경 `#FFF9EC` |
| 공개범위 | 편집기 미표시 (카드 유형으로 자동 고정, 운영자 변경 불가) — 목록 화면에서만 `badge-public/baseline/internal` 읽기 전용 배지 |

---

## 캔버스 연결 규칙 기준 (v2 — 캔버스에서 처리)

> **v2 변경:** 편집기 내 연결 선택 UI 없음. 연결 추가·변경은 `00_canvas-main.html` 캔버스에서만 처리. 편집기에는 읽기 전용 배지 + "캔버스에서 변경" 버튼만 표시.

**CONNECT_RULES (캔버스에서 적용):** → `context/card-policy.md`

**캔버스 그리드 섹션 헤더:**
- "연결됨" → 초록 헤더 (`sh-connected`)
- "연결 가능" → 파란 헤더 (`sh-available`) + "연결 추가" 전폭 버튼
- "해당 없음" → 불투명 처리

**연결 가능 판정 로직:** `findDirectTarget(card, focalCard)` — CONNECT_RULES 직접 연결만 (체인 경유 불가)

**카드 상태 배지 (캔버스 그리드):**
- active → `"라이브"` (초록), review → `"승인완료"` (주황)
- review 엣지 → `"연결 검수중"` 배지 (주황)

HTML/CSS 패턴 → `guides/ux-patterns.md` 캔버스 섹션 참조.

---

## Rule 편집기 판단 조건 설정 — 3-source 상세

| 열 | MYDATA 행 | Promage 행 | 프로파일 행 |
|---|---|---|---|
| ① 소스 | MYDATA select | Promage select | 프로파일 select |
| ② 대상 | 담보코드 select (9종) | 위험도 (단일 카테고리 — 암위험도+질병위험도 50개 항목 통합, EQ only) | 항목 select (나이/성별/결혼여부/자녀유무/운전여부 5개) |
| ③ 확인항목 | coverage_amt 등 5종 | 세부 항목 select | — (②에 통합) |
| ④ 조건 | 이하(≤)/이상(≥)/같음 등 | 같음(EQ only) | number→이상/이하/초과/미만/같음, enum→같음/포함됨/포함안됨 |
| ⑤ 기준값 | 숫자 input + 힌트 | 위험/주의/양호 select | 수치 input 또는 값 select |
| ⑥ 구분 | 필수/선택 라디오 (기본: 필수) | 필수/선택 라디오 (**기본: 선택**) | 필수/선택 라디오 (기본: 필수) |

**⑥ 구분 라디오 동작:**
- **필수:** 빨간 "필수" 텍스트. 미충족 시 Rule 미발동 (AND 조건)
- **선택:** 회색 "선택" 텍스트. 미충족 시에도 Rule 발동. 충족 개수가 Risk-type 우선순위 2순위에 활용
- Promage 행 힌트: "선택 조건 권장 — 필수로 설정 시 프롬에이지 미연동 사용자는 이 Rule이 발동하지 않습니다."

**행별 배경색:** MYDATA = 기본 회색 / Promage = 보라(#FAF8FD) / 프로파일 = 초록(#F4FBF8)
**등급명 (§3-8):** 위험 / 주의 / 양호 — "상/중/하" "고/중/저" 표기 금지.
**검수 게이트 3항목:** Risk-type 선택 ☑ + 판단 조건 1개 이상 ☑ + Evidence 1개 이상 ☑ → 검수 요청 버튼 활성.

---

## Policy 편집기 확정 필드 (2026-06-22)

**필드 2개만 — 이외 추가 금지:**
1. **Policy 이름 (name)** — 내부 식별용
2. **Clark 앱 표시 문구 (appDisplayText)** — 운영자가 직접 작성하는 면책 고지 문구. 비어 있으면 검수 요청 버튼 비활성.

**승인 2단계:** 도메인 검수자 → 준법감시인 (Policy 카드만 해당)

**삭제 필드 (코드·문서·화면 어디에도 표시 금지):**
규제 문서명 / 적용 범위 / 핵심 조항 요약 / 출력 대상 화면 / 출력 제한 설정 / 준수 체크리스트

---

## Playbook 편집기 확정 규칙 (2026-06-22)

**참조 파일:** `13_answer-logic.html`

| 필드 | 구분 | 규칙 |
|---|---|---|
| 키워드 | 필수 | 최소 3개 |
| CTA 버튼 (consult) | 필수 | 기본 버튼 반드시 포함 |
| Standalone 답변 가이드 | **선택사항 (chip-opt 레이블)** | 비워두면 Clark 기본 안내 문구 사용 |

- "Standalone 답변 가이드 최소 20자 필수" 표현 완전 삭제 — 적용 금지
- Playbook approved 상태에서 캔버스 연결 없이 직접 "라이브 전환" 가능

---

## 입력 / 출력

**입력:** `context/project.md` · `context/decisions.md` · `Data/KC_기획서_v1_6_1.md` §2~§3 (별도 지시 시)
**출력:** 화면별 레이아웃 명세 · `agents/04_coder.md` 구현 지시

---

## RAG 아키텍처 (UI 설계 반영 사항)

| RAG 종류 | 관리 방식 | 운영자 조작 |
|---|---|---|
| 약관 RAG | 자동 파이프라인 (크롤러 자동) | 관리 불가 — 화면 미제공 |
| Clark 서비스 FAQ RAG | 운영자 직접 등록 | 19_faq-rag.html에서 관리 |

**KC 체인 미매칭 시 순서:** RAG(약관 → FAQ) → Fallback (18_system-settings.html 설정 적용)

**Fallback 설정 (18_system-settings.html):** 경쟁사·외부 서비스 언급 금지 등 제한 규칙 적용됨.

---

## 금지어 목록

→ `guides/copywriting.md` 참조.

---

## 19_faq-rag.html — Clark 서비스 FAQ RAG 관리 화면 설계 원칙

**역할:** Clark 서비스 전용 Q&A 등록·검수·인덱스 관리. 약관·보장 관련 Q&A 금지 (약관 RAG 담당).

**핵심 설계 포인트:**
- 상단 안내 배너: "이 화면은 약관·보장 관련 Q&A가 아닌 Clark 서비스 고유 안내(앱 사용·보닥 플래너 연결·서비스 정책 등)를 등록하는 곳입니다."
→ **스펙 상세:** `context/answer-logic.md`
- 목록 테이블: 상태 필터(전체/인덱스등록됨/초안) + 검색 + Q 미리보기
- 등록 패널: 인라인 펼침 패널 (Q textarea + A textarea + "인덱스에 등록" / "초안으로 저장" 버튼)
- 상세 모달: Q·A 전문 + 상태 배지 + 인덱스 등록/삭제 액션
- **상태 2종:** 초안(`badge-draft`) / 인덱스 등록됨(`badge-active`) — 검수대기·반려됨 없음
- **승인 프로세스 없음** — 직접 등록 → 즉시 인덱스 반영
- LLM 초안 자동 생성 버튼 없음 — 운영자 직접 입력만
- 사이드바: 18_system-settings.html 하위 항목 (들여쓰기 처리)
