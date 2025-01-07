import { getBooks } from "@/service/book";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const author = searchParams.get("author");

  if (!author) {
    throw new Error("query string 값이 제대로 전달되지 않았습니다.");
  }

  const data = await getBooks({
    query: author,
    target: "person",
  });

  return Response.json({ totalCount: data.meta.pageable_count });
};
