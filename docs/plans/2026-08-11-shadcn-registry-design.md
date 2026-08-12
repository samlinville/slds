# Shadcn Registry Design

## Goal

Turn the existing Mira/Base UI project into a source-distributed design system without separating the demo from the component source it exercises.

## Architecture

The files in `src/components/ui` remain the canonical primitive implementations. A root `registry.json` points directly at those files, so `shadcn build` serializes the same source used by the kitchen sink instead of maintaining a second copy.

The registry exposes four layers:

- `flexoki-theme`: the Flexoki palette and the light/dark semantic shadcn tokens.
- Individual `registry:ui` items for every primitive in `src/components/ui`.
- `dashboard-01` and `kitchen-sink` as multi-file `registry:block` items.
- `design-system` as a `registry:base` item that selects Base UI, Mira, Lucide, and installs the theme plus all primitives.

The demo application remains a development harness. Its tests continue to validate rendered content and interactions, while a registry contract test validates source coverage, file existence, unique item names, and the absence of Radix dependencies.

## Distribution

`pnpm registry:build` writes installable JSON payloads to `public/r`. During local development, consumers can install from the Vite server at `http://localhost:5173/r/{name}.json`. For publication, the same directory can be deployed as static files and registered under a namespace in consuming applications.

## Theme behavior

The theme is distributed through registry `cssVars` instead of replacing a consumer's complete global stylesheet. Flexoki raw colors are added to Tailwind's theme variables, while shadcn semantic variables are added to the light and dark scopes. Components continue to use semantic utilities such as `bg-primary`, `text-foreground`, and `border-border`.

## Verification

The registry must pass the shadcn schema validator, build every item, install representative individual and bundled items into a clean Vite consumer, and leave the original test, typecheck, lint, and production build green.
