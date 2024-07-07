import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserProfile from "./components/UserProfile";
import SavedBooks from "./components/SavedBooks";

export default async function MyPage() {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  return (
    <section className="mx-auto">
      <UserProfile />
      <SavedBooks />
    </section>
  );
}
