import { Button, Group, Stack, Title } from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEGuidanceListItem, {
  IFEGuidanceHistory,
} from "src/components/fe-components/FEGuidanceListItem";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";

interface IFELecturerGuidanceStudentDetailProps {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Bimbingan",
    href: FEROUTES.LECTURER_HOMEPAGE_GUIDANCE,
  },
];

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

function getBackendData() {
  return {
    title:
      "RANCANG BANGUN SISTEM INFORMASI APLIKASI PERPUSTAKAAN UNIVERSITAS HASANUDDIN BERBASIS ANDROID",
    histories: getFilesHistory(),
  };
}

const FELecturerGuidanceStudentDetail: React.FC<
  IFELecturerGuidanceStudentDetailProps
> = ({}) => {
  const backendData = getBackendData();

  let { id } = useParams();

  return (
    <FEMainlayout breadCrumbs={breadCrumbs} breadCrumbsCurrentPage={`${id}`}>
      <Title order={2} mb={"md"}>
        {backendData.title}
      </Title>

      <Stack
        p={0}
        className="border overflow-hidden shadow rounded-md border-secondary-500"
      >
        {backendData.histories.map((history) => {
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
export default FELecturerGuidanceStudentDetail;
