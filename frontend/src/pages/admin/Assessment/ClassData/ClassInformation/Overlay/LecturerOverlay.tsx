import { Box, Group, Table } from "@mantine/core";
import { Title, Badge, Button } from '@mantine/core';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AddFilled, EditOutline, IconColorScheme } from "../../../../../../assets/Icons/Fluent";
import http from '../../../../../../config/http';

interface ILecturerListProps{
    nip: string;
    nama: string;
    posisi: string;
}

const LecturerOverlay = () => {

    const tableHeader: string[] = [
        "NIP",
        "Nama",
        "Posisi",
        "Aksi"
    ]

    const headers = tableHeader.map((head, index) => (
        <th style={{
            textAlign: `${index === 3 ? "center" : "left"}`,
            position: "sticky",
            top: 0,
            zIndex: 1,
            background: "white",
        }}>{head}</th>
    ))

    const [lecturers, setLecturers] = useState<Array<ILecturerListProps>>([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await http.get("/lecturers.json")
            setLecturers(data);
        }
        fetchData()
    }, [])

    return (
        <Box component="div" mt={"md"}>
            <div className="h-3 w-full bg-gradient-to-r from-primary-500 to-error-500 rounded-t-full" />
            <div className="border-2 border-[#dfdfdf] border-t-0 w-full rounded-b-md">
                <Group position="apart" p={"md"} className="border-b-2 border-[#dfdfdf]">
                    <Group spacing={"lg"}>
                        <Title order={2} weight={600} size={24} color={"primary-text"}>Data Dosen</Title>
                        <Badge className="bg-[#e5e7eb] capitalize text-sm h-[27px]">{lecturers.length} Dosen</Badge>
                    </Group>
                    <Group>
                        <Button variant="outline" color={"divider"} className="text-primary-text-500" leftIcon={<AddFilled size={16} />}>Tambah Dosen</Button>
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
                                lecturers.map((lecturer, index) => (
                                    <tr key={index}>
                                        <td>{lecturer.nip}</td>
                                        <td>{lecturer.nama}</td>
                                        <td>{lecturer.posisi}</td>
                                        <td className="text-center">
                                            <Link to="#">
                                                <span className="inline-block w-[86px] text-center text-primary-500 font-bold bg-[#c4c2f899] rounded-l-sm">Edit</span>
                                            </Link>
                                            <Link to="#">
                                                <span className="inline-block w-[86px] text-center text-error-500 font-bold bg-[#f8c2c599] rounded-r-sm">Hapus</span>
                                            </Link>
                                        </td>

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

export default LecturerOverlay;