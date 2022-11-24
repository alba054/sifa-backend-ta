import { Group, Stack, Text } from "@mantine/core";
import React from "react";
import { FEBookmarkMultipleFilled } from "src/assets/Icons/Fluent";

export interface IFEHomeCard {
  title: string;
  mainIcon: JSX.Element;
  backgroundIcon?: JSX.Element;
  backgroundColor?: string;
  subject: string;
  additional: Array<string>;
  // additional: string;
}

const FEHomeCard: React.FC<IFEHomeCard> = ({
  title,
  mainIcon,
  backgroundIcon,
  backgroundColor = "primary-500",
  subject,
  additional,
}) => (
  <Stack
    justify={"space-between"}
    className={`w-full lg:flex-1 ${backgroundColor} relative px-7 py-8 pb-7 rounded-2xl overflow-y-hidden gap-6 z-0`}
  >
    <Group className="gap-4">
      {/* <PersonFilled size={60} color="#ffffff" className="" /> */}
      {mainIcon}
      <Text className="text-white text-[30px]">{title}</Text>
    </Group>
    <Stack className="gap-0">
      <Text className="text-white font-bold text-xl">{subject}</Text>
      <Group className="gap-2 tracking-01">
        {additional.map((item, idx) => {
          return (
            <>
              <Text size={"sm"} className="text-white">
                {item}
              </Text>
              {idx == additional.length - 1 ? null : (
                <Text className="text-md relative -top-[2px] text-white">
                  &#x2022;
                </Text>
              )}
            </>
          );
        })}
      </Group>
    </Stack>
    {/* <PersonFilled
      size={120}
      color="#4844c8"
      className="absolute right-2 hidden sm:block -top-4" /> */}
    {backgroundIcon}
  </Stack>
);
export default FEHomeCard;
