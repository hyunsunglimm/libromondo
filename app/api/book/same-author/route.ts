import { fetchBookData } from "@/service/book";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return new Response("작가명이 입력되지 않았습니다.");
  }

  const data = await fetchBookData(name, 50);

  return Response.json(data);
};
