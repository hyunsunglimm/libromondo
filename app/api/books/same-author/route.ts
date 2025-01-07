import { getBooks } from "@/service/book";
import { KakaoBookResponse } from "@/types/book";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const author = searchParams.get("author");
  const size = Number(searchParams.get("size"));
  const page = Number(searchParams.get("page"));

  if (!author || !size || !page) {
    throw new Error("query string 값이 제대로 전달되지 않았습니다.");
  }

  const data: KakaoBookResponse = await getBooks({
    query: author,
    size,
    page,
    target: "person",
  });

  return Response.json(data);
};
