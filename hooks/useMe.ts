import { BASE_URL } from "@/constants/url";
import { SanityUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  return useQuery<SanityUser>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/me`);

      return await res.json();
    },
  });
}
