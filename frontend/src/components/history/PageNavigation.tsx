import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useExpenseHistoryContext } from "../../context/ExpenseHistoryContext";
interface Props {
  totalPages: number;
}
function PageNavigation({ totalPages }: Props) {
  const { page, setPage } = useExpenseHistoryContext();
  return (
    <div className="mt-4 flex items-center justify-center gap-1">
      <motion.button
        className={`text-xl ${page <= 0 && "opacity-0 pointer-events-none"}`}
        onClick={() => {
          if (page > 0) {
            setPage((prev) => prev - 1);
            window.scrollTo(0, 0);
          }
        }}
        whileHover={{ x: -1 }}
      >
        <FaAngleLeft />
      </motion.button>
      <p>
        Page {page + 1}/{totalPages}
      </p>
      <motion.button
        className={`text-xl ${
          page >= totalPages - 1 && "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          if (page < totalPages - 1) {
            setPage((prev) => prev + 1);
            window.scrollTo(0, 0);
          }
        }}
        whileHover={{ x: 1 }}
      >
        <FaAngleRight />
      </motion.button>
    </div>
  );
}

export default PageNavigation;
