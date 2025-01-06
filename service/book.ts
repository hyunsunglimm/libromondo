import {
  BookResponseType,
  GetBooksRequestParams,
  KakaoBookResponse,
} from "@/types/book";
import { BASE_URL, KAKAO_SEARCH_API_URL } from "@/constants/url";
import queryString from "query-string";
import { client } from "@/sanity/lib/client";

export const getBestBookTitles = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}/api/crawler`);

  return await res.json();
};

export const getBookById = async (
  bookId: string
): Promise<BookResponseType> => {
  const res = await fetch(`${BASE_URL}/api/book/${bookId}`);
  const data = await res.json();

  return data.documents[0];
};

export const getBooks = async (
  params: GetBooksRequestParams
): Promise<KakaoBookResponse> => {
  const queryParams = queryString.stringify(params);
  const res = await fetch(`${KAKAO_SEARCH_API_URL}?${queryParams}`, {
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
    },
  });

  return await res.json();
};

export const getBestBooks = async (): Promise<BookResponseType[]> => {
  const response = await fetch(`${BASE_URL}/api/book`);

  return await response.json();
};

export const getRelatedBooks = async ({
  url,
  title,
  description,
}: {
  url: string;
  title: string;
  description: string;
}): Promise<BookResponseType[]> => {
  let relatedKeywords = [];
  const aiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai`, {
    method: "POST",
    body: JSON.stringify({ url, description }),
    cache: "no-store",
  }).then((res) => res.json());

  if (aiResponse.error) {
    relatedKeywords = [title.slice(0, 2)];
  } else {
    relatedKeywords = [...aiResponse.content.split(",")];
  }

  const data = await Promise.all(
    relatedKeywords.map(async (keyword) => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/related?keyword=${keyword}&size=10`
      ).then((res) => res.json());

      return result;
    })
  );

  const relatedBooks = data
    .filter((d) => d.meta.total_count > 0)
    .map((d) => d.documents)
    .flat();

  return relatedBooks;
};

export const getSavedBooks = async (userId: string) => {
  return client
    .fetch(
      `*[_type == "books" && user._ref == "${userId}"] | order(_createdAt asc)`
    )
    .then((data) => data.map((d: { book: BookResponseType }) => d.book));
};

export const addSave = async (userId: string, book: BookResponseType) => {
  return client.create(
    {
      _type: "books",
      user: { _ref: userId },
      book,
    },
    { autoGenerateArrayKeys: true }
  );
};

export const removeSave = async (userId: string, book: BookResponseType) => {
  return client.delete({
    query: `*[_type == "books" && user._ref == "${userId}" && book.isbn == "${book.isbn}"]`,
  });
};
