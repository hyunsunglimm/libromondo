// 페이지를 최대 10개씩 보여줌
export const getPageArray = (page: number, lastPage: number) => {
  const startPage = Math.floor((page - 1) / 10) * 10 + 1;
  const endPage = Math.min(startPage + 9, lastPage);
  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
};
