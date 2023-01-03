import React, { useState } from "react";
import FEApprovalDetailsCard, {
  IProposal
} from "src/components/fe-components/FEApprovalDetailsCard";
import FEFacultyAdminProposalApplicationModal from "./FEFacultyAdminProposalApplicationModal";
import { IFEProposalApplicationModalForm } from "./FEFacultyAdminProposalApplicationModalFormInterfaces";

export interface IFEFacultyAdminProposalApplicationCard {
  index: number;
  name: string;
  nim: string;
  proposalArray: Array<IProposal>;
  onSubmit: (
    index: number,
    acceptedProposal: number | string,
    approvalResult: string,
    refusalReason: null | string
  ) => void;
}

const FEFacultyAdminProposalApplicationCard: React.FC<
  IFEFacultyAdminProposalApplicationCard
> = ({ index, name, nim, proposalArray, onSubmit }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <>
      <FEFacultyAdminProposalApplicationModal
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
export default FEFacultyAdminProposalApplicationCard;
