import { Breadcrumbs, Button, Group, MediaQuery, Pagination, Stack, Table, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownOutline, ArrowUpOutline, CalendarEmptyOutline, IconColorScheme, SearchFilled } from "../../../../../assets/Icons/Fluent";
import { TextInput } from "../../../../../components/FormInput";
import PageTitle from "../../../../../components/PageTitle";
import http from "../../../../../config/http";
import AdminAppShell from "../../../../../layouts/AdminAppShell";

interface IStudentCPlParams{
    nim: string;
    namaMahasiswa: string;
    cpl1: number;
    cpl2: number;
    cpl3: number;
  }
  
  type dataAccessor = "" | "nim" | "namaMahasiswa"
  
  const tableHeading: Array<{label:string ; accessor: dataAccessor; sortable:boolean}> = [
    { label: "No.", accessor: "", sortable: false},
    { label: "NIM", accessor: "nim", sortable: true},
    { label: "Nama Mahasiswa", accessor: "namaMahasiswa", sortable: true},
  ]


const CourseCPLDetail = () => {

  const [studentCPL, setStudentCPL] = useState<Array<IStudentCPlParams>>([])
  const [sortField, setSortField] = useState<dataAccessor>("")
  const [order, setOrder] = useState<"asc" | "desc">("asc")

  const handleSortingChange = (accessor: dataAccessor) => {
      const sortOrder = accessor === sortField && order === 'asc' ? "desc" : "asc";
      setSortField(accessor)
      setOrder(sortOrder);
      handleSorting(accessor, sortOrder) 
  }

    const handleSorting = (sortField: dataAccessor, sortOrder: string) => {
        if (sortField) {
            const sorted = [...studentCPL].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
            return (
              a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
              numeric: true,
              }) * (sortOrder === "asc" ? 1 : -1)
            );
            });
            setStudentCPL(sorted);
          }
    }

    useEffect(() => {
      const fetchData = async() => {
          const {data} = await http.get("/student_cpl.json");
          setStudentCPL(data)
      }
      fetchData()

    }, [])

    return (
        <AdminAppShell>
            <MediaQuery smallerThan={"md"} styles={{display: "none"}}>
                <Breadcrumbs>
                    <Link 
                        to={"/admin/laporan/cpl-matakuliah"}
                        className="text-primary-500 font-semibold"
                    >
                        CPL Matakuliah
                    </Link>
                    <Text  weight={600} color="primary-text">Falsafah & Teori Keperawatan (A)</Text>
                </Breadcrumbs>
            </MediaQuery>
            <MediaQuery smallerThan={"md"} styles={{
                marginTop: 0
            }}>
                <div
                    className="h-full flex flex-col"
                >
                <Stack spacing={0}>
                    <PageTitle mt={"md"}>Falsafah & Teori Keperawatan</PageTitle>
                    <Text weight={300} color="primary-text">17101R0103</Text>
                </Stack>

                <div className="bg-gradient-to-r mt-5 from-primary-500 to-error-500 w-full h-4 rounded-t-md"></div>
                <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between border-2 border-t-0 border-[#dfdfdf] items-center py-3 px-5">
                    <Group>
                      <Title order={2} weight="600" color={"primary-text"} size={24}>Daftar Mahasiswa</Title>
                      <span className='bg-[#E5E7EB] text-primary-text-500 px-3 py-1 rounded-full text-sm'>{studentCPL.length} Mahasiswa</span>
                    </Group>
                    <Group align={"center"} noWrap> 
                        <TextInput className="w-full" placeholder="Search..." icon={<SearchFilled color={IconColorScheme.secondaryText} />}/>
                    </Group>
                </div>
                <div className="grow basis-0 block overflow-x-auto whitespace-nowrap border-2 border-t-0 rounded-b-md border-[#dfdfdf] overflow-y-auto">
                    <Table className={` border-divider-500 h-5/6 w-full`} verticalSpacing={"sm"}>
                        <thead style={{
                            position: "sticky",
                            top: 0,
                            // borderBottom: "10px solid black"
                        }}>
                            <tr>
                                {
                                    tableHeading.map((head,index) => (
                                        <th rowSpan={2} style={{
                                            textAlign: 'left',
                                            paddingTop: 0,
                                            top: 0,
                                            zIndex: 1,
                                            background: "white",
                                            cursor: "pointer",
                                        }}
                                            key={head.accessor}
                                            onClick={head.sortable ? () => handleSortingChange(head.accessor) : undefined}
                                            >
                                            <Group spacing={"sm"} align="center" noWrap position={`${index === 0 ? "center" : "left"}`}>
                                                {head.label}
                                                {index !== 0 && (
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
                                <th 
                                  rowSpan={1}
                                  colSpan={4}
                                  style={{
                                    textAlign: 'center',
                                    top: 0,
                                    zIndex: 1,
                                    background: "white",
                                    cursor: "pointer"
                                  }}>
                                  CPL Matakuliah
                                </th>
                            </tr>
                            <tr>
                              <th 
                                  rowSpan={1} 
                                  style={{
                                    textAlign: 'center',
                                    top: 0,
                                    zIndex: 1,
                                    background: "white",
                                    cursor: "pointer"
                                  }}>
                                  CPL-1
                                </th>
                                <th 
                                  rowSpan={1} 
                                  style={{
                                    textAlign: 'center',
                                    top: 0,
                                    zIndex: 1,
                                    background: "white",
                                    cursor: "pointer"
                                  }}>
                                  CPL-2
                                </th>
                                <th 
                                  rowSpan={1} 
                                  style={{
                                    textAlign: 'center',
                                    top: 0,
                                    zIndex: 1,
                                    background: "white",
                                    cursor: "pointer"
                                  }}>
                                  CPL-3
                                </th>
                            </tr>
                            <hr className="w-full absolute border-0 h-[2px] bg-[#dfdfdf]" />
                        </thead>
                        <tbody>
                            {studentCPL.length !== 0 ? (
                                studentCPL.map((cpl, index) => (
                                    <tr key={index} className="text-primary-text-500">
                                        <td className="text-center">{index+1}</td>
                                        <td>{cpl.nim}</td>
                                        <td>{cpl.namaMahasiswa}</td>
                                        <td className='text-center'>{cpl.cpl1 === null ? "-" : cpl.cpl1}</td>           
                                        <td className='text-center'>{cpl.cpl2 === null ? "-" : cpl.cpl2}</td>           
                                        <td className='text-center'>{cpl.cpl3 === null ? "-" : cpl.cpl3}</td>                   
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

            </MediaQuery>
        </AdminAppShell>
    )
}

export default CourseCPLDetail;