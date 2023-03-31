import { usePlayer } from "@assets/contexts/playerContext";
import styles from "@styles/player/Playlist.module.scss";
import { For } from "solid-js";
import { Track, TrackHeader } from "./Track";

export default function Playlist() {
  const { playlist } = usePlayer();

  return (
    <div class={styles.wrapper}>
      <TrackHeader />
      <For each={playlist()} fallback={<div>Loading...</div>}>
        {(track, index) => {
          return <Track {...track} index={index()} />;
        }}
      </For>
    </div>
  );
}
