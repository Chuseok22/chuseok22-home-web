# Testing And Verification

## Test strategy

- 이 프로젝트의 기본 테스트 전략: E2E 테스트만 운영 (단위/통합 테스트 없음)
- 단위 / 통합 / E2E 우선순위: E2E만 (Playwright)
- mock 사용 기준: E2E에서는 실제 브라우저 동작 기준으로 테스트. 외부 API 없으므로 mock 불필요
- 회귀 테스트 기준: 주요 페이지 렌더링 및 네비게이션 동작 검증

## Commands

- 최소 검증 명령: `npm run lint && npm run build`
- 구현 후 반드시 실행해야 하는 명령: `npm run lint`, `npx tsc --noEmit`, `npm run build`
- PR 전 반드시 실행해야 하는 명령: `npm run lint && npm run build` (CI가 자동으로 실행)
- E2E 테스트 실행: `npx playwright test` (도입 후)

## Evidence

- 테스트 성공/실패를 어떻게 기록할지: GitHub Actions CI 결과로 확인 (PR 빌드 체크)
- 스크린샷 / 로그 / 요약 결과 작성 방식: Playwright 리포트 (도입 후 `playwright-report/`)
- UI 작업 시 필요한 검증 산출물: `npm run dev` 로컬 실행 후 브라우저 직접 확인

## Failure handling

- 실패 시 우선 확인할 것: `npm run build` 에러 메시지, `npm run lint` 에러 목록
- flaky 판단 기준: E2E 도입 후 3회 연속 동일 실패 시 flaky로 분류
- 실패 결과 분석 시 필요한 로그 위치: GitHub Actions 탭 (빌드/배포 로그)

## CI/CD 구조

- PR → `react-basic-build.yml` 빌드 체크 (main 브랜치 대상 PR에 자동 실행)
- push to main → `react-basic-cicd.yml` Docker 빌드 + NAS 배포 자동 실행
- 브랜치 전략: `main` (프로덕션, 포트 3002), `test` (테스트 환경, 포트 3003)
