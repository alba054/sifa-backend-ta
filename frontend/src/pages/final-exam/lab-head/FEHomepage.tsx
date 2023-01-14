import { Text, Title, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import FEDateChip from "src/components/fe-components/FEDateChip";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";

interface IFEHomepageLabHeadProps {}

const dummyName : string = "Takdim"
const dummyDate : Date = new Date()

const FEHomepageLabHead: React.FC<IFEHomepageLabHeadProps> = ({}) => {
  const [name]= useState(dummyName)
  const [date]= useState(dummyDate)

  const theme = useMantineTheme();

  return (
    <FEMainlayout>
      <FEDateChip date={date} />
      <Title order={2} mb={"md"}>
        Home
      </Title>
      <Text className="text-lg text-primary-text-500">
        Selamat Datang, {name} 👋.
      </Text>
    </FEMainlayout>
  );
};
export default FEHomepageLabHead;
