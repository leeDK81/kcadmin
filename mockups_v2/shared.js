/**
 * KC Admin v2 — 공통 JavaScript
 * 모든 HTML 파일에서 <script src="../shared.js"></script> 로 참조
 * 이 파일을 수정하면 26개 파일에 즉시 반영됩니다
 */

// ============================================================
// 사이드바 메뉴 정의
// ============================================================
var SIDEBAR_ITEMS = [
  { type:'link', href:'01_guide.html',            icon:'fa-clipboard-list',   label:'업무 가이드' },
  { type:'link', href:'02_dashboard.html',         icon:'fa-chart-bar',        label:'대시보드' },
  { type:'divider' },
  { type:'link', href:'03_card-library.html',      icon:'fa-folder-open',      label:'카드 라이브러리' },
  { type:'link', href:'04_risk-type-list.html',    icon:'fa-circle-exclamation',label:'① Risk-type', indent:true },
  { type:'link', href:'05_evidence-list.html',     icon:'fa-database',         label:'② Evidence', indent:true },
  { type:'link', href:'06_concept-list.html',      icon:'fa-lightbulb',        label:'③ Concept', indent:true },
  { type:'link', href:'07_rule-list.html',         icon:'fa-scale-balanced',   label:'④ Rule', indent:true },
  { type:'link', href:'08_policy-list.html',       icon:'fa-file-shield',      label:'⑤ Policy', indent:true },
  { type:'link', href:'16_playbook-list.html',     icon:'fa-bullseye',         label:'⑥ Playbook', indent:true },
  { type:'locked', label:'⑦ Case 🔒', indent:true },
  { type:'divider' },
  { type:'link', href:'09_review-workflow.html',   icon:'fa-check-double',     label:'검수·승인' },
  { type:'link', href:'00_canvas-main.html',       icon:'fa-diagram-project',  label:'연결·테스트·배포' },
  { type:'link', href:'18_system-settings.html',   icon:'fa-sliders',          label:'시스템 설정' },
  { type:'link', href:'19_faq-rag.html',           icon:'fa-list-check',       label:'FAQ Q&A', indent:true },
  { type:'divider' },
  { type:'link', href:'00_design-system.html',     icon:'fa-palette',          label:'디자인 시스템' },
  { type:'link', href:'13_answer-logic.html',      icon:'fa-sitemap',          label:'AI 답변 생성 로직' },
  { type:'link', href:'15_aio-guide.html',         icon:'fa-magnifying-glass', label:'AIO 가이드' },
  { type:'link', href:'12_coverage-code-table.html',icon:'fa-table-list',     label:'담보코드' },
];

/**
 * 사이드바를 렌더링하고 토스트 컨테이너를 주입합니다.
 * @param {string} [currentFile] - 현재 파일명 (예: '02_dashboard.html'). 생략 시 URL에서 자동 감지.
 */
function renderSidebar(currentFile) {
  var nav = document.getElementById('sidebar');
  if (!nav) return;

  var currentName = currentFile || window.location.pathname.split('/').pop() || '';

  var html = '<div class="sidebar-logo">&#9889; KC Admin <span style="font-size:10px;background:#5A8AE0;color:#fff;padding:1px 6px;border-radius:3px;margin-left:4px;font-weight:600">v2</span></div>';

  SIDEBAR_ITEMS.forEach(function(item) {
    if (item.type === 'divider') {
      html += '<div class="nav-divider"></div>';
      return;
    }
    var indent = item.indent ? ' style="padding-left:20px"' : '';
    if (item.type === 'locked') {
      html += '<span class="nav-locked"' + indent + '><i class="fa-solid fa-lock fa-fw"></i> ' + item.label + '</span>';
      return;
    }
    var isActive = (currentName === item.href) ? ' active' : '';
    html += '<a href="' + item.href + '"' + indent + (isActive ? ' class="active"' : '') + '>' +
      '<i class="fa-solid ' + item.icon + ' fa-fw"></i> ' + item.label +
    '</a>';
  });

  nav.innerHTML = html;

  // 토스트 컨테이너 주입 (없을 경우에만)
  if (!document.getElementById('toast')) {
    document.body.insertAdjacentHTML('beforeend', '<div class="toast" id="toast"></div>');
  }
}

// ============================================================
// 공통 유틸리티
// ============================================================

/** 토스트 메시지 표시 */
function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2200);
}

/** 체인 평가 단계 토글 (evalStep 아코디언) */
function toggleStep(header) {
  var body = header.nextElementSibling;
  var arrow = header.querySelector('.fa-chevron-down');
  var open = body.style.display !== 'none' && body.style.display !== '';
  body.style.display = open ? 'none' : 'block';
  if (arrow) arrow.style.transform = open ? '' : 'rotate(180deg)';
}

// ============================================================
// 카드 타입 공통 데이터 & 헬퍼
// ============================================================

/** 카드 ID → 타입 매핑 */
var CARD_TYPE = {
  CN001:'concept', CN002:'concept', CN003:'concept', CN004:'concept', CN005:'concept',
  RT01:'risk',     RT02:'risk',     RT03:'risk',
  RU001:'rule',    RU002:'rule',    RU003:'rule',
  EV001:'evidence',EV002:'evidence',EV003:'evidence',EV004:'evidence',EV005:'evidence',
  PO001:'policy',  PO002:'policy',
  PB001:'playbook',PB002:'playbook',
};

/** 타입 → 색상 */
var TYPE_COLOR = {
  concept:'#1A4A9A', risk:'#C94B1A', rule:'#9A1A1A',
  evidence:'#1A7A4A', policy:'#5A5A55', playbook:'#6B4A9A',
};

/** 카드 ID → 표시명 */
var CARD_NAMES = {
  CN001:'암보험 보장 내용',          CN002:'암 진단비 얼마나 받나요',
  CN003:'뇌졸중 보험 보장',          CN004:'뇌경색 치료비 보장',
  CN005:'중대질병 보험 범위',
  RT01:'암·종양 클러스터',           RT02:'뇌혈관질환 클러스터',
  RT03:'심혈관질환 클러스터',
  RU001:'암 진단비 산정 기준',       RU002:'뇌혈관 보장 판정 기준',
  RU003:'심혈관 보장 판정 기준',
  EV001:'암 평균 입원 진료비',       EV002:'암 5년 생존율',
  EV003:'뇌졸중 평균 입원 진료비',   EV004:'고혈압 유병률',
  EV005:'EV005',
  PO001:'암 보장 면책 고지',         PO002:'뇌혈관 면책 고지',
  PB001:'암 진단 보장 공백 상담 플레이북',
  PB002:'뇌혈관 보장 공백 상담 플레이북',
};

/** 카드 타입 색상 반환 */
function typeColor(type) {
  return TYPE_COLOR[type] || '#999';
}

/** 카드 ID → 인라인 태그 HTML */
function cardTag(id) {
  var t = CARD_TYPE[id] || 'concept';
  var c = typeColor(t);
  var r = parseInt(c.slice(1,3),16), g = parseInt(c.slice(3,5),16), b = parseInt(c.slice(5,7),16);
  return '<span class="card-tag tag-' + t + '" title="' + id + '" style="background:rgba(' + r + ',' + g + ',' + b + ',.1);color:' + c + '">' + id + '</span>';
}

/** 카드 ID → 사용 카드 칩 HTML */
function usedChip(id) {
  var t = CARD_TYPE[id] || 'concept';
  var c = typeColor(t);
  var r = parseInt(c.slice(1,3),16), g = parseInt(c.slice(3,5),16), b = parseInt(c.slice(5,7),16);
  return '<span class="used-card-chip" style="background:rgba(' + r + ',' + g + ',' + b + ',.09);color:' + c + ';border:1px solid rgba(' + r + ',' + g + ',' + b + ',.2);display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700">' + id + '</span>';
}
