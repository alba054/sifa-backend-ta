import {Grid, Text} from '@mantine/core'
import { ChevronRightOutline, IconColorScheme } from "../../../../assets/Icons/Fluent";

interface ICPLInfoCardProps{
    title: string;
    color: "red" | "blue"
}

const CPLInfoCard = ({title, color}: ICPLInfoCardProps) => {
    return (
        <div className="w-full max-w-[600px]">
            <div className={`w-full ${color === "blue" ? "bg-primary-500" : "bg-error-500"} h-4 rounded-t-full`}/>
            <div className="border border-[#dfdfdf] rounded-b-md border-t-0">
                <div className="py-3 px-5 flex justify-between border-b border-[#dfdfdf] ">
                    <Text size={22} color="primary-text" weight={600}>{title}</Text>
                    <div className="w-8 h-8 flex items-center justify-center bg-secondary-500 cursor-pointer rounded-md">
                        <ChevronRightOutline color={IconColorScheme.primary} size={18} />
                    </div>
                </div>
                <Grid p={"md"} gutter="xl">
                    <Grid.Col sm={2}>
                        <span className="font-bold text-primary-text-500">CPMK-1</span>
                    </Grid.Col>
                    <Grid.Col sm={10}>
                        <span className="text-primary-text-500">Mahasiswa mampu menerapkan prinsip-prinsip sains sebagai suatu pendekatan dalam menyelesaikan masalah keperawatan</span>
                    </Grid.Col>

                    <Grid.Col sm={2}>
                        <span className="font-bold text-primary-text-500">CPMK-1</span>
                    </Grid.Col>
                    <Grid.Col sm={10}>
                        <span className="text-primary-text-500">Mahasiswa mampu menerapkan prinsip-prinsip sains sebagai suatu pendekatan dalam menyelesaikan masalah keperawatan</span>
                    </Grid.Col>

                    <Grid.Col sm={2}>
                        <span className="font-bold text-primary-text-500">CPMK-1</span>
                    </Grid.Col>
                    <Grid.Col sm={10}>
                        <span className="text-primary-text-500">Mahasiswa mampu menerapkan prinsip-prinsip sains sebagai suatu pendekatan dalam menyelesaikan masalah keperawatan</span>
                    </Grid.Col>
                </Grid>

            </div>
        </div>
    )
}

export default CPLInfoCard