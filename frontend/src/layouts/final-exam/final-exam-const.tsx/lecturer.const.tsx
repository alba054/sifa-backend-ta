import {
  FECheckSquareOutlineForNavbar,
  FEGuidance,
  HomeOutline,
} from "src/assets/Icons/Fluent";
import { INavbarMenuItem } from "src/components/fe-components/navbars/FEMainNavbar.component";
import { FEROUTES } from "src/routes/final-exam.route";

export const lecturerMenus: INavbarMenuItem[] = [
  {
    icon: HomeOutline,
    label: "Home",
    href: FEROUTES.LECTURER_HOMEPAGE,
  },
  {
    icon: FEGuidance,
    label: "Usulan Pembimbing",
    href: FEROUTES.LECTURER_HOMEPAGE_MENTOR_PROPOSAL,
  },
  {
    icon: FECheckSquareOutlineForNavbar,
    label: "Persetujuan",
    href: FEROUTES.LECTURER_HOMEPAGE_APPROVAL,
  },
];
