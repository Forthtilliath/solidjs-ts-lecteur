import { usePlayer } from "@utils/contexts/playerContext";
import { BiRegularShuffle } from "@features/Icons";
import styles from "@styles/Button.module.scss";
import { Show } from "solid-js";

export function ShuffleButton() {
  const { store, toggleShuffle } = usePlayer();
  return (
    <button type="button" class={styles.btn} onClick={toggleShuffle}
    aria-label={
      store.shuffle ? "Activer le mode aléatoire" : "Désactiver le mode aléatoire"
    }>
      <Show
        when={store.shuffle}
        fallback={<BiRegularShuffle size={2} class={styles.disabled} />}
      >
        <BiRegularShuffle size={2} />
      </Show>
    </button>
  );
}
