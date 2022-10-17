import { Grid, Modal, Stack, Title, useMantineTheme, Text, Group, Badge } from "@mantine/core";
import React from "react";
import LecturerModalInfo from "./LecturerModalInfo";

interface ILecturerModalDetail{
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const LecturerDetailModal = ({opened, setOpened}: ILecturerModalDetail) => {
    
    const theme = useMantineTheme();

    return (
        <Modal 
            opened={opened} 
            centered
            onClose={() => setOpened(false)}
            title="Detail Dosen"
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

            <Grid grow p={"xl"}>
                <Grid.Col md={6}>
                    <LecturerModalInfo label="Nama" value="Syahrul, S.Kep,. Ns., M.Kes., Ph.D" />
                </Grid.Col>
                <Grid.Col md={6}>
                    <LecturerModalInfo label="Homebase" value="Ilmu Keperawatan (S1)" />
                </Grid.Col>
                <Grid.Col md={6}>
                    <LecturerModalInfo label="NIP" value="198204192006041002" />
                </Grid.Col>
                <Grid.Col md={6}>
                    <LecturerModalInfo label="NIDN" value="20090175021" />
                </Grid.Col>
                <Grid.Col md={6}>
                    <LecturerModalInfo label="Tempat dan Tanggal Lahir" value="Makassar, 30 Februari 1980" />
                </Grid.Col>
                <Grid.Col md={6}>
                    <LecturerModalInfo label="Nomor Sertifikasi" value="10907503732" />
                </Grid.Col>
                <Grid.Col md={12}>
                    <LecturerModalInfo label="Alamat" value="Jalan Mangga Besar III No. 17, RT 06 RW 07, Kelurahan Bedali, Kecamatan Lawang, Kab. Malang, Jawa Timur, 60256" />
                </Grid.Col>
                <Grid.Col md={12}>
                <Stack spacing={10}>
                    <Title color={"secondary-text"} size={16}>
                        Bidang Keahlian
                    </Title>
                    <Group>
                        <span className="inline-block text-[#8B5CF6] rounded-full bg-[#DDD6FE] py-1 px-5">
                            Spesialis Bedah
                        </span>
                        <span className="inline-block text-[#8B5CF6] rounded-full bg-[#DDD6FE] py-1 px-5">
                            Penyakit Dalam
                        </span>
                        <span className="inline-block text-[#8B5CF6] rounded-full bg-[#DDD6FE] py-1 px-5">
                            Penyakit Kelamin
                        </span>
                    </Group>
                </Stack>
                </Grid.Col>
            </Grid>

        </Modal>
    )
}

export default LecturerDetailModal;