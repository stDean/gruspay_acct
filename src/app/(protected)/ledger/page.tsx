import { DashboardHeader } from "@/components/DashboardHeader";
import { LedgerContent } from "@/components/LedgerContent";
import { ScrollText } from "lucide-react";

export default function LedgerPage() {
  return (
    <main className="flex flex-col h-screen w-full overflow-hidden">
      <DashboardHeader Icon={ScrollText} label="Ledger" />
      <div className="flex-1 flex justify-center mt-32 md:-mt-40 lg:mt-0 md:items-center">
        <LedgerContent />
      </div>
    </main>
  );
}
