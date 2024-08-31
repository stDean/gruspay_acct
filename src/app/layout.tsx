import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SideNav } from "@/components/SideNav";
import { constructMetadata } from "@/lib/utils";
import { MobileNav } from "@/components/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col lg:flex-row h-screen w-full bg-[#EAECF0] overflow-hidden">
          <div className="xl:w-[365px] hidden lg:block p-4 max-h-[98%] overflow-hidden bg-white m-2 rounded-sm shadow-lg">
            <SideNav />
          </div>

          <MobileNav />

          <div className="size-full max-h-[98%] overflow-hidden bg-white lg:m-2 lg:mr-3 rounded-sm shadow-lg">
            {children}
          </div>
        </main>

        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
