import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "북적북적",
  description: "북적북적은 강력한 도서 추천 서비스입니다.",
};

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <div className="max-w-[1280px] mx-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
