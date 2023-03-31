// https://decipher.dev/30-seconds-of-typescript/docs/

/**
 * Mélange un tableau en utilisant l'algorithme [**Fisher-Yates**](https://fr.wikipedia.org/wiki/M%C3%A9lange_de_Fisher-Yates).
 * @param {T[]} array - Tableau à mélanger.
 * @returns Tableau mélangé aléatoirement
 */
export function shuffle<T>(array: T[]): T[] {
  let index = array.length;
  while (index) {
    const n = Math.floor(Math.random() * index--);
    [array[index], array[n]] = [array[n], array[index]];
  }
  return array;
}
