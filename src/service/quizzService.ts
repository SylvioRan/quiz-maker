import type {CategoriesReponse} from "../models/categorie/CategoriesReponse.ts";
import type {QuizzReponse} from "../models/quizz/QuizzReponse.ts";
import type {QuizzRequest} from "../models/quizz/QuizzRequest.ts";

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
export async function recupererQuizz({categorie, difficulte}: QuizzRequest): Promise<QuizzReponse> {
  try {
    const params = {
      amount: AMOUNT,
      type: QUIZZ_MULTIPLE_TYPE,
      categorie: categorie.toString(),
      difficulte
    };
    const queryString = new URLSearchParams(params).toString();
    const url = `${QUIZZ_URL}?${queryString}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Erreur lors du chargement du quiz');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Erreur lors de la récupération du quizz :", error);
    throw error;
  }
}