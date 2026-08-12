import { AdditionalCardStacks } from "@/components/kitchen-sink/additional-card-stacks"
import { AccountAccess } from "@/components/kitchen-sink/cards/account-access"
import { CardOverview } from "@/components/kitchen-sink/cards/card-overview"
import { ClaimableBalance } from "@/components/kitchen-sink/cards/claimable-balance"
import { ContributionHistory } from "@/components/kitchen-sink/cards/contribution-history"
import { CoverArt } from "@/components/kitchen-sink/cards/cover-art"
import { DividendIncome } from "@/components/kitchen-sink/cards/dividend-income"
import { EmptyConnectBank } from "@/components/kitchen-sink/cards/empty-connect-bank"
import { EmptyDistributeTrack } from "@/components/kitchen-sink/cards/empty-distribute-track"
import { EmptyExploreCatalog } from "@/components/kitchen-sink/cards/empty-explore-catalog"
import { Faq } from "@/components/kitchen-sink/cards/faq"
import { FrontDoor } from "@/components/kitchen-sink/cards/front-door"
import { IndexInvesting } from "@/components/kitchen-sink/cards/index-investing"
import { KitchenIsland } from "@/components/kitchen-sink/cards/kitchen-island"
import { LoadingCard } from "@/components/kitchen-sink/cards/loading-card"
import { NewMilestone } from "@/components/kitchen-sink/cards/new-milestone"
import { NotificationSettings } from "@/components/kitchen-sink/cards/notification-settings"
import { Payments } from "@/components/kitchen-sink/cards/payments"
import { PayoutThreshold } from "@/components/kitchen-sink/cards/payout-threshold"
import { PowerUsage } from "@/components/kitchen-sink/cards/power-usage"
import { Preferences } from "@/components/kitchen-sink/cards/preferences"
import { QrConnect } from "@/components/kitchen-sink/cards/qr-connect"
import { ReceivingMethod } from "@/components/kitchen-sink/cards/receiving-method"
import { RecentTransactions } from "@/components/kitchen-sink/cards/recent-transactions"
import { ReleaseCatalog } from "@/components/kitchen-sink/cards/release-catalog"
import { RollerShades } from "@/components/kitchen-sink/cards/roller-shades"
import { SavingsProgress } from "@/components/kitchen-sink/cards/savings-progress"
import { SavingsTargets } from "@/components/kitchen-sink/cards/savings-targets"
import { SidebarNav } from "@/components/kitchen-sink/cards/sidebar-nav"
import { SocialLinks } from "@/components/kitchen-sink/cards/social-links"
import { StockPerformance } from "@/components/kitchen-sink/cards/stock-performance"
import { SyncingState } from "@/components/kitchen-sink/cards/syncing-state"
import { TransferFunds } from "@/components/kitchen-sink/cards/transfer-funds"
import { UpcomingPayments } from "@/components/kitchen-sink/cards/upcoming-payments"

export default function Preview02Example() {
  return (
    <section
      aria-label="Component gallery"
      className="3xl:[--gap:--spacing(12)] style-lyra:md:[--gap:--spacing(6)] overflow-x-auto overflow-y-hidden bg-muted contain-[paint] [--gap:--spacing(4)] md:[--gap:--spacing(10)] dark:bg-background style-mira:md:[--gap:--spacing(6)]"
    >
      <div className="flex w-full min-w-max justify-center">
        <div
          className="style-lyra:md:w-[5176px] grid w-[4784px] grid-cols-14 items-start gap-(--gap) bg-muted p-(--gap) md:w-[5960px] dark:bg-background style-mira:md:w-[5176px] *:[div]:gap-(--gap)"
          data-slot="capture-target"
        >
          <div className="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <ContributionHistory />
            <EmptyDistributeTrack />
            <QrConnect />
            <DividendIncome />
            <IndexInvesting />
            <SyncingState />
          </div>
          <div className="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <PayoutThreshold />
            <ClaimableBalance />
            <Preferences />
            <SavingsProgress />
            <KitchenIsland />
          </div>
          <div className="col-span-2 flex flex-col p-1 [contain-intrinsic-size:760px_1200px] [content-visibility:auto]">
            <SavingsTargets />
            <RecentTransactions />
            <div className="grid grid-cols-2 items-start gap-(--gap)">
              <div className="flex flex-col gap-(--gap)">
                <SidebarNav />
                <Faq />
              </div>
              <div className="flex flex-col gap-(--gap)">
                <Payments />
                <FrontDoor />
              </div>
            </div>
            <ReleaseCatalog />
          </div>
          <div className="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <AccountAccess />
            <CardOverview />
            <TransferFunds />
            <CoverArt />
            <LoadingCard />
          </div>
          <div className="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <ReceivingMethod />
            <PowerUsage />
            <EmptyConnectBank />
            <UpcomingPayments />
            <RollerShades />
          </div>
          <div className="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <StockPerformance />
            <EmptyExploreCatalog />
            <NewMilestone />
            <SocialLinks />
            <NotificationSettings />
          </div>
          <AdditionalCardStacks />
        </div>
      </div>
    </section>
  )
}
