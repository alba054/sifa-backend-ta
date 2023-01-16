import { Container, Title, Text, Group, Button } from "@mantine/core";
import {
  IconColorScheme,
  LockOutline,
  PersonOutline,
} from "../../../assets/Icons/Fluent";
import UnhasLogo from "../../../assets/images/unhas_logo.png";
import KemdikbudLogo from "../../../assets/images/kemdikbud_logo.png";
import KMLogo from "../../../assets/images/kampus_merdeka_logo.png";
import Background from "../../../assets/images/login_background.png";
import Div100vh from "react-div-100vh";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import { FEPasswordInput, TextInput } from "src/components/FormInput";
import { useMutation } from "react-query";
import { qfLogin } from "src/query-functions/user.query-function";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import {
  cookieGetLoggedInUserNim,
  cookieGetLoggedInUserRole,
  cookieSetLoginNim,
  cookieSetLoginRole,
  cookieSetLoginToken,
} from "src/utils/functions/cookies.function";
import { ROLE_HOMEPAGES } from "src/routes/final-exam.route";

interface ILoginFormValues {
  username: string;
  password: string;
}

const passwordSchema = yup.object({
  username: yup.string().required("Username dibutuhkan untuk login"),
  password: yup.string().required("Password dibutuhkan untuk login"),
});

const Login = () => {
  const navigate = useNavigate();
  const [isUsernameFocus, setIsUsernameFocus] = useState<boolean>(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState<boolean>(false);
  const [modalDesc, setModalDesc] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const { mutate } = useMutation("login-form", qfLogin, {
    onSuccess: handleSuccess,
  });

  const { values, getInputProps, onSubmit, errors } = useForm<ILoginFormValues>(
    {
      validate: yupResolver(passwordSchema),
      initialValues: {
        password: "",
        username: "",
      },
    }
  );

  function handleSubmit(values: ILoginFormValues) {
    mutate(values);
  }

  // function getUserDetail(nim: string) {

  // }

  function handleSuccess(resp: any) {
    if (resp.status === "NotFoundError") {
      setModalTitle("User Tidak Ditemukan");
      setModalDesc(
        "Tolong periksa kembali username dan password yang anda input"
      );
    }

    if (resp.status === "success") {
      cookieSetLoginToken(resp.data.token);
      cookieSetLoginRole(resp.data.role);
      cookieSetLoginNim(values.username);
      setIsSuccess(true);
      setModalTitle("Login berhasil");
      setModalDesc(
        "Login berhasil kami akan mengarahkan anda ke halaman dashboard"
      );
    }
  }

  function closeErrorModal() {
    setModalDesc("");
    setModalTitle("");
    if (isSuccess) {
      navigate(ROLE_HOMEPAGES[cookieGetLoggedInUserRole()!]);
    }
  }

  return (
    <Div100vh className="h-screen py-8 md:py-10 relative bg-[#ffffff] w-screen max-w-full">
      <FEAlertModal
        opened={!!modalDesc}
        setOpened={closeErrorModal}
        title={modalTitle}
        yesButtonLabel="Oke"
        onSubmit={closeErrorModal}
        description={modalDesc}
      />
      <Container size={"lg"} mx={"auto"} className="flex flex-row h-full">
        <div className="w-full lg:w-7/12 mx-auto lg:mx-0 max-w-3xl flex flex-col">
          <div className="flex justify-center lg:justify-start items-center space-x-5">
            <img src={UnhasLogo} className="w-10 md:w-20" />
            <img src={KemdikbudLogo} className="w-[50px] md:w-[100px]" />
            <img src={KMLogo} className="w-[50px] md:w-[100px]" />
          </div>
          <div className="flex-1 flex flex-col justify-evenly">
            <div>
              <Title
                order={1}
                weight={600}
                color="primary-text"
                className="text-center lg:text-left"
              >
                Selamat Datang
              </Title>
              <Text
                color={"secondary-text"}
                className="text-sm text-center lg:text-left lg:text-base mt-2"
              >
                di aplikasi pengukuran{" "}
                <span className="font-bold text-primary-text-500">
                  Capaian Pembelajaran Lulusan (CPL).
                </span>
              </Text>
            </div>
            <form
              onSubmit={onSubmit(handleSubmit)}
              className="flex flex-col space-y-5"
            >
              <TextInput
                label="Username atau NIP"
                error={errors?.["username"]?.toString()}
                icon={
                  <PersonOutline
                    size={24}
                    color={
                      isUsernameFocus
                        ? IconColorScheme.primary
                        : IconColorScheme.secondaryText
                    }
                  />
                }
                onFocus={(e) => setIsUsernameFocus(true)}
                onBlur={(e) => setIsUsernameFocus(false)}
                {...getInputProps("username")}
                placeholder="Masukkan username anda"
                hint={
                  isUsernameFocus
                    ? "Gunakan NIP dosen atau username admin prodi yang terdaftar"
                    : undefined
                }
              />
              <FEPasswordInput
                label="Password"
                icon={
                  <LockOutline
                    size={24}
                    color={
                      isPasswordFocus
                        ? IconColorScheme.primary
                        : IconColorScheme.secondaryText
                    }
                  />
                }
                placeholder="Masukkan password anda"
                onFocus={(e) => setIsPasswordFocus(true)}
                onBlur={(e) => setIsPasswordFocus(false)}
                {...getInputProps("password")}
              />
              <Group position="right">
                <Button
                  variant="subtle"
                  className="hover:bg-secondary-50 px-0 font-semibold text-primary-500 hover:text-primary-700"
                  component={Link}
                  to="/reset-password"
                >
                  Lupa Password?
                </Button>
              </Group>
              <Button
                type="submit"
                className="bg-primary-500 w-full font-bold hover:bg-primary-700 h-12"
              >
                Masuk
              </Button>
            </form>
          </div>
          <footer className="text-secondary-text-500 text-center lg:text-left">
            <Text>&copy;2022 NPE Digital. All rights reserved.</Text>
          </footer>
        </div>
      </Container>
      <img
        className="absolute right-0 h-full top-0 object-cover hidden lg:block"
        src={Background}
      />
    </Div100vh>
  );
};

export default Login;
