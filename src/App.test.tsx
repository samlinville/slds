/// <reference types="node" />

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

import App from "@/App"
import { ThemeProvider } from "@/components/theme-provider"

function renderApp() {
  return render(
    <ThemeProvider defaultTheme="light" disableTransitionOnChange={false}>
      <App />
    </ThemeProvider>
  )
}

describe("shadcn Mira kitchen sink", () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ""
    window.history.replaceState(null, "", "/")
  })

  it("renders the exact reference card content", () => {
    renderApp()

    expect(
      screen.getByRole("heading", { name: "Mira component kitchen sink" })
    ).toBeInTheDocument()
    expect(screen.getByText("Contribution History")).toBeInTheDocument()
    expect(screen.getByText("Q2 Dividend Income")).toBeInTheDocument()
    expect(screen.getByText("$1,842.10")).toBeInTheDocument()
    expect(screen.getByText("Payout Threshold")).toBeInTheDocument()
    expect(screen.getByText("Kitchen Island")).toBeInTheDocument()
    expect(screen.getByText("Recent Transactions")).toBeInTheDocument()
    expect(screen.getByText("Upcoming Payments")).toBeInTheDocument()
  })

  it("links the kitchen sink header to the dashboard", () => {
    renderApp()

    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/dashboard"
    )
  })

  it("renders dashboard-01 at the dashboard path", () => {
    window.history.replaceState(null, "", "/dashboard")
    renderApp()

    expect(screen.getByText("Total Revenue")).toBeInTheDocument()
    expect(screen.getByText("New Customers")).toBeInTheDocument()
    expect(screen.getByText("Total Visitors")).toBeInTheDocument()
    expect(screen.getByRole("table")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Kitchen Sink" })).toHaveAttribute(
      "href",
      "/"
    )
  })

  it("toggles directly between light and dark themes", async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(
      screen.getByRole("button", { name: "Switch to dark mode" })
    )
    expect(document.documentElement).toHaveClass("dark")
    expect(localStorage.getItem("theme")).toBe("dark")

    await user.click(
      screen.getByRole("button", { name: "Switch to light mode" })
    )
    expect(document.documentElement).toHaveClass("light")
    expect(localStorage.getItem("theme")).toBe("light")
    expect(
      screen.queryByRole("menuitem", { name: "System" })
    ).not.toBeInTheDocument()
  })

  it("supports the demo's selectable scene controls", async () => {
    const user = userEvent.setup()
    renderApp()

    const dining = screen.getByRole("button", { name: "Dining" })
    await user.click(dining)

    expect(dining).toHaveAttribute("aria-pressed", "true")
  })

  it("exposes the gallery through a main landmark", () => {
    renderApp()

    expect(screen.getByRole("main")).toBeInTheDocument()
  })

  it("preserves the reference's horizontally scrolling masonry structure", () => {
    renderApp()

    const gallery = document.querySelector('[data-slot="capture-target"]')

    expect(gallery).toHaveClass("grid")
    expect(gallery?.children[2]).toHaveClass("col-span-2")
    expect(gallery?.parentElement?.parentElement).toHaveClass(
      "overflow-x-auto",
      "overflow-y-hidden"
    )
    expect(gallery?.closest(".style-mira")).not.toBeNull()
  })

  it("registers the Mira Tailwind variant used by the reference layout", () => {
    const stylesheet = readFileSync(resolve("src/index.css"), "utf8")

    expect(stylesheet).toContain(
      "@custom-variant style-mira (&:is(.style-mira *));"
    )
  })

  it("adds the second reference card set to the same masonry canvas", () => {
    renderApp()

    expect(screen.getByText("Invoice #INV-2847")).toBeInTheDocument()
    expect(screen.getByText("Environment Variables")).toBeInTheDocument()
    expect(screen.getByText("Live Audio Waveform")).toBeInTheDocument()
    expect(screen.getByText("404 - Not Found")).toBeInTheDocument()

    const gallery = document.querySelector('[data-slot="capture-target"]')

    expect(gallery).toHaveClass(
      "grid-cols-14",
      "w-[4784px]",
      "style-mira:md:w-[5176px]"
    )
    expect(gallery?.children).toHaveLength(13)
  })

  it("uses Flexoki for Tailwind and shadcn semantic colors", () => {
    const stylesheet = readFileSync(resolve("src/index.css"), "utf8")
    const palettePath = resolve("src/styles/flexoki.css")
    const transactions = readFileSync(
      resolve("src/components/kitchen-sink/cards/recent-transactions.tsx"),
      "utf8"
    )

    expect(existsSync(palettePath)).toBe(true)
    if (!existsSync(palettePath)) return

    const palette = readFileSync(palettePath, "utf8")

    expect(stylesheet).toContain('@import "./styles/flexoki.css";')
    expect(palette).toContain("--color-paper: #FFFCF0;")
    expect(palette).toContain("--color-blue-600: #205EA6;")
    expect(palette).toContain("--color-neutral-*: initial;")
    expect(stylesheet).toContain("--background: var(--color-light-bg);")
    expect(stylesheet).toContain("--background: var(--color-dark-bg);")
    expect(stylesheet).toMatch(
      /--primary: var\(--color-light-(?:re|or|ye|gr|cy|bl|pu|ma)\);/
    )
    expect(stylesheet).toMatch(
      /--primary: var\(--color-dark-(?:re|or|ye|gr|cy|bl|pu|ma)\);/
    )
    expect(stylesheet).toContain("--chart-1: var(--color-base-200);")
    expect(stylesheet).toContain("--chart-2: var(--color-base-500);")
    expect(stylesheet).toContain("--chart-3: var(--color-base-700);")
    expect(stylesheet).toContain("--chart-4: var(--color-base-800);")
    expect(stylesheet).toContain("--chart-5: var(--color-base-900);")
    expect(transactions).not.toContain("text-emerald-")
  })
})
