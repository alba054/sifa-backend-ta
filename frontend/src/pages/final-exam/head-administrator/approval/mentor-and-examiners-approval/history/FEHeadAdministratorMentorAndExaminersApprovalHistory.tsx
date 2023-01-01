import { Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FETrashOutline } from "src/assets/Icons/Fluent";
import ManThinkingAnimation from "src/assets/Icons/ManThinkingAnimation";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { FEStatus } from "src/utils/const/type";
import FEHeadAdministratorMentorAndExaminersApprovalHistoryCard, {
  IFEHeadAdministratorMentorAndExaminersApprovalHistoryCard,
} from "./FEHeadAdministratorMentorAndExaminersApprovalHistoryCard";
export interface IFEHeadAdministratorMentorAndExaminersApprovalHistory {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.HEAD_ADMINISTRATOR_APPROVAL,
  },
  {
    title: "SK Pembimbing dan Penguji",
    href: FEROUTES.HEAD_ADMINISTRATOR_APPROVAL_MENTOR_AND_EXAMINERS,
  },
];

const dummyProposalHistoryList: Array<IFEHeadAdministratorMentorAndExaminersApprovalHistoryCard> =
  [
    {
      name: "Devi Selfira",
      nim: "N011181001",
      proposalTitle:
        "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
      laboratory: "Kimia Farmasi",
      sk: [
        {
          SKType: "mentor",
          status: "accepted",
          applicationDate: "12 November 2022",
          passedTime: "4 menit yang lalu",
          setStatus: (e: FEStatus) => {},
        },
        {
          SKType: "examiner",
          status: "rejected",
          applicationDate: "12 November 2022",
          passedTime: "4 menit yang lalu",
          setStatus: (e: FEStatus) => {},
          refusalReason: "Berkas tidak valid",
        },
      ],
    },
    {
      name: "Muh. Yusuf Syam",
      nim: "H071191044",
      proposalTitle: "Penerapan Machine Learning untuk Lab",
      laboratory: "Farmasi",
      sk: [
        {
          SKType: "mentor",
          status: "rejected",
          applicationDate: "12 Desember 2022",
          passedTime: "40 menit yang lalu",
          setStatus: (e: FEStatus) => {},
          refusalReason: "Judulnya jelek",
        },
        {
          SKType: "examiner",
          status: "rejected",
          applicationDate: "12 November 2022",
          passedTime: "4 menit yang lalu",
          setStatus: (e: FEStatus) => {},
          refusalReason:
            "Berikut beberapa alasan penolakan yang saya lakukan:\n1. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eligendi cupiditate beatae exercitationem praesentium blanditiis quisquam totam eum. Id reiciendis eius nesciunt quis repellendus nihil expedita. Cum ad eius voluptatum!\n2. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum officia doloribus reiciendis! Doloribus quis sequi cum omnis, eos est autem optio fuga quae illo perferendis non ea dicta blanditiis placeat dignissimos tempore natus vero at. Voluptatem aperiam ab vero voluptatibus consectetur quidem dolorum id ipsam, officiis laudantium quod et dignissimos, laboriosam nobis, inventore tempore labore? Repudiandae exercitationem dolores asperiores neque voluptas perspiciatis velit earum, voluptate non recusandae qui unde doloribus, iusto officiis. Consectetur fugiat, a repellendus ducimus possimus eos debitis quidem cum! Veritatis cupiditate nesciunt facilis mollitia nam corrupti rem veniam voluptate, facere possimus at, atque obcaecati commodi, nemo nihil!\n3. Kamu Jelek!",
        },
      ],
    },
  ];

const FEHeadAdministratorMentorAndExaminersApprovalHistory: React.FC<
  IFEHeadAdministratorMentorAndExaminersApprovalHistory
> = ({}) => {
  const {
    array: proposalHistoryList,
    remove,
    clear,
  } = useArray(dummyProposalHistoryList);
  const navigate = useNavigate();

  const [isDataExist, setIsDataExist] = useState(
    proposalHistoryList.length > 0 ? true : false
  );

  const [isAlertOpened, setIsAlertOpened] = useState(false);

  function onDelete(index: number) {
    remove(index);
  }

  useEffect(() => {
    if (proposalHistoryList.length > 0) {
      setIsDataExist(true);
    } else {
      setIsDataExist(false);
    }
  }, [proposalHistoryList]);

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Kosongkan Riwayat",
      type: "modal",
      disabled: !isDataExist,
      onClick: () => setIsAlertOpened(true),
      icon: <FETrashOutline className="mr-1" size={16} />,
    },
  ];

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Riwayat Persetujuan"
    >
      <FEAlertModal
        title="Kosongkan Riwayat Penyusunan?"
        description="Dengan mengklik tombol “Kosongkan”, semua data riwayat akan terhapus. Data yang telah dihapus tidak dapat dikembalikan"
        opened={isAlertOpened}
        setOpened={setIsAlertOpened}
        yesButtonLabel={"Kosongkan"}
        onSubmit={() => {
          clear();
          setIsAlertOpened(false);
        }}
      />
      <LFPHeaderComponent
        title="Riwayat Persetujuan"
        buttons={buttons}
        disabledButtonTooltipLabel={"Riwayat kosong"}
      />
      {isDataExist ? (
        <Stack mt={"md"} className="gap-6">
          {proposalHistoryList.map(
            (
              proposal: IFEHeadAdministratorMentorAndExaminersApprovalHistoryCard,
              e: number
            ) => {
              return (
                <FEHeadAdministratorMentorAndExaminersApprovalHistoryCard
                  key={e}
                  index={e}
                  onDelete={(e: number) => {
                    onDelete(e);
                  }}
                  {...proposal}
                />
              );
            }
          )}
        </Stack>
      ) : (
        <LFPEmptyDataComponent
          title="Riwayat Persetujuan Kosong"
          caption="Belum ada riwayat persetujuan tim penguji yang diajukan"
          icon={
            <ManThinkingAnimation
              width={400}
              className="overflow-hidden z-[-1]"
            />
          }
        />
      )}
    </FEMainlayout>
  );
};
export default FEHeadAdministratorMentorAndExaminersApprovalHistory;
