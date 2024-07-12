import { create } from "zustand";

type BookSearchStore = {
  keyword: string;
  page: number;
  setKeyword: (keyword: string) => void;
  setPage: (keyword: number) => void;
};

export const useBookSearchStore = create<BookSearchStore>()((set) => ({
  keyword: "",
  page: 1,
  setKeyword: (value: string) => set(() => ({ keyword: value })),
  setPage: (value: number) => set(() => ({ page: value })),
}));

type UserSearchStore = {
  keyword: string;
  setKeyword: (keyword: string) => void;
};

export const useUserSearchStore = create<UserSearchStore>()((set) => ({
  keyword: "",
  setKeyword: (value: string) => set(() => ({ keyword: value })),
}));
