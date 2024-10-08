import { DashboardHeader } from "@/components/DashboardHeader";
import { InvoiceContent } from "@/components/InvoiceContent";
import { ReceiptText } from "lucide-react";

export default function InvoicePage() {
  return (
    <main className="flex flex-col h-screen w-full overflow-hidden">
      <DashboardHeader Icon={ReceiptText} label="New Invoice" />
      <div className="flex-1 px-6 flex  overflow-y-scroll scrollBar">
        <InvoiceContent />
      </div>
    </main>
  );
}
