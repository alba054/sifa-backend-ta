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
import useMap, { MapOrEntries } from "src/hooks/fe-hooks/useMap";
import FELabFreeCardComp, { IFELabFreeCardComp } from "./FELabFreeCardComp";
import useUpdateEffect from "src/hooks/fe-hooks/useUpdateEffect";

interface IFELabFreeProps {}

const FELabFree: React.FC<IFELabFreeProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDataExist, setIsDataExist] = useState(true);
  const [applicationDone, setapplicationDone] = useState(0);

  function handleAddApplicationClick() {
    setIsOpen(true);
    setapplicationDone(() => {
      return applicationDone + 1;
    });
  }

  // const dummyLab: {} = [
  //   {
  //     title: "Permohonan #1",
  //     index: 1,
  //     lab: "Laboratorium Farmaka",
  //     status: "process",
  //     tanggalPermohonan: new Date()
  //       .toLocaleTimeString("id", {
  //         day: "2-digit",
  //         month: "long",
  //         year: "numeric",
  //       })
  //       .replaceAll(".", ":"),
  //     handleDeleteLab: handleDeleteLabFreeApplication,
  //   },
  //   {
  //     title: "Permohonan #2",
  //     index: 2,
  //     lab: "Laboratorium Fisika",
  //     status: "rejected",
  //     tanggalPermohonan: new Date()
  //       .toLocaleTimeString("id", {
  //         day: "2-digit",
  //         month: "long",
  //         year: "numeric",
  //       })
  //       .replaceAll(".", ":"),
  //     handleDeleteLab: handleDeleteLabFreeApplication,
  //   },
  //   {
  //     title: "Permohonan #3",
  //     index: 3,
  //     lab: "Laboratorium Farmaka",
  //     status: "accepted",
  //     tanggalPermohonan: new Date()
  //       .toLocaleTimeString("id", {
  //         day: "2-digit",
  //         month: "long",
  //         year: "numeric",
  //       })
  //       .replaceAll(".", ":"),
  //     handleDeleteLab: handleDeleteLabFreeApplication,
  //   },
  // ];

  const [map, actions] = useMap(new Map());

  function handleDeleteLabFreeApplication(index: number) {
    actions.remove(index);
  }

  function getMap() {
    return map;
  }

  function handleEditLabFreeApplication(
    index: number | string,
    title: string,
    newLab: any,
    status: "process" | "rejected" | "accepted",
    tanggalPermohonan: string
  ) {
    const editLabFreeCard: IFELabFreeCardComp = {
      title: title,
      index: index,
      lab: newLab,
      status: status,
      tanggalPermohonan: tanggalPermohonan,
      handleDeleteLab: handleDeleteLabFreeApplication,
      handleUpdateLab: handleEditLabFreeApplication
    };

    // console.log(getMap());
    // console.log(getMap().get(index));
    // actions.remove(index)
    actions.set(index, editLabFreeCard);
    }

  const { onSubmit, ...form } = useForm<IFELabFreeFormValues>({
    validate: yupResolver(feLabFreeFormSchema),
  });

  function handleSubmit(values: IFELabFreeFormValues) {
    const now = Date.now();
    console.log(handleEditLabFreeApplication);

    const newLabFreeCard: IFELabFreeCardComp = {
      title: `Permohonan #${applicationDone}`,
      index: now,
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
      handleUpdateLab:
        handleEditLabFreeApplication
    };

    actions.set(now, newLabFreeCard);

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
          <FELabFreeMain labFreeCardMap={map} />
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

export default FELabFree;
