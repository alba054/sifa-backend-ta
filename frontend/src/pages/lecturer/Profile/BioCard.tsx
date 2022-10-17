import { Avatar, Button, Group, Stack, Title, Text, MediaQuery } from "@mantine/core";
import { TextInput } from "../../../components/Input";

const BioCard = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="h-[10px] md:h-auto w-full md:w-[10px] rounded-t-full md:rounded-t-none md:rounded-l-full bg-primary-500" />
            <div className="py-5 px-5 shadow-md rounded-b-md md:rounded-b-none md:rounded-r-lg  w-full space-y-10">
                <MediaQuery styles={{textAlign: "center"}} smallerThan="md" >
                    <Title weight={700} size={24} color="primary-text">Detail Profil</Title>
                </MediaQuery>
                <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-5 lg:space-x-10">
                    <Avatar src={"https://images.unsplash.com/photo-1484588168347-9d835bb09939?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"} alt="avatar" radius={99} size={140} />
                    <span className="text-base text-secondary-text-500 md:hidden">*Ukuran gambar harus memiliki rasio 1:1, maksimal 500kb, dan berekstensi .png atau .jpg/.jpeg</span>
                    <div className="flex flex-col w-full space-y-3">
                        <div className="w-full md:space-x-5 space-y-5 md:space-y-0">
                            <Button 
                                className="bg-[#5f5af71a] hover:bg-[#5f5af780] text-primary-500 w-full md:w-fit"
                            >
                                Upload Foto Profil
                            </Button>
                            <Button 
                                variant="outline" 
                                color={"error"}
                                className="w-full md:w-fit"
                            >
                                Hapus Foto Profil
                            </Button>
                        </div>
                        <span className="text-base text-secondary-text-500 hidden md:inline">*Ukuran gambar harus memiliki rasio 1:1, maksimal 500kb, dan berekstensi .png atau .jpg/.jpeg</span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0">
                    <div className="w-full md:w-1/2 md:pr-3">
                        <TextInput 
                            label="Nama" 
                            value={"Drs. John Doe"} 
                            readonly
                        />
                    </div>
                    <div className="w-full md:w-1/2 md:pl-3">
                        <TextInput 
                            label="NIP"
                            value={197710202003122001}
                            readonly
                        />
                    </div>
                </div>
            </div >
        </div>
    )
}
export default BioCard;