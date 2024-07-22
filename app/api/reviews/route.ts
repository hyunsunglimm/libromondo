import { auth } from "@/auth";
import {
  getBookReviews,
  getFollowingReviews,
  getReviews,
} from "@/service/review";

export const revalidate = 0;

export async function GET(req: Request) {
  const session = await auth();
  const user = session?.user;
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const isbn = searchParams.get("isbn");

  let reviews;

  if (type === "all") {
    reviews = await getReviews();
  }

  if (type === "following" && user && user.id) {
    reviews = await getFollowingReviews(user.id);
  }

  if (type === "book" && isbn) {
    reviews = await getBookReviews(isbn);
  }

  return Response.json(reviews);
}
