import GoogleLogin from "./components/GoogleLogin";
import KakaoLogin from "./components/KakaoLogin";
import { Metadata } from "next";
import NaverLogin from "./components/NaverLogin";
import { BASE_URL } from "@/constants/url";

export const metadata: Metadata = {
  title: "로그인 페이지",
  description: "구글 혹은 카카오로 로그인해주세요.",
  openGraph: {
    title: "로그인 페이지",
    description: "구글 혹은 카카오로 로그인해주세요.",
    type: "website",
    url: `${BASE_URL}/login`,
    images: "https://libromondo.vercel.app/images/libro-mondo-logo.png",
    siteName: "Libro Mondo",
    locale: "ko_KR",
  },
};

type LoginPageProps = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-6 md:gap-4">
      <p className="text-gray-600 font-bold text-3xl md:text-xl">
        소셜 로그인으로 10초만에 로그인하세요 !
      </p>
      <GoogleLogin callbackUrl={searchParams.callbackUrl ?? "/"} />
      <KakaoLogin callbackUrl={searchParams.callbackUrl ?? "/"} />
      <NaverLogin callbackUrl={searchParams.callbackUrl ?? "/"} />
    </section>
  );
}
