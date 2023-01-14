import {
  DocumentRibbonIcon,
  FEBeakerGlass,
  FEBookOutline,
  FECheckSquareOutlineForNavbar,
  FEGuidance,
  FEReference,
  FESeminar,
  HomeOutline,
} from "src/assets/Icons/Fluent";
import { INavbarMenuItem } from "src/components/fe-components/navbars/FEMainNavbar.component";
import { FEROUTES } from "src/routes/final-exam.route";
import { INavbarItemList } from "../FEMainLayout";

export const labHeadMenus: INavbarItemList = {
  menus: [
    {
      icon: HomeOutline,
      label: "Home",
      href: FEROUTES.LAB_HEAD_HOMEPAGE,
    },
    {
      icon: FEBeakerGlass,
      label: "Bebas Lab",
      href: FEROUTES.LAB_HEAD_LABFREE,
    },
    {
      icon: DocumentRibbonIcon,
      label: "Tugas Akhir",
      href: FEROUTES.LAB_HEAD_FINAL_EXAM,
    },
    {
      icon: FEReference,
      label: "Referensi",
      href: FEROUTES.LAB_HEAD_REFERENCE,
    },
  ],
  profileLink: FEROUTES.LAB_HEAD_PROFILE,
};
