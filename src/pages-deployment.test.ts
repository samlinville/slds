/// <reference types="node" />

import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { describe, expect, it } from "vitest"

describe("GitHub Pages deployment", () => {
  it("builds the Vite app beneath the repository path", () => {
    const config = readFileSync(resolve("vite.config.ts"), "utf8")

    expect(config).toContain('base: process.env.VITE_BASE_PATH ?? "/"')
  })

  it("builds the registry with its final public URL", () => {
    const workflow = readFileSync(
      resolve(".github/workflows/deploy-pages.yml"),
      "utf8"
    )

    expect(workflow).toContain(
      "REGISTRY_URL: https://samlinville.github.io/slds/r"
    )
    expect(workflow).toContain("VITE_BASE_PATH: /slds/")
  })

  it("publishes an SPA fallback for direct dashboard visits", () => {
    const workflow = readFileSync(
      resolve(".github/workflows/deploy-pages.yml"),
      "utf8"
    )

    expect(workflow).toContain("cp dist/index.html dist/404.html")
  })
})
