import {
  Button,
  Group,
  Input,
  Radio,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { openModal } from "@mantine/modals";
import React, { useState } from "react";
import ArrowUploadIcon from "src/assets/Icons/ArrowUploadIcon";
import { AddFilled, ArrowUpOutline } from "src/assets/Icons/Fluent";
import NoFilesAnimationIcon from "src/assets/Icons/NoFilesAnimationIcon";
import FEInputModal from "src/components/FEInputModal";
import InputModal from "src/components/InputModal";
import FEMainLayout from "src/layouts/FinalExam/FEMainlayout";

interface IFEProposalPageProps {}

const FEProposalPage: React.FC<IFEProposalPageProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  function handleAddProposalClick() {
    setIsOpen(true);
  }

  function handleDrop(files: File[]) {
    console.log(files);
  }

  return (
    <FEMainLayout>
      <FEInputModal
        opened={isOpen}
        title="Form Pengusulan Tugas Akhir"
        setOpened={setIsOpen}
      >
        <Stack spacing={"sm"}>
          <Input.Wrapper required label="Judul yang diusulkan">
            <Input placeholder="Input judul" />
          </Input.Wrapper>
          <div className={`grid gap-x-4 grid-cols-2`}>
            <div className={`col-span-1`}>
              <Input.Wrapper required label="Laboratorium">
                <Input placeholder="Pilih laboratorium" />
              </Input.Wrapper>
            </div>
            <div className={`col-span-1`}>
              <Input.Wrapper required label="Pembimbing utama yang diusulkan">
                <Input placeholder="Pilih pembimbing" />
              </Input.Wrapper>
            </div>
          </div>
          <div className={`grid gap-x-4 grid-cols-2`}>
            <Input.Wrapper required label="File draf proposal">
              <Group my={4}>
                <Dropzone
                  padding={0}
                  className={`w-fit border-none`}
                  onDrop={handleDrop}
                >
                  <Button className={`!bg-secondary-text-50`}>
                    <ArrowUploadIcon size={12} />
                    <Text ml={"xs"} color={"primary-text"}>
                      Choose File
                    </Text>
                  </Button>
                </Dropzone>

                <Text size="sm">Belum ada file yang di upload</Text>
              </Group>
              <Text size="xs" color="secondary-text">
                *Ekstensi file yang diperbolehkan adalah pdf atau docx
              </Text>
            </Input.Wrapper>
            <Input.Wrapper
              required
              label="Sudah memiliki SK pembimbing dan penguji?"
            >
              <Radio.Group>
                <Radio value={"TRUE"} label="Sudah" />
                <Radio value={""} label="Belum" />
              </Radio.Group>
            </Input.Wrapper>
          </div>

          <Input.Wrapper label="Catatan (Opsional)">
            <Textarea />
          </Input.Wrapper>
        </Stack>
      </FEInputModal>

      <Stack spacing={"xl"}>
        <Group position="apart">
          <Title order={2}>Usulan Tugas Akhir</Title>
          <Button
            variant="outline"
            color="primary-text"
            onClick={handleAddProposalClick}
          >
            <AddFilled className={`mr-1 mb-[1px]`} size={14} />
            Buat Permohonan Baru
          </Button>
        </Group>

        <Stack
          py={"xl"}
          className={`border-dashed border rounded-md border-secondary-text-800`}
        >
          <Stack align={"center"}>
            <NoFilesAnimationIcon />
            <Stack spacing={0}>
              <Text align="center">Belum Ada Permohonan</Text>
              <Text align="center" color={"secondary-text"}>
                Untuk membuat permohonan bebas lab, tekan tombol “Buat
                Permohonan Baru” di pojok kanan atas.
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </FEMainLayout>
  );
};
export default FEProposalPage;
