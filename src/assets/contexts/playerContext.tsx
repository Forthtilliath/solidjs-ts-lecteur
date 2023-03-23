import {
  Accessor,
  createContext,
  createSignal,
  ParentProps,
  Setter,
  useContext,
} from "solid-js";
import { tracks, albums } from "@utils/data";
import { REPEAT } from "@utils/constants";

export type PlayerContextModel = {
  current: Accessor<TrackAlbum | undefined>;
  isPlaying: Accessor<boolean>;
  repeat: Accessor<RepeatRange>;
  play: (id: number) => (_event: MouseEvent) => void;
  toggle: () => void;
  volume: Accessor<Number_0_to_100>;
  setVolume: (e: TInputEvent) => void;
  muted: Accessor<boolean>;
  toggleMuted: () => boolean;
  toggleRepeat: () => RepeatRange;
  shuffle: Accessor<boolean>;
  toggleShuffle: () => boolean;
  //   previous: () => void;
  //   next: () => void;
  //   repeatOff: () => void;
  //   repeatOne: () => void;
  //   repeatAll: () => void;
  //   shuffle: () => void;
};

export type PlayerContextProps = {};

const PlayerContext = createContext<PlayerContextModel>();
const tracksList = addAlbums(tracks);

const REPEATS = Object.values(REPEAT);

export function PlayerContextProvider(props: ParentProps<PlayerContextProps>) {
  const [current, setCurrent] = createSignal<TrackAlbum>();
  const [timer, setTimer] = createSignal(0);
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [repeat, setRepeat] = createSignal<RepeatRange>(0);
  const [volume, _setVolume] = createSignal<Number_0_to_100>(50);
  const [muted, setMuted] = createSignal(false);
  const [shuffle, setShuffle] = createSignal(false);

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

  const toggleMuted = () => setMuted((prev) => !prev);
  const toggleShuffle = () => setShuffle((prev) => !prev);

  const toggleRepeat = () =>
    setRepeat((prev) => ((prev + 1) % REPEATS.length) as RepeatRange);

  const setVolume = (e: TInputEvent) => {
    _setVolume(Number(e.currentTarget.value) as Number_0_to_100);
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
    toggleMuted,
    toggleRepeat,
    shuffle,
    toggleShuffle,
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
