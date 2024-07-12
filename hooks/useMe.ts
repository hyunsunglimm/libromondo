import { useAlarmStore } from "@/store/alarm";
import { SanityUser } from "@/types/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

async function updateFollow(targetId: string, follow: boolean) {
  return fetch("/api/follow", {
    method: "PUT",
    body: JSON.stringify({ targetId, follow }),
  }).then((res) => res.json());
}

export default function useMe() {
  const [followLoading, setFollowLoading] = useState(false);
  const { data: session, status } = useSession();
  const { isAlarm, onAlarm, offAlarm } = useAlarmStore();

  const shouldFetch = status === "authenticated" && !!session?.user?.id;

  const {
    data: loginUser,
    isLoading,
    mutate,
  } = useSWR<SanityUser>(shouldFetch ? `/api/user/${session?.user?.id}` : null);

  const toggleFollow = async (targetId: string, follow: boolean) => {
    if (!loginUser) {
      onAlarm();
      return;
    }
    setFollowLoading(true);

    await mutate(updateFollow(targetId, follow), { populateCache: false });
    setFollowLoading(false);
  };

  useEffect(() => {
    if (isAlarm) {
      const timer = setTimeout(() => {
        offAlarm();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isAlarm, offAlarm]);

  return {
    loginUser,
    isLoading: isLoading || status === "loading",
    followLoading,
    mutate,
    toggleFollow,
  };
}
