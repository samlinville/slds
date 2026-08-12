# Shadcn Registry Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publish the project's existing Base UI/Mira components, Flexoki theme, dashboard, and kitchen sink through an installable shadcn registry.

**Architecture:** Keep `src` as the canonical implementation and describe those files in a root registry manifest. Build static registry payloads into `public/r`, validate them with the shadcn CLI, and smoke-test installation in a clean Vite consumer.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, shadcn CLI v4, Base UI, Vitest, pnpm.

### Task 1: Define the registry contract

**Files:**
- Create: `src/registry.test.ts`

1. Add a test that expects `registry.json` to expose `flexoki-theme`, `design-system`, `dashboard-01`, `kitchen-sink`, and every file in `src/components/ui`.
2. Add assertions that item names are unique, source files exist, the Base item selects Mira/Base UI, and no registry source imports Radix.
3. Run `pnpm test --run src/registry.test.ts` and confirm it fails because `registry.json` does not exist.

### Task 2: Add the registry manifest

**Files:**
- Create: `registry.json`
- Modify: `package.json`

1. Add a `registry:ui` item for each primitive, including its utility and internal component dependencies.
2. Add `flexoki-theme` with Tailwind v4 palette variables plus light and dark semantic variables.
3. Add multi-file dashboard and kitchen-sink blocks with explicit target paths.
4. Add a `registry:base` item for one-command installation.
5. Add `registry:validate` and `registry:build` package scripts.
6. Re-run the contract test and confirm it passes.

### Task 3: Validate and build

**Files:**
- Generate: `public/r/*.json`

1. Run `pnpm registry:validate` and fix schema errors.
2. Run `pnpm registry:build` and confirm every expected item is emitted.
3. Inspect representative output for `button`, `flexoki-theme`, `dashboard-01`, and `design-system`.

### Task 4: Prove consumer installation

**Files:**
- No repository files; use a temporary directory.

1. Scaffold a clean Base UI/Mira Vite consumer with pnpm.
2. Serve `public/r` locally.
3. Install `button`, `flexoki-theme`, `dashboard-01`, and `design-system` from their registry URLs.
4. Run the consumer typecheck/build and confirm generated imports and paths resolve.

### Task 5: Document and verify

**Files:**
- Modify: `README.md`

1. Document registry development, local installation, hosted namespace setup, selective component installation, and adding future components.
2. Run `pnpm test --run`, `pnpm typecheck`, `pnpm lint`, `pnpm registry:validate`, `pnpm registry:build`, and `pnpm build`.
3. Confirm the source and generated registry contain no Radix dependency or import.
