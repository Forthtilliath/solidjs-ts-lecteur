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
  play: (index: number) => void;
  togglePlay: () => void;
  volume: Accessor<Number_0_to_100>;
  setVolume: (e: TInputEvent) => void;
  muted: Accessor<boolean>;
  toggleMuted: () => void;
  toggleRepeat: () => void;
  shuffle: Accessor<boolean>;
  toggleShuffle: () => void;
  timer: Accessor<number>;
  setTimer: Setter<number>;
  timerLeft: Accessor<boolean>;
  toggleTimerLeft: () => void;
  previous: () => void;
  next: () => void;
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
  const [trackIndex, setTrackIndex] = createSignal(-1);
  const [timer, setTimer] = createSignal(0);
  const [timerLeft, setTimerLeft] = createSignal(false);
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [repeat, setRepeat] = createSignal<RepeatRange>(0);
  const [volume, _setVolume] = createSignal<Number_0_to_100>(50);
  const [muted, setMuted] = createSignal(false);
  const [shuffle, setShuffle] = createSignal(false);

  const launchTrack = (track: TrackAlbum) => {
    setCurrent(track);
    setIsPlaying(true);
    setTimer(0);
  };

  const play = (index: number) => {
    console.log("Launching track...", tracksList[index].id);

    setTrackIndex(index);
    launchTrack(tracksList[index]);
  };

  const togglePlay = () => {
    if (current() === undefined) {
      setCurrent(tracksList[0]);
      setTrackIndex(0);
    }
    setIsPlaying((prev) => !prev);
  };
  const toggleMuted = () => {
    setMuted((prev) => !prev);
  };
  const toggleShuffle = () => {
    setShuffle((prev) => !prev);
  };
  const toggleTimerLeft = () => {
    setTimerLeft((prev) => !prev);
  };
  const toggleRepeat = () => {
    setRepeat((prev) => ((prev + 1) % REPEATS.length) as RepeatRange);
  };

  const setVolume = (e: TInputEvent) => {
    _setVolume(Number(e.currentTarget.value) as Number_0_to_100);
  };

  const previous = () => {
    setTrackIndex((prev) => {
      const index = (prev - 1 + tracksList.length) % tracksList.length;
      launchTrack(tracksList[index]);
      return index;
    });
  };
  const next = () => {
    setTrackIndex((prev) => {
      const index = (prev + 1 + tracksList.length) % tracksList.length;
      launchTrack(tracksList[index]);
      return index;
    });
  };

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
    togglePlay,
    volume,
    setVolume,
    muted,
    toggleMuted,
    toggleRepeat,
    shuffle,
    toggleShuffle,
    timer,
    setTimer,
    timerLeft,
    toggleTimerLeft,
    // pause,
    // stop,
    previous,
    next,
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
