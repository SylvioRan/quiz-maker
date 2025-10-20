import type {QuizzCaracteristics} from "../models/quizz/QuizzCaracteristics.ts";
import {decodeHtmlEntities} from "../utils/htmlUtils.ts";
import {type NavigateFunction, useNavigate} from "react-router-dom";
import type {JSX} from "react";
import {useQuizContext} from "../hooks/useQuizContext.ts";

/**
 * Récupérer la couleur de la réponse. Toutes les bonnes réponses sont en verts
 * Si la personne a sélectionné une réponse et que c'est une mauvaise réponse, ce dernier devient rouge
 *
 * @param quizz la liste de question
 * @param answers les réponses données par l'utilisateur pour chaque question
 * @param quizzquestionId l'Id de la question actuelle pour récupérer les valeurs nécessaires sur les objets précédents
 * @param answer La réponse donnée
 */
function getRadioClass(quizz: QuizzCaracteristics[], answers: Record<string, string>, quizzquestionId: string, answer: string): string {
  const userAnswer: string = answers[quizzquestionId];
  const correctAnswer: string = quizz.find(q => q.id === quizzquestionId)?.correct_answer ?? '';

  if (answer === correctAnswer) {
    return 'card-radio correct'; // toujours vert
  }

  if (answer === userAnswer && userAnswer !== correctAnswer) {
    return 'card-radio incorrect'; // rouge si mauvaise sélection
  }

  return 'card-radio'; // neutre
}

/**
 * Récupération de la couleur du champ pour le score
 * - Si on a 0 ou 1 bonne réponse, en rouge
 * - Si on a 2 ou 3 bonnes réponses, en jaune
 * - Si on a 4 ou 5 bonnes réponses, en vert
 *
 * @param score le nombre de bonnes réponses validés
 */
function getMarkColor(score: number): string {
  if (score === 0 || score === 1) {
    return "mark-red";
  } else if (score === 2 || score === 3) {
    return "mark-yellow";
  } else if (score >= 4) {
    return "mark-green";
  }

  return "";
}

export default function Resultats(): JSX.Element {
  const {quiz, answers, resetAnswers} = useQuizContext();
  const isChecked = (quizzId: string, answer: string): boolean => answers[quizzId] === answer;

  const nbReponseVrai: number = quiz.reduce((count, q) => {
    const reponseUser: string = answers[q.id];
    const isBonneReponse: boolean = reponseUser === q.correct_answer;
    return count + (isBonneReponse ? 1 : 0);
  }, 0);

  const navigate: NavigateFunction = useNavigate();
  const createNewQuizz = () => {
    // Nettoyage des éléments en localStorage
    resetAnswers();

    navigate('/');
  };

  return (
    <div className="text-centered">
      <h5>RESULTS</h5>

      {quiz.map((quizz: QuizzCaracteristics) => (
        <div key={quizz.id}>
          <fieldset>
            <legend>{decodeHtmlEntities(quizz.question)}</legend>
            <div className="align-center">
              {quizz.answers.map((answer: string, index) => (
                <label className={getRadioClass(quiz, answers, quizz.id, answer)} key={answer}
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

      <p>
        <mark className={getMarkColor(nbReponseVrai)}>
          You scored {nbReponseVrai} out of {quiz.length}
        </mark>
      </p>

      <button type="button" onClick={createNewQuizz}>
        Create a new quizz
      </button>
    </div>
  );
}