import { Grid, Stack, Text } from "@mantine/core";
import React from "react";
import FEScoreCircleBar from "src/components/fe-components/FEScoreCircleBar";
import FETableRow2 from "src/components/fe-components/table/FETableRow2";

export interface IFESeminarEvaluation {
  mentorNotes: Array<string>;
  rubric: string;
  score: number;
  scoreTitle?: string;
  paddingX?: string;
}

const FESeminarEvaluation: React.FC<IFESeminarEvaluation> = ({
  mentorNotes = [],
  rubric,
  score,
  scoreTitle,
  paddingX = "px-8",
}) => {
  for (let i = 0; i < 4; i++) {
    if (i >= mentorNotes.length) {
      mentorNotes.push("Tidak Ada");
    } else {
      if (mentorNotes[i] == "" || mentorNotes[i] == "-") {
        mentorNotes[i] = "Tidak Ada";
      }
    }
  }

  return (
    <Grid className={`mb-0 ` + paddingX} gutter={32} columns={24}>
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
          <FETableRow2
            subject="Pembimbing Utama"
            value={
              mentorNotes[0] !== "Tidak Ada"
                ? `“ ${mentorNotes[0]} ”`
                : mentorNotes[0]
            }
            withBottomBorder={false}
            paddingX="px-0"
          />
          <FETableRow2
            subject="Pembimbing Pendamping"
            value={
              mentorNotes[1] !== "Tidak Ada"
                ? `“ ${mentorNotes[1]} ”`
                : mentorNotes[1]
            }
            withBottomBorder={false}
            paddingX="px-0"
          />
          <FETableRow2
            subject="Penguji 1"
            value={
              mentorNotes[2] !== "Tidak Ada"
                ? `“ ${mentorNotes[2]} ”`
                : mentorNotes[2]
            }
            withBottomBorder={false}
            paddingX="px-0"
          />
          <FETableRow2
            subject="Penguji 2"
            value={
              mentorNotes[3] !== "Tidak Ada"
                ? `“ ${mentorNotes[3]} ”`
                : mentorNotes[3]
            }
            withBottomBorder={false}
            paddingX="px-0"
          />
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
export default FESeminarEvaluation;
