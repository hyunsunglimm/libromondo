import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import SWRConfigContext from "@/context/SWRConfigContext";
import AuthContext from "@/context/AuthContext";
import { Alarm } from "@/components/Alarm";
import QueryProvider from "@/provider/QueryProvider";
import Modal from "@/components/Modal";
import { BASE_URL } from "@/constants/url";

export const metadata: Metadata = {
  title: {
    default: "Libro Mondo",
    template: "Libro Mondo | %s",
  },
  description: "Libro Mondo는 간편한 도서 추천 서비스입니다.",
  openGraph: {
    title: {
      default: "Libro Mondo",
      template: "Libro Mondo | %s",
    },
    description: "Libro Mondo는 간편한 도서 추천 서비스입니다.",
    type: "website",
    url: `${BASE_URL}/`,
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
      <QueryProvider>
        <SWRConfigContext>
          <Header />
          <main className="grow flex max-w-[1280px] mx-auto w-full py-12">
            {children}
          </main>
          <Alarm />
          <Modal />
          <Footer />
        </SWRConfigContext>
      </QueryProvider>
    </AuthContext>
  );
}
