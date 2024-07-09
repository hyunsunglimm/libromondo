import { client } from "@/sanity/lib/client";
import { BookResponseType } from "@/types/book";
import { SanityUser } from "@/types/user";
import { EMPTY_PROFILE_IMAGE } from "@/utils/image";

export const addUser = async (id: string, name: string, image: string) => {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    name,
    image: image || EMPTY_PROFILE_IMAGE,
    books: [],
  });
};

export const getUserById = async (id: string) => {
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
    .then((user) => {
      if (user) {
        return { ...user, books: user.books ?? [] };
      } else {
        return null;
      }
    });
};

export const addSave = async (userId: string, book: BookResponseType) => {
  return client
    .patch(userId)
    .setIfMissing({ books: [] })
    .append("books", [book])
    .commit({ autoGenerateArrayKeys: true });
};

export const removeSave = async (userId: string, book: BookResponseType) => {
  return client
    .patch(userId)
    .unset([`books[isbn=="${book.isbn}"]`])
    .commit();
};

export const editProfile = async (userId: string, name: string, file: Blob) => {
  if (!file) {
    return client.patch(userId).set({ _type: "user", name }).commit();
  } else {
    return client.assets.upload("image", file).then((result) => {
      return client
        .patch(userId)
        .set({ _type: "user", name, image: result.url })
        .commit();
    });
  }
};

export const getUsersWhoSavedBooks = async (bookId: string) => {
  return client
    .fetch(
      `
      *[_type == "user"]{
        ...,
        "id": _id
      }
    `
    )
    .then((users: SanityUser[]) =>
      users.filter((user) =>
        user.books.some((book) => book.isbn.includes(bookId))
      )
    )
    .then((users: SanityUser[]) =>
      users.map((user) => ({
        id: user.id,
        name: user.name,
        image: user.image,
      }))
    );
};
