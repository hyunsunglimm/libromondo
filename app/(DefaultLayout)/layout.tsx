import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import SWRConfigContext from "@/context/SWRConfigContext";
import AuthContext from "@/context/AuthContext";
import { Alarm } from "@/components/Alarm";

export const metadata: Metadata = {
  title: {
    default: "Libro Mondo",
    template: "Libro Mondo | %s",
  },
  description: "Libro Mondo는 간편한 도서 추천 서비스입니다.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: {
      default: "Libro Mondo",
      template: "Libro Mondo | %s",
    },
    description: "Libro Mondo는 간편한 도서 추천 서비스입니다.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    images: "https://libromondo.vercel.app/images/libro-mondo-logo.png",
    siteName: "Libro Mondo",
    locale: "ko_KR",
  },
};

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContext>
      <SWRConfigContext>
        <Header />
        <main className="grow flex max-w-[1280px] mx-auto w-full py-12">
          {children}
        </main>
        <Alarm />
        <div id="portal" />
        <Footer />
      </SWRConfigContext>
    </AuthContext>
  );
}
