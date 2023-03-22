import type { Component } from "solid-js";

import styles from "@styles/App.module.scss";
import { Player } from "@features/player";
import { Controls } from "@features/player/Controls";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <main class={styles.main}>
        <Player />
      </main>
      <footer class={styles.footer}>
        <Controls />
      </footer>
    </div>
  );
};

export default App;
