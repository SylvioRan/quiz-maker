import {useEffect, useState} from "react";
import type {CategoriesReponse} from "../models/categorie/CategoriesReponse.ts";
import {recupererCategories} from "../service/quizzService.ts";

/**
 * Récupère les catégories possibles de quizz
 */
export function useCategories() {
  const [categories, setCategories] = useState<CategoriesReponse | null>(null);

  useEffect(() => {
    recupererCategories()
      .then(setCategories);
  }, []);

  return categories;
}