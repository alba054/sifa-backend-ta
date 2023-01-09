import { Group, RingProgress, Stack, Text } from "@mantine/core";

interface IFEScoreCircleBarProps {
  score: string;
  title: string;
  rubric?: string | undefined;
}

function FEScoreCircleBar({ score, title, rubric }: IFEScoreCircleBarProps) {
  let color: string = "";
  
  let floatScore= parseFloat(score)
  if(floatScore>=95 && floatScore<=100){
    rubric= "A"
  }else if(floatScore>=90){
    rubric= "A-"
  } else if(floatScore>=85){
    rubric= "B+"
  } else if(floatScore>=80){
    rubric= "B"
  } else if(floatScore>=75){
    rubric= "B-"
  } else if(floatScore>=70){
    rubric= "C+"
  } else if(floatScore>=65){
    rubric= "C"
  } else if(floatScore>=60){
    rubric= "D"
  } else if(floatScore>=0 && floatScore<60){
    rubric= "E"
  } else{
    rubric= "-"
  }

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
