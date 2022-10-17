import { Group, Navbar, Image, Text, Stack, Avatar } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowExitFilled, ClipboardTextLtrOutline, HomeOutline, IconColorScheme, QuestionCircleOutline } from "../../assets/Icons/Fluent";
import UnhasLogo from '../../assets/images/unhas_logo.png';


interface IDesktopNavbarProps{
    isHover: boolean;
    setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
    opened: boolean;
    currentMenu: string;
}

const DesktopNavbar = ({isHover, setIsHover, opened, currentMenu}: IDesktopNavbarProps) => {
    return(
        <Navbar
            hiddenBreakpoint={"sm"}
            onMouseEnter={e => setIsHover(true)}
            onMouseLeave={e => setIsHover(false)}
            width={{sm: isHover? 335 : 110}}
            hidden={!opened}
            className="bg-[#f9fafb] w- py-10 px-8 flex flex-col transition duration-1000 ease-in-out"   
        >
            <Navbar.Section>
                <Group position="center">
                    <Image src={UnhasLogo} width={50}  />
                    {isHover &&  <Text size={24} weight={600}>CPL <span className="text-white bg-error-500 px-2">UNHAS</span></Text>}
                </Group>
            </Navbar.Section>
            <Navbar.Section mt={"xl"} grow>
                <Stack justify={"space-between"} mt="xl">
                    <Stack>
                        <Link to="/">
                            <Group 
                                spacing={"sm"} 
                                position={!isHover ? "center" : "left"} 
                                className={`${currentMenu == "" && "bg-[#5f5af71a] -mx-3 px-3 py-1 rounded-md"} cursor-pointer`}
                            >
                                <HomeOutline 
                                    color={currentMenu === "" ? IconColorScheme.primary : IconColorScheme.divider} 
                                    size={32} 
                                />
                                {isHover && (
                                    <Text size={20} className={`${currentMenu === "" ? "text-primary-500" : "text-divider-500"}`}>Home</Text>
                                ) 
                                }
                            </Group>
                        </Link>
                        <Link to={"/nilai"}>
                            <Group 
                                spacing={"sm"} 
                                position={!isHover ? "center" : "left"}
                                className={`${currentMenu === "nilai" && "bg-[#5f5af71a] -mx-3 px-3 py-1 rounded-md"} cursor-pointer`}
                            >
                                <ClipboardTextLtrOutline 
                                    color={currentMenu === "nilai" ? IconColorScheme.primary : IconColorScheme.divider} 
                                    size={32} 
                                />
                                {
                                    isHover && (
                                        <Text 
                                            size={20} 
                                            className={`${currentMenu === "nilai" ? "text-primary-500" : "text-divider-500"}`}
                                        >
                                            Nilai Dosen
                                        </Text>
                                    )
                                }
                            </Group>
                        </Link>
                        <Link to={"/bantuan"}>
                            <Group 
                                spacing={"sm"} 
                                position={!isHover ? "center" : "left"}
                                className={`${currentMenu === "bantuan" && "bg-[#5f5af71a] -mx-3 px-3 py-1 rounded-md"} cursor-pointer`}
                            >
                                <QuestionCircleOutline 
                                    color={currentMenu === "bantuan" ? IconColorScheme.primary : IconColorScheme.divider}  
                                    size={32} 
                                />
                                {
                                    isHover && (
                                        <Text 
                                            size={20} 
                                            className={`${currentMenu === "bantuan" ? "text-primary-500" : "text-divider-500"}`}
                                        >
                                            Bantuan
                                        </Text>
                                    )
                                }
                            </Group>
                        </Link>
                        <Link to={"/login"}>
                            <Group 
                                spacing={"sm"} 
                                position={!isHover ? "center" : "left"}
                            >
                                <ArrowExitFilled 
                                    color={currentMenu === "login" ? IconColorScheme.primary : IconColorScheme.divider}  
                                    size={32} 
                                />
                                {
                                    isHover && (
                                        <Text 
                                            size={20} 
                                            className={`${currentMenu === "login" ? "text-primary-500" : "text-divider-500"}`}
                                        >
                                            Keluar
                                        </Text>
                                    )
                                }
                            </Group>
                        </Link>
                    </Stack>
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Link to={"/profil"}>
                    <div className="flex space-x-2 items-center">
                        <Avatar src={"https://images.unsplash.com/photo-1484588168347-9d835bb09939?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"} alt="avatar" radius={"xl"} size={60} />
                        {isHover && (
                            <div className="flex-1 flex flex-col min-w-0">
                                <p className="text-lg font-bold text-primary-text-500 whitespace-nowrap overflow-hidden text-ellipsis">Dr. John Doe S.Si fdsasf df fasf sf sf asf saf fsf saf</p>
                                <p className="text-secondary-text-500">197710202003122001</p>
                            </div>
                        )}
                    </div>
                </Link>
                {isHover && (
                    <Text mt="xl" size={"sm"} color={"secondary-text"}>&copy;2022 NPE Digital. All rights reserved.</Text>
                )}
            </Navbar.Section>
        </Navbar>
    )
}

export default DesktopNavbar;