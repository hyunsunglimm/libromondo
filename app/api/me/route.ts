import { auth } from "@/auth";
import { getUserById } from "@/service/user";

export async function GET() {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) return Response.json(null);

  const sanityUser = await getUserById(userId);

  if (!sanityUser) {
    return Response.json(null);
  }

  return Response.json(sanityUser);
}
