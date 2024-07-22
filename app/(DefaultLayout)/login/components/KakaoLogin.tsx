import { signIn } from "@/auth";
import Image from "next/image";

export default function KakaoLogin({ callbackUrl }: { callbackUrl: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("kakao", { redirectTo: callbackUrl });
      }}
    >
      <button className="rounded-xl bg-[#FEE500] w-[30rem] md:w-80 p-8 md:p-4 flex justify-center items-center gap-4 md:gap-3 text-3xl md:text-base shadow-md">
        <Image
          src="/images/kakao-logo.png"
          alt="kakao logo"
          width={20}
          height={20}
          className="w-10 md:w-5"
          unoptimized
        />
        Login with Kakao
      </button>
    </form>
  );
}
