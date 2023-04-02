import { usePlayer } from "@utils/contexts/playerContext";
import { BiSolidSkipNextCircle } from "@features/Icons";
import styles from "@styles/Button.module.scss";

export function NextButton() {
  const { next, isLastTrack } = usePlayer();
  return (
    <button
      type="button"
      class={styles.btn}
      onClick={next(true)}
      disabled={isLastTrack()}
      aria-label="Musique suivante"
    >
      <BiSolidSkipNextCircle size={3} />
    </button>
  );
}
