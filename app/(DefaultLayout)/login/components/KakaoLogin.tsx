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
      <button className="rounded-xl bg-[#FEE500] w-80 p-4 flex justify-center items-center gap-2">
        <Image
          src="/images/kakao-logo.png"
          alt="kakao logo"
          width={20}
          height={20}
          className="w-6"
          unoptimized
        />
        Login with Kakao
      </button>
    </form>
  );
}
