import { DashboardHeader } from "@/components/DashboardHeader";
import { TrialBalanceContent } from "@/components/TrialBalanceContent";
import { ScrollText } from "lucide-react";

export default function TrialBalancePage() {
  return (
    <main className="flex flex-col h-screen w-full overflow-hidden">
      <DashboardHeader Icon={ScrollText} label="Trial Balance" />
      <div className="flex-1 flex justify-center items-center border-2 overflow-y-scroll scrollBar">
        <TrialBalanceContent />
      </div>
    </main>
  );
}
