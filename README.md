# Parc informatique - Vue.js 3

Application de gestion d'ordinateurs (liste, ajout, modification, suppression).
Stack : Vue 3 + Vite + Vue Router. Donnees sauvegardees dans localStorage.

## Installation
```bash
npm install
npm run dev
```
Puis ouvrir http://localhost:5173

## Fonctionnalites
- Liste en cartes (v-for + composant OrdinateurCard avec props/emit)
- Ajout / modification (meme page, mode selon la route)
- Suppression avec confirm()
- Persistance localStorage (exemples charges a la 1ere utilisation)
- Bonus : recherche, compteur, tri par memoire

## Images
Placer les photos dans `public/images/` puis saisir le nom (ex: dell.jpg) dans le champ Photo.
Sans photo, une image par defaut s'affiche.
