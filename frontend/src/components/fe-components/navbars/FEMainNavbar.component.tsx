import { Group, Image, Navbar, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import { FEROUTES } from "src/routes/final-exam.route";
import {
  DocumentRibbonIcon,
  HandshakeOutlineIcon,
  HomeOutline,
  IFluentProps,
} from "src/assets/Icons/Fluent";
import UnhasLogo from "src/assets/images/unhas_logo.png";
import FENavbarMenuItem from "./FENavbarMenuItem.component";
import { useLocation } from "react-router-dom";
import FEUserNavbarProfileComponent from "../FEUserNavbarProfile.component";

interface IFEMainNavbarProps {}

interface INavbarMenuItem {
  icon: React.FC<IFluentProps>;
  label: string;
  href: string;
}

const menus: INavbarMenuItem[] = [
  {
    icon: HomeOutline,
    label: "Home",
    href: FEROUTES.HOMEPAGE,
  },
  {
    icon: HandshakeOutlineIcon,
    label: "Bebas Lab",
    href: FEROUTES.LAB_FREE,
  },
  {
    icon: DocumentRibbonIcon,
    label: "Tugas Akhir",
    href: FEROUTES.FINAL_EXAM_PROPOSAL,
  },
];

const FEMainNavbar: React.FC<IFEMainNavbarProps> = ({}) => {
  const [isHover, setIsHover] = useState(false);
  const { pathname } = useLocation();

  return (
    <Navbar
      hiddenBreakpoint={"sm"}
      onMouseEnter={(e) => setIsHover(true)}
      onMouseLeave={(e) => setIsHover(false)}
      width={{ sm: isHover ? 335 : 110 }}
      className="bg-sidebar-background transition-all duration-100 py-10 px-8 ease-in-out"
    >
      <Navbar.Section>
        <Group position="center">
          <Image src={UnhasLogo} width={45} height={50} />
          <Text
            size={24}
            weight={600}
            className={`overflow-hidden truncate transition-all duration-100 
            ${!isHover && "opacity-0"}
              
            `}
          >
            Tugas Akhir
            <span className="text-white bg-error mx-2 px-2">UNHAS</span>
          </Text>
        </Group>
      </Navbar.Section>

      <Navbar.Section mt={"xl"} grow>
        <Stack spacing={"lg"}>
          {menus.map((menu) => {
            return (
              <FENavbarMenuItem
                isActive={menu.href === pathname}
                key={"menu-item" + menu.label}
                icon={menu.icon}
                label={menu.label}
                isOpen={isHover}
                href={menu.href}
              />
            );
          })}
        </Stack>
      </Navbar.Section>

      <Navbar.Section mt="auto">
        <Stack spacing={4}>
          <FEUserNavbarProfileComponent isHover={isHover} />

          {!!isHover && (
            <Text color="gray">
              ©2022 Faculty of Pharmacy. All rights reserved.
            </Text>
          )}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};
export default FEMainNavbar;
