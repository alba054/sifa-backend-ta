import { Stack, Title, Text } from "@mantine/core";

interface ILecturerModalInfo{
    label: string;
    value?: string;
}

const LecturerModalInfo = ({label, value}: ILecturerModalInfo) => {
    return (
        <Stack spacing={10}>
            <Title color={"secondary-text"} size={16}>
                {label}
            </Title>
            <Text size={22} color="primary-text">{value}</Text>
        </Stack>
    )
}
export default LecturerModalInfo;