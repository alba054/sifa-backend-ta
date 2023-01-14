import {
  DocumentRibbonIcon,
  FEBookOutline,
  FEHammerOutline,
  FESeminar,
  HandshakeOutlineIcon,
  HomeOutline,
} from "src/assets/Icons/Fluent";
import { INavbarMenuItem } from "src/components/fe-components/navbars/FEMainNavbar.component";
import { FEROUTES } from "src/routes/final-exam.route";
import { INavbarItemList } from "../FEMainLayout";

export const studentMenus: INavbarItemList = {
  menus: [
    {
      icon: HomeOutline,
      label: "Home",
      href: FEROUTES.STUDENT_HOMEPAGE,
    },
    {
      icon: HandshakeOutlineIcon,
      label: "Bebas Lab",
      href: FEROUTES.STUDENT_LAB_FREE,
    },
    {
      icon: DocumentRibbonIcon,
      label: "Tugas Akhir",
      href: FEROUTES.STUDENT_FINAL_EXAM_PROPOSAL,
    },
    {
      icon: FESeminar,
      label: "Seminar",
      href: FEROUTES.STUDENT_SEMINAR,
    },
    {
      icon: FEHammerOutline,
      label: "Ujian Sidang",
      href: FEROUTES.STUDENT_TRIAL_PERMIT,
    },
    {
      icon: FEBookOutline,
      label: "Bimbingan",
      href: FEROUTES.STUDENT_GUIDANCE,
    },
  ],
  profileLink: FEROUTES.STUDENT_PROFILE
};
