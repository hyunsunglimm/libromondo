// 페이지를 최대 10개씩 보여줌
export const getPageArray = (page: number, lastPage: number) => {
  const startPage = Math.floor((page - 1) / 10) * 10 + 1;
  const endPage = Math.min(startPage + 9, lastPage);

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
};

export const generateSearchKeywords = (
  authors: string[],
  contents: string,
  title: string
) => {
  const keywords: string[] = [];

  keywords.push(title);
  authors.forEach((author) => keywords.push(author));

  const contentsKeywords = extractKeywordsFromContents(contents);
  keywords.push(...contentsKeywords);

  return keywords;
};

const extractKeywordsFromContents = (contents: string): string[] => {
  const words = contents.split(/[ ,.]+/);
  const stopwords = [
    "이",
    "그",
    "저",
    "에서",
    "에게",
    "에서",
    "으로",
    "로",
    "과",
    "를",
    "를",
    "하는",
    "하는",
    "하다",
  ];

  const keywords = words.filter(
    (word) => word.length > 2 && !stopwords.includes(word)
  );
  return keywords;
};
