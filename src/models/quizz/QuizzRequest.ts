type DifficulteType = 'easy' | 'medium' | 'hard';

export type QuizzRequest = {
  categorie: number,
  difficulte: DifficulteType
};