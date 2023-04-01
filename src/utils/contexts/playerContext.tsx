import {
  Accessor,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  ParentProps,
  Setter,
  useContext,
} from "solid-js";
import { tracks, albums } from "@utils/data";
import { PATH, REPEAT } from "@utils/constants";
import { createStoredSignal } from "@signals/createStoredSignal";
import * as Array from "@utils/methods/array";
import { createStore } from "solid-js/store";
import { getParsedStorage } from "@utils/methods/storage";

export type PlayerContextModel = {
  /** Liste des musiques */
  tracklist: TrackAlbum[];
  playlist: Accessor<TrackAlbum[]>;
  /** ``true`` si la chanson est la dernière de la liste */
  isFirstTrack: Accessor<boolean>;
  isLastTrack: Accessor<boolean>;
  /** Index du track en cours d'écoute */
  currentIndex: Accessor<number>;
  /** Track en cours d'écoute */
  currentTrack: Accessor<TrackAlbum>;
  /** Met la musique précédente (enregistrée dans previousTracks si shuffle est
   * activée, index précédent sinon) */
  previous: () => void;
  /** Met la musique suivante (prend en compte ``shuffle`` et ``repeat``) */
  next: (force?: boolean) => (_event: Event) => void;
  /** Met en lecture */
  play: (index: number) => void;
  /** Alterne entre lecture et pause */
  togglePlay: () => void;
  /** ``true`` si le track est en lecture, ``false`` s'il est en pause */
  isPlaying: Accessor<boolean>;
  /** Mode de repeat parmi ``off``, ``one`` et ``all`` */
  repeat: Accessor<RepeatRange>;
  /** Alterne entre ``off``, ``one`` et ``all`` */
  toggleRepeat: () => void;
  /** Volume de la musique */
  volume: Accessor<number>;
  /** Modifie le volume */
  setVolume: (n: number) => void;
  /** ``true`` si le son est coupé, ``false`` sinon */
  muted: Accessor<boolean>;
  /** Alterne entre muet ou non */
  toggleMuted: () => void;
  /** ``true`` si la lecture est en mode aléatoire, ``false`` sinon */
  shuffle: Accessor<boolean>;
  /** Alterne entre lecture aléatoire et lecture des tracks les uns après les autres */
  toggleShuffle: () => void;
  /** Timer de la musique en cours de lecture */
  timer: Accessor<number>;
  /** Met à jour le timer */
  setTimer: Setter<number>;
  /** Durée restante de la musique en cours */
  timerLeft: Accessor<boolean>;
  /** Alterne entre temps restant et durée de la musique */
  toggleTimerLeft: () => void;
  /** Affiche ou non la playlist */
  showPlaylist: Accessor<boolean>;
  toggleShowPlaylist: () => void;
  handleChangeTimer: (newTimer: number) => void;
  duration: Accessor<number>;
};

export type PlayerContextProps = {};

const PlayerContext = createContext<PlayerContextModel>();
const tracklist = addAlbums(tracks);

const REPEATS = Object.values(REPEAT);

// type PlayerStore = {
//   currentIndex: number;
//   timer: number;
//   repeat: RepeatRange;
//   volume: number;
// };

// const defaultPlayerStore: PlayerStore = {
//   currentIndex: 0,
//   timer: 0,
//   repeat: REPEAT.OFF,
//   volume: 50,
// };
// const defaultPlayerStoreStored = Object.assign(
//   defaultPlayerStore,
//   getParsedStorage(localStorage)
// );

export function PlayerContextProvider(props: ParentProps<PlayerContextProps>) {
  // const [state, setState] = createStore<PlayerStore>(defaultPlayerStoreStored);
  // console.log(state);

  const audio = new Audio();
  const [duration, setDuration] = createSignal(0);

  const [timer, setTimer] = createSignal(0);
  const [repeat, setRepeat] = createStoredSignal<RepeatRange>(
    "repeat",
    REPEAT.OFF
  );
  const [volume, _setVolume] = createStoredSignal<number>("volume", 0.5);

  const [timerLeft, setTimerLeft] = createStoredSignal("timerLeft", false);
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [muted, setMuted] = createStoredSignal("muted", false);
  const [shuffle, setShuffle] = createStoredSignal("shuffle", false);
  const [showPlaylist, setShowPlaylist] = createStoredSignal("playlist", false);
  const [playlist, setPlaylist] = createSignal(
    shuffle() ? shuffleTracks(tracklist, tracklist[0]) : tracklist
  );

  const [currentTrack, setCurrentTrack] = createSignal(tracklist[0]);
  const currentIndex = createMemo(() => {
    return playlist().findIndex((track) => track.id === currentTrack().id);
  });
  const isFirstTrack = createMemo(() => currentIndex() === 0);
  const isLastTrack = createMemo(
    () => currentIndex() === playlist().length - 1
  );

  const handlePlayThrough = () => {
    setDuration(audio.duration);
    isPlaying() && audio.play();
  };

  /**
   * Lance l'écoute de la musique à l'index choisit.
   *
   * `isPlaying` est alors passé à `true`, le `timer` est remis à `0` et enfin le
   * `currentIndex` est ajouté dans le tableau de `previousIndexes`.
   *
   * @param index Index de la musique à écouter
   */
  const play = (id: number) => {
    const track = playlist().find((track) => track.id === id);
    if (!track) throw new Error("Track id not found");

    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    audio.paused ? audio.play() : audio.pause();
    setIsPlaying((prev) => !prev);
  };

  const setVolume = (n: number) => {
    audio.volume = n;
    setMuted(n === 0);
    _setVolume(n);
  };

  const toggleMuted = () => {
    setMuted((prev) => !prev);
  };

  const toggleShuffle = () => {
    setShuffle((prev) => {
      const isShuffle = !prev;

      if (isShuffle) {
        setPlaylist(shuffleTracks(tracklist, currentTrack()));
      } else {
        setPlaylist(tracklist.slice());
      }

      return isShuffle;
    });
  };
  const toggleTimerLeft = () => {
    setTimerLeft((prev) => !prev);
  };
  const toggleShowPlaylist = () => {
    setShowPlaylist((prev) => !prev);
  };
  const toggleRepeat = () => {
    setRepeat((prev) => ((prev + 1) % REPEATS.length) as RepeatRange);
  };

  const previous = () => {
    const prevTrack = playlist()[currentIndex() - 1];
    if (prevTrack) play(prevTrack.id);
  };

  const next =
    (force = false) =>
    (_event: Event) => {
      let nextTrack: TrackAlbum | undefined;

      if (isLastTrack() && repeat() === REPEAT.ALL) {
        nextTrack = playlist()[0];
      } else if (!force && repeat() === REPEAT.ONE) {
        nextTrack = currentTrack();
        setTimer(0);
        audio.play();
      } else if (!isLastTrack()) {
        nextTrack = playlist()[currentIndex() + 1];
      }
      if (nextTrack) play(nextTrack.id);
      else {
        setCurrentTrack(playlist()[0]);
        setIsPlaying(false);
        setTimer(0);
      }
    };

  const handleChangeTimer = (newTimer: number) => {
    audio.currentTime = newTimer;
  };
  const handleTimeUpdate = () => {
    setTimer(audio.currentTime);
  };

  audio.addEventListener("ended", next());
  audio.addEventListener("timeupdate", handleTimeUpdate);

  createEffect(() => {
    audio.volume = muted() ? 0 : volume();
  });

  createEffect(() => {
    console.log("Track en cours :", currentTrack().title);
    audio.currentTime = 0;
    audio.src = PATH.TRACK + currentTrack().filename;
    audio.addEventListener("canplaythrough", handlePlayThrough);
  });

  onCleanup(() => {
    audio.removeEventListener("ended", next());
    audio.removeEventListener("timeupdate", handleTimeUpdate);
  });

  const value: PlayerContextModel = {
    tracklist,
    isFirstTrack,
    isLastTrack,
    currentIndex,
    currentTrack,
    previous,
    next,
    play,
    togglePlay,
    isPlaying,
    repeat,
    toggleRepeat,
    volume,
    setVolume,
    muted,
    toggleMuted,
    shuffle,
    toggleShuffle,
    timer,
    setTimer,
    timerLeft,
    toggleTimerLeft,
    showPlaylist,
    toggleShowPlaylist,
    playlist,
    handleChangeTimer,
    duration,
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
