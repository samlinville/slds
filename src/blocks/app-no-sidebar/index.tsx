import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

type AppNoSidebarProps = ComponentProps<"main"> & {
  actions?: ReactNode
  appEmoji?: ReactNode
  appTitle?: ReactNode
}

/**
 * A neutral application shell for projects that do not need persistent
 * navigation. Add an emoji, title, and actions when the project needs a top bar.
 */
export function AppNoSidebar({
  actions,
  appEmoji,
  appTitle,
  children,
  className,
  ...props
}: AppNoSidebarProps) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      {(appEmoji || appTitle || actions) && (
        <header>
          <div className="mx-auto flex min-h-16 w-full max-w-3xl items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-2">
              {appEmoji ? (
                <span className="text-xl leading-none">{appEmoji}</span>
              ) : null}
              {appTitle ? (
                <h1 className="truncate font-heading text-base font-semibold">
                  {appTitle}
                </h1>
              ) : null}
            </div>
            {actions ? (
              <div className="flex shrink-0 items-center gap-2">{actions}</div>
            ) : null}
          </div>
        </header>
      )}
      <main
        className={cn("mx-auto w-full max-w-3xl px-4 py-6 sm:px-6", className)}
        {...props}
      >
        {children}
      </main>
    </div>
  )
}
