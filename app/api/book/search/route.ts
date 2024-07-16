import { fetchBookData } from "@/service/book";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page");

  if (!query) {
    return new Response("검색어를 입력해주세요");
  }

  const data = await fetchBookData(query, 8, page || "1");

  return Response.json(data);
};
