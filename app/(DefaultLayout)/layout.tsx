import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import "../globals.css";

export const metadata: Metadata = {
  title: "Libro Mondo",
  description: "Libro Mondo는 간편한 도서 추천 서비스입니다.",
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
        <main className="grow flex max-w-[1280px] mx-auto w-full p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
