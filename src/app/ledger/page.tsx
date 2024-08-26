import { DashboardHeader } from "@/components/DashboardHeader";
import { LedgerContent } from "@/components/LedgerContent";
import { ScrollText } from "lucide-react";

export default function LedgerPage() {
  return (
    <main className="flex flex-col h-screen w-full overflow-hidden">
      <DashboardHeader Icon={ScrollText} label="Ledger" />
      <div className="flex-1 flex justify-center items-center border-2 overflow-y-scroll scrollBar">
        <LedgerContent />
      </div>
    </main>
  );
}
