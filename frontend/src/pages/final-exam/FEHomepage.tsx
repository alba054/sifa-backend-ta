import { Button, Title, useMantineTheme } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import FEDateChip from "src/components/fe-components/FEDateChip";
import { possibleRole, UserRoleChangeContext, UserRoleContext } from "src/components/fe-components/FERoleContext";
import { TextInput } from "src/components/FormInput";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";

interface IFEHomepageProps {}

const FEHomepage: React.FC<IFEHomepageProps> = ({}) => {
  const role= useContext(UserRoleContext)
  const changeRole= useContext(UserRoleChangeContext)

  const [newRole, setNewRole] = useState<possibleRole|null>(null)

  useEffect(() => {
    setNewRole(role)
  }, [])
  

  const theme= useMantineTheme();
  return (
    <FEMainlayout>
      <FEDateChip />
      <Title order={2} mb={"md"}>
        Home
      </Title>
      {
        role
      }

        <TextInput onChange={(e)=>{setNewRole(e.currentTarget.value as any)}} />
        <Button onClick={()=>{changeRole(newRole as any)}}>set</Button>
      {/* <Stack className="gap-4">
        <Text className="text-xl tracking-1 text-primary-text-500">
          Semester Akhir 2021/2022
        </Text>
        <Group className="gap-6" grow>
          <FEHomeCard
            title="120"
            mainIcon={<FEBookmarkMultipleFilled size={40} color="#ffffff" />}
            backgroundColor="bg-primary-500"
            backgroundIcon={
              <FEBookmarkMultipleFilled
                size={120}
                color="#4844c8"
                className="absolute right-2 hidden sm:block -top-6 z-[-1]"
              />
            }
            subject="Kelas Matakuliah"
            additional={["99 Wajib", "21 Pilihan"]}
          />
          <FEHomeCard
            title="82"
            mainIcon={<FELecturerFilled size={38} color="#ffffff" />}
            backgroundColor="bg-[#1E9E63]"
            backgroundIcon={
              <FELecturerFilled
                size={120}
                color="#176F46"
                className="absolute right-2 hidden sm:block -top-6 z-[-1]"
              />
            }
            subject="Total Dosen"
            additional={["7 Homebase"]}
          />
          <FEHomeCard
            title="946"
            mainIcon={<FEPersonFilled size={38} color="#ffffff" />}
            backgroundColor="bg-error-500"
            backgroundIcon={
              <FEPersonFilled
                size={120}
                color="#B81C3B"
                className="absolute right-2 hidden sm:block -top-6 z-[-1]"
              />
            }
            subject="Total Mahasiswa"
            additional={["473 Laki-laki", "473 Perempuan"]}
          />
        </Group>
      </Stack>
      <Stack mt={"xl"}>
        <Group className="justify-between">
          <Group className="gap-2">
            <FEClockRepeatOutline />
            <Text className="text-lg font-semibold" >Riwayat Matakuliah</Text>
          </Group>
          <Link to={"#"} className="text-primary-500">Selengkapnya <FEDoubleArrowOutline size={11} color={theme.colors['primary'][5]} className="inline align-middle " /></Link>
        </Group>
      </Stack> */}
    </FEMainlayout>
  );
};
export default FEHomepage;
