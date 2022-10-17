import { Button, Table, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { AddFilled, DeletFilled, EditFilled } from '../../../../assets/Icons/Fluent';
import { LG_AND_WIDER } from '../../../../utils/const/Screen';

const CPMKCard = () => {

    const lgScreenAndGreater = useMediaQuery(LG_AND_WIDER);

    return (
        <>
            <div className="lg:max-w-[883px] xl:max-w-full w-full" style={{
                flexGrow:  lgScreenAndGreater ? 3 : 1,
            }}>
                <div className="h-3 w-full bg-gradient-to-r from-primary-500 to-error-500 rounded-t-full"/>
                <div className="border-[1px] border-t-0 rounded-md border-[#dfdfdf]">
                    <div className="flex justify-between flex-col md:flex-row space-y-2 md:space-y-0 md:items-center px-5 py-2">
                        <div className='flex items-center space-x-5'>
                            <Text size={24} color="primary-text" weight={600}>Capaian Pembelajaran Matakuliah</Text>
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
                                <th style={{
                                    textAlign: "center"
                                }}>No</th>
                                <th>Kode</th>
                                <th>Matakuliah</th>
                                <th style={{
                                    textAlign: "center"
                                }}>CPL-1</th>
                                <th style={{
                                    textAlign: "center"
                                }}>CPL-2</th>
                                <th style={{
                                    textAlign: "center"
                                }}>CPL-3</th>
                                <th style={{
                                    textAlign: "center"
                                }}>CPL-4</th>
                                <th style={{
                                    textAlign: "center"
                                }}>CPL-5</th>
                                <th style={{
                                    textAlign: "center"
                                }}>CPL-6</th>
                                <th style={{
                                    textAlign: "center"
                                }}>CPL-7</th>
                                <th style={{
                                    textAlign: "center"
                                }}>CPL-8</th>
                                <th style={{
                                    textAlign: "center"
                                }}>CPL-9</th>
                                <th style={{
                                    textAlign: "center"
                                }}>CPL-10</th>
                            </tr>
                        </thead>
                        <tbody className='text-primary-text-500'>
                            <tr>
                                <td className='text-center font-bold'>1</td>
                                <td>070U003</td>
                                <td>Pendidikan Agama</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className='text-center font-bold'>2</td>
                                <td>077U002</td>
                                <td>Kewarganegaraan</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                </div>
            </div>
        </>
    )
}

export default CPMKCard;