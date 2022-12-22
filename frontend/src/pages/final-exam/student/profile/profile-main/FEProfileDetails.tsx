import {
  Button,
  Grid,
  Group,
  Stack,
  Text,
  Image,
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

export interface IFEProfileDetails {
  name?: string | null;
  nim?: string | null;
  profilePicture?: string | null | undefined;
  sksPassed?: number | null;
  title?: string | null;
  faculty?: string | null;
  address?: string | null;
  telephoneNumber?: string | null;
  placeDateOfBirth?: string | null;
  gender?: "Laki-laki" | "Perempuan" | null;
  email?: string | null;
  academicAdviser?: string | null;
}

const FEProfileDetails: React.FC<IFEProfileDetails> = ({
  name,
  nim,
  profilePicture=dummy_profile_picture,
  sksPassed,
  title,
  faculty,
  address,
  telephoneNumber,
  placeDateOfBirth,
  gender,
  email,
  academicAdviser,
}) => {
  const theme = useMantineTheme();
  const noData= "-"

  return (
    <FEProfileCard
      bg="bg-gradient-to-b to-error-400 from-primary-500"
      cardTitle="Detail Profil"
    >
      <Group className="justify-between">
        <Group spacing={"md"} className="items-center">
          <div className={`relative rounded-full overflow-hidden mr-6`}>
            <Image
              src={profilePicture || dummy_profile_picture}
              width={86}
              height={86}
              alt="Foto Profil"
            />
          </div>
          <Stack className="gap-[2px]">
            <Group spacing={"lg"}>
              <Text className="text-[24px] font-semibold text-primary-text-500">
                {name || noData}
              </Text>
              <Text className="-ml-4 text-secondary-text-500 text-[16px] top-[2px] relative">
                ({nim || noData})
              </Text>
              <FERoundedChip label="Aktif" type="blue" />
            </Group>
            <Text className="inline-flex gap-2 text-secondary-text-500 tracking-01">
              {title || noData}
              <Text className="text-[10px] align-middle top-1 relative">
                &#x2022;
              </Text>
              {faculty || noData}
            </Text>
            <Text className="text-secondary-text-500">
              Jumlah SKS yang telah dilulusi:
              <Text className="inline font-bold">{sksPassed || noData}</Text>
            </Text>
          </Stack>
        </Group>
        <Button
          variant="light"
          className="bg-white !important text-primary-500 hover:bg-transparent font-bold mx-0"
          component={Link}
          to="edit"
        >
          <EditProfileOutline
            size={20}
            color={theme.colors.primary[5]}
            className="mr-1"
          />
          Edit Profil
        </Button>
      </Group>
      <hr className="text-secondary-600 my-[24px] mx-[16px]" />
      <Stack>
        <Title className="text-[18px] font-semibold text-primary-text-500 tracking-[0.0015em]">
          Informasi Pribadi
        </Title>
        <Stack className="px-3">
          <Group>
            <FEProfilePrivacyInformationComp
              label="Alamat"
              value={address || noData}
              icon={<FEHomeOutline color={theme.colors.secondary[9]} />}
            />
            <FEProfilePrivacyInformationComp
              label="Nomor Telepon"
              value={telephoneNumber || noData}
              icon={<FECallOutline color={theme.colors.secondary[9]} />}
            />
          </Group>
          <Group>
            <FEProfilePrivacyInformationComp
              label="Tempat/Tanggal Lahir"
              value={placeDateOfBirth || noData}
              icon={<CakeOutline color={theme.colors.secondary[9]} />}
            />
            <FEProfilePrivacyInformationComp
              label="Gender"
              value={gender || noData}
              icon={<GenderOutline color={theme.colors.secondary[9]} />}
            />
          </Group>
          <Group>
            <FEProfilePrivacyInformationComp
              label="Email"
              value={email || noData}
              icon={<FEMailOutline color={theme.colors.secondary[9]} />}
            />
            <FEProfilePrivacyInformationComp
              label="Penasehat Akademik"
              value={academicAdviser || noData}
              icon={<TalkingOutline color={theme.colors.secondary[9]} />}
            />
          </Group>
        </Stack>
      </Stack>
    </FEProfileCard>
  );
};
export default FEProfileDetails;
