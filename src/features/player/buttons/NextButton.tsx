import { usePlayer } from "@assets/contexts/playerContext";
import { BiSolidSkipNextCircle } from "@features/Icons";
import styles from "@styles/global.module.scss";

export function NextButton() {
  const { next, isLastTrack } = usePlayer();
  return (
    <button
      type="button"
      class={styles.btn}
      onClick={next(true)}
      disabled={isLastTrack()}
    >
      <BiSolidSkipNextCircle size={3} />
    </button>
  );
}
