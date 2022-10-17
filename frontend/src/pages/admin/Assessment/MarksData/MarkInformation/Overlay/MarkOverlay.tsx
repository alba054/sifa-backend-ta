import { Box, Group, Table } from "@mantine/core";
import { Title, Badge, Button } from '@mantine/core';
import { useEffect, useState } from "react";
import { EditOutline, IconColorScheme } from "../../../../../../assets/Icons/Fluent";
import http from '../../../../../../config/http';

interface IMarkListProps{
    studentId: string;
    name: string;
    midTest: number;
    attendance: number;
    total: number;
    predicate: string;
    weight: number
}

const MarkOverlay = () => {

    const tableHeader: string[] = [
        "Aksi",
        "No.",
        "Nim",
        "Nama Mahasiswa",
        "UTS",
        "Kehadiran",
        "Total",
        "Huruf",
        "Bobot",
    ]

    const headers = tableHeader.map((head, index) => (
        <th style={{
            textAlign: `${index > 3 ? "center" : "left"}`,
            position: "sticky",
            top: 0,
            zIndex: 1,
            background: "white",
        }}>{head}</th>
    ))

    const [studentsMark, setStudentsMark] = useState<Array<IMarkListProps>>([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await http.get("/mark-list.json")
            setStudentsMark(data);
        }
        fetchData()
    }, [])

    return (
        <Box component="div" mt={"md"}>
            <div className="h-3 w-full bg-gradient-to-r from-primary-500 to-error-500 rounded-t-full" />
            <div className="border-2 border-[#dfdfdf] border-t-0 w-full rounded-b-md">
                <Group position="apart" p={"md"} className="border-b-2 border-[#dfdfdf]">
                    <Group spacing={"lg"}>
                        <Title order={2} weight={600} size={24} color={"primary-text"}>Daftar Nilai</Title>
                        <Badge className="bg-[#e5e7eb] capitalize text-sm h-[27px]" >69 Mahasiswa</Badge>
                    </Group>
                    <Group>
                        <Button className="text-error-500 bg-[#F8C2C580]">Hapus Semua</Button>
                        <Button className="text-[#06B6D4] bg-[#A5F3FC]">Download</Button>
                        <Button className="text-[#84cc16] bg-[#D9F99D]">Upload Nilai Akhir</Button>
                        <Button className="text-[#eab308] bg-[#FEF08A]">Penyesuaian</Button>
                        <Button className="text-[#8B5CF6] bg-[#DDD6FE]">Update CPMK</Button>
                    </Group>
                </Group>
                <Group className="grow basis-0 block overflow-x-auto whitespace-nowrap rounded-b-md border-[#dfdfdf] overflow-y-auto">
                    <Table striped>
                        <thead>
                            <tr>
                                {headers}
                            </tr>
                        </thead>
                        <tbody className="text-primary-text-500">
                            {
                                studentsMark.map((student, index) => (
                                    <tr>
                                        <td>
                                            <Group align={"center"} spacing={"xs"} noWrap>
                                                <EditOutline size={16} color={IconColorScheme.primaryText} />
                                                <span>Edit</span>    
                                            </Group>
                                        </td>
                                        <td>{index + 1}</td>
                                        <td className="uppercase">{student.studentId}</td>
                                        <td className="uppercase">{student.name}</td>
                                        <td className="text-center">{student.midTest}</td>
                                        <td className="text-center">{student.attendance}</td>
                                        <td className="text-center">{student.total}</td>
                                        <td className="text-center">{student.predicate}</td>
                                        <td className="text-center">{student.weight}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Group>
            </div>

        </Box>
    )
}

export default MarkOverlay;