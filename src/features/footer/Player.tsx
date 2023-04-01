import styles from "@styles/Footer.module.scss";
import { secondsToMMSS } from "@utils/methods/duration";
import { Show } from "solid-js";
import { usePlayer } from "@utils/contexts/playerContext";
import { ProgressBar } from "./ProgressBar";

export function Player() {
  const { store, toggleTimerLeft } =
    usePlayer();
  return (
    <Show when={store.currentTrack} keyed>
      {(current: TrackAlbum) => (
        <>
          <p class={styles.infos}>
            <span>♫</span> <b>{current.title}</b> <span>♪</span>{" "}
            {current.artist}
          </p>
          <div class={styles.trackbarWrapper}>
            <div class={styles.timer}>
              <span>{secondsToMMSS(store.timer)}</span>
            </div>
            <ProgressBar />
            <div class={styles.timer} onClick={toggleTimerLeft}>
              <Show
                when={store.timerLeft}
                fallback={<span>{secondsToMMSS(store.duration)}</span>}
              >
                <span>{secondsToMMSS(Math.ceil(store.duration - store.timer))}</span>
              </Show>
            </div>
          </div>
        </>
      )}
    </Show>
  );
}
