import { Container } from "@mantine/core";
import React from "react";

interface IDefaultLayoutProps {
  children: any;
}

const DefaultLayout: React.FC<IDefaultLayoutProps> = ({ children }) => {
  return (
    <Container size={"xl"} className={`bg-red-600`}>
      {children}
    </Container>
  );
};

export default DefaultLayout;
