import { VariantProps, cva } from "class-variance-authority";
import { motion } from "framer-motion";
import React, { HTMLAttributes } from "react";
import { cn } from "../../helpers/helpers";

const variants = cva("", {
  variants: {
    variant: {
      error: "",
      success: "bg-green-300",
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

interface Props
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {
  className?: string;
  message: string;
}

function MessagePopup({ className, variant, message, ...props }: Props) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className={cn(
        "bg-action-300 p-1 rounded-md opacity-70",
        variants({ variant, className })
      )}
    >
      {message}
    </motion.div>
  );
}

export default MessagePopup;
