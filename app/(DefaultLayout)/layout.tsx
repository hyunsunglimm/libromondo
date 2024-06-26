import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import "../globals.css";

export const metadata: Metadata = {
  title: "북적북적",
  description: "북적북적은 강력한 도서 추천 서비스입니다.",
};

const inter = Inter({ subsets: ["latin"] });

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="grow">
          <div className="max-w-[1280px] mx-auto">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
