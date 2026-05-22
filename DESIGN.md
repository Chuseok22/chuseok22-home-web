# DESIGN.md — chuseok22-home-web

## 컨셉 개요

Discord 데스크탑 앱의 UI/UX를 개인 Lab 사이트에 그대로 구현한다.
Discord 특유의 4패널 구조, 채널 기반 내비게이션, 색상 시스템을 원본에 최대한 충실하게 적용한다.
모든 UI 작업 시 이 문서를 먼저 읽고 정의된 토큰과 패턴을 따른다. 예외 없음.

---

## 색상 시스템

모든 색상은 CSS Custom Property 토큰으로 정의한다. 하드코딩 금지.

### 배경 계층

| 토큰 | 값 | 용도 |
|------|----|------|
| `--dc-bg-tertiary` | `#202225` | 서버 아이콘 바, 최상위 배경 |
| `--dc-bg-secondary` | `#2f3136` | 채널 사이드바, 활동 패널 배경 |
| `--dc-bg-primary` | `#36393f` | 메인 콘텐츠 배경 |
| `--dc-bg-secondary-alt` | `#393c43` | hover 상태, 활성 채널 배경 |
| `--dc-bg-floating` | `#18191c` | 툴팁, 드롭다운 배경 |

### 브랜드 & 상태

| 토큰 | 값 | 용도 |
|------|----|------|
| `--dc-brand` | `#5865f2` | Blurple — 활성 서버, 강조, 주요 CTA |
| `--dc-brand-hover` | `#4752c4` | Blurple hover 상태 |
| `--dc-green` | `#3ba55c` | 온라인, 성공, 활성 프로젝트 |
| `--dc-red` | `#ed4245` | 에러, 위험, 삭제 |
| `--dc-yellow` | `#faa81a` | 경고, WIP 상태 |

### 텍스트

| 토큰 | 값 | 용도 |
|------|----|------|
| `--dc-text-header` | `#ffffff` | 서버명, 채널 헤더, 주요 제목 |
| `--dc-text-normal` | `#dcddde` | 일반 본문 텍스트 |
| `--dc-text-muted` | `#8e9297` | 채널명, 카테고리, 서브텍스트 |
| `--dc-text-link` | `#00b0f4` | 임베드 카드 제목 (클릭 가능) |

### 인터랙티브 (아이콘)

| 토큰 | 값 | 용도 |
|------|----|------|
| `--dc-interactive-muted` | `#4f545c` | 비활성 아이콘 |
| `--dc-interactive-normal` | `#b9bbbe` | 기본 아이콘 |
| `--dc-interactive-hover` | `#dcddde` | hover 아이콘 |
| `--dc-interactive-active` | `#ffffff` | 활성 아이콘 |

### 구분선 & 테두리

| 토큰 | 값 | 용도 |
|------|----|------|
| `--dc-divider` | `#26282c` | 패널 간 구분선 |
| `--dc-card-border` | `#40444b` | 카드 테두리 |

### 특수 용도

| 토큰 | 값 | 용도 |
|------|----|------|
| `--dc-logo-bg-white` | `#ffffff` | 흰색 로고 아이콘 색상 |
| `--dc-overlay` | `rgba(0, 0, 0, 0.8)` | 모달/오버레이 반투명 배경 |

---

## 타이포그래피

```css
--dc-font: 'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

| 용도 | 크기 | 굵기 |
|------|------|------|
| 서버명 헤더 | 15px | 700 |
| 채널 카테고리 | 11px | 700 (uppercase, letter-spacing 0.08em) |
| 채널명 | 14px | 500 |
| 메인 헤더 채널명 | 15px | 700 |
| 카드 제목 | 14px | 700 |
| 카드 본문 | 13px | 400 |
| 카드 메타 | 12px | 400 |
| 태그 | 11px | 400 |

---

## 레이아웃

### 데스크탑 (≥ 768px) — 4패널 구조

```
┌──────────┬───────────────┬─────────────────────┬───────────────┐
│ServerBar │ChannelSidebar │   MainContent        │ ActivityPanel │
│  72px    │    240px      │    flex: 1           │    240px      │
│#202225   │  #2f3136      │   #36393f            │  #2f3136      │
└──────────┴───────────────┴─────────────────────┴───────────────┘
```

### 모바일 (< 768px) — Discord 앱 동일

- ServerBar, ChannelSidebar, ActivityPanel 숨김
- MainContent 전체 화면
- 좌→우 스와이프 또는 ☰ 버튼으로 ChannelSidebar 슬라이드 열기

---

## 서버 구조

```
🏠 Home      ← 기본 진입점, / 에서 /home/welcome 리다이렉트
💼 Projects
📝 Blog
🧪 Lab
👤 About
```

### Projects 채널 구성

```
▼ 팀프로젝트
  # team-projects
▼ 개인프로젝트
  # side-projects
  # open-source
```

---

## 컴포넌트 패턴

### ServerBar 서버 아이콘

```
기본:  width 44px · height 44px · border-radius 50% · background --dc-bg-secondary-alt
hover: border-radius 30% (transition 0.15s, Discord 시그니처 squircle)
활성:  border-radius 30% · background --dc-brand
```

아이콘 간 divider: `width 32px · height 2px · background --dc-bg-secondary-alt`

### ChannelSidebar

```
서버 헤더:  padding 12px 16px · font-size 15px · font-weight 700 · color --dc-text-header
            border-bottom 1px solid --dc-divider
카테고리:   font-size 11px · font-weight 700 · UPPERCASE · color --dc-text-muted
            padding 16px 8px 4px 16px
채널 항목:  padding 6px 8px 6px 16px · color --dc-text-muted
            border-radius 4px · margin 1px 8px
  hover:    background --dc-bg-secondary-alt · color --dc-text-normal
  활성:     background --dc-bg-secondary-alt · color --dc-text-header
Hash 아이콘: lucide-react <Hash /> · color --dc-text-muted · 18px
```

### MainContent 채널 헤더

```
height: 48px · padding 0 16px · border-bottom 1px solid --dc-divider
배경: --dc-bg-primary
채널명: font-size 15px · font-weight 700 · color --dc-text-header
Hash 아이콘: lucide-react <Hash /> · color --dc-text-muted · 20px
```

### EmbedCard (Discord Embed 스타일)

모든 feature의 프로젝트·포스트·도구 항목에 사용하는 공통 카드.

```
background: --dc-bg-secondary
border-radius: 4px
border-left: 4px solid [상태 색상]
padding: 12px 14px
```

왼쪽 컬러 바 색상 기준:
- 활성/진행중: `--dc-brand` (#5865f2)
- 완료/안정: `--dc-green` (#3ba55c)
- WIP/개발중: `--dc-yellow` (#faa81a)

내부 구조:
```
[아이콘 28px] | [제목 --dc-text-link 14px bold] [태그들]
              | [설명 --dc-text-normal 13px 1~2줄]
              | [메타: ⭐ 수치  🍴 수치  ● 상태]
```

태그: `background --dc-bg-tertiary · color --dc-text-muted · border-radius 3px · padding 2px 6px · font-size 11px`

hover: `background #32353b` (transition 150ms)

### ActivityPanel

```
background: --dc-bg-secondary
border-left: 1px solid --dc-divider
width: 240px

헤더: font-size 11px · font-weight 700 · UPPERCASE · color --dc-text-muted
      padding 16px 16px 8px · border-bottom 1px solid --dc-divider

항목: padding 6px 12px
  점: width 8px · height 8px · border-radius 50% · background --dc-brand
  제목: font-size 13px · font-weight 600 · color --dc-text-normal
  메타: font-size 11px · color --dc-text-muted
```

---

## 애니메이션 규칙

라이브러리: `framer-motion`

| 요소 | 애니메이션 | 값 |
|------|-----------|-----|
| 서버 아이콘 hover | border-radius 전환 | 50% → 30%, spring stiffness 300 |
| 채널 전환 | fade + slide-up | opacity 0→1, y 8→0, duration 0.15s |
| 서버 전환 | 채널 목록 cross-fade | AnimatePresence, duration 0.12s |
| 모바일 사이드바 | spring 슬라이드 | x -240→0, drag 제스처 연동 |
| 카테고리 접기/펼치기 | 높이 | AnimatePresence + height auto |
| 활동 패널 항목 | slide-in top | y -10→0, stagger 50ms |
| 카드 hover | 배경색 | CSS transition 150ms (framer 불필요) |

`prefers-reduced-motion` 적용 필수. 모션 비활성 시 즉시 전환.

---

## 아이콘

라이브러리: `lucide-react`

| 위치 | 컴포넌트 |
|------|---------|
| 채널 # 기호 | `<Hash />` |
| 카테고리 열기/닫기 | `<ChevronDown />` `<ChevronRight />` |
| 모바일 메뉴 | `<Menu />` `<X />` |
| 활동 패널 헤더 | `<Activity />` |
| 카드 메타 (스타) | `<Star />` |
| 카드 메타 (포크) | `<GitFork />` |
| 카드 메타 (상태) | `<Circle />` |
| About 채널 | `<Mail />` `<FileText />` `<Link />` |

---

## URL 라우팅

| URL | 동작 |
|-----|------|
| `/` | `/home/welcome` 리다이렉트 |
| `/:server` | 해당 서버 첫 채널 리다이렉트 |
| `/:server/:channel` | 해당 채널 콘텐츠 렌더링 |

---

## 금지 사항

- CSS 색상 하드코딩 금지 — 반드시 `--dc-*` 토큰 사용
- Discord 레이아웃 구조(패널 너비, 배경 계층)를 임의로 변경하지 않는다
- 이 문서에 정의되지 않은 UI 패턴이 필요한 경우 임의로 구현하지 말고 이 문서를 먼저 업데이트한다
