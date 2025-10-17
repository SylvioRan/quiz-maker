import {useCategories} from "../hooks/useCategories.ts";
import CreateQuizz from "../component/CreateQuizz.tsx";
import type {CategoriesReponse} from "../models/categorie/CategoriesReponse.ts";
import type {JSX} from "react";

export default function QuizzMaker(): JSX.Element {
  const categories: CategoriesReponse | null = useCategories();

  return (
    <div className="text-centered">
      <h5>QUIZZ MAKER</h5>

      <CreateQuizz categories={categories?.trivia_categories ?? []}/>
    </div>
  )
}