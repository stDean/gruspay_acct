import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SideNav } from "@/components/SideNav";
import { constructMetadata } from "@/lib/utils";

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
        <main className="flex h-screen w-full bg-[#EAECF0] overflow-hidden">
          <div className="w-[365px] p-4 max-h-[98%] overflow-hidden bg-white m-2 rounded-sm shadow-lg">
            <SideNav />
          </div>

          <div className="size-full max-h-[98%] overflow-hidden bg-white m-2 mr-3 rounded-sm shadow-lg">
            {children}
          </div>
        </main>

        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
