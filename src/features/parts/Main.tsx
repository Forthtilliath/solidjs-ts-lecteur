import { TransitionGroup } from "solid-transition-group";

import { usePlayer } from "@utils/contexts/playerContext";
import { Playlist, Tracklist } from "@features/main";

import styles from "@styles/Main.module.scss";

export function Main() {
  const { store } = usePlayer();

  return (
    <div class={styles.wrapper}>
      <Tracklist />
      <TransitionGroup
        onEnter={(el, done) => {
          const a = el.animate(
            [{ transform: "translatex(100%)" }, { transform: "translatex(0)" }],
            {
              duration: 600,
            }
          );
          a.finished.then(done);
        }}
        onExit={(el, done) => {
          const a = el.animate(
            [{ transform: "translatex(0)" }, { transform: "translatex(100%)" }],
            {
              duration: 600,
            }
          );
          a.finished.then(done);
        }}
      >
        {store.showPlaylist && <Playlist />}
      </TransitionGroup>
    </div>
  );
}
