import { Metadata } from "next";
import SearchSection from "./components/SearchSection";
import { BASE_URL } from "@/constants/url";

export const metadata: Metadata = {
  title: "검색페이지",
  description: "사용자 검색 혹은 도서 검색을 이용하세요.",
  openGraph: {
    title: "검색페이지",
    description: "사용자 검색 혹은 도서 검색을 이용하세요.",
    type: "website",
    url: `${BASE_URL}/search`,
    images: "https://libromondo.vercel.app/images/libro-mondo-logo.png",
    siteName: "Libro Mondo",
    locale: "ko_KR",
  },
};

export default function SearchPage() {
  return <SearchSection />;
}
