import { 
    Container,
    Title,
    Text,
    Button
} from "@mantine/core";
import { ChevronLeftFilled, IconColorScheme, MailOutline } from "../../../assets/Icons/Fluent";
import Background from '../../../assets/images/login_background.png'
import Div100vh from 'react-div-100vh';
import {TextInput, ColorScheme} from "../../../components/Input";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {

    const [isEmailFocus, setIsEmailFocus] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("Email yang dimasukkan tidak terdaftar.")

    return (
        <Div100vh className="h-screen py-8 md:py-10 relative bg-[#ffffff] w-screen max-w-full">
            <Container size={"lg"} mx={"auto"} className='flex flex-row h-full'>
                <div className="w-full lg:w-7/12 mx-auto lg:mx-0 max-w-3xl flex flex-col">
                    <div className="flex">
                        <div className="bg-secondary-500 rounded-md cursor-pointer">
                            <Button 
                                variant="subtle" 
                                compact 
                                className="h-10 w-10 hover:bg-secondary-700" 
                                component={Link} 
                                to="/" 
                                replace
                            >
                                <ChevronLeftFilled color={IconColorScheme.primary} />
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center space-y-10">
                        <div>
                            <Title order={1} weight={600} color="primary-text" className="text-center lg:text-left">
                                Lupa Password?
                            </Title>
                            <Text color={"secondary-text"} className="text-sm text-center lg:text-left lg:text-base mt-2">Tautan untuk mengubah password akan dikirimkan ke email Anda.</Text>
                        </div>
                        <form className="flex flex-col space-y-10">
                            <TextInput 
                                color={isEmailFocus ? ColorScheme.primary :  isError ? ColorScheme.error : undefined}
                                label="Email" 
                                icon={<MailOutline 
                                        size={24} 
                                        color={isEmailFocus ? IconColorScheme.primary : isError ? IconColorScheme.error : IconColorScheme.secondaryText} 
                                    />}
                                onFocus={e => setIsEmailFocus(true)}
                                onBlur={e => setIsEmailFocus(false)}
                                placeholder="Masukkan email anda"
                                isError={isError}
                                hint={isError ? errorMessage : undefined}
                            />
                                <Button 
                                    className="bg-primary-500 w-full font-bold hover:bg-primary-700 h-12"
                                    onClick={() => {
                                        setIsError(true)
                                        setTimeout(() => {
                                            setIsError(false)
                                        },3000)
                                    }}
                                    type="submit"
                                >
                                    Kirim Email Konfirmasi
                                </Button>
                        </form>
                    </div>
                    <footer className="text-secondary-text-500 text-center lg:text-left">
                        <Text>&copy;2022 NPE Digital. All rights reserved.</Text>
                    </footer>
                </div>
            </Container>
            <img className="absolute right-0 h-full top-0 object-cover hidden lg:block" src={Background} />
        </Div100vh>
    )
}

export default ResetPassword;