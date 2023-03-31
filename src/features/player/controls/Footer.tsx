import styles from "@styles/player/Footer.module.scss";
import { PreviousButton } from "../buttons/PreviousButton";
import { Player } from "./Player";
import {
  PlayButton,
  NextButton,
  RepeatButton,
  ShuffleButton,
  VolumeButton,PlaylistButton
} from "../buttons";
import { VolumeBar } from "./VolumeBar";

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
