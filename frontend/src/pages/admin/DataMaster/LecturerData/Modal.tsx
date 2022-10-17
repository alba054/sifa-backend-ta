import { 
    Group,
    Modal as MantineModal,
    Text,
    TextInput,
    NumberInput,
    NativeSelect,
    Button
} from '@mantine/core';

import {useForm} from '@mantine/form'

interface IMarkModalProps{
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({opened, setOpened}: IMarkModalProps) => {
    const form = useForm({
        initialValues: {
            semester: '',
            major: '',
            code: '',
            courseName: "",
            class: "",
            credit: "",
            curriculumSemester: "",
            kind: "",
        }
    })
    return (
        <MantineModal 
            opened={opened} 
            onClose={() => {
                setOpened(false)
            }}
            title="Filter Data Kelas"
            withCloseButton
            centered
            classNames={{  
                modal: "max-w-5xl w-full p-5 px-10",
                header: "mb-0",
                title: "text-primary-text-500 text-[32px]",
                close: 'text-primary-500'
            }}
        >
            <Text color={"primary-text"}>Data akan dicari berdasarkan field yang anda isi</Text>
            <form onSubmit={form.onSubmit((values) => {
                console.log(values)
            })}>
                <Group position='apart' spacing={'md'} mt="xl">
                    <NumberInput 
                        classNames={{
                            root: "w-full md:w-[179px]"
                        }} 
                        placeholder="Semester"
                        {...form.getInputProps("semester")}
                        hideControls
                    />
                    <TextInput 
                        classNames={{
                            root: "w-full md:w-[400px]"
                        }} 
                        placeholder="Program Studi"
                        {...form.getInputProps("major")} 
                    />
                    <TextInput 
                        classNames={{
                            root: "w-full md:w-[316px]"
                        }} 
                        placeholder="Kode Matakuliah" 
                        {...form.getInputProps("code")}
                    />
                    <TextInput 
                        classNames={{
                            root: "w-full md:w-[460px]"
                        }} 
                        placeholder="Nama Matakuliah"
                        {...form.getInputProps("courseName")} 
                    />
                    <TextInput 
                        classNames={{
                            root: "w-full md:w-[459px]"
                        }} 
                        placeholder="Nama Kelas" 
                        {...form.getInputProps("class")}
                    />
                    <NumberInput
                    hideControls 
                        classNames={{
                            root: "w-full md:w-[260px]"
                        }} 
                        placeholder="SKS" 
                        {...form.getInputProps("credit")}
                    />
                    <NumberInput 
                        classNames={{
                            root: "w-full md:w-[260px]"
                        }}
                        hideControls
                        placeholder="Semester Kurikulum "
                        {...form.getInputProps("curriculumSemester")} 
                    />
                    <NativeSelect 
                        classNames={{
                            root: "md:max-w-[375px]"
                        }}
                        style={{
                            width:"100%",
                            maxWidth: "375px"
                        }}
                        data={["Sifat"]}
                        placeholder="Sifat " 
                        {...form.getInputProps("kind")}
                    />
                    
                </Group>
                <Group position='right' mt={"xl"}>
                    <Button
                        variant='outline'
                        color={"primary"}
                        onClick={(e: any) => {
                            setOpened(false)
                        }}
                    >
                        Batal
                    </Button>
                    <Button className='bg-primary-500 text-white font-bold hover:bg-primary-700' type='submit'>
                        Terapkan 
                    </Button>
                </Group>
            </form>
        </MantineModal>
    )
}

export default Modal;