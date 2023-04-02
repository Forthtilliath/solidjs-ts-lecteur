import { usePlayer } from "@utils/contexts/playerContext";

import styles from "@styles/Footer.module.scss";

export function VolumeBar() {
  const { store, setVolume } = usePlayer();
  return (
    <div>
      <input
        class={styles.volume}
        type="range"
        min="0"
        max="1"
        step=".01"
        value={store.volume}
        onInput={(e) => setVolume(e.currentTarget.valueAsNumber)}
        aria-label="Modifier le volume"
      />
    </div>
  );
}
