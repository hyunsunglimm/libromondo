import { getUsersWhoSavedBooks } from "@/service/user";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Context = {
  params: {
    bookId: string;
  };
};

export const GET = async (_: Request, context: Context) => {
  const { bookId } = context.params;

  const data = await getUsersWhoSavedBooks(bookId);

  return Response.json(data);
};
