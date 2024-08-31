import { Bell, LucideIcon } from "lucide-react";

export const DashboardHeader = ({
  end,
  Icon,
  label,
}: {
  end?: boolean;
  Icon: LucideIcon;
  label: string;
}) => {
  return (
    <div className="sticky top-0 left-0 right-0 border-b border-[#F9AE19] justify-between items-center overflow-hidden z-50 bg-[#FCFCFD] hidden lg:flex">
      <div className="py-3 px-4 flex justify-center items-center gap-4">
        <Icon className="h-5 w-5" />
        <p className="">{label}</p>
      </div>

      {end && (
        <div className="py-3 px-4 flex justify-center items-center gap-3">
          <Bell />

          <div className="h-9 w-9 rounded-full bg-gray-300 cursor-pointer relative">
            <img
              src="/p1.jpeg"
              alt=""
              className="h-9 w-9 rounded-full bg-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};
