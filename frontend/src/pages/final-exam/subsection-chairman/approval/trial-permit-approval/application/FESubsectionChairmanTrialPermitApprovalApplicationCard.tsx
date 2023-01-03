import { Group, Stack, Text } from "@mantine/core";
import React from "react";
import { FESearchBookOutline } from "src/assets/Icons/Fluent";
import FELinkMore from "src/components/fe-components/FELinkMore";
import { approvalChip2 } from "src/components/fe-components/FERoundedChip";
import { IGFEExaminers, IGFEMentors } from "src/utils/const/interfaces";
import { FEStatus } from "src/utils/const/type";

export interface IFESubsectionChairmanTrialPermitApprovalApplicationCard {
  name: string;
  nim: string;
  proposalTitle: string;
  mentors: IGFEMentors;
  examiners: IGFEExaminers;
  index?: any;
  status: FEStatus;
  applicationDate: string;
}

const FESubsectionChairmanTrialPermitApprovalApplicationCard: React.FC<
  IFESubsectionChairmanTrialPermitApprovalApplicationCard
> = ({
  index,
  status,
  name,
  nim,
  applicationDate,
  mentors,
  examiners,
  proposalTitle,
}) => {
  return (
    <Group className="flex py-6 px-7 border border-[#DFDFDF] relative justify-between rounded-xl gap-x-10 drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md bg-white">
      <Stack spacing={"sm"} className="z-10">
        <Stack className="gap-2">
          {approvalChip2[status]}
          <Text className="text-sm text-secondary-text-500 ">
            Tanggal di keluarkan Surat Permohonan: {applicationDate}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="font-semibold text-2xl text-primary-text-500 inline-block">
            {name} ({nim})
          </Text>
          <Text className="font-semibold text-lg text-primary-500 truncate grid grid-cols-5">
            {proposalTitle}
          </Text>
        </Stack>
        <FELinkMore to={nim} />
      </Stack>
      <FESearchBookOutline
        size={120}
        color={"#F1F1F3"}
        className="absolute right-2"
      />
    </Group>
  );
};
export default FESubsectionChairmanTrialPermitApprovalApplicationCard;
