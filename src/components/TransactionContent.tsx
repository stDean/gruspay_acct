"use client";

import { CustomDate } from "@/components/CustomDate";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AccountDrop } from "@/constants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Check, ChevronsUpDown, CirclePlus, X } from "lucide-react";
import { ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";

function ComboboxDemo({
  value,
  setValue,
  acct,
}: {
  value: string;
  setValue: (currentValue: string) => void;
  acct: string[];
}) {
  const [open, setOpen] = useState(false);
  const frameWorks = acct.map(item => ({ value: item, label: item }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="w-[295px] md:w-[190px] overflow-hidden"
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between text-xs px-2"
        >
          <span className="truncate">
            {value
              ? frameWorks.find(framework => framework.value === value)?.label
              : "Select framework..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[295px] md:w-[190px] p-0">
        <Command>
          <CommandInput placeholder="Search account..." />
          <CommandList>
            <CommandEmpty>No account found.</CommandEmpty>
            <CommandGroup>
              {frameWorks.map(framework => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="text-xs"
                >
                  <Check
                    className={cn(
                      "mr-1 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface Approver {
  id: number;
  value: string;
  amount: string;
  desc: string;
}

const Inputs = ({
  label,
  val,
  handleChange,
}: {
  label: string;
  val: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex-1">
      <span className="text-xs">{label}</span>
      <Input
        value={val}
        onChange={handleChange}
        className="!h-9 w-[295px] md:w-[190px]"
      />
    </div>
  );
};

export const TransactionContent = () => {
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState<Date>(new Date());
  const [narration, setNarration] = useState("");
  const [cr, setCr] = useState<{ cr: string; Amount: string; desc: string }>({
    cr: AccountDrop[0],
    Amount: "",
    desc: "",
  });
  const [dr, setDr] = useState<Array<Approver>>([
    { id: 1, value: AccountDrop[0], amount: "", desc: "" },
  ]);

  const handleAddDr = () => {
    setDr(prevDr => [
      ...prevDr,
      { id: prevDr.length + 1, value: AccountDrop[0], amount: "", desc: "" },
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

  console.log({ a: cr.cr, b: dr.map(item => item.value) });

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

      console.log({ first: values });

      if (
        !values.cr.amount ||
        !values.dr.every(item => item.value && item.amount)
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

      setCr({ cr: AccountDrop[0], Amount: "", desc: "" });
      setDr([{ id: 1, value: AccountDrop[0], amount: "", desc: "" }]);
      setNarration("");
      setDate(new Date());
    });
  };

  return (
    <div className="flex flex-col gap-4 m-fit md:w-[700px] p-4 md:p-8 mb-16 border rounded-md shadow-lg h-fit md:h-fit">
      <h1 className="font-semibold text-xl md:text-2xl">Post a Transaction</h1>

      <div className="flex items-center gap-4">
        <p className="w-7 text-sm font-semibold">Date</p>

        <CustomDate
          date={date}
          handleChange={(day?: Date) => setDate(day as Date)}
        />
      </div>

      <div className="flex gap-4 md:items-center">
        <p className="mt-6 w-7 text-sm font-semibold">Cr</p>

        <div className="flex flex-col md:items-center md:flex-row gap-2 flex-1">
          <div className="flex-1 flex flex-col gap-1 mt-1">
            <span className="text-xs">Account</span>

            <ComboboxDemo
              acct={AccountDrop}
              value={cr.cr}
              setValue={value => setCr({ ...cr, cr: value })}
            />
          </div>

          <Inputs
            label="Amount"
            val={cr.Amount}
            handleChange={e => setCr({ ...cr, Amount: e.target.value })}
          />

          <Inputs
            label="Description"
            val={cr.desc}
            handleChange={e => setCr({ ...cr, desc: e.target.value })}
          />
        </div>
      </div>

      {dr
        .filter((_, idx: number) => idx <= 4)
        .map(({ id, value, amount, desc }: Approver) => (
          <div className="flex gap-4 md:items-center" key={`${id}-${value}`}>
            <p className="mt-6 w-7 text-sm font-semibold">Dr</p>

            <div className="flex flex-col md:items-center md:flex-row gap-2 flex-1">
              <div className="flex-1 flex flex-col gap-1 mt-1">
                <span className="text-xs">Account</span>

                <ComboboxDemo
                  acct={AccountDrop}
                  value={value}
                  setValue={value => handleChange(id, value)}
                />
              </div>

              <Inputs
                label="Amount"
                val={amount}
                handleChange={e => handleAmountChange(id, e.target.value)}
              />

              <Inputs
                label="Description"
                val={desc}
                handleChange={e => handleDescChange(id, e.target.value)}
              />
            </div>

            {id >= 2 && (
              <X
                className="h-5 w-5 -mr-5 md:-mx-3 cursor-pointer text-red-500 mt-[110px] md:mt-5"
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
