import { auth } from "@/auth";
import GoogleLogin from "./components/GoogleLogin";
import KakaoLogin from "./components/KakaoLogin";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 페이지",
  description: "구글 혹은 카카오로 로그인해주세요.",
  openGraph: {
    title: "로그인 페이지",
    description: "구글 혹은 카카오로 로그인해주세요.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    images: "https://libromondo.vercel.app/images/main.png",
    siteName: "Libro Mondo",
    locale: "ko_KR",
  },
};

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
