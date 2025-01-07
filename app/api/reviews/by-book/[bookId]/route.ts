import { getReviewsByBook } from "@/service/review";

type Context = {
  params: {
    bookId: string;
  };
};

export async function GET(_: Request, context: Context) {
  const { bookId } = context.params;

  const reviewsByBook = await getReviewsByBook(bookId);

  return Response.json(reviewsByBook);
}
