import { createMemo, Show } from "solid-js";

import { FaSolidPause, FaSolidPlay } from "@features/Icons";
import { usePlayer } from "@utils/contexts/playerContext";
import { secondsToMMSS } from "@utils/methods/duration";
import { PATH } from "@utils/constants";

import styles from "@styles/Track.module.scss";

type Props = TrackAlbum & {
  index: number;
};

export function Track(props: Props) {
  const { store, play, togglePlay } = usePlayer();
  const active = createMemo(() => store.currentTrack.id === props.id);
  let coverRef: HTMLDivElement;
  // Fix changement des paths des images
  const filename = () => props.album.filename.replace(".jpeg", ".jpg");

  /**
   * Cliquer sur la ligne permet uniquement de mettre lecture, toutefois cliquer sur la
   * cover permet d'alterner entre lecture et pause.
   */
  const handlePlay = (id: number) => (event: MouseEvent) => {
    if (active() && event.target === coverRef) {
      togglePlay();
    } else {
      play(id);
    }
  };

  return (
    <div
      class={styles.wrapper}
      classList={{ [styles.active]: active() }}
      onClick={handlePlay(props.id)}
    >
      <div class={styles.index}>{props.index + 1}</div>
      <div
        class={styles.cover}
        classList={{ [styles.active]: active() }}
        ref={coverRef!}
      >
        <img src={PATH.THUMB + filename()} alt="cover" />
        <button
          class={styles.playIcon}
          aria-label={store.isPlaying ? "Mettre en pause" : "Lecture"}
        >
          <Show when={store.isPlaying} fallback={<FaSolidPlay size={2} />}>
            <FaSolidPause size={2} />
          </Show>
        </button>
      </div>
      <div class={styles.title}>{props.title}</div>
      <div class={styles.artist}>{props.artist}</div>
      <div class={styles.album}>{props.album.name}</div>
      <div class={styles.duration}>{secondsToMMSS(props.duration)}</div>
    </div>
  );
}

export function TrackHeader() {
  return (
    <div class={styles.header}>
      <div class={styles.index}>#</div>
      <div class={styles.cover}></div>
      <div class={styles.title}>Titre</div>
      <div class={styles.artist}>Artist</div>
      <div class={styles.album}>Album</div>
      <div class={styles.duration}>Durée</div>
    </div>
  );
}
