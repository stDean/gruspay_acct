import { Onboard } from "@/components/Onboard";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-3 my-5">
      <div className="justify-center items-center w-44">
        <img
          src="/logo.png"
          alt="logo"
          className="w-44 cursor-pointer"
          // onClick={() => router.push("/")}
        />
      </div>

      <Onboard />
    </div>
  );
}
