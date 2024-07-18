import { client } from "@/sanity/lib/client";
import { BookResponseType } from "@/types/book";

export const addReview = (
  userId: string,
  book: BookResponseType,
  contents: string,
  grade: number
) => {
  return client.create(
    {
      _type: "review",
      author: { _ref: userId },
      book,
      contents,
      grade,
      comments: [],
    },
    { autoGenerateArrayKeys: true }
  );
};
