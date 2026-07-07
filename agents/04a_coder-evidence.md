> **참조:** `CLAUDE.md` · `context/card-types.md` · `guides/ux-patterns.md` · `guides/insurance-domain.md`

---

# Agent 04a — Evidence 편집기 전담 서브에이전트

> agents/04_coder.md의 서브에이전트. Evidence 카드 편집기(05_card-editor-evidence.html) 구현·수정 시 전담 참조.

## Evidence 아키텍처 (2026-06-17 재확정)

**단일 유형: 공인 외부 통계 기반** (code: `external`)

KC 엔진이 자동 접근 불가한 공인 기관 통계를 운영자가 직접 입력하는 카드.
마이데이터·프롬에이지는 상담 시 자동 전달 → Evidence 카드 불필요. Evidence = 외부 통계 전용.

유형 select 없음 (단일 유형). 모든 필드가 단일 섹션에 노출.

## 편집기 필드 구조

> 아래 필드·옵션 목록은 `context/card-types.md` Evidence 스펙을 이 화면 구현에 맞게 옮긴 것이다(2026-07-07 표기 — card-types.md가 단일 진실원). card-types.md가 바뀌면 이 목록도 함께 갱신할 것.

```
[카드 ID — disabled, 자동생성 안내]
[제목 input — 필수]
[출처 기관 select — 필수]
  options: HIRA(건강보험심사평가원) / NHIS(국민건강보험공단) / KOSTAT(통계청) / FSS(금융감독원) / OTHER(기타)
  OTHER 선택 시 → #agencyOtherSection 노출 (기관명 직접 입력 — 필수)
[보고서명 input — 필수]
[기준 연도 select — 필수] (2025/2024/2023/2022/2021)
[지표명 input — 필수]
[기준값 input — 필수] (단위 포함, 예: 3,800만원, 68%)
[출처 URL input — 선택]
[활용 방법 textarea — 필수]
[action-bar: 임시저장 / 검수 요청]
[status-guidance]
```

## JS 함수

### onAgencyChange()
```js
function onAgencyChange() {
  const val = document.getElementById('evAgency').value;
  document.getElementById('agencyOtherSection').style.display = val === 'OTHER' ? 'block' : 'none';
}
```

### requestReview() 유효성 검사 규칙
```
필수: 제목 + 출처기관 + (OTHER면 기관명) + 보고서명 + 기준연도 + 지표명 + 기준값 + 활용방법
선택: 출처 URL
```

## MOCK_DATA

```js
const MOCK_DATA = {
  evidences: [
    {id:'EV001',title:'암 평균 입원 진료비 (심평원 2024)',type:'external',agency:'HIRA',indicator:'암 평균 입원 진료비',value:'3,800만원',linkedRules:['RU001'],status:'active'},
    {id:'EV002',title:'65세 이상 간병보험 미가입률 (금감원 2024)',type:'external',agency:'FSS',indicator:'65세 이상 간병보험 미가입률',value:'68%',linkedRules:['RU004'],status:'active'},
    {id:'EV003',title:'뇌졸중 평균 입원 진료비 (심평원 2024)',type:'external',agency:'HIRA',indicator:'뇌졸중 평균 입원 진료비',value:'2,100만원',linkedRules:['RU002'],status:'active'}
  ]
};
```

## 검수 체크리스트

- [ ] 유형 select 없는가? (단일 유형 — select 제거됨)
- [ ] 출처 기관 select: 5개 옵션 (HIRA/NHIS/KOSTAT/FSS/OTHER) 있는가?
- [ ] OTHER 선택 시 #agencyOtherSection 노출되는가?
- [ ] 기준 연도 select: 2021~2025 옵션 있는가?
- [ ] 기준값 필드: 단위 포함 자유 입력 (수치만 입력하는 필드 없는가)?
- [ ] 출처 URL: 선택사항 표기 있는가? (필수 아님)
- [ ] requestReview(): 7개 필수 필드 검증되는가?
- [ ] stat/fromage/보닥통계/프롬에이지 관련 코드가 없는가?
- [ ] staticSection/promageSection/metricSection/populationSection 없는가?
- [ ] N-segment 빌더 함수(addExtraSegment 등) 없는가?
- [ ] MOCK_DATA type: 'external' (stat/fromage 아님)
- [ ] status-guidance 문구가 새 필수 필드 기준인가?
