import UserProfile from "./components/UserProfile";
import SavedBooks from "./components/SavedBooks";

type MyPageProps = {
  params: {
    userId: string;
  };
};

export default async function MyPage({ params }: MyPageProps) {
  const userId = params.userId;

  return (
    <section className="mx-auto max-w-[800px] w-full">
      <UserProfile userId={userId} />
      <SavedBooks userId={userId} />
    </section>
  );
}
