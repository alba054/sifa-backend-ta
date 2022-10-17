import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { NumberInput, TextInput } from "../../../../components/FormInput";
import InputModal from "../../../../components/InputModal";

interface INewCurriculumModalProps{
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const NewCurriculumModal = ({opened, setOpened}: INewCurriculumModalProps) => {
    const form = useForm({
        initialValues: {
            kurikulum: "",
            tahun: ""
        }
    })
    
    return  (
        <InputModal
            opened={opened}
            setOpened={setOpened}
            title="Tambah Data Kurikulum"
            onSubmit={() => {
                console.log(form.values)
            }}
        >
            <Stack>
                <TextInput 
                    label="Kurikulum" 
                    placeholder="Kurikulum"
                    {...form.getInputProps("kurikulum")} 
                />

                <NumberInput 
                    label="Tahun" 
                    placeholder="Tahun Kurikulum" 
                    {...form.getInputProps("tahun")}
                />
            </Stack>
        </InputModal>
    ) 
}

export default NewCurriculumModal;