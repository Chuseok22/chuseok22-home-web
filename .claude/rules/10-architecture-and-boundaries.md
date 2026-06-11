# Architecture And Boundaries

## High-level architecture

- 현재 시스템의 상위 구조:
  ```
  React 19 SPA (BrowserRouter)
    └── App.tsx  /:server/:channel 라우팅
          ├── features/discord/   Discord 4패널 레이아웃 인프라
          ├── features/[서버명]/  채널 콘텐츠 (home | projects | blog | lab | about)
          ├── shared/             공통 컴포넌트, 컨텍스트, 유틸, 타입
          └── styles/             글로벌 CSS (--dc-* 토큰)
  ```

- 주요 계층:
  ```
  라우팅 (App.tsx, /:server/:channel)
      ↓ route 매칭
  Discord AppShell (4패널 레이아웃)
      ↓ MainContent 영역에 주입
  채널 콘텐츠 컴포넌트 ([채널명]Channel.tsx)
      ↓ 정적 데이터 참조
  constants/ (해당 feature의 정적 데이터)
  ```

- 외부 시스템 연동:
  - GitHub Actions → DockerHub → 개인 NAS SSH 배포
  - API 서버: Python + Django (DRF) 기반 `api.chuseok22.com`. 모든 요청은 `shared/utils/api.ts`의 `fetchWithAuth()`를 통해 처리. 커스텀 훅은 `features/[서버]/[도메인]/hooks/` 하위에 위치

## Module boundaries

- 각 주요 모듈의 책임:

  **`src/app/`**
  - 라우팅 정의 (`/:server/:channel`), 앱 진입점, 전역 Provider
  - `App.tsx`: 서버별 라우트 분기, 기본 진입점 리다이렉트 (`/` → `/home/welcome`)

  **`src/features/discord/`**
  - Discord UI 레이아웃 인프라 전담. AppShell, ServerBar, ChannelSidebar, MainContent, ActivityPanel
  - `constants/servers.ts`: 서버·채널 구조 전체 정의 (단일 진실 소스)
  - `types/discord.ts`: Server, Channel, Category, ActivityItem 타입 정의
  - 특정 서버 콘텐츠를 직접 import하지 않는다 — 라우팅이 콘텐츠를 주입

  **`src/features/[서버명]/`** (home | projects | blog | lab | about)
  - 해당 서버의 채널 콘텐츠 컴포넌트만 담당
  - `components/`: `[채널명]Channel.tsx` 형태의 채널 콘텐츠 컴포넌트
  - `constants/`: 해당 서버에서 렌더링하는 정적 데이터 (카드 목록 등)
  - 다른 서버 feature를 직접 import 금지

  **`src/shared/`**
  - 기능 경계를 넘어 2개 이상 feature에서 재사용되는 코드만 위치
  - `components/EmbedCard/`: 공통 Discord embed 스타일 카드
  - `components/TechTag/`: 기술 태그 배지 컴포넌트
  - `components/ChannelSection/`: 채널 섹션 레이아웃 컴포넌트
  - `contexts/AuthContext.tsx`: JWT 인증 전역 컨텍스트. `AuthProvider`(default) + `useAuth`(named)
  - `utils/api.ts`: API fetch 헬퍼. `fetchWithAuth()` — Bearer 헤더 자동 첨부
  - `utils/css.ts`: CSS 유틸. `joinClassNames()` — falsy 값 제외 className 결합
  - `types/`: 공통 타입 (필요 시)

  **`src/styles/`**
  - `global.css`: `--dc-*` CSS Custom Property 전체 정의. DESIGN.md 기반. 여기서만 색상 값 정의

- 모듈 간 허용 의존 방향 (단방향):
  ```
  features/[서버명] → features/discord (레이아웃 타입 참조 시)
  features/[서버명] → shared
  features/discord  → shared
  shared            → styles (CSS 변수 참조)
  ```

- 금지 의존 관계:
  - `shared/` → `features/` 참조 금지 (역방향)
  - `features/[A]` → `features/[B]` 직접 import 금지 (공통 로직은 shared로 올릴 것)
  - `features/discord`는 특정 서버 채널 콘텐츠를 직접 import하지 않는다

## Data flow

- 정적 데이터 흐름 (현재):
  ```
  constants/servers.ts (서버·채널 구조)
      ↓ import
  features/discord/components/ (ServerBar, ChannelSidebar — 탐색 UI)

  features/[서버명]/constants/ (카드·콘텐츠 데이터)
      ↓ import
  features/[서버명]/components/[채널명]Channel.tsx (렌더링)
  ```

- URL → 콘텐츠 흐름:
  ```
  브라우저 URL (/:server/:channel)
      ↓ BrowserRouter 매칭
  App.tsx 라우트 분기
      ↓ 컴포넌트 주입
  Discord AppShell > MainContent
      ↓ children 렌더
  [채널명]Channel.tsx
  ```

- 비동기 처리 흐름:
  ```
  fetchWithAuth(path)                  ← shared/utils/api.ts (Bearer 헤더 자동 첨부)
      ↓ useEffect + AbortController
  features/[서버]/[도메인]/hooks/use*.ts  ← API 커스텀 훅 (상태 관리, 에러 처리)
      ↓ { data, isLoading, error }
  [채널명]Channel.tsx                   ← UI 렌더링 (API 훅 소비)
  ```
  - 401 응답: 훅에서 `error = 'UNAUTHORIZED'`로 반환 → 컴포넌트의 `useEffect`에서 `logout()` 호출
- 스토리지 사용 방식:
  - JWT access token: `localStorage.sejong_access_token` (AuthProvider가 자동 동기화)
  - JWT refresh token: `localStorage.sejong_refresh_token`
  - 컴포넌트/훅에서 localStorage 직접 접근 금지 — `useAuth()` 훅 사용

## File / folder conventions

- 폴더 구조 규칙:
  ```
  src/features/discord/
  ├── components/
  │   ├── AppShell/
  │   │   ├── AppShell.tsx
  │   │   └── AppShell.module.css
  │   ├── ServerBar/
  │   │   ├── ServerBar.tsx
  │   │   └── ServerBar.module.css
  │   ├── ChannelSidebar/
  │   │   ├── ChannelSidebar.tsx
  │   │   └── ChannelSidebar.module.css
  │   ├── MainContent/
  │   │   ├── MainContent.tsx
  │   │   └── MainContent.module.css
  │   └── ActivityPanel/
  │       ├── ActivityPanel.tsx
  │       └── ActivityPanel.module.css
  ├── constants/
  │   └── servers.ts
  └── types/
      └── discord.ts

  src/features/[서버명]/          # home | projects | blog | lab | about
  ├── components/
  │   ├── [채널명]Channel.tsx
  │   └── [채널명]Channel.module.css  (스타일이 필요한 경우)
  ├── constants/
  │   └── [서버명].ts              # 해당 서버의 정적 카드 데이터
  └── [도메인]/                    # API 연동이 필요한 기능 도메인 (예: lab/library/)
      ├── components/
      │   └── [채널명]Channel.tsx
      ├── hooks/
      │   └── use[도메인명].ts     # API 커스텀 훅
      └── types/
          └── [도메인명].ts        # API 응답 타입

  src/shared/
  ├── components/
  │   ├── EmbedCard/
  │   │   ├── EmbedCard.tsx
  │   │   └── EmbedCard.module.css
  │   ├── TechTag/
  │   │   ├── TechTag.tsx
  │   │   └── TechTag.module.css
  │   └── ChannelSection/
  │       ├── ChannelSection.tsx
  │       └── ChannelSection.module.css
  ├── contexts/
  │   └── AuthContext.tsx          # AuthProvider + useAuth
  └── utils/
      ├── api.ts                   # fetchWithAuth, API_BASE_URL
      └── css.ts                   # joinClassNames 유틸

  src/styles/
  └── global.css                   # --dc-* 토큰 전체 정의
  ```

- 새 파일 생성 시 위치 기준:
  - 특정 서버 전용 → `features/[서버명]/` 하위
  - 2개 이상 서버에서 공통으로 사용 → `shared/` 하위
  - 라우트 추가 → `src/app/App.tsx`
  - CSS 색상·토큰 추가 → `src/styles/global.css` + `DESIGN.md` 동시 업데이트

- 파일 명명 규칙:
  - 컴포넌트 파일: `PascalCase.tsx` (예: `WelcomeChannel.tsx`, `EmbedCard.tsx`)
  - CSS Modules 파일: `PascalCase.module.css` — 반드시 컴포넌트 파일과 동일 폴더에 위치
  - 훅 파일: `useCamelCase.ts` (예: `useReducedMotion.ts`)
  - 상수/유틸 파일: `camelCase.ts` (예: `servers.ts`, `css.ts`)
  - 채널 콘텐츠 컴포넌트: `[채널명PascalCase]Channel.tsx` (예: `WelcomeChannel.tsx`, `TeamProjectsChannel.tsx`)

## Extension points

- 새 서버 추가 시:
  1. `features/discord/constants/servers.ts`에 서버 정의 추가
  2. `src/features/[서버명]/` 디렉토리 생성
  3. `src/app/ChannelRouter.tsx`의 `channelComponents`에 서버 키와 채널 맵핑 추가

- 새 채널 추가 시:
  1. `servers.ts`에 채널 정의 추가
  2. 해당 feature에 `[채널명]Channel.tsx` 컴포넌트 생성
  3. `src/app/ChannelRouter.tsx`의 `channelComponents` 맵에 채널 추가

- 새 도메인(API 연동 기능) 추가 시:
  1. `features/[서버명]/[도메인명]/` 디렉토리 생성
  2. `types/`, `hooks/`, `components/` 하위 구조로 구성
  3. `servers.ts`에 채널 정의 추가
  4. `ChannelRouter.tsx`에 매핑 추가

- 기존 구현 재사용 포인트:
  - 공통 카드: `src/shared/components/EmbedCard/EmbedCard.tsx`
  - 기술 태그: `src/shared/components/TechTag/TechTag.tsx`
  - 채널 섹션 레이아웃: `src/shared/components/ChannelSection/ChannelSection.tsx`
  - className 조합: `src/shared/utils/css.ts`의 `joinClassNames()`
  - API fetch: `src/shared/utils/api.ts`의 `fetchWithAuth()`
  - 인증 상태: `src/shared/contexts/AuthContext.tsx`의 `useAuth()`
  - 모션 감지: `framer-motion`의 `useReducedMotion()` (별도 파일 없음)

- 대표적으로 따라야 하는 파일 경로 예시:
  - 레이아웃: `src/features/discord/components/AppShell/AppShell.tsx`
  - 서버·채널 구조: `src/features/discord/constants/servers.ts`
  - 채널 콘텐츠: `src/features/home/components/WelcomeChannel.tsx`
  - 공통 카드: `src/shared/components/EmbedCard/EmbedCard.tsx`
  - 라우트: `src/app/App.tsx`
  - 글로벌 CSS 토큰: `src/styles/global.css`
