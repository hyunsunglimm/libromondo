import { RiArrowDropDownLine } from "react-icons/ri";
import { motion } from "framer-motion";

type DropdownIconProps = {
  isOpen: boolean;
};

export default function DropdownIcon({ isOpen }: DropdownIconProps) {
  return (
    <motion.div initial={false} animate={isOpen ? "open" : "closed"}>
      <motion.div
        variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
        transition={{ duration: 0.2 }}
      >
        <RiArrowDropDownLine className="w-10 h-10 md:w-7 md:h-7" />
      </motion.div>
    </motion.div>
  );
}
