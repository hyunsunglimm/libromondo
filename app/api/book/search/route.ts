import { fetchBookData } from "@/service/book";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page");
  const size = searchParams.get("size");

  if (!query || !size) {
    return new Response("검색어를 입력해주세요");
  }

  const data = await fetchBookData(query, +size, page || "1");

  return Response.json(data);
};
