"use client";

import { useAlarmStore } from "@/store/alarm";
import { AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export function Alarm() {
  const { isAlarm, offAlarm } = useAlarmStore();

  return (
    <AnimatePresence>
      {isAlarm && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-black p-4 rounded-lg fixed z-10 bottom-4 right-4 flex gap-4 items-center"
        >
          <p>로그인이 필요한 서비스입니다.</p>
          <Button variant="outline" onClick={offAlarm}>
            확인
          </Button>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
