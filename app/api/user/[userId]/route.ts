import { auth } from "@/auth";
import { addSave, removeSave } from "@/service/book";
import { getUserById } from "@/service/user";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Context = {
  params: {
    userId: string;
  };
};

export const GET = async (_: Request, ctx: Context) => {
  const userId = ctx.params.userId;

  const sanityUser = await getUserById(userId);

  if (!sanityUser) {
    return Response.json({
      message: "해당 유저 정보가 없습니다.",
      status: 401,
    });
  }

  return Response.json(sanityUser);
};
