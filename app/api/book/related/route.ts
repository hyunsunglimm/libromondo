import { fetchBookData } from "@/service/book";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return new Response("키워드가 입력되지 않았습니다.");
  }

  const data = await fetchBookData(query, 50);

  return Response.json(data);
};
