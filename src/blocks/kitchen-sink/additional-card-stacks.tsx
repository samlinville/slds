import { ActivateAgentDialog } from "./preview-cards/activate-agent-dialog"
import { AnalyticsCard } from "./preview-cards/analytics-card"
import { AnomalyAlert } from "./preview-cards/anomaly-alert"
import { BarChartCard } from "./preview-cards/bar-chart-card"
import { BookAppointment } from "./preview-cards/book-appointment"
import { CodespacesCard } from "./preview-cards/codespaces-card"
import { ContributionsActivity } from "./preview-cards/contributions-activity"
import { Contributors } from "./preview-cards/contributors"
import { EnvironmentVariables } from "./preview-cards/environment-variables"
import { FeedbackForm } from "./preview-cards/feedback-form"
import { FileUpload } from "./preview-cards/file-upload"
import { GithubProfile } from "./preview-cards/github-profile"
import { IconPreviewGrid } from "./preview-cards/icon-preview-grid"
import { InviteTeam } from "./preview-cards/invite-team"
import { Invoice } from "./preview-cards/invoice"
import { LiveWaveformCard } from "./preview-cards/live-waveform"
import { NoTeamMembers } from "./preview-cards/no-team-members"
import { NotFound } from "./preview-cards/not-found"
import { ObservabilityCard } from "./preview-cards/observability-card"
import { PieChartCard } from "./preview-cards/pie-chart-card"
import { ReportBug } from "./preview-cards/report-bug"
import { ShippingAddress } from "./preview-cards/shipping-address"
import { Shortcuts } from "./preview-cards/shortcuts"
import { SkeletonLoading } from "./preview-cards/skeleton-loading"
import { SleepReport } from "./preview-cards/sleep-report"
import { StyleOverview } from "./preview-cards/style-overview"
import { TypographySpecimen } from "./preview-cards/typography-specimen"
import { UIElements } from "./preview-cards/ui-elements"
import { UsageCard } from "./preview-cards/usage-card"
import { Visitors } from "./preview-cards/visitors"
import { WeeklyFitnessSummary } from "./preview-cards/weekly-fitness-summary"

export function AdditionalCardStacks() {
  return (
    <>
      <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
        <StyleOverview />
        <TypographySpecimen />
        <div className="md:hidden">
          <UIElements />
        </div>
        <CodespacesCard />
        <Invoice />
      </div>
      <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
        <IconPreviewGrid />
        <div className="hidden w-full md:flex">
          <UIElements />
        </div>
        <ObservabilityCard />
        <ShippingAddress />
      </div>
      <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
        <EnvironmentVariables />
        <BarChartCard />
        <InviteTeam />
        <ActivateAgentDialog />
      </div>
      <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
        <SkeletonLoading />
        <PieChartCard />
        <NoTeamMembers />
        <ReportBug />
        <Contributors />
      </div>
      <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
        <FeedbackForm />
        <BookAppointment />
        <SleepReport />
        <GithubProfile />
      </div>
      <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
        <WeeklyFitnessSummary />
        <FileUpload />
        <AnalyticsCard />
        <UsageCard />
        <Shortcuts />
      </div>
      <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
        <AnomalyAlert />
        <LiveWaveformCard />
        <Visitors />
        <ContributionsActivity />
        <NotFound />
      </div>
    </>
  )
}
