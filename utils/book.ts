// 페이지를 최대 10개씩 보여줌
export const getPageArray = (
  page: number,
  lastPage: number,
  pagePerView: number
) => {
  const startPage = Math.floor((page - 1) / pagePerView) * pagePerView + 1;
  const endPage = Math.min(startPage + pagePerView - 1, lastPage);

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
};
