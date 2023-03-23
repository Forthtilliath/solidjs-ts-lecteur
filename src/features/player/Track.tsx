import { usePlayer } from "@assets/contexts/playerContext";
import styles from "@styles/player/Track.module.scss";
import { secondsToMMSS } from "@utils/methods/duration";
import classNames from "classnames";

type Props = TrackAlbum & {
  index: number;
};

export function Track(props: Props) {
  const { current, play } = usePlayer();
  
  return (
    <div
      class={classNames(styles.wrapper, {
        [styles.active]: current()?.id === props.id,
      })}
      onClick={play(props.id)}
    >
      <div class={styles.index}>{props.index + 1}</div>
      <div class={styles.title}>{props.title}</div>
      <div class={styles.artist}>{props.artist}</div>
      <div class={styles.album}>{props.album.name}</div>
      <div class={styles.duration}>{secondsToMMSS(props.duration)}</div>
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
