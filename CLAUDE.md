# CLAUDE.md — chuseok22-home-web

Project-level rules for Claude Code. These override global rules on conflicts.

## Project Overview

- **Stack**: TypeScript + React 19 + Vite 6 + react-router-dom v7
- **Target**: 개인 lab 사이트 — 포트폴리오, 블로그, 유틸 도구 등 다양한 콘텐츠를 담는 개인 사이트
- **Routing**: BrowserRouter + react-router-dom v7 (App.tsx에서 중앙 관리)
- **Architecture**: Feature-based module structure under `src/features/`

## Core Policy

- Follow existing patterns before introducing anything new.
- Scope changes to the affected feature only.
- Never touch shared infrastructure unless the task explicitly requires it.
- Verify real behavior before marking anything as complete.
- Structure UI components to favor maintainability and reusability.
- Split components by feature and responsibility, but avoid excessive fragmentation that creates too many files without clear value.
- Prefer a balanced component design: extract reusable or logically distinct UI parts, while keeping closely related implementation together when separation would only add complexity.

## UI Design Rules

- **DESIGN.md를 반드시 참고할 것**: UI 컴포넌트 작성, 스타일 수정, 레이아웃 구성 등 모든 UI 관련 작업 시 `DESIGN.md`를 먼저 읽고 그 내용을 따른다. 예외 없음.
- DESIGN.md에 정의된 색상, 타이포그래피, 간격, 컴포넌트 스타일 등을 벗어나는 UI 구현은 금지한다.
- DESIGN.md에 명시되지 않은 UI 패턴이 필요한 경우, 임의로 결정하지 말고 사용자에게 확인 후 DESIGN.md를 먼저 업데이트한다.

## Reference Docs

- If a reference doc conflicts with the current repository code, follow the current repository code and report that the doc should be updated.

## Hard Rules

- No changes to `.env`, `.env.local`, `.env.production`.
- No new dependencies without user approval.
- No modifications outside the confirmed plan scope.
