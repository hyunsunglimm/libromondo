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

export const getReviewByUser = (userId: string) => {
  return client.fetch(`
      *[_type == "review" && author->_id == "${userId}"] | order(_createdAt desc) {
        "id": _id,
        "author": author->name,
        "book": book,
        "contents": contents,
        "grade": grade,
        comments[]{...,"id": _key, comment, "name": author->name, "image": author->image},
        "createdAt": _createdAt,
        "updatedAt": _updatedAt
      }
    `);
};
