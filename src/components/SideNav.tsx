"use client";

import { getBusiness, deleteBusiness } from "@/app/actions/businessActions";
import { NavLink } from "@/components/NavLink";
import { AccountsLinks, InvoiceLink } from "@/constants";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const SideNav = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const getEmail = async () => {
    const { email } = (await getBusiness()) ?? false;
    setEmail(email);
  };

  console.log({ email });
  useEffect(() => {
    getEmail();
  }, [getEmail]);

  return (
    <nav className="lg:flex flex-col justify-center items-center xl:justify-start xl:items-center gap-4 h-full hidden">
      <div className="justify-center items-center w-56 hidden xl:flex">
        <img
          src="/logo.png"
          alt="logo"
          className="w-56 cursor-pointer"
          // onClick={() => router.push("/dashboard")}
        />
      </div>

      <div className="xl:hidden w-12">
        <img src="/gup.PNG" alt="logo" className="cursor-pointer w-12" />
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

      <div className="flex xl:justify-between justify-center items-center xl:self-start w-full">
        <div className="xl:flex items-center gap-2 hidden">
          <div>
            <p className="font-semibold">Gruspay Inc.</p>
            <p className="text-sm">{email}</p>
          </div>
        </div>

        <LogOut
          className="text-red-500 cursor-pointer h-6 w-6"
          onClick={async () => {
            await deleteBusiness();
            router.push("/sign-in");
          }}
        />
      </div>
    </nav>
  );
};
