import NextLink from "next/link";
import { Link as RedixLink } from "@radix-ui/themes";

interface Props {
  href: string;
  children: string;
}

const Link = ({ href, children }: Props) => {
  return (
    <RedixLink asChild>
      <NextLink href={href} style={{ textTransform: "capitalize" }}>{children}</NextLink>
    </RedixLink>
  );
};

export default Link;

