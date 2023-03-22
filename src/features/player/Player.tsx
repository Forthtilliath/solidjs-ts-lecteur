import styles from "@styles/player/Player.module.scss";
import { tracks } from "@utils/data";
import { Controls } from "./Controls";
import { TracksList } from "./TracksList";

export function Player() {
  return (
    <div class={styles.wrapper}>
      <h1>Spotube</h1>
      <TracksList tracks={tracks} launchTrack={launchTrack} />
      <Controls />
    </div>
  );
}

function launchTrack(id: number) {
  return function (_event: MouseEvent) {
    console.log("Launching track...", id);
  };
}
export type LaunchTrackType = typeof launchTrack;
