/**
 * Il y a du contenu HTML dans les réponses envoyés, il faut donc les décoder pour avoir du texte propre
 *
 * @param text le texte contenant du HTML à décoder
 */
export function decodeHtmlEntities(text: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  return doc.documentElement.textContent || '';
}