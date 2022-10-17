import { Button, Group, Table, Text } from '@mantine/core'
import { AddFilled, DeletFilled } from '../../../../assets/Icons/Fluent';
import { useState } from 'react';
import NewAccreditationTypeModal from './NewCurriculumModal';

const CurriculumCard = () => {

    const [modalOpened, setModalOpened] = useState<boolean>(false);

    return (
        <>
        
            <div className="lg:max-w-[510px] w-full">
                <div className="h-3 w-full bg-gradient-to-r from-primary-500 to-error-500 rounded-t-full"/>
                <div className="border-[1px] border-t-0 rounded-md border-[#dfdfdf]">
                    <div className="flex justify-between flex-col md:flex-row space-y-2 md:space-y-0 md:items-center px-5 py-2">
                        <div className='flex items-center space-x-2'>
                            <Text size={24} color="primary-text" weight={600}>Kurikulum</Text>
                        </div>
                        <Button leftIcon={<AddFilled color='white' size={24} />} className="bg-primary-500 hover:bg-primary-700" onClick={() => setModalOpened(true)}>Tambah Data</Button>
                    </div>
                    <hr className='border-0 bg-[#dfdfdf] h-[1px] w-full' />
                    <div className='px-5 py-3'>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Kurikulum</th>
                                    <th>Tahun</th>
                                    <th style={{
                                        textAlign: "center"
                                    }}>Aksi</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className='align-middle'>
                                    <td>Kurikulum 2018</td>
                                    <td>2018</td>
                                    <td>
                                        <Group position='center'>
                                            <span className='bg-[#C4C2F899] text-primary-500 inline-block px-2 py-1 rounded-md'>Matakuliah</span>
                                        </Group>
                                    </td>
                                    <td>
                                        <Group position='center' className='bg-error-500 rounded-md'>
                                            <span className='py-2'>
                                                <DeletFilled color='white' size={20} />
                                            </span>
                                        </Group>
                                    </td>
                                </tr>

                                <tr className='align-middle'>
                                    <td>Kurikulum 2021</td>
                                    <td>2021</td>
                                    <td>
                                        <Group position='center'>
                                            <span className='bg-[#B5C2D11a] text-divider-500 inline-block px-2 py-1 rounded-md'>Matakuliah</span>
                                        </Group>
                                    </td>
                                    <td>
                                        <Group position='center' className='bg-error-500 rounded-md'>
                                            <span className='py-2'>
                                                <DeletFilled color='white' size={20} />
                                            </span>
                                        </Group>
                                    </td>
                                </tr>

                                <tr className='align-middle'>
                                    <td>Kurikulum 2022</td>
                                    <td>2022</td>
                                    <td>
                                        <Group position='center'>
                                            <span className='bg-[#B5C2D11a] text-divider-500 inline-block px-2 py-1 rounded-md'>Matakuliah</span>
                                        </Group>
                                    </td>
                                    <td>
                                        <Group position='center' className='bg-error-500 rounded-md'>
                                            <span className='py-2'>
                                                <DeletFilled color='white' size={20} />
                                            </span>
                                        </Group>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <NewAccreditationTypeModal 
                opened={modalOpened}
                setOpened={setModalOpened}
            />
        </>
    )
}

export default CurriculumCard;