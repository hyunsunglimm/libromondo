"use client";

import BooksList from "@/components/BooksList";
import useDebounce from "@/hooks/useDebounce";
import { useBookSearchStore } from "@/store/search";

export default function SearchPage() {
  const { keyword, setKeyword, setPage } = useBookSearchStore();
  const debouncedKeyword = useDebounce(keyword);

  return (
    <section className="mx-auto max-w-[832px] w-full px-4">
      <input
        className="border w-full p-4"
        placeholder="원하시는 책의 키워드를 검색해주세요."
        onChange={(e) => {
          setKeyword(e.target.value);
          // 키워드 변경 시 페이지 1로 초기화
          setTimeout(() => setPage(1), 500);
        }}
        value={keyword}
      />

      <BooksList keyword={debouncedKeyword} />
    </section>
  );
}
