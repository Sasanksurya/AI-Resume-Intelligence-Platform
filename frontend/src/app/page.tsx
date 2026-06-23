import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import StatsCards from "@/components/dashboard/StatsCards";
import ResumeUploadCard from "@/components/dashboard/ResumeUploadCard";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeBanner />
      <StatsCards />
      <ResumeUploadCard />
    </div>
  );
}