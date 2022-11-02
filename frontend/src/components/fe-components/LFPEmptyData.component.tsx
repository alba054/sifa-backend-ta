import { Stack, Text } from "@mantine/core";
import React from "react";
import NoFilesAnimationIcon from "src/assets/Icons/NoFilesAnimationIcon";

interface ILFPEmptyDataComponentProps {
  title: string;
  caption: string;
}

const LFPEmptyDataComponent: React.FC<ILFPEmptyDataComponentProps> = ({
  title,
  caption,
}) => {
  return (
    <Stack align={"center"}>
      <NoFilesAnimationIcon />
      <Stack spacing={0}>
        <Text align="center">{title}</Text>
        <Text align="center" color={"secondary-text"}>
          {caption}
        </Text>
      </Stack>
    </Stack>
  );
};
export default LFPEmptyDataComponent;
