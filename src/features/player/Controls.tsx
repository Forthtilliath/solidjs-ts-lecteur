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
import { createEffect, Match, Show, Switch } from "solid-js";

export function Controls() {
  const {
    current,
    isPlaying,
    toggle,
    volume,
    setVolume,
    muted,
    toggleMuted,
    repeat,
    toggleRepeat,
    shuffle,
    toggleShuffle,
  } = usePlayer();
  let audioRef: HTMLAudioElement;

  createEffect(() => {
    if (current() && isPlaying()) audioRef.play();
    else audioRef.pause();
  });

  createEffect(() => {
    if (muted()) audioRef.volume = 0;
    else audioRef.volume = volume() / 100;
  });

  createEffect(() => console.log("volume", volume()));

  return (
    <div class={styles.wrapper}>
      <div class={styles.controls}>
        <div>
          <BiSolidSkipPreviousCircle size={3} />
        </div>
        <div onClick={toggle}>
          <Show when={isPlaying()} fallback={<FaSolidCirclePlay size={3} />}>
            <FaSolidCirclePause size={3} />
          </Show>
        </div>
        <div>
          <BiSolidSkipNextCircle size={3} />
        </div>
      </div>
      <div class={styles.status}>
        <Show when={current()}>
          <p class={styles.infos}>
            {current()?.title} - {current()?.artist}
          </p>
          <div class={styles.playbar}>
            <div class={styles.timer}>00:00</div>
            <input type="range" min="0" max="100" step="1" class={styles.bar} />
            <div class={styles.timer}>00:00</div>
          </div>
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
