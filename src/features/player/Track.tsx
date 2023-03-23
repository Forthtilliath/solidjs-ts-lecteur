import { usePlayer } from "@assets/contexts/playerContext";
import styles from "@styles/player/Track.module.scss";
import { secondsToMMSS } from "@utils/methods/duration";

type Props = Track & {
  index: number;
};

export function Track(props: Props) {
  const { play } = usePlayer();
  // const play = (id: number) => () => {};
  return (
    <div class={styles.wrapper} onClick={play(props.id)}>
      <div class={styles.index}>{props.index + 1}</div>
      <div class={styles.title}>{props.title}</div>
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
