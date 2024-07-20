import { getReviewById } from "@/service/review";

type Context = {
  params: {
    reviewId: string;
  };
};

export async function GET(_: Request, context: Context) {
  const { reviewId } = context.params;

  const data = await getReviewById(reviewId);

  return Response.json(data);
}
