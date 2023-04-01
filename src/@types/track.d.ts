import { albums } from "@utils/data";

declare global {
  type Track = {
    id: number;
    title: string;
    artist: string;
    albumId: typeof albums[number]["id"];
    duration: number;
    filename: string;
  };

  type Album = {
    id: number;
    name: string;
    filename: string;
  };

  type Tracks = ReadonlyArray<Track>;
  type Albums = ReadonlyArray<Album>;

  type TrackAlbum = Track & {
    album: Album;
  };
}

export {};
