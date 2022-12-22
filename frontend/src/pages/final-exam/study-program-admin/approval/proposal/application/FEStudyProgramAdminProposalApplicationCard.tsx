import React, { useState } from "react";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEApprovalDetailsCard, {
  IProposal,
} from "src/components/fe-components/FEApprovalDetailsCard";
import FEInputModal from "src/components/FEInputModal";
import FEStudyProgramAdminProposalApplicationModal from "./FEStudyProgramAdminProposalApplicationModal";
import { IFEProposalApplicationModalForm } from "./FEStudyProgramAdminProposalApplicationModalFormInterfaces";

export interface IFEStudyProgramAdminProposalApplicationCard {
  index: number;
  name: string;
  nim: string;
  proposalArray: Array<IProposal>;
  onSubmit: (
    index: number,
    acceptedProposal: IFEProposalApplicationModalForm,
    approvalResult: string
  ) => void;
}

const FEStudyProgramAdminProposalApplicationCard: React.FC<
  IFEStudyProgramAdminProposalApplicationCard
> = ({ index, name, nim, proposalArray, onSubmit }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <>
      <FEStudyProgramAdminProposalApplicationModal
        index={index}
        opened={isModalOpened}
        setOpened={setIsModalOpened}
        name={name}
        nim={nim}
        onSubmit={onSubmit}
        proposalArray={proposalArray}
      />

      <FEApprovalDetailsCard
        name={name}
        nim={nim}
        proposalArray={proposalArray}
        onClick={() => {
          setIsModalOpened(true);
        }}
      />
    </>
  );
};
export default FEStudyProgramAdminProposalApplicationCard;
