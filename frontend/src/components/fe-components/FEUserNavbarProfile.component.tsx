import { Group, Image, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { FEROUTES } from "src/routes/final-exam.route";

interface IFEUserNavbarProfileComponentProps {
  isHover: boolean;
}

const FEUserNavbarProfileComponent: React.FC<
  IFEUserNavbarProfileComponentProps
> = ({ isHover }) => {
  return (
    <Link to={`${FEROUTES.PROFILE}`}>
      <Group noWrap>
        <Image
          src="https://img.celebrities.id/okz/600/49j1HU/master_Qs82l8BI82_886_teknik_menggambar_ilustrasi.jpg"
          alt="User profile picture"
          width={60}
          height={60}
          radius="xl"
        />

        {!!isHover && (
          <Stack spacing={4} className={`shrink-0`}>
            <Text size="md" weight="bold">
              Muh. Takdim
            </Text>
            <Text color={"gray"}>H071191019</Text>
          </Stack>
        )}
      </Group>
    </Link>
  );
};
export default FEUserNavbarProfileComponent;
