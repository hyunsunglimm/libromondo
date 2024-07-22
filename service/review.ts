import { client } from "@/sanity/lib/client";
import { BookResponseType } from "@/types/book";

const reviewField = `
  "id": _id,
  "author": author->name,
  "book": book,
  "contents": contents,
  "grade": grade,
  comments[]{"id": _key, comment, "name": author->name, "image": author->image},
  "createdAt": _createdAt,
  "updatedAt": _updatedAt
`;

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

export const getReviews = () => {
  return client.fetch(`
      *[_type == "review"] | order(_createdAt desc) {
        ${reviewField}
      }
    `);
};

export const getReviewByUser = (userId: string) => {
  return client.fetch(`
      *[_type == "review" && author->_id == "${userId}"] | order(_createdAt desc) {
        ${reviewField}
      }
    `);
};

export const getReviewById = (id: string) => {
  return client.fetch(`
      *[_type == "review" && _id == "${id}"] | order(_createdAt desc) {
        ${reviewField}
      }[0]
    `);
};

export async function addComment(
  reviewId: string,
  userId: string,
  comment: string,
  commentId: string
) {
  return client
    .patch(reviewId) //
    .setIfMissing({ comments: [] })
    .append("comments", [
      {
        _key: commentId,
        comment,
        author: { _ref: userId, _type: "reference" },
      },
    ])
    .commit();
}

export async function removeComment(reviewId: string, commentId: string) {
  return client
    .transaction()
    .patch(reviewId, (review) =>
      review.unset([`comments[_key == "${commentId}"]`])
    )
    .commit();
}
