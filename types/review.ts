import { BookResponseType } from "./book";

export type Review = {
  id: string;
  author: string;
  book: BookResponseType;
  contents: string;
  grade: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: string;
  name: string;
  comment: string;
  image: string;
};
