import {
  Button,
  Group,
  Modal,
  useMantineTheme,
  Text,
  Stack,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { FEPersonFilled } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IProposal } from "src/components/fe-components/FEApprovalDetailsCard";
import FEDocumentList from "src/components/fe-components/FEDocumentList";
import FEInformationNotification from "src/components/fe-components/FEInformationNotification";
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import FESmallInformationNotification from "src/components/fe-components/FESmallInformationNotification";
import FETableHeader1 from "src/components/fe-components/table/FETableHeader1";
import { RadioGroup, SelectInput } from "src/components/FormInput";
import {
  feProposalApplicationModalForm,
  IFEProposalApplicationModalForm,
} from "./FEStudyProgramAdminProposalApplicationModalFormInterfaces";

export interface IFEStudyProgramAdminProposalApplicationModal {
  index: number;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  nim: string;
  onSubmit: (
    index: number,
    acceptedProposal: IFEProposalApplicationModalForm,
    approvalResult: string
  ) => void;
  proposalArray: Array<IProposal>;
}

const FEStudyProgramAdminProposalApplicationModal: React.FC<
  IFEStudyProgramAdminProposalApplicationModal
> = ({ index, opened, setOpened, name, nim, onSubmit, proposalArray }) => {
  const theme = useMantineTheme();

  const [isRefuseModalOpened, setIsRefuseModalOpened] = useState(false);
  const [isAcceptModalOpened, setIsAcceptModalOpened] = useState(false);

  const { ...form } = useForm<IFEProposalApplicationModalForm>({
    validate: yupResolver(feProposalApplicationModalForm),
  });

  const { getInputProps, errors, setValues, values } = form;

  useEffect(() => {
    setValues({
      acceptedProposalIndex: "0",
    });
  }, []);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title={`${name} (${nim})`}
      padding={30}
      styles={{
        modal: {
          maxWidth: "1000px",
          width: "100%",
          borderRadius: "12px",
        },
        title: {
          fontSize: 24,
          color: theme.colors["primary-text"][5],
          fontWeight: 700,
        },
      }}
    >
      <FEAlertModal
        opened={isAcceptModalOpened}
        setOpened={setIsAcceptModalOpened}
        title={"Setujui Permohonan Judul?"}
        description="Pastikan pilihan anda sudah BENAR"
        onSubmit={()=>{
          setIsAcceptModalOpened(()=>{return false});
          setOpened(false)
          onSubmit(index, values, "accepted") as any;
        }}
        yesButtonLabel="Setujui"
      />

      <FEAlertModal
        opened={isRefuseModalOpened}
        setOpened={setIsRefuseModalOpened}
        title={"Tolak Permohonan Judul?"}
        description="Permohonan yang ditolak tidak dapat dikembalikan"
        onSubmit={()=>{
          setIsRefuseModalOpened(()=>{return false});
          setOpened(false)
          onSubmit(index, values, "rejected") as any;
        }}
        yesButtonLabel="Tolak"
      />

      <div className="py-2">
        <Stack className="px-1">
          <FEInformationNotification
            description={
              <Text>
                Judul yang diajukan hanya dapat dipilih salah satunya. Jika
                ingin menolak semua judul, cukup tekan tombol “
                <Text className="font-extrabold inline">Tolak Usulan</Text>” di
                bawah. Pastikan{" "}
                <Text className="font-extrabold inline">menyetujui</Text> atau{" "}
                <Text className="font-extrabold inline">menolak</Text> judul
                dengan benar !
              </Text>
            }
          />
          <Stack className="border px-6 py-7  border-secondary-500 rounded-xl drop-shadow-1 shadow-sm">
            <Stack className="gap-0">
              <Text className="font-bold text-xl text-primary-text-500 mb-2">
                Judul Pertama
              </Text>
              <Text className="text-[18px] font-semibold text-primary-500 tracking-1">
                {proposalArray[0].proposalTitle}
              </Text>
              <Text className="text-secondary-text-500 text-lg tracking-1">
                Lab. {proposalArray[0].laboratory}
              </Text>
            </Stack>
            <Stack className="gap-1">
              <Text className="text-primary-text-500 font-bold text-lg">
                Asal Usulan
              </Text>
              <Text>
                <FERoundedChip
                    label={proposalArray[0].proposer || `Mahasiswa (${name})`}
                  type="blue"
                  leftIcon={
                    <FEPersonFilled
                      size={14}
                      color={theme.colors["primary"][5]}
                    />
                  }
                />
              </Text>
            </Stack>
          </Stack>
          {proposalArray.length >= 2 ? (
            <Stack className="border px-6 py-7  border-secondary-500 rounded-xl drop-shadow-1 shadow-sm">
              <Stack className="gap-0">
                <Text className="font-bold text-xl text-primary-text-500 mb-2">
                  Judul Kedua
                </Text>
                <Text className="text-[18px] font-semibold text-primary-500 tracking-1">
                  {proposalArray[1].proposalTitle}
                </Text>
                <Text className="text-secondary-text-500 text-lg tracking-1">
                  Lab. {proposalArray[1].laboratory}
                </Text>
              </Stack>
              <Stack className="gap-1">
                <Text className="text-primary-text-500 font-bold text-lg">
                  Asal Usulan
                </Text>
                <Text>
                  <FERoundedChip
                    label={proposalArray[1].proposer || `Mahasiswa (${name})`}
                    type="blue"
                    leftIcon={
                      <FEPersonFilled
                        size={14}
                        color={theme.colors["primary"][5]}
                      />
                    }
                  />
                </Text>
              </Stack>
            </Stack>
          ) : null}
          <FEDocumentList
            title="Dokumen Kelengkapan"
            documentList={["Sk-1", "Sk-2"]}
            info={
              "Pastikan dokumen sudah sesuai sebelum melakukan persetujuan."
            }
            status={"Lengkap"}
            px="px-6"
            py="py-7"
            titleSize="text-xl"
            dropShadow={false}
          />
          <Stack className="border px-6 py-7  border-secondary-500 rounded-xl drop-shadow-1 shadow-sm">
            <Text className="font-bold text-xl text-primary-text-500 mb-2">
              Judul yang Disetujui
            </Text>
            <RadioGroup
              required
              value={values}
              data={[
                {
                  label: "Judul Pertama",
                  value: "0",
                },
                {
                  label: "Judul Kedua",
                  value: "1",
                },
              ]}
              size={"sm"}
              color={theme.colors["primary"][5]}
              {...getInputProps("acceptedProposalIndex")}
              error={
                errors[
                  "acceptedProposalIndex" as keyof IFEProposalApplicationModalForm
                ]
              }
            />
            <FESmallInformationNotification info="Pilih judul yang akan disetujui sebelum melakukan persetujuan." />
          </Stack>
        </Stack>
      </div>
      <Group position="right" mt={"md"} className="pt-4" grow>
        <Button
          variant="light"
          className="text-white bg-primary-500 hover:bg-primary-700 font-bold"
          onClick={() => {
            setIsAcceptModalOpened(()=>{return true})
          }}
        >
          Setujui Usulan
        </Button>
        <Button
          variant="light"
          onClick={() => {
            setIsRefuseModalOpened(()=>{return true})
          }}
          className="text-white bg-error-500 hover:bg-error-500 font-bold"
        >
          Tolak Usulan
        </Button>
      </Group>
    </Modal>
  );
};
export default FEStudyProgramAdminProposalApplicationModal;
