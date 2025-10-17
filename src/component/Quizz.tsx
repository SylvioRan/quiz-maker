import type {QuizzCaracteristics} from "../models/quizz/QuizzCaracteristics.ts";
import {useCallback, useEffect, useMemo, useState} from "react";
import {type NavigateFunction, useNavigate} from "react-router-dom";
import {decodeHtmlEntities} from "../utils/htmlUtils.ts";
import {melangerList} from "../utils/listUtils.ts";

type QuizzDisplayProps = {
  quizzList: QuizzCaracteristics[],
};

export default function Quizz({quizzList}: Readonly<QuizzDisplayProps>) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // A chaque fois que le quizz change, on réinitialise les réponses
  useEffect(() => {
    setAnswers({});
  }, [quizzList]);

  // On applique le mélange que si la liste de quizz se met à jour
  const quizzListMelange: QuizzCaracteristics[] = useMemo(() =>
    quizzList.map(quizz => ({
      ...quizz,
      answers: melangerList(quizz.answers)
    })), [quizzList]
  );

  const isChecked = (quizzId: string, answer: string): boolean => answers[quizzId] === answer;
  // On vérifie si chaque id de la question est bien présent dans les réponses pour afficher
  const displaySubmitButton = useCallback(() =>
      quizzList.map(quizz => quizz.id).every(id => id in answers)
    , [answers, quizzList]);

  // Stockage des réponses pour chaque question
  const handleChange = (questionId: string, answer: string): void => {
    setAnswers(prev => ({...prev, [questionId]: answer}));
  };

  const navigate: NavigateFunction = useNavigate();
  const handleSubmit = () => {
    // Stockage du quizz et des réponses, pour l'affichage des résultats
    localStorage.setItem('quizz', JSON.stringify(quizzListMelange));
    localStorage.setItem('answers', JSON.stringify(answers));

    navigate('/resultats');
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        {quizzListMelange.map((quizz: QuizzCaracteristics) => (
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
