import { Stack } from "@mantine/core";
import PageSubTitle from "../../../../components/PageSubTitle";
import PageTitle from "../../../../components/PageTitle";
import AdminAppShell from "../../../../layouts/AdminAppShell";
import CourseCard from "./CourseCard";
import CurriculumCard from "./CurriculumCard";

const Curriculum = () => {
    return (
        <AdminAppShell>
            <Stack spacing={0}>
                <PageTitle>Kurikulum Matakuliah</PageTitle>
                <PageSubTitle>Kelola data kurikulum matakuliah.</PageSubTitle>
            </Stack>
            <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row mt-5 justify-between max-w-full">
                <CourseCard />
                <CurriculumCard />
            </div>
        </AdminAppShell>
    )
}

export default Curriculum;