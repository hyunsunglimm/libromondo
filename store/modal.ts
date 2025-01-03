import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  component: React.ReactNode;
};

type ModalStore = {
  modalState: ModalState;
  open: (component: React.ReactNode) => void;
  close: () => void;
};

const defaultState = {
  isOpen: false,
  component: null,
};

export const useModalStore = create<ModalStore>()((set) => ({
  modalState: defaultState,
  open: (component) => set(() => ({ modalState: { isOpen: true, component } })),
  close: () => set(() => ({ modalState: defaultState })),
}));
