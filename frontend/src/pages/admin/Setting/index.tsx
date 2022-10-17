import { Text, Button, Group, Table, TextInput, MediaQuery, Pagination, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownOutline, ArrowUpOutline, CalendarEmptyOutline, IconColorScheme, SearchFilled, FilterFilled, BookInformationFilled, EditFilled, DeletFilled } from "../../../assets/Icons/Fluent";
import PageSubTitle from "../../../components/PageSubTitle";
import PageTitle from "../../../components/PageTitle";
import http from "../../../config/http";
import AdminAppShell from "../../../layouts/AdminAppShell";

interface IUsersParams{
    nip: string;
    nama: string;
    email: string;
    jabatan: string;
    status: "Aktif" | "Tidak Aktif"
}

type dataAccessor = "" | "nip" | "nama" | "email" | "jabatan" | "status"

const tableHeading: Array<{label:string ; accessor: dataAccessor; sortable:boolean}> = [
    { label: "NIP", accessor: "nip", sortable: true},
    { label: "Nama", accessor: "nama", sortable: true},
    { label: "Email", accessor: "email", sortable: true},
    { label: "Jabatan", accessor: "jabatan", sortable: true},
    { label: "Status", accessor: "status", sortable: true},
    { label: "Aksi", accessor: "", sortable: false},
]

const Settings = () => {

    const [users, setUsers] = useState<Array<IUsersParams>>([])
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
            const sorted = [...users].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
             return (
              a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
               numeric: true,
              }) * (sortOrder === "asc" ? 1 : -1)
             );
            });
            setUsers(sorted);
           }
    }

    useEffect(() => {
        const fetchData = async() => {
            const {data} = await http.get("/users.json");
            setUsers(data)
        }
        fetchData()

    }, [])

    return (
        <>
        
        <AdminAppShell>
            <div className="h-full flex flex-col">
                <Group position="apart">
                    <div className="relative" >
                        <PageTitle>Manajemen Pengguna</PageTitle>
                        <PageSubTitle>Kelola data pengguna.</PageSubTitle>
                    </div>
                    <Group align={"center"} noWrap> 
                        <TextInput className="w-full" placeholder="Search..." icon={<SearchFilled color={IconColorScheme.secondaryText} />}/>
                        <Button 
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
                                            textAlign: index === tableHeading.length -1 ? 'center' : 'left',
                                            position: "sticky",
                                            top: 0,
                                            zIndex: 1,
                                            background: "white",
                                            cursor: "pointer"
                                        }}
                                            key={head.accessor}
                                            onClick={head.sortable ? () => handleSortingChange(head.accessor) : undefined}
                                            >
                                            <Group spacing={"sm"} align="center" noWrap position={`${index === tableHeading.length -1 ? "center" : 'left'}`} >
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
                            {users.length !== 0 ? (
                                users.map((user, index) => (
                                    <tr key={user.nip} className="text-primary-text-500">
                                        <td>{user.nip}</td>
                                        <td>{user.nama}</td>
                                        <td>{user.email}</td>
                                        <td>{user.jabatan}</td>
                                        <td>{user.status}</td>
                                        <td className="text-center">
                                            <div className="flex space-x-2">
                                                <Link to="#">
                                                    <span className="w-11 h-8 flex items-center justify-center rounded-md space-x-2 bg-primary-500">
                                                        <BookInformationFilled size={20} color="#fff" />
                                                    </span>
                                                </Link>
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
        </>
    )
}

export default Settings;