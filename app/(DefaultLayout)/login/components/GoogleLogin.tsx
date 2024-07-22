import { signIn } from "@/auth";
import Image from "next/image";

export default function GoogleLogin({ callbackUrl }: { callbackUrl: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: callbackUrl });
      }}
    >
      <button className="bg-white shadow-md border rounded-xl w-[30rem] md:w-80 p-8 md:p-4 flex justify-center items-center gap-2 text-3xl md:text-base">
        <Image
          src="/images/google-logo.png"
          alt="google logo"
          width={80}
          height={24}
          className="w-12 md:w-6"
        />
        Login with Google
      </button>
    </form>
  );
}
