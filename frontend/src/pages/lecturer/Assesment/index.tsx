import { Text, Breadcrumbs, Group, Stack, Title, Badge, Button, MediaQuery} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownloadOutline, IconColorScheme } from "../../../assets/Icons/Fluent";
import LecturerAppShell from "../../../layouts/LecturerAppShell";
import AssessementRules from "./AssessmentRules";
import ClassInformation from "./ClassInformation";
import CplOverlay from "./Overlay/CplOverlay";
import CpmkOverlay from "./Overlay/CpmkOverlay";
import MarkOverlay from "./Overlay/MarkOverlay";

const Circle = () => {
    return (
        <div className="w-3 h-3 rounded-full bg-[#34d227]" />
    )
}

const Assessment = () => {

    const [activeTab, setActiveTab] = useState<"penilaian"|"cpmk"|"cpl">("penilaian")

    return (
        <LecturerAppShell>
            <MediaQuery smallerThan={"md"} styles={{display: "none"}}>
                <Breadcrumbs>
                    <Link 
                        to={"/nilai"}
                        className="text-primary-500 font-semibold"
                    >
                        Nilai Dosen
                    </Link>
                    <Text  weight={600} color="primary-text">Penilaian Ilmu Biomedik Dasar</Text>
                </Breadcrumbs>
            </MediaQuery>
            <MediaQuery smallerThan={"md"} styles={{
                marginTop: 0
            }}>
                <Group position="apart" mt={"xl"}>
                    <Group align={"flex-start"}>
                        <Stack spacing={0}>
                            <Title size={32} color="primary-text">Ilmu Biomedik Dasar</Title>
                            <Text weight={300} color="secondary-text">21R01110105</Text>
                        </Stack>
                        <Badge leftSection={<Circle />} className="py-3 bg-[#34d22740] mt-2 ml-5" classNames={{
                            inner: "capitalize font-semibold text-[14px] text-[#34d227]"
                        }}>On Progress</Badge>
                    </Group>
                    <Button 
                        className="font-bold text-primary-text-500 border-[#CACCCE]" 
                        variant="outline" 
                        leftIcon={
                            <ArrowDownloadOutline 
                                color={
                                    IconColorScheme.primaryText} 
                            />}>
                        Download Manual Dosen
                    </Button>
                </Group>
            </MediaQuery>

            <div className="flex flex-col lg:flex-row space-between space-y-5 lg:space-y-0 lg:space-x-5 mt-10">
                <div className="w-full lg:max-w-[450px]">
                    <ClassInformation />
                </div>
                <div className="w-full lg:flex-1">
                     <AssessementRules />
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

        </LecturerAppShell>
    )
}

export default Assessment;