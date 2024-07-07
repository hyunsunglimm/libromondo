import { auth } from "@/auth";
import { addSave, getUserById, removeSave } from "@/service/user";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return new Response("인증 에러", { status: 401 });
  }

  const sanityUser = await getUserById(user.id);

  return Response.json(sanityUser);
};

export const PUT = async (req: Request) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("인증 에러", { status: 401 });
  }

  const { userId, book, isSave } = await req.json();

  const request = isSave ? removeSave : addSave;

  return request(userId, book)
    .then((res) => Response.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
};
