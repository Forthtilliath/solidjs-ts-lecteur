import { usePlayer } from "@utils/contexts/playerContext";
import { FaSolidCirclePause, FaSolidCirclePlay } from "@features/Icons";
import styles from "@styles/Button.module.scss";
import { Show } from "solid-js";

export function PlayButton() {
  const { store, togglePlay } = usePlayer();
  return (
    <button type="button" class={styles.btn} onClick={togglePlay}>
      <Show when={store.isPlaying} fallback={<FaSolidCirclePlay size={3} />}>
        <FaSolidCirclePause size={3} />
      </Show>
    </button>
  );
}
