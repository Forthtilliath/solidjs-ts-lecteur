import { Player, VolumeBar } from "@features/footer";
import {
  PreviousButton,
  PlayButton,
  NextButton,
  RepeatButton,
  ShuffleButton,
  VolumeButton,
  PlaylistButton,
} from "@features/buttons";

import styles from "@styles/Footer.module.scss";

export function Footer() {
  return (
    <div class={styles.wrapper}>
      {/* Boutons sur la gauche */}
      <div class={styles.controls}>
        <PreviousButton />
        <PlayButton />
        <NextButton />
      </div>
      {/* Titre avec progressbar */}
      <div class={styles.player}>
        <Player />
      </div>
      {/* Boutons sur la droite */}
      <div class={styles.features}>
        <RepeatButton />
        <ShuffleButton />
        <PlaylistButton />
        <VolumeButton />
        <VolumeBar />
      </div>
    </div>
  );
}
