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
import FELabFreeForm, { laboratoyObject } from "./FELabFreeForm";
import {
  feLabFreeFormSchema,
  IFELabFreeFormValues,
} from "./FELabFreeInterfaces";
import useArray from "src/hooks/fe-hooks/useArray";
import useMap, { MapOrEntries } from "src/hooks/fe-hooks/useMap";
import FELabFreeCardComp, { IFELabFreeCardComp } from "./FELabFreeCardComp";
import useUpdateEffect from "src/hooks/fe-hooks/useUpdateEffect";

interface IFELabFreeProps {}

const labValue: Array<laboratoyObject> = [
  {
    id: 0,
    labLabel: "Laboratorium Fisika",
    labValue: "Laboratorium Fisika",
    show: true,
  },
  {
    id: 1,
    labLabel: "Laboratorium Bio Farmaka",
    labValue: "Laboratorium Bio Farmaka",
    show: true,
  },
  {
    id: 2,
    labLabel: "Laboratorium Matematika",
    labValue: "Laboratorium Matematika",
    show: true,
  },
];

const FELabFree: React.FC<IFELabFreeProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDataExist, setIsDataExist] = useState(true);
  const [applicationDone, setapplicationDone] = useState(0);
  const [map, actions] = useMap(new Map());
  const {
    array: possibleLabValue,
    set: setArray,
    push,
    remove,
    clear,
  } = useArray(JSON.parse(JSON.stringify(labValue))); // <-- Wrong way?
  
  function handleAddApplicationClick() {
    setIsOpen(true);
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

  function handleDeleteLabFreeApplication(index: number, lab:string) {
    for (let i = 0; i < possibleLabValue.length; i++) {
      if (possibleLabValue[i].labValue == lab) {
        possibleLabValue[i].show = true;
      }
    }

    actions.remove(index);
    
  }

  function handleEditLabFreeApplication(
    index: number | string,
    title: string,
    oldLab: string,
    newLab: string,
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
      handleUpdateLab: handleEditLabFreeApplication,
    };

    actions.set(index, editLabFreeCard);

    for (let i = 0; i < possibleLabValue.length; i++) {
      if (possibleLabValue[i].labValue == oldLab) {
        possibleLabValue[i].show = true;
      } else if (possibleLabValue[i].labValue == newLab) {
        possibleLabValue[i].show = false;
      }
    }
  }

  const { onSubmit, ...form } = useForm<IFELabFreeFormValues>({
    validate: yupResolver(feLabFreeFormSchema),
  });

  function handleSubmit(values: IFELabFreeFormValues) {
    setapplicationDone(() => {
      return applicationDone + 1;
    });

    const now = Date.now();

    const newLabFreeCard: IFELabFreeCardComp = {
      title: `Permohonan #${applicationDone + 1}`,
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
      handleUpdateLab: handleEditLabFreeApplication,
    };

    actions.set(now, newLabFreeCard);

    for (let i = 0; i < possibleLabValue.length; i++) {
      if (possibleLabValue[i].labValue == values.laboratory) {
        possibleLabValue[i].show = false;
        break;
      }
    }

    setIsOpen(false);
  }

  useEffect(() => {
    if (map.size == 0) {
      setIsDataExist(false);
    } else {
      setIsDataExist(true);
    }
  }, [map]);

  // console.log(possibleLabValue)

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Buat Permohonan Baru",
      type: "modal",
      onClick: handleAddApplicationClick,
      disabled: ((): boolean => {
        let possibleValueLeft: boolean = true;

        for (let i = 0; i < possibleLabValue.length; i++) {
          if (possibleLabValue[i].show === true) {
            possibleValueLeft = false;
            break;
          }
        }

        return possibleValueLeft;
      })(),
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
        children={<FELabFreeForm form={form} data={possibleLabValue} />}
      />

      <Stack spacing={"xl"}>
        {/* Bebas lab, tugas akhir Header */}
        <LFPHeaderComponent title="Bebas Lab" buttons={buttons} />
        {isDataExist ? (
          <FELabFreeMain labFreeCardMap={map} possibleLab={possibleLabValue} />
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
