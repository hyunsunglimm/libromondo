"use client";

import BooksList from "@/components/BooksList";
import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);

  return (
    <section className="mx-auto">
      <input
        className="border w-[800px] p-4 mt-8"
        placeholder="원하시는 책의 키워드를 검색해주세요."
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
      />
      <BooksList fetchUrl={`/api/book/search?query=${debouncedKeyword}`} />
    </section>
  );
}
