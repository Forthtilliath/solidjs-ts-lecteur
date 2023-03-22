import { For } from "solid-js";
import { LaunchTrackType } from "./Player";
import styles from "@styles/player/TracksList.module.scss";
import Track from "./Track";

type Props = {
  tracks: Tracks;
  launchTrack: LaunchTrackType;
};

export function TracksList({ tracks, launchTrack }: Props) {
  return (
    <div class={styles.wrapper}>
      <For each={tracks} fallback={<div>Loading...</div>}>
        {(track, index) => (
          <Track {...track} index={index()} launchTrack={launchTrack} />
        )}
      </For>
    </div>
  );
}
