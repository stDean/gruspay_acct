import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const CustomSelect = ({
  items,
  value,
  label,
  handleChange,
  width,
}: {
  items: ReactNode;
  value: string;
  label: string;
  width?: boolean;
  handleChange: (value: string, id?: number) => void;
}) => {
  return (
    <Select
      value={value}
      onValueChange={(value: string, id?: number) => handleChange(value, id!)}
    >
      <SelectTrigger className={cn({ "w-full": width })}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
