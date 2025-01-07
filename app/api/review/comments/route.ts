import { auth } from "@/auth";
import { addComment, removeComment } from "@/service/review";

export async function POST(req: Request) {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { reviewId, comment, commentId } = await req.json();

  if (!reviewId || !comment || !commentId) {
    return new Response("Bad Request", { status: 400 });
  }

  return addComment(reviewId, user.id, comment, commentId).then((res) =>
    Response.json(res)
  );
}

export async function PUT(req: Request) {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { reviewId, commentId } = await req.json();

  if (!reviewId || !commentId) {
    return new Response("Bad Request", { status: 400 });
  }

  return removeComment(reviewId, commentId).then((res) => Response.json(res));
}
