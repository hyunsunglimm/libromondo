import { BookResponseType, KakaoBookResponse } from "@/types/book";
import { BASE_URL, KAKAO_SEARCH_API_URL } from "@/constants/url";

export const getBestBookTitles = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}/api/crawler`);
  const data = await res.json();
  return data;
};

export const fetchBookData = async (
  title: string,
  size?: number,
  page?: string
): Promise<KakaoBookResponse> => {
  const res = await fetch(
    `${KAKAO_SEARCH_API_URL}?query=${title}&size=${size}&page=${page}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    }
  );

  const data = await res.json();

  return data;
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
