import { Box, Col, Grid, Group, Table } from "@mantine/core";
import { Title, Badge,} from '@mantine/core';
import { useEffect, useState } from "react";
import http from '../../../../config/http';

interface ICPLDetailProps{
    studentId: string;
    name: string;
    "cpmk-1": number;
    "cpmk-2": number;
    "cpmk-3": number;
}

const CplOverlay = () => {

    const tableHeader: string[] = [
        "No.",
        "Nim",
        "Nama Mahasiswa",
        "CPL-1",
        "CPL-2",
        "CPL-3",
    ]

    const headers = tableHeader.map((head, index) => (
        <th style={{
            textAlign: `${index > 2 || index == 0 ? "center" : "left"}`,
            position: "sticky",
            top: 0,
            zIndex: 1,
            background: "white",
        }}>{head}</th>
    ))

    const [studentsCPLMark, setStudentsCPLMark] = useState<Array<ICPLDetailProps>>([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await http.get("/classCPMKList.json")
            setStudentsCPLMark(data);
        }
        fetchData()
    }, [])

    return (
        <Grid>
            <Col lg={7}>
                <Box component="div" mt={"md"} className="w-full xl:max-w-[712px]">
                    <div className="h-3 w-full bg-gradient-to-r from-primary-500 to-error-500 rounded-t-full" />
                    <div className="border-2 border-[#dfdfdf] border-t-0 w-full rounded-b-md">
                        <Group position="apart" p={"md"} className="border-b-2 border-[#dfdfdf]">
                            <Group spacing={"lg"}>
                                <Title order={2} weight={600} size={24} color={"primary-text"}>CPMK Kelas</Title>
                                <Badge className="bg-[#e5e7eb] capitalize text-sm h-[27px]" >69 Mahasiswa</Badge>
                            </Group>
                        </Group>
                        <Group className="grow basis-0 block overflow-x-auto whitespace-nowrap rounded-b-md border-[#dfdfdf] overflow-y-auto">
                            <Table striped>
                                <thead>
                                    <tr>
                                        {headers}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        studentsCPLMark.map((student, index) => (
                                            <tr className="text-primary-text-500">
                                                <td className="text-center">{index + 1}</td>
                                                <td className="uppercase">{student.studentId}</td>
                                                <td className="uppercase">{student.name}</td>
                                                <td className="text-center">{student["cpmk-1"]}</td>
                                                <td className="text-center">{student["cpmk-2"]}</td>
                                                <td className="text-center">{student["cpmk-3"]}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr className="text-primary-text-500">
                                        <td colSpan={3} className="font-bold">Total</td>
                                        <td className="text-center">85</td>
                                        <td className="text-center">85</td>
                                        <td className="text-center">85</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Group>
                    </div>
                </Box>
            </Col>
            <Col lg={5}>
            <Box component="div" mt={"md"} className="w-full">
                    <div className="h-3 w-full bg-gradient-to-r from-primary-500    to-error-500 rounded-t-full" />
                    <div className="border-2 border-[#dfdfdf] border-t-0 w-full rounded-b-md">
                        <Group position="apart" p={"md"} className='border-b-2 border-[#dfdfdf]'>
                            <Group spacing={"lg"} >
                                <Title order={2} weight={600} size={24} color={"primary-text"}>Info CPL</Title>
                            </Group>
                        </Group>
                        <Grid p={"md"} gutter="xl">
                            <Grid.Col sm={2}>
                                <span className="font-bold text-primary-text-500">CPL-1</span>
                            </Grid.Col>
                            <Grid.Col sm={10}>
                                <span className="text-primary-text-500">Mahasiswa mampu menerapkan prinsip-prinsip sains sebagai suatu pendekatan dalam menyelesaikan masalah keperawatan</span>
                            </Grid.Col>

                            <Grid.Col sm={2}>
                                <span className="font-bold text-primary-text-500">CPL-1</span>
                            </Grid.Col>
                            <Grid.Col sm={10}>
                                <span className="text-primary-text-500">Mahasiswa mampu menerapkan prinsip-prinsip sains sebagai suatu pendekatan dalam menyelesaikan masalah keperawatan</span>
                            </Grid.Col>

                            <Grid.Col sm={2}>
                                <span className="font-bold text-primary-text-500">CPL-1</span>
                            </Grid.Col>
                            <Grid.Col sm={10}>
                                <span className="text-primary-text-500">Mahasiswa mampu menerapkan prinsip-prinsip sains sebagai suatu pendekatan dalam menyelesaikan masalah keperawatan</span>
                            </Grid.Col>
                        </Grid>
                    </div>
                </Box>
            </Col>
        </Grid>
    )
}

export default CplOverlay;