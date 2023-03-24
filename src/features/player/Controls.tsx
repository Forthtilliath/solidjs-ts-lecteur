import { usePlayer } from "@assets/contexts/playerContext";
import {
  BiRegularShuffle,
  BiSolidSkipNextCircle,
  BiSolidSkipPreviousCircle,
  BsRepeat,
  BsRepeat1,
  BsRepeatAll,
  FaSolidCirclePause,
  FaSolidCirclePlay,
  FaSolidVolumeHigh,
  FaSolidVolumeLow,
  FaSolidVolumeMedium,
  FaSolidVolumeOff,
  FaSolidVolumeXmark,
} from "@features/Icons";
import styles from "@styles/player/Controls.module.scss";
import { REPEAT } from "@utils/constants";
import { secondsToMMSS } from "@utils/methods/duration";
import { createEffect, Match, onCleanup, Show, Switch } from "solid-js";

export function Controls() {
  const player = usePlayer();
  let audioRef: HTMLAudioElement;

  let sti: number;
  onCleanup(() => clearInterval(sti));

  createEffect(() => {
    clearInterval(sti);
    if (player.currentIndex() !== -1 && player.isPlaying()) {
      audioRef.play();
      sti = setInterval(() => player.setTimer((timer) => timer + 0.1), 100);
    } else {
      audioRef.pause();
    }
  });

  createEffect(() => {
    if (player.muted()) audioRef.volume = 0;
    else audioRef.volume = player.volume() / 100;
  });

  return (
    <div class={styles.wrapper}>
      <div class={styles.controls}>
        <button
          type="button"
          class={styles.btn}
          onClick={player.previous}
          disabled={player.previousIndexes().length === 0}
        >
          <BiSolidSkipPreviousCircle size={3} />
        </button>
        <button type="button" class={styles.btn} onClick={player.togglePlay}>
          <Show when={player.isPlaying()} fallback={<FaSolidCirclePlay size={3} />}>
            <FaSolidCirclePause size={3} />
          </Show>
        </button>
        <button type="button" class={styles.btn} onClick={player.next}>
          <BiSolidSkipNextCircle size={3} />
        </button>
      </div>
      <div class={styles.status}>
        <Show when={player.currentTrack()} keyed>
          {(current: TrackAlbum ) => (
            <>
              <p class={styles.infos}>
                {current.title} - {current.artist}
              </p>
              <div class={styles.playbar}>
                <div class={styles.timer}>{secondsToMMSS(player.timer())}</div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  class={styles.bar}
                />
                <Show
                  when={player.timerLeft()}
                  fallback={
                    <div class={styles.timer} onClick={player.toggleTimerLeft}>
                      {secondsToMMSS(current.duration)}
                    </div>
                  }
                >
                  <div class={styles.timer} onClick={player.toggleTimerLeft}>
                    {secondsToMMSS(Math.ceil(current.duration - player.timer()))}
                  </div>
                </Show>
              </div>
            </>
          )}
        </Show>
        <audio
          src={"/src/assets/tracks/" + player.currentTrack()?.filename}
          ref={audioRef!}
        />
      </div>
      <div class={styles.features}>
        <button type="button" class={styles.btn} onClick={player.toggleRepeat}>
          <Switch>
            <Match when={player.repeat() === REPEAT.OFF}>
              <BsRepeat size={2} class={styles.disabled} />
            </Match>
            <Match when={player.repeat() === REPEAT.ONE}>
              <BsRepeat1 size={2} />
            </Match>
            <Match when={player.repeat() === REPEAT.ALL}>
              <BsRepeatAll size={2} />
            </Match>
          </Switch>
        </button>
        <button type="button" class={styles.btn} onClick={player.toggleShuffle}>
          <Show
            when={player.shuffle()}
            fallback={<BiRegularShuffle size={2} class={styles.disabled} />}
          >
            <BiRegularShuffle size={2} />
          </Show>
        </button>
        <button type="button" class={styles.btn} onClick={player.toggleMuted}>
          <Show
            when={!player.muted()}
            fallback={<FaSolidVolumeXmark size={2} class={styles.disabled} />}
          >
            <Switch>
              <Match when={player.volume() === 0}>
                <FaSolidVolumeOff size={2} />
              </Match>
              <Match when={player.volume() <= 33}>
                <FaSolidVolumeLow size={2} />
              </Match>
              <Match when={player.volume() <= 66}>
                <FaSolidVolumeMedium size={2} />
              </Match>
              <Match when={player.volume() <= 100}>
                <FaSolidVolumeHigh size={2} />
              </Match>
            </Switch>
          </Show>
        </button>
        <div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={player.volume()}
            onChange={player.setVolume}
          />
        </div>
      </div>
    </div>
  );
}
