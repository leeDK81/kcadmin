> **참조:** `CLAUDE.md` · `context/decisions.md` · `guides/ux-patterns.md` · `guides/insurance-domain.md`

---

# Agent 04a — Evidence 편집기 전담 서브에이전트

> agents/04_coder.md의 서브에이전트. Evidence 카드 편집기(05_card-editor-evidence.html) 구현·수정 시 전담 참조.

## Evidence 아키텍처 (2026-06-10 확정)

**핵심 원칙:** 수치 직접 입력 없음. 담보코드·조회지표·모집단만 지정 → KC Engine이 상담 시 자동 조회.

**유형 2종** (질병코드 기반 → `12_coverage-code-table.html` 이관):
- 보닥통계 기반 — 전체 또는 세그먼트 모집단 기준 통계
- 프롬에이지 기반 — 메디에이지 건강검진 분석

## 유형 선택 (select#evType)

```html
<select class="form-control" id="evType" onchange="handleTypeChange()">
  <option value="">-- 유형 선택 --</option>
  <option value="stat">보닥통계 기반</option>
  <option value="fromage">프롬에이지 기반</option>
</select>
```

optgroup 분류 없음 (1depth 플랫 구조, 3개 옵션).

## 폼 섹션 구조

### #staticSection (stat 전용)

```
[데이터 출처 안내 배너 — banner-info]
[제목 input — 필수]
[담보코드 select — 필수] (guides/insurance-domain.md 9종)
[#metricSection] — 조회지표 select (optgroup 2depth)
  비율 계열(%): 미보유율 / 보유율 / 소액가입비율 / 갱신형비율
  금액 계열(원): 평균보장금액 / 중위보장금액 / 평균월보험료
  기간 계열(년): 평균납입기간
[#populationSection] — 모집단 라디오
  ○ 전체 보닥 사용자 (value="all")
     → #allPopInfo: "전체 보닥 사용자 기준" 안내 div
  ● 세그먼트 지정 (value="segment")
     → #segmentSection 노출:
          [연령대 select — 필수] [성별 select — 필수]
          [#extraSegmentSection — 선택사항, N개 동적 추가]
               #extraSegList: 추가된 행 렌더링 영역
               각 행: [프로파일 항목 select] [값 select] [× 삭제 버튼] (3-column grid)
               항목: 결혼여부 / 자녀유무 / 직업위험도 / 출산예정 / 거주지 (나이·성별 제외)
               이미 선택된 항목은 다른 행 드롭다운에서 제외 (중복 불가)
               모든 5개 항목 선택 시 #addExtraSegBtn 숨김
[활용방법 textarea — 필수]
```

### #promageSection (fromage 전용)

```
[§3-8 민감정보 경고 배너 — banner-warn]
[개별 고객 데이터 안내 배너 — banner-info]
[제목 input — 필수]
[카테고리 select#pCat — 암위험도/생체나이/질병위험도/의료비예측]
[항목 select#pField — 카테고리 선택 시 동적 로드]
[출력 형식 checkbox — 필수, 최소 1개]
  ☑ 절대값   — "대사나이 실제 나이 대비 +5세" (개인 Promage 수치)
  ☐ 백분위   — "동년배 상위 20%" (보닥 Promage 전체 분포, KC Engine 산출)
  → id: pFmtAbsolute / pFmtPercentile (기본값: 절대값 checked)
[hidden#pEvId — 카테고리·항목 선택 시 자동생성, UI 비노출 (백단 처리)]
```

## JS 함수

### handleTypeChange()
```js
function handleTypeChange() {
  const val = document.getElementById('evType').value;
  document.getElementById('typePrompt').style.display     = val ? 'none' : 'block';
  document.getElementById('staticSection').style.display  = (val && val !== 'fromage') ? 'block' : 'none';
  document.getElementById('promageSection').style.display = val === 'fromage' ? 'block' : 'none';
  if (val === 'stat') {
    document.getElementById('metricSection').style.display     = 'block';
    document.getElementById('populationSection').style.display = 'block';
  }
}
```

### onPopulationChange()
```js
function onPopulationChange() {
  const isSegment = document.querySelector('input[name="population"]:checked').value === 'segment';
  document.getElementById('allPopInfo').style.display     = isSegment ? 'none'  : 'block';
  document.getElementById('segmentSection').style.display = isSegment ? 'block' : 'none';
}
```

### N-segment 동적 빌더 (addExtraSegment / removeExtraSegment / renderExtraSegments)
```js
// EXTRA_SEG_FIELDS: 5개 프로파일 항목 배열 (code/label/values)
// let extraSegs = [], extraSegSeq = 0;

function addExtraSegment() {
  // used.length >= EXTRA_SEG_FIELDS.length 이면 showToast 후 return
  extraSegs.push({id: ++extraSegSeq, field:'', value:''});
  renderExtraSegments();
}
function removeExtraSegment(id) {
  extraSegs = extraSegs.filter(s => s.id !== id);
  renderExtraSegments();
}
function updateExtraSegField(id, field) {
  // field 변경 시 value 초기화 후 renderExtraSegments()
}
function updateExtraSegValue(id, value) {
  // seg.value만 업데이트 (리렌더 불필요)
}
function renderExtraSegments() {
  // used = 이미 선택된 field코드 배열
  // 각 행: 3-column grid (항목 select / 값 select / × 버튼)
  // 항목 select: used에 없는 항목만 노출 (본인 field 제외)
  // 값 select: fieldData 없으면 disabled
  // #addExtraSegBtn: used.length >= 5 이면 display:none
}
```

### requestReview() 유효성 검사 규칙
```
stat (전체):    제목 + 담보코드 + 조회지표 + 활용방법 필수
stat (세그먼트): 위 + 연령대 + 성별 필수
fromage:        제목 + 카테고리 + 항목 + 출력형식(최소 1개) 필수
```

### onPCatChange() / updateEvId()
카테고리 선택 시 항목 select 동적 로드 + Evidence ID 자동생성.
Promage 필드 코드 형식: `EVID.HEALTH.{catData.idKey}.{fieldCode}.V1`

## PROMAGE_EV_FIELDS 데이터 (요약)

상세 필드 목록은 `05_card-editor-evidence.html` 내 `const PROMAGE_EV_FIELDS` 참조.

| 카테고리 | idKey | 주요 필드 |
|---|---|---|
| 암위험도 | CANCER_RISK | canr_ca (암 종합), lung_ca, gaca_ca 등 22종 |
| 생체나이 | BIO_AGE | metabolic_msa, medical_bad, caa 등 14종 |
| 질병위험도 | DISEASE_RISK | 고지혈증, 당뇨병, 고혈압 등 17종 |
| 의료비예측 | MEDICAL_COST | me_0y, me_5y, me_10y, ambul, hospital 등 |

## 검수 체크리스트

- [ ] 유형 select: **2개 옵션** (보닥통계/프롬에이지) — `mydata`, `disease` 옵션 없어야 함
- [ ] staticSection: 핵심 통계 수치 수동 입력 필드가 없는가?
- [ ] 데이터 출처 안내 배너가 staticSection 상단에 있는가?
- [ ] 담보코드 select: 9종 모두 있는가?
- [ ] stat: metricSection(조회지표) + populationSection(모집단 라디오) 노출되는가?
- [ ] stat: 조회지표 select가 optgroup 2depth 구조인가? (비율 4종 / 금액 3종 / 기간 1종 — 총 8종)
- [ ] stat 전체: allPopInfo 안내 div 노출되는가?
- [ ] stat 세그먼트: segmentSection 노출되고 연령대·성별 필수 처리되는가?
- [ ] stat 추가축: EXTRA_SEG_FIELDS에 나이·성별 항목 없는가?
- [ ] stat 추가축: addExtraSegment() 버튼으로 행 동적 추가되는가?
- [ ] stat 추가축: 이미 선택된 항목이 다른 행 드롭다운에서 제외되는가?
- [ ] stat 추가축: × 버튼으로 행 개별 삭제되는가?
- [ ] stat 추가축: 5개 모두 선택 시 "추가" 버튼 숨겨지는가?
- [ ] staticSection이 stat 선택 시에만 노출되는가? (fromage 선택 시 숨김)
- [ ] fromage: §3-8 경고 배너 표시되는가?
- [ ] fromage: 카테고리 select(암위험도/생체나이/질병위험도/의료비예측)가 있는가?
- [ ] fromage: 출력 형식 체크박스 2개(`pFmtAbsolute` / `pFmtPercentile`) 있는가?
- [ ] fromage: 절대값 기본 checked, 최소 1개 필수 검증 처리되는가?
- [ ] fromage: 등급명 위험/주의/양호 표기인가?
- [ ] fromage: `hidden#pEvId` 필드가 있고 UI에 노출되지 않는가?
- [ ] Evidence ID 자동생성 형식: `EVID.HEALTH.{idKey}.{fieldCode}.V1` 인가?
