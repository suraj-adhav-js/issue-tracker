"use client";
import Link from "next/link";
import issues_tracker from "@/public/issues-tracker.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Container,
  DropdownMenu,
  Flex,
  Box,
  Card,
  Text,
  Button,
} from "@radix-ui/themes";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { PiSignOutBold } from "react-icons/pi";
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
              } transition-color`}
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
  // console.log(status, session)
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
            <ul className="flex justify-around gap-6 text-sm md:text-lg">
              <Suspense>
                <NavLinks />
              </Suspense>
              <li>
                {status === "authenticated" && (
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Avatar
                        size={"2"}
                        radius="full"
                        src={session.user!.image!}
                        fallback="?"
                      />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      {/* <DropdownMenu.Label>
                        {session.user!.name}
                      </DropdownMenu.Label> */}
                      <Flex gap="3" align="center" className="p-2  ">
                        <Avatar
                          size="3"
                          src={session.user!.image!}
                          radius="full"
                          fallback="T"
                        />
                        <Box>
                          <Text as="div" size="2" weight="bold">
                            {session.user!.name}
                          </Text>
                          <Text as="div" size="2" color="gray">
                            {session.user!.email}
                          </Text>
                        </Box>
                      </Flex>
                         <span className="block w-full h-0.75 border-b border-gray-300 mb-2"></span>

                       
                      <DropdownMenu.Item>
                        <Link
                          onClick={() => signOut()}
                          href="/api/auth/signin"
                          className="flex items-center gap-2"
                        >
                          <PiSignOutBold />
                          Sign Out
                        </Link>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                )}

                {status === "unauthenticated" && (
                  <Button className="" onClick={() => signIn()}>
                    Sign In
                  </Button>
                  // <Link onClick={() => signIn()} href="/api/auth/signin">
                  //   Sign In
                  // </Link>
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
