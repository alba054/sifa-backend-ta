import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FEBookmarkSingleSearchOutline,
  FEPersonFilled,
} from "src/assets/Icons/Fluent";
import FELinkMore from "src/components/fe-components/FELinkMore";
import FERoundedChip, {
  approvalChip2,
} from "src/components/fe-components/FERoundedChip";
import FECard from "src/components/FECard";
import { IGFEExaminers, IGFEMentors } from "src/utils/const/interfaces";
import { FEStatus } from "src/utils/const/type";

export interface IFEFacultyAdminProposalMakingCard {
  index?: number;
  name: string;
  nim: string;
  proposalTitle: string;
  laboratory: string;
  mentors: IGFEMentors;
  skMentors: IFEProposalMakingSK;
  examiners: IGFEExaminers;
  skExaminers: IFEProposalMakingSK;
  onDelete?: (e: number) => void;
}

export interface IFEProposalMakingSK {
  status?: FEStatus;
  refusalReason?: string;
  repellentRole?: string; // Di sini sebenarnya bisa dibuatkan interface role nya
}

const FEFacultyAdminProposalMakingCard: React.FC<
  IFEFacultyAdminProposalMakingCard
> = ({
  index,
  name,
  nim,
  laboratory,
  proposalTitle,
  mentors,
  examiners,
  skExaminers,
  skMentors,
  onDelete,
}) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  console.log(skMentors.status);
  return (
    <FECard bg="bg-primary-500" leftBorderRadius="xl">
      <Stack className="bg-white px-8 py-6 justify-between relative border rounded-r-xl border-secondary-500">
        <Stack className="gap-2 mb-4 z-10">
          <Text className="text-2xl font-bold text-primary-text-500 mb-2">
            {name} ({nim})
          </Text>
          <Stack className="gap-4">
            <Stack className="gap-0">
              <Text className="text-[18px] font-semibold text-primary-500 tracking-1 mb-1">
                {proposalTitle}
              </Text>
              <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                Lab. {laboratory}
              </Text>
            </Stack>
          </Stack>
          <Stack className="gap-4">
            <Stack className="gap-1">
              <Group>
                <Text className="font-bold text-xl text-primary-text-500">
                  Pembimbing
                </Text>
                {approvalChip2[skMentors.status || "Menunggu"]}
              </Group>
              <Stack className="gap-0">
                <Text className="font-semibold text-lg text-primary-text-500">
                  Pembimbing Utama
                </Text>
                <Text className="text-secondary-text-500 font-semibold text-lg tracking-1">
                  {mentors.mainMentor}
                </Text>
              </Stack>
              <Stack className="gap-0">
                <Text className="font-semibold text-lg text-primary-text-500">
                  Pembimbing Pendamping
                </Text>
                <Text className="text-secondary-text-500 font-semibold text-lg tracking-1">
                  {mentors.sideMentor}
                </Text>
              </Stack>
            </Stack>
            <Stack className="gap-1">
              <Group>
                <Text className="font-bold text-xl text-primary-text-500">
                  Penguji
                </Text>
                {approvalChip2[skExaminers.status || "Menunggu"]}
              </Group>
              <Stack className="gap-0">
                <Text className="font-semibold text-lg text-primary-text-500">
                  Penguji Pertama
                </Text>
                <Text className="text-secondary-text-500 font-semibold text-lg tracking-1">
                  {examiners.firstExaminer}
                </Text>
              </Stack>
              <Stack className="gap-0">
                <Text className="font-semibold text-lg text-primary-text-500">
                  Penguji Kedua
                </Text>
                <Text className="text-secondary-text-500 font-semibold text-lg tracking-1">
                  {examiners.secondExaminer || "Tidak Ada Penguji Kedua"}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Group className="justify-between -mt-4">
          <FELinkMore caption="Selengkapnya" to={nim} />
          {skExaminers.status === "Diterima" &&
          skMentors.status === "Diterima" ? (
            <Button
              variant="light"
              className="bg-primary-500 text-white hover:bg-primary-500 z-10 px-10"
              onClick={() => {
                onDelete!(index!);
              }}
            >
              Selesai
            </Button>
          ) : null}
        </Group>
        <FEBookmarkSingleSearchOutline
          size={120}
          color={"#F1F1F3"}
          className="absolute right-6 bottom-6 z-[1]"
        />
      </Stack>
    </FECard>
  );
};
export default FEFacultyAdminProposalMakingCard;
