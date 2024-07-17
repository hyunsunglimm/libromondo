"use client";

import { useState } from "react";
import SearchBook from "./SearchBook";
import SearchUser from "./SearchUser";

export default function SearchSection() {
  const [type, setType] = useState("book");

  return (
    <section className="mx-auto max-w-[832px] w-full px-4">
      <div className="flex mb-4 gap-4">
        <button
          className={`border border-black w-full p-2 rounded-sm ${type === "book" ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => setType("book")}
        >
          도서 검색
        </button>
        <button
          className={`border border-black w-full p-2 rounded-sm ${type === "user" ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => setType("user")}
        >
          사용자 검색
        </button>
      </div>
      {type === "book" && <SearchBook />}
      {type === "user" && <SearchUser />}
    </section>
  );
}
