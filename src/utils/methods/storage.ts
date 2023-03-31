/**
 * It takes a Storage object (localStorage or sessionStorage) and returns an object with the same keys
 * and values, but with the values parsed from JSON.
 * @param {Storage} storage - Storage - the storage object you want to parse
 * @author Forth
 * @returns An object with the key of the storage item and the value of the parsed JSON.
 */
export function getParsedStorage(storage: Storage) {
  return Object.entries(storage).reduce(
    (o, [k, v]) => Object.assign(o, { [k]: JSON.parse(v) }),
    {}
  );
}
