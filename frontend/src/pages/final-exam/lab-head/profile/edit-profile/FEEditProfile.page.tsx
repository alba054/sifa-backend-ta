import { Button, Group, Image, Stack, Text, Title } from "@mantine/core";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm, yupResolver } from "@mantine/form";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DateInput from "src/components/DateInput";
import DocumentInput from "src/components/DocumentInput";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEFileUpload from "src/components/fe-components/FEFileUpload";
import FESmallInformationNotificationList from "src/components/fe-components/FESmallInformationNotificationList";
import FEProfileCard from "src/components/FEProfileCard";
import { SelectInput, TextInput } from "src/components/FormInput";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
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
  email: string;
  sign?: File | string | any;
}

const SIZE = "md";

export const feEditProfileFormSchema = yup.object({
  name: yup.string().required("Input nama terlebih dahulu"),
  nim: yup.string().required("Input NIM terlebih dahulu"),
  email: yup.string().required("Input email terlebih dahulu"),
});

const FEEditProfilePageLabHead: React.FC<
  IFEEditProfilePageProps
> = ({}) => {
  const { getInputProps, values, onSubmit, errors } =
    useForm<IFEEditProfileFormValues>({
      validate: yupResolver(feEditProfileFormSchema),
    });
  const selectedImageUrl = getFileUrl(values.profilePicture);
// 
  function handleSubmit(values: IFEEditProfileFormValues) {
    setIsEditAlertModalOpened(true);
  }
  
  const [isEditAlertModalOpened, setIsEditAlertModalOpened] = useState(false);
  const navigate = useNavigate()

  function handleConfirmSubmit() {
    console.log(values);
    setIsEditAlertModalOpened(false);
    navigate(-1)
  }

  const breadCrumbs: Array<IFEBreadCrumbsItem> = [
    {
      title: "Pengaturan Akun",
      href: FEROUTES.LAB_HEAD_PROFILE,
    },
  ];

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Edit Profil"
    >
      <FEAlertModal
        title="Simpan Perubahan?"
        description="Tekan tombol OK untuk menyimpan perubahan."
        yesButtonLabel="OK"
        opened={isEditAlertModalOpened}
        setOpened={setIsEditAlertModalOpened}
        onSubmit={handleConfirmSubmit}
      />
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
              label="NIP"
              error={errors["nim" as keyof IFEEditProfileFormValues]}
              {...getInputProps("nim")}
            />
            <Text className="col-span-2 text-secondary-text-500 " mt={6}>
              *Note: Nama dan NIM tidak dapat diubah. Silahkan{" "}
              <Link to={"#"} className="text-[#3B82F6] font-semibold">
                {" "}
                hubungi Admin{" "}
              </Link>{" "}
              jika terdapat kesalahan penulisan.
            </Text>
          </div>

          <TextInput
            size={SIZE}
            label="Email"
            required
            className={`col-span-2`}
            error={errors["email" as keyof IFEEditProfileFormValues]}
            {...getInputProps("email")}
          />

          <Stack className="gap-2" mt={"md"}>
            <Text className="text-secondary-text-500 font-semibold">
              Tanda Tangan
            </Text>
            <DocumentInput
              color={"primary"}
              withDelete
              maxSize={516000}
              accept={IMAGE_MIME_TYPE}
              {...getInputProps("sign")}
              placeholder="Seret dan tempatkan file tanda tangan ke sini, atau klik untuk memilih file."
              description="*Ekstensi file PNG, ukuran file maksimal 2 MB."
            />
          </Stack>
          <FESmallInformationNotificationList
            infoList={[
              "Nama dan NIP tidak dapat diubah. Jika terdapat kesalahan harap hubungi Admin",
              "Email diperlukan untuk mereset password melalui fitur Lupa Password",
              "File tanda tangan yang diupload sebaiknya berlatar Transparan",
            ]}
          />
          <Group position="right" mt="lg" mb={0}>
            <Button variant="light" className="font-semibold hover:bg-white">
              Batal
            </Button>
            <Button type="submit">Simpan Perubahan</Button>
          </Group>
        </form>
      </FEProfileCard>
    </FEMainlayout>
  );
};
export default FEEditProfilePageLabHead;
