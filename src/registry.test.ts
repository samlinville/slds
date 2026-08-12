/// <reference types="node" />

import { existsSync, readFileSync, readdirSync } from "node:fs"
import { basename, resolve } from "node:path"

import { describe, expect, it } from "vitest"

type RegistryFile = {
  path: string
  target?: string
  type: string
}

type RegistryItem = {
  name: string
  type: string
  dependencies?: string[]
  config?: {
    style?: string
    iconLibrary?: string
    tailwind?: {
      baseColor?: string
      css?: string
    }
  }
  meta?: Record<string, unknown>
  registryDependencies?: string[]
  cssVars?: {
    theme?: Record<string, string>
    light?: Record<string, string>
    dark?: Record<string, string>
  }
  files?: RegistryFile[]
}

type Registry = {
  name: string
  homepage: string
  items: RegistryItem[]
}

function readRegistry() {
  return JSON.parse(readFileSync(resolve("registry.json"), "utf8")) as Registry
}

describe("shadcn registry", () => {
  it("publishes every local UI primitive as an individual item", () => {
    const registry = readRegistry()
    const expectedPrimitives = readdirSync(resolve("src/components/ui"))
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => basename(file, ".tsx"))
      .sort()
    const publishedPrimitives = registry.items
      .filter((item) => item.type === "registry:ui")
      .map((item) => item.name)
      .sort()

    expect(publishedPrimitives).toEqual(expectedPrimitives)
  })

  it("exposes the theme, complete base, and both demo blocks", () => {
    const registry = readRegistry()
    const itemByName = new Map(registry.items.map((item) => [item.name, item]))

    expect(registry.name).toBe("slds")
    expect(itemByName.get("flexoki-theme")?.type).toBe("registry:theme")
    expect(itemByName.get("dashboard-01")?.type).toBe("registry:block")
    expect(itemByName.get("kitchen-sink")?.type).toBe("registry:block")
    expect(itemByName.get("design-system")).toMatchObject({
      type: "registry:base",
      config: {
        style: "base-mira",
        iconLibrary: "lucide",
        tailwind: {
          baseColor: "neutral",
          css: "src/index.css",
        },
      },
    })
    expect(
      itemByName.get("design-system")?.registryDependencies
    ).toContain(`${registry.homepage}/flexoki-theme.json`)
  })

  it("resolves internal dependencies back to this registry", () => {
    const registry = readRegistry()

    for (const item of registry.items) {
      for (const dependency of item.registryDependencies ?? []) {
        expect(dependency, `${item.name}: ${dependency}`).toMatch(
          new RegExp(`^${registry.homepage}/[a-z0-9-]+\\.json$`)
        )
      }
    }
  })

  it("pins external packages to the versions used by the source app", () => {
    const registry = readRegistry()
    const dashboard = registry.items.find((item) => item.name === "dashboard-01")
    const button = registry.items.find((item) => item.name === "button")

    expect(dashboard?.dependencies).toContain("recharts@3.8.0")
    expect(button?.dependencies).toContain("@base-ui/react@^1.7.0")
  })

  it("publishes theme values from the canonical CSS", () => {
    const registry = readRegistry()
    const theme = registry.items.find((item) => item.name === "flexoki-theme")
    const palette = readFileSync(resolve("src/styles/flexoki.css"), "utf8")
    const appTheme = readFileSync(resolve("src/index.css"), "utf8")
    const blue600 = palette.match(/--color-blue-600:\s*([^;]+);/)?.[1]
    const lightPrimary = appTheme
      .match(/:root\s*\{([\s\S]*?)\n\}/)?.[1]
      ?.match(/--primary:\s*([^;]+);/)?.[1]
    const darkPrimary = appTheme
      .match(/\.dark\s*\{([\s\S]*?)\n\}/)?.[1]
      ?.match(/--primary:\s*([^;]+);/)?.[1]

    expect(theme?.cssVars?.theme?.["color-blue-600"]).toBe(blue600)
    expect(theme?.cssVars?.light?.primary).toBe(lightPrimary)
    expect(theme?.cssVars?.dark?.primary).toBe(darkPrimary)
  })

  it("uses unique names and only references source files that exist", () => {
    const registry = readRegistry()
    const names = registry.items.map((item) => item.name)

    expect(new Set(names).size).toBe(names.length)

    for (const item of registry.items) {
      for (const file of item.files ?? []) {
        expect(existsSync(resolve(file.path)), `${item.name}: ${file.path}`).toBe(
          true
        )
      }
    }
  })

  it("keeps the registry Base UI-only", () => {
    const registry = readRegistry()
    const source = registry.items
      .flatMap((item) => item.files ?? [])
      .filter((file) => existsSync(resolve(file.path)))
      .map((file) => readFileSync(resolve(file.path), "utf8"))
      .join("\n")

    expect(source).not.toMatch(/@radix-ui|radix-ui/)
  })
})
