import { Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import {
  FEBookmarkSingleSearchOutline,
  FEPersonFilled,
} from "src/assets/Icons/Fluent";
import FELinkMore from "src/components/fe-components/FELinkMore";
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import FECard from "src/components/FECard";

export interface IFEFacultyAdminProposalApplicationCard {
  index?: number;
  name: string;
  nim: string;
  proposalTitle: string;
  laboratory: string;
  proposer?: "Dosen" | "Mahasiswa";
  proposerName?: string;
  to?: string;
}

const FEFacultyAdminProposalApplicationCard: React.FC<
  IFEFacultyAdminProposalApplicationCard
> = ({
  index,
  name,
  nim,
  laboratory,
  proposalTitle,
  proposer,
  proposerName,
  to,
}) => {
  const theme = useMantineTheme();
  return (
    <FECard bg="bg-primary-500" leftBorderRadius="xl">
      <Stack className="bg-white px-8 py-6 justify-between relative border rounded-r-xl border-secondary-500">
        <Stack className="gap-1 mb-4 z-10">
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
              {proposer == null ? null : (
                <Group className="">
                  <Text className="text-primary-text-500 font-bold text-lg">
                    Asal Usulan
                  </Text>
                  <Text>
                    <FERoundedChip
                      label={
                        proposer === "Dosen"
                          ? `Dosen (${proposerName})`
                          : `Mahasiswa (${name})`
                      }
                      type="blue"
                      leftIcon={
                        <FEPersonFilled
                          size={14}
                          color={theme.colors["primary"][5]}
                        />
                      }
                    />
                  </Text>
                </Group>
              )}
            </Stack>
          </Stack>
        </Stack>
        <FELinkMore
          // color={theme.colors["secondary-text"][5]}
          color={theme.colors["primary"][7]}
          to={to}
        />
        <FEBookmarkSingleSearchOutline
          size={120}
          color={"#F1F1F3"}
          className="absolute right-6 bottom-6 z-[1]"
        />
      </Stack>
    </FECard>
  );
};
export default FEFacultyAdminProposalApplicationCard;
