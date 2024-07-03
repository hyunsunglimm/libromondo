"use client";

import BooksList from "@/components/BooksList";
import useDebounce from "@/hooks/useDebounce";
import { useSearchStore } from "@/store/search";

export default function SearchPage() {
  const { keyword, setKeyword, setPage } = useSearchStore();
  const debouncedKeyword = useDebounce(keyword);

  return (
    <section className="mx-auto">
      <input
        className="border w-[800px] p-4 mt-8"
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
