import { Stack } from "@mantine/core";
import React from "react";
import { TextInput } from "../../../components/FormInput";
import InputModal from "../../../components/InputModal";

interface INewAccreditationModal{
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const NewAccreditationTypeModal = ({opened, setOpened}: INewAccreditationModal) => {
    return  (
        <InputModal
            opened={opened}
            setOpened={setOpened}
            title="Tambah Data Jenis Akreditasi"
        >
            <Stack>
                <TextInput label="Nama Akreditasi" placeholder="Akreditasi" />
                <TextInput label="Tahun Pelaksanaan" placeholder="Tahun Pelaksanaan" />
            </Stack>
        </InputModal>
    ) 
}

export default NewAccreditationTypeModal;