import { Group, MediaQuery, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookmarkMultipleFilled, ChevronDoubleRightFilled, HistoryFilled, IconColorScheme, PersonFilled, PersonOutline } from "../../../assets/Icons/Fluent";
import http from "../../../config/http";
import LecturerAppShell from "../../../layouts/LecturerAppShell";
import CourseCard from "./CourseCard";

interface ICourseParams{
    id: string;
    title: string;
    code: string;
}

const Home = () => {
    const [courses, setCourses] = useState<Array<ICourseParams>>([])
    const [dateString, setDateString] = useState<string>("")

    useEffect(() => {
        const currentTime = new Date().toLocaleTimeString('id', {
            day: '2-digit',
            month: "long",
            year: "numeric",
            hour:'2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replaceAll(".", ":")

        setDateString(currentTime)
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            const {data} = await http.get("/courses.json");
            setCourses(data)
        }
        fetchData()

    }, [])

    return (
        <LecturerAppShell>
            <MediaQuery smallerThan={"md"} styles={{display: "none"}}>
                <Group position="right">
                    <div className="bg-[#5f5af71a] py-2 px-5 rounded-full"> 
                        <Text color={"secondary-text"} size="sm">Terakhir diakses pada {dateString} </Text>
                    </div>
                </Group>
            </MediaQuery>
            <Stack>
                <Text size={32} color="primary-text" weight={600}>Home</Text>
                <Text size={20} color="primary-text" weight={600}>Selamat datang kembali 👋.</Text>
            </Stack>
            <Group position="apart" mt={"xl"}>
                <Stack justify={"space-between"} className="w-full lg:flex-1 lg:max-w-[500px] bg-primary-500 h-[203px] relative px-10 py-8 rounded-xl overflow-y-hidden">
                    <Group>
                        <PersonFilled size={56} color="#ffffff" />
                        <Text className="text-white text-2xl md:text-3xl">Profil Dosen</Text>
                    </Group>
                    <div>
                        <Text className="text-white font-bold text-2xl">Drs. John Doe</Text>
                        <Text size={"sm"} className="text-white">NIP. 197710202003122001</Text>
                    </div>
                    <PersonFilled size={175} color="#4844c8" className="absolute right-0 hidden sm:block -top-12" />
                </Stack>

                <Stack  className=" w-full lg:flex-1 lg:max-w-[500px] h-[203px] bg-error-500 relative px-10 py-8 rounded-xl overflow-y-hidden">
                    <Group>
                        <BookmarkMultipleFilled size={56} color="#ffffff" />
                        <Text size={46} className="text-white text-4xl md:text-5xl">33</Text>
                    </Group>
                    <div>
                        <Text size={24} weight={700} className="text-white">Total Matakuliah</Text>
                        <Text size={"sm"} className="text-white">24 Wajib <span className="inline-block w-2 h-2 mx-2 bg-white rounded-full"></span> 9 Pilihan</Text>
                    </div>
                    <BookmarkMultipleFilled size={175} color="#dd1e44" className="absolute right-0 hidden sm:block -top-12" />
                </Stack>
            </Group>
            <Group position="apart" className="mt-20">
                <Group spacing={"md"}>
                    <HistoryFilled color={IconColorScheme.primaryText} />
                    <Text size={20} color="primary-text" weight={700}>Riwayat Matakuliah</Text>
                </Group>
                <Link to={"/nilai"}>
                    <Group spacing={"xs"} align="center" className="cursor-pointer">
                        <Text color={"primary"}>Selengkapnya</Text>
                        <ChevronDoubleRightFilled size={13} color={IconColorScheme.primary} />
                    </Group>
                </Link>
            </Group>
            <Stack className="space-y-10" mt="xl">
                {courses.map((course, index) => (
                    <CourseCard key={course.id} title={course.title} code={course.code}  />
                ))}
            </Stack>
        </LecturerAppShell>
    )
}

export default Home;