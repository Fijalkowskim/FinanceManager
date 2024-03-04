import React, { ReactNode } from "react";
import { cn } from "../../helpers/helpers";
interface Props {
  children: ReactNode;
  className?: string;
}
function AnalyticsComponentContainer({ children, className }: Props) {
  return (
    <div
      className={cn(
        `w-full flex flex-col items-center justify-center bg-background-50 border-background-300/50 border rounded-sm shadow-md p-5 text-center `,
        className
      )}
    >
      {children}
    </div>
  );
}

export default AnalyticsComponentContainer;
