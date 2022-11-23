import {
  Button,
  Grid,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import {
  CakeOutline,
  EditProfileOutline,
  FECallOutline,
  FEHomeOutline,
  FEMailOutline,
  GenderOutline,
  TalkingOutline,
} from "src/assets/Icons/Fluent";
import dummy_profile_picture from "./../../../../../assets/images/dummy_profile_picture.png";
import FEProfilePrivacyInformationComp from "./FEProfilePrivacyInformationComp";
import FEProfileCard from "src/components/FEProfileCard";
import { Link } from "react-router-dom";
import FERoundedChip from "src/components/fe-components/FERoundedChip";

export interface IFEProfileDetails {}

const FEProfileDetails: React.FC<IFEProfileDetails> = ({}) => {
  const theme = useMantineTheme();

  return (
    <FEProfileCard bg="bg-gradient-to-b to-error-400 from-primary-500">
      <Stack className="w-fit gap-1 mb-4">
        <Title order={3} className="text-primary-text-500">
          Detail Profil
        </Title>
        <div
          className={`bg-gradient-to-l from-error to-primary w-1/2 pb-1 rounded-sm`}
        />
      </Stack>
      <Group className="justify-between">
        <Group spacing={"md"} className="items-center">
          <img
            src={dummy_profile_picture}
            alt="Foto Profil"
            className="mr-[24px] rounded-full w-[86px]"
          />
          <Stack className="gap-[2px]">
            <Group spacing={"lg"}>
              <Text className="text-[24px] font-semibold text-primary-text-500">
                Muhammad Takdim
              </Text>
              <Text className="-ml-4 text-secondary-text-500 text-[16px] top-[2px] relative">
                (N071191042)
              </Text>
              <FERoundedChip label="Aktif" type="blue" />
            </Group>
            <Text className="inline-flex gap-2 text-secondary-text-500 text-[16px]">
              S1{" "}
              <Text className="text-[10px] align-middle top-1 relative">
                &#x2022;
              </Text>{" "}
              Farmasi
            </Text>
          </Stack>
        </Group>
        <Button
          variant="light"
          className="bg-white !important text-primary-500 hover:bg-transparent"
          component={Link}
          to="edit"
        >
          <EditProfileOutline color={theme.colors.primary[5]} /> Edit Profil
        </Button>
      </Group>
      <hr className="text-secondary-600 my-[24px] mx-[16px]" />
      <Stack>
        <Title className="text-[18px] font-semibold text-primary-text-500 tracking-[0.0015em]">
          Informasi Pribadi
        </Title>
        <Grid className="px-3">
          <Grid.Col span={6} lg={6} md={6} sm={12}>
            <FEProfilePrivacyInformationComp
              label="Alamat"
              value="Jl. Arsitektur III Blok D 75 Kompleks UNHAS Antang"
              icon={<FEHomeOutline color={theme.colors.secondary[9]} />}
            />
          </Grid.Col>
          <Grid.Col span={6} lg={6} md={6} sm={12}>
            <FEProfilePrivacyInformationComp
              label="Nomor Telepon"
              value="082293410911"
              icon={<FECallOutline color={theme.colors.secondary[9]} />}
            />
          </Grid.Col>
          <Grid.Col span={6} lg={6} md={6} sm={12}>
            <FEProfilePrivacyInformationComp
              label="Tempat/Tanggal Lahir"
              value="Makassar, 15 Mei 2001"
              icon={<CakeOutline color={theme.colors.secondary[9]} />}
            />
          </Grid.Col>
          <Grid.Col span={6} lg={6} md={6} sm={12}>
            <FEProfilePrivacyInformationComp
              label="Gender"
              value="Laki-laki"
              icon={<GenderOutline color={theme.colors.secondary[9]} />}
            />
          </Grid.Col>
          <Grid.Col span={6} lg={6} md={6} sm={12}>
            <FEProfilePrivacyInformationComp
              label="Email"
              value="takdimu123@gmail.com"
              icon={<FEMailOutline color={theme.colors.secondary[9]} />}
            />
          </Grid.Col>
          <Grid.Col span={6} lg={6} md={6} sm={12}>
            <FEProfilePrivacyInformationComp
              label="Penasehat Akademik"
              value="Yayu Mulsiani Evary, S.Si., Pharm.Sci., Apt. (0005028901)"
              icon={<TalkingOutline color={theme.colors.secondary[9]} />}
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </FEProfileCard>
  );
};
export default FEProfileDetails;
