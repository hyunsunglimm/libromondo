import { fetchBookData } from "@/service/book";
import { KakaoBookResponse } from "@/types/book";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");

  if (!keyword) {
    return new Response("필요한 정보들이 입력되지 않았습니다.");
  }

  const data: KakaoBookResponse = await fetchBookData(keyword, 50);

  return Response.json(data);
};
