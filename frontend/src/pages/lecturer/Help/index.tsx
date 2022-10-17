import LecturerAppShell from "../../../layouts/LecturerAppShell";
import {Stack, Title, Text, Button, Group, MediaQuery} from '@mantine/core'
import { ArrowDownloadOutline, CallOUtline, IconColorScheme } from "../../../assets/Icons/Fluent";

const Help = () => {
    return ( 
        <LecturerAppShell>
            <MediaQuery smallerThan={"md"} styles={{
                justifyContent: "flex-start"
            }}>
                <Stack justify={"center"} className="h-full flex flex-col">
                    <Title 
                        order={1} 
                        weight={600} 
                        size={32}
                        color={"primary-text"}
                        mb="xl"
                        className="text-center md:text-left"
                    >
                        Tentang Aplikasi CPL
                    </Title>
                    <Text weight={300} className="text-xl w-3/4" color={"primary-text"}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos inventore quas adipisci reiciendis totam aperiam? Magnam consectetur repudiandae atque sequi culpa quibusdam id illum quo dolorum, nobis at illo debitis?</Text>
                    <ol className="text-primary-text-500 my-5 font-light text-xl">
                        <li>1. Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                        <li>2. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum?</li>
                        <li>3. Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                    </ol>
                    <Text weight={300} className="text-xl w-3/4" color={"primary-text"}>
                        Jika mengalami kendala dalam menggunakan aplikasi ini, silahkan mendownload <span className="font-bold">manual book</span> atau <span className="font-bold">hubungi admin</span> melalui tombol di bawah.
                    </Text>

                    <Group mt="xl">
                        <Button
                            className="h-12 w-full md:w-fit" 
                            variant="outline" 
                            color={"primary"} 
                            leftIcon={<ArrowDownloadOutline color={IconColorScheme.primary} />}
                        >
                            Download Manual Dosen
                        </Button>
                        <Button
                            className="h-12 w-full md:w-fit" 
                            variant="outline" 
                            color={"error"}
                            leftIcon={<CallOUtline color={IconColorScheme.error} />}
                        >
                            Kontak Admin
                        </Button>
                    </Group>
                </Stack>
            </MediaQuery>
        </LecturerAppShell>
    )
}

export default Help