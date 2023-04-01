import { Show } from "solid-js";

import {
  BsDiscFill,
  FaSolidPause,
  FaSolidPlay,
  BiSolidPlaylist,
} from "@features/Icons";
import { usePlayer } from "@utils/contexts/playerContext";
import { PATH } from "@utils/constants";

import styles from "@styles/Sidebar.module.scss";

export function Sidebar() {
  const { store, togglePlay, toggleShowPlaylist } = usePlayer();

  return (
    <div class={styles.wrapper}>
      <div class={styles.logo}>
        <BsDiscFill class={styles.icon} size={3} />
        <h1 class={styles.title}>Spotube</h1>
      </div>

      <Show when={store.currentTrack}>
        <div class={styles.track}>
          <div class={styles.cover} onClick={togglePlay}>
            <img
              src={PATH.COVER + store.currentTrack?.album.filename}
              alt="Couverture de l'album"
              class={styles.image}
            />
            <button class={styles.playIcon}>
              <Show when={store.isPlaying} fallback={<FaSolidPlay size={4} />}>
                <FaSolidPause size={4} />
              </Show>
            </button>
          </div>
          <div class={styles.infos}>
            <p class={styles.title}>{store.currentTrack?.title}</p>
            <p class={styles.artist}>{store.currentTrack?.artist}</p>
          </div>
        </div>
      </Show>

      <button
        type="button"
        onClick={toggleShowPlaylist}
        class={styles.btnPlaylist}
        classList={{ [styles.active]: store.showPlaylist }}
      >
        <BiSolidPlaylist />
        <span>
          {store.showPlaylist ? "Fermer la playlist" : "Afficher la playlist"}
        </span>
      </button>
    </div>
  );
}
