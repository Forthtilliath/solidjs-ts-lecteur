import { usePlayer } from "@assets/contexts/playerContext";
import { BiSolidPlaylist } from "@features/Icons";
import styles from "@styles/global.module.scss";
import { Show } from "solid-js";

export function PlaylistButton() {
  const { showPlaylist, toggleShowPlaylist } = usePlayer();
  return (
    <button type="button" class={styles.btn} onClick={toggleShowPlaylist}>
      <Show
        when={showPlaylist()}
        fallback={<BiSolidPlaylist size={2} class={styles.disabled} />}
      >
        <BiSolidPlaylist size={2} />
      </Show>
    </button>
  );
}
