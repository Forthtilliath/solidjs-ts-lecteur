// import styles from "@styles/player/PreviousButton.module.scss";

import { usePlayer } from "@assets/contexts/playerContext";
import { BiSolidSkipPreviousCircle } from "@features/Icons";
import styles from "@styles/player/Controls.module.scss";

export function PreviousButton() {
  const { previous, isFirstTrack } = usePlayer();
  return (
    <button
      type="button"
      class={styles.btn}
      onClick={previous}
      disabled={isFirstTrack()}
    >
      <BiSolidSkipPreviousCircle size={3} />
    </button>
  );
}
