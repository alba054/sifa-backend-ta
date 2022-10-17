import { Breadcrumbs, Button, Group, MediaQuery, Stack, Title, Text } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminAppShell from "../../../../../layouts/AdminAppShell";
import CplOverlay from "./Overlay/CplOverlay";
import CpmkOverlay from "./Overlay/CpmkOverlay";
import MarkOverlay from "./Overlay/MarkOverlay";
import AssessmentRules from "./AssessmentRules";
import ClassInformation from "./ClassInformation";

const MarkInformation = () => {

    const [activeTab, setActiveTab] = useState<"penilaian"|"cpmk"|"cpl">("penilaian")

    return (
        <AdminAppShell>
            <MediaQuery smallerThan={"md"} styles={{display: "none"}}>
                <Breadcrumbs>
                    <Link 
                        to={"/admin/penilaian/data-nilai"}
                        className="text-primary-500 font-semibold"
                    >
                        Data Nilai
                    </Link>
                    <Text  weight={600} color="primary-text">Falsafah & Teori Keperawatan (A)</Text>
                </Breadcrumbs>
            </MediaQuery>
            <MediaQuery smallerThan={"md"} styles={{
                marginTop: 0
            }}>
                <Group position="apart" mt={"xl"}>
                    <Group align={"flex-start"}>
                        <Stack spacing={0}>
                            <Title size={32} color="primary-text">Falsafah & Teori Keperawatan (A)</Title>
                            <Text weight={300} color="secondary-text">17101R0103</Text>
                        </Stack>
                    </Group>
                </Group>
            </MediaQuery>

            <div className="flex flex-col lg:flex-row space-between space-y-5 lg:space-y-0 lg:space-x-5 mt-10">
                <div className="w-full lg:max-w-[450px]">
                    <ClassInformation />
                </div>
                <div className="w-full lg:flex-1">
                     <AssessmentRules />
                </div>
            </div>

            <Button.Group mt={"xl"}>
                <Button 
                    className={`${activeTab == "penilaian" &&  "bg-[#caccce] font-bold"} text-primary-text-500`} 
                    variant="default"
                    onClick={() => setActiveTab("penilaian")}
                >
                    Penilaian
                </Button>
                <Button 
                    className={`${activeTab == "cpmk" &&  "bg-[#caccce] font-bold"} text-primary-text-500`} 
                    variant="default"
                    onClick={() => setActiveTab("cpmk")}
                >
                    CPMK Kelas
                </Button>
                <Button 
                    className={`${activeTab == "cpl" &&  "bg-[#caccce] font-bold"} text-primary-text-500`} 
                    variant="default"
                    onClick={() => setActiveTab("cpl")}
                >
                    CPL Kelas
                </Button>
            </Button.Group>
            {
                activeTab === "penilaian" && (
                    <MarkOverlay />
                )
            }
            {
                activeTab === "cpmk" && (
                    <CpmkOverlay />
                )
            }
            {
                activeTab === "cpl" && (
                    <CplOverlay />
                )
            }
        </AdminAppShell>
    )
}

export default MarkInformation;