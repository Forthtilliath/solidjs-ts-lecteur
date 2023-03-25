import type { Component } from "solid-js";

import styles from "@styles/App.module.scss";
import { TracksList } from "@features/player/TracksList";
import { Controls } from "@features/player/Controls";
import { Sidebar } from "@features/Sidebar";
import { PlayerContextProvider } from "@assets/contexts/playerContext";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <PlayerContextProvider>
        <div class={styles.sidebar}>
          <Sidebar />
        </div>
        <main class={styles.trackslist}>
          <TracksList />
        </main>
        <footer class={styles.footer}>
          <Controls />
        </footer>
      </PlayerContextProvider>
    </div>
  );
};

export default App;
