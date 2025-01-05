"use client";

import { Button } from "@/components/ui/button";
import { getUser } from "@/service/user";

import { client } from "@/sanity/lib/client";
import { BookResponseType } from "@/types/book";

const removeBooks = async () => {
  return client.delete({
    query: `*[_type == "books"]`,
  });
};

const addBook = (userId: string, book: BookResponseType) => {
  return client.create(
    {
      _type: "books",
      user: { _ref: userId },
      book,
    },
    { autoGenerateArrayKeys: true }
  );
};

export default function TestPage() {
  const addBooks = async () => {
    const users = await getUser();
    users.forEach((user) => {
      user.books.forEach((book) => {
        addBook(user.id, book);
      });
    });
  };

  return (
    <div>
      <h1>TestPage</h1>
      <div className="flex gap-4">
        <Button onClick={addBooks}>books 추가</Button>
        <Button onClick={removeBooks}>books 삭제</Button>
      </div>
    </div>
  );
}
