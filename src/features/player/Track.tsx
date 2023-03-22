import styles from "@styles/player/Track.module.scss";
import { secondsToMMSS } from "@utils/methods/duration";
import { LaunchTrackType } from "./Player";

type Props = Track & {
  index: number;
  launchTrack: LaunchTrackType;
};

export function Track({ id, title, duration, index, launchTrack }: Props) {
  return (
    <div class={styles.wrapper} onClick={launchTrack(id)}>
      <div class={styles.index}>{index + 1}</div>
      <div class={styles.title}>{title}</div>
      <div class={styles.duration}>{secondsToMMSS(duration)}</div>
    </div>
  );
}

export function TrackHeader() {
  return (
    <div class={styles.header}>
      <div class={styles.index}>#</div>
      <div class={styles.title}>Titre</div>
      <div class={styles.duration}>mm:ss</div>
    </div>
  );
}
