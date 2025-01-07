import { getBookSavors } from "@/service/user";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const bookId = searchParams.get("bookId");

  if (!bookId) throw new Error("bookId값이 존재하지 않습니다.");

  const bookSavors = await getBookSavors(bookId);

  return Response.json(bookSavors);
};
