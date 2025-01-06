import { auth } from "@/auth";
import { getSavedBooks } from "@/service/book";
import { BookResponseType } from "@/types/book";

export const GET = async () => {
  const session = await auth();

  if (!session?.user?.id) throw new Error("로그인을 해주세요.");

  const savedBooks: BookResponseType[] = await getSavedBooks(session?.user?.id);

  const savedIds = savedBooks.map((book) => book.isbn);

  return Response.json(savedIds);
};
