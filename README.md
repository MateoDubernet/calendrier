# Calendrier

## Contexte

### Description
Projet réalisé durant mon alternance dans le cadre d'un devoir maison.
Ce projet à pour but initial de créer un calendrier pour pouvoir gérer des évènements, avec les différentes fonctionnalités suivantes :

- Afficher un calendrier et pouvoir naviguer dessus
- Pouvoir créer des évènements
- Afficher sous forme de tableau la liste des évènements
- Afficher les évènements sur le calendrier
- Consulter un évènement
- Modifier et supprimer un évènement

L'application repose sur les technologies suivante :
- **Node.js**
- **Electron**
- **TypeScript**

---

## Prérequis
- Node.js et npm installés
- Electron
- MySQL
- Typescript installé globalement

---

## Installation & Lancement
### 1. Cloner le projet
```bash
    git clone https://github.com/MateoDubernet/calendrier.git
```

### 2. Aller sur le projet
```bash
    cd calendrier
```

### 3. Installer les dépendances
```bash
    npm install
```

### 4. Configuration
- Configurer le fichier **src\database\database.ts** avec les informations de la base de données.
- Exécuter le fichier calendrier.sql avec MySQL pour créer la base de données et les tables.

### 5. Lancer l’application
Exécuter la commande :
```bash
    npm start
```
Une fois lancer il sera demander : Est-ce que dist\html désigne un nom de fichier
ou un nom de répertoire de la destination \
et\
Est-ce que dist\styles désigne un nom de fichier
ou un nom de répertoire de la destination ?

Répondre répertoire pour les deux

---

## Fonctionnalités
- Dans la barre de navigation il y a deux menus "**Ajouter**" qui ouvre un formulaire pour ajouter un évènement et "**Outil**" pour afficher le devtool.
- Lorsque un évènement est créer la page est rechargée et l'évènement s'affiche sur le calendrier à la date de début et de fin indiqué dans le formulaire, et dans le tableau en dessous du calendrier.
- Dans le tableau d'évènement en cliquant sur **Info** une fenêtre s'ouvre pour afficher les détails de l'évènement, à partir de la il est possible de modifier ou supprimer l'évènement.










