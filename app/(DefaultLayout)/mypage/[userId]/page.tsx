import UserProfile from "./components/UserProfile";
import { Metadata } from "next";
import UserContents from "./components/UserContents";
import { BASE_URL } from "@/constants/url";
import { Suspense } from "react";
import UserProfileSkeleton from "./components/UserProfileSkeleton";

type MyPageProps = {
  params: {
    userId: string;
  };
};

export default function MyPage({ params }: MyPageProps) {
  const userId = params.userId;

  return (
    <section className="mx-auto max-w-[832px] w-full px-4">
      <Suspense fallback={<UserProfileSkeleton />}>
        <UserProfile userId={userId} />
      </Suspense>
      <UserContents userId={userId} />
    </section>
  );
}

export async function generateMetadata({
  params,
}: MyPageProps): Promise<Metadata> {
  const userId = params.userId;

  const user = await fetch(`${BASE_URL}/api/user/${userId}`).then((res) =>
    res.json()
  );

  if (!user) {
    return {
      title: "존재하지 않는 사용자입니다.",
      description:
        "존재하지 않는 사용자입니다. 올바른 방식으로 다시 시도해주세요.",
    };
  }

  const title = user.name;
  const description = `${user.name}님의 마이페이지입니다.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${BASE_URL}/mypage/${params.userId}/`,
      images: user.image,
      siteName: "Libro Mondo",
      locale: "ko_KR",
    },
  };
}
