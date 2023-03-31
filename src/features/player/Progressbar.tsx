import { usePlayer } from "@assets/contexts/playerContext";
import styles from "@styles/player/Progressbar.module.scss";
import { createMemo } from "solid-js";

export function Progressbar() {
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
