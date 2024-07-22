import { Metadata } from "next";
import ReviewListSection from "./components/ReviewListSection";

export const metadata: Metadata = {
  title: "사용자 리뷰",
  description: "여러 사용자들이 작성한 리뷰를 확인해보세요.",
  openGraph: {
    title: "사용자 리뷰",
    description: "여러 사용자들이 작성한 리뷰를 확인해보세요.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/reviews`,
    images: "https://libromondo.vercel.app/images/libro-mondo-logo.png",
    siteName: "Libro Mondo",
    locale: "ko_KR",
  },
};

export default function ReviewsPage() {
  return <ReviewListSection />;
}
