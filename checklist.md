---
id: checklist
aliases: []
tags: []
---

- Trouver un nom
- Trouver un logo
- Boîte à idée :
  - 3 idée mini par jour dedans.

~~ \* Analyse du css pour mieux le comprendre.~~

- Mettre a jour les notes avec les changements majeur qu'on a fait, et ne rien oublier.
  - Audio
  - La pluie.
  - Le rendu de la réponse pour l'utilisateur.
  - Le rendu de la mise en page. etc.
  - Le fait de maintenant renvoyer au serveur le 1 ou 0 qui donne la couleur au message pour l'utilisateur.
  - Changer le fait que la note 5 est devenu insuffisante.
  - Changement de la manière dont l'utilisateur agit avec le prompt.

x Fixer le fait que la page freeze si on clique avant la fin du rendu du prompt.
x Potentiellement fixer le curseur qui clignote en fade et on voudrais qu'il soit instantanné.

- Rendre la page entièrement responsive. Mobile ou zoom-in zoom-out.
- Réfléchir à une page avant la page actuelle ou pas.
  x Attaquer la deuxieme enigme potentiellement.
  x Transition page prompt vers nouvelle enigme.
  x Rajout d'animations page prompt car elle paraît un peu vide.
  x Continuer l'enigme avec les deux navigateur.
  x Implementer les masquage de la phrase : "I disapprove of what you say, but I will defend to the death your right to say it."
  x Fixer sur la partie NewWeb le fait que retour affiche correctement les resultat déjà afficher.
  x Commencer le troisième site sur le OldWeb.
  x Commencer le troisième site sur le NewWeb.
  x Comment implementer des pubs sous format spam ou autre.
  x Dans la partie NewWeb integrer proprement le boutton retour partout.
  x Update la barre de recherche NewWeb.
  x Dans le forum dans oldWeb refaire un post pour que le forum parraissent moins vide.
  x Faire des transition en mode "laggy" quand tu recherche et quand tu rentres dans une page pour simuler
  les mauvaise connection de l'époque.
  x Rajouter deux trois images sur le faux Wikipedia partie NewWeb.
  x Medium logo un peu trop étroit.
- Idée de transition pour Nouvelle enigme MusicPlayer -> WebComparaison
  x Endroit sur WebComparison ou rentrer la phrase secrète.
  x Server NodeJS qui prend la requête et qui laisse le passage vers la nouvelle transition.
  x Dans le forum a la place de Windows XP Support Thread.
- Réfléchir à une nouvelle énigme.
- Implémenter dans le Prompt un message d'erreur a renvoyer au front si l'API retourne une erreur (response was not ok)
- Pour dot.vue peut être s'inspirer de cette page ? (https://codepen.io/sharnajh/pen/ExjpGwr)[codepen.io]
- Finir la page du braille.
- Inscription via un compte google ?

---

1. Verification intégrale de notre projet avant deployement.

- Régler éventuellement des petit details etc.
- Voir les éventuelles détails et changement à faire.

Potentiel fix a faire :

- Attention parfois les mails apparaissent dans les message indésirables.
- Page d'accueil après **log-in** if i log out and click continue the left side text doesn't disappear.
- Si je suis sur la page d'accueil, puis que je me log-in et vais sur la page du prompt, la pluie commence, si je clique sur le logo pour revenir a la page d'accueil, la pluie continue.
- La pluie ne s'arrête pas quand on change également a l'énigme de la musique.
- Enlever la pluie.

## Music Page :

- SVG pour logo musique "error".

## New Web/oldWeb :

- Ajouter "you say" dans myspoce sur un des boutons en bas.
- dans myspoce un clic sur login rapelle la page.
- Sur wikipedia new web, le menu est activé même sans l'appuie sur le hamburger.
- cnews fixer les etirage d'images.
- oldWeb texte dans we-talk pas commit dans le main.
- rajouter un petit gap entre le bouton retour et la barre d'url quand a l'intérieur d'un site. (oldweb)
- myspoce old web : Empecher le scroll car la page est supposée être bonne dans la taille

## Puzzle :

- Animation entrée et départ (sauf pieces qui bouges)
- Background à revoir, peut être une vidéo en background c'est efficace
- Chrono trop simple, peut être l'embelir un peu.
- Rendre plus compliqué et gerer le temps en fonction de la complexité.
- Peut être rendre le puzzle plus grand.

## Console :

- Remplacer ou revoir l'ascii de type your answer.
- animation de début et de fin a peut être revoir.

## Enigme couleurs dots

- Enlever l'enigme et

2. Changer la plus part des chemins qui sont en localhost pour être déployer, et voir comment on va pouvoir setup ça.

3. Une fois qu'on a une version déployer fonctionelle, s'orienter vers le déploiement d'une DB en utilisant potentiellement [trevor.io](https://trevor.io/)

[vercel](https://vercel.com/) pour host nos sites
