import { BookResponseType } from "@/types/book";
import ShowMoreBooks from "./ShowMoreBooks";
import { getRelatedBooks } from "@/service/book";

const RelatedBooks = async ({ book }: { book: BookResponseType }) => {
  const relatedBooks: BookResponseType[] = await getRelatedBooks({
    title: book.title,
    description: book.contents,
  });

  return (
    <>
      <div className="md:hidden">
        <ShowMoreBooks
          books={relatedBooks}
          title="관련있는 책"
          slidesPerView={3}
        />
      </div>
      <div className="hidden md:block">
        <ShowMoreBooks
          books={relatedBooks}
          title="관련있는 책"
          slidesPerView={4}
        />
      </div>
    </>
  );
};

export default RelatedBooks;
