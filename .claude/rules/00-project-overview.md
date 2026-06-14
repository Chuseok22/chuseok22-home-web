# Project Overview

## Purpose

- 이 프로젝트의 목적: 개인 Lab 사이트 — Discord UI 컨셉으로 포트폴리오, 블로그, 개인 유틸 도구를 제공하는 복합 개인 사이트
- 해결하려는 문제: 개발자 소개, 프로젝트 전시, 기술 글 발행, 개인 유틸 도구 운영을 Discord 4패널 레이아웃 안에서 채널 탐색으로 제공
- 주요 사용자 또는 시스템 소비자: 기술 채용 담당자, 개발자 동료, 개인 사용

## Primary Stack

- Language: TypeScript ~5.6 (strict mode, `any` 사용 금지)
- Framework: React 19 + Vite 6
- Runtime: Node.js 22.12.0
- Router: react-router-dom v7 (BrowserRouter). URL 패턴: `/:server/:channel`
- Styling: CSS Modules (`*.module.css`) + 글로벌 `--dc-*` CSS Custom Properties (`src/styles/global.css`)
- Animation: framer-motion (채널 전환, 서버 아이콘 hover, 모바일 스와이프 제스처)
- Icons: lucide-react
- Database / storage: 없음 (정적 콘텐츠 중심, JWT 토큰은 localStorage 사용)
- External API: Python + Django (DRF) 서버 — `api.chuseok22.com` (Swagger UI: `https://api.chuseok22.com/docs/swagger/`, OpenAPI Schema: `https://api.chuseok22.com/api/schema/`)
- Infra / deployment: 개인 NAS 서버에 Docker 컨테이너로 운영, GitHub Actions CI/CD

## Important directories

- `src/app/`: App.tsx (라우팅 최상위 `/:server/:channel`), main.tsx (진입점)
- `src/features/discord/`: Discord UI 레이아웃 인프라 (AppShell, ServerBar, ChannelSidebar, MainContent, ActivityPanel)
- `src/features/discord/constants/servers.ts`: 서버·채널 구조 정의 (단일 진실 소스)
- `src/features/discord/types/discord.ts`: Server, Channel, Category 타입
- `src/features/home/`: Home 서버 채널 콘텐츠 컴포넌트
- `src/features/projects/`: Projects 서버 채널 콘텐츠 컴포넌트
- `src/features/blog/`: Blog 서버 채널 콘텐츠 컴포넌트
- `src/features/lab/`: Lab 서버 채널 콘텐츠 컴포넌트
- `src/features/about/`: About 서버 채널 콘텐츠 컴포넌트
- `src/shared/components/EmbedCard/`: 공통 Discord embed 스타일 카드
- `src/shared/contexts/AuthContext.tsx`: JWT 인증 전역 컨텍스트 (`AuthProvider`, `useAuth`)
- `src/shared/utils/api.ts`: API fetch 헬퍼 (`fetchWithAuth`, `API_BASE_URL`)
- `src/shared/utils/css.ts`: CSS 유틸 (`joinClassNames`)
- `src/styles/global.css`: 전역 CSS (`--dc-*` 토큰 정의)
- `.github/workflows/`: CI/CD 워크플로

## Server & Channel Structure

```
🏠 Home      → /home/welcome (기본 진입)
💼 Projects  → /projects/team-projects
📝 Blog      → /blog/latest-posts
🧪 Lab       → /lab/tools
👤 About     → /about/bio
```

Projects 채널: 팀프로젝트(#team-projects) / 개인프로젝트(#side-projects, #open-source)
Lab 채널: 도구(#tools) / 스터디룸 조회(#study-rooms)

## Main commands

- install: `npm install`
- lint: `npm run lint`
- typecheck: `npx tsc --noEmit`
- build: `npm run build`
- unit-test: 해당 없음
- integration-test: 해당 없음
- e2e-test: `npx playwright test` (도입 예정)
- run-dev: `npm run dev`
- run-prod-like: `npm run preview`

## Project-specific constraints

- 반드시 지켜야 하는 제약:
  - TypeScript strict mode. `any` 타입 사용 절대 금지
  - ESLint 우회 주석 절대 금지 (`// eslint-disable` 계열 주석 사용 금지)
  - React Hooks 규칙 엄수 (`rules-of-hooks`, `exhaustive-deps` 모두 error)
  - `console.log` 코드에 잔류 금지 (최종 코드에서 제거 필수)
  - 신규 외부 패키지 추가 금지 (사용자 승인 필요)
  - `.env`, `.env.local`, `.env.production` 절대 수정 금지
  - CSS 색상 하드코딩 금지 — 반드시 `--dc-*` 커스텀 프로퍼티 사용
  - `git commit`, `push`, PR 생성 금지

- 사용 금지 기술 / 패턴:
  - `any` 타입
  - ESLint 우회 주석 (`// eslint-disable`, `@ts-ignore` 등)
  - Deprecated React 패턴 (클래스 컴포넌트, `componentWillMount` 등)
  - CSS 색상 하드코딩 (`#202225`, `rgb(...)` 등 직접 기입)
  - 임의 SVG 인라인 — lucide-react 아이콘만 허용
  - 조건부 className을 템플릿 리터럴로 조합하는 패턴

- 현재 프로젝트에서 중요하게 보는 품질 기준:
  - 타입 안정성: export 함수/컴포넌트 props에 명시적 타입 필수
  - CSS 일관성: `--dc-*` 토큰 전용 사용, CSS Modules로 컴포넌트 스타일 격리
  - 기존 패턴 재사용 우선: 새 추상화 도입 전 기존 코드 확인 필수
  - 최소 변경 원칙: 요청된 범위 외 수정 금지
  - 빌드 성공 + ESLint 0 errors + TypeScript 에러 없음

## Change policy

- 허용되는 변경:
  - `src/features/[서버명]/` 내부 파일 추가/수정
  - `src/shared/` 변경은 여러 서버에 영향을 주므로 작업 지시에 명시된 경우에만 허용
  - `src/app/App.tsx` 신규 라우트 추가 (작업 범위에 포함된 경우)

- 수정 금지 영역:
  - `.env.production`, `.env.local`
  - `package.json` (의존성 추가/제거는 사용자 승인 필요)
  - `.github/workflows/` (사용자 승인 없이)
  - Docker 관련 설정 (`Dockerfile`, `nginx.conf`)
  - `vite.config.ts`, `tsconfig*.json`, `eslint.config.js` (작업 지시에 명시된 경우에만)
