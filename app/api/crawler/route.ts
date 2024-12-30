export const dynamic = "force-dynamic";
export const revalidate = 0;

import axios from "axios";
import { load } from "cheerio";

export const GET = async () => {
  const url =
    "https://www.yes24.com/Product/Category/BestSeller?categoryNumber=001";

  const { data } = await axios.get(url);

  const $ = load(data);
  const list: string[] = [];

  // @ts-ignore
  $("li[data-goods-no]").each((idx, el) => {
    const title = $(el).find(".gd_name").text().trim();

    list.push(title);
  });

  return Response.json(list);
};
