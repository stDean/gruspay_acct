"use client";

import { CustomDate } from "@/components/CustomDate";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";

interface InvoiceProps {
  billTo: string;
  email: string;
  desc: string;
  addInfo: string;
  price: string;
  unit: string;
  invoiceNo: string;
}

function Inputs({
  label,
  val,
  handleInputChange,
  type,
  disabled,
}: {
  label: string;
  val: string;
  type: "email" | "text";
  handleInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid grid-cols-12">
      <p className="self-center text-sm font-semibold col-span-3">{label}</p>

      <div className="flex gap-4 col-span-9">
        <div className="flex-1">
          <Input
            type={type}
            value={val}
            onChange={handleInputChange}
            className="!h-9 w-[290px]"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}

export const NewInvoiceForm = () => {
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState<Date>(new Date());
  const [invoiceVal, setInvoiceVal] = useState<InvoiceProps>({
    billTo: "",
    email: "",
    desc: "",
    addInfo: "",
    price: "",
    unit: "",
    invoiceNo: "GSP10234",
  });

  const LABELS: { [key in keyof InvoiceProps]: string } = {
    billTo: "Bill To",
    email: "Email",
    desc: "Description",
    addInfo: "Additional Info",
    price: "Price",
    unit: "Unit",
    invoiceNo: "Invoice No",
  };

  const handleSubmit = () => {
    startTransition(() => {
      const values = {
        ...invoiceVal,
        date: format(date, "yyyy-MM-dd"),
      };

      if (Object.values(values).every(value => !value)) {
        toast.error("Error", {
          description: "Please fill in all required fields",
        });
        return;
      }

      console.log(values);
      toast.success("Invoice Successful", {
        description: "Invoice created successfully.",
      });

      setDate(new Date());
      setInvoiceVal({
        billTo: "",
        email: "",
        desc: "",
        addInfo: "",
        price: "",
        unit: "",
        invoiceNo: "GSP10234",
      });
    });
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="font-semibold text-2xl">New Invoice</h1>

      <div className="gap-4 grid grid-cols-12 ">
        <p className="text-sm font-semibold col-span-3 self-center">Date</p>

        <div className="col-span-9">
          <CustomDate date={date} handleChange={e => setDate(e as Date)} />
        </div>
      </div>

      {[
        Object.keys(invoiceVal).map(val => (
          <Inputs
            key={val}
            type={val === "email" ? "email" : "text"}
            val={invoiceVal[val as keyof InvoiceProps]}
            label={LABELS[val as keyof InvoiceProps] || "Invoice No"}
            handleInputChange={e =>
              setInvoiceVal({ ...invoiceVal, [val]: e.target.value })
            }
            disabled={val === "invoiceNo"}
          />
        )),
      ]}

      <div className="flex-1 flex justify-end">
        <Button disabled={isPending} onClick={handleSubmit} className="px-8">
          Send
        </Button>
      </div>
    </div>
  );
};
