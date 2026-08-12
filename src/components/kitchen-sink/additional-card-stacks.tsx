import { ActivateAgentDialog } from "@/components/kitchen-sink/preview-cards/activate-agent-dialog"
import { AnalyticsCard } from "@/components/kitchen-sink/preview-cards/analytics-card"
import { AnomalyAlert } from "@/components/kitchen-sink/preview-cards/anomaly-alert"
import { BarChartCard } from "@/components/kitchen-sink/preview-cards/bar-chart-card"
import { BookAppointment } from "@/components/kitchen-sink/preview-cards/book-appointment"
import { CodespacesCard } from "@/components/kitchen-sink/preview-cards/codespaces-card"
import { ContributionsActivity } from "@/components/kitchen-sink/preview-cards/contributions-activity"
import { Contributors } from "@/components/kitchen-sink/preview-cards/contributors"
import { EnvironmentVariables } from "@/components/kitchen-sink/preview-cards/environment-variables"
import { FeedbackForm } from "@/components/kitchen-sink/preview-cards/feedback-form"
import { FileUpload } from "@/components/kitchen-sink/preview-cards/file-upload"
import { GithubProfile } from "@/components/kitchen-sink/preview-cards/github-profile"
import { IconPreviewGrid } from "@/components/kitchen-sink/preview-cards/icon-preview-grid"
import { InviteTeam } from "@/components/kitchen-sink/preview-cards/invite-team"
import { Invoice } from "@/components/kitchen-sink/preview-cards/invoice"
import { LiveWaveformCard } from "@/components/kitchen-sink/preview-cards/live-waveform"
import { NoTeamMembers } from "@/components/kitchen-sink/preview-cards/no-team-members"
import { NotFound } from "@/components/kitchen-sink/preview-cards/not-found"
import { ObservabilityCard } from "@/components/kitchen-sink/preview-cards/observability-card"
import { PieChartCard } from "@/components/kitchen-sink/preview-cards/pie-chart-card"
import { ReportBug } from "@/components/kitchen-sink/preview-cards/report-bug"
import { ShippingAddress } from "@/components/kitchen-sink/preview-cards/shipping-address"
import { Shortcuts } from "@/components/kitchen-sink/preview-cards/shortcuts"
import { SkeletonLoading } from "@/components/kitchen-sink/preview-cards/skeleton-loading"
import { SleepReport } from "@/components/kitchen-sink/preview-cards/sleep-report"
import { StyleOverview } from "@/components/kitchen-sink/preview-cards/style-overview"
import { TypographySpecimen } from "@/components/kitchen-sink/preview-cards/typography-specimen"
import { UIElements } from "@/components/kitchen-sink/preview-cards/ui-elements"
import { UsageCard } from "@/components/kitchen-sink/preview-cards/usage-card"
import { Visitors } from "@/components/kitchen-sink/preview-cards/visitors"
import { WeeklyFitnessSummary } from "@/components/kitchen-sink/preview-cards/weekly-fitness-summary"

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
