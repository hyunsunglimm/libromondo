import { auth } from "@/auth";
import { addSave, getSavedBooks, removeSave } from "@/service/book";

type Context = {
  params: {
    userId: string;
  };
};

export const GET = async (_: Request, context: Context) => {
  const { userId } = context.params;

  const data = await getSavedBooks(userId);

  return Response.json(data);
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
