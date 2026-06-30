# KC Admin 디자인 시스템

> CSS 변수, 폰트, 컴포넌트 CSS. 에이전트 03·04·05·08이 읽는다.
> HTML 패턴(사이드바·테이블 구조)은 `guides/ux-patterns.md` 참조.

---

## 폰트

**CDN (Google Fonts 사용 금지):**
```html
<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css" rel="stylesheet">
```

**body font-family:**
```css
font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

## 타이포그래피 스케일

| 역할 | 크기 | 굵기 | 적용 요소 |
|---|---|---|---|
| 페이지 제목 | 24px | 700 | `.page-header h1` |
| 섹션·가이드박스 제목 | 17px | 700 | `.section-title`, `.guide-box h3` |
| 카드 헤더 제목 | 16px | 700 | `.card-header-title` |
| 본문 base | 15px | 400 | `body` |
| 네비·버튼·폼 레이블 | 14px | — | `.sidebar a`, `.btn`, `label` |
| 배지·힌트·소형 레이블 | 13px | — | `.badge`, `.field-hint` |
| 아이콘·메타·날짜 | 12px | — | `fa-fw`, `.cell-date` |

> 스케일 외 임의 크기 금지. 8px·9px·10px 극소형 사용 금지.

---

## :root 필수 변수 목록

신규 파일 작성 시 아래 변수 **전체 포함** 필수. 누락 시 배지 색상이 브라우저에서 깨진다.

```css
:root {
  /* 레이아웃 (Montage 기반) */
  --sidebar-w: 220px;
  --bg-page:   #F4F4F5;
  --bg-card:   #FFFFFF;
  --text-primary:   #171719;
  --text-secondary: #70737C;
  --text-hint:      #989BA2;
  --border: #E1E2E4;
  --radius: 8px;
  --shadow: 0px 2px 4px -2px rgba(23,23,23,.06), 0px 4px 6px -1px rgba(23,23,23,.06);

  /* 카드 유형 */
  --card-risk:#C94B1A; --card-evidence:#1A7A4A; --card-concept:#1A4A9A;
  --card-rule:#9A1A1A; --card-policy:#5A5A55;   --card-playbook:#6B4A9A;

  /* 상태 — 6개 전부 필수 (approved·paused·rejected는 목록 파일에서 누락 주의) */
  --status-draft:#9C9C94;
  --status-review:#BA7517;
  --status-active:#0F6E56;
  --status-approved:#1A4A9A;
  --status-paused:#7A4A00;
  --status-rejected:#A32D2D;

  /* wf-tracker */
  --step-active: #1A4A9A;
  --step-pending: #E1E2E4;
}
```

> CSS 변수명 한글 사용 절대 금지. `--status-라이브` → 브라우저 무시됨. 반드시 `--status-active`.

---

## card-tag CSS (AIO·참조 페이지 전용)

```css
.card-tag{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;white-space:nowrap}
.ct-concept {background:rgba(26,74,154,.1); color:var(--card-concept)}
.ct-evidence{background:rgba(26,122,74,.1); color:var(--card-evidence)}
.ct-risk    {background:rgba(201,75,26,.1); color:var(--card-risk)}
.ct-rule    {background:rgba(154,26,26,.1); color:var(--card-rule)}   /* ← 누락 주의 */
.ct-policy  {background:rgba(90,90,85,.1);  color:var(--card-policy)}
```

---

## 카드 편집기 공통 CSS

```css
.card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--border)}
.card-header-left{display:flex;align-items:center;gap:10px}
.card-header-title{font-size:15px;font-weight:700}
.action-bar{display:flex;gap:8px;justify-content:flex-end}
.status-guidance{display:flex;align-items:flex-start;gap:8px;padding:10px 14px;background:#FFF9EC;border:1px solid #F0D880;border-radius:6px;margin-top:10px;font-size:12px;color:#7A5A00;line-height:1.5}
.status-guidance i{margin-top:1px;flex-shrink:0}
```

---

## conn-panel CSS (연결 선택 패널)

```css
.conn-panel{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:16px 20px;margin-bottom:16px;box-shadow:var(--shadow)}
.conn-panel-header{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.conn-panel-title{font-size:14px;font-weight:700}
.badge-required{background:#C94B1A;color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px}
.badge-optional{background:#9C9C94;color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px}
.conn-panel-guide{font-size:12px;color:var(--text-hint);margin-bottom:10px;line-height:1.5}
.conn-list{display:flex;flex-direction:column;gap:4px;margin-bottom:10px}
.conn-item{display:flex;align-items:center;gap:8px;padding:7px 10px;border:1px solid var(--border);border-radius:6px;cursor:pointer;font-size:13px}
.conn-item:hover:not(.disabled){background:var(--bg-hover,#F4F4F2)}
.conn-item.disabled{opacity:.4;pointer-events:none}
.conn-item input[type="checkbox"],.conn-item input[type="radio"]{flex-shrink:0}
.conn-item-name{flex:1}
.conn-item-status{font-size:11px;color:var(--text-hint)}
.conn-item-inactive{font-size:11px;color:var(--text-hint);margin-left:4px}
.conn-footer{display:flex;align-items:center;justify-content:space-between;font-size:12px;padding-top:8px;border-top:1px solid var(--border)}
.conn-count{color:var(--text-secondary);font-weight:600}
.conn-validation{font-size:12px;margin-top:6px;padding:6px 10px;border-radius:4px}
.conn-validation.error{background:#FFF0ED;border:1px solid #F0B0A0;color:#C94B1A}
.conn-validation.ok{background:#F0F9F5;border:1px solid #A0D0C0;color:#0F6E56}
.conn-validation.info{background:#F4F4F2;border:1px solid var(--border);color:var(--text-hint)}
```

---

## wf-tracker CSS (작업 흐름 트래커)

```css
.wf-tracker{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:16px 20px;margin-bottom:16px;box-shadow:var(--shadow)}
.wf-title{font-size:14px;font-weight:700;margin-bottom:12px}
.wf-step{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)}
.wf-step:last-child{border-bottom:none}
.wf-num{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:1px}
.wf-num-on{background:var(--step-active);color:#fff}
.wf-num-off{background:var(--step-pending);color:#888}
.wf-body{flex:1}
.wf-label{font-size:13px;font-weight:600}
.wf-label-on{color:var(--step-active)}
.wf-label-off{color:var(--text-hint)}
.wf-tag{background:var(--step-active);color:#fff;font-size:10px;padding:1px 6px;border-radius:10px;margin-left:4px;vertical-align:middle;display:inline}
.wf-hint{font-size:12px;color:var(--text-hint);margin-top:2px}
```

---

## 목록 테이블 CSS 규칙

```css
/* table-layout:fixed 없으면 컬럼 폭 힌트가 무시됨 */
.list-table { table-layout: fixed; }

/* 3개 속성 모두 필수 */
.cell-name { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

/* 날짜 한 줄 — white-space:nowrap 필수 */
.cell-date { color:var(--text-hint); font-size:12px; white-space:nowrap; }

/* 배지·칩 줄바꿈 방지 — 한글은 글자 사이에서도 줄바꿈 발생 */
.badge, .badge-type, .badge-scope, .synonym-chip { white-space:nowrap; }
```

설명/요약 auto 컬럼: `<td style="max-width:0">` + 내부 div에 `overflow:hidden;text-overflow:ellipsis;white-space:nowrap` + `title="${d.desc}"`

컬럼 폭 배분표 → `guides/ux-patterns.md` 참조.
