import { Group, Text } from '@mantine/core';
import React from 'react';

export interface IFERoundedChip {
  label: string,
  leftIcon?: JSX.Element;
  type: "green"|"blue"|"red"
}

const FERoundedChip: React.FC<IFERoundedChip> = ({label, leftIcon=null, type}) => {
  let groupClassName= "py-[3px] px-3 gap-1 rounded-full max-w-max box-content ";
  if(type=="green"){
    groupClassName+="bg-[#1E9E63]/[0.15] text-[#1E9E63]"
  }else if (type=="blue"){
    groupClassName+="bg-[#5F5AF7]/[0.15] text-[#5F5AF7]"
  }else{
    groupClassName+="bg-[#FF2C56]/[0.15] text-[#FF2C56]"
  }

  return (
    <Group className={groupClassName}>
      {leftIcon}
      <Text className="px-1">{label}</Text>
    </Group>
  )
}
export default FERoundedChip;