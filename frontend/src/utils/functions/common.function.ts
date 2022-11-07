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
