import { Transition } from "solid-transition-group";

import { usePlayer } from "@utils/contexts/playerContext";
import { Playlist, Tracklist } from "@features/main";

import styles from "@styles/Main.module.scss";

export function Main() {
  const { store } = usePlayer();
  return (
    <div class={styles.wrapper}>
      <Tracklist />
      <Transition name="playlist">
        {store.showPlaylist && <Playlist />}
      </Transition>
    </div>
  );
}
