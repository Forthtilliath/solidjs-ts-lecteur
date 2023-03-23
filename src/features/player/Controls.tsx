import { usePlayer } from "@assets/contexts/playerContext";
import {
  BiRegularShuffle,
  BiSolidSkipNextCircle,
  BiSolidSkipPreviousCircle,
  BsRepeat,
  FaSolidCirclePause,
  FaSolidCirclePlay,
  FaSolidVolumeHigh,
  FaSolidVolumeLow,
  FaSolidVolumeMedium,
  FaSolidVolumeOff,
} from "@features/Icons";
import styles from "@styles/player/Controls.module.scss";
import { Match, Show, Switch } from "solid-js";

export function Controls() {
  const { isPlaying, toggle, volume } = usePlayer();

  return (
    <div class={styles.wrapper}>
      <div class={styles.controls}>
        <div>
          <BiSolidSkipPreviousCircle size={3} />
        </div>
        <div>
          <Show
            when={isPlaying()}
            fallback={<FaSolidCirclePlay size={3} onClick={toggle} />}
          >
            <FaSolidCirclePause size={3} onClick={toggle} />
          </Show>
        </div>
        <div>
          <BiSolidSkipNextCircle size={3} />
        </div>
      </div>
      <div class={styles.status}>
        <div class={styles.infos}>Titre - Artiste</div>
        <div class={styles.playbar}></div>
      </div>
      <div class={styles.features}>
        <div>
          <BsRepeat size={2} />
        </div>
        <div>
          <BiRegularShuffle size={2} />
        </div>
        <div>
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
        </div>
      </div>
    </div>
  );
}
