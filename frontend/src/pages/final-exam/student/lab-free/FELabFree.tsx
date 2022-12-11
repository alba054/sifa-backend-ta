import { Grid, Stack } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useMemo, useState } from "react";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import FEInputModal from "src/components/FEInputModal";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import FELabFreeMain from "./FELabFreeMain";
import FELabFreeForm from "./FELabFreeForm";
import {
  feLabFreeFormSchema,
  IFELabFreeFormValues,
} from "./FELabFreeInterfaces";
import useArray from "src/hooks/fe-hooks/useArray";
import useMap, {MapOrEntries} from "src/hooks/fe-hooks/useMap";
import FELabFreeCardComp, { IFELabFreeCardComp } from "./FELabFreeCardComp";
import useUpdateEffect from "src/hooks/fe-hooks/useUpdateEffect";

interface IFEProposalPageProps {}

const FEProposalPage: React.FC<IFEProposalPageProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDataExist, setIsDataExist] = useState(true);

  function handleAddApplicationClick() {
    setIsOpen(true);
  }

  const dummyLab: Array<IFELabFreeCardComp> = [
    {
      title: "Permohonan #1",
      lab: "Laboratorium Farmaka",
      status: "process",
      tanggalPermohonan: new Date()
        .toLocaleTimeString("id", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
        .replaceAll(".", ":"),
      handleDeleteLab: handleDeleteLabFreeApplication,
    },
    {
      title: "Permohonan #2",
      lab: "Laboratorium Fisika",
      status: "rejected",
      tanggalPermohonan: new Date()
        .toLocaleTimeString("id", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
        .replaceAll(".", ":"),
      handleDeleteLab: handleDeleteLabFreeApplication,
    },
    {
      title: "Permohonan #3",
      lab: "Laboratorium Farmaka",
      status: "accepted",
      tanggalPermohonan: new Date()
        .toLocaleTimeString("id", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
        .replaceAll(".", ":"),
      handleDeleteLab: handleDeleteLabFreeApplication,
    },
  ];

  const [map, actions] = useMap(new Map());

  // ============= Wrong way?

  function handleDeleteLabFreeApplication(index: number) {
    actions.remove(index);
    // console.log(array)
    // for (let i = 0; i < array.length; i++) {
    //   console.log(index);
    //   console.log(array[i].props.index);
    //   console.log(index == array[i].props.index);

    //   if (index === array[i].props.index) {
    //     console.log(i);
    //     remove(i);
    //     break;
    //   }
    // }
  }

  const { onSubmit, ...form } = useForm<IFELabFreeFormValues>({
    validate: yupResolver(feLabFreeFormSchema),
  });

  function handleSubmit(values: IFELabFreeFormValues) {
    const newLabFreeCard: IFELabFreeCardComp = {
      title: `Permohonan #${map.size + 1}`,
      lab: values.laboratory,
      status: "process",
      tanggalPermohonan: new Date()
        .toLocaleTimeString("id", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
        .replaceAll(".", ":"),
      handleDeleteLab: handleDeleteLabFreeApplication,
    };

    actions.set(Date.now(), newLabFreeCard);

    setIsOpen(false);
  }

  useEffect(() => {
    if (map.size == 0) {
      setIsDataExist(false);
    } else {
      setIsDataExist(true);
    }
  }, [map]);

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Buat Permohonan Baru",
      type: "modal",
      onClick: handleAddApplicationClick,
    },
  ];

  return (
    <FEStudentMainlayout>
      {/* Input modal */}
      <FEInputModal
        opened={isOpen}
        title="Pilih Laboratorium"
        setOpened={setIsOpen}
        onSubmit={onSubmit(handleSubmit) as any}
        children={<FELabFreeForm form={form} />}
      />

      <Stack spacing={"xl"}>
        {/* Bebas lab, tugas akhir Header */}
        <LFPHeaderComponent title="Bebas Lab" buttons={buttons} />
        {isDataExist ? (
          <FELabFreeMain labFreeCardArr={map} />
        ) : (
          <LFPEmptyDataComponent
            title="Belum Ada Permohonan"
            caption={
              "Untuk membuat permohonan bebas lab, tekan tombol “Buat Permohonan Baru” di pojok kanan atas."
            }
          />
        )}
      </Stack>
    </FEStudentMainlayout>
  );
};
export default FEProposalPage;
