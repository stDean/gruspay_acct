"use client";

import { NavLink } from "@/components/NavLink";
import { AccountsLinks, InvoiceLink } from "@/constants";

export const SideNav = () => {
  return (
    <nav className="lg:flex flex-col justify-center xl:justify-start xl:items-center gap-4 h-full hidden">
      <div className="justify-center items-center w-56 hidden xl:flex">
        <img
          src="/logo.png"
          alt="logo"
          className="w-56 cursor-pointer"
          // onClick={() => router.push("/dashboard")}
        />
      </div>

      <div className="xl:hidden w-12">
        <img src="/gup.PNG" alt="logo" className="cursor-pointer w-16" />
      </div>

      <div className="flex flex-col gap-2 -mt-40 flex-1 justify-center self-start w-full">
        <div className="flex flex-col items-center xl:block text-[13px] text-[#98A2B3] mt-4">
          <p className="my-2 text-xs xl:text-sm font-medium">Accounting</p>
          {AccountsLinks.map(({ label, link, Icon }) => (
            <NavLink key={label} Icon={Icon} label={label} link={link} />
          ))}
        </div>

        <div className="text-[13px] text-[#98A2B3] mt-4 flex flex-col items-center xl:block">
          <p className="my-2 text-xs xl:text-sm font-medium">Invoicing</p>
          {InvoiceLink.map(({ label, link, Icon }) => (
            <NavLink key={label} Icon={Icon} label={label} link={link} />
          ))}
        </div>
      </div>
    </nav>
  );
};
