import { getBooks } from "@/service/book";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page");
  const size = searchParams.get("size");

  if (!keyword || !size || !page) {
    throw new Error("query string 값이 제대로 전달되지 않았습니다.");
  }

  const data = await getBooks({
    query: keyword,
    size: Number(size),
    page: Number(page || "1"),
  });

  return Response.json(data.documents);
};
