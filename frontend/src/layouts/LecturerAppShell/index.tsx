import { 
    AppShell, 
    Avatar, 
    Box, 
    Burger, 
    Group, 
    MediaQuery,
    Stack,
    Text
} from "@mantine/core";

import { useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { Link, useLocation } from "react-router-dom";
import { ArrowExitFilled, ClipboardTextLtrOutline, HomeOutline, IconColorScheme, QuestionCircleOutline } from "../../assets/Icons/Fluent";
import DesktopNavbar from "./DesktopNavbar";

interface ILecturerAppShellProps{
    children: React.ReactNode
}
const LecturerAppShell = ({children}: ILecturerAppShellProps) => {
    const [opened, setOpened] = useState<boolean>(false);
    const [isHover, setIsHover] = useState<boolean>(false)


    const location = useLocation()
    const [currentMenu, setCurrentMenu] = useState<string>("") 
    const [sidebarShown, setSidebarShown] = useState<boolean>(false);

    useEffect(() => {   
        const current = location.pathname.split(("/"))[1]
        console.log(current)
        setCurrentMenu(current)
    }, [location.pathname])

    return (
        <AppShell
            padding={0}
            fixed
            navbarOffsetBreakpoint={"xs"}
            navbar={
                <>
                    <MediaQuery  styles={{display: "none"}}>
                        <DesktopNavbar 
                            setIsHover={setIsHover} 
                            currentMenu={currentMenu} 
                            isHover={isHover} 
                            opened={opened} 
                        />
                    </MediaQuery>
                </>
            }
        >
                <div className="w-full md:hidden h-16 bg-white z-40 sticky top-0 shadow-md flex items-center px-5 border-b-2 border-[#dfdfdf10]">
                    <Burger opened={sidebarShown} onClick={() => setSidebarShown(prev => !prev)}   />
                    <Text size={24} weight={600} className="absolute left-1/2 -translate-x-1/2">CPL <span className="text-white bg-error-500 px-2">UNHAS</span></Text>
                </div>
                <div className={`w-screen max-w-full h-screen ${sidebarShown ? "opacity-1 block" : "opacity-0 hidden"} bg-[#00000080] fixed z-10 top-16 md:hidden transition-all duration-500`}>
                </div>
                <div className={`w-[300px] h-screen top-0 bg-white fixed z-20 ${sidebarShown ? "translate-x-0" : "-translate-x-full"} transition-all duration-500 md:hidden`}>
                <div className="h-full pt-16">
                    <div className="flex flex-col h-full overflow-y-auto py-10">
                        <div className="flex-1 px-4 flex flex-col space-y-4 ">
                            <Link to="/">
                                <Group 
                                    spacing={"sm"} 
                                    className={`${currentMenu == "" && "bg-[#5f5af71a] px-3 py-1 rounded-md"} cursor-pointer`}
                                >
                                    <HomeOutline 
                                        color={currentMenu === "" ? IconColorScheme.primary : IconColorScheme.divider} 
                                        size={32} 
                                    />

                                        <Text size={20} className={`${currentMenu === "" ? "text-primary-500" : "text-divider-500"}`}>Home</Text>
                                </Group>
                            </Link>
                            <Link to={"/nilai"}>
                                <Group 
                                    spacing={"sm"} 
                                    className={`${currentMenu === "nilai" && "bg-[#5f5af71a] px-3 py-1 rounded-md"} cursor-pointer`}
                                >
                                    <ClipboardTextLtrOutline 
                                        color={currentMenu === "nilai" ? IconColorScheme.primary : IconColorScheme.divider} 
                                        size={32} 
                                    />
                                            <Text size={20} className={`${currentMenu === "nilai" ? "text-primary-500" : "text-divider-500"}`}>Nilai Dosen</Text>
                                </Group>
                            </Link>
                            <Link to={"/bantuan"}>
                                <Group 
                                    spacing={"sm"} 
                                    className={`${currentMenu === "bantuan" && "bg-[#5f5af71a] px-3 py-1 rounded-md"} cursor-pointer`}
                                >
                                    <QuestionCircleOutline color={currentMenu === "bantuan" ? IconColorScheme.primary : IconColorScheme.divider}  size={32} />
                                            <Text 
                                                size={20} 
                                                className={`${currentMenu === "bantuan" ? "text-primary-500" : "text-divider-500"}`}
                                            >Bantuan</Text>
                                </Group>
                            </Link>
                            <Link to={"/login"}>
                                <Group 
                                    spacing={"sm"}
                                    className={`${currentMenu === "login" && "bg-[#5f5af71a] px-3 py-1 rounded-md"} cursor-pointer`}
                                >
                                    <ArrowExitFilled color={currentMenu === "login" ? IconColorScheme.primary : IconColorScheme.divider}  size={32} />
                                            <Text 
                                                size={20} 
                                                className={`${currentMenu === "login" ? "text-primary-500" : "text-divider-500"}`}
                                            >
                                                Keluar
                                            </Text>
                                </Group>
                            </Link>
                        </div>
                        <div className="px-4">
                            <Link to={"/profil"}>
                                <div className="flex space-x-2 items-center">
                                <Avatar className="shrink-0" src={"https://images.unsplash.com/photo-1484588168347-9d835bb09939?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"} alt="avatar" radius={"xl"} size={60} />
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <p className="whitespace-nowrap overflow-hidden text-ellipsis font-bold text-primary-text-500">Dr. John Doe S.Si jfkdlksa fksjla flkdsja</p>
                                        <p className="whitespace-nowrap overflow-hidden text-ellipsis  text-secondary-text-500">197710202003122001</p>
                                    </div>
                                </div>
                            </Link>
                            <Text mt="xl" size={"sm"} color={"secondary-text"}>&copy;2022 NPE Digital. All rights reserved.</Text>
                        </div>
                    </div>
                    </div>
                </div>
            <div className="py-5 px-5 md:px-10 h-full w-full max-w-7xl mx-auto" >
                {children}
            </div>
        </AppShell>
    )
}

export default LecturerAppShell;