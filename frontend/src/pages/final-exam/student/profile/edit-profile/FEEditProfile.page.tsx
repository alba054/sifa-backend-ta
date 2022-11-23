import { Button, Group, Image, Stack, Text, Title } from "@mantine/core";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";
import { Link } from "react-router-dom";
import DateInput from "src/components/DateInput";
import DocumentInput from "src/components/DocumentInput";
import FEProfileCard from "src/components/FEProfileCard";
import { SelectInput, TextInput } from "src/components/FormInput";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import {
  getFileUrl,
  getGenderOptions,
} from "src/utils/functions/common.function";
import * as yup from "yup";

interface IFEEditProfilePageProps {}

interface IFEEditProfileFormValues {
  profilePicture?: File;
  name: string;
  nim: string;
  gender: string;
  address: string;
  birthPlace: string;
  birthDate: string;
  phoneNumber: string;
  lecturer: string;
}

const SIZE = "md";

export const feEditProfileFormSchema = yup.object({
  name: yup.string().required("Input nama terlebih dahulu"),
  nim: yup.string().required("Input NIM terlebih dahulu"),
  gender: yup.string().required("Pilih jenis kelamin terlebih dahulu"),
  address: yup.string().required("Input alamat terlebih dahulu"),
  birthPlace: yup.string().required("Input tempat lahir terlebih dahulu"),
  birthDate: yup.date().required("Input tanggal lahir terlebih dahulu"),
  phoneNumber: yup.string().required("Input nomor telephone terlebih dahulu"),
  lecturer: yup.string().required("Pilih penasihat akademik terlebih dahulu"),
});

const FEEditProfilePage: React.FC<IFEEditProfilePageProps> = ({}) => {
  const { getInputProps, values, onSubmit, errors } =
    useForm<IFEEditProfileFormValues>({
      validate: yupResolver(feEditProfileFormSchema),
    });
  const selectedImageUrl = getFileUrl(values.profilePicture);

  function handleSubmit(values: IFEEditProfileFormValues) {
    console.log(values);
  }

  return (
    <FEStudentMainlayout>
      <Title order={2} mb={"md"}>
        Edit Profil
      </Title>
      <FEProfileCard cardTitle="Edit Profil">
        <form onSubmit={onSubmit(handleSubmit)}>
          <Group mb={"md"}>
            <div className={`relative rounded-full overflow-hidden mr-6`}>
              <Image
                src={selectedImageUrl}
                width={86}
                height={86}
                alt="Foto Profil"
              />
            </div>
            <Stack>
              <DocumentInput
                color={"primary"}
                withDelete
                maxSize={516000}
                accept={IMAGE_MIME_TYPE}
                {...getInputProps("profilePicture")}
                buttonLabel="Upload Foto Profil"
                description="*Ukuran gambar harus memiliki rasio 2:3, maksimal 500kb, dan
                    berekstensi .png/.jpg/.jpeg"
              />
            </Stack>
          </Group>
          <div className={`grid grid-cols-2 gap-x-5 mb-4`}>
            <TextInput
              size={SIZE}
              label="Nama"
              {...getInputProps("name")}
              required
              error={errors["name" as keyof IFEEditProfileFormValues]}
            />
            <TextInput
              required
              size={SIZE}
              label="NIM"
              error={errors["nim" as keyof IFEEditProfileFormValues]}
              {...getInputProps("nim")}
            />
            <Text className="col-span-2 text-secondary-text-500 " mt={6}>
              *Note: Nama dan NIM tidak dapat diubah. Silahkan <Link to={'#'}  className="text-[#3B82F6] font-semibold"> hubungi Admin </Link> jika terdapat kesalahan penulisan.
            </Text>
          </div>
          <div className={`grid grid-cols-3 gap-x-5 mb-4`}>
            <SelectInput
              size={SIZE}
              label="Jenis Kelamin"
              data={getGenderOptions()}
              required
              {...getInputProps("gender")}
              error={errors["gender" as keyof IFEEditProfileFormValues]}
            />
            <TextInput
              size={SIZE}
              label="Alamat"
              required
              className={`col-span-2`}
              error={errors["address" as keyof IFEEditProfileFormValues]}
              {...getInputProps("address")}
            />
          </div>
          <div className={`grid grid-cols-3 gap-x-5 mb-4`}>
            <TextInput
              required
              size={SIZE}
              label="Tempat Lahir"
              error={errors["birthPlace" as keyof IFEEditProfileFormValues]}
              {...getInputProps("birthPlace")}
            />
            <DateInput
              required
              size={SIZE}
              label="Tanggal Lahir"
              locale="id"
              error={errors["birthDate" as keyof IFEEditProfileFormValues]}
              {...getInputProps("birthDate")}
            />
            <TextInput
              required
              size={SIZE}
              label="No. Telephone"
              error={errors["phoneNumber" as keyof IFEEditProfileFormValues]}
              {...getInputProps("phoneNumber")}
            />
          </div>
          <SelectInput
            required
            data={getGenderOptions()}
            size={SIZE}
            label="Penasehat Akademik"
            error={errors["lecturer" as keyof IFEEditProfileFormValues]}
            {...getInputProps("lecturer")}
          />
          <Group position="right" mt="md" mb={0}>
            <Button variant="light">Batal</Button>
            <Button type="submit">Simpan Perubahan</Button>
          </Group>
        </form>
      </FEProfileCard>
    </FEStudentMainlayout>
  );
};
export default FEEditProfilePage;
