import { usePlayer } from "@utils/contexts/playerContext";
import styles from "@styles/player/Progressbar.module.scss";
import { createMemo } from "solid-js";

export function ProgressBar() {
  const { timer, handleChangeTimer, duration } = usePlayer();
  const percentage = createMemo(() => (timer() / duration()) * 100);

  return (
    <input
      type="range"
      class={styles.range}
      style={{ "--percent": `${percentage()}%` }}
      min={0}
      max={duration()}
      value={timer()}
      step="0.01"
      onInput={(e) => handleChangeTimer(e.currentTarget.valueAsNumber)}
    />
  );
}
