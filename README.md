# SLDS Mira Design System

A React 19 + Vite design-system workspace built from shadcn's Base UI-backed Mira preset. The app contains the shadcn Create kitchen sink and `dashboard-01`; the same source files are published through a shadcn registry.

Hosted registry: `https://samlinville.github.io/slds/r`

```bash
pnpm dlx shadcn@latest add \
  https://samlinville.github.io/slds/r/design-system.json
```

Or configure the namespace and install selectively:

```bash
pnpm dlx shadcn@latest registry add \
  @slds=https://samlinville.github.io/slds/r/{name}.json

pnpm dlx shadcn@latest add @slds/button @slds/card
```

## Run the demo

```bash
pnpm install
pnpm dev
```

The kitchen sink is available at `/` and the dashboard at `/dashboard`. The header toggle switches directly between light and dark mode; the underlying theme provider still supports the system preference.

## Registry architecture

The demo and registry share one canonical implementation:

- `src/components/ui` contains the individually installable Base UI primitives.
- `src/styles/flexoki.css` and `src/index.css` are the editable source theme.
- `flexoki-theme` distributes the Flexoki palette and semantic light/dark tokens.
- `src/blocks/dashboard-01` and `src/blocks/kitchen-sink` are the canonical source for the complete multi-file demo blocks.
- `src/components` contains shared support such as theme handling.
- `src/demo` is the local showcase application that exercises the published blocks.
- `design-system` installs the Base UI/Mira configuration, theme, theme handling, and every primitive.
- `scripts/generate-registry.mjs` generates `registry.json` directly from the canonical source.
- `public/r` contains the static JSON payloads produced by the shadcn CLI.

External dependencies are emitted with the versions used by this project. Internal dependencies are emitted as complete registry URLs, so individual component and full-system installs resolve back to this registry instead of Shadcn's default registry.

## Build the registry

```bash
pnpm registry:generate
pnpm registry:validate
pnpm registry:build
```

The default registry URL is `http://localhost:5173/r`. Running `pnpm dev` serves the generated files from `public/r`.

## Install locally in another app

With this project running on port 5173, initialize a new Vite application with the complete Base UI/Mira system:

```bash
pnpm dlx shadcn@latest init http://localhost:5173/r/design-system.json \
  --template vite \
  --name my-app \
  --yes
```

That initializes the Base UI-backed `base-mira` style, TypeScript aliases, Lucide icons, Tailwind CSS variables, the local `@slds` namespace, theme handling, and every primitive.

To add the whole system to an existing shadcn-compatible React app:

```bash
pnpm dlx shadcn@latest add http://localhost:5173/r/design-system.json
```

Install only selected pieces:

```bash
pnpm dlx shadcn@latest add http://localhost:5173/r/flexoki-theme.json
pnpm dlx shadcn@latest add http://localhost:5173/r/button.json
pnpm dlx shadcn@latest add http://localhost:5173/r/dashboard-01.json
pnpm dlx shadcn@latest add http://localhost:5173/r/kitchen-sink.json
```

## Publish and use a namespace

Build with the final public URL before deploying `public/r`:

```bash
REGISTRY_URL=https://design.example.com/r pnpm registry:build
```

Deploy the generated directory without changing the filenames. A consuming application can then register a friendly namespace:

```bash
pnpm dlx shadcn@latest registry add @slds=https://design.example.com/r/{name}.json
pnpm dlx shadcn@latest add @slds/design-system
pnpm dlx shadcn@latest add @slds/button @slds/card
```

For a repository-hosted registry, `REGISTRY_URL` can instead point at the raw `public/r` directory for the branch or release you publish.

## Add or update components

1. Add or edit the canonical implementation in `src/components/ui`.
2. Ensure any imported npm package is declared in this project's `package.json`.
3. Run `pnpm registry:build`.
4. Run the verification suite below.

New files in `src/components/ui` are discovered automatically. Block source is grouped under `src/blocks/<block-name>`; the dashboard's explicit file list and the kitchen sink's recursive file discovery are maintained in `scripts/generate-registry.mjs` because their install targets are part of the public API.

## Customize the theme

Edit the raw Flexoki palette in `src/styles/flexoki.css` and the app's semantic mappings in `src/index.css`. Keep components on semantic utilities such as `bg-primary`, `text-muted-foreground`, and `border-border` so consumers can replace theme tokens without changing component code.

Those CSS files are the single source of truth. The registry generator reads their `@theme`, `:root`, and `.dark` declarations directly, so theme changes only require a registry rebuild.

## Verify

```bash
pnpm test --run
pnpm typecheck
pnpm lint
pnpm registry:validate
pnpm registry:build
pnpm build
```
