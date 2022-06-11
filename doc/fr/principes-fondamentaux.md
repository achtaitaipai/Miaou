# Principes fondamentaux

[Version anglaise](../main-concepts.md)

---

## Autres resources

- [Miaou](https://achtaitaipai.github.io/Miaou/)
- [Intro](./LISEZMOI.md)
- [Premiers pas](./premiers-pas.md)
- [Guide Complet](./guide-complet.md)

---

## Summary

- [General](#general)
- [Navigation](#navigation)
- [Titre et couleurs](#titre-et-couleur)
- [Trigger](#trigger)
- [Answer](#answer)
  - [Plusieurs answers](#plusieurs-answers)
  - [plusieurs messages et temps](#plusieurs-messages-et-temps)

---

## Général

Miaou repose sur un système de boîtes. Lorsque l'utilisateur envoie une phrase au bot, Miaou vérifie chaque boîte jusqu'à en trouver une qui convient. Puis renvoie la **answer** de celle-ci.

## Navigation

Pour modifier une boîte cliquez dessus et modifiez les paramètres qui s'affichent à droite

Pour déplacer une boîte vous pouvez la glisser et déposer à l'endroit voulu. L'ordre des boîtes a son importance : lorsque plusieurs boîtes sont susceptibles de se déclencher ce sera toujours la première qui se déclenchera.

Pour créer une nouvelle boîte cliquez sur le bouton **+** situé à la suite des boîtes ou pressez la touche **n**.

Pour supprimer une boîte : sélectionnez la, puis cliquez sur le bouton poubelle situé en bas du formulaire ou pressez la touche **suppr**.

Vous pouvez rentrer dans une boîte en double-cliquant dessus.

Le bandeau au dessus des boîtes vous permet de savoir à quel niveau de l'arborescence vous vous situez.

## Titre et couleur

Le titre et la couleur des boîtes n'ont aucune incidence sur le fonctionnement du bot, ils permettent simplement d'organiser les boîtes.

## Trigger

**Trigger**: Correspond à ce qui déclenchera la boîte.

Lorsque l'utilisateur envoie du texte, le bot vérifie chaque boîte jusqu'à en trouver une dont le trigger fasse partie du texte de l'utilistateur.

Une boîte ayant pour trigger :`bonjour` se déclenchera pour `bonjour`, `machin te passe le bonjour` et `blablablabonjourblablabla`

Les trigger utilisent les expressions régulières, ce qui signifie que les caractères suivants : `[\^$.|?*+(){}` doivent être précédé d'un `\` pour être utilisés normalement.

En contre-partie il est possible d'utiliser les super-pouvoirs des **_expressions régulières_**.

- `.*` désigne n'importe qu'elle suite de caractères. Ainsi, le trigger :`Comment .* va` se déclenchera pour `comment ça va ?` et`comment tu vas`.
- `^` signifie que ce qui suit doit être au début du texte envoyé par l'utilisateur. Par exemple : `^bonjour` se déclenchera pour `bonjour`, mais pas pour `machin te passe le bonjour`.
- `$` signifie que ce qui précède doit être à la fin du texte envoyé par l'utilisateur. Par exemple : `bonjour$` se déclenchera pour `bonjour`, mais pas pour `bonjour à toi`

Il est possible de mettre plusieurs Trigger à la même boîte en les espaçant par `&`

## Answer

Answer correspond à ce que répondra la boîte lorsqu'elle est déclenchée.

### plusieurs answers

l est possible d'écrire plusieurs answer en les espaçant par `&`

La **answer** sera choisie en fonction du mode :

- _aléatoire_: le bot choisit une answer au hasard
- _loop_ : le bot choisira la première answer, puis la seconde et ainsi de suite jusqu'à revenir à la première lorsque toutes les answer auront été lues
- _à la suite_ : le bot choisira la première answer, puis la seconde etc et restera sur la dernière lorsque toutes les answer auront été lues

### plusieurs messages et temps

Chaque answer peut être constituée de plusieurs messages, pour celà espacer les messages avec : `--`

Vous pouvez préciser un temps d'attente avant que le bot ne réponde, par exemple pour que le bot attende trois secondes mettez `((3))` à la fin du message.

Pour que le bot ne réponde pas écrivez `NOTHING`.
