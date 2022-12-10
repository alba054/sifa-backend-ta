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
import FELabFreeCardComp from "./FELabFreeCardComp";
import useUpdateEffect from "src/hooks/fe-hooks/useUpdateEffect";

interface IFEProposalPageProps {}

const FEProposalPage: React.FC<IFEProposalPageProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { array, set, push, remove, filter, update, clear } = useArray([]);
  const [applicationDone, setApplicationDone] = useState(0);

  const [isDataExist, setIsDataExist] = useState(true);

  function handleAddApplicationClick() {
    setIsOpen(true);
  }

  // ============= Wrong way?

  function handleDeleteLabFreeApplication(index: number) {
    remove(index)
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
    push(
      <FELabFreeCardComp
        key={array.length}
        index={array.length}
        title={`Permohonan #${applicationDone + 1}`}
        lab={values.laboratory}
        status="process"
        tanggalPermohonan={new Date()
          .toLocaleTimeString("id", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
          .replaceAll(".", ":")}
        handleDeleteLab={(e) => {
          handleDeleteLabFreeApplication(e);
        }}
      />
    );

    setIsOpen(false);
  }

  // Biar dihapus bertambahki
  useUpdateEffect(() => {
    return () => {
      setApplicationDone((e) => e + 1);
    };
  }, [array]);

  useEffect(() => {
    if (array.length == 0) {
      setIsDataExist(false);
    } else {
      setIsDataExist(true);
    }
  }, [array]);

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
          <FELabFreeMain labFreeCardArr={array} />
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
