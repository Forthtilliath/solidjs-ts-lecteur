# Spotube

![License](https://img.shields.io/github/license/forthtilliath/spotube?style=for-the-badge) [![SolidJS](https://img.shields.io/badge/SolidJS-2C4F7C?style=for-the-badge&logo=solid&logoColor=white)](https://www.solidjs.com/) ![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white&style=for-the-badge) [![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

> Spotube est une application de streaming musical qui donne accès à quelques titres.

**🔗 Démo :** [forth-spotube.netlify.app](https://forth-spotube.netlify.app/)

## Contexte du projet

L'application a été réalisée dans le cadre d'un concours : intégrer une page avec un lecteur audio/vidéo.

Plus d'informations sur le concours ici : [Discord du Repaire du Web](https://discord.com/channels/655077317911117860/1041772720066674760/1087289852095119440).

## Stack technique

- [SolidJS](https://www.solidjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/) avec CSS Modules
- [Vite](https://vitejs.dev/)

## Installation

Ce projet utilise [pnpm](https://pnpm.io) comme gestionnaire de paquets.

```bash
# cloner le repo
git clone https://github.com/Forthtilliath/spotube.git
cd spotube

# installer les dépendances
pnpm install

# lancer le serveur de développement
pnpm dev
```

### Scripts disponibles

| Commande      | Description                          |
| ------------- | ------------------------------------ |
| `pnpm dev`    | Serveur de développement             |
| `pnpm build`  | Build de production                  |
| `pnpm serve`  | Prévisualise le build de production  |

## Description de l'application

Le projet réalisé est donc une application de streaming musical, utilisant plusieurs titres de musique.

En premier lieu, voici la vue de l'application. À gauche se trouve la sidebar avec la cover de l'album, le titre et l'artiste, ainsi qu'un bouton pour afficher ou non la playlist.
À droite se trouve la liste de lecture. Il est possible de cliquer sur un titre pour démarrer l'écoute. Un bouton `lecture`/`pause` est aussi présent sur la cover de la sidebar et sur la cover du titre en cours.

![Vue de la liste de lecture (tracklist)](public/assets/doc/tracklist.png)
![Vue de la playlist](public/assets/doc/playlist.png)

À ceci, un ensemble de contrôles, un lecteur et des fonctionnalités sont disponibles dans le bas de l'écran.

![Barre de lecture avec contrôles et fonctionnalités](public/assets/doc/footer.png)

### Liste des contrôles

- **Précédent** : Met la musique précédente à partir de la liste de lecture. Si c'est le premier titre, le bouton est désactivé.
- **Suivant** : Met la musique suivante à partir de la liste de lecture. Si c'est le dernier titre, le bouton est désactivé.
- **Lecture/Pause** : Alterne entre la lecture et la pause du titre en cours de lecture.

### Lecteur

- **Titre et artiste** : Titre de la musique et artiste du titre en cours de lecture.
- **Timer** : Temps actuel de la lecture audio.
- **Barre de lecture** : Affiche la progression de la lecture du titre. Il est aussi possible de cliquer sur celle-ci pour mettre à jour la progression.
- **Temps restant** : Affiche la durée totale du titre en cours. Il est également possible de cliquer dessus pour afficher le temps restant jusqu'à la fin du titre.

### Fonctionnalités

- **Repeat** : Le bouton repeat permet d'alterner entre 3 modes :
  - **Repeat off** : Désactive le mode repeat ;
  - **Repeat one** : Permet de répéter un titre (en cliquant sur le bouton suivant, cette option est ignorée) ;
  - **Repeat all** : Permet de répéter la liste de lecture.
- **Liste de lecture** : La liste de lecture affiche tous les titres. L'ordre de lecture des titres se réfère à la liste de lecture.
- **Mode aléatoire** : Le bouton permet d'activer ou non le mode aléatoire. Activer le mode aléatoire génère la liste de lecture de façon aléatoire. Tous les titres seront écoutés une seule fois. Désactiver le mode remet les titres dans l'ordre de base. Réactiver à nouveau le mode génèrera un nouvel ordre de lecture.
- **Muet** : Le bouton permet d'activer ou non le son. Réactiver le son remet le son au volume auquel il était.
- **Barre de volume** : Modifier le volume de la lecture. Si le nouveau son n'est pas 0, l'option muet est désactivée.

Les réglages sont enregistrés dans le localStorage afin d'améliorer le confort de l'utilisateur.

## SEO

L'application répond pleinement aux exigences de chacune des catégories :

![Score Lighthouse de l'application](public/assets/doc/lighthouse.png)

De plus, des balises Open Graph ont été mises en place :

![Aperçu des balises Open Graph](public/assets/doc/open_graph.png)

## Licence

Distribué sous licence [MIT](./LICENSE).
