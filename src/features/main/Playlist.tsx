import { usePlayer } from "@utils/contexts/playerContext";
import styles from "@styles/Main.module.scss";
import { For } from "solid-js";
import { Track, TrackHeader } from "./Track";

export function Playlist() {
  const { playlist } = usePlayer();

  return (
    <div class={styles.wrapper_playlist}>
      <TrackHeader />
      <For each={playlist()} fallback={<div>Loading...</div>}>
        {(track, index) => {
          return <Track {...track} index={index()} />;
        }}
      </For>
    </div>
  );
}
