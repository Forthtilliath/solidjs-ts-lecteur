// import styles from "@styles/PreviousButton.module.scss";

import { usePlayer } from "@utils/contexts/playerContext";
import { BiSolidSkipPreviousCircle } from "@features/Icons";
import styles from "@styles/Button.module.scss";

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
