import { ModeToggle } from "@/components/mode-toggle"
import { AppNoSidebar } from "@/blocks/app-no-sidebar"
import { DashboardPage } from "@/blocks/dashboard-01"
import Preview02Example from "@/blocks/kitchen-sink"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

function KitchenSinkPage() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex min-h-16 max-w-[1800px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <h1 className="truncate font-heading text-base font-semibold">
              Mira component kitchen sink
            </h1>
            <p className="truncate text-sm text-muted-foreground">
              Base UI · preset b1D0dv72
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              href={`${import.meta.env.BASE_URL}dashboard`}
            >
              Dashboard
            </a>
            <a
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              href={`${import.meta.env.BASE_URL}app-no-sidebar`}
            >
              App Starter
            </a>
            <ModeToggle />
          </div>
        </div>
      </header>
      <main>
        <Preview02Example />
      </main>
    </>
  )
}

function AppNoSidebarPage() {
  return (
    <AppNoSidebar actions={<ModeToggle />} appEmoji="🖼️" appTitle="mems">
      <div className="grid gap-6 py-6 sm:py-10">
        <div className="grid gap-2">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Build your project from a focused canvas.
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Replace this content with your application. The header and content
            remain centered in a 3xl container while the page stays free of
            sidebar assumptions.
          </p>
        </div>
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Ready for your content</CardTitle>
            <CardDescription>
              Use the main area for settings, onboarding, forms, or an
              authenticated product surface.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Primary action</Button>
          </CardContent>
        </Card>
      </div>
    </AppNoSidebar>
  )
}

export function App() {
  const dashboardPath = `${import.meta.env.BASE_URL}dashboard`
  const appNoSidebarPath = `${import.meta.env.BASE_URL}app-no-sidebar`
  const isDashboard =
    window.location.pathname.replace(/\/$/, "") ===
    dashboardPath.replace(/\/$/, "")
  const isAppNoSidebar =
    window.location.pathname.replace(/\/$/, "") ===
    appNoSidebarPath.replace(/\/$/, "")

  return (
    <TooltipProvider>
      <div className="style-mira isolate min-h-svh bg-background text-foreground">
        {isDashboard ? (
          <DashboardPage />
        ) : isAppNoSidebar ? (
          <AppNoSidebarPage />
        ) : (
          <KitchenSinkPage />
        )}
      </div>
    </TooltipProvider>
  )
}

export default App
