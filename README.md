# Réseaux et Applications Réparties

[ToC]

## 1. Introduction

Ce projet a été réalisé sous la direction de Tidiane SYLLA par H. De Guigne, G. Germanaud, V. Marie et M. Tueux.

Le but de ce projet est de réaliser un service REST exposant une API permettant :

- Aux utilisateurs de s'inscrire et de se connecter
- De créer des groupes de discution
- De poster dans des groupes de discution
- De lire dans des groupes de discution
- D'adminstrer des groupes de discution (ajout de membre, suppression de membre, suppression du groupe)



## 2. L'environnement

Ce projet est réalisé exclusivement en JavaScript puisqu'il s'agit d'un projet dît "backend", l'application est donc exécuter sur NodeJS, un environnement d'exécution JavaScript côté serveur. NodeJS propose en plus de son environnement d'exécution un gestionnaire de paquet, NPM (NodeJS Packet Manager).

Le projet utilise donc les paquets NPM suivant :

- **ExpressJS**, permet la création d'un serveur web afin d'exposer les différentes ressources de l'API et les méthodes associées.
- **Mongoose**, un ORM (Object Relational Mapper) permettant d'intéragir avec une base de données MongoDB (base de données NoSQL orientée stockage de documents JSON).
- **JSONWebToken**, une librairie permettant de créer des JSON Web Token, un système d'authentification côté client (à l'inverse des sessions traditionnels stockées côté serveur et accédées par le client à l'aide d'un cookie contenant l'identifiant de la session).
- **Bcrypt**, une librairie permettant d'utiliser des fonctions de hashages (ex. SHA-256, SHA-512, MD5).
- **Ajv**, une librairie permettant de définir et valider des schémas JSON afin de vérifier que les données reçues par les endpoints de l'API sont conformes aux schémas définits.
- **Swagger-Jsdoc**, une librairie générant une spécification YAML Swagger à partir des commentaires placé dans le code.
- **Swagger-Ui-Express**, une librairie générant une interface utilisateur Swagger basée sur la spécification YAML générée par Swagger-Jsdoc.

Afin de rendre l'application plus flexible, les variables susceptibles de changer selon l'environnement d'exécution (ex. port du serveur web, identifiant de connexion à la base de données) sont stockées dans des variables d'environnement.

## 2. Le service REST



​	