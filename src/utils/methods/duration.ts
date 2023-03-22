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
