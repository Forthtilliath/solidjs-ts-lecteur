import { Show } from "solid-js";

import { usePlayer } from "@utils/contexts/playerContext";
import { BiSolidPlaylist } from "@features/Icons";

import styles from "@styles/Button.module.scss";

export function PlaylistButton() {
  const { store, toggleShowPlaylist } = usePlayer();

  return (
    <button
      type="button"
      class={styles.btn}
      onClick={toggleShowPlaylist}
      aria-label={
        store.showPlaylist ? "Cacher la playlist" : "Afficher la playlist"
      }
    >
      <Show
        when={store.showPlaylist}
        fallback={<BiSolidPlaylist size={2} class={styles.disabled} />}
      >
        <BiSolidPlaylist size={2} />
      </Show>
    </button>
  );
}
