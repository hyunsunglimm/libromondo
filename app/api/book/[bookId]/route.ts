import { getBooks } from "@/service/book";

type Context = {
  params: {
    bookId: string;
  };
};

export const GET = async (_: Request, context: Context) => {
  const { bookId } = context.params;

  const data = await getBooks({ query: bookId, size: 1 });

  return Response.json(data);
};
