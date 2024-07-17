import useDebounce from "@/hooks/useDebounce";
import { useUserSearchStore } from "@/store/search";
import UserList from "./UserList";

export default function SearchUser() {
  const { keyword, setKeyword } = useUserSearchStore();
  const debouncedKeyword = useDebounce(keyword);

  return (
    <section className="w-full">
      <input
        className="border border-black w-full p-4 text-[16px] rounded-sm"
        placeholder="검색할 사용자의 이름을 입력해주세요."
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        value={keyword}
      />
      <UserList keyword={debouncedKeyword} />
    </section>
  );
}
