"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      className={cn("flex gap-4 items-center p-3 rounded-sm text-[#344054]", {
        "cursor-pointer bg-[#F5F8FF] text-[#0D039D]": pathname === link!,
      })}
      href={link as string}
    >
      <Icon className="h-5 w-5" />
      <p className="text-sm">{label}</p>
    </Link>
  );
};
