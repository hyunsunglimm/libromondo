import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import SWRConfigContext from "@/context/SWRConfigContext";
import AuthContext from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Libro Mondo",
  description: "Libro Mondo는 간편한 도서 추천 서비스입니다.",
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
        <Footer />
      </SWRConfigContext>
    </AuthContext>
  );
}
