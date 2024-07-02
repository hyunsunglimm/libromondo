import axios from "axios";
import cheerio from "cheerio";

export const GET = async () => {
  const url =
    "https://www.yes24.com/Product/Category/BestSeller?categoryNumber=001";

  const { data } = await axios.get(url);

  const $ = cheerio.load(data);
  const list: string[] = [];

  $("li[data-goods-no]").each((idx, el) => {
    const title = $(el).find(".gd_name").text().trim();

    list.push(title);
  });

  return Response.json(list);
};
