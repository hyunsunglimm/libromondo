import { searchUsers } from "@/service/user";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  const data = await searchUsers(query || "");

  return Response.json(data);
};
