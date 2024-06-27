import { auth } from "@/auth";
import GoogleLogin from "./components/GoogleLogin";
import KakaoLogin from "./components/KakaoLogin";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <section className="w-full flex flex-col justify-center items-center gap-2">
      <GoogleLogin />
      <KakaoLogin />
    </section>
  );
}
