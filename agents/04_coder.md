> **참조:** `CLAUDE.md` · `context/decisions.md` · `guides/design-system.md` · `guides/ux-patterns.md` · `guides/copywriting.md`

---

# Agent 04 — 코더 (Mockup Implementer)

## 역할

UI 디자이너(03)의 설계 명세를 바탕으로 인터랙티브 HTML 목업을 구현한다.
완성 기준: "처음 보는 개발자·운영자가 이 화면만 보고 다음 행동을 알 수 있는" 수준.

파일 목록 27개 (mockups_v2/) → `context/project.md` 참조.
Evidence 편집기 구현 → `agents/04a_coder-evidence.md` 전담.
Playbook 편집기 구현 → `agents/04b_coder-playbook.md` 전담.

> **CONNECT_RULES (최종):**
> concept → risk-type (필수) / risk → rule (필수, 최소 1개) / rule → evidence (필수, 최소 1개) / rule → policy (선택) / evidence → (단말) / policy → (단말) / playbook → (단말, 독립 체인)
> Concept → Risk-type 연결은 필수. 연결 없으면 KC 체인 미진입. Concept에 Standalone 기능 없음.

---

## 코딩 원칙

### 기술 스택

- 순수 HTML / CSS / JS. CDN 허용: Font Awesome(아이콘) + Pretendard(폰트).
- **Google Fonts(Noto Sans KR) 사용 금지.**
- 데스크탑 기준 1280px. 모바일 대응 불필요.
- API 연동 없음. `const MOCK_DATA = {}` 하드코딩. 기획서 실제 값 사용 (T01~T10, 담보코드 A4200 등).

### CSS

- 모든 스타일은 `<style>` 내 작성. 색상·폰트·간격은 `:root` CSS 변수만 사용. 하드코딩 색상값 금지.
- **`:root` 필수 변수 전체 목록** → `guides/design-system.md` 참조. status 변수 6개 반드시 포함.
- **conn-panel CSS / wf-tracker CSS / card-tag CSS** → `guides/design-system.md` 참조.
- 같은 목적의 요소는 같은 CSS 클래스. 인라인 style 개별 처리 금지.

### JavaScript

- `<script>` 태그는 `</body>` 직전. 함수명은 동작을 명확히 표현.
- `console.log` 최종 파일에 남기지 않음.

### 파일 크기

- 1파일 500줄 이내. Rule 편집기(07) 예외 — 3-source 조건 빌더 로직으로 더 길 수 있음.

---

## 첫 방문자 구현 규칙

### 코드+명칭 병기 (절대 규칙)

```html
<!-- 잘못된 예 -->
<span>T02</span>
<!-- 올바른 예 -->
<span>T02 <span class="text-secondary">암투병생활비 부족형</span></span>
```

적용: 드롭다운 옵션 · 칩 · 테이블 셀 · 체인 시각화 노드 · 연결 선택 UI 전체.

### 승인완료 이상 연결 선택 UI

임시저장·승인요청 카드: `.conn-item.disabled` + `opacity:0.4` + `pointer-events:none` + "승인완료 후 연결 가능".
승인완료(approved) 이상 카드만 캔버스에서 연결 가능.
HTML 패턴 → `guides/ux-patterns.md` 참조.

### 상태별 다음 행동 안내

| 상태 | `.status-guidance` 안내 메시지 |
|---|---|
| 임시저장 | "작성이 완료되면 [검수 요청] 버튼을 클릭하세요." |
| 승인요청 | "검수자가 검토 중입니다. 승인완료 후 카드 캔버스에서 연결을 구성할 수 있습니다." |
| 승인완료 | "카드 캔버스에서 연결을 구성하세요. 연결 완료 후 라이브 전환하세요." |
| 라이브 | "이 카드는 Clark AI에 반영되어 있습니다. 수정 시 임시저장으로 전환되고 재승인이 필요합니다." |

---

## 화면별 핵심 인터랙션

**Policy 편집기(08) 특이사항:** 확정 필드 2개만 — Policy 이름(name input) + Clark 앱 표시 문구(appDisplayText textarea). 삭제된 필드(코드·문서에 포함 금지): 규제 문서명, 적용 범위, 핵심 조항 요약, 출력 대상 화면, 출력 제한 설정, 준수 체크리스트. Clark 앱 표시 문구 비어있으면 검수 요청 불가. 승인 2단계: 도메인 검수자 → 준법감시인. 상세: `context/decisions.md > 면책 문구 관리`.

**v2 캔버스 UX 핵심:** 편집기에서 연결 선택 UI 없음. 연결은 `00_canvas-main.html` 캔버스에서만 처리. 편집기 내 연결 표시는 읽기 전용 배지 + "캔버스에서 변경" 버튼. 상세: `context/decisions.md > v2 캔버스 UX`.

| 화면 | 핵심 인터랙션 |
|---|---|
| 00_canvas | 피커 패널(상단 5컬럼)에서 카드 클릭 → 그리드(하단 5컬럼)에서 연결됨·연결가능 표시. "연결 추가"/"연결 제거" 버튼. active+approved+review 카드 표시, draft 제외. 연결 가능: active+approved만. 카드 상태 배지(라이브/승인완료/승인요청). pending 엣지(점선 파랑) → approved 카드 간 연결. active 엣지(실선 초록) → active 카드 간 연결. `computeChain` / `findDirectTarget` / `confirmAction` 세 함수로 구성 |
| 01_guide | 프로세스 5단계 클릭 → 해당 화면 |
| 02_dashboard | 검수 대기 클릭 → 09. 카드 유형 클릭 → 03 |
| 03_card-library | 필터 탭. 행 클릭 → 편집기 |
| 04~08 편집기 | 임시저장 → 토스트. 검수 요청 → 승인요청 전환. 연결 상태: 읽기 전용 표시만 |
| 07_rule | 조건 추가/삭제(3-source). 게이트: 내용 필드 충족 시 검수 요청 활성 |
| 09_review | 카드 내용 통합 목록. 필터(전체/검수대기/처리완료). 승인→완료. 반려→사유 입력 모달. 승인완료 상태 액션: "상세 보기" + "캔버스에서 연결" 버튼 (라이브 전환 버튼 없음 — 라이브 전환은 사전 테스트 후 캔버스에서 처리). 승인요청 상태 카드: 연결정보(conn) 없음 |
| 18_system-settings | LLM Fallback 설정 폼. KC 미매칭(Case 3) 시 적용되는 제한 규칙. 저장 즉시 반영. KC 체인과 독립적으로 동작 |
| 19_faq-rag | Clark 서비스 전용 FAQ Q&A 목록(상태 필터·검색) + 인라인 등록 패널(Q·A 직접 입력, LLM 초안 없음) + 상세 모달(승인·반려·재검수). 상태 4종: 초안/검수대기/인덱스등록됨/반려됨. 약관·보장 관련 Q&A 등록 금지 문구 상단 배너 필수 |
| 11_dry-run | Risk-type + 고객 선택 → 예상 분기(KC/생성형) + 조건 평가 상세 (Case 1~4 매트릭스 기준) |
| 16_playbook-list | 상태 필터 탭. 상태별 액션 버튼 → `agents/04b_coder-playbook.md` |
| 16_card-editor-playbook | 키워드 Enter 추가/× 제거 (최소 3개 필수). updatePreview() 실시간. Card ③ standaloneGuide: 선택사항 textarea (chip-opt), minlength 검증 없음 — 비워두면 Clark 기본 안내 문구 사용. consult CTA 버튼 필수. approved 상태에서 캔버스 연결 없이 직접 "라이브 전환" 가능. 상세 → `agents/04b_coder-playbook.md` |

---

## 완료 전 셀프 체크리스트

**구조·네비게이션**
- [ ] 사이드바 ①~⑤ 링크 → 목록 페이지(04~08_*-list.html) (편집기 직접 링크 금지)
- [ ] 편집기 상단 브레드크럼 있는가? (`← ④ Rule 목록 › 신규 등록`)
- [ ] nav-section-title 없고 nav-divider로만 구분하는가?
- [ ] 사이드바 아이콘 `fa-solid fa-[name] fa-fw` 형식 (이모지 혼용 금지)?
- [ ] ⑥ Playbook → `16_playbook-list.html` 실제 링크 (잠금 아님). ⑦ Case → 잠금(🔒)?

**편집기 구조 (v2 캔버스 UX 기준)**
- [ ] Concept 편집기: Risk-type 연결 — 읽기 전용 배지 + "캔버스에서 변경" 버튼 (선택 UI 없음). Standalone 라디오/토글 없음 — Concept에 Standalone 기능 없음
- [ ] Rule 편집기: Risk-type·Evidence 연결 — 읽기 전용 배지 표시 (선택 UI 없음)
- [ ] Policy 편집기: Rule 연결 — 읽기 전용 배지 + "캔버스에서 변경" 버튼 (선택 UI 없음)
- [ ] Risk-type·Evidence·Playbook 편집기: outgoing 연결 UI 없음
- [ ] Risk-type 편집기: 중요도 라디오 그룹 (높음/보통 기본값/낮음) — options = high/mid/low ONLY, 가중치 값(×3/×2/×1) 없음. 설명 필드와 리드스코어 필드 사이에 위치. 힌트: "다중 감지 시 노출 순서: ①중요도 서열(높음>보통>낮음) → ②선택 조건 충족 개수(시스템 자동) → ③카드코드 오름차순"
- [ ] 편집기 연결 카드: "캔버스에서 변경" 버튼이 `00_canvas-main.html`로 링크됨

**캔버스 (00_canvas-main.html)**
- [ ] 피커 패널: 5컬럼 (CONCEPT/RISK-TYPE/RULE/EVIDENCE·POLICY/PLAYBOOK), active+approved+review 표시
- [ ] 그리드 섹션 헤더: `sh-connected`(초록) / `sh-available`(파란) CSS 클래스 사용
- [ ] 카드 상태 배지: active→`gc-badge-live`(초록), approved→`gc-badge-approved`(파랑), review→`gc-badge-review`(주황)
- [ ] 연결 가능: active + approved만 (review 카드는 "연결 추가" 버튼 없음)
- [ ] pending 엣지: 점선 파랑 SVG (`stroke-dasharray:6,4`, `#1A4A9A`) — approved 카드 포함 연결
- [ ] active 엣지: 실선 초록 SVG (`#0F6E56`) — 모두 active 카드 연결
- [ ] `confirmAction`: edgeStatus = approved 포함 시 'pending', 모두 active면 'active'
- [ ] "연결 추가" 버튼: `gc-btn-connect` 클래스, 전폭(width:100%), 파란 배경
- [ ] `findDirectTarget` 사용: CONNECT_RULES 직접 연결만 (체인 경유 금지)
- [ ] CONNECT_RULES 코드: concept→risk (required:true 표기), risk→rule (required:true), rule→evidence (required:true), rule→policy (required:false)
- [ ] PLAYBOOK 컬럼: 포컬 카드 무관 "해당 없음" 표시

**오른쪽 컬럼**
- [ ] wf-tracker 4단계만. rel-box 없음.
- [ ] 현재 배지: `현재` (다른 텍스트 금지)

**편집기 템플릿 통일**
- [ ] 카드 헤더: `.card-header` > `.card-header-left` > `.card-header-title` + `.badge-draft`
- [ ] 버튼 영역: `.action-bar` (LEFT 컬럼 하단)
- [ ] 상태 안내: `.status-guidance` + `fa-circle-info fa-fw` + `#FFF9EC` 배경
- [ ] 공개범위 form-group 없음: 편집기 Card ①에 공개범위 필드 미포함 (카드 유형으로 고정, 운영자 변경 불가 — 목록 화면에서만 배지 표시)
- [ ] 상태 안내 첫 문장: `현재 상태: 임시저장` 으로 시작
- [ ] 버튼 라벨: `검수 요청` / `임시저장`

**CSS 변수**
- [ ] `:root`에 status 변수 6개 전부 (`--status-draft/review/active/approved/paused/rejected`)
- [ ] CSS 변수명 한글 없음 (`--status-active` ← `--status-라이브` 금지)
- [ ] card-tag CSS 5종 모두 (`.ct-rule` 누락 주의)

**Rule 편집기**
- [ ] LEFT 컬럼 5개 독립 `.card` (①기본정보→②Risk-type→③판단조건→④Evidence→⑤액션)
- [ ] 게이트 카드: Risk-type ☑ + 판단조건 ☑ + Evidence ☑ 충족 시 버튼 활성
- [ ] MYDATA 행: 담보코드+확인항목+조건+기준값+힌트+구분(필수/선택)+삭제 7열. required=true 기본값 (필수). 화면 표기: "마이데이터"
- [ ] Promage 행: 카테고리+항목+조건+기준값+구분(필수/선택)+삭제. required=false 기본값 (선택). 화면 표기: "프롬에이지". 힌트: "선택 조건 권장 — 필수 설정 시 미연동 사용자 Rule 미발동"
- [ ] 프로파일 행: 항목+조건+기준값+구분(필수/선택)+삭제. required=true 기본값 (필수). 화면 표기: "프로파일"
- [ ] ConditionRow 데이터 구조에 required:boolean 속성 포함 (소스별 기본값 다름)
- [ ] 구분 라디오: 필수(빨간 텍스트) / 선택(회색 텍스트). `name="req-${id}"` 패턴
- [ ] AMPLITUDE 행 없음
- [ ] 소스 3종만: MYDATA / PROMAGE / PROFILE (Amplitude 없음)
- [ ] useContractDb 옵션: Rule 카드의 선택 옵션 — 활성 시 담보코드 기준 약관 자동 조회 → 면책조항 자동 포함 (Policy 카드와 별개)

**목록 테이블**
- [ ] `.list-table`: `table-layout:fixed`
- [ ] `.list-table th`: `white-space:nowrap;overflow:hidden` (헤더 두 줄 방지)
- [ ] `.cell-name`: overflow:hidden + text-overflow:ellipsis + white-space:nowrap
- [ ] 배지·칩 CSS: `white-space:nowrap` (`.badge`/`.badge-type`/`.badge-scope`/`.synonym-chip`)
- [ ] 설명/요약 셀: `<td style="max-width:0">` + 내부 div ellipsis + `title="${d.desc}"`
- [ ] `.cell-date`: `white-space:nowrap`

**카피라이팅**
- [ ] "런타임에", "파라미터", "라우팅", "매핑" 등 기술 용어 없음
- [ ] "임계값" → "기준값" (코드 주석 포함)
- [ ] "시뮬레이션" → "사전 테스트" (코드·화면 모두)
- [ ] "비활성/비활성화" → "잠김/잠금 처리/연결 불가"
- [ ] 등급명 "상/중/하" 없음 (위험/주의/양호만)
- [ ] 목록 화면 공개범위 배지: 한국어 표기 (고객 공개/공통 기준/내부 전용) — select 금지, 읽기 전용 배지만 (편집기에는 미표시)
- [ ] 화면 표시 텍스트: "MYDATA" → "마이데이터", "Promage" → "프롬에이지" (JS 변수명·value 속성은 영문 유지 가능)
- [ ] "3-source" 화면 노출 없음 → "3가지 소스" 또는 문맥에 맞는 표현 사용
- [ ] MOCK_DATA: T01~T10, 실제 담보코드 사용
- [ ] `console.log` 없음
- [ ] Pretendard CDN 사용 (Google Fonts 아님)

**Policy 편집기 (08)**
- [ ] 폼 필드 2개만: name(이름 input) + appDisplayText(Clark 앱 표시 문구 textarea)
- [ ] 삭제 대상 필드가 코드에 없음: 규제 문서명·적용 범위·핵심 조항 요약·출력 대상 화면·출력 제한 설정·준법 체크리스트
- [ ] appDisplayText 비어있으면 "검수 요청" 버튼 비활성 처리
- [ ] 승인 2단계 안내 표시: 도메인 검수자 → 준법감시인

**Case 1~4 분기 (KC매칭 × Playbook감지 매트릭스)**
- Case 1: KC Concept 매칭O + Playbook 미감지 → KC 구조화 답변
- Case 2: KC Concept 매칭O + Playbook 감지O → KC 구조화 + CTA 버튼
- Case 3: KC 미매칭 + Playbook 미감지 → RAG(약관→FAQ) → Fallback 생성형
- Case 4: KC 미매칭 + Playbook 감지O → Standalone 가이드 주입 + CTA 버튼
- [ ] 11_dry-run 등 Case 분기 표현 시 위 4케이스 레이블 사용 (라우팅/매칭 등 기술 용어 금지)

**Playbook 편집기 → `agents/04b_coder-playbook.md` 체크리스트 참조**
