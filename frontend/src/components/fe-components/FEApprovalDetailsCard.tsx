import { Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect } from "react";
import {
  FEBookmarkSingleSearchOutline,
  FEPersonFilled,
} from "src/assets/Icons/Fluent";
import FELinkMore from "src/components/fe-components/FELinkMore";
import FECard from "src/components/FECard";
import { FEROUTES } from "src/routes/final-exam.route";
import FERoundedChip from "./FERoundedChip";

export interface IFEApprovalDetailsCard {
  name: string;
  nim: string;
  proposalArray: Array<IProposal>;
  onClick?: () => void;
}

export interface IProposal {
  proposalTitle: string;
  laboratory: string;
  proposer?: "Dosen" | "Mahasiswa";
  proposerName?: string;
}

const FEApprovalDetailsCard: React.FC<IFEApprovalDetailsCard> = ({
  name,
  nim,
  proposalArray,
  onClick,
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
              <Text className="font-bold text-xl text-primary-text-500">
                Judul Pertama
              </Text>
              <Text className="text-[18px] font-semibold text-primary-500 tracking-1 mb-1">
                {proposalArray[0].proposalTitle}
              </Text>
              <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                Lab. {proposalArray[0].laboratory}
              </Text>
              {proposalArray[0].proposer == null ? null : (
                <Group className="">
                  <Text className="text-primary-text-500 font-bold text-lg">
                    Asal Usulan
                  </Text>
                  <Text>
                    <FERoundedChip
                      label={
                        proposalArray[0].proposer === "Dosen"
                          ? `Dosen (${proposalArray[0].proposerName})`
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
            <Stack className="gap-0">
              <Text className="font-bold text-xl text-primary-text-500">
                Judul Kedua
              </Text>
              {proposalArray.length >= 2 ? (
                <>
                  <Text className="text-[18px] font-semibold text-primary-500 tracking-1 mb-1">
                    {proposalArray[1].proposalTitle}
                  </Text>
                  <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                    Lab. {proposalArray[1].laboratory}
                  </Text>
                  {proposalArray[1].proposer == null ? null : (
                    <Group className="">
                      <Text className="text-primary-text-500 font-bold text-lg">
                        Asal Usulan
                      </Text>
                      <Text>
                        <FERoundedChip
                          label={
                            proposalArray[1].proposer === "Dosen"
                              ? `Dosen (${proposalArray[1].proposerName})`
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
                </>
              ) : (
                <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                  Tidak Mengajukan Judul
                </Text>
              )}
            </Stack>
          </Stack>
        </Stack>
        <FELinkMore
          // color={theme.colors["secondary-text"][5]}
          color={theme.colors["primary"][7]}
          onClick={onClick}
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
export default FEApprovalDetailsCard;
