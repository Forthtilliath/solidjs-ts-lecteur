import { onCleanup, onMount } from "solid-js";
import useUpdateBackground from "./utils/hooks/useUpdateBackground";

export default function Test() {
  let videoRef: HTMLVideoElement;
  let canvasRef: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let sto: number;

  onMount(() => {
    ctx = canvasRef.getContext("2d", { willReadFrequently: true });
  });

  onCleanup(() => clearTimeout(sto));

  const onPlay = () => {
    const { updateBackground } = useUpdateBackground(videoRef, ctx);

    console.log("Play started");
    // Update the size of the canvas to match the video
    canvasRef.width = videoRef.width / 2;
    canvasRef.height = videoRef.height / 2;

    // Start updating the bg color
    sto = setInterval(updateBackground, 100);
  };

  return (
    <div class="text-center">
      <video
        id="my_video"
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
      <canvas id="my_canvas" ref={canvasRef!} style="display:none"></canvas>

      <br />
      <br />
    </div>
  );
}
