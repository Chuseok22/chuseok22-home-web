# Team Conventions

## Naming

- 변수명 규칙: camelCase (예: `techStack`, `projectList`)
- 메서드명 규칙: camelCase (예: `handleClick`, `fetchData`)
- 클래스 / 컴포넌트명 규칙: PascalCase (예: `HeroSection`, `ProjectCard`)
- 파일명 규칙: 컴포넌트 파일은 PascalCase (`HeroSection.tsx`), 훅은 camelCase (`useScrollProgress.ts`), 상수/유틸은 camelCase (`projects.ts`)
- 폴더명 규칙: PascalCase (컴포넌트 폴더, 예: `HeroSection/`), camelCase (기능 폴더, 예: `home/`, `shared/`)
- 축약 금지 여부 및 예외: 축약 지양. `btn` → `button`, `img` → `image`. 업계 표준 약어(`API`, `URL`, `ID`)는 허용

## Code style

- 명시적 타입 사용 규칙: export 함수/컴포넌트 props는 명시적 타입 필수. 지역 변수는 추론 허용
- any 사용 여부: 금지. `unknown` + 타입 가드로 대체
- deprecated API 사용 기준: 사용 금지. react-router-dom v7 최신 API 사용
- 에러 처리 방식: try-catch + unknown 타입 가드. 에러 은닉 금지
- 주석 작성 기준: 한국어 주석. 코드 자체로 명확하지 않은 의도/제약/도메인 지식만 작성. 코드 재설명 주석 금지

## Responsibility separation

- component 역할: UI 렌더링만. 비즈니스 로직은 포함하지 않음
- hook 역할: 상태 관리, 사이드이펙트, 비동기 처리 캡슐화
- constants 역할: 정적 데이터와 상수값. 로직 없음
- 비즈니스 로직 위치 기준: 커스텀 훅 (hooks/) 또는 별도 유틸 함수 (shared/utils/)
- 화면 로직과 데이터 로직 분리 기준: 컴포넌트는 props/훅에서 받은 데이터만 렌더링. 데이터 가공은 훅 또는 유틸에서 처리

## Review expectations

- 리뷰 시 반드시 확인할 항목:
  - TypeScript 에러 0건
  - ESLint 에러 0건
  - `npm run build` 성공
  - `console.log` 잔류 없음
  - `any` 타입 사용 없음
- 성능 / 보안 관점 체크리스트:
  - 불필요한 리렌더링 없음 (useMemo, useCallback 과도 사용 지양)
  - 외부 데이터 입력 시 검증 처리
- 리뷰에서 block 걸어야 하는 기준: 빌드 실패, TypeScript 에러, 보안 취약점
