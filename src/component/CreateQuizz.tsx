import type {Categorie} from "../models/categorie/Categorie.ts";

type CreatQuizzProps = {
  categories: Categorie[],
};

export default function CreateQuizz({categories}: CreatQuizzProps) {
  const difficultes = [
    {valeur: 'easy', description: 'Easy'},
    {valeur: 'medium', description: 'Medium'},
    {valeur: 'hard', description: 'Hard'},
  ];

  return (
    <>
      <form>
        <div className="align-center">
          <select id="categorySelect">
            <option value="">Select a Category</option>
            {categories.map(categorie => (
              <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
            ))}
          </select>

          <select id="difficultySelect">
            {difficultes.map(d => (
              <option key={d.valeur} value={d.valeur}>{d.description}</option>
            ))}
          </select>

          <button id="createBtn" type="submit">Create</button>
        </div>
      </form>
    </>
  );
}