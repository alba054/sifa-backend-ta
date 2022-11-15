import { Button, Group, Modal, useMantineTheme, ButtonProps, ModalProps } from "@mantine/core";
import React from "react";

interface IInputModalProps {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
    title: React.ReactNode;
    submitButtonTitle?: string;
    onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    classNames: Partial<Record<"title"|"body"|"header"|"root"|"overlay"|"modal"|"close" | "inner", string>> | undefined;
}

const InputModal = ({opened, setOpened, title, onSubmit, submitButtonTitle="Tambah", children, classNames}:IInputModalProps) => {
    const theme = useMantineTheme();

    return (
        <Modal 
            opened={opened} 
            onClose={() => setOpened(false)}
            centered
            title={title}
            classNames={classNames}
            styles={{
                modal: {
                    maxWidth: "800px",
                    width: "100%",
                    borderRadius: theme.radius.lg
                },
                title: {
                    fontSize: 32,
                    color: theme.colors['primary-text'][5],
                },
                header: {
                    alignItems: "flex-start",
                    padding: "8px 20px"
                },
                close: {
                    fontSize: "20px !important",
                    color: theme.colors['primary-text'][5],
                    backgroundColor: `${theme.colors.secondary[5]} !important`
                }
            }} 
        >
            <hr className="-mx-5 border-[#dfdfdf]" />
            <div className="p-5">
                {children}
            </div>
            <Group position="right" mt={"md"} className="bg-[#F5F4F7] -mx-5 -mb-5  py-5 px-5 " style={{
                borderBottomLeftRadius: theme.radius.lg,
                borderBottomRightRadius: theme.radius.lg,
            }}>
                <Button variant="outline" color={"primary"} onClick={() => setOpened(false)}>
                    Batal
                </Button>
                <Button 
                    className="text-white bg-primary-500 hover:bg-primary-700 font-bold"
                    onClick={onSubmit}
                >
                    {submitButtonTitle}
                </Button>
            </Group>
        </Modal>
    )
}

export default InputModal;