import { Group, Navbar, Image, Text, Stack, Avatar } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowExitFilled, ChevronRightOutline, ClipboardTextLtrOutline, DatabaseOutline, DocumentBulletListMultipleOutline, DocumentTextLinkOutline, HatGraduationOutline, HomeOutline, IconColorScheme, PeopleTeamOutline, QuestionCircleOutline } from "../../assets/Icons/Fluent";
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
            <Navbar.Section mt={"md"} grow>
                <Stack justify={"space-between"} mt="xl">
                    <Stack spacing={0}>
                        <Group 
                            spacing={"sm"} 
                            position={!isHover ? "center" : "apart"}
                            className={`relative ${currentMenu === "" && "bg-[#5f5af71a] -mx-3 px-3 rounded-md"} my-1 cursor-pointer`}
                        >
                            <Group
                                className="py-1 w-full"
                            >
                                <HomeOutline 
                                    size={32} 
                                    color={currentMenu === "nilai" ? IconColorScheme.primary : IconColorScheme.divider} 
                                />
                                {
                                    isHover && (
                                        <Text 
                                            size={20} 
                                            className={`${currentMenu === "nilai" ? "text-primary-500" : "text-divider-500"}`}
                                        >
                                            Home
                                        </Text>
                                    )
                                }
                            </Group>
                        </Group>

                        {/* Penilaian */}
                        <Group 
                            spacing={"sm"} 
                            position={!isHover ? "center" : "apart"}
                            className={`relative ${currentMenu === "" && "bg-[#5f5af71a] -mx-3 px-3  rounded-md"} my-1 cursor-pointer`}
                        >
                            <Group
                                className="py-1 w-full "
                            >
                                <Group 
                                    className="w-full"
                                    position="apart"
                                >
                                    <Group>
                                        <ClipboardTextLtrOutline 
                                            size={32} 
                                            color={currentMenu === "nilai" ? IconColorScheme.primary : IconColorScheme.divider} 
                                        />
                                        {
                                            isHover && (
                                                <Text 
                                                    size={20} 
                                                    className={`${currentMenu === "nilai" ? "text-primary-500" : "text-divider-500"}`}
                                                >
                                                    Penilaian
                                                </Text>
                                            )
                                        }

                                    </Group>
                                    {
                                        isHover && (
                                            <ChevronRightOutline color={IconColorScheme.secondaryText} />
                                        )
                                    }
                                </Group>
                            </Group>
                            {/* <div className="bg-white w-64 rounded-md py-2 flex flex-col absolute left-0 top-0 -mt-2 -ml-8 translate-x-[360px] shadow-lg">
                                <Link to={"#"}>
                                    <p className="px-5 text-primary-500 py-2 font-semibold bg-[#5f5af71a]">
                                        Data Kelas
                                    </p>
                                </Link>
                                <Link to="#">
                                <p className="px-5 py-2 text-secondary-text-500 font-semibold ">
                                        Data Nilai
                                    </p>
                                </Link>
                            </div> */}
                        </Group>

                        {/* Master Data */}
                        <Group 
                            spacing={"sm"} 
                            position={!isHover ? "center" : "apart"}
                            className={`relative ${currentMenu === "" && "bg-[#5f5af71a] -mx-3 px-3  rounded-md"} my-1 cursor-pointer`}
                        >
                            <Group
                                className="py-1 w-full "
                            >
                                <Group 
                                    className="w-full"
                                    position="apart"
                                >
                                    <Group>
                                        <DatabaseOutline
                                            size={32} 
                                            color={currentMenu === "nilai" ? IconColorScheme.primary : IconColorScheme.divider} 
                                        />
                                        {
                                            isHover && (
                                                <Text 
                                                    size={20} 
                                                    className={`${currentMenu === "nilai" ? "text-primary-500" : "text-divider-500"}`}
                                                >
                                                    Master Data
                                                </Text>
                                            )
                                        }

                                    </Group>
                                    {
                                        isHover && (
                                            <ChevronRightOutline color={IconColorScheme.secondaryText} />
                                        )
                                    }
                                </Group>
                            </Group>
                            {/* <div className="bg-white w-64 rounded-md py-2 flex flex-col absolute left-0 top-0 -mt-2 -ml-8 translate-x-[360px] shadow-lg">
                                <Link to={"#"}>
                                    <p className="px-5 text-primary-500 py-2 font-semibold bg-[#5f5af71a]">
                                        Data Dosen
                                    </p>
                                </Link>
                                <Link to="#">
                                <p className="px-5 py-2 text-secondary-text-500 font-semibold ">
                                        Data Mahasiswa
                                    </p>
                                </Link>
                            </div> */}
                        </Group>

                        {/* Laporan */}
                        <Group 
                            spacing={"sm"} 
                            position={!isHover ? "center" : "apart"}
                            className={`relative ${currentMenu === "" && "bg-[#5f5af71a] -mx-3 px-3  rounded-md"} my-1 cursor-pointer`}
                        >
                            <Group
                                className="py-1 w-full "
                            >
                                <Group 
                                    className="w-full"
                                    position="apart"
                                >
                                    <Group>
                                        <DocumentBulletListMultipleOutline
                                            size={32} 
                                            color={currentMenu === "nilai" ? IconColorScheme.primary : IconColorScheme.divider} 
                                        />
                                        {
                                            isHover && (
                                                <Text 
                                                    size={20} 
                                                    className={`${currentMenu === "nilai" ? "text-primary-500" : "text-divider-500"}`}
                                                >
                                                    Laporan
                                                </Text>
                                            )
                                        }

                                    </Group>
                                    {
                                        isHover && (
                                            <ChevronRightOutline color={IconColorScheme.secondaryText} />
                                        )
                                    }
                                </Group>
                            </Group>
                            {/* <div className="bg-white w-64 rounded-md py-2 flex flex-col absolute left-0 top-0 -mt-2 -ml-8 translate-x-[360px] shadow-lg">
                                <Link to={"#"}>
                                    <p className="px-5 text-primary-500 py-2 font-semibold bg-[#5f5af71a]">
                                        Status Pendataan
                                    </p>
                                </Link>
                                <Link to="#">
                                    <p className="px-5 py-2 text-secondary-text-500 font-semibold ">
                                        CPL Matakuliah
                                    </p>
                                </Link>
                                <Link to="#">
                                    <p className="px-5 py-2 text-secondary-text-500 font-semibold ">
                                        CPL Mahasiswa
                                    </p>
                                </Link>
                            </div> */}
                        </Group>

                        {/* Akreditasi */}
                        <Group 
                            spacing={"sm"} 
                            position={!isHover ? "center" : "apart"}
                            className={`relative ${currentMenu === "" && "bg-[#5f5af71a] -mx-3 px-3 rounded-md"} my-1 cursor-pointer`}
                        >
                            <Group
                                className="py-1 w-full"
                            >
                                <HatGraduationOutline 
                                    size={32} 
                                    color={currentMenu === "nilai" ? IconColorScheme.primary : IconColorScheme.divider} 
                                />
                                {
                                    isHover && (
                                        <Text 
                                            size={20} 
                                            className={`${currentMenu === "nilai" ? "text-primary-500" : "text-divider-500"}`}
                                        >
                                            Akreditasi
                                        </Text>
                                    )
                                }
                            </Group>
                        </Group>

                        {/* Referensi */}
                        <Group 
                            spacing={"sm"} 
                            position={!isHover ? "center" : "apart"}
                            className={`relative ${currentMenu === "admin" && "bg-[#5f5af71a] -mx-3 px-3  rounded-md"} my-1 cursor-pointer`}
                        >
                            <Group
                                className="py-1 w-full "
                            >
                                <Group 
                                    className="w-full"
                                    position="apart"
                                >
                                    <Group>
                                        <DocumentTextLinkOutline
                                            size={32} 
                                            color={currentMenu === "nilai" ? IconColorScheme.primary : IconColorScheme.divider} 
                                        />
                                        {
                                            isHover && (
                                                <Text 
                                                    size={20} 
                                                    className={`${currentMenu === "nilai" ? "text-primary-500" : "text-divider-500"}`}
                                                >
                                                    Referensi
                                                </Text>
                                            )
                                        }

                                    </Group>
                                    {
                                        isHover && (
                                            <ChevronRightOutline color={IconColorScheme.secondaryText} />
                                        )
                                    }
                                </Group>
                            </Group>
                            {
                                isHover && (
                                <div className="bg-white w-64 rounded-md py-2 flex flex-col absolute left-0 top-0 -mt-2 -ml-8 translate-x-[360px] shadow-lg">
                                    <Link to={"#"}>
                                        <p className="px-5 text-primary-500 py-2 font-semibold bg-[#5f5af71a]">
                                            Kurikulum Matakuliah
                                        </p>
                                    </Link>
                                    <Link to="#">
                                        <p className="px-5 py-2 text-secondary-text-500 font-semibold ">
                                            Capaian Pembelajaran
                                        </p>
                                    </Link>
                                    <Link to="#">
                                        <p className="px-5 py-2 text-secondary-text-500 font-semibold ">
                                            CPL Matakuliah
                                        </p>
                                    </Link>
                                    <Link to="#">
                                        <p className="px-5 py-2 text-secondary-text-500 font-semibold ">
                                            RPS Matakuliah
                                        </p>
                                    </Link>
                                </div>
                                )
                            }
                        </Group>

                        {/* Daftar Pengguna */}
                        <Group 
                            spacing={"sm"} 
                            position={!isHover ? "center" : "apart"}
                            className={`relative ${currentMenu === "" && "bg-[#5f5af71a] -mx-3 px-3 rounded-md"} my-1 cursor-pointer`}
                        >
                            <Group
                                className="py-1 w-full"
                            >
                                <PeopleTeamOutline
                                    size={32} 
                                    color={currentMenu === "nilai" ? IconColorScheme.primary : IconColorScheme.divider} 
                                />
                                {
                                    isHover && (
                                        <Text 
                                            size={20} 
                                            className={`${currentMenu === "nilai" ? "text-primary-500" : "text-divider-500"}`}
                                        >
                                            Daftar Pengguna
                                        </Text>
                                    )
                                }
                            </Group>
                        </Group>

                        {/* Keluar */}
                        <Group 
                            spacing={"sm"} 
                            position={!isHover ? "center" : "apart"}
                            className={`relative ${currentMenu === "" && "bg-[#5f5af71a] -mx-3 px-3 rounded-md"} my-1 cursor-pointer`}
                        >
                            <Group
                                className="py-1 w-full"
                            >
                                <ArrowExitFilled
                                    size={32} 
                                    color={currentMenu === "nilai" ? IconColorScheme.primary : IconColorScheme.divider} 
                                />
                                {
                                    isHover && (
                                        <Text 
                                            size={20} 
                                            className={`${currentMenu === "nilai" ? "text-primary-500" : "text-divider-500"}`}
                                        >
                                            Keluar
                                        </Text>
                                    )
                                }
                            </Group>
                        </Group>
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