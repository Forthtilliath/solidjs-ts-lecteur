import {
  Accessor,
  createContext,
  createSignal,
  ParentProps,
  useContext,
} from "solid-js";
import { tracks, albums } from "@utils/data";

export type PlayerContextModel = {
  current: Accessor<TrackAlbum | undefined>;
  play: (id: number) => (_event: MouseEvent) => void;
  //   pause: () => void;
  //   stop: () => void;
  //   previous: () => void;
  //   next: () => void;
  //   repeatOff: () => void;
  //   repeatOne: () => void;
  //   repeatAll: () => void;
  //   shuffle: () => void;
  //   volume: () => void;
};

export type PlayerContextProps = {};

const PlayerContext = createContext<PlayerContextModel>();
// const tracksAlbum = addAlbums(tracks);

export function PlayerContextProvider(props: ParentProps<PlayerContextProps>) {
  const [current, setCurrent] = createSignal<TrackAlbum>();

  console.log("contextProvider");
  //   const [tracksList, setTracksList] = createSignal(props.tracks);

  const play = (id: number) => {
    return function (_event: MouseEvent) {
      console.log("Launching track...", id);

      const track = tracks.find((track) => track.id === id);
      if (track === undefined) {
        throw new Error("Track not found");
      }
      const album = albums.find((album) => album.id === track.albumId);
      if (album === undefined) {
        throw new Error("Album not found");
      }
      const trackWithAlbum = Object.assign(track, { album });
      console.log(trackWithAlbum);
      setCurrent(trackWithAlbum);
    };
  };
  //   const pause = () => {};
  //   const stop = () => {};
  //   const previous = () => {};
  //   const next = () => {};
  //   const repeatOff = () => {};
  //   const repeatOne = () => {};
  //   const repeatAll = () => {};
  //   const shuffle = () => {};
  //   const volume = () => {};

  const value: PlayerContextModel = {
    current,
    play,
    // pause,
    // stop,
    // previous,
    // next,
    // repeatOff,
    // repeatOne,
    // repeatAll,
    // shuffle,
    // volume,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (context === undefined) {
    throw new Error("usePlayer was used outside of its Provider");
  }

  return context;
}

function addAlbums(tracks: Tracks): TrackAlbum[] {
  return tracks.map((track) => {
    const album = albums.find((album) => album.id === track.albumId);
    if (album === undefined) {
      throw new Error("Album not found");
    }
    return Object.assign(track, { album });
  });
}
