import { Group, Image, Stack, Text } from "@mantine/core";
import React from "react";
import dummyProfilePicture from "../../assets/images/dummy_profile_picture.png";

export interface IFEGuidanceChatterCard {}

const FEGuidanceChatterCard: React.FC<IFEGuidanceChatterCard> = ({}) => {
  return (
    <Stack className="p-4 pb-5 border border-secondary-500 rounded-xl gap-2 w-[380px]">
      <Group className="justify-between">
        <div className={`w-[14px] h-[14px] rounded-full ${(true)? "bg-[#1E9E63]" : "bg-[#B5C2D1]"}`} />
        <Text className="text-divider-500 tracking-1 text-sm">
          Sedang aktif
        </Text>
      </Group>
      <Group className="gap-4 mx-4 relative">
        <div className={`relative rounded-full overflow-hidden`}>
          <Image
            src={dummyProfilePicture}
            width={64}
            height={64}
            alt="Foto Pembimbing"
          />
        </div>
        <Stack className="gap-0 absolute left-20">
          <Text className="text-primary-text-500 font-bold text-lg tracking-2 truncate w-[250px]">Dr. Hendra, S.Si., M.Kom.</Text>
          <Text className="text-secondary-text-500 tracking-4">Pembimbing Utama</Text>
        </Stack>
      </Group>
    </Stack>
  );
};
export default FEGuidanceChatterCard;
