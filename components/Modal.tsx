"use client";

import { AnimatePresence } from "framer-motion";
import CloseIcon from "./icons/CloseIcon";
import { motion } from "framer-motion";
import ModalPortal from "./ModalPortal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalPortal>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-20 bg-black/50"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                onClose();
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-8 rounded-md relative"
            >
              {children}
            </motion.div>
          </motion.section>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}
