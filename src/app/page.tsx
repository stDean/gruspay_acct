import { DashboardHeader } from "@/components/DashboardHeader";
import { TransactionContent } from "@/components/TransactionContent";
import { Coins } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-full overflow-hidden">
      <DashboardHeader Icon={Coins} label="Transaction" />
      <div className="flex-1 flex justify-center items-center border-2 overflow-y-scroll scrollBar">
        <TransactionContent />
      </div>
    </main>
  );
}
