import { Button, Stack } from "@mantine/core";
import { useState } from "react";
import PageSubTitle from "../../../../components/PageSubTitle";
import PageTitle from "../../../../components/PageTitle";
import AdminAppShell from "../../../../layouts/AdminAppShell";
import CourseCard from "./CourseCard";
import AssessmentCard from "./AssessmentCard";

const RPS = () => {

    const [activeTab, setActiveTab] = useState<"2018"| "2019" | "2020">("2018")

    return(
        <AdminAppShell>
            <Stack spacing={0}>
                <PageTitle>Penilaian Matakuliah pada RPS</PageTitle>
                <PageSubTitle>Kelola data aturan penilaian mata kuliah pada RPS.</PageSubTitle>
            </Stack>
            <section>
                <div className="mt-10">
                    <div className="flex flex-col lg:flex-row lg:space-x-3 space-y-5 lg:space-y-0">
                        <CourseCard />
                        <AssessmentCard />
                    </div>
                </div>
            </section>
        </AdminAppShell>
    )
}
export default RPS;