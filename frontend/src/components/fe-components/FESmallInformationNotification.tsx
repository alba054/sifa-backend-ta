import { Group, Text, useMantineTheme } from '@mantine/core';
import React from 'react';
import { InfoOutline } from 'src/assets/Icons/Fluent';

export interface IFESmallInformationNotification {
  info: string
}

const FESmallInformationNotification: React.FC<IFESmallInformationNotification> = ({info}) => {
  const theme= useMantineTheme();
  
  return (
    <Group className='bg-[#EFF6FF] py-3 px-4 text-primary-500 gap-2'>
      <InfoOutline color={theme.colors['primary'][5]} />
      <Text className='tracking-2'>{info}</Text>
    </Group>
  )
}
export default FESmallInformationNotification;