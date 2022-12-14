import { Stack } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton
} from "src/components/fe-components/LFPHeader.component";
import FEInputModal from "src/components/FEInputModal";
import useArray from "src/hooks/fe-hooks/useArray";
import useMap from "src/hooks/fe-hooks/useMap";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import { IFELabFreeCardComp } from "./FELabFreeCardComp";
import FELabFreeForm, { laboratoyObject } from "./FELabFreeForm";
import {
  feLabFreeFormSchema,
  IFELabFreeFormValues
} from "./FELabFreeInterfaces";
import FELabFreeMain from "./FELabFreeMain";

interface IFELabFreeProps {}

const lastApplicationDone = 3;

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
  const dummyLab = new Map<string | number, IFELabFreeCardComp>([
    [
      0,
      {
        title: "Permohonan #1",
        index: 0,
        lab: "Laboratorium Fisika",
        status: "process",
        tanggalPermohonan: new Date()
          .toLocaleDateString("id", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
          .replaceAll(".", ":"),
        handleDeleteLab: handleDeleteLabFreeApplication,
        handleUpdateLab: handleEditLabFreeApplication,
      },
    ],
    [
      1,
      {
        title: "Permohonan #2",
        index: 1,
        lab: "Laboratorium Bio Farmaka",
        status: "rejected",
        tanggalPermohonan: new Date()
          .toLocaleDateString("id", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
          .replaceAll(".", ":"),
        handleDeleteLab: handleDeleteLabFreeApplication,
        handleUpdateLab: handleEditLabFreeApplication,
      },
    ],
    [
      2,
      {
        title: "Permohonan #3",
        index: 2,
        lab: "Laboratorium Matematika",
        status: "accepted",
        tanggalPermohonan: new Date()
          .toLocaleDateString("id", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
          .replaceAll(".", ":"),
        handleDeleteLab: handleDeleteLabFreeApplication,
        handleUpdateLab: handleEditLabFreeApplication,
      },
    ],
  ]);

  

  const [isOpen, setIsOpen] = useState(false);
  const [isDataExist, setIsDataExist] = useState(true);
  const [applicationDone, setapplicationDone] = useState(lastApplicationDone);
  const [map, actions] = useMap(dummyLab);
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

  function handleDeleteLabFreeApplication(index: number, lab: string) {
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
        .toLocaleDateString("id", {
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

  if (map.size===possibleLabValue.length){
    buttons[0].disabled= true
  }

  useEffect(() => {
    let prevLabValue: string[] = [];

    map.forEach((value, key) => {
      prevLabValue.push(value.lab);
    });

    for (let i = 0; i < possibleLabValue.length; i++) {
      if (prevLabValue.includes(possibleLabValue[i].labValue)) {
        possibleLabValue[i].show = false;
      }
    }

    if (prevLabValue.length===possibleLabValue.length){
      buttons[0].disabled= true
    }
  }, []);

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
