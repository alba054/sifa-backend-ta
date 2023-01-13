import { Group, RingProgress, Stack, Text } from "@mantine/core";
import { getFERubric } from "src/utils/functions/scoring.function";

interface IFEScoreCircleBarProps {
  score: string;
  title: string;
  rubric?: string | undefined;
}

function FEScoreCircleBar({ score, title }: IFEScoreCircleBarProps) {
  let color: string = "";
  
  let floatScore= parseFloat(score)
  const rubric = getFERubric(floatScore)

  if (rubric === "A") {
    color = "#1E9E63";
  } else if (rubric === "A-") {
    color = "#1E9E63";
  } else if (rubric === "B+") {
    color = "#FACC15";
  } else if (rubric === "B") {
    color = "#FACC15";
  } else if (rubric === "B-") {
    color = "#FACC15";
  } else if (rubric === "C+") {
    color = "#FF2C56";
  } else if (rubric === "C") {
    color = "#FF2C56";
  } else if (rubric === "D") {
    color = "#FF2C56";
  } else {
    color = "#FF2C56";
  }

  return (
    <Group position="center">
      <RingProgress
        roundCaps
        size={125}
        sections={[
          {
            value: floatScore,
            color: color,
          },
        ]}
        label={
          <Text color="primary-text" weight={700} size="xl" align="center">
            {rubric}
          </Text>
        }
      />
      <Stack spacing={0}>
        <Text color="primary-text" weight={700} size={28}>
          {floatScore}
        </Text>
        <Text color="secondary-text" weight={600} size={18}>
          {title}
        </Text>
      </Stack>
    </Group>
  );
}

export default FEScoreCircleBar;
