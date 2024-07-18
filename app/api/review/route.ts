import { auth } from "@/auth";
import { NextRequest } from "next/server";
import { addReview } from "@/service/review";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { book, contents, grade } = await req.json();

  return addReview(user.id, book, contents, grade).then((data) =>
    Response.json(data)
  );
}
