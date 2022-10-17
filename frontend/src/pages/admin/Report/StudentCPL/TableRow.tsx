import { useState } from "react";
import { IStudentCPlParams } from ".";
import StudentCPLInfoModal from "./Modal";

interface ITableRowParams{
    index: number;
    cpl: IStudentCPlParams
}
const TableRow = ({index, cpl}: ITableRowParams) => {
    const [modalOpened, setModalOpened] = useState<boolean>(false)

    return(
        <>
            <tr className="text-primary-text-500">
                <td className="text-center">{index+1}</td>
                <td>{cpl.nim}</td>
                <td>{cpl.namaMahasiswa}</td>
                <td className='text-center'>{cpl.cpl1 === null ? "-" : cpl.cpl1}</td>           
                <td className='text-center'>{cpl.cpl2 === null ? "-" : cpl.cpl2}</td>           
                <td className='text-center'>{cpl.cpl3 === null ? "-" : cpl.cpl3}</td>                   
                <td className='text-center'>{cpl.cpl4 === null ? "-" : cpl.cpl4}</td>                   
                <td className='text-center'>{cpl.cpl5 === null ? "-" : cpl.cpl5}</td>
                <td className='flex items-center justify-center' >
                    {/* <Button component={Link} to="tes" className='bg-[#C4C2F880] hover:bg-[#c4c2f8c7] z-0 text-primary-500'>Detail</Button> */}

                    <span onClick={() => setModalOpened(true)} className='cursor-pointer bg-[#C4C2F880] hover:bg-[#c4c2f8c7] text-primary-500 inline-block px-3 py-1 rounded-md'>
                        Detail
                    </span>
                </td>                     
            </tr>
            <StudentCPLInfoModal opened={modalOpened} setOpened={setModalOpened} />
        </>
    )
}
export default TableRow;