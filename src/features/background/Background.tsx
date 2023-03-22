import { onCleanup, onMount } from "solid-js";
import { useUpdateBackground } from "@hooks";
import styles from "@styles/Test.module.scss";

export default function Background() {
  let videoRef: HTMLVideoElement;
  let canvasRef: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let sti: number;

  onMount(() => {
    ctx = canvasRef.getContext("2d", { willReadFrequently: true });
  });

  onCleanup(() => clearTimeout(sti));

  const onPlay = () => {
    const { updateBackground } = useUpdateBackground(videoRef, ctx);

    // Fait correspondre la taille du canvas avec celle de la vidéo
    canvasRef.width = videoRef.width / 2;
    canvasRef.height = videoRef.height / 2;

    // Met à jour le background toutes les 100ms
    sti = setInterval(updateBackground, 100);
  };

  return (
    <div class="text-center">
      <video
        height="250"
        width="600"
        controls
        loop={false}
        crossorigin="anonymous"
        ref={videoRef!}
        onPlay={onPlay}
      >
        <source
          src="https://reustle.org/static/resources/cars2.webm"
          type="video/webm"
        />
      </video>
      <canvas ref={canvasRef!} class={styles.hide}></canvas>

      <br />
      <br />
    </div>
  );
}
