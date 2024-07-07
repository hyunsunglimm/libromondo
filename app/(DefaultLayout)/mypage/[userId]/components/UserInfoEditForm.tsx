"use client";

import { Button } from "@/components/ui/button";
import { SanityUser } from "@/types/user";
import { useState } from "react";

export default function UserInfoEditForm({
  user,
}: {
  user: SanityUser | undefined;
}) {
  const [file, setFile] = useState<File>();
  const [enteredName, setEnteredName] = useState(user?.name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file || "");
    formData.append("name", enteredName || "");

    fetch("/api/user/edit", {
      method: "PUT",
      body: formData,
    });
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
      <p className="text-sm text-gray-400">
        프로필 이미지 수정은 이미지를 클릭하세요.
      </p>
      <input
        value={enteredName}
        onChange={(e) => setEnteredName(e.target.value)}
        className="border p-1 rounded-md w-full"
      />
      <Button className="w-full">저장</Button>
    </form>
  );
}
