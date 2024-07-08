import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserProfile from "./components/UserProfile";
import SavedBooks from "./components/SavedBooks";

type MyPageProps = {
  params: {
    userId: string;
  };
};

export default async function MyPage({ params }: MyPageProps) {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }
  const userId = params.userId;

  const user = await fetch(`${process.env.BASE_URL}/api/user/${userId}`).then(
    (res) => res.json()
  );

  if (!user) {
    return redirect("/");
  }

  return (
    <section className="mx-auto">
      <UserProfile userId={userId} />
      <SavedBooks userId={userId} />
    </section>
  );
}
