import { BASE_URL } from "@/constants/url";
import { SanityUser } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useModal } from "./useModal";
import { queryKeys } from "@/constants/queryKeys";

type EditInfoParams = {
  event: React.FormEvent;
  file: File | undefined;
  enteredName: string | undefined;
};

const editInfoMutationFn = async ({
  event,
  file,
  enteredName,
}: EditInfoParams) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("file", file || "");
  formData.append("name", enteredName || "");

  await fetch(`${BASE_URL}/api/user/edit`, {
    method: "PUT",
    body: formData,
  });

  close();
};

export function useMe() {
  const queryClient = useQueryClient();
  const { close } = useModal();

  const query = useQuery<SanityUser>({
    queryKey: [queryKeys.user.me],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/me`);

      return await res.json();
    },
  });

  const { mutate: editInfo, isPending: editLoading } = useMutation<
    void,
    Error,
    EditInfoParams
  >({
    mutationFn: (editInfoParams) => editInfoMutationFn(editInfoParams),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.me] });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.user.user, query.data?.id],
      });
      close();
    },
    onError: () => {
      alert("에러 발생!!!");
    },
  });

  return { ...query, editLoading, editInfo };
}
