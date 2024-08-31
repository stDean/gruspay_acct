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

export const StatementContent = () => {
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [statement, setStatement] = useState<string>("stmtofpnl");

  const handleSubmit = () => {
    startTransition(() => {
      const values = {
        statement,
        startDate: format(date.startDate, "yyyy-MM-dd"),
        endDate: format(date.endDate, "yyyy-MM-dd"),
      };

      if (!values.statement || !values.startDate || !values.endDate) {
        toast.error("Error", {
          description: "Please fill in all required fields",
        });
        return;
      }

      console.log(values);
      toast.success("Success", {
        description: "Statement generated successfully.",
      });
      setDate({ startDate: new Date(), endDate: new Date() });
      setStatement("stmtofpnl");
    });
  };

  return (
    <div className="flex flex-col gap-6 md:w-[600px] p-5 -mt-20 md:mt-0 md:p-8 border rounded-md shadow-lg">
      <h1 className="font-semibold text-xl md:text-2xl">Generate Financial Statement</h1>

      <div className="flex items-center md:justify-between">
        <p className="text-xs md:text-sm font-semibold w-24">Select Statement</p>

        <CustomSelect
          width
          label="Select Statement"
          items={
            <>
              <SelectItem value="stmtofpnl">Statement of profit or loss</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </>
          }
          handleChange={(value: string) => setStatement(value)}
          value={statement}
        />
      </div>

      <div className="flex items-start md:items-center justify-between">
        <p className="mt-6 w-24 text-xs md:text-sm font-semibold">Period</p>

        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <div className="flex-1 flex flex-col">
            <span className="text-xs">Start Date</span>

            <CustomDate
              flx2
              date={date.startDate}
              handleChange={(day?: Date) =>
                setDate({ ...date, startDate: day as Date })
              }
            />
          </div>

          <div className="flex-1 flex flex-col">
            <span className="text-xs">End Date</span>

            <CustomDate
              flx2
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
          Generate Statement
        </Button>
      </div>
    </div>
  );
};
