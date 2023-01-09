import { Stack, Text } from "@mantine/core";
import { TextArea } from "src/components/FormInput";
import * as yup from "yup";

export interface IFERefusalReasonFormSchema {
  refusalReason: any;
}

export const feRefusalReasonFormSchema = yup.object({
  refusalReason: yup.string().required("Tolong input alasan penolakan anda"),
});

export interface IFERefusalReasonForm {
  form: any;
  textSize?: "lg" | "md";
  label?: string;
}

const FERefusalReasonForm: React.FC<IFERefusalReasonForm> = ({
  form,
  textSize = "sm",
  label = "Masukan alasan anda melakukan penolakan ",
}) => {
  const { getInputProps, errors, setValues } = form;
  return (
    <Stack className="gap-0 -mt-2">
      <Text
        className={`text-secondary-text-500 tracking-1 ${
          textSize == "md" ? "text-md" : "text-lg"
        }`}
      >
        {label}
      </Text>
      <TextArea
        autosize
        minRows={10}
        {...getInputProps("refusalReason")}
        error={errors["refusalReason" as keyof IFERefusalReasonForm]}
        placeholder="Alasan Penolakan ..."
      />
    </Stack>
  );
};
export default FERefusalReasonForm;
