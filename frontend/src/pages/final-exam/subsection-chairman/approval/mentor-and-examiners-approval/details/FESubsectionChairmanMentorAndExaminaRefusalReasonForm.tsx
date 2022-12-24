import { Stack, Text } from "@mantine/core";
import { TextArea } from "src/components/FormInput";
import * as yup from "yup";

export interface IFESubsectionChairmanMentorAndExaminaRefusalReasonFormSchema {
  refusalReason: any;
}

export const feSubsectionChairmanMentorAndExaminaRefusalReasonFormSchema = yup.object({
  refusalReason: yup.string().required("Tolong input alasan penolakan anda"),
});

export interface IFESubsectionChairmanMentorAndExaminaRefusalReasonForm {
  form: any;
}

const FESubsectionChairmanMentorAndExaminaRefusalReasonForm: React.FC<
  IFESubsectionChairmanMentorAndExaminaRefusalReasonForm
> = ({ form }) => {
  const { getInputProps, errors, setValues } = form;
  return (
    <Stack className="gap-0 -mt-2">
      <Text className="text-secondary-text-500 text-lg tracking-1">
      Masukan alasan anda melakukan  penolakan
      </Text>
      <TextArea
        autosize
        minRows={10}
        {...getInputProps("refusalReason")}
        error={
          errors["refusalReason" as keyof IFESubsectionChairmanMentorAndExaminaRefusalReasonForm]
        }
        placeholder="Alasan Penolakan ..."
      />
    </Stack>
  );
};
export default FESubsectionChairmanMentorAndExaminaRefusalReasonForm;
