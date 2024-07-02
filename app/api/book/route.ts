import { getBestBooks } from "@/service/book";

export const GET = async () => {
  const data = await getBestBooks();

  return Response.json(data);
};
