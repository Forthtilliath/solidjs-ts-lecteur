import styles from "@styles/Sidebar.module.scss";
import { BsDiscFill } from "@features/Icons";
import { usePlayer } from "@assets/contexts/playerContext";
import { Show } from "solid-js";

export function Sidebar() {
  const { current } = usePlayer();

  return (
    <div class={styles.wrapper}>
      <div class={styles.logo}>
        <BsDiscFill class={styles.icon} size={3} />
        <h1 class={styles.title}>Spotube</h1>
      </div>

      <Show when={current()}>
        <div class={styles.track}>
          <div class={styles.cover}>
            <img
              src={"/src/assets/covers/" + current()?.album.filename}
              alt="Couverture de l'album"
              class={styles.image}
            />
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
