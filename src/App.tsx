import type { Component } from "solid-js";

import styles from "@styles/App.module.scss";
import { Footer } from "@features/player/controls/Footer";
import { Sidebar } from "@features/Sidebar";
import { PlayerContextProvider } from "@assets/contexts/playerContext";
import { Main } from "@features/Main";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <PlayerContextProvider>
        <div class={styles.sidebar}>
          <Sidebar />
        </div>
        <main class={styles.trackslist}>
          <Main />
        </main>
        <footer class={styles.footer}>
          <Footer />
        </footer>
      </PlayerContextProvider>
    </div>
  );
};

export default App;
