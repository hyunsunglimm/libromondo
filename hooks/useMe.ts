import { SanityUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useMe() {
  const { data: session, status } = useSession();

  const userId = session?.user?.id;

  const shouldFetch = status === "authenticated" && !!userId;

  return useQuery<SanityUser>({
    queryKey: ["me", userId],
    queryFn: async () => {
      const res = await fetch(`/api/user/${session?.user?.id}`);
      return await res.json();
    },
    enabled: shouldFetch,
  });
}
