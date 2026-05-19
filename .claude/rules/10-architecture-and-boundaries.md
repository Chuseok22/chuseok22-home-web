# Architecture And Boundaries

## High-level architecture

- 현재 시스템의 상위 구조: SPA (Single Page Application). Vite로 빌드된 React 앱을 Nginx/Docker로 서빙
- 주요 계층: 라우팅 (App.tsx) → 페이지 (pages/) → 섹션 컴포넌트 (components/) → 공통 컴포넌트 (shared/)
- 외부 시스템 연동: GitHub Actions → DockerHub → 개인 NAS SSH 배포

## Module boundaries

- 각 주요 모듈의 책임:
  - `src/app/`: 라우팅 정의, 앱 진입점. 전역 Provider 위치
  - `src/features/home/`: 홈 페이지 전용 (Hero, Projects, TechStack, Links 섹션)
  - `src/features/[기능]/`: 각 기능 페이지와 전용 컴포넌트
  - `src/shared/`: 기능 경계를 넘어 재사용되는 컴포넌트, 훅, 타입, 상수
  - `src/styles/`: 전역 CSS 변수, 기본 스타일
- 모듈 간 허용 의존 방향: features → shared → styles (단방향)
- 금지 의존 관계: features 간 직접 import 금지 (공통 로직은 shared로 올릴 것)

## Data flow

- 요청/응답 흐름: 현재 정적 데이터 (constants/)만 사용. API 연동 시 features/[기능]/services/ 또는 hooks/ 에서 처리
- 비동기 처리 흐름: 현재 없음. 도입 시 커스텀 훅으로 캡슐화
- 캐시/큐/스토리지 사용 방식: 현재 없음

## File / folder conventions

- 폴더 구조 규칙:
  ```
  src/features/[기능]/
  ├── pages/         # 라우팅 대상 페이지 컴포넌트
  ├── components/    # 해당 기능 전용 컴포넌트 (서브폴더로 분리)
  ├── constants/     # 정적 데이터, 상수
  ├── hooks/         # 해당 기능 전용 커스텀 훅 (필요 시)
  └── types/         # 해당 기능 전용 타입 (필요 시)
  ```
- 새 파일 생성 시 위치 기준: 단일 기능 전용이면 features/[기능]/ 하위, 2개 이상 기능에서 쓰이면 shared/ 하위
- 공통 유틸 / 도메인 로직 / API 계층 분리 기준:
  - 공통 유틸: `src/shared/`
  - 기능별 로직: `src/features/[기능]/`

## Extension points

- 기능 추가 시 먼저 참고해야 하는 패턴: `src/features/home/` 구조를 템플릿으로 참고
- 기존 구현 재사용 포인트: `src/shared/components/`, `src/shared/hooks/`
- 대표적으로 따라야 하는 파일 경로 예시:
  - 페이지: `src/features/home/pages/HomePage.tsx`
  - 섹션 컴포넌트: `src/features/home/components/HeroSection/HeroSection.tsx`
  - 상수 데이터: `src/features/home/constants/projects.ts`
  - 라우트 추가: `src/app/App.tsx`
