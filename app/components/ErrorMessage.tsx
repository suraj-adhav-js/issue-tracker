import React, { PropsWithChildren } from "react";
import { BiSolidError } from "react-icons/bi";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <p className="text-red-500! text-sm flex items-center gap-0.5">
      <BiSolidError />
      {children}
    </p>
  );
};

export default ErrorMessage;
