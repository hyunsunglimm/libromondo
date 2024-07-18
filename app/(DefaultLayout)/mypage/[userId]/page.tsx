import UserProfile from "./components/UserProfile";
import { Metadata } from "next";
import UserContents from "./components/UserContents";

type MyPageProps = {
  params: {
    userId: string;
  };
};

export default async function MyPage({ params }: MyPageProps) {
  const userId = params.userId;

  return (
    <section className="mx-auto max-w-[832px] w-full px-4">
      <UserProfile userId={userId} />
      <UserContents userId={userId} />
    </section>
  );
}

export async function generateMetadata({
  params,
}: MyPageProps): Promise<Metadata> {
  const userId = params.userId;

  const user = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`
  ).then((res) => res.json());

  const title = user.name;
  const description = `${user.name}님의 마이페이지입니다.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/mypage/${params.userId}/`,
      images: user.image,
      siteName: "Libro Mondo",
      locale: "ko_KR",
    },
  };
}
