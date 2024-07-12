import { SanityUser } from "@/types/user";
import { useSession } from "next-auth/react";
import useSWR from "swr";

async function updateFollow(targetId: string, follow: boolean) {
  return fetch("/api/follow", {
    method: "PUT",
    body: JSON.stringify({ targetId, follow }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: session, status } = useSession();

  const shouldFetch = status === "authenticated" && !!session?.user?.id;

  const {
    data: loginUser,
    isLoading,
    mutate,
  } = useSWR<SanityUser>(shouldFetch ? `/api/user/${session?.user?.id}` : null);

  const toggleFollow = (targetId: string, follow: boolean) =>
    mutate(updateFollow(targetId, follow), { populateCache: false });

  return {
    loginUser,
    isLoading: isLoading || status === "loading",
    mutate,
    toggleFollow,
  };
}
