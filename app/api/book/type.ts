// NAVER API
// export type BookResponseType = {
//   title: string;
//   link: string;
//   image: string;
//   author: string;
//   discount: string;
//   publisher: string;
//   pubdate: string;
//   isbn: string;
//   description: string;
// };

export type BookResponseType = {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
};
