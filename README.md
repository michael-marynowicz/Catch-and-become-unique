# Catch-and-become-unique
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

Rendu 15/05/2022

**Game Play**
---
> Dans ce jeu vous incarnez la planète Terre. Face au rechauffement climatique qui est de plus en plus préoccupant la terre decide de changer de galaxie. En recuperant les jetons vous pourrez progresser de niveau et en parcourant les differents niveaux vous aiderez la terre à trouver un environnement qui lui sera plus adapté. Vous l'avez donc comprit le destin de la terre est entre vos mains !

**Comment jouer**
---
Vous pouvez accéder au directement en jeu en cliquant sur le <a href="https://michael-marynowicz.github.io/Catch-and-become-unique/">github-page</a>
- 'z' ou fleche du haut = deplacer vers l'avant. 
- 's' ou fleche du bas = deplacer vers l'arriere. 
- 'q' ou fleche de gauche = deplacer vers la gauche. 
- 'd' ou fleche de droite = deplacer vers la droite. 
- ' ' = sauter. 
- 'p' = pour avoir une vue d'ensemble du niveau

**Aides**
---
* Au debut de chaque niveau il y a un bouton "help" pour vous rappeler les touches utiles.
* De plus, vous pouvez mettre le jeu en pause et accèder a nimporte quel bouton en cliquant sur le bouton "?" situé en bas a droite de votre écran.

**Story**
---
Au fur et a mesure des niveaux suivez l'hitoires du voyage de la terre en cliquant sur ``Story``avant chaque debut de niveau.
> Pensez aussi à cliquer sur le bouton ``Story`` apres avoir gagné ou perdu pour voir les repercutions de votre reussite/defaite.

**Améliorations futures**
---
> Pour la suite du jeu nous avons imaginer plusieurs améliorations, par exemples : 
- Plus d'effets sonores.
- Plus de reliefs dans les niveaux.
- Pour le niveau final nous avons l'idée de creer un pacman en 3D qui sera la derniere étape afin que la boule puisse rejoindre la nouvelle galaxie. Et les adversaires seront differentes planetes qui empecheront la boule dans sa progression.

**Difficultés rencontrées**
---
- Le debut de la conception du jeu fut fastidieuse. En effet, des le debut nous avons donc cherché à "simplement" creer une boule qui se deplace sur une terrain plat et une followCamera. La followCamera avait un comportement que nous ne comprenions pas, lorsque nous nous deplacions sur les cotés cela changeait l'axe de la camera et la faisait tourner dans tout les sens. Pour resoudre ce probleme nous avons choisi l'ArcRotateCamera.
-  Le plus gros soucis que nous avons rencontré est le saut de la boule. Le soucis n'etais pas le saut en lui meme mais de lui rendre un aspect réel. Au debut notre boule planait dans les airs. Nous avons (presque) tout essayé, masse démesurée, impulsion de la boule en direction du sol lorsque la boule a atteint une certaine hauteur. Finalement apres beaucoup de recherches nous avons trouvés la solution qui etait toute bête... nous n'appliquions pas de physique a la scene donc grace a la fonction enablePhysics nous avons exercé une gravité en y sur la scene.
-  **Une fois ces 2 problemes resolus nous avons pu avancer dans la création du jeu et prendre beaucoup de plaisir à voir evoluer le jeu.**

Nous espérons que notre jeu vous plaiera. :)

Marynowicz Michael   
FORNER Yann
