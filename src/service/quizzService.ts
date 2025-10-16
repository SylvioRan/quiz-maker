import type {CategoriesReponse} from "../models/categorie/CategoriesReponse.ts";
import type {QuizzRequest} from "../models/quizz/QuizzRequest.ts";
import type {QuizzCaracteristics} from "../models/quizz/QuizzCaracteristics.ts";

const CATEGORY_URL = "https://opentdb.com/api_category.php";
const QUIZZ_URL = 'https://opentdb.com/api.php';
const AMOUNT = '5';
const QUIZZ_MULTIPLE_TYPE = 'multiple';

/**
 * Récupération des catégories disponibles
 */
export async function recupererCategories(): Promise<CategoriesReponse> {
  try {
    const response = await fetch(CATEGORY_URL);
    if (!response.ok) throw new Error("Erreur réseau");
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    throw error;
  }
}

/**
 * Récupération du quizz en fonction de la catégorie et de la difficulté, le nombre de question et le type de quizz sont
 * définis respectivement à '5' et 'multiple'.
 *
 * @param categorie l'id de la catégorie sélectionnée
 * @param difficulte la difficulté sélectionnée easy, medium ou hard
 */
export async function recupererQuizz({categorie, difficulte}: QuizzRequest): Promise<QuizzCaracteristics[]> {
  try {
    const params: Record<string, string> = {
      amount: AMOUNT,
      type: QUIZZ_MULTIPLE_TYPE,
      category: categorie,
      difficulty: difficulte
    };
    const queryString: string = new URLSearchParams(params).toString();
    const url: string = `${QUIZZ_URL}?${queryString}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Erreur lors du chargement du quiz');
    const data = await response.json();
    return data.results.map(mapQuizzWithAnswers);
  } catch (error) {
    console.error("Erreur lors de la récupération du quizz :", error);
    throw error;
  }
}

/**
 * Comme la bonne réponse est séparée des mauvaises réponses, pour pouvoir récupérer toutes les réponses dans un seul
 * champ, on fait un petit mapping de ces données, dans le champ answers
 *
 * @param quizz le quizz pour extraire ses réponses
 */
function mapQuizzWithAnswers(quizz: QuizzCaracteristics): QuizzCaracteristics {
  return {
    ...quizz,
    answers: [...[quizz.correct_answer], ...quizz.incorrect_answers],
  };
}