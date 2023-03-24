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
  /** Track en cours d'écoute */
  current: Accessor<TrackAlbum | undefined>;
  /** Met la musique précédente (prend en compte ``shuffle`` et ``repeat``) */
  previous: () => void;
  /** Met la musique suivante (prend en compte ``shuffle`` et ``repeat``) */
  next: () => void;
  /** Met en lecture */
  play: (index: number) => void;
  /** Alterne entre lecture et pause */
  togglePlay: () => void;
  /** ``true`` si le track est en lecture, ``false`` s'il est en pause */
  isPlaying: Accessor<boolean>;
  /** Mode de repeat parmis ``off``, ``one`` et ``all`` */
  repeat: Accessor<RepeatRange>;
  /** Alterne entre ``off``, ``one`` et ``all`` */
  toggleRepeat: () => void;
  /** Volume de la musique */
  volume: Accessor<Number_0_to_100>;
  /** Modifie le volume */
  setVolume: (e: TInputEvent) => void;
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
};

export type PlayerContextProps = {};

const PlayerContext = createContext<PlayerContextModel>();
const tracklist = addAlbums(tracks);

const REPEATS = Object.values(REPEAT);

export function PlayerContextProvider(props: ParentProps<PlayerContextProps>) {
  const [current, setCurrent] = createSignal<TrackAlbum>();
  const [, setTrackIndex] = createSignal(-1);
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
    console.log("Launching track...", tracklist[index].id);

    setTrackIndex(index);
    launchTrack(tracklist[index]);
  };

  const togglePlay = () => {
    if (current() === undefined) {
      setCurrent(tracklist[0]);
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

  /**
   * Plutot que de choisir au hasard une musique dans la tracksList qui n'est pas celle en cours,
   * je préfère réutiliser la méthode next(). Au lieu de mettre 1 index plus loin, je met un nombre
   * d'index plus loin correspondant au nombre de musique - 1 (pour éviter de retomber sur la
   * musique en cours)
   */
  const randomIndex = () => {
    return shuffle()
      ? Math.floor(Math.random() * (tracklist.length - 1)) + 1
      : 1;
  };

  const previous = () => {
    setTrackIndex((prev) => {
      const index =
        (prev - randomIndex() + tracklist.length) % tracklist.length;
      launchTrack(tracklist[index]);
      return index;
    });
  };
  const next = () => {
    setTrackIndex((prev) => {
      const index = (prev + randomIndex()) % tracklist.length;
      launchTrack(tracklist[index]);
      return index;
    });
  };

  const value: PlayerContextModel = {
    current,
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
