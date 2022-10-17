import { Stack } from "@mantine/core";
import PageSubTitle from "../../../components/PageSubTitle";
import PageTitle from "../../../components/PageTitle";
import AdminAppShell from "../../../layouts/AdminAppShell";
import AccreditationCard from "./AccreditationCard";
import AccreditationTypeCard from "./AccreditationTypeCard";

const Accreditation = () => {
    return (
        <AdminAppShell>
            <Stack spacing={0}>
                <PageTitle>Dokumen Akreditasi</PageTitle>
                <PageSubTitle>Kelola data dokumen akreditasi.</PageSubTitle>
            </Stack>
            <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row mt-5 justify-between max-w-full">
                <AccreditationCard />
                <AccreditationTypeCard />
            </div>
        </AdminAppShell>
    )
}

export default Accreditation;