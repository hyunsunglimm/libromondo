"use client";

import useDebounce from "@/hooks/useDebounce";
import { useUserSearchStore } from "@/store/search";
import UserList from "./components/UserList";

export default function SearchPage() {
  const { keyword, setKeyword } = useUserSearchStore();
  const debouncedKeyword = useDebounce(keyword);

  return (
    <section className="mx-auto">
      <input
        className="border w-[800px] p-4"
        placeholder="검색할 사용자의 이름을 입력해주세요."
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        value={keyword}
      />
      <UserList debouncedKeyword={debouncedKeyword} />
    </section>
  );
}
