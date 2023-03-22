import type { Component } from "solid-js";

import styles from "@styles/App.module.scss";
import { Player } from "@features/player";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <main class={styles.main}>
        <Player />
      </main>
    </div>
  );
};

export default App;
