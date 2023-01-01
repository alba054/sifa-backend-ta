import { SelectItem } from "@mantine/core";
import { profilePicturePlaceholder } from "../const/placeholders.constant";

export function getFileUrl(
  file?: File,
  placeholder = profilePicturePlaceholder
) {
  if (!file) return placeholder;
  const objectUrl = URL.createObjectURL(file);

  return objectUrl;
}

export function getGenderOptions(): SelectItem[] {
  return [
    {
      value: "laki-laki",
      label: "Laki Laki",
    },
    {
      value: "perempuan",
      label: "Perempuan",
    },
  ];
}

export function ParseFileBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve(reader.result?.toString().split(";")[1].replace("base64", "")!);
    reader.onerror = (error) => reject(error);
  });
}
