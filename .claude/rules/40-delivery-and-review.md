# Delivery And Review

## Report format

- report 단계에서 반드시 포함할 섹션:
  - 변경 목적
  - 변경 파일
  - 위험 요소
  - 검증 결과
  - 남은 이슈

- 보고서 파일 저장 위치 및 명명 규칙:
  - 위치: `.report/` 디렉토리 (없으면 자동 생성)
  - 파일명: `[YYYYMMDD]_[ISSUE#]_[간단한설명].md`
  - 예시: `20260520_#2_홈_화면_디자인_구성.md`
  - 날짜: 작업 완료 시점 (YYYYMMDD 형식)
  - 설명: 한글/영문, 단어 구분은 언더스코어

- 보고서 작성 핵심 원칙:
  - **작성자/작성일 필드 절대 포함 금지** — 파일명에 날짜 포함되므로 별도 기록 불필요
  - **AI 도구명 언급 금지** (Claude, GPT, Copilot, Cursor 등)
  - 능동태, 키워드 기반 문장으로 가독성 향상
  - 민감 정보(토큰, 비밀번호, API Key) 발견 시 `{TOKEN}`, `{API_KEY}`, `{PASSWORD}` 형식으로 마스킹

- 보고서 구조:

  ```markdown
  ### 📌 작업 개요
  [2-3줄 요약]

  ### 🎯 구현 목표 (기능 구현) 또는 🔍 문제 분석 (버그 수정)
  [목적 또는 문제 원인]

  ### ✅ 구현 내용

  #### [주요 변경사항 1]
  - **파일**: `경로/파일명`
  - **변경 내용**: [구체적인 설명]
  - **이유**: [왜 이렇게 수정했는지]

  ### 🔧 주요 변경사항 상세
  [코드 변경 내용을 자연스럽게 설명. 특이사항 포함]

  ### 🧪 검증 결과
  [lint, build, 테스트 결과. PASS/FAIL 명시]

  ### ⚠️ 위험 요소
  [없으면 "없음" 명시]

  ### 📌 남은 이슈
  [후속 작업, 미검증 경로, TODO 등]
  ```

- 작성 스타일 기준:

  **좋은 예:**
  ```
  "ChannelSidebar 활성 채널 스타일 분기를 data-* 어트리뷰트 셀렉터로 변경"
  "EmbedCard hover 상태 CSS 하드코딩 확인. --dc-* 토큰으로 교체"
  ```

  **나쁜 예:**
  ```
  "스타일이 변경되었습니다."  # 수동태 금지
  "Claude가 분석한 결과..."   # AI 이름 금지
  "작성자: Claude Code"        # 작성자 필드 금지
  ```

- 보고서 분석 프로세스:
  1. `git status` 한 번만 실행 → 변경된 파일명 확인
  2. 이슈 내용 기반으로 관련 파일만 선별
  3. 선별된 파일을 직접 읽어서 변경 내용 분석
  4. 이후 추가 git 명령어 사용 금지 (토큰 낭비)

## Pull request expectations

- PR 제목 규칙:
  - 형식: `[브랜치명] : [타입] : [설명] [이슈링크]`
  - 타입: `feat` (기능), `fix` (버그), `refactor`, `chore`, `docs`
  - 예시: `홈_화면_전체_디자인_구성 : feat : WelcomeChannel 컴포넌트 추가 https://github.com/Chuseok22/chuseok22-home-web/issues/2`
  - 현재 프로젝트의 실제 커밋 메시지 패턴 참고: `git log` 확인

- PR 본문 구조:
  - `.report/` 에 저장된 보고서 내용을 기반으로 작성
  - 변경 목적, 주요 변경 파일, 검증 결과 포함
  - UI 변경 시 스크린샷 첨부

- linked issue 규칙:
  - PR 제목 또는 본문에 이슈 URL 포함
  - 이슈 URL 패턴: `https://github.com/Chuseok22/chuseok22-home-web/issues/[번호]`

## Delivery constraints

- 배포 전 확인 사항:
  - `npm run lint` — 0 errors
  - `npx tsc --noEmit` — TypeScript 에러 없음
  - `npm run build` — 빌드 성공
  - (E2E 도입 후) `npx playwright test` — 전체 PASS
  - CSS 색상 하드코딩 없음 확인 (`--dc-*` 토큰 사용 여부)
  - `console.log` 잔류 없음 확인

- feature flag 정책:
  - 현재 미사용. 필요 시 도입 기준:
    - 완성되지 않은 기능이 main 브랜치에 머지되어야 하는 경우
    - A/B 테스트가 필요한 경우

- rollback 필요 시 기준:
  - 빌드 실패 또는 배포 후 페이지 렌더링 오류 발생 시 즉시 rollback
  - Discord 레이아웃 구조가 깨지는 경우 즉시 rollback
  - rollback 방법: 이전 커밋으로 revert PR 생성

## CI/CD 구조

- PR → `react-basic-build.yml` 빌드 체크 (main 브랜치 대상 PR에 자동 실행)
- push to main → `react-basic-cicd.yml` Docker 빌드 + NAS 배포 자동 실행
- 브랜치 전략: `main` (프로덕션, 포트 3002), `test` (테스트 환경, 포트 3003)
