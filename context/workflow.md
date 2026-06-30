# KC Admin — 워크플로우 및 캔버스 UX

> **진실원.** 카드 라이프사이클, 캔버스 화면 구조, 검수·승인 흐름은 이 파일이 기준.
> 변경 시 PO(02)가 이 파일을 즉시 업데이트한다.

---

## 카드 라이프사이클 (2026-06-18 확정)

**흐름:** 임시저장 → 승인요청 → **승인완료(캔버스 연결 가능)** → 사전 테스트 → **라이브 전환** → KC Engine 반영

| 단계 | 상태 | 캔버스 연결 | KC Engine |
|---|---|---|---|
| 내용 작성 | 임시저장(draft) | ❌ 불가 | ❌ 미반영 |
| 검수 중 | 승인요청(review) | ❌ 불가 | ❌ 미반영 |
| 승인 후 | **승인완료(approved)** | ✅ **준비 연결 가능** | ❌ 미반영 (pending edge) |
| 배포 완료 | 라이브(active) | ✅ 라이브 연결 | ✅ 반영 |

- 승인완료 카드 간 연결 = **준비 연결(pending edge)**: 캔버스에는 표시되지만 KC Engine에는 미반영
- **라이브 전환** 시 pending edge → active edge: KC Engine에 즉시 반영
- 사전 테스트 통과 후 "배포 요청"으로 라이브 전환

**Playbook 예외:** Playbook은 approved 상태에서 캔버스 연결 없이 직접 "라이브 전환" 가능 (독립 체인).

---

## 운영 관점 전체 프로세스

```
[카드 등록 — 내용 입력]
각 카드 유형별로 (순서 무관, 독립 등록 가능):
  → 카드 편집기에서 내용 입력
  → 검수 요청 → 도메인 검수자 승인 → 승인완료
  (approved 상태부터 캔버스에 표시됨)

[카드 연결 — 캔버스에서 처리]
  → 카드 캔버스(00_canvas-main.html) 접근
  → 피커 패널(상단 4컬럼)에서 포컬 카드 클릭
  → 그리드(하단) "연결 가능" 섹션에서 "연결 추가" 버튼 클릭 → 확인 모달

[검증]
  → 캔버스 사전 테스트 패널 (00_canvas-main.html)

[라이브 전환]
  → "배포 요청": pending edge → active edge, KC Engine 즉시 반영
  → 라이브 전환은 사전 테스트 통과 후 캔버스에서 처리
```

---

## v2 캔버스 UX (2026-06-17 확정, 2026-06-18 수정)

**원칙:** 캔버스 = 연결 전용, 편집기 = 내용 전용

| 역할 | 화면 |
|---|---|
| 카드 내용 등록·수정 | 각 카드 편집기 (card-editor-*.html) |
| 카드 연결 추가·변경 | **카드 캔버스** (00_canvas-main.html) |
| 연결 상태 확인 (읽기 전용) | 각 카드 편집기 — "캔버스에서 변경" 버튼으로 이동 |

### 캔버스 화면 구조

**필터 바 (툴바 바로 아래):**
- 상태 필터 pill: 전체 / 라이브 / 승인완료 (기본: 전체)
- 카드명·ID 검색 인풋 (`getFilteredPickerCards()`가 피커에 적용)

**상단 피커 패널 (204px 고정):** 4컬럼 카드 목록
- 컬럼: CONCEPT / RISK-TYPE / RULE / EVIDENCE·POLICY (합침)
- **Playbook 제외** — KC 체인과 독립 동작, 캔버스 연결 불필요
- active + approved + review 카드 표시 (draft 제외)
- 카드 클릭 → 하단 그리드 갱신 (포컬 카드 지정)

**Evidence·Policy 합침 근거:** 둘 다 Rule의 output 레벨 — 동일 단계에 위치

**하단 그리드 섹션 (flex-1):**
- 선택 전: 빈 상태 안내 ("위에서 카드를 선택하세요")
- 선택 후: 포컬 카드 기준 4컬럼 그리드 (Playbook 제외)
  - **포컬 컬럼**: 선택된 카드 상세 (타입 배지, 상태 배지, 상세보기·편집 버튼)
  - **연결됨 섹션** (초록 헤더, `sh-connected`): `computeChain()` 반환 Set 내 카드
  - **연결 가능 섹션** (파란 헤더, `sh-available`): `findDirectTarget()` 성공한 미연결 카드 + "연결 추가" 버튼
  - **해당 없음**: 연결 불가 컬럼 (불투명 처리)

### 핵심 JS 함수

- `computeChain(cardId)`: 양방향 BFS → 전체 연결 체인 반환 (Set)
- `findDirectTarget(card, focalCard)`: CONNECT_RULES 기반 직접 연결 가능성만 체크 (체인 경유 금지)
- `findChainEdge(cardId, chainSet, focalId)`: 포컬 카드 직접 엣지 우선 반환
- `visibleCards = CARDS.filter(c => c.status !== 'draft')`: active + approved + review 표시
- `getFilteredPickerCards()`: `ALL_PICKER_CARDS()`에 상태 필터(`canvasStatusFilter`) + 검색어(`canvasSearchQuery`) 적용
- `setStatusFilter(val)`: 필터 pill 토글 후 `renderPicker()` 재호출
- `onCanvasSearch(val)`: 검색어 업데이트 후 `renderPicker()` 재호출

### 테스트 모드 — RAG 결과 사전 설정 (2026-06-30 확정)

**흐름:** KC 조건 설정 → RAG 결과 사전 설정 → 테스트 실행 → 답변 체인 확인 → 라이브 전환

- 설정 패널 "④ RAG 결과 설정" 섹션에서 KC 미매칭 시 발동할 경로 선택 (FAQ RAG / LLM Fallback)
- **약관 RAG 제외:** 가상 테스트 인물에게는 MYDATA(보험계약 데이터)가 없어 약관 RAG 검색 불가 — 사전 테스트 구성에서 제거됨
- 기본값: `ragMockState = 'faq'` (FAQ RAG 경로)
- `ragMockState = 'faq' | 'llm'` — 두 값만 허용 (yakgwan 제거)
- "테스트 실행" 클릭 시 사전 설정값 기준으로 KC → FAQ RAG → LLM Fallback 순서로 렌더
- `buildRagPresetHTML()`: 2버튼 UI 렌더 / `ragMockState` 직접 갱신

**라이브 전환 버튼 (2026-06-30 추가):**
- 패널 푸터 `<div id="footerGoLive">` 슬롯에 동적 삽입
- 노출 조건: `testHasRun === true` AND KC 통과(`kcPass`) AND 체인 내 `status === 'approved'` 카드 존재
- `updateFooterGoLive(kcPass)`: 조건 평가 후 버튼 렌더 또는 비움
- `goLive()`: 체인 내 approved 카드 → active 전환, `renderGrid()` + `drawLines()` 재호출, 토스트 표시

### 카드 상태 배지 (캔버스 내)

- active → `"라이브"` 배지 (초록, `gc-badge-live`)
- approved → `"승인완료"` 배지 (파랑, `gc-badge-approved`)
- review → `"승인요청"` 배지 (주황, `gc-badge-review`)

### 연결 액션

- **연결 추가:** "연결 가능" 카드의 전폭 파란 "연결 추가" 버튼 → 확인 모달
  - 양쪽 카드가 모두 active: edge status = `'active'`
  - 한쪽이라도 approved: edge status = `'pending'` (준비 연결)
- **연결 제거:** 연결된 카드의 "연결 제거" 버튼 → 확인 모달 (`findChainEdge` 반환 엣지 대상)

---

## 편집기 연결 UI 읽기 전용 (2026-06-17 확정)

| 편집기 | 기존 | 변경 |
|---|---|---|
| Rule 편집기 — Risk-type 연결 | select 드롭다운 | 읽기 전용 배지 + "캔버스에서 변경" |
| Rule 편집기 — Evidence 연결 | 체크박스·칩 패널 | 읽기 전용 배지 목록 |
| Policy 편집기 — Rule 연결 | 클릭 가능 목록 | 읽기 전용 배지 + "캔버스에서 변경" |

연결은 캔버스에서만 가능. 편집기 검수 요청 게이트: 내용 필드만 체크 (연결 여부 게이트 제거).

---

## 카드 등록 순서 자유화 (확정)

- 편집기 내 연결 선택 UI 제거 → 등록 순서 의존성 없어짐
- 각 카드는 순서 무관하게 등록·검수·승인 가능
- **승인완료(approved) 상태부터 캔버스에서 연결 구성 가능** (라이브 전환 전 사전 연결 허용)
- 사전 테스트 통과 후 라이브 전환 → KC Engine 반영

---

## 사이드바 v2 표준 (2026-06-17 확정)

- 로고 옆 "v2" 배지 추가
- "카드 캔버스" 메뉴 항목 추가 → `00_canvas-main.html`
- "카드 연결 현황" (10_chain-visualizer.html) 메뉴 **제거** — deprecated
- **`<div class="nav-section">` 섹션 레이블 완전 제거** — `nav-divider`만 사용
- **사이드바 순서 (2026-06-25 업데이트):**
- 카드 라이브러리 그룹 (divider) → 검수·승인 → **연결·테스트·배포** → 시스템 설정 → FAQ Q&A (divider) → 참조 섹션
- "사전 테스트" 메뉴 완전 제거됨 (2026-06-25, 26개 파일 전수 반영)
- 카드 연결은 승인된 카드만 연결 가능하므로 검수·승인 하단에 위치

**참조 섹션 구성 (nav-divider 아래 3항목 순서):**
  1. `13_answer-logic.html` — AI 답변 생성 로직
  2. `15_aio-guide.html` — AIO 가이드
  3. `12_coverage-code-table.html` — 담보코드
  - `14_answer-logic-guide.html` — **삭제됨 (2026-06-24)**
  - `17_system-data-guide.html` — 사이드바 미노출 (직접 URL 접근)
- 표준 사이드바 HTML → `guides/ux-patterns.md` 참조
