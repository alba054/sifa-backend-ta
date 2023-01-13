export function getFERubric(score:number){
  let rubric;
  if(score>=85 && score<=100){
    rubric= "A"
  }else if(score>=80){
    rubric= "A-"
  } else if(score>=75){
    rubric= "B+"
  } else if(score>=70){
    rubric= "B"
  } else if(score>=65){
    rubric= "B-"
  } else if(score>=60){
    rubric= "C+"
  } else if(score>=59){
    rubric= "C"
  } else if(score>=40){
    rubric= "D"
  } else if(score>=0 && score<40){
    rubric= "E"
  } else{
    rubric= "-"
  }

  return rubric
}