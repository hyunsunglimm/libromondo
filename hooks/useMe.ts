import { SanityUser } from "@/types/user";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export default function useMe() {
  const { data: session, status } = useSession();

  const shouldFetch = status === "authenticated" && !!session?.user?.id;

  const {
    data: loginUser,
    isLoading,
    mutate,
  } = useSWR<SanityUser>(shouldFetch ? `/api/user/${session?.user?.id}` : null);

  return { loginUser, isLoading: isLoading || status === "loading", mutate };
}
