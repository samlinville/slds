import { ModeToggle } from "@/components/mode-toggle"
import { DashboardPage } from "@/blocks/dashboard-01"
import Preview02Example from "@/blocks/kitchen-sink"
import { buttonVariants } from "@/components/ui/button"
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

export function App() {
  const dashboardPath = `${import.meta.env.BASE_URL}dashboard`
  const isDashboard =
    window.location.pathname.replace(/\/$/, "") ===
    dashboardPath.replace(/\/$/, "")

  return (
    <TooltipProvider>
      <div className="style-mira isolate min-h-svh bg-background text-foreground">
        {isDashboard ? <DashboardPage /> : <KitchenSinkPage />}
      </div>
    </TooltipProvider>
  )
}

export default App
