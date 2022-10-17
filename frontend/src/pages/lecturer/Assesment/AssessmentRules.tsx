import {Button, Table, Text} from '@mantine/core';
import { AddFilled, TextBulletListSquareEditOutline } from '../../../assets/Icons/Fluent';
const AssessementRules = () => {
    return (
        <>
            <div className="rounded-t-lg w-full bg-error-500 h-[72px] flex items-center justify-between px-4 md:px-8">
                <div className='flex items-center'>
                    <TextBulletListSquareEditOutline color='#fff' className='mr-3' />
                    <Text color="white" size={20} weight={600}>Aturan Kelas</Text>
                </div>

                {/* <div className='flex items-center cursor-pointer'>
                    <AddFilled color='#fff' className='mr-2' />
                    <Text color="white" size={16} weight={600}>Tambah</Text>
                </div> */}
                <Button variant="subtle" leftIcon={<AddFilled color="#fff"/>} className="text-white">
                    Tambah
                </Button>
            </div>
            <div className="flex-1 block overflow-x-auto whitespace-nowrap border-2 rounded-b-md border-[#dfdfdf] border-t-0">
                <Table striped className={` ${"h-5/6"} text-primary-text-500`} verticalSpacing={"sm"}>
                    <thead>
                        <tr>
                            <th >Nama Assessmen</th>    
                            <th>Jenis Penilaian</th>
                            <th>Persentase</th>
                            <th>CPMK</th>
                            <th className='text-center'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>UTS</td>
                            <td>Ujian Tengah Semester</td>
                            <td>50%</td>
                            <td>1</td>
                            <td>
                                <span className="inline-block w-[70px] text-center text-primary-500 font-bold bg-[#c4c2f899] rounded-l-sm">Edit</span>
                                <span className="inline-block w-[70px] text-center text-error-500 font-bold bg-[#f8c2c599] rounded-r-sm">Hapus</span>
                            </td>
                        </tr>
                        <tr >
                            <td>Kehadiran</td>
                            <td>Tugas Individu</td>
                            <td>50%</td>
                            <td>2</td>
                            <td>
                                <span className="inline-block w-[70px] text-center text-primary-500 font-bold bg-[#c4c2f899] rounded-l-sm">Edit</span>
                                <span className="inline-block w-[70px] text-center text-error-500 font-bold bg-[#f8c2c599] rounded-r-sm">Hapus</span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default AssessementRules;