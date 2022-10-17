import {Radio, Stack, useMantineTheme, Title, Group} from "@mantine/core";
import React, { useState } from "react";
import { IconColorScheme, InfoOutline } from "../../../assets/Icons/Fluent";
import { TextInput } from "../../../components/FormInput";
import InputModal from "../../../components/InputModal";

interface INewAccreditationModal {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
};

interface IUploadFileRadioProps{
    files: Array<File> | undefined
    setFiles: React.Dispatch<React.SetStateAction<Array<File> | undefined>>;
    selected: string;
}

interface ICreateFolderProps{
    folderName: string;
    setFolderName: React.Dispatch<React.SetStateAction<string>>;
    selected: string;
}

const UploadFileRadio = ({files, setFiles, selected}: IUploadFileRadioProps) => {

    const theme = useMantineTheme();

    return (
        <Stack className="w-full" spacing={4}>
            <Title size={16} weight={600} color="primary-text">Tambahkan file</Title>
            <div className="border-2 border-[#dfdfdf] rounded-md min-w-0 w-full px-5 py-3 flex ">
                <p className="whitespace-nowrap overflow-hidden min-w-0 text-ellipsis w-full">
                    {
                        files ? files.map((file,index) => {
                            return (
                                file.name + (index === files.length - 1 ? "" : ", ")
                            )
                        }) : (
                            <span className="text-divider-500 font-semibold text-base">Nama Dokumen</span>
                        )
                    }
                </p>
            </div>
            <Group spacing={10} mt={5} pl="xl">
                <InfoOutline color={IconColorScheme.secondaryText} size={20} />
                <span className="text-secondary-text-500">File (pdf, doc, docx, xls, xlsx, ppt, pptx) </span>
            </Group>
            
            <label className="bg-[#B5C2D199] text-primary-text-500 font-bold w-fit px-2 py-1 rounded-md mt-3 cursor-pointer">
                Browse
                <input 
                    type={"file"} 
                    className="hidden" 
                    multiple 
                    disabled={selected !== "file"} 
                    onChange={(e) => {
                        if(e.target.files){
                            const arr = Array.from(e.target.files)
                            setFiles(arr)
                        }
                    }} />
            </label>
            
        </Stack>
    )
}


const CreateFolder = ({folderName, setFolderName, selected}: ICreateFolderProps) => {
    return (
        <Stack className="w-full" spacing={4}>
            <Title size={16} weight={600} color="primary-text">Tambahkan folder</Title>
            <TextInput 
                value={folderName} 
                onChange={(e) => setFolderName(e.target.value)} 
                placeholder="Tambahkan Folder" 
                disabled={selected !== "folder"} 
            />
        </Stack>
    )
}

const NewAccreditationModal = ({opened, setOpened}: INewAccreditationModal) => {

    const [files, setFiles] = useState<Array<File> | undefined>(undefined)
    const [folderName, setFolderName] = useState<string>("")
    const [selectedRadio, setSelectedRadio] = useState<string>("file")


    return (
        <InputModal
            title="Tambah Data Akreditasi"
            opened={opened}
            setOpened={setOpened}
        >
            <Radio.Group
                value={selectedRadio}
                onChange={setSelectedRadio}
            >
                <Radio 
                    color={"primary-text"} 
                    label={<UploadFileRadio files={files}  selected={selectedRadio}
                    setFiles={setFiles} />} 
                    value={"file"} 
                    styles={
                        {
                            radioWrapper: {
                                width: "100%",
                                alignItems: "start"
                            },
                            label: {
                                width: "100%"
                            },
                        }
                    }
                />

                <Radio 
                    color={"primary-text"} 
                    label={<CreateFolder selected={selectedRadio} folderName={folderName} 
                    setFolderName={setFolderName} />} 
                    value={"folder"} 
                    styles={
                        {
                            radioWrapper: {
                                width: "100%",
                                alignItems: "start"
                            },
                            label: {
                                width: "100%"
                            },
                        }
                    }
                />
            </Radio.Group>
        </InputModal>
    )
}

export default NewAccreditationModal;