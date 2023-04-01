import type { Component } from "solid-js";

import { PlayerContextProvider } from "@utils/contexts/playerContext";
import { Footer, Sidebar, Main } from "@features/parts";

import styles from "@styles/App.module.scss";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <PlayerContextProvider>
        <div class={styles.sidebar}>
          <Sidebar />
        </div>
        <main class={styles.main}>
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
