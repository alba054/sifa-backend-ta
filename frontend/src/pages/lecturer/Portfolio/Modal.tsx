import {
    Button, 
    Group, 
    Modal as MantineModal, 
    Stack, 
    Title,
    Text,
    TypographyStylesProvider
} from '@mantine/core'
import RichTextEditor from '@mantine/rte'
import { useState } from 'react'
import useLockOverflow from '../../../hooks/useLockcOverflow';
import styles from './Rte.module.css';
import "./styles.css"
interface IModalProps{
    isShown: boolean;
    onClose: () => void
}

const Modal = ({isShown, onClose} : IModalProps) => {
    const _ = useLockOverflow()

    const [value, setValue] = useState<string>("");
    const [mode, setMode] = useState<"edit" | "preview">("edit")
    return (
        <MantineModal 
            opened={isShown} 
            onClose={onClose}
            centered
            classNames={{
                modal: "max-w-5xl w-full md:p-5 md:px-10",
            }}
        >
            <Stack>
                <Stack spacing={10}>
                    <Title size={32} color="primary-text">Metode pembelajaran yang dilaksanakan</Title>
                    <Text color={"primary-text"}>Tekan tombol <span className="font-bold">Simpan</span> untuk menyimpan perubahan</Text>
                </Stack>

                <Button.Group>
                    <Button 
                        variant="default" 
                        className={`${mode === "edit" && "bg-[#CACCCE]"}`}
                        onClick={() => setMode("edit")}
                    >
                        Edit Text
                    </Button>
                    <Button 
                        variant="default" 
                        className={`${mode === "preview" && "bg-[#CACCCE]"}`}
                        onClick={() => setMode("preview")}

                    >
                        Preview
                    </Button>
                </Button.Group>

                {mode === "edit" ? (
                    <RichTextEditor 
                        id="rte"
                        value={value}
                        onChange={(val) =>{
                            setValue(val)
                        }} 
                        classNames={{
                            root: styles.rte_container,
                        }}
                        controls={[
                            ['bold', 'italic', 'underline', 'orderedList'],
                        ]}
                    />

                ) : (
                    <TypographyStylesProvider>
                        <div className="h-[214px] border-2 border-[#dfdfdf] rounded-xl p-5 overflow-y-auto" dangerouslySetInnerHTML={{ __html: value}}/>
                    </TypographyStylesProvider>
                )}
                <Group
                    position="right"
                    align={"center"}
                >
                    <Button 
                        variant="outline" 
                        color={"primary"}
                        className="font-bold"
                        onClick={() => {
                            onClose()
                        }}
                    >
                        Batal
                    </Button>
                    <Button
                        className ="bg-primary-500 hover:bg-primary-700 text-white font-bold"
                    >
                        Simpan
                    </Button>
                </Group>
            </Stack>
        </MantineModal>
    )
}

export default Modal