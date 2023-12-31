import { Group, Image, Navbar, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import { FEROUTES } from "src/routes/final-exam.route";
import {
  DocumentRibbonIcon,
  HandshakeOutlineIcon,
  HomeOutline,
  IFluentProps,
  FESeminar,
  FEHammerOutline,
} from "src/assets/Icons/Fluent";
import UnhasLogo from "src/assets/images/unhas_logo.png";
import FENavbarMenuItem from "./FENavbarMenuItem.component";
import { useLocation } from "react-router-dom";
import FEUserNavbarProfileComponent from "../FEUserNavbarProfile.component";

export interface IFEMainNavbarProps {
  menus: Array<INavbarMenuItem>;
  profileLink?: string;
}

export interface INavbarMenuItem {
  icon: React.FC<IFluentProps>;
  label: string;
  href: string;
}

const FEMainNavbar: React.FC<IFEMainNavbarProps> = ({ menus, profileLink }) => {
  const [isHover, setIsHover] = useState(false);
  const { pathname } = useLocation();

  const allRolesHomepageRoutes = [
    FEROUTES.HOMEPAGE,
    FEROUTES.STUDENT_HOMEPAGE,
    FEROUTES.DEAN_HOMEPAGE,
    FEROUTES.LAB_HEAD_HOMEPAGE,
    FEROUTES.LECTURER_HOMEPAGE,
    FEROUTES.FACULTY_ADMIN_HOMEPAGE,
    FEROUTES.FIRST_VICE_DEAN_HOMEPAGE,
    FEROUTES.HEAD_ADMINISTRATOR_HOMEPAGE,
    FEROUTES.SEMINAR_COORDINATOR_HOMEPAGE,
    FEROUTES.STUDY_PROGRAM_ADMIN_HOMEPAGE,
    FEROUTES.SUBSECTION_CHAIRMAN_HOMEPAGE,
  ];

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
                isActive={
                  allRolesHomepageRoutes.includes(menu.href)
                    ? menu.href == pathname
                    : pathname.includes(menu.href)
                }
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
          <FEUserNavbarProfileComponent
            isHover={isHover}
            profileLink={profileLink}
          />

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
