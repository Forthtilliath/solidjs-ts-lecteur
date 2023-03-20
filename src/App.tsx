import type { Component } from 'solid-js';

import styles from './App.module.css';
import Test from './Test';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <main><Test /></main>
    </div>
  );
};

export default App;
