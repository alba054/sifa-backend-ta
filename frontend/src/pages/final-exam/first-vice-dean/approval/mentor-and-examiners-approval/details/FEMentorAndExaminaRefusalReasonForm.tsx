import { Stack } from "@mantine/core";
import { TextArea } from "src/components/FormInput";
import * as yup from "yup";

export interface IFEMentorAndExaminaRefusalReasonFormSchema {
  refusalReason: any;
}

export const fEMentorAndExaminaRefusalReasonFormSchema = yup.object({
  refusalReason: yup.string().required("Tolong input alasan penolakan anda"),
});

export interface IFEMentorAndExaminaRefusalReasonForm {
  form: any;
}

const FEMentorAndExaminaRefusalReasonForm: React.FC<
  IFEMentorAndExaminaRefusalReasonForm
> = ({ form }) => {
  const { getInputProps, errors, setValues } = form;
  return (
    <Stack spacing={"sm"}>
      <TextArea
        autosize
        minRows={10}
        {...getInputProps("refusalReason")}
        error={
          errors["refusalReason" as keyof IFEMentorAndExaminaRefusalReasonForm]
        }
        placeholder="Alasan Penolakan ..."
      />
    </Stack>
  );
};
export default FEMentorAndExaminaRefusalReasonForm;
