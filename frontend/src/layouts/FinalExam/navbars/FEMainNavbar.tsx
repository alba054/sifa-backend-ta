import { Group, Image, Navbar, Text } from "@mantine/core";
import React, { useState } from "react";
import {
  HandshakeOutlineIcon,
  HomeOutline,
  IFluentProps,
} from "../../../assets/Icons/Fluent";
import UnhasLogo from "../../../assets/images/unhas_logo.png";
import FENavbarMenuItem from "./FENavbarMenuItem";

interface IFEMainNavbarProps {}

interface INavbarMenuItem {
  icon: React.FC<IFluentProps>;
  label: string;
  route: string;
}

const menus: INavbarMenuItem[] = [
  {
    icon: HomeOutline,
    label: "Home",
    route: "#",
  },
  {
    icon: HandshakeOutlineIcon,
    label: "Bebas Lab",
    route: "#",
  },
];

const FEMainNavbar: React.FC<IFEMainNavbarProps> = ({}) => {
  const [isHover, setIsHover] = useState(false);

  // function toggleSidebar() {
  //   setIsHover((prev) => !prev);
  // }

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
          <Image src={UnhasLogo} width={35} height={40} />
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

      <Navbar.Section mt={"md"} grow>
        {menus.map((menu) => {
          return (
            <FENavbarMenuItem
              key={"menu-item" + menu.label}
              icon={menu.icon}
              label={menu.label}
              isOpen={isHover}
            />
          );
        })}
      </Navbar.Section>
    </Navbar>
  );
};
export default FEMainNavbar;
