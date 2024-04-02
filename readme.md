# Projet de Gestion de Personnages
Ce projet est une application de gestion de personnages utilisant une base de données JSON. Les étapes suivantes vous guideront pour démarrer le projet.

## Installation

1. Clonez ce dépôt sur votre machine.
2. Accédez au répertoire du projet.(./Js_TPnote)
3. Installer nvm afin de lancer le server .json
4. Installer http-server pour lancer l'index

## 1. Cloner le dépôt
1. Ouvrer un terminal
2. Entrer la commande suivante : git clone https://github.com/ibrahimOzocak/Js_TPnote.git

## 2. Rentrer dans le répertoire
1. Entrer dans le répertoire : cd Js_TPnote

## 3. Installer nvm
1. Installer nvm avec : nvm install 18
2. Choisir une version avec : nvm use 18

## 4. Installer http-server
1. Installer http-server : npm install --global http-server

# Lancer le projet
1. Lancer la base de données avec la commande suivante : npx json-server ./Data/personnage.json
2. Ensuite le server : http-server -c-1
(Utilisation de l'option "-c-1" pour désactiver le cache)
3. Lancer maintenant l'URL
(le premier étant pour lancer en local)
