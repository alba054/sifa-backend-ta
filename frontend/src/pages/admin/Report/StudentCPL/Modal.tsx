import { Grid, Modal, Stack, Title, useMantineTheme, Text, Group, Badge } from "@mantine/core";
import React from "react";
import CPLInfoCard from "./CPLInfoCard";
import RadarChart from "./RadarChart";

interface IStudentCPLInfoModal{
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const data = {
    labels: ['CPL-1', 'CPL-2', 'CPL-3', 'CPL-4', 'CPL-5', 'CPL-6','CPL-7', 'CPL-8', 'CPL-9', 'CPL-10'],
    datasets: [
      {
        label: '# of Votes',
        data: [0, 0, 80, 80, 70, 75, 85, 80, 0, 90],
        backgroundColor: 'rgba(95, 90, 247, 0.2)',
        borderColor: 'rgba(95, 90, 247,1)',
        borderWidth: 1,
      },
    ],
};

const StudentCPLInfoModal = ({opened, setOpened}: IStudentCPLInfoModal) => {
    
    const theme = useMantineTheme();

    return (
        <Modal 
            opened={opened} 
            centered
            onClose={() => setOpened(false)}
            title="Detail CPL Mahasiswa"
            styles={{
                title: {
                    fontSize: "32px",
                    color: theme.colors["primary-text"][5],
                    paddingLeft: "20px"
                },
                modal: {
                    width: "100%",
                    maxWidth: "1280px"
                }
            }}
        >
            <hr className="-mx-5 h-[1px]  bg-[#dfdfdf] border-0" />
            <div className="flex flex-col space-y-5 p-5">
                <Stack spacing={0}>
                    <Text size={28} color={"primary-text"}>Muh John Doe</Text>
                    <Text size={20} color={"secondary-text"}>C12115001</Text>
                </Stack>
                <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5">
                    <RadarChart color="blue" title="Grafik CPL Mahasiswa" data={data} />
                    <CPLInfoCard color="red" title="Info CPL" />
                </div>
            </div>

        </Modal>
    )
}

export default StudentCPLInfoModal;