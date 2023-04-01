import { createEffect } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";

export function createStorage<T extends object>(
  name: string,
  init: T,
  storage = localStorage
): [Store<T>, SetStoreFunction<T>] {
  const localState = storage.getItem(name);
  const value = localState ? (JSON.parse(localState) as T) : init;
  const [state, setState] = createStore<T>(value);
  createEffect(() => storage.setItem(name, JSON.stringify(state)));
  return [state, setState];
}
