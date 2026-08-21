# Block Directory Structure Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make registry blocks visible and self-contained in the source tree without changing the demo or installed registry behavior.

**Architecture:** Keep individually installable primitives in `src/components/ui` and shared support components in `src/components`. Move dashboard and kitchen-sink source into `src/blocks/<block-name>`, keep each block's entry point and assets together, and update the registry generator to derive its block payloads from those locations.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, shadcn CLI, pnpm.

### Task 1: Define the block-directory contract

**Files:**

- Modify: `src/registry.test.ts`

1. Add a test that requires both blocks to reference files below `src/blocks/<block-name>/`.
2. Run `pnpm test --run src/registry.test.ts` with Node 22 and confirm it fails against the current registry paths.

### Task 2: Move the canonical block source

**Files:**

- Move: dashboard files from `src/components/` and `src/app/dashboard/` to `src/blocks/dashboard-01/`
- Move: `src/components/kitchen-sink/` to `src/blocks/kitchen-sink/`
- Move: block-only icon helpers to their owning block
- Move: `src/App.tsx` and `src/App.test.tsx` to `src/demo/`
- Modify: `src/main.tsx`, block-local imports, and affected tests

1. Preserve component exports and rendered behavior while updating imports to use the new block paths.
2. Keep shared primitives and theme support in their existing `components` locations.

### Task 3: Update registry generation and documentation

**Files:**

- Modify: `scripts/generate-registry.mjs`
- Modify: `README.md`
- Modify: `src/registry.test.ts`

1. Replace hard-coded component-directory locations with `src/blocks/dashboard-01` and `src/blocks/kitchen-sink` locations.
2. Preserve consumer target paths and dependency resolution in generated registry payloads.
3. Document the source taxonomy and generated-output boundary.

### Task 4: Verify and inspect

**Files:**

- Generated: `registry.json`, `public/r/*.json`

1. Run registry generation and verify the contract test is green.
2. Run the complete test suite, typecheck, lint, registry validation, and production build under Node 22.
3. Inspect the final diff to ensure no old dashboard or kitchen-sink paths remain.
