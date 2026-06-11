# AGENTS.md — chuseok22-home-web

Project-level rules for Codex. These override global rules on conflicts.

## Project Overview

- **Stack**: TypeScript + React 19 + Vite 6 + react-router-dom v7 + framer-motion + lucide-react
- **Target**: 개인 Lab 사이트 — Discord UI 컨셉. 포트폴리오, 블로그, 유틸 도구를 Discord 4패널 레이아웃으로 제공
- **Routing**: BrowserRouter + react-router-dom v7. URL 패턴: `/:server/:channel`
- **Architecture**: Feature-based module structure. `src/features/discord/`가 레이아웃 인프라를 담당

## Core Policy

- Follow existing patterns before introducing anything new.
- Scope changes to the affected feature only.
- Never touch shared infrastructure unless the task explicitly requires it.
- Verify real behavior before marking anything as complete.
- Structure UI components to favor maintainability and reusability.
- Split components by feature and responsibility, but avoid excessive fragmentation that creates too many files without clear value.

## UI Design Rules

- **DESIGN.md를 반드시 참고할 것**: UI 컴포넌트 작성, 스타일 수정, 레이아웃 구성 등 모든 UI 관련 작업 시 `DESIGN.md`를 먼저 읽고 그 내용을 따른다. 예외 없음.
- DESIGN.md에 정의된 `--dc-*` 색상 토큰만 사용한다. CSS 색상 하드코딩 금지.
- Discord 4패널 레이아웃 구조(ServerBar · ChannelSidebar · MainContent · ActivityPanel)를 임의로 변경하지 않는다.
- DESIGN.md에 명시되지 않은 UI 패턴이 필요한 경우, 임의로 결정하지 말고 사용자에게 확인 후 DESIGN.md를 먼저 업데이트한다.
- 애니메이션은 `framer-motion`을 사용한다. `prefers-reduced-motion` 적용 필수.
- 아이콘은 `lucide-react`를 사용한다. 임의 SVG 인라인 금지.

## External API (예정)

- **API 서버**: Spring Boot 기반, 도메인 `api.chuseok22.com`
- **Swagger UI**: `https://api.chuseok22.com/docs/swagger/index.html`
- **Swagger Docs (OpenAPI)**: `https://api.chuseok22.com/v3/api-docs`
- API 연동 구현 시: 커스텀 훅(`features/discord/hooks/useActivity.ts` 등)으로 캡슐화. 직접 fetch는 컴포넌트에 두지 않는다.

## Reference Docs

- If a reference doc conflicts with the current repository code, follow the current repository code and report that the doc should be updated.

## Hard Rules

- No changes to `.env`, `.env.local`, `.env.production`.
- No new dependencies without user approval.
- No modifications outside the confirmed plan scope.
