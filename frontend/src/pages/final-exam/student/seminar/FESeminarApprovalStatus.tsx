import { Stack, Text } from "@mantine/core";
import React from "react";
import { ProgressClockOutlined } from "src/assets/Icons/Fluent";
import FERoundedChip, {
  statusChip,
} from "src/components/fe-components/FERoundedChip";
import FETableHeader from "src/components/fe-components/table/FETableHeader1";
import FETableRow2 from "src/components/fe-components/table/FETableRow2";

export interface IFESeminarApprovalStatus {
  mainMentor: string;
  sideMentor: string;
  mainMentorApproval: "process" | "rejected" | "accepted";
  sideMentorApproval: "process" | "rejected" | "accepted";
}

const FESeminarApprovalStatus: React.FC<IFESeminarApprovalStatus> = ({mainMentor, sideMentor, mainMentorApproval, sideMentorApproval}) => {
  return (
    <FETableHeader title={"Status Persetujuan Pembimbing"}>
      <FETableRow2 subject="Pembimbing Utama" value={mainMentor} withBottomBorder={true} additionalChildren={<div className="absolute top-3 right-8">{statusChip[`${mainMentorApproval}`]}</div>}/>
      <FETableRow2 subject="Pembimbing Pendamping" value={sideMentor} withBottomBorder={false} additionalChildren={<div className="absolute top-3 right-8">{statusChip[`${mainMentorApproval}`]}</div>}/>
    </FETableHeader>
  );
};
export default FESeminarApprovalStatus;
