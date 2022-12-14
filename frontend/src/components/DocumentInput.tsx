import {
  MantineSize,
  MantineColor,
  Input,
  Text,
  Stack,
  Group,
  Button,
  useMantineTheme,
  createStyles,
} from "@mantine/core";
import { DropzoneProps, Dropzone } from "@mantine/dropzone";
import CloudUploadIcon from "src/assets/Icons/CloudUploadIcon";
import { DeleteOutline } from "src/assets/Icons/Fluent";
import PreviewIcon from "src/assets/Icons/PreviewIcon";
import { COLORS } from "src/themes/colors.theme";
import { getDefaultStyle } from "./FormInput";

interface IDocumentInputProps extends Omit<DropzoneProps, "onChange"> {
  error?: React.ReactNode;
  size?: MantineSize;
  value?: File;
  withPreview?: boolean;
  onChange: (files: File | undefined) => void;
  label?: string;
  buttonLabel?: string;
  description?: string;
  placeholder?: string;
  withDelete?: boolean;
  color?: MantineColor;
  disabled?: boolean;
}

const DocumentInput: React.FC<IDocumentInputProps> = ({
  error,
  size = "lg",
  onChange,
  label,
  placeholder,
  description = "",
  value,
  disabled = false,
}) => {
  const theme = useMantineTheme();

  function handleDrop(files: File[]) {
    onChange(files[0]);
  }

  function onDelete() {
    onChange(undefined);
  }

  function onPreviewClick() {
    if (!value) return;
    const url = URL.createObjectURL(value);
    window.open(url, "_blank");
  }

  return (
    <Input.Wrapper
      // styles={getDefaultStyle(false, false)}
      size={size}
      required
      label={label}
      styles={{
        label: {
          color: theme.colors["divider"],
          marginBottom: "10px",
          fontSize: "14px",
        },
      }}
    >
      <Dropzone
        onDrop={handleDrop}
        className={
          `items-center gap-[1px] border-2 border-[#B5C2D1] pt-7 pb-5 rounded-xl border-dashed ` +
          (disabled == true ? `cursor-context-menu` : ``)
        }
        disabled={disabled}
      >
        <Stack className="items-center gap-4 cursor-not-allowed">
          <CloudUploadIcon size={32} color={COLORS.DIVIDER} className="mt-1" />
          <Stack spacing={0} align="center">
            {!!placeholder && (
              <Text className="text-primary-text-500 text-lg tracking-1">
                {value?.name || placeholder}
              </Text>
            )}
            {!!description && (
              <Text className="text-secondary-text-500 text-base tracking-2">
                {description}
              </Text>
            )}
          </Stack>
        </Stack>
      </Dropzone>
      {!!value && (
        <Group grow spacing={"md"} className="mt-4">
          <Button
            variant="light"
            className="bg-[#3B82F6] py-[10px] h-max rounded-lg text-white hover:bg-[#3B82F6]"
            onClick={onPreviewClick}
          >
            <PreviewIcon size={14} color={"white"} className="mr-2" />
            Lihat Pratinjau
          </Button>
          <Button
            variant="light"
            className="bg-error-500 !important py-[10px] h-max rounded-lg text-white hover:bg-error-500"
            onClick={onDelete}
            disabled={disabled}
          >
            <DeleteOutline size={16} color={"white"} className="mr-2" />
            Hapus File
          </Button>
        </Group>
      )}
      <Input.Error mt={8} size="lg">
        {error}
      </Input.Error>
    </Input.Wrapper>
  );
};

export default DocumentInput;
