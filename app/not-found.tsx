import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Libro Mondo | 존재하지 않는 페이지입니다.",
  description: "Libro Mondo는 간편한 도서 추천 서비스입니다.",
};

export default function NotFound() {
  return (
    <section className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="text-2xl font-bold text-center text-gray-300">
        죄송합니다. <br /> 존재하지 않는 페이지입니다.
      </h1>
      <Button asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </section>
  );
}
