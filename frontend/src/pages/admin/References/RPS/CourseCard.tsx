import { Group, Table, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { LG_AND_WIDER } from '../../../../utils/const/Screen';

const CPMKCard = () => {

    const lgScreenAndGreater = useMediaQuery(LG_AND_WIDER);

    return (
        <>
            <div className="lg:max-w-[565px] w-full">
                <div className="h-3 w-full bg-gradient-to-r from-primary-500 to-error-500 rounded-t-full"/>
                <div className="border-[1px] border-t-0 rounded-md border-[#dfdfdf]">
                    <div className="flex justify-between flex-col md:flex-row space-y-2 md:space-y-0 md:items-center px-5 py-2">
                        <div className='flex items-center space-x-5'>
                            <Text size={24} color="primary-text" weight={600}>Matakuliah</Text>
                        </div>
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
                                <th style={{ textAlign: "center"}}>Nilai</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='text-primary-text-500'>
                            <tr>
                                <td className='font-semibold text-center'>1</td>
                                <td>070U003</td>
                                <td>Pendidikan Agama</td>
                                <td className='text-center'>10.0</td>
                                <td>
                                    <Group position='center'>
                                        <span className='inline-block px-3 py-1 rounded-md font-bold text-primary-500 bg-[#C4C2F899]'>Buka</span>
                                    </Group>
                                </td>
                            </tr>
                            <tr>
                                <td className='font-semibold text-center'>2</td>
                                <td>077U002</td>
                                <td>Kewarganegaraan</td>
                                <td className='text-center'></td>
                                <td>
                                    <Group position='center'>
                                        <span className='inline-block px-3 py-1 rounded-md font-bold text-divider-500 bg-[#B5C2D11a]'>Buka</span>
                                    </Group>
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

export default CPMKCard;