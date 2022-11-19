import { Stack } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import React, { useState } from 'react';
import LFPEmptyDataComponent from 'src/components/fe-components/LFPEmptyData.component';
import LFPHeaderComponent from 'src/components/fe-components/LFPHeader.component';
import FEInputModal from 'src/components/FEInputModal2';
import FEStudentMainlayout from 'src/layouts/final-exam/student/FEStudentMainlayout';
import FESeminarForm from './FESeminarForm';
import { feSeminarFormSchema, IFESeminarFormValues } from './FESeminarInterfaces';
import FESeminarMain from './FESeminarMain';

export interface IFESeminar {}

const FESeminar: React.FC<IFESeminar> = ({ }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDataExist, setIsDataExist] = useState(true);

  function handleAddSeminarClick() {
    setIsOpen(true);
  }

  const { onSubmit, ...form } = useForm<IFESeminarFormValues>({
    validate: yupResolver(feSeminarFormSchema),
  });

  function handleSubmit(values: IFESeminarFormValues) {
    console.log(values);
  }

  return (
    <FEStudentMainlayout>
      <FEInputModal
        opened={isOpen}
        title="Pilih Jenis Seminar"
        setOpened={setIsOpen}
        onSubmit={onSubmit(handleSubmit) as any}
        children={<FESeminarForm form={form} />}
      />

      <Stack spacing={"xl"}>
        <LFPHeaderComponent
          title="Seminar"
          onClick={handleAddSeminarClick}
          addButtonLabel={"Buat Permohonan"}
        />
        {isDataExist ? (
          <FESeminarMain />
        ) : (
          <LFPEmptyDataComponent
            title="Belum Ada Permohonan Terbaru"
            caption={
              "Untuk mengajukan permohonan seminar/ujian sidang, tekan tombol “Buat Permohonan” di pojok kanan atas."
            }
          />
        )}
      </Stack>
    </FEStudentMainlayout>
  );
};
export default FESeminar;