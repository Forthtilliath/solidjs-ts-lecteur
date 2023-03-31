// import styles from "@styles/player/PreviousButton.module.scss";

import { usePlayer } from "@assets/contexts/playerContext";
import { BiSolidSkipNextCircle } from "@features/Icons";
import styles from "@styles/player/Controls.module.scss";

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
