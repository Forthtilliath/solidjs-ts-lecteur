import styles from "@styles/Main.module.scss";

import { usePlayer } from "@assets/contexts/playerContext";
import Playlist from "./player/Playlist";
import { Transition, TransitionGroup } from "solid-transition-group";
import { Tracklist } from "./player/Tracklist";

export function Main() {
  const { showPlaylist } = usePlayer();

  return (
    <div class={styles.wrapper}>
      <TransitionGroup>
        <Tracklist />
      </TransitionGroup>
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
        {showPlaylist() && <Playlist />}
      </TransitionGroup>
    </div>
  );
}
