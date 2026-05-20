# Project Overview

## Purpose

- 이 프로젝트의 목적: 개인 Lab 사이트 — Discord UI 컨셉으로 포트폴리오, 블로그, 개인 유틸 도구를 제공하는 복합 개인 사이트
- 해결하려는 문제: 개발자 소개, 프로젝트 전시, 기술 글 발행, 개인 유틸 도구 운영을 Discord 4패널 레이아웃 안에서 채널 탐색으로 제공
- 주요 사용자 또는 시스템 소비자: 기술 채용 담당자, 개발자 동료, 개인 사용

## Primary Stack

- Language: TypeScript ~5.6
- Framework: React 19 + Vite 6
- Runtime: Node.js 22.12.0
- Router: react-router-dom v7 (BrowserRouter). URL 패턴: `/:server/:channel`
- Animation: framer-motion (채널 전환, 서버 아이콘 hover, 모바일 스와이프 제스처)
- Icons: lucide-react
- Database / storage: 없음 (정적 콘텐츠 중심)
- External API: Spring Boot 서버 예정 — `api.chuseok22.com` (Swagger: `https://api.chuseok22.com/docs/swagger/index.html`)
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
- `src/styles/`: 글로벌 CSS (`--dc-*` 토큰 정의)
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

- 반드시 지켜야 하는 제약: 새 의존성 추가 시 사용자 승인 필수
- 사용 금지 기술 / 패턴: `any` 타입 사용 금지, `console.log` 프로덕션 코드 잔류 금지, CSS 색상 하드코딩 금지
- 현재 프로젝트에서 중요하게 보는 품질 기준: 빌드 성공 + ESLint 0 errors + TypeScript 에러 없음

## Change policy

- 어떤 변경은 허용되고 어떤 변경은 금지되는지: 기능 구현, 컴포넌트 추가, 스타일 수정 허용
- 지금 레포에서 수정해도 되는 범위: src/ 전체, index.html, public/
- 절대 건드리면 안 되는 영역: .env.production, .github/workflows/ (사용자 승인 없이), Docker 관련 설정
