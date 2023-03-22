/**
 * @author Shane Reustle
 * @tutorial Source - https://reustle.org/reading-html5-video-data
 */

/** */
export function useUpdateBackground(
  video: HTMLVideoElement,
  ctx: CanvasRenderingContext2D | null
) {
  const updateBackground = () => {
    if (video.paused || video.ended || !ctx) return false;

    // Récupère l'image de la vidéo
    ctx.drawImage(video, 0, 0, video.width / 2, video.height / 2);

    // Extrait les données d'image du canvas
    const frame_data = ctx.getImageData(
      0,
      0,
      video.width / 2,
      video.height / 2
    ).data;

    // Obtiens la longueur des données, divisez-la par 4 pour obtenir le nombre de
    // pixels puis divisez cela par 4 à nouveau pour vérifier la couleur de chaque
    // pixel sur 4
    const frame_data_length = frame_data.length / 4 / 4;

    // Parcours les données d'image brutes, en ajoutant le rgb de chaque 4e pixel
    // à rgb_sums
    let pixel_count = 0;
    const rgb_sums = [0, 0, 0];
    for (let i = 0; i < frame_data_length; i += 4) {
      rgb_sums[0] += frame_data[i * 4];
      rgb_sums[1] += frame_data[i * 4 + 1];
      rgb_sums[2] += frame_data[i * 4 + 2];
      pixel_count++;
    }

    // Fait la moyenne des sommes RGB pour obtenir la couleur moyenne du cadre
    rgb_sums[0] = Math.floor(rgb_sums[0] / pixel_count);
    rgb_sums[1] = Math.floor(rgb_sums[1] / pixel_count);
    rgb_sums[2] = Math.floor(rgb_sums[2] / pixel_count);

    document.body.style.background = "rgb(" + rgb_sums.join(",") + ")";
  };

  return {
    updateBackground,
  };
}
