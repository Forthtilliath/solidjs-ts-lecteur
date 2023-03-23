import {
  Accessor,
  createContext,
  createSignal,
  ParentProps,
  Setter,
  useContext,
} from "solid-js";
import { tracks, albums } from "@utils/data";

export type PlayerContextModel = {
  current: Accessor<TrackAlbum | undefined>;
  isPlaying: Accessor<boolean>;
  repeat: Accessor<"off" | "one" | "all">;
  play: (id: number) => (_event: MouseEvent) => void;
  toggle: () => void;
  volume: Accessor<Number_0_to_100>;
  setVolume: Setter<Number_0_to_100>;
  muted: Accessor<boolean>;
  setMuted: Setter<boolean>;
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
// export type PlayerContextModel = ReturnType<>

export type PlayerContextProps = {};

const PlayerContext = createContext<PlayerContextModel>();
const tracksList = addAlbums(tracks);

export function PlayerContextProvider(props: ParentProps<PlayerContextProps>) {
  const [current, setCurrent] = createSignal<TrackAlbum>();
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [repeat, setRepeat] = createSignal<"off" | "one" | "all">("off");
  const [volume, setVolume] = createSignal<Number_0_to_100>(50);
  const [muted, setMuted] = createSignal(false);

  const play = (id: number) => {
    return function (_event: MouseEvent) {
      console.log("Launching track...", id);

      const track = tracksList.find((track) => track.id === id);
      if (track === undefined) {
        throw new Error("Track not found");
      }
      setCurrent(track);
      setIsPlaying(true);
    };
  };
  const toggle = () => {
    if (current() === undefined) return;
    setIsPlaying((prev) => !prev);
  };
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
    isPlaying,
    repeat,
    play,
    toggle,
    volume,
    setVolume,
    muted,
    setMuted,
    // pause,
    // stop,
    // previous,
    // next,
    // repeatOff,
    // repeatOne,
    // repeatAll,
    // shuffle,
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

function addAlbums(tracks: Tracks) {
  return tracks.map<TrackAlbum>((track) => {
    const album = albums.find((album) => album.id === track.albumId);
    if (album === undefined) {
      throw new Error("Album not found");
    }
    return Object.assign(track, { album });
  });
}
