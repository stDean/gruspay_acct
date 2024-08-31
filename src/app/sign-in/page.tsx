import { Onboard } from "@/components/Onboard";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-3 mt-5">
      <div className="justify-center items-center w-44">
        <img
          src="/logo.png"
          alt="logo"
          className="w-44 cursor-pointer"
          // onClick={() => router.push("/dashboard")}
        />
      </div>

      <Onboard />
    </div>
  );
}
