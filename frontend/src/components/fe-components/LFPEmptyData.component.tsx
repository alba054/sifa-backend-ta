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
    <Stack align={"center"} className="border-dashed border-[#B5C2D1] border-2 flex rounded-[16px] flex-col p-4">
      <NoFilesAnimationIcon width={600} height={400} className="overflow-hidden z-[-1]" />
      <Stack spacing={0} className="max-w-[640px] w-full flex justify-center overflow-hidden">
        <Text align="center" className="w-full font-normal text-[26px] text-center" color={"primary-text"}>{title}</Text>
        <Text align="center" className="text-lg text-center" color={"secondary-text"}>
          {caption}
        </Text>
      </Stack>
    </Stack>
  );
};
export default LFPEmptyDataComponent;
