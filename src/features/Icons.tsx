import { ComponentProps } from "solid-js";

// https://solid-icons.vercel.app/

type Props = ComponentProps<"svg"> & {
  size?: number;
};

export function BsDiscFill(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      height={`${props.size ?? 1}em`}
      width={`${props.size ?? 1}em`}
      style="overflow: visible;"
      {...props}
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-6 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM4 8a4 4 0 0 1 4-4 .5.5 0 0 0 0-1 5 5 0 0 0-5 5 .5.5 0 0 0 1 0zm9 0a.5.5 0 1 0-1 0 4 4 0 0 1-4 4 .5.5 0 0 0 0 1 5 5 0 0 0 5-5z"></path>
    </svg>
  );
}

export function FaSolidCirclePlay(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      height={`${props.size ?? 1}em`}
      width={`${props.size ?? 1}em`}
      style="overflow: visible;"
      {...props}
    >
      <path d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256zm-336-88v176c0 8.7 4.7 16.7 12.3 20.9 7.5 4.3 16.8 4.1 24.2-.4l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-5.4-16.7-4.7-24.2-.4-7.6 4.2-12.3 12.2-12.3 20.9z"></path>
    </svg>
  );
}

export function BiSolidSkipPreviousCircle(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={`${props.size ?? 1}em`}
      width={`${props.size ?? 1}em`}
      style="overflow: visible;"
      {...props}
    >
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c5.515 0 10-4.486 10-10S17.515 2 12 2zm4 14-6-4v4H8V8h2v4l6-4v8z"></path>
    </svg>
  );
}

export function BiSolidSkipNextCircle(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={`${props.size ?? 1}em`}
      width={`${props.size ?? 1}em`}
      style="overflow: visible;"
      {...props}
    >
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4 14h-2v-4l-6 4V8l6 4V8h2v8z"></path>
    </svg>
  );
}

export function FaSolidCirclePause(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      height={`${props.size ?? 1}em`}
      width={`${props.size ?? 1}em`}
      style="overflow: visible;"
      {...props}
    >
      <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm-32 191.1v128c0 18.6-14.3 32.9-32 32.9s-32-14.3-32-32V191.1c0-16.8 14.3-31.1 31.1-31.1s32.9 14.3 32.9 31.1zm128 0v128c0 18.6-14.3 32.9-32 32.9s-32-14.3-32-32V191.1c0-16.8 14.3-31.1 31.1-31.1s32.9 14.3 32.9 31.1z"></path>
    </svg>
  );
}

export function BiRegularShuffle(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={`${props.size ?? 1}em`}
      width={`${props.size ?? 1}em`}
      style="overflow: visible;"
      {...props}
    >
      <path d="M17 17h-1.559l-9.7-10.673A1 1 0 0 0 5.001 6H2v2h2.559l4.09 4.5-4.09 4.501H2v2h3.001a1 1 0 0 0 .74-.327L10 13.987l4.259 4.686a1 1 0 0 0 .74.327H17v3l5-4-5-4v3z"></path>
      <path d="M15.441 8H17v3l5-3.938L17 3v3h-2.001a1 1 0 0 0-.74.327l-3.368 3.707 1.48 1.346L15.441 8z"></path>
    </svg>
  );
}

export function BsRepeat1(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      height={`${props.size ?? 1}em`}
      width={`${props.size ?? 1}em`}
      style="overflow: visible;"
      {...props}
    >
      <path d="M11 4v1.466a.25.25 0 0 0 .41.192l2.36-1.966a.25.25 0 0 0 0-.384l-2.36-1.966a.25.25 0 0 0-.41.192V3H5a5 5 0 0 0-4.48 7.223.5.5 0 0 0 .896-.446A4 4 0 0 1 5 4h6Zm4.48 1.777a.5.5 0 0 0-.896.446A4 4 0 0 1 11 12H5.001v-1.466a.25.25 0 0 0-.41-.192l-2.36 1.966a.25.25 0 0 0 0 .384l2.36 1.966a.25.25 0 0 0 .41-.192V13h6a5 5 0 0 0 4.48-7.223Z"></path>
      <path d="M9 5.5a.5.5 0 0 0-.854-.354l-1.75 1.75a.5.5 0 1 0 .708.708L8 6.707V10.5a.5.5 0 0 0 1 0v-5Z"></path>
    </svg>
  );
}

export function BsRepeat(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      height={`${props.size ?? 1}em`}
      width={`${props.size ?? 1}em`}
      style="overflow: visible;"
      {...props}
    >
      <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"></path>
    </svg>
  );
}

export function FaSolidVolumeOff(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      height={`${props.size ?? 1}em`}
      width={`${props.size ?? 1}em`}
      style="overflow: visible;"
      {...props}
    >
      <path d="M320 64v383.1c0 12.59-7.337 24.01-18.84 29.16C296.1 479.1 292.4 480 288 480a32.039 32.039 0 0 1-21.27-8.094l-134.9-119.9H48c-26.51 0-48-21.49-48-47.1V208c0-26.51 21.49-47.1 48-47.1h83.84L266.74 41c9.422-8.375 22.93-10.45 34.43-5.259C312.7 39.1 320 51.41 320 64z"></path>
    </svg>
  );
}

export function FaSolidVolumeLow(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      height={`${props.size ?? 1}em`}
      width={`${props.size ?? 1}em`}
      style="overflow: visible;"
      {...props}
    >
      <path d="M412.6 181.9c-10.28-8.344-25.41-6.875-33.75 3.406-8.406 10.25-6.906 25.37 3.375 33.78C393.5 228.4 400 241.8 400 256c0 14.19-6.5 27.62-17.81 36.87-10.28 8.406-11.78 23.53-3.375 33.78 4.719 5.812 11.62 8.812 18.56 8.812 5.344 0 10.75-1.781 15.19-5.406C435.1 311.6 448 284.7 448 256s-12.9-55.6-35.4-74.1zM301.2 34.84c-11.5-5.187-25.01-3.116-34.43 5.259L131.8 160H48c-26.51 0-48 21.49-48 47.1v95.1c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9c5.96 8 13.56 10.8 21.26 10.8 4.438 0 8.959-.931 13.16-2.837C312.7 472 320 460.6 320 448V64c0-12.59-7.3-24.9-18.8-29.16z"></path>
    </svg>
  );
}

// https://boxy-svg.com/app/new:T_1FRpNozj
export function FaSolidVolumeMedium(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      height={`${props.size ?? 1}em`}
      width={`${props.size ?? 1}em`}
      style="overflow: visible;"
      {...props}
    >
      <path d="M 412.6 182 C 402.32 173.666 387.19 175.133 378.85 185.402 C 370.444 195.642 371.944 210.752 382.225 219.142 C 393.5 228.4 400 241.8 400 255.1 C 400 269.27 393.5 282.69 382.19 291.93 C 371.91 300.326 370.41 315.43 378.815 325.67 C 383.534 331.476 390.435 334.472 397.375 334.472 C 402.719 334.472 408.125 332.693 412.565 329.073 C 435.1 311.5 448 284.6 448 255.1 C 448 225.6 435.1 200.4 412.6 182 Z M 473.1 108.2 C 462.88 99.866 447.76 101.302 439.32 111.54 C 430.914 121.78 432.414 136.89 442.664 145.28 C 476.6 172.1 496 213.3 496 255.1 C 496 296.9 476.56 337.2 442.69 365.8 C 432.44 374.196 430.94 389.3 439.346 399.54 C 443.904 405.1 450.717 408.32 457.906 408.311 C 463.281 408.311 468.656 406.532 473.126 402.88 C 518.2 366.9 544 313 544 255.1 C 544 197.2 518.2 145 473.1 108.2 Z M 301.2 34.98 C 289.7 29.799 276.19 31.904 266.77 40.27 L 131.8 160.1 L 48 160.1 C 21.49 160.1 0 181.58 0 208.06 L 0 303.98 C 0 330.46 21.49 351.94 48 351.94 L 131.84 351.94 L 266.74 471.74 C 272.609 476.925 280.168 479.791 288 479.8 C 292.438 479.8 296.959 478.869 301.16 476.965 C 312.627 471.845 320.008 460.458 320 447.9 L 320 64.12 C 320 51.55 312.7 40.13 301.2 34.98 Z"></path>
    </svg>
  );
}

export function FaSolidVolumeHigh(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      height={`${props.size ?? 1}em`}
      width={`${props.size ?? 1}em`}
      style="overflow: visible;"
      {...props}
    >
      <path d="M412.6 182c-10.28-8.334-25.41-6.867-33.75 3.402-8.406 10.24-6.906 25.35 3.375 33.74C393.5 228.4 400 241.8 400 255.1c0 14.17-6.5 27.59-17.81 36.83-10.28 8.396-11.78 23.5-3.375 33.74 4.719 5.806 11.62 8.802 18.56 8.802 5.344 0 10.75-1.779 15.19-5.399C435.1 311.5 448 284.6 448 255.1s-12.9-54.7-35.4-73.1zm60.5-73.8c-10.22-8.334-25.34-6.898-33.78 3.34-8.406 10.24-6.906 25.35 3.344 33.74C476.6 172.1 496 213.3 496 255.1s-19.44 82.1-53.31 110.7c-10.25 8.396-11.75 23.5-3.344 33.74a23.962 23.962 0 0 0 18.56 8.771c5.375 0 10.75-1.779 15.22-5.431C518.2 366.9 544 313 544 255.1S518.2 145 473.1 108.2zm61.3-74.8c-10.22-8.334-25.34-6.867-33.78 3.34-8.406 10.24-6.906 25.35 3.344 33.74C559.9 116.3 592 183.9 592 255.1s-32.09 139.7-88.06 185.5c-10.25 8.396-11.75 23.5-3.344 33.74C505.3 481 512.2 484 519.2 484c5.375 0 10.75-1.779 15.22-5.431C601.5 423.6 640 342.5 640 255.1S601.5 88.34 534.4 33.4zm-233.2 1.58c-11.5-5.181-25.01-3.076-34.43 5.29L131.8 160.1H48c-26.51 0-48 21.48-48 47.96v95.92c0 26.48 21.49 47.96 48 47.96h83.84l134.9 119.8A32.167 32.167 0 0 0 288 479.8c4.438 0 8.959-.931 13.16-2.835A31.81 31.81 0 0 0 320 447.9V64.12c0-12.57-7.3-23.99-18.8-29.14z"></path>
    </svg>
  );
}

export function FaSolidVolumeXmark(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      height={`${props.size ?? 1}em`}
      width={`${props.size ?? 1}em`}
      style="overflow: visible;"
      {...props}
    >
      <path d="M301.2 34.85c-11.5-5.188-25.02-3.122-34.44 5.253L131.8 160H48c-26.51 0-48 21.49-48 47.1v95.1c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9a32.023 32.023 0 0 0 21.26 8.094c4.438 0 8.972-.937 13.17-2.844 11.5-5.156 18.82-16.56 18.82-29.16V64c-.89-12.59-7.29-24-18.79-29.15zM513.9 255.1l47.03-47.03c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0L480 222.1 432.1 175c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03L398.16 303c-9.375 9.375-9.375 24.56 0 33.94 9.373 9.373 24.56 9.381 33.94 0L480 289.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0 9.375-9.375 9.375-24.56 0-33.94L513.9 255.1z"></path>
    </svg>
  );
}
