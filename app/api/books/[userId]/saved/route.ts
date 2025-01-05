import { getSavedBooks } from "@/service/book";

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
