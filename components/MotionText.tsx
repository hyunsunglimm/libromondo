"use client";

import { motion } from "framer-motion";

type MotionTextProps = {
  children: React.ReactNode;
  tagName?: "p" | "h1" | "h2" | "h3" | "h4";
  className?: string;
};

export default function MotionText({
  children,
  tagName = "p",
  className = "",
}: MotionTextProps) {
  const Comp = motion[tagName];

  return (
    <Comp
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`${className} text-center`}
    >
      {children}
    </Comp>
  );
}
