import { For } from "solid-js";
import styles from "@styles/player/TracksList.module.scss";
import { Track, TrackHeader } from "./Track";

type Props = {
  tracks: Tracks;
};

export function TracksList(props: Props) {
  return (
    <div class={styles.wrapper}>
      <TrackHeader />
      <For each={props.tracks} fallback={<div>Loading...</div>}>
        {(track, index) => <Track {...track} index={index()} />}
      </For>
    </div>
  );
}
