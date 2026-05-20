# Team Conventions

## Naming

- 변수명 규칙:
  - `camelCase` 사용
  - 불리언: `is`, `has`, `can`, `should` prefix (예: `isActive`, `hasError`, `canNavigate`)
  - 이벤트 핸들러: `handle` prefix (예: `handleChannelClick`, `handleServerSelect`)
  - 상수(모듈 레벨 불변값): `UPPER_SNAKE_CASE` (예: `DEFAULT_SERVER`, `PANEL_WIDTH`)
  - 불명확한 약어 사용 금지 (예: `tmp`, `val`, `cb` → `value`, `callback` 사용)

- 메서드명 규칙:
  - `camelCase` 사용
  - 이벤트 핸들러: `handle` prefix (예: `handleChannelClick`, `navigateToServer`)
  - 훅: `use` prefix (예: `useReducedMotion`, `useActivity`)

- 클래스 / 컴포넌트명 규칙: `PascalCase` (예: `ServerBar`, `EmbedCard`, `WelcomeChannel`)

- 파일명 규칙:
  - 컴포넌트 파일: `PascalCase.tsx` (예: `ServerBar.tsx`)
  - CSS Modules 파일: `PascalCase.module.css` (예: `ServerBar.module.css`) — 컴포넌트와 동일 폴더
  - 훅 파일: `useCamelCase.ts` (예: `useReducedMotion.ts`)
  - 상수/유틸 파일: `camelCase.ts` (예: `servers.ts`, `css.ts`)

- 폴더명 규칙:
  - 컴포넌트 폴더: `PascalCase` (예: `ServerBar/`, `EmbedCard/`)
  - 기능 폴더: `camelCase` (예: `discord/`, `home/`, `shared/`)

- 채널 콘텐츠 컴포넌트: `[채널명PascalCase]Channel.tsx` (예: `WelcomeChannel.tsx`, `TeamProjectsChannel.tsx`)

- 축약 금지 여부 및 예외: 축약 지양. 업계 표준 약어(`API`, `URL`, `ID`, `DC`)는 허용

## Code style

- 명시적 타입 사용 규칙:
  - 함수 반환 타입: 명시 권장. export 함수/훅은 반드시 명시
  - 함수 파라미터: 반드시 타입 명시
  - 변수 타입 추론: 명확한 경우 생략 허용 (`const count = 0` → number 추론 명확하므로 OK)
  - 컴포넌트 props: 별도 `interface [ComponentName]Props` 선언 후 사용 (인라인 타입 지양)
  - 타입 단언(`as`) 최소화. 불가피한 경우 한 줄 한국어 주석으로 이유 설명

- any 사용 여부: **절대 금지**. `unknown` + 타입 가드로 대체

- deprecated API 사용 기준: 사용 금지. react-router-dom v7 최신 API 사용

- 에러 처리 방식: try-catch + unknown 타입 가드. 에러 은닉 금지

- 주석 작성 기준 (한국어 작성):
  - 코드를 그대로 재서술하는 주석 금지
  - 작성 대상: 비자명한 조건 분기 이유, 외부 시스템 연동 제약, 도메인 의도
  - `console.log` 최종 코드에 잔류 금지

- 코드 구조 규칙:
  - 한 함수 = 한 책임. 함수가 여러 일을 하면 분리
  - 조기 반환(early return) 패턴 선호 → 중첩 if 최소화
  - 컴포넌트 내부 JSX는 가능한 단순하게. 복잡한 조건 로직은 변수나 함수로 분리
  - 컴포넌트 파일 내 `export default` 하나. named export는 타입/상수에만 사용

## CSS 규칙

### CSS Custom Properties (토큰) — 필수

모든 색상은 `src/styles/global.css`에 정의된 `--dc-*` 커스텀 프로퍼티만 사용한다.

```css
/* 올바른 사용 */
background: var(--dc-bg-secondary);
color: var(--dc-text-header);
border-left: 4px solid var(--dc-brand);

/* 금지 — 하드코딩 */
background: #2f3136;
color: #ffffff;
```

새 색상이 필요한 경우: 임의로 추가하지 않고 `DESIGN.md`를 먼저 업데이트한 후 `global.css`에 토큰을 추가한다.

### CSS Modules — 컴포넌트 스타일 격리

컴포넌트 스타일은 반드시 CSS Modules(`*.module.css`)를 사용한다.

- CSS 파일은 컴포넌트 파일과 반드시 동일 폴더에 위치
- 파일명은 컴포넌트명과 동일: `ComponentName.module.css`
- 전역 스타일(리셋, 토큰, 타이포그래피 기반)만 `src/styles/global.css`에 작성

```
ServerBar/
├── ServerBar.tsx
└── ServerBar.module.css   ← 반드시 동일 폴더
```

### 조건부 className — 템플릿 리터럴 금지

조건에 따라 여러 CSS Modules 클래스를 조합할 때 템플릿 리터럴 방식을 사용하지 않는다.  
`src/shared/utils/css.ts`의 `joinClassNames()`를 사용한다.

```tsx
// 금지 — 템플릿 리터럴
className={`${styles.channelItem} ${isActive ? styles.channelItemActive : ''}`}

// 올바른 사용 — joinClassNames
import { joinClassNames } from '@/shared/utils/css';

className={joinClassNames(styles.channelItem, isActive && styles.channelItemActive)}
```

`joinClassNames` 구현 (falsy 값은 자동으로 제외):

```ts
// src/shared/utils/css.ts
export function joinClassNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

### `data-*` 어트리뷰트 — boolean 상태 분기

불리언 상태에 따라 스타일이 달라지는 경우, modifier 클래스 대신 `data-*` 어트리뷰트 셀렉터를 사용한다.

```tsx
// 금지 — modifier 클래스 방식
className={joinClassNames(styles.channelItem, isActive && styles.channelItemActive)}

// 올바른 사용 — data-* 어트리뷰트
<button
  className={styles.channelItem}
  data-active={isActive}
>
```

```css
/* CSS Modules 파일 */
.channelItem {
  color: var(--dc-text-muted);
  background: transparent;
}

/* data-* 셀렉터로 상태 분기 */
.channelItem[data-active="true"] {
  background: var(--dc-bg-secondary-alt);
  color: var(--dc-text-header);
}
```

**적용 기준**: 단순 상태 분기(활성/비활성, 선택됨/선택 안됨)에만 적용.  
완전히 다른 레이아웃이 필요한 경우(`joinClassNames` + 별도 클래스)도 허용.

### CSS 단위

`px`를 기본 단위로 사용한다 (현재 프로젝트 전체 일관성 기준).  
Discord UI 스펙 수치(패널 너비, 패딩, 폰트 크기 등)는 DESIGN.md의 값을 그대로 따른다.

```css
/* 올바른 사용 */
font-size: 14px;
padding: 6px 8px;
width: 240px;

/* 금지 — rem 혼용 */
font-size: 0.875rem;
```

### 애니메이션

- `framer-motion`만 사용. CSS animation/transition은 hover 효과처럼 단순한 것에만 허용
- `prefers-reduced-motion` 적용 필수. `useReducedMotion()` 훅으로 모션 비활성화 처리
- 컴포지터 친화적 속성만 애니메이션: `transform`, `opacity`. `width`, `height`, `top`, `left` 등 레이아웃 속성 애니메이션 금지

```tsx
// prefers-reduced-motion 처리 패턴
const shouldReduceMotion = useReducedMotion();

<motion.div
  animate={{ opacity: 1, y: 0 }}
  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.15 }}
/>
```

### 아이콘

`lucide-react`만 사용한다. 임의 SVG 인라인 금지. DESIGN.md의 아이콘 매핑 표를 따른다.

## Discord UI 관련 규칙

- 패널 구조 고정: ServerBar 72px · ChannelSidebar 240px · ActivityPanel 240px. 임의 변경 금지
- 서버·채널 구조: `features/discord/constants/servers.ts`가 단일 진실 소스. 채널 추가/제거는 이 파일만 수정
- 정의되지 않은 UI 패턴이 필요한 경우: 임의 구현 금지. `DESIGN.md`를 먼저 업데이트 후 진행

## Responsibility separation

| 계층 | 위치 | 역할 | 금지 사항 |
|------|------|------|-----------|
| **component** | `features/[서버]/components/` | UI 렌더링, 사용자 인터랙션 처리 | 비즈니스 로직, 직접 데이터 변환 |
| **hook** | `features/discord/hooks/`, `shared/hooks/` | 상태 관리, 사이드이펙트, 비동기 처리 캡슐화 | UI 렌더링, JSX 반환 |
| **constants** | `features/[서버]/constants/`, `features/discord/constants/` | 정적 데이터와 상수값 | 로직 없음 |
| **util** | `shared/utils/` | 순수 함수. 입력 → 출력. 부수효과 없음 | React import, 상태 변경 |
| **types** | `features/discord/types/`, `shared/types/` | 타입 선언만 | 로직 없음 |

- 채널 콘텐츠 컴포넌트: 해당 채널에서 렌더링할 EmbedCard 목록과 레이아웃만 담당. 데이터는 같은 feature의 constants에서 가져옴
- 레이아웃 인프라(AppShell, ServerBar 등): 특정 서버/채널 콘텐츠를 직접 import하지 않는다. 라우팅이 콘텐츠를 주입

## Review expectations

- 리뷰 시 반드시 확인할 항목 (하나라도 해당하면 block):
  - `any` 타입 사용 → 즉시 block
  - ESLint 우회 주석 존재 → 즉시 block
  - `console.log` 잔류 → block
  - CSS 색상 하드코딩 (`#`, `rgb()`, `hsl()` 등 `--dc-*` 미사용) → block
  - 템플릿 리터럴을 사용한 조건부 className 조합 → block
  - `prefers-reduced-motion` 처리 누락 (framer-motion 사용 시) → block
  - 임의 SVG 인라인 아이콘 → block
  - TypeScript 에러 → block
  - ESLint 에러 → block
  - `npm run build` 실패 → block
  - features 간 직접 cross-import → block
  - `shared/` → `features/` 역방향 import → block

- 성능 / 보안 관점 체크리스트:
  - 불필요한 리렌더링 없음 (useMemo, useCallback 과도 사용도 지양)
  - 외부 데이터 입력 시 검증 처리
  - `dangerouslySetInnerHTML` 사용 금지 (XSS 위험)

- 리뷰 PASS 기준:
  - TypeScript 에러 0건
  - ESLint 에러 0건
  - `npm run build` 성공
  - 위 block 항목 해당 없음
