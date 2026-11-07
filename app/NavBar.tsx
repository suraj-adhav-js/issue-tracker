"use client";
import Link from "next/link";
import issues_tracker from "@/public/issues-tracker.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { Box, Container, Flex } from "@radix-ui/themes";
const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="border-b border-gray-200 mb-5">
      <Container size="4" px="4">
        <Flex align={"center"} justify={"between"}>
        <Link href="/" className="flex flex-row items-center gap-1 font-bold ">
          <Image
            src={issues_tracker}
            alt="issues tracker logo"
            className="w-200 lg:w-50 py-2"
          ></Image>
        </Link>

        <ul className="flex justify-around gap-6">
          {links.map((link) => {
            return (
              <li key={link.label}>
                <Link
                  className={classnames({
                    "text-zinc-900": currentPath === link.href,
                    "text-zinc-500": currentPath !== link.href,
                    " hover:text-zinc-800 transition-color text-sm md:text-lg": true,
                  })}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
