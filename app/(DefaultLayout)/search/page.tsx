"use client";

import BooksList from "@/components/BooksList";
import { useState } from "react";

export default function SearchPage() {
  const [enteredValue, setEnteredValue] = useState("");
  const [query, setQuery] = useState("");
  const handleClick = () => {
    setQuery(enteredValue);
  };

  return (
    <section className="mx-auto">
      <input
        className="border w-[800px] p-4 mt-8"
        placeholder="원하시는 책의 키워드를 검색해주세요."
        onChange={(e) => setEnteredValue(e.target.value)}
        value={enteredValue}
      />
      <button onClick={handleClick}>확인</button>
      <BooksList fetchUrl={`/api/book/search?query=${query}`} />
    </section>
  );
}
