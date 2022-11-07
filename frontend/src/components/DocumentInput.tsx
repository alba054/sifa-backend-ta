import { useTheme } from "@emotion/react";
import {
  MantineSize,
  MantineColor,
  Input,
  Group,
  Button,
  Text,
} from "@mantine/core";
import { DropzoneProps, Dropzone } from "@mantine/dropzone";
import ArrowUploadIcon from "src/assets/Icons/ArrowUploadIcon";
import { DeleteOutline } from "src/assets/Icons/Fluent";
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
  withDelete?: boolean;
  color?: MantineColor;
}

const DocumentInput: React.FC<IDocumentInputProps> = ({
  error,
  size = "md",
  onChange,
  label,
  description = "",
  buttonLabel = "Choose File",
  withPreview,
  value,
  color,
  withDelete,
  ...props
}) => {
  const themes: any = useTheme();
  function handleDrop(files: File[]) {
    onChange(files[0]);
  }

  function onDelete() {
    onChange(undefined);
  }

  return (
    <Input.Wrapper
      styles={getDefaultStyle(false, false)}
      size={size}
      required
      label={label}
    >
      <Group my={4}>
        <Dropzone
          padding={0}
          className={`w-fit border-none`}
          {...props}
          onDrop={handleDrop}
        >
          <Button variant="light" className={`bg-primary bg-opacity-10`}>
            <ArrowUploadIcon
              size={16}
              color={color}
              fill={themes.colors[color || "primary-text"][5]}
            />
            <Text ml={"xs"} color={color || "primary-text"}>
              {buttonLabel}
            </Text>
          </Button>
        </Dropzone>
        {!!withDelete && (
          <Button
            onClick={onDelete}
            variant="light"
            className={`bg-error bg-opacity-10`}
          >
            <DeleteOutline color={themes.colors["error"][5]} />
            <Text ml={"xs"} color={"error"}>
              {buttonLabel}
            </Text>
          </Button>
        )}

        {!!withPreview && (
          <Text size={size} className={`truncate w-48`}>
            {value?.name || "Belum ada file yang di upload"}
          </Text>
        )}
      </Group>
      {!!description && (
        <Text size={size} color="secondary-text">
          {description}
        </Text>
      )}
    </Input.Wrapper>
  );
};

export default DocumentInput;
