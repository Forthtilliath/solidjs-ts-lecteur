import { usePlayer } from "@utils/contexts/playerContext";
import { BsRepeat, BsRepeat1, BsRepeatAll } from "@features/Icons";
import styles from "@styles/Button.module.scss";
import { REPEAT } from "@utils/constants";
import { Match, Switch } from "solid-js";

export function RepeatButton() {
  const { store, toggleRepeat } = usePlayer();
  return (
    <button
      type="button"
      class={styles.btn}
      onClick={toggleRepeat}
      aria-label="Modifier le mode de répétition"
    >
      <Switch>
        <Match when={store.repeat === REPEAT.OFF}>
          <BsRepeat size={2} class={styles.disabled} />
        </Match>
        <Match when={store.repeat === REPEAT.ONE}>
          <BsRepeat1 size={2} />
        </Match>
        <Match when={store.repeat === REPEAT.ALL}>
          <BsRepeatAll size={2} />
        </Match>
      </Switch>
    </button>
  );
}
