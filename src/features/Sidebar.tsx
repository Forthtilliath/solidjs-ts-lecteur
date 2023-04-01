import styles from "@styles/Sidebar.module.scss";
import {
  BsDiscFill,
  FaSolidPause,
  FaSolidPlay,
  BiSolidPlaylist,
} from "@features/Icons";
import { usePlayer } from "@assets/contexts/playerContext";
import { Show } from "solid-js";

export function Sidebar() {
  const {
    currentTrack,
    togglePlay,
    isPlaying,
    toggleShowPlaylist,
    showPlaylist,
  } = usePlayer();

  return (
    <div class={styles.wrapper}>
      <div class={styles.logo}>
        <BsDiscFill class={styles.icon} size={3} />
        <h1 class={styles.title}>Spotube</h1>
      </div>

      <Show when={currentTrack()}>
        <div class={styles.track}>
          <div class={styles.cover} onClick={togglePlay}>
            <img
              src={"/src/assets/covers/" + currentTrack()?.album.filename}
              alt="Couverture de l'album"
              class={styles.image}
            />
            <button class={styles.playIcon}>
              <Show when={isPlaying()} fallback={<FaSolidPlay size={4} />}>
                <FaSolidPause size={4} />
              </Show>
            </button>
          </div>
          <div class={styles.infos}>
            <p class={styles.title}>{currentTrack()?.title}</p>
            <p class={styles.artist}>{currentTrack()?.artist}</p>
          </div>
        </div>
      </Show>

      <button
        type="button"
        onClick={toggleShowPlaylist}
        class={styles.btnPlaylist}
        classList={{ [styles.active]: showPlaylist() }}
      >
        <BiSolidPlaylist />
        <span>
          {showPlaylist() ? "Fermer la playlist" : "Afficher la playlist"}
        </span>
      </button>
    </div>
  );
}
