import {
  createContext,
  createEffect,
  createMemo,
  onCleanup,
  ParentProps,
  useContext,
} from "solid-js";

import { tracks, albums } from "@utils/data";
import { PATH, REPEAT } from "@utils/constants";
import * as Array from "@utils/methods/array";
import { toggle } from "@utils/methods/boolean";

import { createStorage } from "@signals/createStorage";

const tracklist = addAlbums(tracks);
const REPEATS = Object.values(REPEAT);

const initialPlayerStore: PlayerStore = {
  isPlaying: false,

  timer: 0,
  duration: 0,
  timerLeft: false,

  repeat: REPEAT.OFF,
  shuffle: false,
  muted: false,
  showPlaylist: false,
  volume: 0.5,

  playlist: tracklist,
  currentTrack: tracklist[0],
};

const PlayerContext = createContext<PlayerContextModel>();

export function PlayerContextProvider(props: ParentProps) {
  const [store, setStore] = createStorage("player", initialPlayerStore);
  // Bloque le fait d'avoir la lecture au reload
  setStore("isPlaying", false);

  const audio = new Audio();
  // Remet le lecteur à l'endroit où on avait quitté
  audio.currentTime = store.timer;

  const currentIndex = createMemo(() => {
    return store.playlist.findIndex(
      (track) => track.id === store.currentTrack.id
    );
  });
  const isFirstTrack = createMemo(() => currentIndex() === 0);
  const isLastTrack = createMemo(
    () => currentIndex() === store.playlist.length - 1
  );

  const play = (id: number) => {
    const track = store.playlist.find((track) => track.id === id);
    if (!track) throw new Error("Track id not found");

    setStore({ isPlaying: true, currentTrack: track });
  };

  const togglePlay = () => {
    // Permet de réprendre le titre où on en était au reload
    audio.currentTime = store.timer;
    audio.paused ? audio.play() : audio.pause();
    setStore("isPlaying", toggle);
  };

  const toggleMuted = () => setStore("muted", toggle);
  const toggleTimerLeft = () => setStore("timerLeft", toggle);
  const toggleShowPlaylist = () => setStore("showPlaylist", toggle);

  const toggleShuffle = () => {
    setStore({
      shuffle: !store.shuffle,
      playlist: store.shuffle
        ? tracklist.slice()
        : shuffleTracks(tracklist, store.currentTrack),
    });
  };

  const toggleRepeat = () => {
    setStore("repeat", (prev) => ((prev + 1) % REPEATS.length) as RepeatRange);
  };

  const previous = () => {
    const prevTrack = store.playlist[currentIndex() - 1];
    if (prevTrack) play(prevTrack.id);
  };

  const next =
    (force = false) =>
    (_event: Event) => {
      let nextTrack: TrackAlbum | undefined;

      if (isLastTrack() && store.repeat === REPEAT.ALL) {
        nextTrack = store.playlist[0];
      } else if (!force && store.repeat === REPEAT.ONE) {
        nextTrack = store.currentTrack;
        setStore("timer", 0);
        audio.play();
      } else if (!isLastTrack()) {
        nextTrack = store.playlist[currentIndex() + 1];
      }
      if (nextTrack) play(nextTrack.id);
      else {
        setStore({
          timer: 0,
          isPlaying: false,
          currentTrack: store.playlist[0],
        });
      }
    };

  const setVolume = (n: number) => {
    audio.volume = n;
    setStore({ muted: n === 0, volume: n });
  };

  const setTimer = (newTimer: number) => {
    audio.currentTime = newTimer;
  };
  const handleTimeUpdate = () => {
    setStore("timer", audio.currentTime);
  };

  const handlePlayThrough = () => {
    setStore("duration", audio.duration);
    store.isPlaying && audio.play();
  };

  audio.addEventListener("ended", next());
  audio.addEventListener("timeupdate", handleTimeUpdate);

  createEffect(() => {
    audio.volume = store.muted ? 0 : store.volume;
  });

  createEffect(() => {
    console.log("Track en cours :", store.currentTrack.title);
    audio.currentTime = 0;
    audio.src = PATH.TRACK + store.currentTrack.filename;
    audio.addEventListener("canplaythrough", handlePlayThrough);
  });

  onCleanup(() => {
    audio.removeEventListener("ended", next());
    audio.removeEventListener("timeupdate", handleTimeUpdate);
  });

  const value: PlayerContextModel = {
    store,
    tracklist,
    isFirstTrack,
    isLastTrack,
    previous,
    next,
    play,
    togglePlay,
    toggleRepeat,
    toggleMuted,
    toggleShuffle,
    toggleTimerLeft,
    toggleShowPlaylist,
    setVolume,
    setTimer,
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

function shuffleTracks<T extends { id: string | number }>(
  tracks: T[],
  current: T
) {
  const tracksExceptCurrent = tracks.filter((track) => track.id !== current.id);
  const mixedTracks = Array.shuffle(tracksExceptCurrent);

  return [current].concat(...mixedTracks) as T[];
}
