import {Stack} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { NumberInput, SelectInput, TextInput } from "../../../../components/FormInput";
import InputModal from "../../../../components/InputModal";
import { useFetchWithAbort } from "../../../../hooks/useFetch";

interface INewAccreditationModal {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
};

interface LecturerParams{
    nip: string;
    nama: string;    
}

const NewCourseModal = ({opened, setOpened}: INewAccreditationModal) => {
    const [endPoint, setEndPoint] = useState<string>("/lecturers.json")
    const {fetchedData: lecturers, error, isLoading} = useFetchWithAbort<Array<LecturerParams>>(endPoint)

    const form = useForm({
        initialValues: {
            kodeMatakuliah: "",
            namaMatakuliah: "",
            semester: "",
            sks: "",
            sifat: "",
            koordinatorMatakuliah: ""
        }
    })

    return (
        <InputModal
            title="Tambah Data Matakuliah"
            opened={opened}
            setOpened={setOpened}
        >
            {
                !isLoading && (
                    <Stack>
                        <TextInput label="Kode Matakuliah" {...form.getInputProps("kodeMatakuliah")} />
                        <TextInput label="Nama Matakuliah" {...form.getInputProps("namaMatakuliah")} />
                        <NumberInput label="Semester" {...form.getInputProps("semester")} />
                        <NumberInput label="SKS" {...form.getInputProps("sks")} />
                        <NumberInput label="Semester" {...form.getInputProps("semester")} />
                        <SelectInput label="Sifat" data={[
                            { label: "W", value: "wajib"},
                            { label: "P", value: "pilihan"}
                        ]} {...form.getInputProps("sifat")} 
                        />
                        <SelectInput label="Koordinator Matakuliah" data ={lecturers?.map(lecturer => {
                            return {
                                label: `${lecturer.nip} - ${lecturer.nama}`,
                                value: lecturer.nip
                            }
                        })} {...form.getInputProps("koordinatorMatakuliah")} />
                    </Stack>

                )
            }
        </InputModal>
    )
}

export default NewCourseModal;