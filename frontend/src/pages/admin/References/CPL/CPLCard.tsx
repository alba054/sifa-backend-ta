import { Button, Group, Table, Text } from '@mantine/core'
import { AddFilled, DeletFilled, EditFilled } from '../../../../assets/Icons/Fluent';
import { useState } from 'react';

const CPLCard = () => {
    return (
        <>
            <div className=" w-full">
                <div className="h-3 w-full bg-gradient-to-r from-primary-500 to-error-500 rounded-t-full"/>
                <div className="border-[1px] border-t-0 rounded-md border-[#dfdfdf]">
                    <div className="flex justify-between flex-col md:flex-row space-y-2 md:space-y-0 md:items-center px-5 py-2">
                        <div className='flex items-center space-x-5'>
                            <Text size={24} color="primary-text" weight={600}>Capaian Pembelajaran Lulusan</Text>
                            <span className='bg-[#e5e7eb] text-primary-text-500 font-semibold inline-block px-5 py-1 rounded-full'>2018</span>
                        </div>
                        <Button 
                            leftIcon={<AddFilled color='white' size={24} />} 
                            className="bg-primary-500 hover:bg-primary-700" 
                        >
                            Tambah Data
                        </Button>
                    </div>
                    <hr className='border-0 bg-[#dfdfdf] h-[1px] w-full' />
           
                    <div className="grow basis-0 block overflow-x-auto whitespace-nowrap overflow-y-auto">
                    <Table className={`h-5/6 w-full`} verticalSpacing={"sm"}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Kelompok</th>
                                <th>Capaian Pembelajaran</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='text-primary-text-500'>
                            <tr>
                                <td className='text-center'>1</td>
                                <td className='text-center'>
                                    Sikap
                                </td>
                                <td>
                                    Be able to show attitude with cultural sensitivity based on ethical principles and nursing legal aspects.
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
                                <td className='text-center'>2</td>
                                <td className='text-center'>
                                    Pengetahuan
                                </td>
                                <td className='whitespace-normal'>
                                    To master nursing concept, theory and management principles in providing nursing care to client in clinical and community settings based on research findings.
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
        </>
    )
}

export default CPLCard;