import { NewInvoiceForm } from "@/components/NewInvoiceForm";
import { InvoicePreview } from "@/components/InvoicePreview";

export const InvoiceContent = () => {
  return (
    <div className="grid grid-cols-12 gap-4 scrollBar overflow-y-scroll">
      <div className="col-span-5 p-4 border rounded-md shadow-md">
        <NewInvoiceForm />
      </div>
      <div className="col-span-7 p-4 border rounded-md shadow-md">
        <InvoicePreview />
      </div>
    </div>
  );
};
