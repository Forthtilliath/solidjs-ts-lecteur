import styles from "@styles/player/Player.module.scss";
import { tracks } from "@utils/data";
import { For } from "solid-js";
import Track from "./Track";
import { TracksList } from "./TracksList";

export function Player() {
  return (
    <div class={styles.wrapper}>
      <h1>Spotube</h1>
      <TracksList tracks={tracks} launchTrack={launchTrack} />
    </div>
  );
}

function launchTrack(id: number) {
  return function (_event: MouseEvent) {
    console.log("Launching track...", id);
  };
}
export type LaunchTrackType = typeof launchTrack;
