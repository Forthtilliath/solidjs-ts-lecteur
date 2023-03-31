import styles from "@styles/player/Footer.module.scss";
import { secondsToMMSS } from "@utils/methods/duration";
import { Show } from "solid-js";
import { usePlayer } from "@assets/contexts/playerContext";
import { ProgressBar } from "./ProgressBar";

export function Player() {
  const { currentTrack, timer, duration, timerLeft, toggleTimerLeft } =
    usePlayer();
  return (
    <Show when={currentTrack()} keyed>
      {(current: TrackAlbum) => (
        <>
          <p class={styles.infos}>
            <span>♫</span> <b>{current.title}</b> <span>♪</span>{" "}
            {current.artist}
          </p>
          <div class={styles.trackbarWrapper}>
            <div class={styles.timer}>
              <span>{secondsToMMSS(timer())}</span>
            </div>
            <ProgressBar />
            <div class={styles.timer} onClick={toggleTimerLeft}>
              <Show
                when={timerLeft()}
                fallback={<span>{secondsToMMSS(current.duration)}</span>}
              >
                <span>{secondsToMMSS(Math.ceil(duration() - timer()))}</span>
              </Show>
            </div>
          </div>
        </>
      )}
    </Show>
  );
}
