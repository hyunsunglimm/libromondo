export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getBooks, getBestBookTitles } from "@/service/book";

export const GET = async () => {
  const bestBookTitles = await getBestBookTitles();

  const data = await Promise.all(
    bestBookTitles.map((title) => getBooks({ query: title, size: 1 }))
  );

  const validData = data
    .filter((d) => d.meta.total_count > 0)
    .map((d) => d.documents[0]);

  return Response.json(validData);
};
