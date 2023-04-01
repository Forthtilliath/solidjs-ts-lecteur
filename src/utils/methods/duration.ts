/**
 * It takes a number of seconds and returns a string in the format of mm:ss.
 *
 * @example
 * console.log(secondsToMMSS(60)); // 01:00
 * console.log(secondsToMMSS(90)); // 01:30
 * console.log(secondsToMMSS(120)); // 02:00
 * console.log(secondsToMMSS(150)); // 02:30
 *
 * @param [seconds=0] - The number of seconds to convert to MM:SS format.
 */
export function secondsToMMSS(seconds = 0) {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
}

/**
 * Closure function pour ajouter un délai entre 2 exécutions d'une fonction callback
 * @param {number} duration - number - Durée en millisecondes avant de pouvoir réexécuter le callback
 * @returns 
 * Retourne un tableau de 2 fonctions :
 * 
 * - La première est le setup de la closure function
 * - La seconde permet de détruire le setTimeout en cours
 */
export function setupCooldown(duration: number) {
  let cooldown = false;
  let sti: number;

  const fn = (cb: () => void) => {
    if (cooldown) return;

    cooldown = true;
    sti = setTimeout(function () {
      cooldown = false;
    }, duration);
    return cb();
  };

  /** Clear the setTimeout */
  const clear = () => {
    clearTimeout(sti);
    cooldown = false;
  };

  return [fn, clear] as const;
}
