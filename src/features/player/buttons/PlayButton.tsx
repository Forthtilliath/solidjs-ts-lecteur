// import styles from "@styles/player/PreviousButton.module.scss";

import { usePlayer } from "@assets/contexts/playerContext";
import { FaSolidCirclePause, FaSolidCirclePlay } from "@features/Icons";
import styles from "@styles/player/Controls.module.scss";
import { Show } from "solid-js";

export function PlayButton() {
  const { isPlaying, togglePlay } = usePlayer();
  return (
    <button type="button" class={styles.btn} onClick={togglePlay}>
      <Show when={isPlaying()} fallback={<FaSolidCirclePlay size={3} />}>
        <FaSolidCirclePause size={3} />
      </Show>
    </button>
  );
}
