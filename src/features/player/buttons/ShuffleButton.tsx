import { usePlayer } from "@assets/contexts/playerContext";
import { BiRegularShuffle } from "@features/Icons";
import styles from "@styles/player/Controls.module.scss";
import { Show } from "solid-js";

export function ShuffleButton() {
  const { shuffle, toggleShuffle } = usePlayer();
  return (
    <button type="button" class={styles.btn} onClick={toggleShuffle}>
      <Show
        when={shuffle()}
        fallback={<BiRegularShuffle size={2} class={styles.disabled} />}
      >
        <BiRegularShuffle size={2} />
      </Show>
    </button>
  );
}
