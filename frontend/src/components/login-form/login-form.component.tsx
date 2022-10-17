import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import LoginFormRender from "./login-form.render";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface ILoginFormComponentProps {}

export interface ILoginFormValues {
  username: string;
  password: string;
}

const loginFormSchema = yup.object({
  username: yup.string().required("input-username-required-error"),
  password: yup.string().required("input-password-required-error"),
});

export type TLoginInput = "username" | "password" | "";

const LoginFormComponent: React.FC<ILoginFormComponentProps> = ({}) => {
  const methods = useForm<ILoginFormValues>({
    resolver: yupResolver(loginFormSchema),
  });

  const [focusedInput, setFocusedInput] = useState<TLoginInput>("");

  function changeFocusedInput(input: TLoginInput) {
    setFocusedInput(input);
  }

  function isFocused(input: TLoginInput) {
    return focusedInput === input;
  }

  function clearFocus() {
    setFocusedInput("");
  }

  function onSubmit(values: ILoginFormValues) {
    console.log(values);
  }

  return (
    <FormProvider {...methods}>
      <LoginFormRender
        onSubmit={onSubmit}
        clearFocus={clearFocus}
        changeFocusedInput={changeFocusedInput}
        isFocused={isFocused}
      />
    </FormProvider>
  );
};
export default LoginFormComponent;
