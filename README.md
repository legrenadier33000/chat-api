# Réseaux et Applications Réparties

[ToC]

## 1. Introduction

Ce projet a été réalisé sous la direction de Tidiane SYLLA par H. De Guigne, G. Germanaud, V. Marie et M. Tueux.

Le but de ce projet est de réaliser un service REST exposant une API permettant :

- Aux utilisateurs de s'inscrire et de se connecter
- De créer des groupes de discution
- De poster dans des groupes de discution
- De lire dans des groupes de discution
- D'administrer des groupes de discution (ajout de membre, suppression de membre, suppression du groupe)



## 2. L'environnement

Ce projet est réalisé exclusivement en JavaScript. Il s'agit d'un projet dît "backend", l'application est donc exécutée sur Node.js, un environnement d'exécution JavaScript côté serveur. 

Node.js propose en plus de son environnement d'exécution un gestionnaire de paquet, NPM (Node.js Packet Manager).

Le projet utilise les paquets NPM suivant :

- **ExpressJS**, permet la création d'un serveur web afin d'exposer les différentes ressources de l'API et les méthodes associées.
- **Mongoose**, un ORM (Object Relational Mapper) permettant d'intéragir avec une base de données MongoDB (base de données NoSQL orientée stockage de documents JSON).
- **JSONWebToken**, une librairie permettant de créer des JSON Web Token, un système d'authentification côté client (à l'inverse des traditionnelles sessions stockées côté serveur et récupérées par le client à l'aide d'un cookie contenant l'identifiant de session).
- **Bcrypt**, une librairie permettant, entre autres, d'utiliser des fonctions de hashages (ex. SHA-256, SHA-512, MD5).
- **Ajv**, une librairie permettant de définir et valider des schémas JSON afin de vérifier que les données reçues par l'API sont conformes aux schémas définits et attendus.
- **Swagger-Jsdoc**, une librairie générant une spécification YAML Swagger à partir des commentaires placé dans le code.
- **Swagger-Ui-Express**, une librairie générant une interface utilisateur Swagger basée sur la spécification YAML générée par Swagger-Jsdoc.

Afin de rendre l'application plus flexible et sécurisée, les variables susceptibles de changer selon l'environnement d'exécution (ex. port du serveur web, identifiant de connexion à la base de données) sont stockées dans des variables d'environnement.

## 2. Structure du projet

La figure ci-dessous illustre la structure du projet, celui-ci est divisé en contrôleurs (logique de l'application), middlewares (authentification), routes (triplet d'une URL, d'une méthode HTTP et d'un contrôleur), de modèle (schémas d'objet stockés en base) et d'utilitaires (ex. connexion à la base de données, erreurs).

```
├───controllers
│   ├───groups	        // Gestion des groupes
│   ├───livenessprob    // Sonde applicative
│   └───users           // Gestion des utilisateurs
├───middlewares
│   └───auth            // Gestion de l'authentification et de l'autorisation
├───models              // Schémas des objets stockées dans MongoDB
├───router              // Route HTTP de l'application
└───utils               // Utilitaires
    ├───db              // Connexion à MongoDB
    └───errors          // Erreurs spécifiques à l'application
```

## 3. User Stories

Le projet a été réalisé en utilisant un tableau kanban afin de rendre visible les différentes tâches et suivre efficacement leur avancement.

Les tâches formant le back log du kanban ont été extraites des *user stories* ci-dessous :

`En tant qu'utilisateur, je souhaite pouvoir m'inscire et me connecter de façon sécurisé à l'API de chat de groupe.`

`En tant qu'utilisateur, je souhaite pouvoir créer des groupes de discution.`

`En tant qu'utilisateur créateur d'un groupe, je souhaite pouvoir supprimer ce groupe.`

`En tant qu'utilisateur, je souhaite pouvoir ajouter des membres à un groupe de discution auquel je suis moi-même membre.`

`En tant qu'utilisateur, je souhaite pouvoir envoyer et lire des messages d'un groupe auquel je suis membre.`

`En tant qu'utilisateur créateur d'un groupe, je souhaite pouvoir retirer un ou plusieurs membres de ce groupe.`

`En tant qu'utilisateur, je souhaite pouvoir quitter un groupe duquel je suis membre.`

## 4. Conception de la base de données

Les exigences précédemment établies via les *user stories* ont permis de déterminer les modèles (objets stockés en base de données afin d'assurer la persistance des données applicatives) nécessaires à l'application :

- Un modèle **User**, représentant un utilisateur.
- Un modèle **Group**, représentant un groupe de discution.
- Un modèle **GroupMessage**, représentant un message à destination d'un groupe.

La base de données choisie pour ce projet est MongoDB, une base de données orientée documents dîtes NoSQL. Du fait que MongoDB soit orientée documents, il n'y a pas de relations explicites (ex. clé primaire, clé étrangère, contraintes) entre les documents. Par conséquent, les utilisateurs sont tous stockés dans un même document de la même manière que les groupes. La particularité est qu'il n'y a pas ici de documents pour stocker les messages d'un groupe. En effet, l'un des avantages d'une base de données orientée document et de pouvoir stockée des données imbriquées dans un même document sans perdre en performance en terme de latence de requête. Chaque objet `Group` stocké dans Mongo dispose donc d'un attribut `messages` contenant l'entièreté des messages envoyés dans ce groupe.

## 5. Service REST

L'application utilise le package `express` afin de créer un serveur web disponible pour les clients. Des règles de routages sont définits sur le serveur web express. Une règle de routage est un triplet composé :

- D'une URL
- D'une méthode HTTP (ex. GET, POST, PATCH, DELETE)
- D'un middleware, un logiciel prennant en charge la requête HTTP entrante

Ce serveur web est donc une API REST puisqu'il :

- Utilise le format JSON (JavaScript Object Notation) pour échanger des informations sur les requêtes entrantes et sortantes.
- Utilise le protocole HTTP, les verbes associés (ex. GET, POST) pour qualifier les interractions possible avec l'API. 

## 6. Documentation de l'API

Afin qu'une API puisse être utilisable facilement par ses utilisateurs finaux, il est nécessaire de réaliser une documentation. Cette API utilise donc le formalise OpenAPI (anciemment Swagger) pour documenter cette API REST. L'utilisation de ce format de documentation à plusieurs intérêts :

- La spécification OpenAPI est standardisé, celle-ci est écrite en YAML.
- Du fait de sa grande popularité, plusieurs outils se sont développés autour de la spécification OpenAPI, notamment : des outils créant une interface utilisateur fournissant une documentation interactive de l'API, des outils permettant de détecter les changements non rétrocompatibles entre deux version d'une même spécification OpenAPI, et bien d'autres.

Ce projet utilise donc les packages `swagger-jsdoc`, afin de générer la spécification OpenAPI YAML à partir des commentaires dans le code, et `swagger-ui-express` afin de mettre en ligne sur le serveur web Express de l'API une interface utilisateur interactive documentant le fonctionnement de l'API.
