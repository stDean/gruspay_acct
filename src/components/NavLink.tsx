"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const NavLink = ({
  label,
  Icon,
  link,
}: {
  label: string;
  Icon: LucideIcon;
  link?: string;
}) => {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        "flex gap-4 items-center p-3 rounded-sm text-[#344054] hover:bg-[#F5F8FF]",
        {
          "cursor-pointer bg-[#F5F8FF] text-[#0D039D]": pathname === link!,
        }
      )}
      href={link as string}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="xl:hidden">
            <Icon className="h-7 w-7" />
          </TooltipTrigger>
          <TooltipContent align="center" side="bottom">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
        <Icon className="hidden xl:block xl:h-5 xl:w-5" />
        <p className="hidden xl:block text-sm">{label}</p>
      </TooltipProvider>
    </Link>
  );
};
