import { getReviewsByUser } from "@/service/review";

export const revalidate = 0;

type Context = {
  params: {
    userId: string;
  };
};

export async function GET(_: Request, context: Context) {
  const { userId } = context.params;

  const data = await getReviewsByUser(userId);

  return Response.json(data);
}
