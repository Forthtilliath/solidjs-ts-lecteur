import styles from "@styles/player/Player.module.scss";
import { tracks } from "@utils/data";
import { Logo } from "./Logo";
import { TracksList } from "./TracksList";

export function Player() {
  return (
    <div class={styles.wrapper}>
      <Logo />
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
