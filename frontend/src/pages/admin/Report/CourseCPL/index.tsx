import {Button, Group, MediaQuery, Pagination, Stack, Table, Text, TextInput, Title} from '@mantine/core'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddFilled, ArrowDownOutline, ArrowUpOutline, CalendarEmptyOutline, IconColorScheme, SearchFilled } from '../../../../assets/Icons/Fluent';
import PageTitle from "../../../../components/PageTitle";
import http from '../../../../config/http';
import AdminAppShell from "../../../../layouts/AdminAppShell";
import RadarChart from './RadarChart';

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

const data2 = {
    labels: ['CPL-1', 'CPL-2', 'CPL-3', 'CPL-4', 'CPL-5', 'CPL-6','CPL-7', 'CPL-8', 'CPL-9', 'CPL-10'],
    datasets: [
      {
        label: '# of Votes',
        data: [75, 82, 80, 0, 95, 0, 0, 85, 80, 70],
        backgroundColor: 'rgba(95, 90, 247, 0.2)',
        borderColor: 'rgba(95, 90, 247,1)',
        borderWidth: 1,
      },
    ],
};

interface ICPLCourseParams{
  kurikulum: number;
  semester: number;
  kodeMatakuliah: string;
  namaMatakuliah: string;
  cpl1: number;
  cpl2: number;
  cpl3: number;
  cpl4: number;
}

type dataAccessor = "" | "kurikulum" | "semester" | "kodeMatakuliah" | "namaMatakuliah"

const tableHeading: Array<{label:string ; accessor: dataAccessor; sortable:boolean}> = [
  { label: "No.", accessor: "", sortable: false},
  { label: "Kurikulum", accessor: "kurikulum", sortable: true},
  { label: "Kode Matakuliah", accessor: "kodeMatakuliah", sortable: true},
  { label: "Nama Matakuliah", accessor: "namaMatakuliah", sortable: true},
]

const CourseCPL = () => {

  const [cplCourse, setCplCourse] = useState<Array<ICPLCourseParams>>([])
  const [sortField, setSortField] = useState<dataAccessor>("")
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const [modalOpened, setModalOpened] = useState<boolean>(false)
  const [lecturerDetailShown, setLecturerDetailShown] = useState<boolean>(true);

  const handleSortingChange = (accessor: dataAccessor) => {
      const sortOrder = accessor === sortField && order === 'asc' ? "desc" : "asc";
      setSortField(accessor)
      setOrder(sortOrder);
      handleSorting(accessor, sortOrder) 
  }

    const handleSorting = (sortField: dataAccessor, sortOrder: string) => {
        if (sortField) {
            const sorted = [...cplCourse].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
            return (
              a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
              numeric: true,
              }) * (sortOrder === "asc" ? 1 : -1)
            );
            });
            setCplCourse(sorted);
          }
    }

    useEffect(() => {
      const fetchData = async() => {
          const {data} = await http.get("/course_cpl.json");
          setCplCourse(data)
      }
      fetchData()

    }, [])


    return (
        <AdminAppShell>
            <div className=''>
                <PageTitle>CPL Matakuliah</PageTitle>
                <Text color={"secondary-text"}>Overview perkembangan CPL untuk setiap matakuliah</Text>

                <div className='mt-5 flex flex-col space-y-5 lg:space-y-0 lg:flex-row justify-between lg:space-x-5'>
                    <RadarChart title='Kurikulum 2018' data={data} color="blue" />
                    <RadarChart title='Kurikulum 2021' data={data2} color="red" />
                </div>
                <div className="bg-gradient-to-r mt-10 from-primary-500 to-error-500 w-full h-4 rounded-t-md"></div>
                <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between border-2 border-t-0 border-[#dfdfdf] items-center py-5 px-5">
                    <Group>
                      <Title order={2} weight="600" color={"primary-text"} size={24}>Daftar Matakuliah</Title>
                      <span className='bg-[#E5E7EB] text-primary-text-500 px-3 py-1 rounded-full text-sm'>{cplCourse.length} Matakuliah</span>
                    </Group>
                    <Group align={"center"} noWrap> 
                        <TextInput className="w-full" placeholder="Search..." icon={<SearchFilled color={IconColorScheme.secondaryText} />}/>
                    </Group>
                </div>
                <div className="grow basis-0 block max-h-[500px] overflow-x-auto whitespace-nowrap border-2 border-t-0 rounded-b-md border-[#dfdfdf] overflow-y-auto">
                    <Table className={` border-divider-500 h-5/6 w-full`} verticalSpacing={"sm"}>
                        <thead>
                            <tr>
                                {
                                    tableHeading.map((head,index) => (
                                        <th rowSpan={2} style={{
                                            textAlign: 'left',
                                            position: "sticky",
                                            top: 0,
                                            zIndex: 1,
                                            background: "white",
                                            cursor: "pointer"
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
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 1,
                                    background: "white",
                                    cursor: "pointer"
                                  }}>
                                  CPL Matakuliah
                                </th>
                                <th 
                                  rowSpan={2} 
                                  style={{
                                    textAlign: 'center',
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 1,
                                    background: "white",
                                    cursor: "pointer"
                                  }}>
                                  Aksi
                                </th>
                            </tr>
                            <tr>
                              <th 
                                  rowSpan={1} 
                                  style={{
                                    textAlign: 'center',
                                    position: "sticky",
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
                                    position: "sticky",
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
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 1,
                                    background: "white",
                                    cursor: "pointer"
                                  }}>
                                  CPL-3
                                </th>
                                <th 
                                  rowSpan={1} 
                                  style={{
                                    textAlign: 'center',
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 1,
                                    background: "white",
                                    cursor: "pointer"
                                  }}>
                                  CPL-4
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cplCourse.length !== 0 ? (
                                cplCourse.map((cpl, index) => (
                                    <tr key={index} className="text-primary-text-500">
                                        <td className="text-center">{index+1}</td>
                                        <td>{cpl.kurikulum}</td>
                                        <td>{cpl.kodeMatakuliah}</td>
                                        <td>{cpl.namaMatakuliah}</td>
                                        <td className='text-center'>{cpl.cpl1 === null ? "-" : cpl.cpl1}</td>           
                                        <td className='text-center'>{cpl.cpl2 === null ? "-" : cpl.cpl2}</td>           
                                        <td className='text-center'>{cpl.cpl3 === null ? "-" : cpl.cpl3}</td>           
                                        <td className='text-center'>{cpl.cpl4 === null ? "-" : cpl.cpl4}</td>     
                                        <td className='flex items-center justify-center' >
                                          <Button component={Link} to="tes" className='bg-[#C4C2F880] hover:bg-[#c4c2f8c7] text-primary-500'>Detail</Button>
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
        </AdminAppShell>
    )
}

export default CourseCPL;