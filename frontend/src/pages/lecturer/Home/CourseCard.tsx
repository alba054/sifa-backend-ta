import { Group, Paper, Stack, Text, Button, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import BookTemplate from '../../../assets/images/book_template.png'

interface ICourseCardProps{
    title: string;
    code: string;
}

const CourseCard = ({title, code}: ICourseCardProps) => {
    return (
        <Paper shadow={"md"} p={"lg"} py="xl" pr="xl"  radius={"md"} className="border-l-[10px] relative border-primary-text-500">
            <Stack>
                <Text color={"primary-text"} size={24} weight={"bold"} className="text-xl md:text-2xl">{title}</Text>
                <Text color={"primary-text"} size={18} className="text-base md:text-lg">{code}</Text>
                <Group>
                    <Button component={Link} to="/nilai/penilaian" compact className="bg-primary-text-500 w-[90px]">
                        Penilaian
                    </Button>
                    <Button component={Link} to="/nilai/portfolio" compact className="bg-[#33415540] hover:bg-[#33415580] w-[90px] text-primary-text-500">
                        Portfolio
                    </Button>
                </Group>
            </Stack>
            <img src={BookTemplate} className="absolute right-0 top-0 translate-y-1/2 hidden md:block" />
        </Paper>
    )
}

export default CourseCard;