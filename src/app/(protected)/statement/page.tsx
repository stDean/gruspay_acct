import { DashboardHeader } from "@/components/DashboardHeader";
import { StatementContent } from "@/components/StatementContent";
import { Receipt } from "lucide-react";

export default function StatementPage() {
  return (
    <main className="flex flex-col h-screen w-full overflow-hidden">
      <DashboardHeader Icon={Receipt} label="Financial Statement" />
      <div className="flex-1 flex justify-center mt-32 md:-mt-40 lg:mt-0 md:items-center">
        <StatementContent />
      </div>
    </main>
  );
}
