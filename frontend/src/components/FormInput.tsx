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
  Radio,
  RadioGroupProps,
  RadioProps,
  Textarea as MantineTextArea,
  TextareaProps,
} from "@mantine/core";

import { useState } from "react";

export const getDefaultStyle = (
  isFocus: boolean,
  isError: boolean
):
  | Styles<TextInputStylesNames | NumberInputStylesNames | SelectStylesNames>
  | undefined => {
  const theme = useMantineTheme();
  const color = isError
    ? theme.colors.error[5]
    : isFocus
    ? theme.colors.primary[5]
    : theme.colors["secondary-text"][5];
  return {
    input: {
      ":focus": {
        border: "2px solid",
        color,
      },
      borderWidth: "2px",
      borderRadius: theme.radius.md,
      color,
      marginTop: "8px",
    },
    label: {
      fontWeight: 600,
      color,
    },
    error: {
      marginTop: 8,
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
        styles={{ ...getDefaultStyle(isFocus, !!props.error) }}
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
      styles={{ ...getDefaultStyle(isFocus, !!props.error) }}
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
      styles={{ ...getDefaultStyle(isFocus, !!props.error) }}
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

interface IRadioGroupProps extends Omit<RadioGroupProps, "children"> {
  data: RadioProps[];
}

export const RadioGroup = ({
  onFocus,
  onBlur,
  data,
  ...props
}: IRadioGroupProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <Radio.Group
      styles={{ ...getDefaultStyle(isFocus, !!props.error) }}
      size="lg"
      {...props}
    >
      {data.map(({ label, value, ...radio }) => {
        return (
          <Radio
            size="lg"
            onFocus={(e) => {
              setIsFocus(true);
              if (!!onFocus) onFocus(e);
            }}
            styles={{
              ...getDefaultStyle(value === props.value, !!props.error),
            }}
            onBlur={(e) => {
              setIsFocus(false);
              if (!!onBlur) onBlur(e);
            }}
            value={value}
            label={label}
            {...radio}
          />
        );
      })}
    </Radio.Group>
  );
};

export const TextArea = ({ onFocus, onBlur, ...props }: TextareaProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <>
      <MantineTextArea
        className="text-primary-500"
        size="lg"
        styles={{ ...getDefaultStyle(isFocus, !!props.error) }}
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

export const TextAreaWithRef = ({ onFocus, onBlur, ...props }: TextareaProps, ref:any) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <>
      <MantineTextArea
        className="text-primary-500"
        size="lg"
        styles={{ ...getDefaultStyle(isFocus, !!props.error) }}
        onFocus={(e) => {
          setIsFocus(true);
          if (!!onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocus(false);
          if (!!onBlur) onBlur(e);
        }}
        {...props}
        ref={ref}
      />
    </>
  );
};

