import { For } from "solid-js";
import styles from "@styles/player/TracksList.module.scss";
import { Track, TrackHeader } from "./Track";
import { usePlayer } from "@assets/contexts/playerContext";

export function Tracklist() {
  const { tracklist } = usePlayer();

  return (
    <div class={styles.wrapper}>
      <TrackHeader />
      <For each={tracklist} fallback={<div>Loading...</div>}>
        {(track, index) => <Track {...track} index={index()} />}
      </For>
    </div>
  );
}
