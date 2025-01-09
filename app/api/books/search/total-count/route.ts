import { getBooks } from "@/service/book";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");

  if (!keyword) {
    throw new Error("query string 값이 제대로 전달되지 않았습니다.");
  }

  const data = await getBooks({
    query: keyword,
  });

  return Response.json({ totalCount: data.meta.pageable_count });
};
