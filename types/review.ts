import { BookResponseType } from "./book";

export type Review = {
  id: string;
  author: Reviewer;
  book: BookResponseType;
  grade: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};

export type Reviewer = {
  id: string;
  name: string;
  image: string;
};

export type Comment = {
  id: string;
  userId: string;
  name: string;
  comment: string;
  image: string;
};
