import { getTodayBooks } from "@/service/book";

export const GET = async () => {
  const data = await getTodayBooks();

  return Response.json(data);
};
