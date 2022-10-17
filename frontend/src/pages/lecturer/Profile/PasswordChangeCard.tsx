import { Button, MediaQuery, Title } from "@mantine/core";
import { useState } from "react";
import { IconColorScheme } from "../../../assets/Icons/Fluent";
import { ColorScheme, PasswordInput } from "../../../components/Input";

interface PasswordType{
    old: string;
    new: string;
    verify: string;
}

const PasswordChangeCard = () => {
    const [passwords, setPasswords] = useState<PasswordType>({
        old: "",
        new: "",
        verify: "",
    })

    const [activePasswordField, setActivePasswordField] = useState<"old" | "new" | "verify" | "">("")
    return (
        <div className="flex flex-col md:flex-row">
            <div className="h-[10px] md:h-auto w-full md:w-[10px] rounded-t-full md:rounded-t-none md:rounded-l-full bg-secondary-text-500" />
            <div className="py-10 px-5 shadow-md rounded-b-md md:rounded-b-none md:rounded-r-lg  w-full space-y-10">
                <MediaQuery styles={{textAlign: "center"}} smallerThan="md" >
                    <Title weight={700} size={24} color="primary-text">Ganti Password</Title>
                </MediaQuery>
                <div className="flex flex-col space-y-5">
                    <div>
                        <PasswordInput
                            disableEyeIcon
                            label="Password"
                            value={passwords.old}
                            onChange={(e) => setPasswords({...passwords, old: e.target.value})}
                            color={activePasswordField === "old" ? ColorScheme.primary : undefined }
                            onFocus={() => setActivePasswordField("old")}
                            onBlur={() => setActivePasswordField("")}
                            />
                    </div>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0">
                        <div className="w-full md:w-1/2 md:pr-3">
                            <PasswordInput
                                disableEyeIcon 
                                label="Password Baru" 
                                value={passwords.new}
                                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                color={activePasswordField === "new" ? ColorScheme.primary : undefined }
                                onFocus={() => setActivePasswordField("new")}
                                onBlur={() => setActivePasswordField("")}
                                />
                        </div>
                        <div className="w-full md:w-1/2 md:pl-3">
                            <PasswordInput
                                disableEyeIcon
                                label="Ulangi Password Baru"
                                value={passwords.verify}
                                onChange={(e) => setPasswords({...passwords, verify: e.target.value})}
                                color={activePasswordField === "verify" ? ColorScheme.primary : undefined }
                                onFocus={() => setActivePasswordField("verify")}
                                onBlur={() => setActivePasswordField("")}
                            />
                        </div>
                    </div>

                </div>
                <div className="flex md:justify-end space-x-3">
                    <div className="w-1/2 md:w-fit">
                        <Button
                            size="md"
                            variant="outline"
                            color={"primary"}
                            className="font-bold w-full"
                        >
                            Batal
                        </Button>
                    </div>
                    <div className="w-1/2 md:w-fit">
                    <Button
                        size="md" 
                        className="bg-primary-500 hover:bg-primary-700 text-white font-bold w-full">Simpan</Button>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default PasswordChangeCard;