import { usePlayer } from "@assets/contexts/playerContext";
import styles from "@styles/player/Progressbar.module.scss";
import { Accessor, createEffect, createMemo } from "solid-js";

type Props = {
  max: number;
  // value: Accessor<number>;
  // handleChange: (value: number) => void;
};

export function Progressbar(props: Props) {
  const { timer, handleChangeTimer } = usePlayer();
  const percentage = createMemo(() => (timer() / props.max) * 100);

  return (
    <input
      type="range"
      class={styles.range}
      style={{ "--percent": `${percentage()}%` }}
      min={0}
      max={props.max}
      value={timer()}
      step="0.01"
      onInput={(e) => handleChangeTimer(e.currentTarget.valueAsNumber)}
    />
  );
}
