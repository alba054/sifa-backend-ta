import { Button, Group, Modal, useMantineTheme, ButtonProps } from "@mantine/core";
import React from "react";

interface IInputModalProps {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
    title: string;
    onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
}

const InputModal = ({opened, setOpened, title, onSubmit, children}: IInputModalProps) => {
    const theme = useMantineTheme();

    return (
        <Modal 
            opened={opened} 
            onClose={() => setOpened(false)}
            centered
            title={title}
            styles={{
                modal: {
                    maxWidth: "800px",
                    width: "100%"
                },
                title: {
                    fontSize: 32,
                    color: theme.colors['primary-text'][5],
                }
            }} 
        >
            <div className="p-5">
                {children}
            </div>
            <Group position="right" mt={"md"}>
                <Button variant="outline" color={"primary"} onClick={() => setOpened(false)}>
                    Batal
                </Button>
                <Button 
                    className="text-white bg-primary-500 hover:bg-primary-700 font-bold"
                    onClick={onSubmit}
                >
                    Tambah
                </Button>   
            </Group>
        </Modal>
    )
}

export default InputModal;