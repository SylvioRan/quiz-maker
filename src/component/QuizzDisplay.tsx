import type {QuizzCaracteristics} from "../models/quizz/QuizzCaracteristics.ts";
import {useCallback, useEffect, useMemo, useState} from "react";

type QuizzDisplayProps = {
  quizzList: QuizzCaracteristics[],
};

export default function QuizzDisplay({quizzList}: QuizzDisplayProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  // A chaque fois que le quizz change, on réinitialise les réponses
  useEffect(() => {
    setAnswers({});
  }, [quizzList]);

  const quizzListMelange: QuizzCaracteristics[] = useMemo(() =>
    quizzList.map(quizz => ({
      ...quizz,
      answers: melangerList(quizz.answers)
    })), [quizzList]
  );

  const isChecked = (quizzId: string, answer: string) => answers[quizzId] === answer;
  // On vérifie si chaque id de la question est bien présent dans les réponses pour afficher
  const displaySubmitButton = useCallback(() =>
      quizzList.map(quizz => quizz.id).every(id => id in answers)
    , [answers, quizzList]);

  const handleChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({...prev, [questionId]: answer}));
  };

  return (
    <section>
      <form>
        {quizzListMelange.map((quizz: QuizzCaracteristics) => (
          <div key={quizz.id}>
            <fieldset>
              <legend dangerouslySetInnerHTML={{__html: quizz.question}}/>
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
                    {answer}
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

/**
 * Mélange avec l'algorithme de Fisher-Yates. On parcourt le tableau de la fin vers le début, et pour chaque élément,
 * on l’échange avec un autre élément choisi aléatoirement parmi ceux qui le précèdent.
 * @param liste
 */
function melangerList<T>(liste: T[]): T[] {
  const melange = [...liste];
  for (let i = melange.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [melange[i], melange[j]] = [melange[j], melange[i]];
  }
  return melange;
}