import { Stack, Title } from '@mantine/core';
import React from 'react';
import FEProfileCard from 'src/components/FEProfileCard';

export interface IFEProfileChangePassword {}

const FEProfileChangePassword: React.FC<IFEProfileChangePassword> = ({ }) => {
  return (
    <FEProfileCard bg='bg-secondary-text-500'>
      <Stack className="w-fit gap-1 mb-4">
        <Title order={3} className="text-primary-text-500">
          Ganti Password
        </Title>
        <div
          className={`bg-secondary-text-500 w-1/2 pb-1 rounded-sm`}
        />
      </Stack>
    </FEProfileCard>
  )
}
export default FEProfileChangePassword;