import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FEFileMultipleOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEDocumentListShowCase from "src/components/fe-components/FEDocumentListShowCase";

export interface IFEFacultyAdminProposalApplicationDetailsCard {
  setStatus: React.Dispatch<any>;
  // File Di sini?
}

const FEFacultyAdminProposalApplicationDetailsCard: React.FC<
  IFEFacultyAdminProposalApplicationDetailsCard
> = ({setStatus}) => {
  const navigate = useNavigate();
  const [isOpenAcceptAlertModal, setIsOpenAcceptAlertModal] = useState(false);
  const [isOpenRefuseAlertModal, setIsOpenRefuseAlertModal] = useState(false);
  const theme = useMantineTheme();

  function handleRefuseApproval() {
    setStatus("Ditolak")
    setIsOpenRefuseAlertModal(false);
  }

  function handleAcceptApproval() {
    setIsOpenAcceptAlertModal(false);
    setStatus("Diterima")
  }

  return (
    <>
      
    </>
  );
};
export default FEFacultyAdminProposalApplicationDetailsCard;
