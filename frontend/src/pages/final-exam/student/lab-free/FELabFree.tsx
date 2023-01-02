import { Stack } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import FEInputModal from "src/components/FEInputModal";
import { useLaboratoryData } from "src/contexts/laboratory-data.context";
import useArray from "src/hooks/fe-hooks/useArray";
import useMap from "src/hooks/fe-hooks/useMap";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEStatus } from "src/utils/const/type";
import { IFELabFreeCardComp } from "./FELabFreeCardComp";
import FELabFreeForm, { laboratoyObject } from "./FELabFreeForm";
import {
  feLabFreeFormSchema,
  IFELabFreeFormValues,
} from "./FELabFreeInterfaces";
import FELabFreeMain from "./FELabFreeMain";
import { useMutation, useQuery } from "react-query";
import { QF_LAB_FREE_KEY } from "src/query-functions/const.query-function";
import { qfGetLaboratories } from "src/query-functions/laboratory.query-function";
import {
  IQFPostStudentReqLabs,
  IQFPostStudentThesis,
  qfDeleteStudentReqLabs,
  qfGetStudentReqLabs,
  qfPostStudentReqLabs,
} from "src/query-functions/student.query-function";
import { getLoggedInUserNim } from "src/utils/functions/cookies.function";

interface IFELabFreeProps {}

const lastApplicationDone = 3;

const FELabFree: React.FC<IFELabFreeProps> = ({}) => {
  const { data, isLoading: isFetchingData } = useLaboratoryData();
  const { mutate, isLoading: isPostingLab } = useMutation(
    QF_LAB_FREE_KEY,
    qfPostStudentReqLabs,
    {
      onSuccess: handleSuccessLabMutation,
    }
  );
  const { mutate: deleteLab, isLoading: isDeletingLab } = useMutation(
    QF_LAB_FREE_KEY,
    qfDeleteStudentReqLabs,
    {
      onSuccess: handleSuccessLabMutation,
    }
  );
  const {
    data: labFreeData,
    refetch,
    isFetched,
  } = useQuery(QF_LAB_FREE_KEY, qfGetStudentReqLabs);

  const labsFree = labFreeData?.data?.map((lf: any, idx: number) => {
    const labComp: IFELabFreeCardComp = {
      index: idx,
      title: `Permohonan #${idx + 1}`,
      lab: lf.ref_laboratorium.labNama,
      labId: lf.ref_laboratorium.labId,
      status: lf.ref_permohonan,
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

    return [idx, labComp];
  });
  const [map, actions] = useMap(labsFree);

  useEffect(() => {
    if (isFetched) {
      refetch();
      actions.setAll(labsFree);
    }
  }, [isFetched, labFreeData?.data?.length]);

  const [isOpen, setIsOpen] = useState(false);
  const [isDataExist, setIsDataExist] = useState(true);
  const [applicationDone, setapplicationDone] = useState(lastApplicationDone);
  const { array: possibleLabValue } = useArray(data?.data || []); // <-- Wrong way?

  function handleAddApplicationClick() {
    setIsOpen(true);
  }

  async function handleSuccessLabMutation() {
    await refetch();

    setIsOpen(false);
  }

  function handleDeleteLabFreeApplication(index: number, lab: string) {
    // for (let i = 0; i < possibleLabValue.length; i++) {
    //   if (possibleLabValue[i].labValue == lab) {
    //     possibleLabValue[i].show = true;
    //   }
    // }

    // actions.remove(index);

    deleteLab(lab);
  }

  function handleEditLabFreeApplication(
    index: number | string,
    title: string,
    oldLab: string,
    newLab: string,
    status: FEStatus,
    tanggalPermohonan: string
  ) {
    const editLabFreeCard: IFELabFreeCardComp = {
      title: title,
      index: index,
      lab: newLab,
      labId: newLab,
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
    const postBody: IQFPostStudentReqLabs = {
      labID: values.laboratory,
      studentNIM: getLoggedInUserNim(),
    };
    mutate(postBody);
  }

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Buat Permohonan Baru",
      type: "modal",
      onClick: handleAddApplicationClick,
      disabled: false,
      // disabled: ((): boolean => {
      //   let possibleValueLeft: boolean = true;

      //   for (let i = 0; i < possibleLabValue.length; i++) {
      //     if (possibleLabValue[i].show === true) {
      //       possibleValueLeft = false;
      //       break;
      //     }
      //   }

      //   return possibleValueLeft;
      // })(),
    },
  ];

  // if (map.size === possibleLabValue.length) {
  //   buttons[0].disabled = true;
  // }

  // useEffect(() => {
  //   let prevLabValue: string[] = [];

  //   map.forEach((value, key) => {
  //     prevLabValue.push(value.lab);
  //   });

  //   for (let i = 0; i < possibleLabValue.length; i++) {
  //     if (prevLabValue.includes(possibleLabValue[i].labValue)) {
  //       possibleLabValue[i].show = false;
  //     }
  //   }

  //   if (prevLabValue.length === possibleLabValue.length) {
  //     buttons[0].disabled = true;
  //   }
  // }, []);

  const selectedLabIds = labFreeData?.data?.map((lf: any) => {
    return lf?.ref_laboratorium?.labId + "";
  });

  return (
    <FEMainlayout>
      {/* Input modal */}
      <FEInputModal
        opened={isOpen}
        title="Pilih Laboratorium"
        setOpened={setIsOpen}
        onSubmit={onSubmit(handleSubmit) as any}
        children={
          <FELabFreeForm
            selectedLabIds={selectedLabIds}
            form={form}
            data={possibleLabValue}
          />
        }
      />

      <Stack spacing={"xl"}>
        {/* Bebas lab, tugas akhir Header */}
        <LFPHeaderComponent
          title="Bebas Lab"
          buttons={buttons}
          disabledButtonTooltipLabel={
            "Hapus permohonan bebas lab yang lama untuk membuat permohonan yang baru"
          }
        />
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
    </FEMainlayout>
  );
};

export default FELabFree;
