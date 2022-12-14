import { Grid, Stack, Text } from "@mantine/core";
import React, { useEffect } from "react";
import FEScoreCircleBar from "src/components/fe-components/FEScoreCircleBar";
import FETableHeader from "src/components/fe-components/FETableHeader";
import FESeminarTableRow from "./FESeminarTableRow";

export interface IFESeminarEvaluation {
  mentorNotes: Array<string>;
  rubric: string;
  score: number;
  scoreTitle?: string;
}

const FESeminarEvaluation: React.FC<IFESeminarEvaluation> = ({
  mentorNotes,
  rubric,
  score,
  scoreTitle,
}) => {
  if (mentorNotes.length < 4) {
    for (let i = 0; i < 4 - mentorNotes.length; i++) {
      mentorNotes.push("--");
    }
  }

  return (
    <FETableHeader title="Pasca-Seminar">
      <Grid className="px-8 mb-0" gutter={32} columns={24}>
        <Grid.Col span={"auto"}>
          <div className="border p-2 border-secondary-500 rounded-xl">
            <FEScoreCircleBar
              rubric={rubric}
              score={`${score}`}
              title={scoreTitle === undefined ? "Nilai" : scoreTitle}
            />
          </div>
        </Grid.Col>
        <Grid.Col
          span={17}
          md={17}
          sm={24}
          className="flex flex-col gap-3 overflow-clip"
        >
          <Text className="text-primary-text-500 text-xl font-semibold">
            Catatan Pembimbing & Penguji
          </Text>
          <Stack className="gap-0">
            <FESeminarTableRow
              subject="Pembimbing Utama"
              value={
                mentorNotes[0] !== "--" ? `“${mentorNotes[0]}”` : mentorNotes[0]
              }
              withBottomBorder={false}
              paddingX="px-0"
            />
            <FESeminarTableRow
              subject="Pembimbing Pendamping"
              value={
                mentorNotes[1] !== "--" ? `“${mentorNotes[1]}”` : mentorNotes[1]
              }
              withBottomBorder={false}
              paddingX="px-0"
            />
            <FESeminarTableRow
              subject="Penguji 1"
              value={
                mentorNotes[2] !== "--" ? `“${mentorNotes[2]}”` : mentorNotes[2]
              }
              withBottomBorder={false}
              paddingX="px-0"
            />
            <FESeminarTableRow
              subject="Penguji 2"
              value={
                mentorNotes[3] !== "--" ? `“${mentorNotes[3]}”` : mentorNotes[3]
              }
              withBottomBorder={false}
              paddingX="px-0"
            />
          </Stack>
        </Grid.Col>
      </Grid>
    </FETableHeader>
  );
};
export default FESeminarEvaluation;
