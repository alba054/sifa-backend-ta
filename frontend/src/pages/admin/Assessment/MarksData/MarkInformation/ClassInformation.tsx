import {Text, Table, Group} from "@mantine/core";
import { BookInformationOutline } from "../../../../../assets/Icons/Fluent";

const ClassInformation = () => {
    return (
        <>
            <div className="rounded-t-lg w-full bg-primary-500 h-[72px] flex items-center px-8">
                <BookInformationOutline color="#fff" className="mr-3" />
                <Text color="white" size={22} weight={600}>Informasi Kelas</Text>
            </div>
            <div className="flex-1 block overflow-x-auto whitespace-nowrap border-2 rounded-b-md border-[#dfdfdf] border-t-0">
                <Table striped verticalSpacing={"sm"} className="text-primary-text-500">
                    <tbody>
                        <tr>
                            <td className="text-left font-bold">Nama Matakuliah</td>
                            <td className="text-[16px]">: Ilmu Biomedik Dasar</td>
                        </tr>
                        <tr>
                            <td className="text-left font-bold">Kode Matakuliah</td>
                            <td className="text-[16px]">: 21H01110105</td>
                        </tr>
                        <tr>
                            <td className="text-left font-bold">Nama Kelas</td>
                            <td className="text-[16px]">: A</td>
                        </tr>
                        <tr>
                            <td className="text-left font-bold">Aturan Penilaian</td>
                            <td className="text-[16px]">
                                <Group spacing={"xs"} className="cursor-pointer" align={"center"}>
                                    : Ditentukan Dosen
                                </Group></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ClassInformation;