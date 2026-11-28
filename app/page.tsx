import { Button, Container } from "@radix-ui/themes";
import NavBar from "./components/NavBar";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <>
      <NavBar />
      <Container size="4" px="4">
        <Pagination itemCount={100} pageSize={10} currentPage={10}/>
      </Container>
    </>
  );
}
