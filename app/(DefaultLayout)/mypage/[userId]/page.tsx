type MyPageProps = {
  params: { userId: string };
};

export default function MyPage({ params }: MyPageProps) {
  return <section>{params.userId}의 마이페이지입니다.</section>;
}
