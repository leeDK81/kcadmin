# KC Admin — 새 PC에서 작업 시작하기

> `CLAUDE.md`에서 분리된 섹션(2026-07-27). 새 PC 셋업할 때만 필요한 내용이라 매 세션 로드되는 `CLAUDE.md`에서 빼고 여기 둔다.

## 사전 설치 (최초 1회)

```
1. Node.js 18+ 설치  →  https://nodejs.org
2. Vercel CLI 설치   →  npm install -g vercel
3. Git 설치          →  https://git-scm.com
4. Claude Code 설치  →  npm install -g @anthropic-ai/claude-code
```

## 프로젝트 복원 — 방법 A: 폴더 직접 복사 (권장, 커밋 안 된 작업까지 그대로 이어감)

USB·외장SSD·클라우드 동기화 등으로 `KC_Admin` 폴더 전체를 새 PC로 복사한다.

- **`.git/`·`.vercel/` 폴더도 함께 복사할 것** — `.vercel/`은 `.gitignore`에 등록돼 있어 GitHub에는 안 올라가지만, 폴더째 복사하면 그대로 따라와서 **`vercel link`를 새로 할 필요가 없다** (Vercel 계정 재인증만 하면 됨).
- **`git commit`을 안 했어도 상관없다** — 폴더 복사는 디스크에 있는 파일을 그대로 옮기는 것이라 작업 중이던 내용까지 전부 이어진다.
- 복사 전 용량을 줄이고 싶다면 아래 두 폴더는 빼고 복사해도 무방(둘 다 재생성 가능, 프로젝트 파일 아님): `Data/node_modules/`(약 34MB, npm install로 재설치 가능), `.git/`(약 17MB, 이력 없이 시작해도 되면 제외 — 단, 이후 GitHub push 이력 연속성이 필요하면 반드시 포함)
- 복사 후 새 PC에서 `npm install -g vercel`·Claude Code 설치만 하면 바로 이어서 작업 가능. `vercel login`은 새 PC에서 1회 필요.

## 프로젝트 복원 — 방법 B: GitHub에서 새로 clone (커밋된 내용까지만 필요할 때)

```bash
git clone https://github.com/leeDK81/kcadmin.git KC_Admin
cd KC_Admin
```

> 주의: 이 방법은 **마지막 push 시점까지만** 복원된다. 커밋 안 하고 작업 중이던 내용은 포함되지 않으므로, 이어서 작업할 uncommitted 변경사항이 있다면 방법 A(폴더 복사)를 쓸 것.

## Vercel 연결

```bash
vercel login
vercel link   # 프로젝트 선택: kris-2792s-projects/kcadmin (방법 B로 clone한 경우에만 필요 — 방법 A는 .vercel/ 폴더가 이미 있어서 생략)
```

## 작업 → 배포 루틴

```bash
git add <파일>
git commit -m "..."
git push origin master

# alias 갱신 (push마다 실행)
vercel ls --scope kris-2792s-projects
vercel alias set <최신배포URL>.vercel.app kc-admin-v2.vercel.app
```

## 배포 URL

| 구분 | URL |
|---|---|
| 고정 alias | https://kc-admin-v2.vercel.app/mockups_v2/ |
| GitHub | https://github.com/leeDK81/kcadmin |
