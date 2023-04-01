import { usePlayer } from "@utils/contexts/playerContext";

import styles from "@styles/Footer.module.scss";

export function VolumeBar() {
  const { volume, setVolume } = usePlayer();
  return (
    <div>
      <input
        class={styles.volume}
        type="range"
        min="0"
        max="1"
        step=".01"
        value={volume()}
        onInput={(e) => setVolume(e.currentTarget.valueAsNumber)}
      />
    </div>
  );
}
