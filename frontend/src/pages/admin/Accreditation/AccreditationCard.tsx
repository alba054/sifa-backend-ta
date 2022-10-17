import { Button, Text } from '@mantine/core'
import { AddFilled, DeletFilled, EditFilled, IconColorScheme } from '../../../assets/Icons/Fluent';
import { FolderOpenFilled } from '@ant-design/icons'
import AccreditationDetailRow from './AccreditationDetailRow';
import { useState } from 'react';
import NewAccreditationModal from './NewAccreditationModal';
const AccreditationCard = () => {

    const [modalOpened, setModalOpened] = useState<boolean>(false);

    return (
        <>
            <div className="max-w-[712px] w-full">
                <div className="h-3 w-full bg-gradient-to-r from-primary-500 to-error-500 rounded-t-full"/>
                <div className="border-[1px] border-t-0 rounded-md border-[#dfdfdf]">
                    <div className="flex justify-between flex-col md:flex-row space-y-2 md:space-y-0 md:items-center px-5 py-2">
                        <div className='flex items-center space-x-2'>
                            <Text size={24} color="primary-text" weight={600}>Akreditasi</Text>
                            <span className='text-primary-text-500 font-semibold bg-[#e5e7eb] inline-block px-3 py-1 text-sm rounded-full'>ASIIN 2019</span>
                        </div>
                        <Button 
                            leftIcon={<AddFilled color='white' size={24} />} 
                            className="bg-primary-500 hover:bg-primary-700"
                            onClick={() => setModalOpened(true)}
                        >
                            Tambah Data
                        </Button>
                    </div>
                    <hr className='border-0 bg-[#dfdfdf] h-[1px] w-full' />
                    <div className='px-5 py-3'>
                        <div className='flex flex-col space-y-3'>
                            <AccreditationDetailRow title='Formal Spesifications' />
                            <AccreditationDetailRow title='Degree Programmers: Content, Concept and Implementation' />
                            <AccreditationDetailRow title='Degree Programmers: Structures, Methods and Implementation'/>
                            <AccreditationDetailRow title='Examinations: System, Concept and Organization'/>
                            <AccreditationDetailRow title='Resources' />
                            <AccreditationDetailRow title='Documentation and Transparency' />
                            <AccreditationDetailRow title='Quality Management: Quality Assessment and Development' />
                        </div>
                    </div>
                </div>
            </div>
            <NewAccreditationModal
                opened={modalOpened}
                setOpened={setModalOpened}
            />
        </>
    )
}

export default AccreditationCard;