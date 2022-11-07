import { DatePicker, DatePickerProps } from "@mantine/dates";
import { useState } from "react";
import { getDefaultStyle } from "./FormInput";
import "dayjs/locale/id";

interface IDateInputProps extends DatePickerProps {}

const DateInput = ({ onFocus, onBlur, ...props }: DatePickerProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <DatePicker
      styles={getDefaultStyle(isFocus, !!props.error)}
      onFocus={(e) => {
        setIsFocus(true);
        if (!!onFocus) onFocus(e);
      }}
      onBlur={(e) => {
        setIsFocus(false);
        if (!!onBlur) onBlur(e);
      }}
      locale="id"
      {...props}
    />
  );
};

export default DateInput;
