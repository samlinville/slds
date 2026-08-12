import { readFile, readdir, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const registryBaseUrl = (
  process.env.REGISTRY_URL ?? "http://localhost:5173/r"
).replace(/\/$/, "")
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"))
const dependencyVersions = {
  ...(packageJson.dependencies ?? {}),
  ...(packageJson.devDependencies ?? {}),
}
const availableDependencies = new Set(Object.keys(dependencyVersions))

const source = (file) => readFile(path.join(root, file), "utf8")
const unique = (values) => [...new Set(values)].sort()

function packageName(specifier) {
  if (specifier.startsWith("@")) {
    return specifier.split("/").slice(0, 2).join("/")
  }

  return specifier.split("/")[0]
}

function importSpecifiers(code) {
  return [...code.matchAll(/(?:from\s+|import\s+)["']([^"']+)["']/g)].map(
    (match) => match[1]
  )
}

function npmDependencies(code) {
  return unique(
    importSpecifiers(code)
      .filter(
        (specifier) =>
          !specifier.startsWith("@/") &&
          !specifier.startsWith(".") &&
          !specifier.startsWith("node:")
      )
      .map(packageName)
      .filter(
        (dependency) =>
          dependency !== "react" &&
          dependency !== "react-dom" &&
          availableDependencies.has(dependency)
      )
      .map((dependency) => `${dependency}@${dependencyVersions[dependency]}`)
  )
}

function registryDependencies(code) {
  const dependencies = []

  for (const specifier of importSpecifiers(code)) {
    const uiMatch = specifier.match(/^@\/components\/ui\/([^/]+)$/)
    if (uiMatch) dependencies.push(uiMatch[1])
    if (specifier === "@/lib/utils") dependencies.push("utils")
    if (specifier === "@/hooks/use-mobile") dependencies.push("use-mobile")
    if (specifier === "@/components/theme-provider") {
      dependencies.push("theme-provider")
    }
    if (specifier === "@/components/mode-toggle") {
      dependencies.push("mode-toggle")
    }
  }

  return unique(dependencies)
}

function file(pathname, type, target) {
  return {
    path: pathname,
    type,
    ...(target ? { target } : {}),
  }
}

async function filesRecursively(directory) {
  const entries = await readdir(path.join(root, directory), {
    withFileTypes: true,
  })
  const files = []

  for (const entry of entries) {
    const pathname = path.posix.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await filesRecursively(pathname)))
    } else {
      files.push(pathname)
    }
  }

  return files.sort()
}

function cssDeclarations(block) {
  const values = {}

  for (const match of block.matchAll(/--([^:]+):\s*([^;]+);/g)) {
    values[match[1].trim()] = match[2].trim()
  }

  return values
}

function themeVariables(code) {
  const values = {}

  for (const match of code.matchAll(
    /@theme(?:\s+inline)?\s*\{([\s\S]*?)\}/g
  )) {
    Object.assign(values, cssDeclarations(match[1]))
  }

  return values
}

function selectorVariables(code, selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const match = code.match(
    new RegExp(`${escapedSelector}\\s*\\{([\\s\\S]*?)\\n\\}`)
  )

  if (!match) {
    throw new Error(`Could not find ${selector} variables in src/index.css`)
  }

  return cssDeclarations(match[1])
}

const [paletteCss, appThemeCss] = await Promise.all([
  source("src/styles/flexoki.css"),
  source("src/index.css"),
])
const rawPalette = {
  ...themeVariables(paletteCss),
  ...themeVariables(appThemeCss),
}
const lightTheme = selectorVariables(appThemeCss, ":root")
const darkTheme = selectorVariables(appThemeCss, ".dark")
const uiDirectory = "src/components/ui"
const uiFiles = (await readdir(path.join(root, uiDirectory)))
  .filter((name) => name.endsWith(".tsx"))
  .sort()

const uiItems = await Promise.all(
  uiFiles.map(async (name) => {
    const pathname = path.posix.join(uiDirectory, name)
    const code = await source(pathname)
    return {
      name: path.basename(name, ".tsx"),
      type: "registry:ui",
      title: path
        .basename(name, ".tsx")
        .split("-")
        .map((part) => part[0].toUpperCase() + part.slice(1))
        .join(" "),
      dependencies: npmDependencies(code),
      registryDependencies: registryDependencies(code),
      files: [file(pathname, "registry:ui")],
    }
  })
)

const kitchenFiles = [
  ...(await filesRecursively("src/components/kitchen-sink")),
  "src/components/demo-icon.tsx",
  "src/components/icon-placeholder.tsx",
].filter((pathname) => pathname.endsWith(".tsx"))
const kitchenCode = (
  await Promise.all(kitchenFiles.map((pathname) => source(pathname)))
).join("\n")

const dashboardFiles = [
  "src/components/dashboard-page.tsx",
  "src/components/app-sidebar.tsx",
  "src/components/chart-area-interactive.tsx",
  "src/components/dashboard-schema.ts",
  "src/components/data-table.tsx",
  "src/components/icon-placeholder.tsx",
  "src/components/nav-documents.tsx",
  "src/components/nav-main.tsx",
  "src/components/nav-secondary.tsx",
  "src/components/nav-user.tsx",
  "src/components/section-cards.tsx",
  "src/components/site-header.tsx",
]
const dashboardCode = (
  await Promise.all(dashboardFiles.map((pathname) => source(pathname)))
).join("\n")

const supportingItems = []
for (const [name, pathname, type] of [
  ["utils", "src/lib/utils.ts", "registry:lib"],
  ["use-mobile", "src/hooks/use-mobile.ts", "registry:hook"],
  ["theme-provider", "src/components/theme-provider.tsx", "registry:component"],
  ["mode-toggle", "src/components/mode-toggle.tsx", "registry:component"],
]) {
  const code = await source(pathname)
  supportingItems.push({
    name,
    type,
    dependencies: npmDependencies(code),
    registryDependencies: registryDependencies(code),
    files: [file(pathname, type)],
  })
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "slds",
  homepage: registryBaseUrl,
  items: [
    {
      name: "flexoki-theme",
      type: "registry:theme",
      title: "Flexoki Theme",
      description:
        "Flexoki palette with Mira semantic tokens, grayscale charts, and light/dark modes.",
      cssVars: {
        theme: {
          ...rawPalette,
          "font-heading": "var(--font-sans)",
        },
        light: lightTheme,
        dark: darkTheme,
      },
    },
    ...supportingItems,
    ...uiItems,
    {
      name: "dashboard-01",
      type: "registry:block",
      title: "Dashboard 01",
      description: "The Base UI/Mira dashboard with sidebar, charts, and data table.",
      dependencies: npmDependencies(dashboardCode),
      registryDependencies: registryDependencies(dashboardCode),
      files: [
        ...dashboardFiles.map((pathname) =>
          file(
            pathname,
            "registry:component",
            pathname.replace(/^src\/components\//, "@components/")
          )
        ),
        file(
          "src/app/dashboard/data.json",
          "registry:file",
          "src/app/dashboard/data.json"
        ),
      ],
    },
    {
      name: "kitchen-sink",
      type: "registry:block",
      title: "Mira Component Kitchen Sink",
      description:
        "The complete horizontally scrolling shadcn Create card collection.",
      dependencies: npmDependencies(kitchenCode),
      registryDependencies: registryDependencies(kitchenCode),
      files: kitchenFiles.map((pathname) =>
        file(
          pathname,
          "registry:component",
          pathname.replace(/^src\/components\//, "@components/")
        )
      ),
    },
    {
      name: "design-system",
      type: "registry:base",
      title: "SLDS Mira Design System",
      description:
        "The complete Base UI/Mira primitive library with the Flexoki theme.",
      config: {
        style: "base-mira",
        rsc: false,
        tsx: true,
        tailwind: {
          config: "",
          css: "src/index.css",
          baseColor: "neutral",
          cssVariables: true,
          prefix: "",
        },
        iconLibrary: "lucide",
        rtl: false,
        aliases: {
          components: "@/components",
          utils: "@/lib/utils",
          ui: "@/components/ui",
          lib: "@/lib",
          hooks: "@/hooks",
        },
        registries: {
          "@slds": `${registryBaseUrl}/{name}.json`,
        },
      },
      registryDependencies: [
        "flexoki-theme",
        ...supportingItems.map((item) => item.name),
        ...uiItems.map((item) => item.name),
      ],
      meta: {
        framework: "vite",
        primitiveLibrary: "base-ui",
        tailwindVersion: 4,
      },
    },
  ],
}

for (const item of registry.items) {
  if (item.registryDependencies) {
    item.registryDependencies = item.registryDependencies.map(
      (dependency) => `${registryBaseUrl}/${dependency}.json`
    )
  }
}

await writeFile(
  path.join(root, "registry.json"),
  `${JSON.stringify(registry, null, 2)}\n`
)
