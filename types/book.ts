export type KakaoBookResponse = {
  documents: BookResponseType[];
  meta: BookMeta;
};

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

export type BookMeta = {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
};

export type DetailBookType = BookResponseType & {
  usersWhoSavedBooks: { id: string; name: string; image: string }[];
};
