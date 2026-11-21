import { Container } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import NavBar from "../components/NavBar";

const PageLayout = ({ children }: PropsWithChildren) => {
  return (<>
    <NavBar />
    <Container size="4" px="4">
      {children}
    </Container>
  </>);
};

export default PageLayout;
