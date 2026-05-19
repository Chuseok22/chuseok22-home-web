# Architecture And Boundaries

## High-level architecture

- 현재 시스템의 상위 구조: SPA (Single Page Application). Discord 4패널 레이아웃을 React로 구현. Vite로 빌드, Nginx/Docker로 서빙
- 주요 계층: 라우팅 (App.tsx, `/:server/:channel`) → Discord AppShell (4패널) → 채널 콘텐츠 (features/[서버명]) → 공통 컴포넌트 (shared/)
- 외부 시스템 연동: GitHub Actions → DockerHub → 개인 NAS SSH 배포

## Module boundaries

- 각 주요 모듈의 책임:
  - `src/app/`: 라우팅 정의 (`/:server/:channel`), 앱 진입점, 전역 Provider
  - `src/features/discord/`: Discord UI 레이아웃 인프라. AppShell, ServerBar, ChannelSidebar, MainContent, ActivityPanel 컴포넌트. 서버·채널 구조 상수(`constants/servers.ts`), 타입(`types/discord.ts`) 포함
  - `src/features/home/`: Home 서버의 채널 콘텐츠 컴포넌트 (welcome, about-me, skills 등)
  - `src/features/projects/`: Projects 서버의 채널 콘텐츠 (team-projects, side-projects, open-source)
  - `src/features/blog/`: Blog 서버의 채널 콘텐츠
  - `src/features/lab/`: Lab 서버의 채널 콘텐츠
  - `src/features/about/`: About 서버의 채널 콘텐츠
  - `src/shared/`: 기능 경계를 넘어 재사용되는 컴포넌트 (EmbedCard 등), 훅, 타입, 상수
  - `src/styles/`: 전역 CSS — `--dc-*` 토큰 정의 (DESIGN.md 기반)
- 모듈 간 허용 의존 방향: `features/[서버]` → `features/discord` → `shared` → `styles` (단방향)
- 금지 의존 관계: features 간 직접 import 금지 (공통 로직은 shared로 올릴 것). `features/discord`는 특정 서버 콘텐츠를 직접 import하지 않는다 — 라우팅으로 주입

## Data flow

- 요청/응답 흐름: 현재 정적 데이터 (constants/)만 사용. 서버·채널 구조는 `features/discord/constants/servers.ts`가 단일 진실 소스
- 활동 패널: 초기 정적 데이터. 추후 GitHub API 연동 시 `features/discord/hooks/useActivity.ts`로 캡슐화
- 비동기 처리 흐름: 현재 없음. 도입 시 커스텀 훅으로 캡슐화
- 캐시/큐/스토리지 사용 방식: 현재 없음

## File / folder conventions

- 폴더 구조 규칙:
  ```
  src/features/discord/
  ├── components/
  │   ├── AppShell/          # 4패널 레이아웃 래퍼
  │   ├── ServerBar/         # 왼쪽 서버 아이콘 바 (72px)
  │   ├── ChannelSidebar/    # 채널 목록 패널 (240px)
  │   ├── MainContent/       # 메인 콘텐츠 래퍼
  │   └── ActivityPanel/     # 오른쪽 활동 피드 (240px)
  ├── constants/
  │   └── servers.ts         # 서버·채널 구조 정의 (단일 진실 소스)
  └── types/
      └── discord.ts         # Server, Channel, Category, ActivityItem 타입

  src/features/[서버명]/       # home | projects | blog | lab | about
  ├── components/             # 해당 서버의 채널 콘텐츠 컴포넌트
  └── constants/              # 해당 서버의 정적 데이터

  src/shared/components/
  └── EmbedCard/              # Discord embed 스타일 카드 (모든 feature 공용)
  ```
- 새 파일 생성 시 위치 기준: 특정 서버 전용이면 `features/[서버명]/` 하위, 2개 이상 서버에서 쓰이면 `shared/` 하위
- 채널 콘텐츠 컴포넌트 명명: `[채널명]Channel.tsx` (예: `WelcomeChannel.tsx`, `TeamProjectsChannel.tsx`)

## Extension points

- 새 서버 추가 시: `features/discord/constants/servers.ts`에 서버 정의 추가 → `src/features/[서버명]/` 디렉토리 생성 → App.tsx 라우트 추가
- 새 채널 추가 시: `servers.ts`에 채널 정의 추가 → 해당 feature에 채널 콘텐츠 컴포넌트 생성
- 기존 구현 재사용 포인트: `src/shared/components/EmbedCard/`, `src/shared/hooks/`
- 대표적으로 따라야 하는 파일 경로 예시:
  - 레이아웃: `src/features/discord/components/AppShell/AppShell.tsx`
  - 서버·채널 구조: `src/features/discord/constants/servers.ts`
  - 채널 콘텐츠: `src/features/home/components/WelcomeChannel.tsx`
  - 공통 카드: `src/shared/components/EmbedCard/EmbedCard.tsx`
  - 라우트: `src/app/App.tsx`
