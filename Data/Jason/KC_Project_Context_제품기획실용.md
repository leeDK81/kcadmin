# KC 프로젝트 세션 컨텍스트 — 제품기획실용

> **이 파일의 용도**: Claude와 KC 관련 작업을 할 때 대화 시작 시 업로드합니다.
> Claude가 프로젝트의 전체 맥락을 파악한 상태에서 바로 실무 작업에 들어갈 수 있습니다.
>
> **관리 원칙**: 이 파일은 KC 프로젝트의 Single Source of Truth입니다.
> Phase 전환, 의사결정, 구조 변경이 있을 때마다 해당 섹션을 업데이트하세요.
>
> **정본 문서**: KC 기획서 v1.4+ (interactive HTML) — 용어·구조·수치가 상충할 때 기획서가 우선
> **연관 문서**: 보닥 플랫폼 구조 정의서 v1.1, KC Admin UI 설계서 v1.2.1
>
> **최종 수정일**: 2026-04-07
> **작성/관리**: 제품기획실

---

## 1. 회사 및 조직 구조

### 아이지넷(Aijinet)
- 2014년 설립, 보험 플랫폼 사업
- 주력 서비스: **bodoc** (보닥) — 보험 리모델링 플랫폼
- bodoc MAU: ~140,000
- 자회사: 더파트너스 (GA, 법인보험대리점)

### 플랫폼사업본부 (본부장: Jason)
| 팀 | 역할 |
|---|---|
| 제품기획실 | KC 기획, 프로덕트 설계, 기획서 관리 |
| 사업개발팀 | 파트너십, 제휴, 사업 확장 |
| 마케팅팀 | 유저 획득, 브랜딩, 콘텐츠 |
| 고객경험팀 | CS, VOC, KC Admin 프로토타입 테스트 |

### 기술연구소
- 전체 리소스가 KC 프로젝트에 집중 (다른 프로덕트 업데이트는 긴급 유지보수만)
- CTO 교체 진행 중 (후임 채용 중)

### 기타 주요 부서
- 정보보호실: 개인정보보호, 데이터 관련 컴플라이언스

---

## 2. KC 프로젝트 개요

### KC란?
**Knowledge Core** — 온톨로지 기반 보험 도메인 지식 아키텍처.
Clark(보험진단 AI)과 Lois의 지식 엔진 역할.
보험 도메인 지식을 7종의 카드 체계로 구조화하여, AI의 출력을 통제하고 보험산업에 특화된 지식 아키텍처를 구축하는 프로젝트.

### 설계 원리: 온톨로지 기반 AI 아키텍처
- **KC 카드 단위 = 청크 단위**: 기존 RAG의 의미 경계 모호성을 원천 해결
- **링크 구조에 의한 출력 통제**: 카드 간 참조 관계로 LLM이 동일 의미 경계(Meaning Layer) 내에서만 출력 생성
- **One Source, Triple Use**: AIO 콘텐츠(외부 권위) + Clark AI RAG(진단 품질) + 사내 교육(온보딩)
- **LLM은 교체 가능, 온톨로지는 교체 불가능한 플랫폼 자산**

### 핵심 구조: 7-Card System

**⚠️ 카드 명시 순서: Concept → Risk-type → Rule → Evidence → Playbook → Policy → Case** (항상 이 순서를 따를 것)
**⚠️ 카드 타입 표기 규칙: 첫 글자만 대문자** (예: Concept, Rule, Evidence / CONCEPT ❌ RULE ❌)
**⚠️ 카드 ID는 대문자 유지** (예: PLAYBOOK.LEAD.CONVERT.V1)

| # | 카드 타입 | 역할 | 공개범위 | 비고 |
|---|---|---|---|---|
| ① | Concept | 보험 개념·용어 정의 (메타 정의 계층) | Public | Standalone(독립형) / Linked(연결형) 이원 구조. 동의어(synonyms) 필드 포함. Phase 1 대상 27종 |
| ② | Risk-type | 리스크 유형 분류 (보장 구조 정의 계층) | Public | 8개 초기 유형 (무보장형, 암투병생활비 부족형 등). KC Admin에서 추가 가능. 리드 스코어 배정 |
| ③ | Rule | 진단 규칙, 조건 로직 (리스크 평가 계층) | Baseline | Evidence 1개 이상 연결 필수 (미연결 시 Draft 유지). 마이데이터 규격 + 질병코드 + Amplitude 속성 혼합 조건 설정 |
| ④ | Evidence | 근거 데이터 (Rule 설정의 근거 계층) | Internal | 4개 유형: 마이데이터 기반, 보닥 통계 기반, 질병코드 기반, 프롬에이지 기반(v1.4 추가) |
| ⑤ | Playbook | 리드 전환·스코어링·배정 (개입 우선순위 계층) | Internal | 3개 레이어: 리드 전환 / 리드 스코어링 / 배정 최적화 |
| ⑥ | Policy | 규제 준수·출력 통제 (최종 출력 통제 계층) | Internal | 준법감시인(Dwhy) 최종 승인 필수. Clark 법적 준수 사항 9개 항목 포함 |
| ⑦ | Case | 성공 케이스 축적 (피드백 루프 계층) | 분리 관리 | 반자동 생성: AI 태깅 → 담당자 검토 → 검수자 승인. 원본(Internal) / 요약본(교육·학습용) 분리 |

### 메인 참조 흐름 (단방향 체이닝)
**Concept → Risk-type → Rule → Evidence → Policy**
- Standalone Concept은 체이닝 미참여 (일반 대화, AIO, 교육용 독립 참조)
- Linked Concept은 사용자 질문 의도 파악 → Risk-type 진입 역할
- Playbook은 메인 흐름과 병렬 동작 (리드 전환 시그널 감지 시)
- Case는 전체 흐름의 결과물 (피드백 루프)

### 4계층 확장 아키텍처
| 레이어 | 명칭 | 역할 | 핵심 구성요소 |
|---|---|---|---|
| L1 | KC 온톨로지 | 보험 도메인 지식 체계 (7종 카드) | Concept, Risk-type, Rule, Evidence, Playbook, Policy, Case |
| L2 | Graph RAG | 관계 기반 해석 엔진 (multi-hop 추론) | Graph DB, Embedding (pgvector), Multi-hop Query |
| L3 | Digital Twin | 보험 시장 시뮬레이션 | Customer, Planner, Product, Carrier, Channel Agent |
| L4 | Lead Optimization | aGCR 스코어링 및 배정 최적화 | aGCR Scoring, Allocation Engine, ROI Feedback |

각 층은 아래 층 없이 동작하지 않음. L1(KC)이 건물의 기초.

---

## 3. Phase 로드맵

### Phase 1: KC Admin MVP + 카드 입력
- **상태**: [현재 상태 기입]
- **검증 가설**: KC 지식 체계가 실제 운용 가능한가
- KC Admin 프로토타입 (vibe-coded) → 고객경험팀 테스트 중
- KC Admin UI 설계서 v1.2.1: 13개 화면
- 인프라: PostgreSQL + pgvector (추가 인프라 비용 없음)
- **MVP v2 보완 필요 5가지**:
  1. Risk-type을 독립 카드로 분리
  2. 카드 체이닝 방향 정의
  3. Risk-type별 리드 스코어
  4. MyData + 질병코드 조건 처리
  5. Evidence 유형 분류 체계

### Phase 1.5: Clark/Lois 독립 웹뷰 런칭 + FC 리드 핸드오프
- **검증 가설**: KC 기반 AI 진단이 전환율을 높이는가
- Clark/Lois를 bodoc 앱과 별도로 독립 웹뷰 서비스로 런칭
- 단독 앱 또는 파트너 임베디드 배포 가능 (헬스케어·핀테크 앱)
- bodoc의 MyData + 카카오 로그인 인프라 공유
- **고객 플로우**: 비인증 대화 시작 → 카카오 로그인 → 본인인증(CI) → MyData 연동 → KC 기반 진단 → 건강정보 연결 유도(Fromage) → 리드 전환 → FC로 리드+aGCR+Risk-type+Playbook 메타데이터 전달
- Fromage (건강검진 데이터) 연동
  - ⚠️ 개인정보 국외이전 이슈 → 건강데이터는 국내 bodoc 서버에만 저장
  - Amplitude에는 추상화된 구간 등급(high/medium/low)만 전송
- FC(First Connect) 연동: AI 엔진이 리드 스코어(aGCR) + 배정 가이드를 산출하여 FC에 전송
- 인프라: 웹뷰 서버 추가

### Phase 2: Edge Table + Agent + aGCR + Graph RAG
- **검증 가설**: Agent 기반 자동 배정이 더 효율적인가
- Edge table: from/to/relation_type 스키마 (향후 Graph DB 전환 대비)
- Agent table 도입 (5개 Entity: Customer, Planner, Product, Carrier, Channel)
- aGCR 스코어링 모델 본격 운용
- 시뮬레이션 레벨 2(배치 최적화)까지 목표
- 인프라: 기존 DB에 테이블 추가

### Phase 3: Digital Twin 시뮬레이션
- **검증 가설**: 시뮬레이션으로 시장을 예측할 수 있는가
- Graph DB 전면 도입 및 Graph RAG 엔진 구축
- 디지털 트윈 레벨 3 (시장 동태 시뮬레이션) — Case 500건 이상 축적 후
- Case 피드백 루프 자동 보정 파이프라인

### Phase 1/1.5 타임라인 (약 16~18주)
| 주차 | 활동 |
|---|---|
| 0~1주 | Phase 1 착수: API 스펙 합의 + 백엔드/프론트 병렬 시작 |
| 1~4주 | KC Admin 핵심 화면 개발 (01~05번) + Clark/Lois UX 설계 시작 |
| 4~7주 | KC Admin 나머지 화면 (06~08번) + 카드 입력 시작 |
| 6~8주 | Clark/Lois UX 설계 완료 + Phase 1.5 백엔드/프론트/AI 착수 |
| 8~14주 | Phase 1.5 개발 + 카드 입력 계속 |
| 14~16주 | FC 연동 + A/B 추적 구축 + 테스트 |
| 16~18주 | Clark/Lois 출시 + 전환율 데이터 수집 시작 |

---

## 4. KC Admin 기능 정의

### 역할 및 권한
| 역할 | 담당자 | 소속 | 권한 범위 |
|---|---|---|---|
| 작성자 | Aron | 고객경험팀장 (QA출신) | 전체 카드 CRUD, Risk-type 관리, 검수 요청 발행 |
| 검수자(정) | Eric | 더파트너스 (자회사 GA), 설계사 출신 중간관리자 | 도메인 검수 (현장 통용성 검증). **External Reviewer 권한 그룹** — Internal Pack 카드 열람/검수 가능, 생성/수정 불가 |
| 검수자(법) | Dwhy | 준법감시인 | Policy 카드 법적 검토·승인. Policy 체크리스트(11항목) 기반 |

### 승인 워크플로우 요약
- **일반 카드** (Concept, Risk-type, Evidence, Playbook): 작성(Aron) → 검수 요청 → 검수 승인(Eric) → 적용
- **Rule 카드**: 작성(Aron) → Evidence 연결 필수(미연결 시 검수 요청 불가) → 검수 요청 → Evidence 적합성 확인 후 승인(Eric) → 적용
- **Policy 카드**: 작성(Aron) → 1차 검수(Eric) → 법무 검토·최종 승인(Dwhy) → 적용
- **Case 카드**: Clark AI 자동 태깅 → 담당자 검토(Aron) → 검수자 승인(Eric) → 개인정보 제거 요약본 자동 생성 → 저장

### 주요 기능
- 카드 CRUD + 버전 이력 관리 + Public/Baseline/Internal 공개범위 설정 + 카드 간 참조 링크
- 마이데이터 담보코드 테이블 내장 (ICIS 기반 인보험 담보코드 A1100~A9999 + 보장내용코드 100~963)
- Rule 조건 빌더: 마이데이터 필드(coverage_code, coverage_amt 등) + Amplitude 유저 속성(13종) 혼합 조건, AND 결합
- 리스크 유형 조건 드라이런 검증 (시뮬레이션 고객 프로필 대조)
- AI 상담 이력 조회 · 피드백 집계 · 오답 리포트
- AI 모델 버전 확인 및 전환
- 가입자 / 마이데이터 연결률 / 상담 / AI 이용 현황 대시보드

---

## 5. 주요 시스템 & 아키텍처

### Clark (보험진단 AI)
- **페르소나**: 스마트한 조력자 — 존댓말, 공감 중심, 직접 추천보다 가이드형 질문
- **4-Layer 방어 구조**:
  - L1: POLICY 프롬프트 인젝션 방어
  - L2: 키워드/패턴 필터
  - L3: 동적 시맨틱 바운더리 (semantic boundary mechanism)
  - L4: 하드 에스컬레이션
- **리스크 분류**: 5개 도메인 (암/심혈관/뇌혈관/갱신/가성비)
- **심각도 레벨**: NONE / WATCH / MEDIUM / HIGH / CRITICAL

### Risk-type 초기 유형 (8종)
| 유형 | 설명 |
|---|---|
| 무보장형 | 실손 포함 기초 보장 부재 |
| 암투병생활비 부족형 | 암진단금 부족 |
| 심혈관질환보장 협소형 | 좁은 질병코드 보장만 보유 |
| 뇌혈관질환보장 협소형 | 좁은 질병코드 보장만 보유 |
| 노후돌봄보장 공백형 | 간병/치매 보장 부재 |
| 납입여력부족 우려형 | 갱신형 보험료 과다 |
| 비용 대비 보장 비효율형 | 중복 가입·과다 보장 |
| 생애주기 적합도 저조형 | 주소득원의 사망·노후 리스크 미대비 |

### aGCR 스코어링 모델
- **공식**: `aGCR = (P_retain × LTV × Margin × P_convert) / Cost_lead`
- **2단계 구조**:
  - v0 추정(estimated): 리드 단계, 상품 미확정 → P_retain, LTV, Margin은 Product 노드 참조 불가
  - v1 확정(confirmed): PROPOSED 시점에서 갱신. 차이율 30% 이상 시 담당자 알림
- **PlannerFitScore**: `(response × 0.3 + matching × 0.4 + closing × 0.3) × capacity_factor`
- **AllocationScore**: `aGCR × PlannerFitScore`
- **고위험 리드 가중치 변경**: matching 0.4→0.6, response 0.3→0.2, closing 0.3→0.2
- **2027 "1200% 룰"**: 규제 변경으로 Margin이 near-constant화 → P_retain × LTV × P_convert가 핵심

### First Connect (FC) 연동
- **B-2 모델 (반위임 구조)**: 결정은 AI 엔진 + KC Admin, 실행은 FC
- **이원 구조**:
  - 더파트너스(내부): 리드 + aGCR + 추천 설계사 리스트 → Planner Agent 단위 추적
  - 제휴 GA(외부): 리드 + aGCR + 배정 가이드만 → Channel Agent 단위 추적
- **최소 API**: 리드 수신 API, 우선순위 기반 순차 배정, 설계사 워크스페이스, 결과 콜백 API

### CRM 플랫폼 연동
- KC 기획서의 범위는 AI 진단 → 리드 생성 → FC 전달까지
- CRM 이후 상담 업무 흐름은 CRM 플랫폼 영역에서 정의 (보닥 플랫폼 구조 정의서 참조)
- 데이터 접점: 사용자 상담 신청 + 제3자 정보 제공 동의 완료 시점
- CRM(GA/원수사용): 배정 고객 관리, DB 배정, 직원/설계사 관리, 보안 브라우저
- CRM 어드민(내부): GA 계정 관리, DB 배분 규칙, 정산

### Amplitude / Braze 연동
- 5개 `risk_*` 유저 프로퍼티 → Amplitude Identify API로 설정
- Braze 동기화 → 인앱 메시지 타겟팅 (HTML, 네이티브 WebView 렌더링)
- Braze Currents → Amplitude 역방향 수집 (측정용)
- Amplitude 이벤트 택소노미: 227+ 이벤트
- **Amplitude 유저 속성 13종**: cancer_risk_rating, risk_of_stroke, risk_of_myocardial, bodoc_score, join_renewal_insurance, whole_insurance_filter, age, publish_status, total_paid_premium, diagnosis_price, diagnosis_warranty, diagnosis_coverage, join_non_renewal_insurance
- **⚠️ 민감정보 적재 제한**: 건강검진 데이터·질병위험도·암위험도 등은 Amplitude 적재 금지. 추상화된 세그먼트 등급만 전송 가능 (health_risk_segment, metabolic_age_gap, health_data_linked, fromage_report_viewed)

### 3대 저장소 분리 원칙
| 저장소 | 저장 대상 | 비유 | 특성 |
|---|---|---|---|
| KC Admin | 도메인 규칙, 기준값, 카드 | 사전(Dictionary) | 수십~수백 장, 주/월 변경, 사람 검수 |
| Agent 상태 | 개별 인스턴스의 현재 상태 | 환자 차트(Medical Record) | 수천~수만 건, 분~시간 변경, 시스템 자동 |
| 서버 DB | 원시 트랜잭션 데이터 | 업무 장부(Ledger) | 사건의 원본 기록, 해석 없이 저장 |

---

## 6. 민감정보 국외이전 해결방안 (v1.4)

### 문제
Fromage API 연동 → 건강검진 데이터의 Amplitude 적재가 개인정보보호법상 민감정보 국외이전에 해당

### 핵심 구분
- "이 고객은 암 보장이 부족하다" (보험 보장 분석 결과) → 민감정보 **아님**
- "이 고객의 암 위험도는 동년배 대비 +19.6%이다" (건강검진 기반 의학적 판정) → 민감정보 **해당**

### 해결 원칙
1. **원칙 1**: 건강정보 원본은 보닥 서버 DB(국내)에만 저장. 해외 서버 전송 금지
2. **원칙 2**: Amplitude에는 세그먼트 등급(high/medium/low)만 전송
3. **원칙 3**: 등급 라벨만으로는 개인 건강 상태 특정 불가능한 수준 유지 (3단계 이하)

### 정보보호실 사전 협의 항목 (4건)
1. 기존 Amplitude 속성 3종(cancer_risk_rating 등)의 민감정보 해당 여부 — Phase 1
2. 추상화된 건강 세그먼트 등급의 Amplitude 적재 비해당 확인 — Phase 1
3. Fromage API 수신 건강정보의 보닥 서버 저장 시 안전조치 기준 — Phase 1.5 착수 전
4. 건강정보 연동 동의 절차 법적 요건 — Phase 1.5 착수 전

---

## 7. 주요 파트너십 & 외부 연동

### Fromage (Mediage)
- 건강검진 데이터 API (대사나이, 질병위험도, 암위험도, 사망위험도, 3개년 건강검진 정보)
- 국제 SCI 학술지 논문 7편 이상으로 검증된 의학적 위험도 분석
- 개인정보보호법 국외이전 이슈 → 건강데이터 국내 서버 저장, 구간 등급만 외부 전송
- Phase 1.5에서 연동 예정
- Evidence 카드 4번째 유형(프롬에이지 기반)으로 KC 체계에 통합

---

## 8. bodoc 플랫폼 기본 정보

- **주요 리드 고객층**: 35–44세 (기존 46–59세에서 수정)
- **리드 데이터 항목**: 이름, 생년월일, 성별, 연락처, 지역, 보험 가입 정보
- **리드 공급 방식**: 실시간 API
- **수익 모델**: 보험 리모델링 수수료
- **보닥플래너**: 보닥 소속 보험설계사
- **플랫폼 2대 영역**: AI 보장 진단 플랫폼 (영역 1) + CRM 플랫폼 (영역 2)
- **데이터 접점**: 사용자 상담 신청 후 제3자 정보 제공 동의 완료 시점에 AI 플랫폼 → CRM으로 DB 전달

---

## 9. KC 기획서 관련

### 현재 버전
- KC 기획서 v1.4+ (지속 업데이트 중, interactive HTML)
- v1.4+에서 "6+1종" → "7종" 카드 체계 용어 통일 완료

### 기획서 구성 (11장 + α)
| 장 | 제목 | 도입 버전 |
|---|---|---|
| 1 | 기획 배경 및 비전 | v1.0 |
| 2 | KC 카드 체계 상세 설계 | v1.0 (v1.2~v1.4 보강) |
| 3 | KC Admin 기능 정의 | v1.0 (v1.2~v1.4 보강) |
| 4 | 확장 아키텍처: KC → Digital Twin → 리드 최적화 | v1.1 |
| 5 | Agent 관계 그래프 스키마 | v1.1 |
| 6 | aGCR 스코어링 공식 및 현실성 검증 | v1.1 |
| 7 | Playbook / Rule / Evidence 카드 예시 | v1.1 |
| 8 | KC Admin으로 AI 통제 가능 범위 | v1.1 |
| 9 | First Connect 연동 아키텍처 | v1.2 (v1.4+ CRM 연동 추가) |
| 10 | Clark/Lois 독립 웹뷰 전략 및 Phase 재구분 | v1.2 (v1.4 건강정보 추가) |
| 11 | 기대 효과 및 향후 과제 | v1.0 (v1.2~v1.4 보강) |

### 기획서 업데이트 규칙
- **⚠️ 절대 규칙**: 기획서 업데이트 시 기존 버전 내용을 절대 생략하지 않음 → 항상 완전한 독립 문서로 출력

---

## 10. 용어 & 표기 규칙

| 항목 | 올바른 표기 | 잘못된 표기 |
|---|---|---|
| 플랫폼명 | bodoc | BODAK, 보닥 (영문 사용 시) |
| AI 기능 표현 | AI 진단 | AI 분석 |
| 카드 타입 | Concept, Rule 등 | CONCEPT, RULE 등 |
| 카드 ID | PLAYBOOK.LEAD.CONVERT.V1 | playbook.lead.convert.v1 |
| 카드 수 | 7종 | 6+1종 |
| 엔지니어링 팀 | 기술연구소 | 개발팀, R&D |
| 데이터 보호 | 정보보호실 | 보안팀 |
| 보닥 소속 설계사 | 보닥플래너 | — |

---

## 11. 현재 진행 상황 / 이번 주 포커스

> **⬇️ 이 섹션은 매주 업데이트하세요 ⬇️**

### 이번 주 핵심 과제
- [ ] (예: KC Admin MVP v2 갭 분석 정리)
- [ ] (예: Phase 1.5 Fromage 연동 스펙 작성)
- [ ] (예: Clark 프롬프트 엔지니어링 테스트)

### 최근 의사결정 사항
- 2026-04-07 — KC 기획서 v1.4+ 확정: "7종" 용어 통일, CRM 연동 참조 추가, Policy 법적 준수 사항 반영
- (예: 2026-04-03 — Evidence 카드 유형 3→4개 확장 확정)

### 블로커 / 대기 사항
- (예: CTO 후임 채용 진행 중 → 기술연구소 의사결정 지연 가능)

---

## 12. Claude 작업 시 주의사항

### 프로덕트 용어·표기 규칙
- 카드 타입은 항상 첫 글자만 대문자로 표기
- 카드 명시 순서: Concept → Risk-type → Rule → Evidence → Playbook → Policy → Case
- 카드 수는 "7종"으로 표기 ("6+1종" ❌)
- "AI 진단"으로 표현 (AI 분석 ❌)
- Clark 페르소나를 벗어나는 톤 사용하지 않기 (반말, 직접 추천 등)

### Phase 간 경계 준수
- Phase 간 기능을 섞지 않기 (Phase 1에서 Graph RAG 언급 등)
- aGCR v0 단계에서 Product 노드 참조하지 않기
- Amplitude에 건강정보 원본(위험도 수치, 건강검진 원본 등) 적재하지 않기

### KC Admin에서 코드 변경 없이 할 수 있는 것
- 기준값 변경 (예: 암진단금 부족 기준 5천만 → 7천만) → Rule 카드 수정
- 가중치 튜닝 (예: matching 0.4 → 0.5) → Playbook 카드 수정
- 전환 키워드 추가 (예: "보험료 줄일 수 있어?"를 P2 발화로 등록) → Playbook 카드 수정
- Risk-type 신규 추가 (예: "치아보장 공백형") → Clark이 새 유형 진단 시작
- 규제 대응 (예: 1200% 룰) → Policy 카드 추가 + Playbook Margin 고정값 처리
- Clark 멘트 변경 → Rule 카드의 경고 메시지 수정

### 기술연구소 코드 개발이 필요한 것
- 새로운 변수 추가 (PlannerFitScore에 고객 만족도 변수 등)
- 데이터 파이프라인 신규 (Clark 진단-체결 연결 → matching 변수 활성화 전제)
- 새로운 이벤트 수집 (Amplitude 택소노미 이벤트 추가)
- Graph DB 전환 (KC 카드 참조 링크를 실제 그래프로)

---

## 부록: 자주 하는 작업 유형별 프롬프트 가이드

### A. KC 카드 초안 작성
```
이 파일을 참고해서 [카드타입] 카드를 작성해줘.
- 카드 타입: [Concept / Risk-type / Rule / Evidence / Playbook / Policy / Case]
- 대상 보험 영역: [암 / 심혈관 / 뇌혈관 / 갱신 / 가성비]
- 참고 자료: [첨부 파일 또는 URL]
```

### B. 기획서 챕터 작성/수정
```
KC 기획서 Chapter [N]을 작성해줘.
- 챕터 제목: [제목]
- 포함할 내용: [핵심 포인트]
- ⚠️ 기존 챕터 내용은 절대 생략하지 말고, 완전한 독립 문서로 출력해줘.
```

### C. Clark 프롬프트 설계
```
Clark의 [특정 상황] 대화 시나리오를 설계해줘.
- 리스크 도메인: [암 / 심혈관 / 뇌혈관 / 갱신 / 가성비]
- 심각도: [NONE / WATCH / MEDIUM / HIGH / CRITICAL]
- Clark 페르소나 유지: 존댓말, 공감 중심, 가이드형 질문
```

### D. 스펙 문서 작성
```
[기능명] 기능 스펙 문서를 작성해줘.
- 대상 Phase: [1 / 1.5 / 2 / 3]
- 포함 항목: 기능 정의, 데이터 흐름, API 스펙, 엣지 케이스
```

### E. 경쟁사/시장 분석
```
[대상]에 대해 분석해줘.
- bodoc/KC 관점에서 시사점 포함
- 데이터 출처 명시
- 결론에 actionable recommendation 포함
```

### F. 보닥 플랫폼 구조 정의서 수정
```
보닥 플랫폼 구조 정의서의 [섹션]을 수정해줘.
- KC 기획서(v1.4+)와의 정합성 확인 필수
- 수정 이력을 하단 메모에 추가
```

### G. KC Admin 기능 스펙
```
KC Admin의 [화면/기능명]을 스펙 작성해줘.
- 역할별 권한 반영 (Aron/Eric/Dwhy)
- 승인 워크플로우 포함
- KC Admin UI 설계서 v1.2.1 기준
```
