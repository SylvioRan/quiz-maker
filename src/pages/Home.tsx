import {useCategories} from "../hooks/useCategories.ts";
import CreateQuizz from "../component/CreateQuizz.tsx";

export default function Home() {
  const categories = useCategories();

  return (
    <>
      <div className="text-centered">
        <h5>QUIZZ MAKER</h5>

        <CreateQuizz categories={categories?.trivia_categories ?? []}/>
      </div>
    </>
  )
}