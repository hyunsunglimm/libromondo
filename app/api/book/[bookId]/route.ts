import { fetchBookData } from "@/service/book";
import { getUsersWhoSavedBooks } from "@/service/user";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Context = {
  params: {
    bookId: string;
  };
};

export const GET = async (_: Request, context: Context) => {
  const { bookId } = context.params;

  const users = await getUsersWhoSavedBooks(bookId);

  const data = await fetchBookData(bookId, 1);

  const updatedDocuments = [
    {
      ...data.documents[0],
      usersWhoSavedBooks: users,
    },
  ];

  return Response.json({ ...data, documents: updatedDocuments });
};
