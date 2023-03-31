import styles from "@styles/player/Controls.module.scss";
import { PreviousButton } from "./buttons/PreviousButton";
import { PlayButton } from "./buttons/PlayButton";
import { NextButton } from "./buttons/NextButton";
import { Player } from "./Player";
import { RepeatButton } from "./buttons/RepeatButton";
import { ShuffleButton } from "./buttons/ShuffleButton";
import { VolumeButton } from "./buttons/VolumeButton";
import { VolumeBar } from "./VolumeBar";

export function Controls() {
  return (
    <div class={styles.wrapper}>
      {/* Boutons sur la gauche */}
      <div class={styles.controls}>
        <PreviousButton />
        <PlayButton />
        <NextButton />
      </div>
      {/* Titre avec progressbar */}
      <div class={styles.status}>
        <Player />
      </div>
      {/* Boutons sur la droite */}
      <div class={styles.features}>
        <RepeatButton />
        <ShuffleButton />
        <VolumeButton />
        <VolumeBar />
      </div>
    </div>
  );
}
