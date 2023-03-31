import { usePlayer } from "@assets/contexts/playerContext";
import styles from "@styles/player/Progressbar.module.scss";
import { Accessor, createEffect, createMemo } from "solid-js";

type Props = {
  max: number;
  value: Accessor<number>;
  handleChange: (value: number) => void;
};

export function Progressbar(props: Props) {
  const { timer } = usePlayer();
  // const percentage = createMemo(() => (props.value() / props.max) * 100);
  const percentage = createMemo(() => (timer() / props.max) * 100);

  const handleInputChange = (e: TInputEvent) => {
    props.handleChange(e.currentTarget.valueAsNumber);
  };

  createEffect(() => console.log(`Progressbar ${props.max}`))

  return (
    <input
      type="range"
      class={styles.range}
      style={{ "--percent": `${percentage()}%` }}
      min={0}
      max={props.max}
      value={props.value()}
      step="0.01"
      onInput={handleInputChange}
    />
  );
}
