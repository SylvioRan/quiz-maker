/**
 * Mélange avec l'algorithme de Fisher-Yates. On parcourt le tableau de la fin vers le début, et pour chaque élément,
 * on l’échange avec un autre élément choisi aléatoirement parmi ceux qui le précèdent.
 *
 * @param liste
 */
export function melangerList<T>(liste: T[]): T[] {
  const melange = [...liste];
  for (let i = melange.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [melange[i], melange[j]] = [melange[j], melange[i]];
  }
  return melange;
}