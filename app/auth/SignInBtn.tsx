"use client";

import { Button } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GoogleIcon from "@/public/google-icon.svg";
import { useSearchParams } from "next/navigation";

const SignInBtn = () => {
  const callBackUrl = useSearchParams().get("callbackUrl") ?? "/";
  console.log(callBackUrl);
  return (
    <Button
      variant="outline"
      color="gray"
      size={"3"}
      className="mb-4! text-gray-800! w-full!"
      onClick={() => signIn("google", { callbackUrl: callBackUrl })}
    >
      <Image src={GoogleIcon} alt="google icon"></Image>
      Continue with Google
    </Button>
  );
};

export default SignInBtn;
