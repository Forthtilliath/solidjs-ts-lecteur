import { usePlayer } from "@assets/contexts/playerContext";
import styles from "@styles/player/Controls.module.scss";

export function VolumeBar() {
  const { volume, setVolume } = usePlayer();
  return (
    <div>
      <input
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
