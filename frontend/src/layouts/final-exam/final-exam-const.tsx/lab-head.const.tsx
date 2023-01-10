import {
  FEBeakerGlass,
  FEBookOutline,
  FECheckSquareOutlineForNavbar,
  FEGuidance,
  FESeminar,
  HomeOutline,
} from "src/assets/Icons/Fluent";
import { INavbarMenuItem } from "src/components/fe-components/navbars/FEMainNavbar.component";
import { FEROUTES } from "src/routes/final-exam.route";

export const labHeadMenus: INavbarMenuItem[] = [
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
    icon: FEGuidance,
    label: "Usulan",
    href: FEROUTES.LECTURER_HOMEPAGE_PROPOSAL,
  },
  {
    icon: FECheckSquareOutlineForNavbar,
    label: "Persetujuan",
    href: FEROUTES.LECTURER_HOMEPAGE_APPROVAL,
  },
  {
    icon: FESeminar,
    label: "Seminar",
    href: FEROUTES.LECTURER_HOMEPAGE_SEMINAR,
  },
  {
    icon: FEBookOutline,
    label: "Bimbingan",
    href: FEROUTES.LECTURER_HOMEPAGE_GUIDANCE,
  },
];
