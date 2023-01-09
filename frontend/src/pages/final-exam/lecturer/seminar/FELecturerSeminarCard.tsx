import { Button, Group, Stack, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { FEClockOutline, FELocationOutline } from "src/assets/Icons/Fluent";
import FEProfileCard from "src/components/FEProfileCard";

export interface IFELecturerSeminarCard {
  name: string;
  nim: string;
  proposalTitle: string;
  seminarType: string;
  seminarTime: string;
  seminarOfflinePlace: string;
  seminarOnlinePlace: string;
}

const FELecturerSeminarCard: React.FC<IFELecturerSeminarCard> = ({
  name,
  nim,
  proposalTitle,
  seminarOfflinePlace,
  seminarOnlinePlace,
  seminarTime,
  seminarType,
}) => {
  return (
    <FEProfileCard
      cardTitle={seminarType}
      padding="p-8 pb-5"
      titleMargin="mb-2"
    >
      <Stack className="gap-6">
        <Stack className="gap-1">
          <Text className="text-lg tracking-1">
            {proposalTitle}
          </Text>
          <Text className="text-secondary-text-500 tracking-4">
            Oleh: {name} ({nim})
          </Text>
        </Stack>
        <Stack className="gap-2">
          <Group className="gap-2">
            <FEClockOutline
              size={18}
              color={"#334155"}
              className="relative -top-[1px]"
            />
            <Text className="text-primary-text-500">
              {seminarTime}
            </Text>
          </Group>
          <Stack className="gap-0">
            <Group className="gap-2">
              <FELocationOutline
                size={18}
                color={"#334155"}
                className="relative -top-[1px]"
              />
              <Text className="text-primary-text-500 font-bold">
                {seminarOfflinePlace}
              </Text>
            </Group>
            <Text className="text-primary-text-500 ml-[26px] truncate">
              Link Zoom :
              <a href={seminarOnlinePlace} target="_blank">
                {seminarOnlinePlace}
              </a>
            </Text>
          </Stack>
        </Stack>
        <Button
          variant="light"
          className="bg-primary-500/[0.1] w-fit flex justify-end ml-auto mr-0 hover:bg-primary-500/[0.1] -mt-2"
          component={Link}
          to={nim}
        >
          Lihat Detail
        </Button>
      </Stack>
    </FEProfileCard>
  );
};
export default FELecturerSeminarCard;
