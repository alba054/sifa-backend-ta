import { Button, Group, Image, Stack, Text } from "@mantine/core";
import Div100vh from "react-div-100vh";
import { Link } from "react-router-dom";
import NotFoundBackground from '../../../assets/images/not_found.jpg'
import UnhasLogo from '../../../assets/images/unhas_logo.png';

const NotFound = () => {
    return (
        <Div100vh className="relative w-screen">
            <img className="w-full h-full object-cover object-center" src={NotFoundBackground} />
            <div className="absolute z-10 flex flex-col justify-center items-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <Group position="center">
                    {/* <img className="w-[50px] " src={UnhasLogo} /> */}
                    <Image src={UnhasLogo} width={50} alt="logo" />
                    <Text className="text-white text-3xl md:text-6xl" weight={700} >
                        CPL 
                        <span className="bg-error-500 px-2 mx-3 md:mx-5 rounded-md">Unhas</span>
                    </Text>
                </Group>

                <Stack justify={"center"} align="center" mt={80}>
                    <Text className="text-[#ffffff80] text-center md:text-[180px] text-[150px]">404</Text>
                    <Text className="text-[#ffffff80] text-2xl md:text-[46px] text-center" weight={600}>Oops! Halaman tidak ditemukan</Text>
                    <Text className="text-center text-[#ffffff80] md:text-xl hidden md:block">Halaman mungkin telah dihapus atau terdapat kesalahan saat menuliskan URL halaman.</Text>
                    <Group mt="xl">
                        <Button component={Link} to="/" className="bg-[#ffffff1e] rounded-full font-bold text-lg h-10"> &laquo; Kembali ke Beranda</Button>
                    </Group>
                </Stack>
            </div>
            
        </Div100vh>
    )
}

export default NotFound;