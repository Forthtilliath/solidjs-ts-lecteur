import styles from "@styles/Sidebar.module.scss";
import { BsDiscFill, FaSolidPause, FaSolidPlay } from "@features/Icons";
import { usePlayer } from "@assets/contexts/playerContext";
import { Show } from "solid-js";

export function Sidebar() {
  const { current, togglePlay, isPlaying } = usePlayer();

  return (
    <div class={styles.wrapper}>
      <div class={styles.logo}>
        <BsDiscFill class={styles.icon} size={3} />
        <h1 class={styles.title}>Spotube</h1>
      </div>

      <Show when={current()}>
        <div class={styles.track}>
          <div class={styles.cover} onClick={togglePlay}>
            <img
              src={"/src/assets/covers/" + current()?.album.filename}
              alt="Couverture de l'album"
              class={styles.image}
            />
            <div class={styles.playIcon}>
              <Show when={isPlaying()} fallback={<FaSolidPlay size={4} />}>
                <FaSolidPause size={4} />
              </Show>
            </div>
          </div>
          <div class={styles.infos}>
            <p class={styles.title}>{current()?.title}</p>
            <p class={styles.artist}>{current()?.artist}</p>
          </div>
        </div>
      </Show>
    </div>
  );
}
