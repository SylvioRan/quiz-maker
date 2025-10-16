import type {DifficulteType} from "../difficulte/DifficulteType.ts";

export type QuizzRequest = {
  categorie: string,
  difficulte: DifficulteType,
};