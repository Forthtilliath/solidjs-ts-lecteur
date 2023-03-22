import styles from "@styles/player/Controls.module.scss";

export function Controls() {
  return (
    <div class={styles.wrapper}>
      <div class={styles.controls}>
        <div>Prev</div>
        <div>Lect/Pause</div>
        <div>Next</div>
      </div>
      <div class={styles.status}>
        <div class={styles.infos}>Titre - Artiste</div>
        <div class={styles.playbar}></div>
      </div>
      <div class={styles.features}>
        <div>Repeat</div>
        <div>Random</div>
        <div>Volume</div>
      </div>
    </div>
  );
}
