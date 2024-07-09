import { fetchBookData } from "@/service/book";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Context = {
  params: {
    bookId: string;
  };
};

export const GET = async (_: Request, context: Context) => {
  const { bookId } = context.params;

  const data = await fetchBookData(bookId, 1);

  return Response.json(data);
};
