import type {QuizzCaracteristics} from "../models/quizz/QuizzCaracteristics.ts";

type QuizzDisplayProps = {
  quizzList: QuizzCaracteristics[],
};

export default function QuizzDisplay({quizzList}: QuizzDisplayProps) {
  console.log(quizzList)
  return (<>Quizz Display</>);
}