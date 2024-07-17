import { Metadata } from "next";
import SearchSection from "./components/SearchSection";

export const metadata: Metadata = {
  title: "검색페이지",
  description: "사용자 검색 혹은 도서 검색을 이용하세요.",
  openGraph: {
    title: "검색페이지",
    description: "사용자 검색 혹은 도서 검색을 이용하세요.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/search`,
    images: "https://libromondo.vercel.app/images/main.png",
    siteName: "Libro Mondo",
    locale: "ko_KR",
  },
};

export default function SearchPage() {
  return <SearchSection />;
}
