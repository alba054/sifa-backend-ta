import { Button, Table, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { AddFilled, DeletFilled, EditFilled } from '../../../../assets/Icons/Fluent';

const CPMKInfoCardd = () => {

    const lgScreenAndGreater = useMediaQuery("(min-width: 1024px)")

    return (
        <>
            <div className="lg:max-w-[363px] w-full" style={{
                flexGrow: 1,
                maxWidth: lgScreenAndGreater ? "363px" : "100%"
            }}>
                <div className="h-3 w-full bg-gradient-to-r from-primary-500 to-error-500 rounded-t-full"/>
                <div className="border-[1px] border-t-0 rounded-md border-[#dfdfdf]">
                    <div className="flex justify-between flex-col md:flex-row space-y-2 md:space-y-0 md:items-center px-5 py-2">
                        <div className='flex items-center space-x-5'>
                            <Text size={24} color="primary-text" weight={600}>Info CPL</Text>
                        </div>
                    </div>
                    <hr className='border-0 bg-[#dfdfdf] h-[1px] w-full' />
           
                    <div className="grow basis-0 block overflow-x-auto whitespace-nowrap overflow-y-auto">
                    <Table className={`h-5/6 w-full`} verticalSpacing={"sm"}>
                        <thead>
                            <tr>
                                <th>Kode</th>
                                <th>Ranah</th>
                                <th>Kompetensi</th>
                            </tr>
                        </thead>
                        <tbody className='text-primary-text-500'>
                            <tr>
                                <td>CPL-1</td>
                                <td>Sikap</td>
                                <td className='whitespace-normal'>Be able to show attitude with cultural sensitivity based on ethical principles and nursing legal aspects.</td>
                            </tr>
                            <tr>
                                <td>CPL-2</td>
                                <td>Sikap</td>
                                <td className='whitespace-normal'>Be able to show attitude with cultural sensitivity based on ethical principles and nursing legal aspects.</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                </div>
            </div>
        </>
    )
}

export default CPMKInfoCardd;