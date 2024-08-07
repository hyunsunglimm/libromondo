import { searchUsers } from "@/service/user";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return new Response("검색어를 입력해주세요");
  }

  const data = await searchUsers(query);

  return Response.json(data);
};
