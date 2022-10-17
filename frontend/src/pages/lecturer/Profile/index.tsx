import { Stack, Title } from "@mantine/core";
import LecturerAppShell from "../../../layouts/LecturerAppShell";
import BioCard from "./BioCard";
import PasswordChangeCard from "./PasswordChangeCard";

const Profile = () => {
    return (
        <LecturerAppShell>
            <Stack spacing={"xl"}>
                <Title color={"primary-text"} size={32} weight={600}>Pengaturan Profile</Title>
                <BioCard />
                <PasswordChangeCard />
            </Stack>
        </LecturerAppShell>
    )
}

export default Profile;