"use client";

import { useAlarmStore } from "@/store/alarm";
import { AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Alarm() {
  const { isAlarm, offAlarm } = useAlarmStore();
  const pathname = usePathname();

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
          <p className="text-2xl md:text-base">로그인이 필요한 서비스입니다.</p>
          <Button
            asChild
            onClick={offAlarm}
            className="text-2xl md:text-base h-12"
          >
            <Link
              href={`/login?callbackUrl=${pathname}`}
              className="text-3xl md:text-base"
            >
              로그인
            </Link>
          </Button>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
