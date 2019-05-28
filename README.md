# Pokedex by Yztoc

Projet IHM Cours Esir2, le but était de créer un pokedex fonctionel avec un framework web
Ce projet comprend une **Application Web**, une **Application Android, IOS**, et un **Client lourd Windobe, Linux et MacOS**.
Le but personel de ce projet était de respecter aux mieux les bests practices Angular (mvc, services, etc..).
 
Résultat **Web**  : [https://pokedex.thomas-stephant.fr](https://pokedex.thomas-stephant.fr)

# Technologies
- Angular 7 
- Bootstrap 4
- Ionic 4 
- Electron 5

## Fonctionnalités 
***Version : 0.1***
- Recherche en temps réel 
- Mode nuit (Dark theme)
- I18n (Anglais, Francais)
- Changer la qualitée des images 
- Création/Suppresion de son propre pokemon (localStorage)

> Bug découvert : le chargement via le scroll n'est pas disponible sur certains navigateurs téléphone

## Structure du git 
Les sources sont disponibles ainsi que les différentes builds dans les dossiers "build".

**web_pokedex** projet source :
	
    npm install
    npm start 

**app_pokedex** application hybride Ionic :

    npm install
    npm run build
    cordova plateform add android
    ionic cordova run android

**client_lourd_pokedex** client lourd Linux, Windobe, MacOS electron :

    npm install
    npm start

> l'environnement pour build les applications devices et lourd sont complexe à mettre en place (environnement de developpement Linux Debian, JDK 1.8, Node 10.2 )
