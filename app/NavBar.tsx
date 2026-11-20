"use client";
import Link from "next/link";
import issues_tracker from "@/public/issues-tracker.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container, Flex } from "@radix-ui/themes";
import { Suspense } from "react";
import { useSession } from "next-auth/react";

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <>
      {links.map((link) => {
        return (
          <li key={link.label}>
            <Link
              href={link.href}
              className={`${
                currentPath === link.href ? "text-zinc-900" : "text-zinc-500 "
              } transition-color text-sm md:text-lg`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </>
  );
};

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <nav className="border-b border-gray-200 mb-10">
      <Container size="4" px="4">
        <Flex align={"center"} justify={"between"}>
          <Link
            href="/"
            className="flex flex-row items-center gap-1 font-bold "
          >
            <Image
              src={issues_tracker}
              alt="issues tracker logo"
              className="max-w-50 py-2"
            ></Image>
          </Link>

          <div>
            <ul className="flex justify-around gap-6">
              <Suspense>
                <NavLinks />
              </Suspense>
              <li>
                {status === "authenticated" ? (
                  <Link href="/api/auth/signout">Sign Out</Link>
                ) : (
                  <Link href="/api/auth/signin">Sign In</Link>
                )}
              </li>
            </ul>
          </div>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
