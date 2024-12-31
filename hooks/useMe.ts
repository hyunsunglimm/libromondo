import { SanityUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useMe() {
  const { data: session, status } = useSession();

  const myId = session?.user?.id;

  const shouldFetch = status === "authenticated" && !!myId;

  return useQuery<SanityUser>({
    queryKey: ["me", myId],
    queryFn: async () => {
      const res = await fetch(`/api/user/${myId}`);
      return await res.json();
    },
    enabled: shouldFetch,
  });
}
