"use client";

import { Coins, Receipt, ReceiptText, ScrollText } from "lucide-react";
import { NavLink } from "./NavLink";

export const SideNav = () => {
  return (
    <nav className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center">
        <img
          src="/logo.png"
          alt="logo"
          className=" cursor-pointer"
          // onClick={() => router.push("/dashboard")}
        />
      </div>

      <div className="flex flex-col gap-2 -mt-20 flex-1 justify-center">
        <NavLink Icon={Coins} label="Transaction" link="/" />
        <NavLink Icon={ScrollText} label="Ledger" link="/ledger" />
        <NavLink Icon={ReceiptText} label="Invoices" link="/invoice" />
        <NavLink
          Icon={ScrollText}
          label="Trial Balance"
          link="/trial-balance"
        />
        <NavLink Icon={Receipt} label="Financial Statement" link="/statement" />
      </div>
    </nav>
  );
};
