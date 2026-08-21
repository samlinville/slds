# App No Sidebar Block Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publish an `app-no-sidebar` starter layout block with a centered `max-w-3xl` content container.

**Architecture:** Add a self-contained block beneath `src/blocks/app-no-sidebar` that exposes a composable app shell with an optional header slot and a main content area. Register it as a `registry:block`, render it from the local demo at a dedicated route, and enforce its registry location and width utility through tests.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Vite, Vitest, shadcn CLI.

### Task 1: Define the block contract

**Files:**

- Modify: `src/registry.test.ts`
- Modify: `src/demo/app.test.tsx`

1. Add assertions that `app-no-sidebar` is a published block sourced only from `src/blocks/app-no-sidebar`.
2. Add a demo assertion for the new route and centered `max-w-3xl` content container.
3. Run the targeted tests and verify they fail before implementation.

### Task 2: Implement the layout and demo route

**Files:**

- Create: `src/blocks/app-no-sidebar/index.tsx`
- Modify: `src/demo/app.tsx`

1. Export an app-shell component with optional header and action slots.
2. Apply `mx-auto`, `w-full`, and `max-w-3xl` to the layout's content container.
3. Add a lightweight local demo route that makes the layout visible without changing existing routes.

### Task 3: Publish the block

**Files:**

- Modify: `scripts/generate-registry.mjs`
- Modify: `README.md`
- Generated: `registry.json`, `public/r/*.json`

1. Add `app-no-sidebar` as a `registry:block` with its source target under `@components/blocks/app-no-sidebar`.
2. Regenerate the published registry assets and document the new block.

### Task 4: Verify

1. Run tests, typecheck, lint, registry validation, registry build, and production build under Node 22.
2. Inspect the generated payload and review the final diff.
