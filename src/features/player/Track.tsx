import styles from "@styles/player/Track.module.scss";
import { secondsToMMSS } from "@utils/methods/duration";
import { LaunchTrackType } from "./Player";

type Props = Track & {
  index: number;
  launchTrack: LaunchTrackType;
};

export default function Track({
  id,
  title,
  duration,
  index,
  launchTrack,
}: Props) {
  return (
    <div class={styles.wrapper} onClick={launchTrack(id)}>
      <div class={styles.index}>{index + 1}</div>
      <div class={styles.title}>{title}</div>
      <div class={styles.duration}>{secondsToMMSS(duration)}</div>
    </div>
  );
}
