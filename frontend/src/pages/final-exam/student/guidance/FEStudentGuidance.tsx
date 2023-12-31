import { DeleteFilled } from "@ant-design/icons";
import { Button, Divider, Group, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { DeletFilled } from "src/assets/Icons/Fluent";
import FEGuidanceListItem, {
  IFEGuidanceHistory,
} from "src/components/fe-components/FEGuidanceListItem";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";

export interface IFEStudentGuidance {}

function getFilesHistory() {
  const now = new Date().getTime();
  const docHistory: IFEGuidanceHistory = {
    id: Math.random() + 423452,
    ts: now,
    user: "Fatwa Anugerah Nasir",
    fileUrl:
      "https://perencanaan.unhas.ac.id/tugasakhir/home/pdf/bimbingan_782_04112022060629_Proposal_Fatwa_Anugerah_Nasir.docx.pdf",
    comments: [
      {
        id: Math.random() + 423452,
        user: "Masloman",
        comment: "Perhatikan tanda baca",
        ts: now,
      },
    ],
  };

  return new Array(3).fill("").map((_) => {
    return docHistory;
  });
}

const FEStudentGuidance: React.FC<IFEStudentGuidance> = ({}) => {
  const histories = getFilesHistory();

  return (
    <FEMainlayout>
      <Title order={2} mb={"md"}>
        Bimbingan Tugas Akhir
      </Title>

      <Stack
        p={0}
        className="border overflow-hidden shadow rounded-md border-secondary-500"
      >
        {histories.map((history) => {
          return (
            <div key={history.id}>
              <FEGuidanceListItem history={history} />
              {history.comments?.map((comment) => {
                return (
                  <FEGuidanceListItem
                    key={comment.id + "comment"}
                    history={comment}
                  />
                );
              })}
            </div>
          );
        })}

        <Group
          className={`!bg-secondary-200 border-t border-secondary-400`}
          p="md"
          position="right"
          align={"center"}
          spacing={0}
        >
          <Button className={`rounded-l-md rounded-none`}>Teks</Button>
          <Button color={"pink"} className={`rounded-none`}>
            File Dokumen
          </Button>
          <Button color="gray" className={`rounded-none`}>
            File Gambar
          </Button>
          <Button color="yellow" className={`rounded-none rounded-r-md`}>
            Kirim Notifikasi
          </Button>
        </Group>
      </Stack>
    </FEMainlayout>
  );
};
export default FEStudentGuidance;
