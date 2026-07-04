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
- 카드 클릭 → 하단 그리드 갱신 (포컬 카드 지정), **카드 정보 패널은 열지 않음** (아래 참조)

**카드 선택(포컬 전환) vs 카드 정보 보기는 별개 동작 (2026-07-05 확정):** 그리드를 체인 따라 이동하며 탐색하는 도중 정보 패널이 계속 튀어나와 화면을 가리는 문제가 있었다 — `selectCard(id)`가 포컬 전환 시마다 자동으로 `openPanel()`을 호출했기 때문. 이제 `selectCard()`는 그리드만 갱신하고 패널을 열지 않는다. 패널은 명시적으로 다음 두 경우에만 연다:
- **"탐색" 버튼**(연결됨 카드·간접 카드·형제 카드에 있음): `exploreCard(id)` = `selectCard(id)` + `openPanel(id)` — 포컬 전환과 정보 확인을 동시에
- **"상세 보기" 버튼**(포컬 카드 전용): `viewCard(id)` = `openPanel(id)` — 포컬은 그대로 두고 정보만 확인
- 피커 클릭·카드 박스 자체 클릭(버튼이 아닌 부분)은 `selectCard()`만 호출 — 그리드만 갱신, 패널 안 열림

**Evidence·Policy 합침 근거:** 둘 다 Rule의 output 레벨 — 동일 단계에 위치

**하단 그리드 섹션 (flex-1):**
- 선택 전: 빈 상태 안내 ("위에서 카드를 선택하세요")
- 선택 후: 포컬 카드 기준 4컬럼 그리드 (Playbook 제외)
  - **포컬 컬럼**: 선택된 카드(★ 강조, 상세보기·편집 버튼) + 같은 파이프라인에 속한 같은 타입의 다른 카드(형제 — CONNECT_RULES상 직접 연결 불가, "탐색"만 가능)
  - **연결됨 섹션** (초록 헤더, `sh-connected`): `computePipeline()`이 반환한 파이프라인에 속한 카드 전부. 그중 포컬과 **직접(1홉) 엣지**로 연결된 카드만 "연결 제거" 버튼이 붙고(`chainCardHTML`), 파이프라인엔 있지만 포컬과 직접 연결은 아닌 카드(간접)는 읽기 전용 + "탐색"만 가능(`indirectCardHTML`)
  - **연결 가능 섹션** (파란 헤더, `sh-available`): `findDirectTarget()` 성공한 미연결 카드 + "연결 추가" 버튼 — 포컬 카드와 직접 연결 가능한 카드로만 한정
  - **해당 없음**: 연결 불가 컬럼 (불투명 처리)

**2026-07-05 확정(4차, 최종) — 표시는 "Risk-type 축 파이프라인 전체", 액션(연결·해제)은 포컬 기준 직접(1홉)만:** 세 번 오갔던 문제 — ① 전체 BFS 체인을 다 보여주면 Evidence처럼 여러 Rule에 공유되는 카드를 통해 무관한 다른 Concept·Rule까지 전부 딸려나와 복잡도가 폭발했고, ② 반대로 순수 1홉만 보여주면 "Rule 선택 시 그 Rule로 가기 위한 Concept이 안 보인다"는 문제가 있었다. 최종 해법은 `computePipeline(focalCard)` — 포컬이 속한 **Risk-type을 축**으로 파이프라인(Concept→Risk-type→Rule→Evidence·Policy)만 계산한다.
- 포컬 타입별로 관련 Risk-type(들)을 먼저 찾는다: Risk-type 자신 / Concept이 연결된 Risk-type / Rule에 연결된 Risk-type(역방향) / Evidence·Policy를 쓰는 Rule의 Risk-type(2단계 역방향)
- 그 Risk-type(들)에 연결된 Concept 전체 + 그 Risk-type의 Rule(1:1) + 그 Rule의 Evidence·Policy 전체를 파이프라인에 포함
- **무관한 다른 파이프라인으로는 확장하지 않는다** — 예: Evidence 하나가 다른 Rule과도 공유되더라도, 포컬이 그 Evidence 자신이 아닌 이상(Rule이나 Concept이 포컬일 때) 그 다른 Rule 쪽 Risk-type·Concept·Evidence는 파이프라인에 안 들어온다. 반대로 **포컬이 그 공유 Evidence 자신이면** 그 카드를 실제로 쓰는 Rule이 여러 개이므로 그만큼의 파이프라인이 정당하게 다 포함된다(버그가 아니라 정확한 표현).
- 연결선(`drawLines()`)도 파이프라인 안에서 양 끝이 다 있는 엣지를 전부 그리되, 포컬에 직접 닿은 엣지는 진하게(0.9) · 나머지는 옅게(0.5) 표시해 시각적으로 구분한다.
- "연결 제거"·"연결 가능"은 여전히 포컬 카드 기준 직접(1홉)으로만 한정 — 간접 카드를 만지고 싶으면 "탐색"으로 그 카드를 새 포컬로 전환한다.

### 핵심 JS 함수

- `computePipeline(focalCard)`: 포컬이 속한 Risk-type 축 파이프라인(Concept~Evidence·Policy) 전체를 Set으로 반환 — "연결됨" 섹션의 표시 범위(간접 카드 포함) + `drawLines()`가 사용
- `findDirectTarget(card, focalCard)`: CONNECT_RULES 기반 직접 연결 가능성만 체크 — "연결 가능" 판단 전용
- `edgeExists(fromId, toId)` / `getEdge(fromId, toId)`: 포컬과의 직접 엣지 판단·조회 — "연결 제거" 버튼 노출 여부와 그 대상 엣지
- `visibleCards = CARDS.filter(c => c.status !== 'draft')`: active + approved + review 표시
- `getFilteredPickerCards()`: `ALL_PICKER_CARDS()`에 상태 필터(`canvasStatusFilter`) + 검색어(`canvasSearchQuery`) 적용
- `setStatusFilter(val)`: 필터 pill 토글 후 `renderPicker()` 재호출
- `onCanvasSearch(val)`: 검색어 업데이트 후 `renderPicker()` 재호출

### 테스트 모드 — RAG 결과 사전 설정 (2026-06-30 확정)

**흐름:** KC 조건 설정 → RAG 결과 사전 설정 → 테스트 실행 → 답변 체인 확인 → 라이브 전환

**진입 경로 단일화 (2026-07-05 확정):** 사전 테스트는 **테스트 모드에서 캔버스 카드를 체크한 뒤 "테스트 실행" 버튼을 눌렀을 때만** 진입한다. 이전에는 연결 모드에서 카드를 클릭했을 때 뜨는 "카드 정보" 슬라이드 패널에도 "사전 테스트" 탭이 같이 붙어 있었는데, 이는 "사전 테스트는 테스트 모드에서만 진행한다"는 원칙과 어긋나 제거했다 — 슬라이드 패널은 이제 "카드 정보" 전용이고, 탭 UI 자체가 없다. 그리드 헤더의 "답변 테스트" 바로가기 버튼(연결 모드에서 노출)도 같은 이유로 제거했다. 툴바의 "테스트 모드로 이동" 버튼은 예외 — 이건 카드별 진입이 아니라 순수 모드 전환 버튼이라 정책과 충돌하지 않는다.

- 설정 패널 "④ RAG 결과 설정" 섹션에서 KC 미매칭 시 발동할 경로 선택 (FAQ RAG / LLM Fallback)
- **약관 RAG 제외:** 가상 테스트 인물에게는 MYDATA(보험계약 데이터)가 없어 약관 RAG 검색 불가 — 사전 테스트 구성에서 제거됨
- 기본값: `ragMockState = 'faq'` (FAQ RAG 경로)
- `ragMockState = 'faq' | 'llm'` — 두 값만 허용 (yakgwan 제거)
- "테스트 실행" 클릭 시 사전 설정값 기준으로 KC → FAQ RAG → LLM Fallback 순서로 렌더
- `buildRagPresetHTML()`: 2버튼 UI 렌더 / `ragMockState` 직접 갱신

**Evidence 다중 선택 / Policy 자동 전체 적용 (2026-07-05 확정):** `context/answer-logic.md`의 Evidence·Policy 활용 방식 정책을 사전 테스트 도구에도 그대로 반영했다.
- **Evidence — 다중 선택**: Rule 1개에 여러 Evidence가 연결될 수 있고 실제로도 LLM이 맥락에 맞는 것만 골라 인용한다(전부 나열하지 않음). 그래서 테스트 그리드에서 여러 Evidence를 동시에 체크해 "이 조합이면 이렇게 나온다"를 미리볼 수 있게 했다. `testSelection.evidence`/`testChain.evidence`는 배열(cardId[])이며, `toggleTestEvidence(cardId)`로 토글한다.
- **Policy — 항상 전체 적용, 선택 대상 아님**: Policy는 "연결된 전부 적용"이 원칙이라 사용자가 고르지 않는다. 테스트 모드 그리드에서 Policy 카드는 체크박스 대신 "자동 적용" 배지(`gc-auto-badge`)로 표시되고 클릭해도 선택 상태가 바뀌지 않는다. `connectedPolicyIds(ruleId)`가 선택된 Rule에 연결된 Policy를 전부 조회해 `testChain.policy`(배열)에 자동으로 채운다.
- `buildChatAnswerHTML()`은 `testChain.evidence` 배열을 순회하며 Evidence별 문장을 각각 추가하고, `testChain.policy` 배열을 순회하며 유의사항 블록을 전부 붙인다.

**테스트 모드에서는 파이프라인 전체가 체크 가능해야 한다 (2026-07-05 확정):** 연결 모드에서는 "연결 제거"가 포컬 기준 직접(1홉)에만 붙어야 하지만, 테스트 모드는 애초에 "연결 가능" 섹션 자체가 없어(카드가 이미 다 정해진 상태에서 조합만 미리보는 것이므로) 간접 카드에 체크박스가 없으면 그 카드를 고를 방법이 없다 — 예: Rule이 포컬일 때 그 Risk-type에 딸린 Concept이 여러 개면(2홉 거리) 그중 테스트할 하나를 못 골랐다. 그래서 `renderGrid()`는 테스트 모드일 때 간접 카드·형제 카드도 `indirectCardHTML()`(읽기 전용) 대신 `chainCardHTML()`(체크박스 렌더링)로 그린다 — `canvasMode === 'test' ? chainCardHTML(c, focalCard) : indirectCardHTML(c)` 분기. `chainCardHTML()`은 포컬과의 직접 엣지가 없어도(`cedge`가 null) 안전하게 동작하도록 이미 널 체크가 돼 있어 별도 분기 없이 그대로 재사용 가능했다.

**포컬(지금 보고 있는) 카드는 체크 안 해도 자동 포함 (2026-07-05 확정):** 위 수정 직후 "포컬 카드까지 체크박스로 따로 눌러야 하는 건 불필요하다"는 지적을 받고 고쳤다. `selectCard(id)`가 테스트 모드일 때 그 카드를 즉시 `testSelection`에 등록한다(Evidence는 배열에 추가, Policy는 애초에 대상 아니므로 제외, 나머지는 스칼라 지정). `focalCardHTML()`의 테스트 모드 카드는 이제 클릭도 안 되고(`onclick` 없음) 체크 표시만 고정으로 보여준다 — 토글해서 "포컬인데 미체크" 같은 모순 상태를 만들 수 없다. `switchCanvasMode('test')`로 전환할 때 이미 포컬이 선택돼 있으면(연결 모드에서 넘어온 경우) `selectCard(selectedCardId)`를 다시 호출해 그 카드도 즉시 등록한다. 형제·간접 카드(포컬이 아닌 같은 파이프라인의 다른 카드)는 여전히 체크박스로 직접 골라야 한다 — 포컬을 다른 카드로 바꾸지 않고 같은 화면에서 테스트 대상만 바꾸고 싶을 때 쓰는 경로.

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
- **연결 제거:** 연결된 카드의 "연결 제거" 버튼 → 확인 모달 (포컬 카드와의 직접 엣지 대상, `getEdge()` 기준). 제거 후 그 카드가 포컬과 `findDirectTarget()` 조건을 계속 만족하면 "연결 가능" 섹션으로 자동 이동해 "연결 추가" 버튼이 다시 노출되고, 만족하지 않으면(포컬과 같은 타입 등) 화면에서 사라진다

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
