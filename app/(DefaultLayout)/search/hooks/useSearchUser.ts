import { queryKeys } from "@/constants/queryKeys";
import { BASE_URL } from "@/constants/url";
import { SimpleUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export function useSearchUser(keyword: string) {
  return useQuery<SimpleUser[]>({
    queryKey: [queryKeys.search.user, keyword],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/user/search?query=${keyword}`);

      return await res.json();
    },
    enabled: keyword.trim().length > 0,
  });
}
