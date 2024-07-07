import { client } from "@/sanity/lib/client";
import { BookResponseType } from "@/types/book";

export function addUser(id: string, name: string, image: string) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    name,
    image,
    books: [],
  });
}

export const getUserById = (id: string) => {
  return client
    .fetch(
      `
    *[_type == "user" && _id == "${id}"][0]{
      "id": _id,
      "name": name,
      "image": image,
      "books": books
    }
    `
    )
    .then((user) => ({ ...user, books: user.books ?? [] }));
};

export const addSave = (userId: string, book: BookResponseType) => {
  return client
    .patch(userId)
    .setIfMissing({ books: [] })
    .append("books", [book])
    .commit({ autoGenerateArrayKeys: true });
};

export const removeSave = (userId: string, book: BookResponseType) => {
  return client
    .patch(userId)
    .unset([`books[isbn=="${book.isbn}"]`])
    .commit();
};
