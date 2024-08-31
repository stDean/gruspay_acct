"use client";

import { CustomDate } from "@/components/CustomDate";
import { CustomSelect } from "@/components/CustomSelect";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CirclePlus, X } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";

interface Approver {
  id: number;
  value: string;
  amount: string;
  desc: string;
}

export const TransactionContent = () => {
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState<Date>(new Date());
  const [narration, setNarration] = useState("");
  const [cr, setCr] = useState<{ cr: string; Amount: string; desc: string }>({
    cr: "cash",
    Amount: "",
    desc: "",
  });
  const [dr, setDr] = useState<Array<Approver>>([
    { id: 1, value: "machinery", amount: "", desc: "" },
  ]);

  const handleAddDr = () => {
    setDr(prevDr => [
      ...prevDr,
      { id: prevDr.length + 1, value: "machinery", amount: "", desc: "" },
    ]);
  };

  const handleChange = (id: number, value: string) => {
    setDr(dr => dr.map(item => (item.id === id ? { ...item, value } : item)));
  };

  const handleAmountChange = (id: number, amount: string) => {
    setDr(dr => dr.map(item => (item.id === id ? { ...item, amount } : item)));
  };

  const handleDescChange = (id: number, desc: string) => {
    setDr(dr => dr.map(item => (item.id === id ? { ...item, desc } : item)));
  };

  const handleSubmit = () => {
    startTransition(() => {
      const values = {
        date: format(date, "yyyy-MM-dd"),
        cr: { cr: cr.cr, amount: cr.Amount, desc: cr.desc },
        dr: dr.map(item => ({
          id: item.id,
          value: item.value,
          amount: item.amount,
          desc: item.desc,
        })),
        narration: narration,
      };

      if (
        !values.cr.amount ||
        !values.dr.every(item => item.value && item.amount) ||
        !values.narration
      ) {
        toast.error("Error", {
          description: "Please fill in all required fields",
        });
        return;
      }

      console.log(values);
      toast.success("Transaction Successful", {
        description: "Transaction has been posted successfully.",
      });

      setCr({ cr: "cash", Amount: "", desc: "" });
      setDr([{ id: 1, value: "machinery", amount: "", desc: "" }]);
      setNarration("");
      setDate(new Date());
    });
  };

  return (
    <div className="flex flex-col gap-4 w-[700px] p-8 mb-7 border rounded-md  shadow-lg">
      <h1 className="font-semibold text-2xl">Post a Transaction</h1>

      <div className="flex items-center gap-4">
        <p className="w-7 text-sm font-semibold">Date</p>

        <CustomDate
          date={date}
          handleChange={(day?: Date) => setDate(day as Date)}
        />
      </div>

      <div className="flex gap-4 items-center">
        <p className="mt-6 w-7 text-sm font-semibold">Cr</p>

        <div className="flex gap-4 flex-1">
          <div className="flex-1">
            <span className="text-xs">Account</span>

            <CustomSelect
              label="Select Account"
              items={
                <>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                </>
              }
              handleChange={value => setCr({ ...cr, cr: value })}
              value={cr.cr}
            />
          </div>

          <div className="flex-1">
            <span className="text-xs">Amount</span>
            <Input
              value={cr.Amount}
              onChange={e => setCr({ ...cr, Amount: e.target.value })}
              className="!h-9"
            />
          </div>

          <div className="flex-1">
            <span className="text-xs">Description</span>
            <Input
              value={cr.Amount}
              onChange={e => setCr({ ...cr, desc: e.target.value })}
              className="!h-9"
            />
          </div>
        </div>
      </div>

      {dr
        .filter((_, idx: number) => idx <= 4)
        .map(({ id, value, amount, desc }: Approver) => (
          <div className="flex gap-4 items-center" key={`${id}-${value}`}>
            <p className="mt-6 w-7 text-sm font-semibold">Dr</p>

            <div className="flex gap-4 flex-1">
              <div className="flex-1">
                <span className="text-xs">Account</span>

                <CustomSelect
                  label="Select Account"
                  items={
                    <>
                      <SelectItem value="machinery">Machinery</SelectItem>
                      <SelectItem value="tax">Tax</SelectItem>
                    </>
                  }
                  value={value}
                  handleChange={value => handleChange(id, value)}
                />
              </div>

              <div className="flex-1">
                <span className="text-xs">Amount</span>
                <Input
                  value={amount}
                  onChange={e => handleAmountChange(id, e.target.value)}
                  className="!h-9"
                />
              </div>

              <div className="flex-1">
                <span className="text-xs">Description</span>
                <Input
                  value={desc}
                  onChange={e => handleDescChange(id, e.target.value)}
                  className="!h-9"
                />
              </div>
            </div>

            {id >= 2 && (
              <X
                className="h-5 w-5 -mx-4 cursor-pointer text-red-500  mt-5"
                onClick={() => {
                  // remove the value from the dr array
                  setDr(prevDr => prevDr.filter(dr => dr.id !== id));
                }}
              />
            )}
          </div>
        ))}

      <div
        className={cn(
          "px-6 pt-2 text-sm flex items-center gap-2 cursor-pointer w-fit hover:opacity-80",
          {
            hidden: dr.length === 5,
          }
        )}
        onClick={handleAddDr}
      >
        <CirclePlus className="h-3 w-3" strokeWidth={3} />
        <p>Add Account</p>
      </div>

      <div className="flex-1 flex justify-end">
        <Button disabled={isPending} onClick={handleSubmit}>
          Post Transaction
        </Button>
      </div>
    </div>
  );
};
