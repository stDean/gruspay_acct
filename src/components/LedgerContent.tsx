"use client";

import { CustomDate } from "@/components/CustomDate";
import { CustomSelect } from "@/components/CustomSelect";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { format } from "date-fns";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Approver {
  id: number;
  value: string;
  amount: string;
}

export const LedgerContent = () => {
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [account, setAccount] = useState<string>("general");

  const handleSubmit = () => {
    startTransition(() => {
      const values = {
        account,
        startDate: format(date.startDate, "yyyy-MM-dd"),
        endDate: format(date.endDate, "yyyy-MM-dd"),
      };

      if (!values.account || !values.startDate || !values.endDate) {
        toast.error("Error", {
          description: "Please fill in all required fields",
        });
        return;
      }

      console.log(values);
      toast.success("Success", {
        description: "Ledger generated successfully.",
      });
      setDate({ startDate: new Date(), endDate: new Date() });
      setAccount("general");
    });
  };

  return (
    <div className="flex flex-col gap-6 w-[700px] p-8 border rounded-md shadow-lg">
      <h1 className="font-semibold text-2xl">Generate a Ledger</h1>

      <div className="flex items-center gap-1">
        <p className="text-sm font-semibold w-16">Select Account</p>

        <CustomSelect
          width
          label="Select Account"
          items={
            <>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </>
          }
          handleChange={(value: string) => setAccount(value)}
          value={account}
        />
      </div>

      <div className="flex gap-6 items-center">
        <p className="mt-6 w-16 text-sm font-semibold">Period</p>

        <div className="flex gap-4 flex-1">
          <div className="flex-1 flex flex-col">
            <span className="text-xs">Start Date</span>

            <CustomDate
              flx
              date={date.startDate}
              handleChange={(day?: Date) =>
                setDate({ ...date, startDate: day as Date })
              }
            />
          </div>

          <div className="flex-1 flex flex-col">
            <span className="text-xs">End Date</span>

            <CustomDate
              flx
              date={date.endDate}
              handleChange={(day?: Date) =>
                setDate({ ...date, endDate: day as Date })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-end">
        <Button disabled={isPending} onClick={handleSubmit}>
          Generate Ledger
        </Button>
      </div>
    </div>
  );
};
