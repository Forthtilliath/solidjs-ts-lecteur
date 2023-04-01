import { usePlayer } from "@utils/contexts/playerContext";
import styles from "@styles/Progressbar.module.scss";
import { createMemo } from "solid-js";

export function ProgressBar() {
  const { store, setTimer } = usePlayer();
  const percentage = createMemo(() => (store.timer / store.duration) * 100);

  return (
    <input
      type="range"
      class={styles.range}
      style={{ "--percent": `${percentage()}%` }}
      min={0}
      max={store.duration}
      value={store.timer}
      step="0.01"
      onInput={(e) => setTimer(e.currentTarget.valueAsNumber)}
    />
  );
}
