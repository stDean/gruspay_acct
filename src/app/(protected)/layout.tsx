import { MobileNav } from "@/components/MobileNav";
import { SideNav } from "@/components/SideNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col lg:flex-row h-screen w-full bg-[#EAECF0] overflow-hidden">
      <div className="xl:w-[365px] hidden lg:block p-4 max-h-[98%] overflow-hidden bg-white m-2 rounded-sm shadow-lg">
        <SideNav />
      </div>

      <MobileNav />

      <div className="size-full max-h-[98%] overflow-hidden bg-white lg:m-2 lg:mr-3 rounded-sm shadow-lg">
        {children}
      </div>
    </main>
  );
}
