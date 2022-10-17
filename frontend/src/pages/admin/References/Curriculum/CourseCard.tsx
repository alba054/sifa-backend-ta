import { Button, Group, Stack, Table, Text } from '@mantine/core'
import { AddFilled, DeletFilled, EditFilled } from '../../../../assets/Icons/Fluent';
import { useState } from 'react';
import NewCourseModal from './NewCourseModal';
const CourseCard = () => {

    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const tableHeading = [
        "Kode",
        "Matakuliah",
        "CPMK",
        ""
    ]

    return (
        <>
            <div className="lg:max-w-[712px] w-full">
                <div className="h-3 w-full bg-gradient-to-r from-primary-500 to-error-500 rounded-t-full"/>
                <div className="border-[1px] border-t-0 rounded-md border-[#dfdfdf]">
                    <div className="flex justify-between flex-col md:flex-row space-y-2 md:space-y-0 md:items-center px-5 py-2">
                        <div className='flex items-center space-x-2'>
                            <Text size={24} color="primary-text" weight={600}>Matakuliah</Text>
                            <span className='text-primary-text-500 font-semibold bg-[#e5e7eb] inline-block px-3 py-1 text-sm rounded-full'>2018</span>
                        </div>
                        <div className='flex items-center space-x-5'>
                        <span className='text-primary-500 bg-[#e5e7eb] inline-block px-3 py-1 text-sm rounded-md'>CPMK</span>
                            <Button 
                                leftIcon={<AddFilled color='white' size={24} />}            
                                className="bg-primary-500 hover:bg-primary-700 w-full lg:w-fit" 
                                onClick={() => setModalOpened(true)} 
                            >   
                                Tambah Data
                            </Button>
                        </div>
                    </div>
                    <hr className='border-0 bg-[#dfdfdf] h-[1px] w-full' />
                    <div className='px-5 py-3'>
                        <Table className={` border-divider-500 h-5/6 w-full`} verticalSpacing={"sm"}>
                            <thead>
                                <tr>
                                    {
                                        tableHeading.map((head,index) => (
                                            <th style={{
                                                textAlign: 'left',
                                                position: "sticky",
                                                top: 0,
                                                zIndex: 1,
                                                background: "white",
                                                cursor: "pointer"
                                            }}
                                                key={index}
                                                >
                                                    {head}
                                            </th>    
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        070U003
                                    </td>
                                    <td>
                                        <Stack spacing={5}>
                                            <Group spacing={5}>
                                                <span 
                                                    className='inline-block px-1 rounded-full text-[#EAB308] font-semibold text-[8px] bg-[#FEF08A]'>
                                                    3 SKS
                                                </span>

                                                <span 
                                                    className='inline-block px-1 rounded-full text-[#84CC16] font-semibold text-[8px] bg-[#D9F99D]'>
                                                    W
                                                </span>
                                            </Group>
                                            <Text>Pendidikan Agama</Text>
                                        </Stack>
                                    </td>
                                    <td>
                                        <ol>
                                            <li>Lorem ipsum doler sit amet</li>
                                            <li>Lorem ipsum doler sit amet</li>
                                        </ol>
                                    </td>
                                    <td>
                                        <div className='flex items-center space-x-3'>
                                            <button className='w-10 h-10 flex items-center justify-center rounded-md bg-[#84CC16]'>
                                                <EditFilled color='white' size={20} />
                                            </button>
                                            <button className='w-10 h-10 flex items-center justify-center rounded-md bg-error-500'>
                                                <DeletFilled color='white' size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        080U002
                                    </td>
                                    <td>
                                        <Stack spacing={5}>
                                            <Group spacing={5}>
                                                <span 
                                                    className='inline-block px-1 rounded-full text-[#EAB308] font-semibold text-[8px] bg-[#FEF08A]'>
                                                    3 SKS
                                                </span>

                                                <span 
                                                    className='inline-block px-1 rounded-full text-[#84CC16] font-semibold text-[8px] bg-[#D9F99D]'>
                                                    W
                                                </span>
                                            </Group>
                                            <Text>Bahasa Indonesia</Text>
                                        </Stack>
                                    </td>
                                    <td>
                                        <ol>
                                            <li>Lorem ipsum doler sit amet</li>
                                            <li>Lorem ipsum doler sit amet</li>
                                        </ol>
                                    </td>
                                    <td>
                                        <div className='flex items-center space-x-3'>
                                            <button className='w-10 h-10 flex items-center justify-center rounded-md bg-[#84CC16]'>
                                                <EditFilled color='white' size={20} />
                                            </button>
                                            <button className='w-10 h-10 flex items-center justify-center rounded-md bg-error-500'>
                                                <DeletFilled color='white' size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <NewCourseModal
                opened={modalOpened}
                setOpened={setModalOpened}
            />
        </>
    )
}

export default CourseCard;