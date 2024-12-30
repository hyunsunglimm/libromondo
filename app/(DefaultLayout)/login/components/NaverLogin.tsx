import { signIn } from "@/auth";
import Image from "next/image";

export default function NaverLogin({ callbackUrl }: { callbackUrl: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("naver", { redirectTo: callbackUrl });
      }}
    >
      <button className="rounded-xl bg-[#03C75A] w-[30rem] md:w-80 p-8 md:p-4 flex justify-center items-center gap-4 md:gap-3 text-3xl md:text-base shadow-md">
        <Image
          src="/images/naver-logo.png"
          alt="naver logo"
          width={20}
          height={20}
          className="w-10 md:w-5"
          unoptimized
        />
        Login with Naver
      </button>
    </form>
  );
}
