import { NewInvoiceForm } from "@/components/NewInvoiceForm";
import { InvoicePreview } from "@/components/InvoicePreview";

export const InvoiceContent = () => {
  return (
    <div className="flex lg:grid grid-cols-12 gap-4 scrollBar overflow-y-scroll py-10 w-full justify-center">
      <div className="lg:col-span-6 xl:col-span-5 p-4 border rounded-md shadow-md h-fit">
        <NewInvoiceForm />
      </div>
      <div className="hidden md:block md:flex-1 lg:col-span-6 xl:col-span-7 p-4 border rounded-md shadow-md">
        <InvoicePreview />
      </div>
    </div>
  );
};
