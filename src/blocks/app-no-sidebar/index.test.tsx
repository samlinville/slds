import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"

import { AppNoSidebar } from "./index"

describe("AppNoSidebar", () => {
  afterEach(cleanup)

  it("renders an emoji, a text title, or both as the app identity", () => {
    const { rerender } = render(
      <AppNoSidebar appEmoji="🚀">Content</AppNoSidebar>
    )

    expect(screen.getByText("🚀")).toBeInTheDocument()

    rerender(<AppNoSidebar appTitle="Orbit">Content</AppNoSidebar>)

    expect(screen.getByRole("heading", { name: "Orbit" })).toBeInTheDocument()

    rerender(
      <AppNoSidebar appEmoji="🚀" appTitle="Orbit">
        Content
      </AppNoSidebar>
    )

    expect(screen.getByText("🚀")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Orbit" })).toBeInTheDocument()
  })

  it("uses a borderless navigation bar", () => {
    render(<AppNoSidebar appTitle="Orbit">Content</AppNoSidebar>)

    expect(screen.getByRole("banner")).not.toHaveClass("border-b")
  })
})
