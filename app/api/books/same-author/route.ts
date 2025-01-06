import { getBooks } from "@/service/book";
import { KakaoBookResponse } from "@/types/book";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const author = searchParams.get("author");

  if (!author) {
    throw new Error("author를 쿼리 파라미터로 전달해야합니다.");
  }

  const data: KakaoBookResponse = await getBooks({
    query: author,
    size: 50,
    target: "person",
  });

  return Response.json(data);
};
