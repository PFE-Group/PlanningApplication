# PlanningApplication

# PlanningApplication

##Description du sujet 

La session des examens approche petit à petit pour beaucoup d’étudiants, mais avant celle-ci un événement terrible arrive à grand pas. Il s’agit d’une période très attendue des étudiants belges universitaires et en supérieur, une période appelé « vacances de Noël » dans le calendrier académique de Vinci, mais qui ne sont guère des vacances. Une période où les étudiants croulent sous les syllabus, slides, notes, résumés et travaux. Celui-Dont-On-Ne-Doit-Pas-Prononcer-Le-Nom, et il ne s’agit bien évidemment pas de Voldemort mais du BLOCUS. La simple prononciation de son nom provoque des frissons à l’étudiant qui l’entend, cette période, qui rime parfois avec désespoir et nuits blanches, nécessite une bonne organisation afin de réussir sa session d’examen et de ne pas avoir à rechercher à la veille d’un examen un résumé de 10 pages, le plus complet possible, d’un syllabus de 400 pages poussiéreux. 

Des notes de cours ordonnées, un endroit calme pour étudier ainsi que le bannissement de tout écran qui pourrait nous distraire (au revoir Netflix, Instagram et Snapchat) sont des éléments indispensables pour un blocus idéal. Un autre élément primordial pour survivre à ce blocus est d’avoir une vue d’ensemble de ses objectifs d’étude et c’est pourquoi nous allons développer pour ce projet de fin d’étude, un créateur de planning d’étude pour les étudiants en blocus. Cette application aura pour but de créer le planning le plus efficace possible et permettra aux étudiants de savoir combien de jours il reste entre les examens et de pouvoir évaluer l’avancement dans chacune de leurs matières. 

L’application fonctionnera de la manière suivante : l’utilisateur devra s’inscrire/se connecter afin de pouvoir créer un planning d’étude ou accéder à un planning existant. Pour créer son planning, l’étudiant indiquera ses dates d’examens dans l’application ainsi que les dates des jours dont il dispose pour étudier. Il introduira ensuite ses examens, un niveau de difficulté et le nombre d’heures/jours dont il a besoin pour étudier chacun d’eux. L’application s’occupera de comparer les jours dont l’utilisateur dispose avec les jours dont il a besoin et s’il lui manque des jours, l’application réduira de manière proportionnelle l’attribution des jours pour chaque examen en prenant en compte le niveau de difficulté établi. Il pourra ensuite choisir entre 2 méthodes d’étude : étudier par « bloc de cours », qui organisera chaque cours en bloc dans le planning ou alors « libre », qui laissera l’utilisateur placer ses cours librement. Le planning d’étude créé pourra toujours être modifié afin que l’utilisateur puisse adapter son planning en fonction des jours qu’il lui reste pour étudier. 

Ce projet consistera en une application web responsive afin d’être consultable sur tous les écrans.Saut de page 

##Technologies choisies 

###Frontend (Client) 

Angular 7 : framework JavaScript qui permet de poser les fondations du frontend. Le développement est encadré par les règles d’usage de ce framework. 

 

###Backend (Serveur) 

Node.js : crée un environnement qui permet l’exécution de code JavaScript côté serveur. 

Express : nous nous servirons des utilitaires HTTP mis à disposition par Express pour créer une API Rest. Express simplifie la manière d’appréhender les chemins menant au serveur et permet de fournir un traitement spécifique à chacun de ces chemins. 

Firebase : permet de stocker des données (en NoSQL) et d’y accéder facilement. Cet outil nous permettra aussi de gérer l’authentification.Saut de page 

##Diagramme d’architecture  
 <put an image here>

##Outils utilisés  

Le service d’hébergement du projet sera GitHub, un outil connu par les 5 développeurs, et énormément utilisé en milieu professionnel. Chaque développeur développera sur l’éditeur de texte de son choix (Sublime Text, Visual studio, Atom, …) ainsi que sur son système d’exploitation (Windows, mac Os, Linux). 

Le cloud de déploiement sera AWS (Amazon Web Service), outil fourni par Amazon qui nous permettra de déployer notre application web afin qu’elle soit disponible au grand public.  

Travis sera utilisé comme logiciel d’intégration continue (comme Jenkins) afin de s’assurer que à chaque modification du code source (se trouvant sur GitHub) le résultat ne produit pas de régression dans l’application développée. 

Afin de faciliter le déploiement, docker sera utilisé.  Docker permettra d’empaqueter l’application et ses dépendances qui pourra être exécuté sur n’importe quel serveur.  

Le projet se déroulera en respectant la méthodologie Scrum. Il contiendra 2 sprints, un sprint tous les jeudis. Des réunions tous les matins en vue d’avoir un aperçu de l’avancement du projet et de trouver des solutions aux problèmes rencontrés la veille.  

Trello est l’outil choisi pour la gestion du projet. Il permettra de créer des taches et de les assigner à un développeur dans le but que ce dernier les développe. Cela permettra d’avoir un aperçu de l’avancement du projet.  
