- Fix bouton mute size
- Styliser input range volume
- Readme file

- Playlist :
  - Reset quand on clique sur shuffle
    - Shuffle on => calcule une playlist aléatoire
    - Shuffle off => ajoute les titres après la chanson en cours


- BUGS :
  - Après avoir changé de musique, problème sur le currentTime
  - Problème sur la playlist après avoir changé de musique


# Liste des actions
## Précédent
- Si timer < 3 : musique prev
  - Si pas de musique précédente, timer = 0
- Sinon timer = 0

## Suivant
- Si dernière chanson, remettre sur le premier titre en arrêt

## Lecture / Pause
- Met en lecture sur le lecteur est en pause, sinon celui ci est mis en pause

## Playlist
- Se met à jour :
  - Quand on clique sur le bouton ``shuffle``.
  - 

## Mode aléatoire


# TODO
- ClassList au lieu du module classnames
- createStore au lieu des createSignal dans le context
- Trier weight des fonts
- Hover sur les boutons
- 