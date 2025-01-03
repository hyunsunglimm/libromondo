"use client";

import { useModal } from "@/hooks/useModal";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function Modal() {
  const { modalState, close } = useModal();
  const { isOpen, component } = modalState;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-20 bg-black/50"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              close();
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
            {component}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
