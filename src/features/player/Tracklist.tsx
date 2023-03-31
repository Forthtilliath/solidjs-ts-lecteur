import { For } from "solid-js";
import styles from "@styles/Main.module.scss";
import { Track, TrackHeader } from "./Track";
import { usePlayer } from "@assets/contexts/playerContext";

export function Tracklist() {
  const { tracklist } = usePlayer();

  return (
    <div class={styles.wrapper_tracklist}>
      <TrackHeader />
      <For each={tracklist} fallback={<div>Loading...</div>}>
        {(track, index) => <Track {...track} index={index()} />}
      </For>
    </div>
  );
}
