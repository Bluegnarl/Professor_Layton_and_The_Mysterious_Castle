# Professeur Layton et l'Étrange Château

Un jeu inspiré par la licence "Professor Layton"

## Concept de la licence

Professor Layton est une licence de jeux remplis d'énigmes simples ou complexes à résoudre accompagnés d'une histoire attractive et qui est en elle-même une énigme.

## Résumé de l'histoire

Cette histoire se déroule à Londres, le professeur Hershel Layton accompagné de son jeune assistant Luke Triton (ou Flora Reinhold si le joueur est de sexe féminin) reçoit une lettre d'un duc qui les invitent à son château pour résoudre un mystère. À leur arrivée, le duc les accueille comme il se doit avant de disparaître sans laisser de traces. Notre objectif est donc de comprendre ce qui se trame dans ce château et de découvrir le mystère qu'il renferme.
En explorant les lieux, ils découvrent des indices et résolvent des énigmes qui les mènent à une lettre inachevée du duc. Celle-ci mentionne un "invité indésirable" et laisse entendre que le maître des lieux tente de protéger un trésor familial. Au fil de leur progression, Layton et son assistant rencontrent divers personnages, parmi lesquels un invité en apparence anodin mais dont l’attitude les intrigue.
Le duc réapparait finalement dans les profondeurs du château. À ses côtés se tient l'invité suspect, qui s'avère être son frère. Les deux hommes expliquent avoir longtemps été en conflit à propos du trésor familial. Cependant, après des discussions et les efforts de Layton pour apaiser les tensions, ils décident de partager l’héritage.

⚠️ Cette histoire peut légérement changer au cours de son développement ⚠️

## Mini-jeu

Dans ce jeu, les joueurs auront l'occasion de découvrir non pas un mais plusieurs mini-jeux variés. Tout d'abord, des jeux de devinettes simples, où il faudra simplement cliquer sur le bon élément pour résoudre l'énigme. En plus de ceux-ci, un ou plusieurs mini-jeux plus complexes sont prévus.

### Exemples de mini-jeux plus complexes

Je précise qu'ils ne seront pas tous implémentés, ce sont simplement des exemples.

* Puzzle où il faut reconstituer une image ou des fragments d’un message. (mécanique de drag'n'drop)
* Jeu de mémoire où le joueur doit trouver les paires d'éléments identiques parmi des cartes retournées aléatoirement.
* Jeu d'équilibre où le joueur doit équilibrer une balance en déplaçant des poids. (mécanique de drag'n'drop)
* Jeu où le joueur doit réorganiser une phrase ou un texte pour qu'il ait du sens. (mécanique de drag'n'drop)
* Jeu où le joueur voit une série de couleurs ou de formes pendant quelques secondes, puis le joueur doit les reproduire en cliquant.
* Jeu où le joueur doit trier des objets dans des catégories (mécanique de drag'n'drop)

## Utilisation de localStorage

Le formulaire permettra au joueur de saisir son nom et son sexe. Selon le choix, le joueur aura soit Luke, soit Flora.

Pour le stockage des données, j'utiliserai localStorage pour sauvegarder la progression du joueur à chaque action importante effectuée (exemple : réussite d'un mini-jeu). Le joueur pourra reprendre sa partie là où il l’a laissée. Par exemple, la progression dans l'histoire selon les choix, les indices collectés ou la liste des mini-jeux terminés seront enregistrés dans localStorage.
