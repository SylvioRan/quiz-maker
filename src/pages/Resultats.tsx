import type {QuizzCaracteristics} from "../models/quizz/QuizzCaracteristics.ts";
import {decodeHtmlEntities} from "../utils/htmlUtils.ts";

function getRadioClass(quizz: QuizzCaracteristics[], answers: Record<string, string>, quizzquestionId: string, answer: string): string {
  const userAnswer = answers[quizzquestionId];
  const correctAnswer = quizz.find(q => q.id === quizzquestionId)?.correct_answer ?? '';

  if (answer === correctAnswer) {
    return 'card-radio correct'; // toujours vert
  }

  if (answer === userAnswer && userAnswer !== correctAnswer) {
    return 'card-radio incorrect'; // rouge si mauvaise sélection
  }

  return 'card-radio'; // neutre
}


export default function Resultats() {
  const quizzList: QuizzCaracteristics[] = JSON.parse(localStorage.getItem('quizz') || '[]');
  const answers: Record<string, string> = JSON.parse(localStorage.getItem('answers') || '{}');

  const isChecked = (quizzId: string, answer: string) => answers[quizzId] === answer;

  return (
    <>
      <div className="text-centered">
        <h5>RESULTS</h5>

        {quizzList.map((quizz: QuizzCaracteristics) => (
          <div key={quizz.id}>
            <fieldset>
              <legend>{decodeHtmlEntities(quizz.question)}</legend>
              <div className="align-center">
                {quizz.answers.map((answer: string, index) => (
                  <label className={getRadioClass(quizzList, answers, quizz.id, answer)} key={answer}
                         style={{width: '100%'}}>
                    <input
                      type="radio"
                      name={`reponse-${index}`}
                      value={answer}
                      checked={isChecked(quizz.id, answer)}
                      disabled
                    />
                    {decodeHtmlEntities(answer)}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        ))}
      </div>
    </>
  );
}