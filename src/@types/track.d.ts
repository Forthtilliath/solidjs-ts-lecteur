import { covers } from "@utils/data";

declare global {
  type Track = {
    id: number;
    cover: string;
    title: string;
    artist: string;
    album: typeof covers[number]['id'];
    duration?: number;
    filename: string;
  };

  type Cover = {
    id: number;
    album: string;
    filename: string;
  }

  type Tracks = ReadonlyArray<Track>;
  type Covers = ReadonlyArray<Cover>;
}

export {}