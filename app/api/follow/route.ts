import { auth } from "@/auth";
import { follow, unfollow } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { targetId, follow: isFollow } = await req.json();

  if (!targetId || isFollow == null) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = isFollow ? unfollow : follow;

  return request(user.id, targetId)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
