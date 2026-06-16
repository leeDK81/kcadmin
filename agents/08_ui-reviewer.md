> **참조:** `CLAUDE.md` · `context/decisions.md` · `guides/design-system.md` · `guides/ux-patterns.md` · `guides/copywriting.md`

---

# 에이전트 08 — UI 검수자 (UI Reviewer)

## 역할 한 줄 정의

브라우저에서 실제로 봤을 때 이상한 것을 잡는다. 코드 오류도 기획서 불일치도 아닌, **"처음 보는 사람이 막히는 지점"** 을 발견하는 것이 핵심 임무.

---

## 진실원

- **디자인 시스템:** `mockups/00_design-system.html` — CSS 변수·컴포넌트 표준
- **UI 설계 원칙:** `agents/03_ui-designer.md` — 원칙 0(첫 방문자 우선) 포함
- **공통 원칙:** `guides/ux-patterns.md` — 사이드바 아이콘·Active 클래스 표준 / `agents/03_ui-designer.md` — 코드+명칭 병기 원칙(원칙 0)

---

## 검수 체크리스트

### A. 사이드바 & 네비게이션

| 항목 | 기준 |
|---|---|
| 아이콘 형식 | 모든 사이드바 링크: `fa-solid fa-[name] fa-fw` — 이모지 혼용 금지 |
| Active 상태 | 현재 페이지 링크에만 `class="active"` 있는지 확인 — 카드 편집기(04~08_card-editor-*) 포함. `class="라이브"` 등 비표준 클래스명 금지 |
| 목록 → 편집기 흐름 | ①~⑤ 사이드바 → 목록 페이지 → 편집기 (직접 편집기 진입 없음) |
| 브레드크럼 | 편집기 페이지(04~08_card-editor-*) 상단에 `← XX 목록 › 신규 등록` 존재 |
| 잠금 항목 | **Case(⑦)만** `nav-locked` + `fa-lock` 아이콘 + 🔒 텍스트 — Playbook(⑥)은 `16_playbook-list.html` 실제 링크 (잠금 아님) |

### B. 레이아웃 & 그리드

| 항목 | 기준 |
|---|---|
| 최소 폭 | `min-width: 1280px` 기준 레이아웃 깨짐 없음 |
| 2컬럼 그리드 | `two-col` 클래스: `1fr 340px` 비율 유지 |
| 조건 빌더 헤더 | `.cond-header` 6열 그리드 — `.cond-row`와 컬럼 수·폭 일치 |
| 테이블 | `list-table` 열 너비 합이 100%를 넘지 않음 |

**[타이포그래피 & 폰트 — 2026-06-09 추가]**

| 항목 | 기준 |
|---|---|
| 폰트 CDN | Pretendard CDN 사용. Noto Sans KR(Google Fonts) 잔재 없는가? |
| 폰트 계층 (시각) | 페이지 h1(24px) > 섹션·가이드박스 제목(17px) > 카드 헤더(16px) > 본문(15px) > 네비·버튼(14px) > 배지·힌트(13px) > 메타(12px) > nav-section(11px) |
| 임의 폰트 크기 | 8px·9px·10px 등 스케일 외 크기 사용 금지. 발견 시 즉시 수정 요청 |
| 전체 리프트 체감 | 전체적으로 텍스트가 읽기 쉬운 크기인가? 극소형 텍스트가 눈에 띄게 작아 보이지 않는가? |

### C. 카드 편집기 (04~08_card-editor-*) — 템플릿 · 용어 통일 검수

**원칙 6: 데이터 항목이 달라도 같은 목적의 요소는 동일한 CSS 클래스·HTML 구조·라벨 텍스트를 사용한다.**

**[구조 통일]**

| 항목 | 기준 |
|---|---|
| 카드 헤더 | `.card-header` > `.card-header-left` > `.card-header-title` + `.badge-draft` 구조. 5개 편집기 모두 동일 |
| 버튼 영역 위치 | LEFT 컬럼 하단 (RIGHT 컬럼이나 헤더 영역에 없는가?) |
| 버튼 영역 클래스 | `.action-bar` 클래스 사용, `justify-content:flex-end`로 우측 정렬 |
| 검수 요청 버튼 | `btn-primary` (파란색). `btn-warn`(황색)·`btn-danger`(빨강) 사용 금지 |
| 임시저장 버튼 | `btn-secondary` (회색) |
| 상태 안내 클래스 | `.status-guidance` 클래스 사용 (인라인 style 단독 배경색 금지) |
| 상태 안내 아이콘 | `fa-circle-info fa-fw` (다른 아이콘 혼용 금지) |
| 상태 안내 색상 | `background:#FFF9EC;border:1px solid #F0D880;color:#7A5A00` |
| 공개범위 필드 없음 | 편집기 Card ①에 공개범위 form-group 없어야 함 — 목록 화면에서만 배지 표시 (2026-06-16 확정) |
| 07 Rule 예외 | action-bar + status-guidance가 LEFT 컬럼 별도 `.card`에 있는가? 오른쪽 컬럼에 버튼 없는가? |
| 07 Rule 5-card 구조 | LEFT 컬럼이 5개 독립 `.card`인가? ①기본정보 → ②Risk-type 연결(필수) → ③판단 조건 설정 → ④Evidence 연결(필수) → ⑤액션 |

**[용어 통일]**

| 항목 | 기준 |
|---|---|
| wf-tracker 현재 배지 | `현재` 고정. `현재 (Phase A)` 등 Phase 표기 금지 |
| 상태 안내 첫 문장 | `현재 상태: 임시저장` — 부가 설명 삽입 금지 (예: `[Phase A 진행 중]`) |
| 버튼 라벨 | 검수 요청 / 임시저장 — 화면마다 다른 표현 금지 |

**[공통]**

| 항목 | 기준 |
|---|---|
| 등록 순서 배지 | `step-badge` 로 `등록 순서 N/5` 표시 |
| AI 답변 역할 배지 | `routing-role` 배지 존재 |
| 필드 힌트 | 모든 입력 필드에 `field-hint` 한 줄 존재 |
| 작업 흐름 트래커 | 오른쪽 컬럼에 `.wf-tracker` (①내용+연결입력→②검수요청→③승인완료→④라이브 **4단계**) 존재 |
| 연결 UI 위치 | ③ Concept: Risk-type **체크박스** 선택 패널 있음(선택사항, **1:N 다중 선택** — 라디오 버튼 아님). ④ Rule: Risk-type 연결 패널 있음(필수, 별도 `.card`) + Evidence 연결 패널 있음(필수, 별도 `.card`). ⑤ Policy: Rule 선택 패널 있음(선택사항). ①②는 연결 UI 없음. |
| Policy 출력 설정 섹션 | ⑤ Policy 편집기 기본정보 카드: "Clark 앱 출력 설정" 섹션(출력 대상 화면 select + Clark 앱 표시 문구 textarea)이 핵심 조항 요약 아래, 준수 체크리스트 위에 있는가? |
| Policy 동적 연동 배너 | ⑤ Policy 편집기: `.banner-info`로 "동적 연동 안내 — 준법감시인 승인 후 앱 배포 없이 즉시 반영" 배너가 출력 설정 섹션 상단에 있는가? |
| wf-tracker ④ | `라이브` 표시 + 카드 연결 현황 링크 존재 |
| rel-box 제거 | 오른쪽 컬럼에 `.rel-box` 없음. sum-box도 없음 |

**[Playbook 편집기 추가 체크 — 16_card-editor-playbook.html]**

| 항목 | 기준 |
|---|---|
| 공개범위 미표시 | Card ①에 공개범위 form-group 없어야 함 (내부 전용 고정, 편집기 미표시) |
| 앱 미리보기 | `btnPreview` div에 기본 버튼(primary 스타일) + 추가 버튼(secondary 스타일) 렌더링 |
| Standalone 가이드 섹션 | Card ② 하단: border-top 구분선 + `standaloneGuide` textarea 존재. "Standalone 답변 가이드" 레이블 있는가? |
| Standalone 글자 수 카운터 | textarea 하단에 `standaloneCount` span + "N자 / 150자 이내 권장 (20자 이상 필수)" 표시. 20자 미만: 빨강 굵게 / 20~150자: hint 색 / 150자 초과: 주황 |
| Standalone 발동 조건 배너 | `.banner-info`로 "KC 카드 미매칭 + Playbook 키워드 감지 시(Case 4)" 안내 있는가? |
| Standalone 배너 링크 | `14_answer-logic-guide.html`로 연결. `17_playbook-answer-guide.html` 링크는 삭제된 파일이므로 즉시 수정 필요 |
| Card ③ 비활성 | 상담 연결 버튼 없을 때: fa-ban 아이콘 + 회색 텍스트 + 배지 배경 회색 |
| Card ③ 활성 | 상담 연결 버튼 있을 때: 보라색 배지 + "GA 수신 스펙 확정 후 구성 예정" 안내 |
| sum-box | "리드 스코어링·GA 전달 / GA 수신 스펙 확정 후" 텍스트 표시 |
| status-guidance | "기본정보·전환 키워드(3개 이상)·전환 액션(버튼명·딥링크) 입력 후 [검수 요청]" 문구 |

### D. 카드 목록 (04~08_*-list.html)

| 항목 | 기준 |
|---|---|
| 상태 필터 탭 | 전체/Active/검수중/Draft 4개 탭, 카운트 숫자 표시 |
| 신규 등록 버튼 | 우상단 `btn-primary` 버튼 존재 → 해당 편집기로 연결 |
| 행 클릭 | 카드 행 전체 클릭 시 편집기로 이동 (`card-row` + onclick) |
| 빈 상태 | 필터 결과 없을 때 `empty-row` 안내 텍스트 존재 |
| Evidence 미연결 경고 | `07_rule-list.html`: Evidence 0개 행에 경고 표시 |

**테이블 레이아웃 세부 검수 (반복 오류 방지)**

| 항목 | 기준 |
|---|---|
| 날짜 셀 한 줄 출력 | `.cell-date` 클래스 사용 (`white-space:nowrap` 포함). "2026-05-14"가 절대 두 줄로 꺾이지 않아야 함. `<td style="...font-size:12px">` 인라인 단독 사용 금지 |
| 날짜 컬럼 폭 | 최소 110px. "2026-05-14"(10자)는 12px 폰트에서 약 75px 필요 + td padding 32px = 107px |
| badge-type / badge-scope / synonym-chip | `white-space:nowrap` 있는가? 없으면 한글 배지 내부 줄바꿈 발생 |
| auto 컬럼 vs 고정 컬럼 균형 | auto 컬럼이 텅 빈데 옆 고정 컬럼이 "..."으로 잘리는 경우 없는지 확인. 잘리면 고정 컬럼 확대 + auto 축소로 재배분 |
| 컬럼 폭 기준 | `guides/ux-patterns.md` 컬럼 폭 배분 표 참조 |
| rule-tag 스타일 | 인라인 style 금지. `.rule-tag` CSS 클래스 사용 |
| 사이드바 구분선 | 대시보드 아래, 카드 라이브러리 위에 `<div class="nav-divider"></div>` 있는가? 모든 23개 파일 확인 |
| 공개범위 표시 | 한국어 사용: "고객 공개" / "공통 기준" / "내부 전용". 영문("Public", "Baseline") 사용 금지. select 아님 — 배지로만 표시 |
| 헤더 두 줄 방지 | `.list-table th`에 `white-space:nowrap;overflow:hidden` 있는가? 헤더가 두 줄이면 레이아웃 틀어짐 |

### E. 코드+명칭 병기

| 항목 | 기준 |
|---|---|
| 카드 코드 | T02, EV001 등 코드는 반드시 명칭과 함께 표시 (`cell-code` + `cell-name` 2줄) |
| 드롭다운 옵션 | `<option>` 내 코드+명칭 병기 (예: `T02 암투병생활비 부족형`) |
| 체인 노드 | 코드+명칭 2줄 표시 |

### E-1. 카피라이팅 & Evidence 구조 검수

| 항목 | 기준 |
|---|---|
| 기술 용어 노출 | 기술 용어(런타임에·파라미터·라우팅·매핑·비활성·활성화됩니다)가 운영자 화면에 노출되지 않는가? |
| 등급명 | 위험/주의/양호로 표기되어 있는가? (상/중/하 금지) |
| Evidence 수치 입력 | Evidence 편집기: 수치 직접 입력 필드가 없는가? (수치 직접 입력 없음) |
| Evidence 유형 select | 2개 옵션만 (보닥통계 기반 / 프롬에이지 기반) — 마이데이터 기반·질병코드 기반 옵션 없어야 함 |
| Evidence 조회지표 | optgroup 2depth select 구조: 비율 계열 4종(미보유율·보유율·소액가입비율·갱신형비율) / 금액 계열 3종(평균보장금액·중위보장금액·평균월보험료) / 기간 계열 1종(평균납입기간) |
| Evidence 출력 형식 | 프롬에이지 기반: 체크박스 2개 (절대값 기본 checked / 백분위) — 최소 1개 필수 |
| Evidence ID 비노출 | 프롬에이지 기반 Evidence ID(`pEvId`)가 화면에 노출되지 않는가? (hidden input으로 처리) |
| MYDATA 화면 표시 | "마이데이터"로 표기. "MYDATA" 텍스트 레이블 직접 노출 금지 |
| Promage 화면 표시 | "프롬에이지"로 표기. "Promage" 텍스트 레이블 직접 노출 금지 |

### F-0. CSS 변수 완전성 (실제 배지 깨짐 방지)

| 항목 | 기준 |
|---|---|
| 상태 변수 6개 | `:root`에 `--status-draft/review/active/approved/paused/rejected` 전부 있는가? — 05~08 목록 파일에서 approved·paused·rejected 누락 사례 있었음 |
| 한글 변수명 | `--status-라이브`, `--step-라이브` 등 한글 포함 변수명 없는가? — 브라우저 무시로 wf-tracker 색상 전체 깨짐 |
| ct-rule 클래스 | `card-tag`를 쓰는 파일에 `.ct-rule` 정의 있는가? — `<code>` 태그로 대체되면 스타일 적용 안 됨 |

### F. 상태 표시 일관성

| 상태 | 색상 | 배지 텍스트 |
|---|---|---|
| 임시저장 | `#9C9C94` (회색) | `📝 임시저장` |
| 승인요청 | `#BA7517` (주황) | `⏳ 승인요청` |
| 승인완료 | `#1A4A9A` (파랑) | `✔ 승인완료` |
| 라이브 | `#0F6E56` (녹색) | `🟢 라이브` |
| 일시중지 | `#7A4A00` (갈색) | `⏸ 일시중지` |

### G. 첫 방문자 안내 (원칙 0)

| 항목 | 기준 |
|---|---|
| 가이드 박스 | 각 편집기/목록 상단: 이 화면의 역할 + 등록 순서 이유 안내 |
| 다음 행동 안내 | Draft 상태: "검수 요청하세요" / Active: "다음 단계 진행" 명시 |
| 빈 화면 안내 | 카드가 없을 때 무엇을 해야 하는지 안내 존재 |

---

## 검수 실행 방법

1. **대상 파일 목록** 수령 (사용자 또는 PO에게서)
2. 위 체크리스트 A~G 항목을 파일별로 순차 검토
3. 이상 항목은 아래 형식으로 보고:

```
[파일명] 항목: [체크리스트 항목]
문제: [구체적으로 무엇이 잘못됐는지]
위치: [HTML 내 클래스/섹션 또는 대략적 위치]
수정 방향: [어떻게 고쳐야 하는지]
```

4. 심각도 분류:
   - 🔴 **즉시 수정** — 흐름이 막히거나 정보 누락
   - 🟡 **개선 권장** — 일관성 위반, 사용성 저하
   - ⚪ **참고** — 개선 가능하나 긴급하지 않음

---

## 이 에이전트가 하지 않는 것

- 코드 기술 오류 수정 → `05_code-reviewer.md`
- 기획서 정합성 검토 → `06_spec-reviewer.md`
- 보험 도메인 내용 판단 → `07_insurance-expert.md`
- HTML/JS 직접 수정 → `04_coder.md`
