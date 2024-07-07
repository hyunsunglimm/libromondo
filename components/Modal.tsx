"use client";

import { AnimatePresence } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export default function Modal({ isOpen, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-20 bg-black/80">
          <div className="bg-white p-8 rounded-md">{children}</div>
        </div>
      )}
    </AnimatePresence>
  );
}
