import { getBooks } from "@/service/book";
import { KakaoBookResponse } from "@/types/book";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");
  const size = Number(searchParams.get("size")) || 50;

  if (!keyword) {
    return new Response("필요한 정보들이 입력되지 않았습니다.");
  }

  const data: KakaoBookResponse = await getBooks({ query: keyword, size });

  return Response.json(data);
};
