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
import FEProfilePrivacyInformationComp from "../../../../../components/fe-components/FEProfilePrivacyInformationComp";
import FEProfileCard from "src/components/FEProfileCard";
import { Link } from "react-router-dom";
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import FELinkToSignButton from "src/components/fe-components/FELinkToSignButton";

export interface IFEProfileDetails {
  name?: string | null;
  nip?: string | null;
  profilePicture?: string | null | undefined;
  title?: string | null;
  email?: string | null;
  signUrl?: string
}

const FEProfileDetails: React.FC<IFEProfileDetails> = ({
  name,
  nip,
  profilePicture = dummy_profile_picture,
  title,
  email,
  signUrl
}) => {
  const theme = useMantineTheme();
  const noData = "-";

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
              <FERoundedChip label="Aktif" type="blue" />
            </Group>

            <Text className="text-secondary-text-500 text-[16px] top-[2px] relative">
              {nip || noData}
            </Text>
            <Text className="inline-flex gap-2 text-secondary-text-500 tracking-01">
              {title || noData}
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
              label="Email"
              value={email || noData}
              icon={<FEMailOutline color={theme.colors.secondary[9]} />}
            />
            <FELinkToSignButton url={signUrl} />
          </Group>
        </Stack>
      </Stack>
    </FEProfileCard>
  );
};
export default FEProfileDetails;
