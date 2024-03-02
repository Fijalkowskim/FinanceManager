import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../helpers/helpers";
import { MotionProps, motion } from "framer-motion";
import { VariantProps, cva } from "class-variance-authority";

const variants = cva(
  "flex items-center text-primary-950 justify-center px-2 py-1 rounded-md shadow-sm transition-colors text-center mx-auto transition-all font-light",
  {
    variants: {
      variant: {
        default: "bg-action-500 hover:bg-action-600 text-primary-50 ",
        inverted:
          "border-2 border-action-500 bg-primary-50 hover:bg-primary-100",
        primary: "bg-primary-500 hover:bg-primary-600 text-primary-50 ",
        green: "bg-green-500 hover:bg-green-600 text-primary-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Props
  extends Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      "onDragStart" | "onAnimationStart" | "onDrag" | "onDragEnd" | "style"
    >,
    VariantProps<typeof variants>,
    MotionProps {
  parentClass?: string;
  className?: string;
  children?: ReactNode;
  rounded?: boolean;
  disableScaleAnimation?: boolean;
}

function CustomButton({
  parentClass,
  className,
  children,
  variant,
  rounded,
  disableScaleAnimation,
  ...props
}: Props) {
  return (
    <motion.button
      {...props}
      whileHover={disableScaleAnimation ? {} : { scale: 1.03 }}
      whileTap={disableScaleAnimation ? {} : { scale: 1.01 }}
      className={cn(
        variants({ variant, className }),
        `${rounded ? "rounded-full" : ""}`
      )}
    >
      {children}
    </motion.button>
  );
}

export default CustomButton;
