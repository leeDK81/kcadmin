(function () {
  var pages = [
    { file: '00_index.html',      icon: '🏠', label: '홈',              group: null },
    { file: '01_evidence.html',   icon: '📋', label: 'Evidence',        group: '카드 편집기' },
    { file: '02_risk-type.html',  icon: '⚠️', label: 'Risk-type',       group: '카드 편집기' },
    { file: '03_rule.html',       icon: '📏', label: 'Rule',             group: '카드 편집기' },
    { file: '04_concept.html',    icon: '💡', label: 'Concept',          group: '카드 편집기' },
    { file: '05_policy.html',     icon: '🛡️', label: 'Policy',           group: '카드 편집기' },
    { file: '06_playbook.html',   icon: '📖', label: 'Playbook',         group: '카드 편집기' },
    { file: '07_chain-report.html', icon: '🔗', label: '체인 검토 보고서', group: '보고서' },
    { file: '08_ai-preview.html', icon: '🤖', label: 'AI 답변 미리보기', group: '보고서' },
    { file: '09_faq-rag.html',    icon: '💬', label: 'FAQ RAG',          group: 'FAQ RAG' },
    { file: '10_faq-ai-preview.html', icon: '📱', label: 'FAQ RAG 답변 미리보기', group: 'FAQ RAG' },
    { file: '11_query-messages.html', icon: '🔍', label: '조회형 메시지', group: 'Case 0' },
    { file: '12_synonym-management.html', icon: '🏷️', label: '유사어 관리', group: 'Case 0' },
  ];

  var current = window.location.pathname.split('/').pop() || '00_index.html';

  var css = `
    body { display: flex !important; }
    .kc-sidebar {
      position: fixed; left: 0; top: 0; width: 220px; min-height: 100vh;
      background: #1A2B5F; z-index: 100; overflow-y: auto;
      display: flex; flex-direction: column;
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    .kc-sb-logo { padding: 20px 16px 14px; border-bottom: 1px solid rgba(255,255,255,.12); }
    .kc-sb-logo-title { font-size: 14px; font-weight: 700; color: #fff; letter-spacing: -0.2px; }
    .kc-sb-logo-sub { font-size: 11px; color: rgba(255,255,255,.42); margin-top: 3px; }
    .kc-sb-section {
      padding: 14px 16px 4px;
      font-size: 10px; font-weight: 700;
      color: rgba(255,255,255,.38); text-transform: uppercase; letter-spacing: 1px;
    }
    .kc-sb-divider { height: 1px; background: rgba(255,255,255,.1); margin: 6px 0; }
    .kc-sidebar a {
      display: flex; align-items: center; gap: 8px;
      padding: 9px 16px; font-size: 13px;
      color: rgba(255,255,255,.7); text-decoration: none;
      transition: background .15s, color .15s;
      border-left: 3px solid transparent;
    }
    .kc-sidebar a:hover { background: rgba(255,255,255,.09); color: #fff; }
    .kc-sidebar a.kc-active {
      background: rgba(255,255,255,.14); color: #fff;
      font-weight: 600; border-left-color: #60A5FA;
    }
    .kc-page-wrap { margin-left: 220px; flex: 1; min-width: 0; }
    .kc-sb-toggle { display: none; }
    .kc-sb-backdrop { display: none; }

    /* 2026-07-06 모바일 반응형 추가 — 좁은 화면에서 220px 고정 사이드바가 본문을 짓눌러
       텍스트가 한 글자씩 줄바꿈되던 버그 수정. 사이드바를 오프캔버스 드로어로 전환. */
    @media (max-width: 768px) {
      body { display: block !important; }
      .kc-sidebar {
        transform: translateX(-100%);
        transition: transform .2s ease;
        width: 240px;
        box-shadow: 2px 0 12px rgba(0,0,0,.25);
      }
      .kc-sidebar.kc-open { transform: translateX(0); }
      .kc-page-wrap { margin-left: 0; padding-top: 54px; }
      .kc-sb-toggle {
        display: flex; align-items: center; justify-content: center;
        position: fixed; top: 12px; left: 12px; z-index: 101;
        width: 38px; height: 38px; border-radius: 8px;
        background: #1A2B5F; color: #fff; font-size: 18px;
        border: none; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,.25);
      }
      .kc-sb-backdrop.kc-open {
        display: block; position: fixed; inset: 0; z-index: 99;
        background: rgba(0,0,0,.4);
      }
      .kc-sidebar.kc-open ~ .kc-sb-toggle { opacity: 0; pointer-events: none; }
    }
  `;

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  var html = '<div class="kc-sb-logo"><div class="kc-sb-logo-title">KC Admin</div><div class="kc-sb-logo-sub">카드 콘텐츠 관리</div></div>';
  var lastGroup = undefined;
  pages.forEach(function (p) {
    if (p.group !== lastGroup) {
      if (lastGroup !== undefined) html += '<div class="kc-sb-divider"></div>';
      if (p.group) html += '<div class="kc-sb-section">' + p.group + '</div>';
      lastGroup = p.group;
    }
    var active = (current === p.file) ? ' kc-active' : '';
    html += '<a href="' + p.file + '" class="' + active + '">' + p.icon + ' ' + p.label + '</a>';
  });

  var sidebar = document.createElement('aside');
  sidebar.className = 'kc-sidebar';
  sidebar.innerHTML = html;
  document.body.insertBefore(sidebar, document.body.firstChild);

  var backdrop = document.createElement('div');
  backdrop.className = 'kc-sb-backdrop';
  document.body.insertBefore(backdrop, sidebar.nextSibling);

  var toggle = document.createElement('button');
  toggle.className = 'kc-sb-toggle';
  toggle.setAttribute('aria-label', '메뉴 열기');
  toggle.textContent = '☰';
  document.body.insertBefore(toggle, backdrop.nextSibling);

  function closeSidebar() {
    sidebar.classList.remove('kc-open');
    backdrop.classList.remove('kc-open');
  }
  toggle.addEventListener('click', function () {
    sidebar.classList.toggle('kc-open');
    backdrop.classList.toggle('kc-open');
  });
  backdrop.addEventListener('click', closeSidebar);

  var wrap = document.createElement('div');
  wrap.className = 'kc-page-wrap';
  var children = [];
  for (var i = 0; i < document.body.children.length; i++) {
    var el = document.body.children[i];
    if (el !== sidebar && el !== backdrop && el !== toggle) children.push(el);
  }
  children.forEach(function (c) { wrap.appendChild(c); });
  document.body.appendChild(wrap);
})();
