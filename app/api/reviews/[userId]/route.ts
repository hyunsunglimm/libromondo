import { getReviewByUser } from "@/service/review";

export const revalidate = 0;

type Context = {
  params: {
    userId: string;
  };
};

export async function GET(_: Request, context: Context) {
  const { userId } = context.params;

  const data = await getReviewByUser(userId);

  return Response.json(data);
}
