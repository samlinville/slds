# shadcn Mira Kitchen Sink Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a React + Vite single-page gallery that faithfully reproduces the content-rich card examples from the linked shadcn Create preset using shadcn Base UI components, with the recommended light and dark theme setup.

**Architecture:** Start from the exact shadcn preset command supplied by the user so component primitives, CSS variables, typography, radius, and Base UI configuration come from the preset. Keep the page as a responsive card gallery composed from small feature components, while all copy and values mirror the live reference. State remains local to each demo so controls are interactive without a backend.

**Tech Stack:** React, TypeScript, Vite, pnpm, Tailwind CSS, shadcn/ui with Base UI, Lucide icons, Recharts, Vitest, Testing Library.

### Task 1: Scaffold the requested preset

**Files:**
- Create: `package.json`
- Create: `components.json`
- Create: `src/index.css`
- Create: `src/App.tsx`

**Step 1: Generate the project**

Run: `pnpm dlx shadcn@latest init --preset b1D0dv72 --template vite`

Expected: A Vite React project configured for the Base UI Mira preset is created in the current empty directory.

**Step 2: Inspect generated theme and component configuration**

Run: `cat components.json && sed -n '1,260p' src/index.css && cat package.json`

Expected: `components.json` identifies the requested preset and Base UI primitives; light theme variables are centralized under `:root` and dark values under `.dark`.

**Step 3: Install dependencies**

Run: `pnpm install`

Expected: pnpm completes without dependency errors.

### Task 2: Install the shadcn building blocks

**Files:**
- Create: `src/components/ui/*`

**Step 1: Add the components required by the reference gallery**

Run: `pnpm dlx shadcn@latest add accordion alert-dialog avatar badge breadcrumb button calendar card chart checkbox command dialog dropdown-menu input label progress radio-group select separator slider sonner switch table tabs textarea toggle-group tooltip`

Expected: All generated components use the Base UI-backed registry selected by the preset.

**Step 2: Verify no Radix dependency was introduced**

Run: `rg 'radix-ui|@radix-ui' package.json pnpm-lock.yaml src || true`

Expected: No Radix UI package or import appears.

### Task 3: Add test infrastructure and define required behavior first

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/App.test.tsx`

**Step 1: Install test dependencies**

Run: `pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`

**Step 2: Write failing tests**

Add tests proving that:

- exact reference headings and values render, including `Contribution History`, `Q2 Dividend Income`, `$1,842.10`, `Payout Threshold`, `Kitchen Island`, `Recent Transactions`, and `Upcoming Payments`;
- the theme control changes the root theme class and exposes light, dark, and system choices;
- tabs, accordion, toggles, filters, and selectable scene controls update their visible state;
- the gallery has an accessible main heading and landmark.

**Step 3: Run the tests and verify RED**

Run: `pnpm test --run`

Expected: Tests fail because the gallery and interactions do not exist yet.

### Task 4: Implement the shared gallery shell and theme provider

**Files:**
- Create: `src/components/theme-provider.tsx`
- Create: `src/components/mode-toggle.tsx`
- Create: `src/components/kitchen-sink/gallery-card.tsx`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Step 1: Add the shadcn-recommended theme provider**

Use the current shadcn Vite dark-mode pattern: a class-based provider with `defaultTheme="system"`, `enableSystem`, and persistent local storage. Keep the generated CSS tokens unchanged except for page-specific layout utilities.

**Step 2: Build the page shell**

Create an accessible header with the page title, short purpose text, and theme selector. Add a responsive one-column/two-column/three-column gallery with consistent card sizing and mobile-safe overflow.

**Step 3: Run tests**

Run: `pnpm test --run`

Expected: Theme and page-shell tests pass; content tests remain red.

### Task 5: Implement exact dashboard and finance demos

**Files:**
- Create: `src/components/kitchen-sink/charts.tsx`
- Create: `src/components/kitchen-sink/finance-cards.tsx`
- Create: `src/components/kitchen-sink/transactions-card.tsx`

**Step 1: Build charts and summaries**

Implement Contribution History, Q2 Dividend Income, savings progress, yearly activity, stock performance, and power usage with the exact visible labels and values from the reference.

**Step 2: Build financial forms and transaction content**

Implement Payout Threshold, Claimable Balance, Buy Investment, Transfer Funds, Card Balance, Upcoming Payments, holdings filters, and Recent Transactions using shadcn fields, selects, sliders, tables, calendars, and buttons.

**Step 3: Run tests**

Run: `pnpm test --run`

Expected: Finance content assertions pass.

### Task 6: Implement exact settings, media, and smart-home demos

**Files:**
- Create: `src/components/kitchen-sink/settings-cards.tsx`
- Create: `src/components/kitchen-sink/media-cards.tsx`
- Create: `src/components/kitchen-sink/smart-home-cards.tsx`

**Step 1: Build settings and account forms**

Implement Preferences, Account Access, Payout Preferences, Social Links, Notifications, and the milestone form with exact labels, descriptions, placeholders, checked states, and disabled states.

**Step 2: Build media and device cards**

Implement Distribute Track, QR connect, Cover Art, Explore Catalog, Front Door, Kitchen Island, and Living Room cards with the exact reference text and meaningful local interactions.

**Step 3: Run tests**

Run: `pnpm test --run`

Expected: Settings and interaction assertions pass.

### Task 7: Implement navigation, disclosure, and remaining content demos

**Files:**
- Create: `src/components/kitchen-sink/navigation-cards.tsx`
- Create: `src/components/kitchen-sink/content-cards.tsx`
- Modify: `src/App.tsx`

**Step 1: Build navigation examples**

Implement the Overview/Planning/Account/Support navigation, General/Billing/Goals FAQ tabs, breadcrumb, and payments link list using shadcn components and exact copy.

**Step 2: Build remaining informational cards**

Implement Dollar-Cost Averaging, syncing state, upcoming payment summary, and all remaining reference cards that are visible in the gallery.

**Step 3: Compose the full page**

Arrange every demo in a responsive masonry-like grid while preserving sensible reading and keyboard order.

**Step 4: Run tests and verify GREEN**

Run: `pnpm test --run`

Expected: All tests pass.

### Task 8: Verify quality and visual fidelity

**Files:**
- Modify as needed: `src/**/*.tsx`
- Modify as needed: `src/index.css`

**Step 1: Run automated checks**

Run: `pnpm test --run && pnpm lint && pnpm build`

Expected: All commands exit successfully with no warnings or errors.

**Step 2: Confirm Base UI-only implementation**

Run: `rg 'radix-ui|@radix-ui' package.json pnpm-lock.yaml src || true`

Expected: No results.

**Step 3: Run the app and inspect both themes**

Run: `pnpm dev --host 127.0.0.1`

Inspect desktop and mobile widths in light and dark modes. Exercise menus, tabs, accordion items, switches, checkboxes, sliders, calendar selection, form controls, and filters. Check browser console output.

Expected: The gallery is responsive, all visible content matches the reference, interactive states work, dark mode follows the shadcn provider, and the console is clean.
