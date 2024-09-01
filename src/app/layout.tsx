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
      <body className={`${inter.className} scrollBar`}>
        <main>{children}</main>

        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
