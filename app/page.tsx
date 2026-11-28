import { Button, Container } from "@radix-ui/themes";
import NavBar from "./components/NavBar";
import Pagination from "./components/Pagination";
import { Suspense } from "react";
import { Skeleton } from "./components";

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  return (
    <>
      <NavBar />
      <Container size="4" px="4">
        <Suspense fallback="Loading...">
          <Pagination
            itemCount={100}
            pageSize={10}
            currentPage={Number(page)}
          />
        </Suspense>
      </Container>
    </>
  );
}
