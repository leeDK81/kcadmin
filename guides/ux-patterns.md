# KC Admin UX 패턴 가이드

> HTML 컴포넌트 패턴·CSS 클래스 레퍼런스. 신규 화면 구현 전 먼저 확인.

## CSS 클래스 레퍼런스

### 배지 (Badge)

```css
.badge-draft    /* 📝 임시저장 — 회색 */
.badge-review   /* ⏳ 승인요청 — 주황 */
.badge-active   /* 🟢 라이브 — 초록 */
.badge-approved /* ✔ 승인완료 — 파랑 */
.badge-paused   /* ⏸ 일시중지 — 갈색 */
.badge-rejected /* 반려 — 빨강 */

.badge-risk     /* Risk-type 카드 배지 — 주황빨강 */
.badge-evidence /* Evidence 카드 배지 — 초록 */
.badge-concept  /* Concept 카드 배지 — 파랑 */
.badge-rule     /* Rule 카드 배지 — 다크레드 */
.badge-policy   /* Policy 카드 배지 — 회색 */

.badge-public   /* 고객 공개 — 파랑 (Risk-type, Concept) — 목록 화면 전용, 편집기 미표시 */
.badge-baseline /* 공통 기준 — 주황 (Rule) — 목록 화면 전용, 편집기 미표시 */
.badge-internal /* 내부 전용 — 회색 (Evidence, Policy, Playbook) — 목록 화면 전용, 편집기 미표시 */
```

### 버튼 (Button)

```css
.btn-primary   /* 주 액션 — 네이비 */
.btn-secondary /* 보조 액션 — 흰색 테두리 */
.btn-danger    /* 위험 액션 — 빨강 */
.btn-success   /* 완료 액션 — 초록 */
.btn-warn      /* 경고 액션 — 주황 */
.btn-sm        /* 소형 버튼 (5px 10px) */
```

### 배너 (Banner)

```css
.banner-info    /* 파란 안내 박스 */
.banner-warn    /* 노란 경고 박스 */
.banner-error   /* 빨간 오류 박스 */
.banner-success /* 초록 성공 박스 */
```

### 카드 태그 (Card Tag — AIO/참조 페이지용)

```css
.ct-risk     /* Risk-type */
.ct-evidence /* Evidence */
.ct-concept  /* Concept */
.ct-rule     /* Rule */
.ct-policy   /* Policy */
```

## HTML 컴포넌트 패턴

### 사이드바 (전 파일 공통)

```html
<nav class="sidebar">
  <div class="sidebar-logo">KC Admin</div>
  <a href="01_guide.html"><i class="fa-solid fa-clipboard-list fa-fw"></i> 업무 가이드</a>
  <a href="02_dashboard.html"><i class="fa-solid fa-chart-bar fa-fw"></i> 대시보드</a>
  <div class="nav-divider"></div>
  <a href="03_card-library.html"><i class="fa-solid fa-folder-open fa-fw"></i> 카드 라이브러리</a>
  <a href="04_risk-type-list.html" style="padding-left:20px"><i class="fa-solid fa-circle-exclamation fa-fw"></i> ① Risk-type</a>
  <a href="05_evidence-list.html" style="padding-left:20px"><i class="fa-solid fa-database fa-fw"></i> ② Evidence</a>
  <a href="06_concept-list.html" style="padding-left:20px"><i class="fa-solid fa-lightbulb fa-fw"></i> ③ Concept</a>
  <a href="07_rule-list.html" style="padding-left:20px"><i class="fa-solid fa-scale-balanced fa-fw"></i> ④ Rule</a>
  <a href="08_policy-list.html" style="padding-left:20px"><i class="fa-solid fa-file-shield fa-fw"></i> ⑤ Policy</a>
  <a href="16_playbook-list.html" style="padding-left:20px"><i class="fa-solid fa-bullseye fa-fw"></i> ⑥ Playbook</a>
  <span class="nav-locked" style="padding-left:20px"><i class="fa-solid fa-lock fa-fw"></i> ⑦ Case 🔒</span>
  <div class="nav-divider"></div>
  <a href="10_chain-visualizer.html"><i class="fa-solid fa-diagram-project fa-fw"></i> 카드 연결 현황</a>
  <div class="nav-divider"></div>
  <a href="09_review-workflow.html"><i class="fa-solid fa-check-double fa-fw"></i> 검수·승인</a>
  <a href="11_dry-run.html"><i class="fa-solid fa-flask fa-fw"></i> 사전 테스트</a>
  <div class="nav-divider"></div>
  <a href="00_design-system.html"><i class="fa-solid fa-palette fa-fw"></i> 디자인 시스템</a>
  <a href="13_answer-logic.html"><i class="fa-solid fa-sitemap fa-fw"></i> AI 답변 생성 로직</a>
  <a href="14_answer-logic-guide.html"><i class="fa-solid fa-book-open fa-fw"></i> AI 답변 생성 예시</a>
  <a href="15_aio-guide.html"><i class="fa-solid fa-magnifying-glass fa-fw"></i> AIO 가이드</a>
  <a href="12_coverage-code-table.html"><i class="fa-solid fa-table-list fa-fw"></i> 담보코드</a>
</nav>
```

### 카드 편집기 뼈대 (2/3/5-card 구조)

```html
<!-- LEFT 컬럼: 편집 폼 -->
<div>
  <!-- Card ①: 기본정보 -->
  <div class="card">
    <div class="card-header">
      <div class="card-header-left">
        <span class="card-header-title">새 {카드유형} 카드</span>
        <span class="badge badge-draft">임시저장</span>
      </div>
    </div>
    <!-- 폼 필드들 -->
  </div>

  <!-- Card ②: 연결 패널 (해당 카드에만) -->
  <!-- Card N: 액션 -->
  <div class="card">
    <div class="action-bar">
      <button class="btn btn-secondary" onclick="saveDraft()">
        <i class="fa-regular fa-floppy-disk"></i> 임시저장
      </button>
      <button class="btn btn-primary" onclick="requestReview()">
        <i class="fa-solid fa-paper-plane"></i> 검수 요청
      </button>
    </div>
    <div class="status-guidance">
      <i class="fa-solid fa-circle-info fa-fw"></i>
      <span><strong>현재 상태: 임시저장</strong> — 작성이 완료되면 [검수 요청] 버튼을 클릭하세요.</span>
    </div>
  </div>
</div>

<!-- RIGHT 컬럼: wf-tracker -->
<div>
  <div class="wf-tracker">
    <div class="wf-title">이 카드의 작업 흐름</div>
    <div class="wf-step">
      <div class="wf-num wf-num-on">①</div>
      <div class="wf-body">
        <div class="wf-label wf-label-on">내용 입력 <span class="wf-tag">현재</span></div>
        <div class="wf-hint">내용과 연결 카드를 입력하세요</div>
      </div>
    </div>
    <div class="wf-step">
      <div class="wf-num wf-num-off">②</div>
      <div class="wf-body">
        <div class="wf-label wf-label-off">검수 요청</div>
        <div class="wf-hint">[검수 요청] 클릭 → 검수자에게 전달</div>
      </div>
    </div>
    <div class="wf-step">
      <div class="wf-num wf-num-off">③</div>
      <div class="wf-body">
        <div class="wf-label wf-label-off">승인완료</div>
        <div class="wf-hint">검수자 승인 후 승인완료 상태</div>
      </div>
    </div>
    <div class="wf-step">
      <div class="wf-num wf-num-off">④</div>
      <div class="wf-body">
        <div class="wf-label wf-label-off">라이브</div>
        <div class="wf-hint">Clark AI에 반영됩니다</div>
      </div>
    </div>
  </div>
</div>
```

### 연결 선택 UI (라이브 카드만 선택 가능)

```html
<select class="form-control">
  <optgroup label="🟢 라이브 (연결 가능)">
    <option value="EV001">EV001 ICIS 암진단 담보 미보유 통계</option>
  </optgroup>
  <optgroup label="⏳ 승인요청 (승인 후 연결 가능)" disabled>
    <option disabled>EV004 프롬에이지 암위험도 등급 분포</option>
  </optgroup>
  <optgroup label="📝 임시저장 (승인 후 연결 가능)" disabled>
  </optgroup>
</select>
```

### 목록 테이블 구조

```html
<table class="list-table" style="table-layout:fixed;width:100%">
  <thead>
    <tr>
      <th style="width:100px;white-space:nowrap">상태</th>
      <th style="width:200px;white-space:nowrap">코드·명칭</th>
      <!-- 전용 컬럼들 -->
      <th style="width:110px;white-space:nowrap">수정일</th>
      <th style="width:80px;white-space:nowrap">액션</th>
    </tr>
  </thead>
  <tbody id="tableBody"></tbody>
</table>
```

**컬럼 폭 배분 (가용 폭 996px = 1280px − 220px 사이드바 − 64px 패딩):**

| 파일 | 상태 | 코드·명칭 | 전용 컬럼 | 연결 컬럼 | 수정일 | 액션 | auto |
|---|---|---|---|---|---|---|---|
| 04 Risk-type | 100px | 200px | — | 참조Rule 320px | 110px | 80px | 설명 186px |
| 05 Evidence | 100px | 185px | 유형 120px | 참조Rule 280px | 110px | 80px | 설명 121px |
| 06 Concept | 100px | 245px | Risk-type 200px + 동의어수 140px | — | 110px | 80px | 동의어 121px |
| 07 Rule | 90px | 245px | Risk-type 160px | Evidence auto + Policy 180px | 110px | 80px | — |
| 08 Policy | 100px | 230px | 공개범위 110px | 적용Rule 145px | 110px | 80px | 출력제한 221px |

### Toast 알림

```js
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
```

```html
<div class="toast" id="toast"></div>
```

## 폰트·CSS 변수 (guides/design-system.md 참조)

폰트 CDN, 타이포그래피 스케일, :root 변수 전체 목록은 **`guides/design-system.md`** 참조.
신규 파일 작성 시 `guides/design-system.md`의 `:root 필수 변수 목록`을 반드시 포함할 것.
