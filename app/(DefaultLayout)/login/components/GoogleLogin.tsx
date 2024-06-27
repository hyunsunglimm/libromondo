import { signIn } from "@/auth";
import Image from "next/image";

export default function GoogleLogin() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button className="bg-white shadow-md border rounded-xl w-80 p-4 flex justify-center items-center gap-2">
        <Image
          src="/images/google-logo.png"
          alt="google logo"
          width={80}
          height={24}
          className="w-6"
        />
        Login with Google
      </button>
    </form>
  );
}
