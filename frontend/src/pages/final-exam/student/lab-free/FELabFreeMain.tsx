import { ClockCircleOutlined } from "@ant-design/icons";
import { Grid, Group, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { InfoOutline, ProgressClockOutlined } from "src/assets/Icons/Fluent";

export interface IFELabFreeMain {}

const FELabFreeMain: React.FC<IFELabFreeMain> = ({}) => {
  return (
    <Stack mt={24} spacing="xl">
      <Grid className="bg-[rgb(239,246,255)] rounded-xl p-[24px]" columns={24}>
        <Grid.Col span={1}>
          <InfoOutline size={36} color={"#3B82F6"} />
        </Grid.Col>

        <Grid.Col span={23}>
          <Stack>
            <Title className="text-[22px] font-semibold text-[#3B82F6]">
              Informasi
            </Title>
            <Text className="text-[16px] font-semibold text-[#3B82F6]">
              Setelah mengajukan permohonan, tunggu hingga Kepala Laboratorium
              yang bersangkutan mengecek permohonan Anda. Jika diterima,
              silahkan download surat hasil permohonan. Jika ditolak, silahkan
              lakukan pengajuan ulang jika berkenan.
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={6}>
          <Group>
            <Stack>
              a
              </Stack>
          </Group>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
export default FELabFreeMain;
