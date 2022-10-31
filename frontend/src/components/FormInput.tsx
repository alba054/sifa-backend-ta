import {
  TextInput as MantineTextInput,
  TextInputProps,
  TextInputStylesNames,
  SelectProps,
  Styles,
  NumberInput as MantineNumberInput,
  NumberInputProps,
  NumberInputStylesNames,
  useMantineTheme,
  SelectStylesNames,
  Select,
} from "@mantine/core";

import { useState } from "react";
import { COLORS } from "src/themes/colors.theme";

const getDefaultStyle = (
  isFocus: boolean
):
  | Styles<TextInputStylesNames | NumberInputStylesNames | SelectStylesNames>
  | undefined => {
  const theme = useMantineTheme();
  return {
    input: {
      ":focus": {
        border: "2px solid #5F5AF7",
        color: theme.colors.primary[5],
      },
      border: "2px solid #B5C2D1",
      borderRadius: theme.radius.md,
      color: theme.colors["secondary-text"][5],
      marginTop: "8px",
    },
    label: {
      fontWeight: 600,
      color: `${isFocus ? COLORS.PRIMARY : "#b5c2d1"}`,
    },
  };
};

export const TextInput = ({ onFocus, onBlur, ...props }: TextInputProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <>
      <MantineTextInput
        className="text-primary-500"
        size="lg"
        styles={getDefaultStyle(isFocus)}
        onFocus={(e) => {
          setIsFocus(true);
          if (!!onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocus(false);
          if (!!onBlur) onBlur(e);
        }}
        {...props}
      />
    </>
  );
};

export const NumberInput = ({
  onFocus,
  onBlur,
  ...props
}: NumberInputProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <MantineNumberInput
      size="lg"
      hideControls
      styles={getDefaultStyle(isFocus)}
      onFocus={(e) => {
        setIsFocus(true);
        if (!!onFocus) onFocus(e);
      }}
      onBlur={(e) => {
        setIsFocus(false);
        if (!!onBlur) onBlur(e);
      }}
      {...props}
    />
  );
};

export const SelectInput = ({ onFocus, onBlur, ...props }: SelectProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <Select
      size="lg"
      styles={getDefaultStyle(isFocus)}
      onFocus={(e) => {
        setIsFocus(true);
        if (!!onFocus) onFocus(e);
      }}
      onBlur={(e) => {
        setIsFocus(false);
        if (!!onBlur) onBlur(e);
      }}
      {...props}
    />
  );
};
