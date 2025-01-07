import { client } from "@/sanity/lib/client";
import { SanityUser, SimpleUser } from "@/types/user";
import { EMPTY_PROFILE_IMAGE } from "@/utils/image";

export const addUser = async (id: string, name: string, image: string) => {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    name,
    image: image || EMPTY_PROFILE_IMAGE,
    books: [],
    following: [],
    followers: [],
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
          "books": books,
          following[]->{"id": _id, name,image},
          followers[]->{"id": _id, name,image}
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

export const getBookSavors = async (bookId: string) => {
  return client
    .fetch(
      `
      *[_type == "books" && (book.isbn match "${bookId}")] {
        "user": user->{
          "id": _id,
          name,
          image
        }
      }
    `
    )
    .then((users) => users.map((user: { user: SimpleUser }) => user.user));
};

export async function searchUsers(keyword?: string) {
  return client.fetch(
    `*[_type == "user" && (name match "*${keyword}*")]{
      "id": _id,
      "name": name,
      "image": image
    }
    `
  );
}

export async function follow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append("following", [{ _ref: targetId, _type: "reference" }])
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append("followers", [{ _ref: myId, _type: "reference" }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}
