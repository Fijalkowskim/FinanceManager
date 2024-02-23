import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../helpers/helpers";
import { motion } from "framer-motion";
import { VariantProps, cva } from "class-variance-authority";

const variants = cva(
  "flex items-center text-primary-950 justify-center px-2 py-1 rounded-md shadow-sm transition-colors text-center mx-auto transition-all font-medium",
  {
    variants: {
      variant: {
        default: "bg-action-500 hover:bg-action-600 text-primary-50 ",
        inverted:
          "border-2 border-action-500 bg-primary-50 hover:bg-primary-100",
        primary:
          "bg-primary-500 hover:bg-primary-600 text-primary-50 font-light",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof variants> {
  className?: string;
  children?: ReactNode;
  rounded?: boolean;
  disableScaleAnimation?: boolean;
}

function CustomButton({
  className,
  children,
  variant,
  rounded,
  disableScaleAnimation,
  ...props
}: Props) {
  return (
    <motion.button
      whileHover={disableScaleAnimation ? {} : { scale: 1.03 }}
      whileTap={disableScaleAnimation ? {} : { scale: 1.01 }}
      className=""
    >
      <button
        {...props}
        className={cn(
          variants({ variant, className }),
          `${rounded ? "rounded-full px-2 py-2 " : ""}`
        )}
      >
        {children}
      </button>
    </motion.button>
  );
}

export default CustomButton;
