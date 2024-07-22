import { getReviews } from "@/service/review";

export async function GET() {
  const reviews = await getReviews();

  return Response.json(reviews);
}
