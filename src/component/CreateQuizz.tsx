import type {Categorie} from "../models/categorie/Categorie.ts";
import {type FormEvent, type JSX, useState} from "react";
import type {Difficulte} from "../models/difficulte/Difficulte.ts";
import {recupererQuizz} from "../service/quizzService.ts";
import type {DifficulteType} from "../models/difficulte/DifficulteType.ts";
import type {QuizzCaracteristics} from "../models/quizz/QuizzCaracteristics.ts";
import Quizz from "./Quizz.tsx";

type CreatQuizzProps = {
  categories: Categorie[],
};

export default function CreateQuizz({categories}: Readonly<CreatQuizzProps>): JSX.Element {
  const [categorie, setCategorie] = useState<string>('');
  const [difficulte, setDifficulte] = useState<string>('');
  const [quizz, setQuizz] = useState<QuizzCaracteristics[] | null>(null);

  const difficulteList: Difficulte[] = [
    {valeur: 'easy', description: 'Easy'},
    {valeur: 'medium', description: 'Medium'},
    {valeur: 'hard', description: 'Hard'},
  ];

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // Permet de ne pas faire rafraichir la page

    if (!categorie || !difficulte) {
      alert('Veuillez sélectionner une catégorie et une difficulté.');
      return;
    }

    recupererQuizz({categorie, difficulte: difficulte as DifficulteType})
      .then(questions => {
        setQuizz(questions);
      })
      .catch(console.error);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="align-center">
          <select id="categorySelect" value={categorie} onChange={event => setCategorie(event.target.value)}>
            <option value="">Select a Category</option>
            {categories.map(categorie => (
              <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
            ))}
          </select>

          <select id="difficultySelect" value={difficulte} onChange={event => setDifficulte(event.target.value)}>
            <option value="">Select difficulty</option>
            {difficulteList.map(d => (
              <option key={d.valeur} value={d.valeur}>{d.description}</option>
            ))}
          </select>

          <button id="createBtn" type="submit">Create</button>
        </div>
      </form>

      {(quizz && quizz?.length > 0) && (<Quizz quizzList={quizz}/>)}
    </>
  );
}