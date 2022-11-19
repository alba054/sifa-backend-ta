import {
  MantineSize,
  MantineColor,
  Input,
  Text,
  Stack,
  Group,
  Button,
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
}

const DocumentInput: React.FC<IDocumentInputProps> = ({
  error,
  size = "lg",
  onChange,
  label,
  placeholder,
  description = "",
  value,
}) => {
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
      styles={getDefaultStyle(false, false)}
      size={size}
      required
      label={label}
    >
      <Dropzone onDrop={handleDrop} p="xl">
        <Stack align="center" spacing={"xs"}>
          <CloudUploadIcon size={36} color={COLORS.DIVIDER} />
          <Stack spacing={0} align="center">
            {!!placeholder && (
              <Text size={size}>{value?.name || placeholder}</Text>
            )}
            {!!description && (
              <Text size={size} color="secondary-text">
                {description}
              </Text>
            )}
          </Stack>
        </Stack>
      </Dropzone>
      {!!value && (
        <Group grow mt={8}>
          <Button onClick={onPreviewClick} size="lg">
            <PreviewIcon size={16} color="white" />
            <Text ml={4} size={"lg"}>
              Lihat Pratinjau
            </Text>
          </Button>
          <Button onClick={onDelete} size="lg" color={"error"}>
            <DeleteOutline size={20} color="white" />
            <Text ml={4} size={"lg"}>
              Hapus File
            </Text>
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
