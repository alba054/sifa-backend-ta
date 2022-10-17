import { Group, Text, Button, Table, MediaQuery, Pagination, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AddFilled, ArrowDownOutline, ArrowUpOutline, BookInformationFilled, CalendarEmptyOutline, CheckmarkOutline, CloseOutline, DeletFilled, EditFilled, FilterFilled, IconColorScheme, SearchFilled } from "../../../../assets/Icons/Fluent";
import { TextInput } from "../../../../components/Input";
import PageTitle from "../../../../components/PageTitle";
import http from "../../../../config/http";
import AdminAppShell from "../../../../layouts/AdminAppShell";
import Modal from "./Modal";

interface IDataStatusReportParams{
    kurikulum: number;
    kodeMatakuliah: string;
    namaMatakuliah: string;
    kelas: string;
    statusAsesmen: false;
    statusNilai: true;
    statusPortfolio: true;
}

type dataAccessor = "" | "kurikulum" | "kodeMatakuliah" | "namaMatakuliah" | "kelas" | "statusAsesmen" | "statusNilai" | "statusPortfolio"

const tableHeading: Array<{label:string ; accessor: dataAccessor; sortable:boolean}> = [
    { label: "Kurikulum", accessor: "kurikulum", sortable: true},
    { label: "Kode Matakuliah", accessor: "kodeMatakuliah", sortable: true},
    { label: "Nama Matakuliah", accessor: "namaMatakuliah", sortable: true},
    { label: "Kelas", accessor: "kelas", sortable: true},
    { label: "Status Asesmen", accessor: "statusAsesmen", sortable: false},
    { label: "Status Nilai", accessor: "statusNilai", sortable: false},
    { label: "Status Portfolio", accessor: "statusPortfolio", sortable: false},
]

const DataStatus = () => {

    const [dataStatusReports, setDataStatusReport] = useState<Array<IDataStatusReportParams>>([])
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
            const sorted = [...dataStatusReports].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
             return (
              a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
               numeric: true,
              }) * (sortOrder === "asc" ? 1 : -1)
             );
            });
            setDataStatusReport(sorted);
           }
    }

    useEffect(() => {
        const fetchData = async() => {
            const {data} = await http.get("/data_status.json");
            setDataStatusReport(data)
        }
        fetchData()

    }, [])

    return (
        <>
        
        <AdminAppShell>
            <div className="h-full flex flex-col">
                <Group position="apart">
                    <div className="relative" >
                        <PageTitle>Laporan Status Pendataan</PageTitle>
                        <Text color={"secondary-text"}>Lihat seluruh status pendataan CPL Matakuliah</Text>
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
                                                {head.sortable && index !== tableHeading.length - 1 &&  (
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
                            {dataStatusReports.length !== 0 ? (
                                dataStatusReports.map((dataStatus, index) => (
                                    <tr key={index} className="text-primary-text-500">
                                        <td>{dataStatus.kurikulum}</td>
                                        <td>{dataStatus.kodeMatakuliah}</td>
                                        <td>{dataStatus.namaMatakuliah}</td>
                                        <td>{dataStatus.kelas}</td>
                                        <td className="text-center">{dataStatus.statusAsesmen ? (
                                            <span className="flex items-center w-fit  bg-[#1E9E6380] text-[#1E9E63] px-3 py-1 rounded-full"><CheckmarkOutline color="#1E9E63" /> Sudah</span>
                                            ) : (
                                                <span className="flex items-center w-fit  bg-[#F8C2C580] text-error-500 px-3 py-1 rounded-full"><CloseOutline color={IconColorScheme.error} /> Belum</span>)}</td>
                                        <td className="text-center">{dataStatus.statusNilai ? (
                                            <span className="flex items-center w-fit  bg-[#1E9E6380] text-[#1E9E63] px-3 py-1 rounded-full"><CheckmarkOutline color="#1E9E63" /> Sudah</span>
                                            ) : (
                                                <span className="flex items-center w-fit  bg-[#F8C2C580] text-error-500 px-3 py-1 rounded-full"><CloseOutline color={IconColorScheme.error} /> Belum</span>)}</td>
                                        <td className="text-center">{dataStatus.statusPortfolio? (
                                            <span className="flex items-center w-fit  bg-[#1E9E6380] text-[#1E9E63] px-3 py-1 rounded-full"><CheckmarkOutline color="#1E9E63" /> Download</span>
                                            ) : (
                                                <span className="flex items-center w-fit  bg-[#F8C2C580] text-error-500 px-3 py-1 rounded-full"><CloseOutline color={IconColorScheme.error} /> Belum</span>)}</td>            
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

export default DataStatus;