# Team Conventions

## Naming

- 변수명 규칙: camelCase (예: `activeServer`, `channelList`)
- 메서드명 규칙: camelCase (예: `handleChannelClick`, `navigateToServer`)
- 클래스 / 컴포넌트명 규칙: PascalCase (예: `ServerBar`, `EmbedCard`, `WelcomeChannel`)
- 파일명 규칙: 컴포넌트 파일은 PascalCase (`ServerBar.tsx`), 훅은 camelCase (`useActivity.ts`), 상수/유틸은 camelCase (`servers.ts`)
- 폴더명 규칙: PascalCase (컴포넌트 폴더, 예: `ServerBar/`), camelCase (기능 폴더, 예: `discord/`, `home/`, `shared/`)
- 채널 콘텐츠 컴포넌트: `[채널명PascalCase]Channel.tsx` (예: `WelcomeChannel.tsx`, `TeamProjectsChannel.tsx`)
- 축약 금지 여부 및 예외: 축약 지양. 업계 표준 약어(`API`, `URL`, `ID`, `DC`)는 허용

## Code style

- 명시적 타입 사용 규칙: export 함수/컴포넌트 props는 명시적 타입 필수. 지역 변수는 추론 허용
- any 사용 여부: 금지. `unknown` + 타입 가드로 대체
- deprecated API 사용 기준: 사용 금지. react-router-dom v7 최신 API 사용
- 에러 처리 방식: try-catch + unknown 타입 가드. 에러 은닉 금지
- 주석 작성 기준: 한국어 주석. 코드 자체로 명확하지 않은 의도/제약/도메인 지식만 작성. 코드 재설명 주석 금지

## Discord UI 관련 규칙

- CSS 색상 토큰: 반드시 `--dc-*` 커스텀 프로퍼티 사용. 하드코딩(`#202225` 등) 직접 기입 금지
- 패널 구조 고정: ServerBar 72px · ChannelSidebar 240px · ActivityPanel 240px. 임의 변경 금지
- 애니메이션: `framer-motion` 사용. `prefers-reduced-motion` 감지 후 모션 비활성화 처리 필수
- 아이콘: `lucide-react`만 사용. 임의 SVG 인라인 금지
- 서버·채널 구조: `features/discord/constants/servers.ts`가 단일 진실 소스. 채널 추가/제거는 이 파일만 수정

## Responsibility separation

- component 역할: UI 렌더링만. 비즈니스 로직 포함 금지
- hook 역할: 상태 관리, 사이드이펙트, 비동기 처리 캡슐화
- constants 역할: 정적 데이터와 상수값. 로직 없음. `servers.ts`는 서버·채널 구조의 단일 진실 소스
- 채널 콘텐츠 컴포넌트: 해당 채널에서 렌더링할 EmbedCard 목록과 레이아웃만 담당. 데이터는 같은 feature의 constants에서 가져옴
- 레이아웃 인프라(AppShell, ServerBar 등): 특정 서버/채널 콘텐츠를 직접 import하지 않는다. 라우팅이 콘텐츠를 주입

## Review expectations

- 리뷰 시 반드시 확인할 항목:
  - TypeScript 에러 0건
  - ESLint 에러 0건
  - `npm run build` 성공
  - `console.log` 잔류 없음
  - `any` 타입 사용 없음
  - CSS 색상 하드코딩 없음 (반드시 `--dc-*` 토큰 사용)
  - `prefers-reduced-motion` 처리 누락 없음
- 성능 / 보안 관점 체크리스트:
  - 불필요한 리렌더링 없음 (useMemo, useCallback 과도 사용 지양)
  - 외부 데이터 입력 시 검증 처리
- 리뷰에서 block 걸어야 하는 기준: 빌드 실패, TypeScript 에러, 보안 취약점, CSS 하드코딩
