# Discord UI 컨셉 — chuseok22-home-web 디자인 스펙

## 개요

개인 Lab 사이트를 Discord 데스크탑 앱과 최대한 동일한 UI/UX로 재설계한다.
단순 포트폴리오 레이아웃 대신 Discord 특유의 3~4패널 구조, 채널 기반 내비게이션,
Discord 색상 시스템을 그대로 적용하여 강한 개발자 정체성을 드러내는 사이트를 구축한다.

---

## 1. 설계 동기

- 기존 Coinbase 스타일(흰 배경, 파란 단색)은 일반적인 포트폴리오와 차별점이 없음
- Discord UI는 기술 채용 담당자와 개발자 동료에게 강한 인상을 남기며, Lab·Blog 등 다양한 콘텐츠 유형을 채널 구조로 자연스럽게 담을 수 있음
- 기술적으로 React + CSS로 완전 구현 가능

---

## 2. 색상 시스템 (Discord 원본)

| 토큰 | 값 | 용도 |
|------|----|------|
| `--dc-bg-tertiary` | `#202225` | 서버 아이콘 바, 최상위 배경 |
| `--dc-bg-secondary` | `#2f3136` | 채널 사이드바, 활동 패널 |
| `--dc-bg-primary` | `#36393f` | 메인 콘텐츠 배경 |
| `--dc-bg-secondary-alt` | `#393c43` | hover 상태, 활성 채널 배경 |
| `--dc-bg-floating` | `#18191c` | 툴팁, 드롭다운 |
| `--dc-brand` | `#5865f2` | Blurple — 활성 서버, 강조, CTA |
| `--dc-brand-hover` | `#4752c4` | Blurple hover |
| `--dc-green` | `#3ba55c` | 온라인 상태, 성공, 활성 프로젝트 |
| `--dc-red` | `#ed4245` | 에러, 삭제, 위험 |
| `--dc-yellow` | `#faa81a` | 경고, WIP 상태 |
| `--dc-text-normal` | `#dcddde` | 일반 텍스트 |
| `--dc-text-muted` | `#8e9297` | 채널명, 서브텍스트 |
| `--dc-text-link` | `#00b0f4` | 임베드 제목 링크 |
| `--dc-text-header` | `#ffffff` | 서버명, 주요 헤딩 |
| `--dc-interactive-muted` | `#4f545c` | 비활성 아이콘 |
| `--dc-interactive-normal` | `#b9bbbe` | 기본 아이콘 |
| `--dc-interactive-active` | `#dcddde` | hover 아이콘 |
| `--dc-channeltextarea` | `#40444b` | 구분선, 카드 테두리 |
| `--dc-divider` | `#26282c` | 패널 간 구분선 |

폰트: `'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif`

---

## 3. 레이아웃 구조

### 데스크탑 (≥ 768px)

```
┌──────────────────────────────────────────────────────────────────┐
│ ServerBar(72px) │ ChannelSidebar(240px) │ MainContent │ ActivityPanel(240px) │
└──────────────────────────────────────────────────────────────────┘
```

- **ServerBar** (72px, `--dc-bg-tertiary`): 서버 아이콘 목록. 아이콘 hover 시 원→squircle 전환 (Discord 시그니처)
- **ChannelSidebar** (240px, `--dc-bg-secondary`): 서버명 헤더 + 카테고리 + 채널 목록
- **MainContent** (flex: 1, `--dc-bg-primary`): 채널 헤더 + 콘텐츠 영역
- **ActivityPanel** (240px, `--dc-bg-secondary`): 최근 활동 피드. 초기에는 정적 데이터(`constants/activity.ts`)로 구현. 추후 GitHub API 연동 시 `features/discord/hooks/useActivity.ts`로 캡슐화

### 모바일 (< 768px) — Discord 앱 동일

- ServerBar, ChannelSidebar, ActivityPanel 모두 숨김
- MainContent 전체 화면 표시
- 상단 헤더 좌측 ☰(Hash + Menu) 버튼 → ChannelSidebar slide-in
- 좌→우 스와이프 제스처로 ChannelSidebar 열기/닫기 (framer-motion drag)
- ActivityPanel은 모바일에서 미노출

---

## 4. 서버 & 채널 구조

### 서버 목록 (왼쪽 아이콘 바 순서)

```
🏠 Home
💼 Projects
📝 Blog
🧪 Lab
👤 About
```

### 각 서버 채널 구성

#### 🏠 Home
```
▼ 소개
  # welcome          ← 첫 진입 채널 (자동 리다이렉트)
  # about-me
▼ 기술 스택
  # skills
  # tools-i-use
▼ 연락
  # contact
  # links
```

#### 💼 Projects
```
▼ 팀프로젝트
  # team-projects
▼ 개인프로젝트
  # side-projects
  # open-source
```

#### 📝 Blog
```
  # latest-posts
  # frontend
  # devops
```

#### 🧪 Lab
```
  # tools
  # experiments
  # demos
```

#### 👤 About
```
  # bio
  # resume
  # contact
```

---

## 5. URL 라우팅

| URL | 동작 |
|-----|------|
| `/` | `/home/welcome` 리다이렉트 |
| `/:server` | 해당 서버의 첫 번째 채널로 리다이렉트 |
| `/:server/:channel` | 해당 서버·채널 콘텐츠 렌더링 |

예시:
- `/home/welcome`
- `/projects/team-projects`
- `/projects/side-projects`
- `/blog/latest-posts`
- `/lab/tools`
- `/about/bio`

---

## 6. 카드 디자인 — Discord Embed 스타일

메인 콘텐츠 영역의 프로젝트·포스트·도구 항목은 Discord의 링크 임베드 UI를 따른다.

```
┌─────────────────────────────────────────────────────┐
│ ▌ [아이콘]  제목(링크 스타일 #00b0f4)               │
│   설명 텍스트 — 1~2줄                               │
│   ⭐ 스타 수  🍴 포크 수  ● 상태                   [태그][태그] │
└─────────────────────────────────────────────────────┘
```

- 왼쪽 컬러 바 (`border-left: 4px`): 서버별 색상 또는 프로젝트 상태 색상
  - 활성: `--dc-brand` (#5865f2)
  - 완료/안정: `--dc-green` (#3ba55c)
  - WIP: `--dc-yellow` (#faa81a)
- 배경: `--dc-bg-secondary` (#2f3136)
- hover: `--dc-bg-secondary-alt` (#393c43)
- 태그: `--dc-bg-tertiary` 배경, `--dc-text-muted` 색상, 3px border-radius

---

## 7. 애니메이션 계획 (framer-motion)

| 요소 | 애니메이션 | 상세 |
|------|-----------|------|
| 서버 아이콘 | `border-radius` 전환 | 50% → 30% (hover), 물리 기반 spring |
| 채널 전환 | 메인 콘텐츠 fade + slide-up | `opacity: 0→1`, `y: 8→0`, duration 150ms |
| 서버 전환 | 채널 목록 cross-fade | AnimatePresence, duration 120ms |
| 모바일 사이드바 | spring 슬라이드 | `x: -240→0`, drag 제스처 연동 |
| 카테고리 접기/펼치기 | 높이 애니메이션 | AnimatePresence + `height: auto` |
| 활동 패널 신규 항목 | slide-in from top | `y: -10→0`, stagger 50ms |
| 카드 hover | 배경색 전환 | CSS transition 150ms (framer 불필요) |

`prefers-reduced-motion` 미디어 쿼리 적용 필수 — 모션 비활성화 시 즉시 전환.

---

## 8. 아이콘 라이브러리

`lucide-react` 사용. 주요 아이콘:

| 위치 | 아이콘 |
|------|--------|
| 채널 # | `Hash` |
| 채널 카테고리 토글 | `ChevronDown`, `ChevronRight` |
| 메인 헤더 | `Hash`, `Bell`, `Pin`, `Search` |
| 활동 패널 헤더 | `Activity` |
| 모바일 사이드바 토글 | `Menu`, `X` |
| 서버 툴팁 | 없음 (텍스트만) |
| 카드 메타 | `Star`, `GitFork`, `Circle` |
| About 채널 | `Mail`, `FileText`, `Link` |

---

## 9. 컴포넌트 구조

```
src/
├── features/
│   ├── discord/                     ← Discord UI shell (레이아웃 인프라)
│   │   ├── components/
│   │   │   ├── AppShell/            ← 전체 4패널 레이아웃
│   │   │   ├── ServerBar/           ← 왼쪽 서버 아이콘 바
│   │   │   ├── ChannelSidebar/      ← 채널 목록 패널
│   │   │   ├── MainContent/         ← 메인 콘텐츠 래퍼
│   │   │   └── ActivityPanel/       ← 오른쪽 활동 피드
│   │   ├── constants/
│   │   │   └── servers.ts           ← 서버·채널 구조 정의
│   │   └── types/
│   │       └── discord.ts           ← Server, Channel, Category 타입
│   ├── home/                        ← Home 서버 채널 콘텐츠
│   ├── projects/                    ← Projects 서버 채널 콘텐츠
│   ├── blog/                        ← Blog 서버 채널 콘텐츠
│   ├── lab/                         ← Lab 서버 채널 콘텐츠
│   └── about/                       ← About 서버 채널 콘텐츠
└── shared/
    └── components/
        └── EmbedCard/               ← Discord embed 카드 (모든 feature에서 공용)
```

---

## 10. 기존 작업 처리

현재 이슈 #2 (`홈_화면_전체_디자인_구성`) 의 Coinbase 스타일 작업(Tasks 1~6)은 **전면 폐기**한다.
새 이슈를 생성하여 Discord UI 전체 재구축을 추적한다.

변경 대상 파일:
- `DESIGN.md` — Discord 색상 시스템으로 전면 교체
- `CLAUDE.md` — UI Design Rules: DESIGN.md 참조 유지, Discord 패턴 명시
- `.claude/rules/10-architecture-and-boundaries.md` — discord feature 구조 반영
- `src/styles/global.css` — Discord CSS 토큰으로 전면 교체
- 기존 `src/features/home/` 컴포넌트 — 단계적 교체 또는 삭제

---

## 11. 의존성 추가 목록

| 패키지 | 이유 | 승인 필요 |
|--------|------|-----------|
| `lucide-react` | 아이콘 라이브러리 | ✅ 필요 |
| `framer-motion` | 애니메이션 + 스와이프 제스처 | ✅ 필요 |

---

## 12. 비기능 요건

- **반응형**: 768px 기준 모바일/데스크탑 분기
- **접근성**: `aria-label` 채널명, `role="navigation"` 사이드바, 키보드 탐색 (Tab, Enter, Arrow)
- **모션 접근성**: `prefers-reduced-motion` 지원
- **빌드**: TypeScript 에러 0, ESLint 에러 0, `npm run build` 성공
