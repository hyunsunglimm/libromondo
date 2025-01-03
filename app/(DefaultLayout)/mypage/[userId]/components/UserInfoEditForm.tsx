import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import useMe from "@/hooks/useMe";
import { useModal } from "@/hooks/useModal";
import { SanityUser } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type UserInfoEditForm = {
  user: SanityUser | undefined;
};

export default function UserInfoEditForm({ user }: UserInfoEditForm) {
  const [file, setFile] = useState<File>();
  const [enteredName, setEnteredName] = useState(user?.name);
  const [isLoading, setIsLoading] = useState(false);

  const { close } = useModal();

  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file || "");
    formData.append("name", enteredName || "");

    await fetch("/api/user/edit", {
      method: "PUT",
      body: formData,
    });

    queryClient.invalidateQueries({ queryKey: ["user", user?.id] });
    setIsLoading(false);
    close();
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-4"
      onSubmit={handleSubmit}
    >
      <input
        className="hidden"
        name="input"
        id="input-upload"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      <label htmlFor="input-upload">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={file ? URL.createObjectURL(file) : user?.image}
          alt={`변경될 ${user?.name}님의 프로필 이미지`}
          className="w-32 h-32 border border-black rounded-full object-cover cursor-pointer"
        />
      </label>
      <p className="text-xl md:text-sm text-gray-400">
        프로필 이미지 수정은 이미지를 클릭하세요.
      </p>
      <input
        value={enteredName}
        onChange={(e) => setEnteredName(e.target.value)}
        className="border p-1 rounded-md w-full text-[16px]"
        required
        maxLength={12}
      />
      <Button className="w-full text-2xl md:text-base font-bold h-14">
        {isLoading ? <Spinner /> : "저장"}
      </Button>
    </form>
  );
}
