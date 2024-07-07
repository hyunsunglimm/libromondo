import { BookResponseType } from "./book";

export type AuthUser = {
  name: string;
  id: string;
  image?: string | null;
  email?: string | null;
};

export type SanityUser = {
  id: string;
  name: string;
  image?: string | null;
  books: BookResponseType[];
};
