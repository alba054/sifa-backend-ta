import { FolderOpenFilled } from "@ant-design/icons";
import {Text} from '@mantine/core'
import { useMediaQuery } from "@mantine/hooks";
import { DeletFilled, EditFilled } from "../../../../assets/Icons/Fluent";

interface IAccreditationDetailRow{
    title: string;
}

const AccreditationDetailRow = ({title}: IAccreditationDetailRow) => {

    const mediumScreenSize = useMediaQuery("(min-width: 768px)")

    return(
        <div className='bg-[#F9FAFB] rounded-md flex p-5 space-x-2'>
            <div className='flex space-x-5 items-center flex-1 min-w-0 '>
                <FolderOpenFilled  className='text-primary-text-500 text-[30px]' />
                <Text size={mediumScreenSize ? 22 : 16} color={"primary-text"} className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</Text>
            </div>
            <div className='flex items-center space-x-3'>
                <button className='w-10 h-10 flex items-center justify-center rounded-md bg-[#84CC16]'>
                    <EditFilled color='white' size={20} />
                </button>
                <button className='w-10 h-10 flex items-center justify-center rounded-md bg-error-500'>
                    <DeletFilled color='white' size={20} />
                </button>
            </div>
        </div>
    )
}

export default AccreditationDetailRow;