import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "./_component/dashboard-view";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  let isOnboarded = false;

  try {
    const status = await getUserOnboardingStatus();
    isOnboarded = status.isOnboarded;
  } catch (error) {
    console.error("[DashboardPage] Error checking onboarding status:", error);
  }

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  let insights = [];

  try {
    insights = await getIndustryInsights();
  } catch (error) {
    console.error("[DashboardPage] Error fetching insights:", error);
  }

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
}
