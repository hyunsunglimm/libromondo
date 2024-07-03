import { create } from "zustand";

type SearchStore = {
  keyword: string;
  page: number;
  setKeyword: (keyword: string) => void;
  setPage: (keyword: number) => void;
};

export const useSearchStore = create<SearchStore>()((set) => ({
  keyword: "",
  page: 1,
  setKeyword: (value: string) => set(() => ({ keyword: value })),
  setPage: (value: number) => set(() => ({ page: value })),
}));
