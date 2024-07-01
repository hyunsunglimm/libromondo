import { BookResponseType } from "@/app/api/book/type";
import axios from "axios";

const getBestBooks = async () => {
  const res = await fetch("http://localhost:3000/api/crawler");
  const data = await res.json();
  return data;
};

const fetchBookData = async (title: string) => {
  return fetch(`https://dapi.kakao.com/v3/search/book?query=${title}&size=1`, {
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
    },
  }).then((res) => res.json());
};

export const getTodayBooks = async (): Promise<BookResponseType[]> => {
  const bestBookTitles = await getBestBooks();

  const data = await Promise.all(bestBookTitles.map(fetchBookData));

  const bookData = data.map((d) => d.documents[0]);

  return bookData;
};
