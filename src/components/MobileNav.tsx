"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AccountsLinks, InvoiceLink } from "@/constants";
import { cn } from "@/lib/utils";
import { LogOut, LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBusiness, deleteBusiness } from "@/app/actions/businessActions";

const MobileLink = ({
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
    <SheetClose asChild>
      <Link
        className={cn(
          "flex gap-4 items-center p-3 rounded-sm text-[#344054] hover:bg-[#F5F8FF]",
          {
            "cursor-pointer bg-[#F5F8FF] text-[#0D039D]": pathname === link!,
          }
        )}
        href={link as string}
      >
        <Icon className="h-5 w-5" />
        <p className="">{label}</p>
      </Link>
    </SheetClose>
  );
};

export const MobileNav = () => {
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
    <section className="lg:hidden flex justify-between items-center border-b border-[#F9AE19] bg-white p-3 px-6">
      <div className="justify-center items-center w-40">
        <img
          src="/logo.png"
          alt="logo"
          className="w-40 cursor-pointer"
          // onClick={() => router.push("/dashboard")}
        />
      </div>

      <section className="w-fulll max-w-[264px]">
        <Sheet>
          <SheetTrigger>
            <Image
              src="/hamburger.svg"
              width={30}
              height={30}
              alt="menu"
              className="cursor-pointer"
            />
          </SheetTrigger>

          <SheetContent side="right" className="border-none bg-white">
            <img src="/logo.png" className="w-36" alt="Horizon logo" />

            <div className="flex h-[calc(100vh-72px)] flex-col overflow-hidden">
              <SheetClose asChild>
                <nav className="flex h-full flex-col gap-6">
                  <div className="flex flex-col gap-2 mt-5 flex-1 justify-between self-start w-full">
                    <div>
                      <div className="text-[13px] text-[#98A2B3] mt-4">
                        <p className="my-2 text-sm font-medium">Accounting</p>
                        {AccountsLinks.map(({ label, link, Icon }) => (
                          <MobileLink
                            key={label}
                            Icon={Icon}
                            label={label}
                            link={link}
                          />
                        ))}
                      </div>

                      <div className="text-[13px] text-[#98A2B3] mt-4">
                        <p className="my-2 text-sm font-medium">Invoicing</p>
                        {InvoiceLink.map(({ label, link, Icon }) => (
                          <MobileLink
                            key={label}
                            Icon={Icon}
                            label={label}
                            link={link}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center w-full mb-20">
                      <div className="flex items-center gap-2">
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
                  </div>
                </nav>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </section>
    </section>
  );
};
