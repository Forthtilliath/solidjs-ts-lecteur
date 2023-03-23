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
  const {
    current,
    play,
    previous,
    next,
    isPlaying,
    togglePlay,
    volume,
    setVolume,
    muted,
    toggleMuted,
    repeat,
    toggleRepeat,
    shuffle,
    toggleShuffle,
    timer,
    setTimer,
    timerLeft,
    toggleTimerLeft,
  } = usePlayer();
  let audioRef: HTMLAudioElement;

  let sti: number;
  onCleanup(() => clearInterval(sti));

  createEffect(() => {
    if (current() && isPlaying()) {
      audioRef.play();
      sti = setInterval(() => setTimer((timer) => timer + 0.1), 100);
    } else {
      audioRef.pause();
      clearInterval(sti);
    }
  });

  createEffect(() => {
    if (muted()) audioRef.volume = 0;
    else audioRef.volume = volume() / 100;
  });

  createEffect(() => console.log("volume", volume()));

  return (
    <div class={styles.wrapper}>
      <div class={styles.controls}>
        <div onClick={previous}>
          <BiSolidSkipPreviousCircle size={3} />
        </div>
        <div onClick={togglePlay}>
          <Show when={isPlaying()} fallback={<FaSolidCirclePlay size={3} />}>
            <FaSolidCirclePause size={3} />
          </Show>
        </div>
        <div onClick={next}>
          <BiSolidSkipNextCircle size={3} />
        </div>
      </div>
      <div class={styles.status}>
        <Show when={current()} keyed>
          {(current: TrackAlbum) => (
            <>
              <p class={styles.infos}>
                {current.title} - {current.artist}
              </p>
              <div class={styles.playbar}>
                <div class={styles.timer}>{secondsToMMSS(timer())}</div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  class={styles.bar}
                />
                <Show
                  when={timerLeft()}
                  fallback={
                    <div class={styles.timer} onClick={toggleTimerLeft}>
                      {secondsToMMSS(Math.ceil(current.duration - timer()))}
                    </div>
                  }
                >
                  <div class={styles.timer} onClick={toggleTimerLeft}>
                    {secondsToMMSS(current.duration)}
                  </div>
                </Show>
              </div>
            </>
          )}
        </Show>
        <audio
          src={"/src/assets/tracks/" + current()?.filename}
          ref={audioRef!}
        />
      </div>
      <div class={styles.features}>
        <div onClick={toggleRepeat}>
          <Switch>
            <Match when={repeat() === REPEAT.OFF}>
              <BsRepeat size={2} class={styles.disabled} />
            </Match>
            <Match when={repeat() === REPEAT.ONE}>
              <BsRepeat1 size={2} />
            </Match>
            <Match when={repeat() === REPEAT.ALL}>
              <BsRepeatAll size={2} />
            </Match>
          </Switch>
        </div>
        <div onClick={toggleShuffle}>
          <Show
            when={shuffle()}
            fallback={<BiRegularShuffle size={2} class={styles.disabled} />}
          >
            <BiRegularShuffle size={2} />
          </Show>
        </div>
        <div onClick={toggleMuted}>
          <Show
            when={!muted()}
            fallback={<FaSolidVolumeXmark size={2} class={styles.disabled} />}
          >
            <Switch>
              <Match when={volume() === 0}>
                <FaSolidVolumeOff size={2} />
              </Match>
              <Match when={volume() <= 33}>
                <FaSolidVolumeLow size={2} />
              </Match>
              <Match when={volume() <= 66}>
                <FaSolidVolumeMedium size={2} />
              </Match>
              <Match when={volume() <= 100}>
                <FaSolidVolumeHigh size={2} />
              </Match>
            </Switch>
          </Show>
        </div>
        <div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume()}
            onChange={setVolume}
          />
        </div>
      </div>
    </div>
  );
}
