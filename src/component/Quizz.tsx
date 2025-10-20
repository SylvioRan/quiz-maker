import type {QuizzCaracteristics} from "../models/quizz/QuizzCaracteristics.ts";
import {type FormEvent, type JSX, useCallback, useEffect} from "react";
import {type NavigateFunction, useNavigate} from "react-router-dom";
import {decodeHtmlEntities} from "../utils/htmlUtils.ts";
import {melangerList} from "../utils/listUtils.ts";
import {useQuizContext} from "../hooks/useQuizContext.ts";

type QuizzDisplayProps = {
  quizzList: QuizzCaracteristics[],
};

export default function Quizz({quizzList}: Readonly<QuizzDisplayProps>): JSX.Element {
  const {quiz, setQuiz, answers, setAnswer, resetAnswers} = useQuizContext();

  // A chaque fois que le quizz change, on réinitialise les réponses
  useEffect(() => {
    resetAnswers();
    const quizShuffle = quizzList.map(quizz => ({
      ...quizz,
      answers: melangerList(quizz.answers)
    }));
    setQuiz(quizShuffle);
  }, [quizzList, resetAnswers, setQuiz]);

  const isChecked = (quizzId: string, answer: string): boolean => answers[quizzId] === answer;
  // On vérifie si chaque id de la question est bien présent dans les réponses pour afficher
  const displaySubmitButton = useCallback(() =>
      quizzList.map(quizz => quizz.id).every(id => id in answers)
    , [answers, quizzList]);

  // Stockage des réponses pour chaque question
  const handleChange = (questionId: string, answer: string): void => {
    setAnswer(questionId, answer);
  };

  const navigate: NavigateFunction = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/resultats');
  };

  return (
    <section>
      <form onSubmit={(e) => handleSubmit(e)}>
        {quiz.map((quizz: QuizzCaracteristics) => (
          <div key={quizz.id}>
            <fieldset>
              <legend>{decodeHtmlEntities(quizz.question)}</legend>
              <div className="align-center">
                {quizz.answers.map((answer: string, index) => (
                  <label className={isChecked(quizz.id, answer) ? "card-radio selected" : "card-radio"} key={answer}
                         style={{width: '100%'}}>
                    <input
                      type="radio"
                      name={`reponse-${index}`}
                      value={answer}
                      checked={isChecked(quizz.id, answer)}
                      onChange={() => handleChange(quizz.id, answer)}
                    />
                    {decodeHtmlEntities(answer)}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        ))}

        {displaySubmitButton() && (
          <button type="submit">Submit</button>
        )}
      </form>

    </section>);
}
