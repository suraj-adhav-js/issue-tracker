import { Button, Container } from "@radix-ui/themes";
import NavBar from "./components/NavBar";

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function Home() {
  return (
    <>
      <NavBar />
      <Container size="4" px="4"></Container>
    </>
  );
}
