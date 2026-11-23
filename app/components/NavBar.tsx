"use client";
import issues_tracker from "@/public/issues-tracker.svg";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { PiSignOutBold } from "react-icons/pi";
import Skeleton from "./Skeleton";

const NavBar = () => {
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

          <div className="flex justify-around gap-6 text-sm md:text-lg">
            <Suspense fallback={<LinkList currentPath={null} />}>
              <NavLinks />
            </Suspense>
            <AuthStatus />
          </div>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  return <LinkList currentPath={currentPath} />;
};

const LinkList = ({ currentPath }: { currentPath?: string | null }) => {
  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <ul className="flex gap-7">
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
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <Skeleton width="4rem"  />;
  }

  if (status === "unauthenticated") {
    return (
      <Button className="" onClick={() => signIn()}>
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          size={"2"}
          radius="full"
          src={session!.user!.image!}
          fallback="?"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <Flex gap="3" align="center" className="p-2  ">
          <Avatar
            size="3"
            src={session!.user!.image!}
            radius="full"
            fallback="T"
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              {session!.user!.name}
            </Text>
            <Text as="div" size="2" color="gray">
              {session!.user!.email}
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
  );
};

export default NavBar;
