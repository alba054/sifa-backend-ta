import { Button, Group, MediaQuery, Pagination, Stack, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { ArrowDownOutline, CalendarEmptyOutline, FilterFilled, IconColorScheme, SearchFilled } from "../../../assets/Icons/Fluent";
import LecturerAppShell from "../../../layouts/LecturerAppShell";
import http from '../../../config/http';
import { TextInput } from "../../../components/Input";
import Modal from "./Modal";
import { Link } from "react-router-dom";

interface IMarkParams{
    id: string;
    semester: string;
    major: string;
    class: string;
    courseName: string;
    credit: number;
    minimumSemester: number;
    mandatory: boolean
}

const tableHeading = [
    "Semester", "Program Studi", "Nama Kelas", "Nama Matakuliah", "SKS", "Sem. Kur.", "Sifat", "Aksi"
]

const Home = () => {
    const [marks, setMarks] = useState<Array<IMarkParams>>([])

    const [modalOpened, setModalOpened] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async() => {
            const {data} = await http.get("/marks.json");
            setMarks(data)
        }
        fetchData()

    }, [])

    return (
        <LecturerAppShell>
            <div className="h-full flex flex-col">
                <Group position="apart">
                    <div className="relative" >
                        <Text size={32} weight={600} color={"primary-text"} >Nilai Dosen</Text>
                        <Text color={"secondary-text"}>Kelola daftar matakuliah yang diampu.</Text>
                        <Text className="absolute top-3 -right-10 bg-[#e5e7eb] px-3 font-semibold text-primary-text-500 rounded-full">{marks.length} Matakuliah</Text>
                    </div>
                    <Group align={"center"}> 
                        <Button onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                            setModalOpened(true)
                        }} compact className="bg-primary-500 hover:bg-primary-700 h-12 w-[105px] rounded-md">
                            <FilterFilled color="#fff" />
                            <span className="ml-2 font-bold">Filter</span>
                        </Button>
                        <TextInput  placeholder="Search..." icon={<SearchFilled color={IconColorScheme.secondaryText} />}/>
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
                                        }}>
                                            <Group spacing={"sm"} align="center" noWrap position="center">
                                                {head}
                                                {index !== tableHeading.length - 1 && <ArrowDownOutline size={16} color={IconColorScheme.primaryText} />}
                                            </Group>
                                        </th>    
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {marks.length !== 0 ? (
                                marks.map(mark => (
                                    <tr key={mark.id} className="text-primary-text-500">
                                        <td>{mark.semester}</td>
                                        <td>{mark.major}</td>
                                        <td>{mark.class}</td>
                                        <td>{mark.courseName}</td>
                                        <td className="text-center">{mark.credit}</td>
                                        <td className="text-center">{mark.minimumSemester}</td>
                                        <td className="text-center">{mark.mandatory ? "W" : "P"}</td>
                                        <td className="text-center">
                                            <Link to="penilaian">
                                                <span className="inline-block w-[86px] text-center text-primary-500 font-bold bg-[#c4c2f899] rounded-l-sm">Penilaian</span>
                                            </Link>
                                            <Link to="portfolio">
                                                <span className="inline-block w-[86px] text-center text-error-500 font-bold bg-[#f8c2c599] rounded-r-sm">Portfolio</span>
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
            <Modal 
                opened={modalOpened} 
                setOpened={setModalOpened} 
            />
        </LecturerAppShell>
    )
}

export default Home;