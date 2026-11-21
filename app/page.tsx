import { Button, Container } from "@radix-ui/themes";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <Container size="4" px="4">
        <p>home page</p>
        <Button>Click Me</Button>
      </Container>
    </>
  );
}
