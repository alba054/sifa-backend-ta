import { Group, ScrollArea, Stack, Text } from "@mantine/core";
import React, { useEffect, useReducer, useRef } from "react";
import FELinkMore from "src/components/fe-components/FELinkMore";
import useUpdateEffect from "src/hooks/fe-hooks/useUpdateEffect";
import FEStudentHomepageLabFreeCard from "./FEStudentHomepageLabFreeCard";

export interface IFEStudentHomepageLabFree {}

const FEStudentHomepageLabFree: React.FC<IFEStudentHomepageLabFree> = ({}) => {
  // Anjir pusingku handle ki ini
  // const [score, forceUpdate] = useReducer((x) => x + 1, 0);

  // const ref = useRef<any>(<Stack></Stack>);
  // useEffect(() => {
  //   console.log("width", ref.current ? ref.current.offsetWidth : 0);
  // }, [ref.current]);

  // console.log(score)

  // useEffect(() => {
  //   window.addEventListener("resize", forceUpdate, false);
  //   (()=>{forceUpdate()})
  // }, []);

  // console.log(((window.innerWidth-190)*0.985 | 0))
  return (
    <Stack /*ref={ref}*/>
      <Stack className="gap-0">
        <Text className="text-[22px] text-primary-text-500 font-semibold">
          Bebas Laboratorium
        </Text>
        <FELinkMore caption="Lihat Lebih Lengkap" />
      </Stack>
      <ScrollArea
        style={{
          width: ((window.innerWidth-190)*0.985 | 0),
          height: 160,
        }}
      >
        <Group className="flex-nowrap gap-6 overflow-x-hidden">
          <FEStudentHomepageLabFreeCard
            title="Permohonan #3"
            lab="Biofarmaka"
            status="process"
          />
          <FEStudentHomepageLabFreeCard
            title="Permohonan #2"
            lab="DOP"
            status="accepted"
          />
          <FEStudentHomepageLabFreeCard
            title="Permohonan #1"
            lab="Biofarmaka"
            status="rejected"
          />
          
          <FEStudentHomepageLabFreeCard
            title="Permohonan #0"
            lab="Biofarmaka"
            status="rejected"
          />
        </Group>
      </ScrollArea>
    </Stack>
  );
};
export default FEStudentHomepageLabFree;
