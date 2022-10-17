import { Breadcrumbs, Button, MediaQuery, Table, Text } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookInformationOutline} from "../../../../../assets/Icons/Fluent";
import PageTitle from "../../../../../components/PageTitle";
import AdminAppShell from "../../../../../layouts/AdminAppShell";
import LecturerOverlay from "./Overlay/LecturerOverlay";
import StudentOverlay from "./Overlay/StudentOverlay";

const ClassInformation = () => {
    const [activeTab, setActiveTab] = useState<"dosen"|"mahasiswa">("dosen")

    return (
        <AdminAppShell>
            <MediaQuery smallerThan={"md"} styles={{display: "none"}}>
                <Breadcrumbs>
                    <Link 
                        to={"/admin/penilaian/data-kelas"}
                        className="text-primary-500 font-semibold"
                    >
                        Data Kelas
                    </Link>
                    <Text  weight={600} color="primary-text">Penilaian Ilmu Biomedik Dasar</Text>
                </Breadcrumbs>
            </MediaQuery>
            <MediaQuery smallerThan={"md"} styles={{
                marginTop: 0
            }}>
                <div>

                    <PageTitle mt={"xl"}>Falsafah & Teori Keperawatan (A)</PageTitle>
                    <Text size={16} weight={300} color="primary-text">17101R0103</Text>
                    <div className="rounded-t-lg w-full bg-primary-500 h-[72px] flex items-center px-8 mt-5">
                        <BookInformationOutline color="#fff" className="mr-3" />
                        <Text color="white" size={22} weight={600}>Informasi Kelas</Text>
                    </div>
                    <div className="flex-1 block overflow-x-auto whitespace-nowrap border-2 rounded-b-md border-[#dfdfdf] border-t-0">
                        <Table striped verticalSpacing={"sm"} className="text-primary-text-500">
                            <tbody>
                                <tr>
                                    <td className="text-left font-bold">Nama Matakuliah</td>
                                    <td className="text-[16px]">: Ilmu Biomedik Dasar</td>
                                </tr>
                                <tr>
                                    <td className="text-left font-bold">Kode Matakuliah</td>
                                    <td className="text-[16px]">: 21H01110105</td>
                                </tr>
                                <tr>
                                    <td className="text-left font-bold">Nama Kelas</td>
                                    <td className="text-[16px]">: A</td>
                                </tr>
                                <tr>
                                    <td className="text-left font-bold">Aturan Penilaian</td>
                                    <td className="text-[16px]">
                                        
                                            : Ditentukan Dosen 
                                            </td>
                                </tr>
                                <tr>
                                    <td className="text-left font-bold">Semester</td>
                                    <td className="text-[16px]">: Semester Awal 2021/2022</td>
                                </tr>
                                <tr>
                                    <td className="text-left font-bold">Semester</td>
                                    <td className="text-[16px]">: 2021</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <Button.Group my={40}>
                        <Button 
                            className={`${activeTab == "dosen" &&  "bg-[#caccce] font-bold"} text-primary-text-500`} 
                            variant="default"
                            onClick={() => setActiveTab("dosen")}
                        >
                            Data Dosen
                        </Button>
                        <Button 
                            className={`${activeTab == "mahasiswa" &&  "bg-[#caccce] font-bold"} text-primary-text-500`} 
                            variant="default"
                            onClick={() => setActiveTab("mahasiswa")}
                        >
                            Data Mahasiswa
                        </Button>
                    </Button.Group>
                    {
                        activeTab === "dosen" && (
                            <LecturerOverlay />
                        )
                    }
                    {
                        activeTab === "mahasiswa" && (
                            <StudentOverlay />
                        )
                    }
                </div>
            </MediaQuery>
        </AdminAppShell>
    )
}

export default ClassInformation;