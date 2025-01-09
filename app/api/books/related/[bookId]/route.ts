import { getBookById, getBooks } from "@/service/book";
import { BookResponseType } from "@/types/book";

type Context = {
  params: {
    bookId: string;
  };
};

export const GET = async (_: Request, context: Context) => {
  const { bookId } = context.params;

  const book = await getBookById(bookId);

  const description = book.contents;

  const regex = /^[가-힣a-zA-Z]+$/;

  const keywords = description
    .split(" ")
    .filter(
      (keyword) =>
        regex.test(keyword) && keyword.length >= 2 && keyword.length <= 5
    )
    .map((keyword) => keyword.trim());

  const shuffledKeywords = keywords.sort(() => 0.5 - Math.random());

  const randomTenKeywords = shuffledKeywords.slice(0, 10);

  const data = await Promise.all(
    randomTenKeywords.map(async (keyword) => {
      const result = await getBooks({ query: keyword });

      return result;
    })
  );

  const relatedBooks = data
    .filter((d) => d.meta.pageable_count > 0)
    .map((d) => d.documents)
    .flat();

  const uniqueBooks = new Map<string, BookResponseType>();

  relatedBooks.forEach((book) => {
    uniqueBooks.set(book.isbn, book);
  });

  const deduplicatedRelatedBooks = Array.from(uniqueBooks.values());

  return Response.json(deduplicatedRelatedBooks);
};
