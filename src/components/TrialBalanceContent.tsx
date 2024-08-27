"use client";

import { CustomDate } from "@/components/CustomDate";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Approver {
  id: number;
  value: string;
  amount: string;
}

export const TrialBalanceContent = () => {
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleSubmit = () => {
    startTransition(() => {
      const values = {
        startDate: format(date.startDate, "yyyy-MM-dd"),
        endDate: format(date.endDate, "yyyy-MM-dd"),
      };

      if (!values.startDate || !values.endDate) {
        toast.error("Error", {
          description: "Please fill in all required fields",
        });
        return;
      }

      console.log(values);
      toast.success("Success", {
        description: "Trial balance generated successfully.",
      });
      setDate({ startDate: new Date(), endDate: new Date() });
    });
  };

  return (
    <div className="flex flex-col gap-6 w-[600px] p-8 border rounded-md shadow-lg">
      <h1 className="font-semibold text-2xl">Generate a Trial Balance</h1>

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
          Generate Trial Balance
        </Button>
      </div>
    </div>
  );
};
