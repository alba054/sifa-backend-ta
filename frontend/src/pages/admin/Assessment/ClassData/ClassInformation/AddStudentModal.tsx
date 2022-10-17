import { Button, Group, Modal, Radio, Select, Textarea } from "@mantine/core";
import React, { useState } from "react";
import { InfoOutline } from "../../../../../assets/Icons/Fluent";

interface IAddStudentModalProps{
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

interface RadioProps{
    selected: string
}

const AddIndividualRadio = ({selected}: RadioProps) => {
    return (
        <div className="w-full flex flex-col space-y-3">
            <label className={`${selected === "individu" ? "text-primary-text-500" : "text-secondary-text-500"}`}>Tambahkan satu per satu</label>
            <Select
                classNames={{
                    input: `border-2 ${selected ==="individu" ? "border-secondary-500" : "border-primary-500"}`
                }}
                readOnly={selected !== "individu"}
                placeholder="C017191036 - HUGO LIBERTUS OJ BICIM"
                data={[
                    { value: 'C017191036', label: "C017191036 - HUGO LIBERTUS OJ BICIM"}
                ]}
            />
        </div>
    )
}

const AddMultipleRadio = ({selected}: RadioProps) => {
    return (
        <div className="w-full flex flex-col space-y-3">
            <label className={`${selected === "multi" ? "text-primary-text-500" : "text-secondary-text-500"}`}>Tambah semua berdasarkan NIM</label>
            <Textarea 
                readOnly={selected !== "multi"}
                minRows={6} 
                maxRows={6} 
                styles={{
                input: {
                    ":focus": {
                        border: "2px solid #5f5af7"
                    },
                    border: "2px  solid #dfdfdf"
                }
            }} />
            <Group spacing={5} className={""}>
                <InfoOutline color="#3b82f6" />
                <span className="text-[#3b82f6]">Masukkan beberapa nim yang dipisahkan oleh baris baru</span>
            </Group>
        </div>
    )
}


const AddStudentModal = ({opened, setOpened}: IAddStudentModalProps) => {

    const [selected, setSelected] = useState<string>("individu")

    return (
        <Modal 
            opened={opened} 
            onClose = {() => setOpened(false)}
            title={"Tambah Data Mahasiswa"}
            classNames={{
                modal: "max-w-[800px] w-full",
                title: "text-xl md:text-[32px] text-primary-text-500 md:py-5",
            }}
            centered
        >
            <div className="bg-[#dfdfdf] h-[2px]">
            </div>
            
            <Radio.Group
                value={selected}
                onChange={setSelected}
            >
                <Radio styles={{
                    radioWrapper: {
                        alignItems: "start",
                        width:"100%"
                    },
                    label: {
                        width: "100%"
                    }
                }} color={"primary"} value="individu" label={<AddIndividualRadio selected={selected} />} />

                <Radio styles={{
                    radioWrapper: {
                        alignItems: "start",
                        width:"100%"
                    },
                    label: {
                        width: "100%"
                    }
                }} color={"primary"} value="multi" label={<AddMultipleRadio selected={selected} />} />
            </Radio.Group>
            <Group position="right">
                <Button variant="outline" color={"primary"}>Batal</Button>
                <Button className="bg-primary-500 text-white font-bold hover:bg-primary-700">Terapkan</Button>
            </Group>
        </Modal>
    )
}

export default AddStudentModal;