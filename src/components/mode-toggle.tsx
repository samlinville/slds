import { MoonIcon, SunIcon } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  const nextTheme = isDark ? "light" : "dark"

  return (
    <Button
      aria-label={`Switch to ${nextTheme} mode`}
      onClick={() => setTheme(nextTheme)}
      size="icon"
      title={`Switch to ${nextTheme} mode`}
      variant="outline"
    >
      {isDark ? (
        <MoonIcon aria-hidden="true" />
      ) : (
        <SunIcon aria-hidden="true" />
      )}
    </Button>
  )
}
