import { REPEAT } from "@utils/constants";
import { Accessor } from "solid-js";

declare global {
  type PlayerStore = {
    /** ``true`` si le titre est en lecture, ``false`` s'il est en pause */
    isPlaying: boolean;

    // Lié au timer
    /** Progression en secondes du titre */
    timer: number;
    /** Durée totale du titre */
    duration: number;
    /** Durée restante du titre */
    timerLeft: boolean;

    // Lié aux fonctionnalités
    /** Mode de repeat parmi ``off``, ``one`` et ``all`` */
    repeat: RepeatRange;
    /** ``true`` si la lecture est en mode aléatoire, ``false`` sinon */
    shuffle: boolean;
    /** ``true`` si le son est coupé, ``false`` sinon */
    muted: boolean;
    /** Affiche ou non la playlist */
    showPlaylist: boolean;
    /** Volume de la musique */
    volume: number;

    // Lié aux titres
    /** Liste des musiques */
    playlist: TrackAlbum[];
    /** Titre en cours d'écoute */
    currentTrack: TrackAlbum;
  };

  type PlayerContextModel = {
    /** Store contenant l'état du contexte */
    store: PlayerStore;

    /** Liste des musiques */
    tracklist: TrackAlbum[];

    /** ``true`` si la chanson est la première de la liste */
    isFirstTrack: Accessor<boolean>;
    /** ``true`` si la chanson est la dernière de la liste */
    isLastTrack: Accessor<boolean>;

    /** Met le titre précédent à partir de la playlist */
    previous: () => void;
    /**
     * Met le titre suivant à partir de la playlist */

    /**
     * Met le titre suivant à partir de la playlist.
     * @param force - Permet de forcer le fait de passer à la musique suivante dans le cas où le mode ``Repeat One`` est activé.
     */
    next: (force?: boolean) => (_event: Event) => void;
    /**
     * Lance l'écoute de la musique à l'index choisit.
     *
     * `isPlaying` est alors passé à `true`, le `timer` est remis à `0` et enfin le
     * `currentIndex` est ajouté dans le tableau de `previousIndexes`.
     *
     * @param index Index de la musique à écouter
     */
    play: (index: number) => void;

    /** Alterne entre lecture et pause */
    togglePlay: () => void;
    /** Alterne entre ``off``, ``one`` et ``all`` */
    toggleRepeat: () => void;
    /** Alterne entre muet ou non */
    toggleMuted: () => void;
    /** Alterne entre lecture aléatoire et lecture des tracks les uns après les autres */
    toggleShuffle: () => void;
    /** Alterne entre temps restant et durée de la musique */
    toggleTimerLeft: () => void;
    /** Alterne entre le fait d'afficher ou non la playlist */
    toggleShowPlaylist: () => void;

    /**
     * Modifie le volume. Si celui ci passe à 0, le mode mute est automatiquement
     * activé. A contrario, si le son devient positif, le mute est désactivé.
     * */
    setVolume: (volume: number) => void;
    /** Met à jour le timer */
    setTimer: (newTimer: number) => void;
  };

  type RepeatRange = typeof REPEAT[keyof typeof REPEAT];
}
