import { BookResponseType } from "./book";

export type SanityUser = {
  id: string;
  name: string;
  image: string;
  books: BookResponseType[];
  following: SimpleUser[];
  followers: SimpleUser[];
};

export type SimpleUser = {
  id: string;
  name: string;
  image: string;
};
