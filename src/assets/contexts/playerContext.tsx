import {
  Accessor,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  ParentProps,
  Setter,
  useContext,
} from "solid-js";
import { tracks, albums } from "@utils/data";
import { REPEAT } from "@utils/constants";
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
  /** Tableau contenant les index des musiques précédentes */
  previousIndexes: Accessor<number[]>;
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

  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [previousIndexes, setPreviousIndexes] = createSignal<number[]>([]);
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
  const [showPlaylist, setShowPlaylist] = createSignal(false);
  const [playlist, setPlaylist] = createSignal(
    shuffle() ? shuffleTracks(tracklist, tracklist[0]) : tracklist
  );

  // const currentTrack = createMemo(() => {
  //   console.log(playlist())
  //   return playlist()[currentIndex()]
  // });
  const [currentTrack, setCurrentTrack] = createSignal(tracklist[0]);
  const isFirstTrack = createMemo(() => currentIndex() === 0);
  const isLastTrack = createMemo(
    () => currentIndex() === playlist().length - 1
  );

  const audio = new Audio("/src/assets/tracks/" + currentTrack().filename);
  audio.volume = muted() ? 0 : volume();

  // onTimeUpdate={(e) => player.setTimer(e.currentTarget.currentTime)}
  //   onEnded = { handleEnded }

  createEffect(() => console.log({ currentIndex: currentIndex() }));

  /**
   * Lance l'écoute de la musique à l'index choisit.
   *
   * `isPlaying` est alors passé à `true`, le `timer` est remis à `0` et enfin le
   * `currentIndex` est ajouté dans le tableau de `previousIndexes`.
   *
   * @param index Index de la musique à écouter
   */
  const play = (id: number) => {
    const trackIndex = playlist().findIndex((track) => track.id === id);
    if (trackIndex === -1) throw new Error("Track id not found");

    const track = playlist()[trackIndex];
    setCurrentIndex(trackIndex);
    setCurrentTrack(track);
    audio.currentTime = 0;
    audio.src = "/src/assets/tracks/" + track.filename;
    audio.addEventListener("canplaythrough", audio.play);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    audio.paused ? audio.play() : audio.pause();
    setIsPlaying((prev) => !prev);
  };

  const setVolume = (n: number) => {
    audio.volume = n;
    _setVolume(n);
  };

  const toggleMuted = () => {
    setMuted((prev) => {
      const newState = !prev;
      audio.volume = newState ? 0 : volume();
      return newState;
    });
  };

  const toggleShuffle = () => {
    setPreviousIndexes([]);
    // setShuffle((prev) => !prev);
    setShuffle((prev) => {
      const isShuffle = !prev;
      let tracks: TrackAlbum[];
      if (isShuffle) {
        tracks = shuffleTracks(tracklist, currentTrack());
      } else {
        tracks = tracklist.slice();
      }
      setPlaylist(tracks);
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

  /**
   * Plutot que de choisir au hasard une musique dans la tracksList qui n'est pas celle en cours,
   * je préfère réutiliser la méthode next(). Au lieu de mettre 1 index plus loin, je met un nombre
   * d'index plus loin correspondant au nombre de musique - 1 (pour éviter de retomber sur la
   * musique en cours)
   */
  // const randomIndex = () => {
  //   return shuffle()
  //     ? Math.floor(Math.random() * (tracklist.length - 1)) + 1
  //     : 1;
  // };

  const previous = () => {
    if (shuffle()) {
      setPreviousIndexes((prevIndexes) => {
        const last = prevIndexes.pop();
        if (last !== undefined) play(last);
        return prevIndexes;
      });
    } else {
      setCurrentIndex((prevIndex) => {
        const index = (prevIndex - 1 + tracklist.length) % tracklist.length;
        play(index);
        return index;
      });
    }
  };
  const next = (force?: boolean) => (_event: Event) => {
    if (isLastTrack() && repeat() !== REPEAT.OFF) {
      play(playlist()[0].id);
      return;
    }

    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      const nextTrack = playlist()[nextIndex];
      play(nextTrack.id);

      return nextIndex;
    });
  };

  const handleChangeTimer = (newTimer: number) => {
    audio.currentTime = newTimer;
  };

  audio.addEventListener("ended", next());
  audio.addEventListener("timeupdate", () => setTimer(audio.currentTime));

  const value: PlayerContextModel = {
    tracklist,
    isFirstTrack,
    isLastTrack,
    currentIndex,
    currentTrack,
    previousIndexes,
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
