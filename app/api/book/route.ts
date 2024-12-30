export const dynamic = "force-dynamic";
export const revalidate = 0;

import { fetchBookData, getBestBookTitles } from "@/service/book";

export const GET = async () => {
  const bestBookTitles = await getBestBookTitles();

  const data = await Promise.all(
    bestBookTitles.map((title) => fetchBookData(title, 1))
  );

  const bookData = data
    .filter((d) => d.meta.total_count > 0)
    .map((d) => d.documents[0]);

  return Response.json(bookData);
};
