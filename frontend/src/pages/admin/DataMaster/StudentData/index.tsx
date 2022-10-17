import { Button, Group, MediaQuery, Pagination, Stack, Table, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownOutline, ArrowUpOutline, CalendarEmptyOutline, DeletFilled, EditFilled, IconColorScheme, PersonInfoFilled, SearchFilled } from "../../../../assets/Icons/Fluent";
import { TextInput } from "../../../../components/FormInput";
import PageTitle from "../../../../components/PageTitle";
import http from "../../../../config/http";
import AdminAppShell from "../../../../layouts/AdminAppShell";

interface IStudentDataParams{
    programStudi: string;
    nim: string;
    nama: string;
    jenisKelamin: string;
}

type dataAccessor = "" | "programStudi" | "nim" | "nama" | "jenisKelamin"

const tableHeading: Array<{label:string ; accessor: dataAccessor; sortable:boolean}> = [
    { label: "No.", accessor: "", sortable: false},
    { label: "Program Studi", accessor: "programStudi", sortable: true},
    { label: "NIM", accessor: "nim", sortable: true},
    { label: "Nama", accessor: "nama", sortable: true},
    { label: "Jenis Kelamin", accessor: "jenisKelamin", sortable: true},
    { label: "Aksi", accessor: "", sortable: false},
]

const StudentData = () => {
    const [lecturers, setLecturers] = useState<Array<IStudentDataParams>>([])
    const [sortField, setSortField] = useState<dataAccessor>("")
    const [order, setOrder] = useState<"asc" | "desc">("asc")

    const lgScreenandBigger = useMediaQuery('(min-width: 1024px)')

    const handleSortingChange = (accessor: dataAccessor) => {
        const sortOrder = accessor === sortField && order === 'asc' ? "desc" : "asc";
        setSortField(accessor)
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder) 
    }

    const handleSorting = (sortField: dataAccessor, sortOrder: string) => {
        if (sortField) {
            const sorted = [...lecturers].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
             return (
              a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
               numeric: true,
              }) * (sortOrder === "asc" ? 1 : -1)
             );
            });
            setLecturers(sorted);
           }
    }

    useEffect(() => {
        const fetchData = async() => {
            const {data} = await http.get("/students.json");
            setLecturers(data)
        }
        fetchData()

    }, [])
    return (
        <AdminAppShell>
            <div style={{
                minHeight: lgScreenandBigger? "fit-content" : "calc(100vh + 200px)"
            }} className="h-full flex flex-col">
                <Group position="apart">
                    <div className="relative" >
                        <PageTitle>Data Mahasiswa</PageTitle>
                        <Text color={"secondary-text"}>Kelola data Mahasiswa Program Studi S1 - Ilmu Keperawatan</Text>
                        <Text className="w-fit mt-3 md:mt-0 md:absolute top-3 right-10 bg-[#e5e7eb] px-3 font-semibold text-primary-text-500 rounded-full">{lecturers.length} Mahasiswa</Text>
                    </div>

                    <Group align={"center"} noWrap> 
                        <TextInput className="w-full" placeholder="Search..." icon={<SearchFilled color={IconColorScheme.secondaryText} />}/>
                    </Group>
                </Group>
                <div className="bg-gradient-to-r mt-10 from-primary-500 to-error-500 w-full h-4 rounded-t-md"></div>
                <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row justify-between border-2 border-t-0 border-[#dfdfdf] items-center py-5 px-5">
                    <Title order={2} size={24} weight={600} color="primary-text">Data Mahasiswa</Title>
                    <Group>
                        <Button className="bg-[#F8C2C580] text-error-500 w-full lg:w-fit">Tambah Melalui Neosia</Button>
                        <Button className="bg-[#FEF08A80] text-[#EAB308] w-full lg:w-fit">Download Data (.xlsx)</Button>
                        <Button className="bg-[#A5F3FC80] text-[#06B6D4] w-full lg:w-fit">Upload Data</Button>
                        <Button className="bg-[#C4C2F880] text-primary-500 w-full lg:w-fit">Tambah Data</Button>
                    </Group>
                </div>
                <div className="grow basis-0 block overflow-x-auto whitespace-nowrap border-2 border-t-0 rounded-b-md border-[#dfdfdf] overflow-y-auto">
                    <Table className={` border-divider-500 h-full lg:h-5/6 w-full`} verticalSpacing={"sm"}>
                        <thead>
                            <tr>
                                {
                                    tableHeading.map((head,index) => (
                                        <th style={{
                                            textAlign: "left" ,
                                            position: "sticky",
                                            top: 0,
                                            zIndex: 1,
                                            background: "white",
                                            cursor: "pointer"
                                        }}
                                            key={head.accessor}
                                            onClick={head.sortable ? () => handleSortingChange(head.accessor) : undefined}
                                            >
                                            <Group spacing={"sm"} align="center" noWrap position={`${index === 0 || index === 4 || index === tableHeading.length - 1 ? "center" : "left"}`}>
                                                {head.label}
                                                {index !== tableHeading.length - 1  && index !== 0 && (
                                                    (sortField === head.accessor) && (order === "asc") ? (
                                                        <ArrowUpOutline size={16} color={IconColorScheme.primary} />
                                                        ) : (
                                                            (sortField === head.accessor) && (order === "desc") ? (
                                                                <ArrowDownOutline size={16} color={IconColorScheme.primary} />
                                                                ) : <ArrowDownOutline size={16} color={IconColorScheme.primaryText} />
                                                                )   
                                                                )
                                                            }
                                            </Group>
                                        </th>    
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {lecturers.length !== 0 ? (
                                lecturers.map((lecturer, index) => (
                                    <tr key={index} className="text-primary-text-500">
                                        <td className="text-center">{index+1}</td>
                                        <td>{lecturer.programStudi}</td>
                                        <td>{lecturer.nim}</td>
                                        <td className="capitalize">{lecturer.nama}</td>
                                        <td className="text-center">{lecturer.jenisKelamin}</td>
                                        <td className="text-center">
                                            <div className="flex space-x-2 justify-center">
                                                <Link to="#">
                                                    <span className="w-11 h-8 flex items-center justify-center rounded-md space-x-2 bg-[#1e9e63]">
                                                        <EditFilled size={20} color="#fff" />
                                                    </span>
                                                </Link>
                                                <Link to="#">
                                                    <span className="w-11 h-8 flex items-center justify-center rounded-md space-x-2 bg-error-500">
                                                        <DeletFilled size={20} color="#fff" />
                                                    </span>
                                                </Link>

                                            </div>
                                        </td>            
                                    </tr>
                                ))
                                ) : (
                                    <tr className="h-full">
                                    <td colSpan={8}>
                                        <CalendarEmptyOutline className="w-full" color={IconColorScheme.primaryText} size={235} />
                                        <Text align="center" className="text-2xl text-primary-text-500">Data tidak ditemukan</Text>
                                        <Text align="center" className="text-secondary-text-500">Masukkan kata kunci yang lain.</Text>
                                    </td>
                                </tr>
                            
                            )}
                        </tbody>
                    </Table>
                </div>
                <footer className="mt-5">
                    <MediaQuery smallerThan={"md"} styles={{display: "none"}}>
                        <Group position="apart">
                            <Text color={"secondary-text"}>Halaman 1 dari 3</Text>
                            <Pagination className="" total={2} withEdges />
                        </Group>
                    </MediaQuery>
                    <MediaQuery largerThan={"md"} styles={{display: "none"}}>
                        <Stack align={"center"}>
                            <Text color={"secondary-text"} size={16}>Halaman 1 dari 3</Text>
                            <Pagination className="" total={2} withEdges />
                        </Stack>
                    </MediaQuery>
                </footer>
            </div>
        </AdminAppShell>
    )
}

export default StudentData;