import { BookResponseType } from "./book";

export type SanityUser = {
  id: string;
  name: string;
  image: string;
  books: BookResponseType[];
};

export type SimpleUser = Omit<SanityUser, "books">;
