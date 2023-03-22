import { BsDiscFill } from "@features/Icons";
import styles from "@styles/Logo.module.scss";

export function Logo() {
  return (
    <div class={styles.wrapper}>
          <BsDiscFill class={styles.icon} />
          <h1>Spotube</h1>
      {/* <BsDiscFill width="2em" height="2em" class={styles.icon} /> */}
    </div>
  );
}
