import { BookResponseType } from "@/app/api/book/type";

const getBestBooks = async () => {
  const res = await fetch("http://localhost:3000/api/crawler");
  const data = await res.json();
  return data;
};

const fetchBookData = async (title: string) => {
  const clientId = process.env.NEXT_PUBLIC_NAVER_ID;
  const clientSecret = process.env.NEXT_PUBLIC_NAVER_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("네이버 API 인증정보가 유효하지 않습니다.");
  }

  const res = await fetch(
    `https://openapi.naver.com/v1/search/book.json?query=${title}&display=1`,
    {
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
    }
  );

  const data = await res.json();

  return data;
};

export const getTodayBooks = async (): Promise<BookResponseType[]> => {
  const bestBookTitles = await getBestBooks();

  const data = await Promise.all(bestBookTitles.map(fetchBookData));

  const bookData = data.map((d) => d.items[0]);

  return bookData;
};
