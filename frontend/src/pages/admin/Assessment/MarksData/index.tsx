import { Group, Text, Button, Table, MediaQuery, Pagination, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AddFilled, ArrowDownOutline, ArrowUpOutline, BookInformationFilled, CalendarEmptyOutline, DeletFilled, EditFilled, FilterFilled, IconColorScheme, SearchFilled } from "../../../../assets/Icons/Fluent";
import { TextInput } from "../../../../components/Input";
import PageTitle from "../../../../components/PageTitle";
import http from "../../../../config/http";
import AdminAppShell from "../../../../layouts/AdminAppShell";
import Modal from "./Modal";

interface IClassDataParams{
    semester: string;
    kurikulum: string;
    namaKelas: string;
    namaMatakuliah: string;
    sks: number;
    semesterKurikulum: number;
    sifat: string
}

type dataAccessor = "" | "semester" | "kurikulum" | "namaKelas" | "namaMatakuliah" | "sks" | "semesterKurikulum" | "sifat"

const tableHeading: Array<{label:string ; accessor: dataAccessor; sortable:boolean}> = [
    { label: "Semester", accessor: "semester", sortable: true},
    { label: "Kurikulum", accessor: "kurikulum", sortable: true},
    { label: "Nama Kelas", accessor: "namaKelas", sortable: true},
    { label: "Nama Matakuliah", accessor: "namaMatakuliah", sortable: true},
    { label: "SKS", accessor: "sks", sortable: true},
    { label: "Sem. Kur.", accessor: "semesterKurikulum", sortable: true},
    { label: "Sifat", accessor: "sifat", sortable: true},
    { label: "Aksi", accessor: "", sortable: false},
]

const MarksData = () => {

    const [marks, setMarks] = useState<Array<IClassDataParams>>([])
    const [sortField, setSortField] = useState<dataAccessor>("")
    const [order, setOrder] = useState<"asc" | "desc">("asc")
    const [modalOpened, setModalOpened] = useState<boolean>(false)

    const handleSortingChange = (accessor: dataAccessor) => {
        const sortOrder = accessor === sortField && order === 'asc' ? "desc" : "asc";
        setSortField(accessor)
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder) 
    }

    const handleSorting = (sortField: dataAccessor, sortOrder: string) => {
        if (sortField) {
            const sorted = [...marks].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
             return (
              a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
               numeric: true,
              }) * (sortOrder === "asc" ? 1 : -1)
             );
            });
            setMarks(sorted);
           }
    }

    useEffect(() => {
        const fetchData = async() => {
            const {data} = await http.get("/class_data.json");
            setMarks(data)
        }
        fetchData()

    }, [])

    return (
        <>
        
        <AdminAppShell>
            <div className="h-full flex flex-col">
                <Group position="apart">
                    <div className="relative" >
                        <PageTitle>Data Nilai</PageTitle>
                        <Text color={"secondary-text"}>Kelola data kelas matakuliah dari dosen dan mahasiswa</Text>
                        <Text className="w-fit mt-3 md:mt-0 md:absolute top-3 right-10 bg-[#e5e7eb] px-3 font-semibold text-primary-text-500 rounded-full">{marks.length} Kelas Matakuliah</Text>
                    </div>
                    <Group align={"center"} noWrap> 
                        <TextInput className="w-full" placeholder="Search..." icon={<SearchFilled color={IconColorScheme.secondaryText} />}/>
                        <Button 
                            onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                                setModalOpened(true)
                            }} 
                            variant="outline" 
                            color={"divider"} 
                            compact 
                            className=" h-10 w-[105px] rounded-md"
                            >
                            <FilterFilled color={IconColorScheme.primaryText} />
                            <span className="ml-2 font-bold text-primary-text-500">Filter</span>
                        </Button>
                    </Group>
                </Group>
                <div className="bg-gradient-to-r mt-10 from-primary-500 to-error-500 w-full h-4 rounded-t-md"></div>
                <div className="grow basis-0 block overflow-x-auto whitespace-nowrap border-2 border-t-0 rounded-b-md border-[#dfdfdf] overflow-y-auto">
                    <Table className={` border-divider-500 h-5/6 w-full`} verticalSpacing={"sm"}>
                        <thead>
                            <tr>
                                {
                                    tableHeading.map((head,index) => (
                                        <th style={{
                                            textAlign: 'center',
                                            position: "sticky",
                                            top: 0,
                                            zIndex: 1,
                                            background: "white",
                                            cursor: "pointer"
                                        }}
                                            key={head.accessor}
                                            onClick={head.sortable ? () => handleSortingChange(head.accessor) : undefined}
                                            >
                                            <Group spacing={"sm"} align="center" noWrap position="center">
                                                {head.label}
                                                {index !== tableHeading.length - 1 && (
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
                            {marks.length !== 0 ? (
                                marks.map((mark, index) => (
                                    <tr key={index} className="text-primary-text-500">
                                        <td>{mark.semester}</td>
                                        <td>{mark.kurikulum}</td>
                                        <td>{mark.namaKelas}</td>
                                        <td>{mark.namaMatakuliah}</td>
                                        <td className="text-center">{mark.sks}</td>
                                        <td className="text-center">{mark.semesterKurikulum}</td>
                                        <td className="text-center">{mark.sifat}</td>
                                        <td className="text-center">
                                            <Link to="penilaian">
                                                <span className="inline-block w-[86px] text-center text-primary-500 font-bold bg-[#c4c2f899] rounded-l-sm">Penilaian</span>
                                            </Link>
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

        <Modal 
            opened={modalOpened} 
            setOpened={setModalOpened}  
        />
        </>
    )
}

export default MarksData;