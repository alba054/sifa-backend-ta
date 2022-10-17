import { Button, Stack } from "@mantine/core";
import { useState } from "react";
import PageSubTitle from "../../../../components/PageSubTitle";
import PageTitle from "../../../../components/PageTitle";
import AdminAppShell from "../../../../layouts/AdminAppShell";
import CPLCard from "./CPLCard";

const CPL = () => {

    const [activeTab, setActiveTab] = useState<"2018"| "2019" | "2020">("2018")

    return(
        <AdminAppShell>
            <Stack spacing={0}>
                <PageTitle>Capaian Pembelajaran Lulusan</PageTitle>
                <PageSubTitle>Kelola data capaian pembelajaran lulusan.</PageSubTitle>
            </Stack>
            <section>
                <div className="mt-10">
                    <Button.Group>
                        <Button className={`${activeTab === "2018" ? "bg-[#5F5AF71a] font-semibold": ""} text-primary-text-500`} onClick={() => setActiveTab("2018")} variant="default">2018</Button>
                        <Button className={`${activeTab === "2019" ? "bg-[#5F5AF71a] font-semibold": ""} text-primary-text-500`} onClick={() => setActiveTab("2019")} variant="default">2019</Button>
                        <Button className={`${activeTab === "2020" ? "bg-[#5F5AF71a] font-semibold": ""} text-primary-text-500`} onClick={() => setActiveTab("2020")} variant="default">2020</Button>
                    </Button.Group>

                    <div className="mt-5">
                        <CPLCard />
                    </div>
                </div>
            </section>
        </AdminAppShell>
    )
}
export default CPL;