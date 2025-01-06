import { BASE_URL } from "@/constants/url";
import useAlarm from "@/hooks/useAlarm";
import { useMe } from "@/hooks/useMe";
import { SanityUser } from "@/types/user";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

async function updateFollow(targetId: string, follow: boolean) {
  return fetch("/api/follow", {
    method: "PUT",
    body: JSON.stringify({ targetId, follow }),
  }).then((res) => res.json());
}

export function useUserById(userId: string) {
  const { data: loginUser } = useMe();
  const { withAlarm } = useAlarm();

  const queryClient = useQueryClient();

  const isFollow =
    loginUser?.following?.some((user) => user.id === userId) || false;

  const isMe = loginUser?.id === userId;

  const query = useQuery<SanityUser>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/user/${userId}`);

      return await res.json();
    },
  });

  const user = query.data;

  const { mutate } = useMutation({
    mutationFn: () => updateFollow(userId as string, isFollow),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["user", userId],
      });
      await queryClient.cancelQueries({
        queryKey: ["me"],
      });

      queryClient.setQueryData(["user", userId], (prev: SanityUser) =>
        isFollow
          ? {
              ...prev,
              followers: prev.followers.filter(
                (user) => user.id !== loginUser?.id
              ),
            }
          : {
              ...prev,
              followers: [
                ...prev.followers,
                {
                  id: loginUser?.id,
                  name: loginUser?.name,
                  image: loginUser?.image,
                },
              ],
            }
      );
      queryClient.setQueryData(["me"], (prev: SanityUser) =>
        isFollow
          ? {
              ...prev,
              following: prev.following.filter((user) => user.id !== userId),
            }
          : {
              ...prev,
              following: [
                ...prev.following,
                { id: userId, name: user?.name, image: user?.image },
              ],
            }
      );
    },
    onError: () => {
      // 임시 alert
      alert("팔로우 혹은 팔로잉에 실패하였습니다. 잠시 후 다시 시도해주세요.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["me", loginUser?.id] });
    },
  });

  const toggleFollow = () => {
    withAlarm(() => {
      mutate();
    });
  };

  return { ...query, isFollow, isMe, toggleFollow };
}
