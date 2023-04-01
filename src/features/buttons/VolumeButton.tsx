import { usePlayer } from "@utils/contexts/playerContext";
import {
  FaSolidVolumeHigh,
  FaSolidVolumeLow,
  FaSolidVolumeMedium,
  FaSolidVolumeOff,
  FaSolidVolumeXmark,
} from "@features/Icons";
import styles from "@styles/Button.module.scss";
import { Match, Show, Switch } from "solid-js";

export function VolumeButton() {
  const { muted, volume, toggleMuted } = usePlayer();
  return (
    <button type="button" class={styles.btn} onClick={toggleMuted}>
      <Show
        when={!muted()}
        fallback={<FaSolidVolumeXmark size={2} class={styles.disabled} />}
      >
        <Switch>
          <Match when={volume() === 0}>
            <FaSolidVolumeOff size={2} />
          </Match>
          <Match when={volume() <= 0.33}>
            <FaSolidVolumeLow size={2} />
          </Match>
          <Match when={volume() <= 0.66}>
            <FaSolidVolumeMedium size={2} />
          </Match>
          <Match when={volume() <= 1}>
            <FaSolidVolumeHigh size={2} />
          </Match>
        </Switch>
      </Show>
    </button>
  );
}
