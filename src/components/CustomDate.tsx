import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export const CustomDate = ({
  date,
  handleChange,
  flx,
}: {
  date?: Date;
  handleChange: (day?: Date) => void;
  flx?: boolean;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[295px] justify-start text-left font-normal", {
            "text-muted-foreground": !date,
            "w-[280px]": flx,
          })}
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="h-4 w-4 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={day => handleChange(day as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
