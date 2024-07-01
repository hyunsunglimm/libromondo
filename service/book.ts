export const getTodayBooks = async () => {
  const res = await fetch(
    "https://dapi.kakao.com/v3/search/book?query=주술회전&size=1",
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    }
  );
  const data = await res.json();

  return data;
};
