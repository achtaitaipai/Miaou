# Guide complet

[Version anglaise](../complete-guide.md)

---

## Autres resources

- [Miaou](https://achtaitaipai.github.io/Miaou/)
- [Intro](./LISEZMOI.md)
- [Premiers pas](./premiers-pas.md)
- [Principes fondamentaux](./principes-fondamentaux.md)

---

## Summary

- [Titre et couleurs](#titre-et-couleurs)
- [Trigger](#trigger)
- [Answer](#answer)
  - [plusieurs answers](#plusieurs-answers)
  - [plusieurs messages et temps](#plusieurs-messages-et-temps)
  - [Imbrication](#imbrication)
- [Variables](#variables)
  - [Flag](#flag)
  - [String](#string)
  - [Operation](#opération)
  - [Variables prédéfinies](#variables-prédéfinies)
- [Conditions](#conditions)
- [Links](#links)
- [Images](#images)
- [Sound](#sound)
- [Tags](#tags)

---

## Titre et couleurs

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

# Answer

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

### Imbrication

l est possible de créer des boîtes à l'intérieur d'autres boîtes

Lorsqu'on déclenche une boîte qui en contient d'autres, son contenu est utilisé pour la suite de la conversation.

De fait les répliques suivantes de l'utilisateur ne pouront déclencher que les boîtes contenues

## Variables

Les variables permettent de stocker des valeurs, pour que le bot évolue au fil de la conversation. Ils peuvent être appelé dans Answer en les inscrivant entre `[]` par exemple `[bonjour]`

### Flag

Les flags sont des variables qui au départ sont toutes égales à 0

Lorsque vous nommez un drapeau dans une boite il sera augmenté d'1 à chaque fois que la boîte sera ouverte

Ils permettent de savoir si une boite a déjà été ouverte.

### String

Les String permettent de stocker une réplique de l'utilisateur.

Vous pouvez par exemple créer une boite qui demande le prénom de l'utilisateur et stocker la réponse dans la string prenom. Les boîtes suivantes pourront utiliser cette variable dans leurs Answer. Par exemple `bonjour [prenom]`

### Opération

Les opérations permettent de modifier les variables librement.

Par exemple si vous voulez que la variable vies soit égale à 5 écrivez : `[vies]=5`

pour que 2 vies soient enlevées écrivez :`[vies]=[vies]-2`

pour que la variable humeur soit égale à content écrivez:`[humeur]='content'`

### Variables prédéfinies

Il existe plusieurs variables qui n'ont pas besoin d'être définies

|       variable        |                                 description                                 |
| :-------------------: | :-------------------------------------------------------------------------: |
|       `[LAST]`        |                      Dernière réponse de l'utilisateur                      |
|     `[DURATION]`      | temps en secondes que l'utilisateur a mis entre ses deux dernieres reponses |
|      `[RANDOM]`       |                       rnombre aléatoire entre 0 et 9                        |
|       `[RAND]`        |                       nombre aléatoire entre 0 et 11                        |
|  `[DAY]` or `[JOUR]`  |                             jour de la semaine                              |
| `[MONTH]` or `[MOIS]` |                               mois de l'année                               |
|       `[HOUR]`        |                               heure courrante                               |
|       `[YEAR]`        |                               année courrante                               |

## Conditions

Les conditions permettent de préciser dans quel cas la boîte peut être ouverte

Par exemple :

- Le drapeau 'bonjour' est nécessaire : `[bonjour]>0`
- Le drappeau 'bonjour' et le drapeau 'salut' sont nécessaires : `[bonjour]>0 && [salut]>0`
- S'il est nécessaire d'avoir 3 drapeaux 'bonjour' ou plus : `[bonjour]>=3`
- Si, à l'inverse, il est nécessaire de ne pas avoir le drapeau 'bonjour' : `[bonjour]<1`

## Links

Les liens permettent de continuer la conversation à l'intérieur d'une autre boîte. Autrement dit lorsque la boîte A est ouverte si elle est liée à la boîte B, les recherches suivantes se feront uniquement sur les boîtes contenues par la boîte B

la valeur `return` permet de renvoyer à la boîte supérieure dans l'arborescence

la valeur `home` permet de renvoyer à la base de l'arborescence

## Images

Dans la plupart des thèmes il est possible d'afficher une image lorsqu'une boîte est ouverte. Pour celà entrez simplement l'url d'une image. Ca peut être une image en ligne ou une image sur votre ordinateur

## Sound

### Music

Permet d'entrer l'url d'un son qui sera lancé en boucle lorsque la boîte sera ouverte.

Lorsqu'un son est lancé le son en cours est stoppé. Pour arrêter un son sans en lancer de nouveau tappez `SILENCE`

### Sound

Permet d'entrer l'url d'un son qui sera joué une fois lorsque la boîte sera ouverte

## Tags

Réservé aux personnes désireuses de coder un thème spécifique à leur chatbot en _CSS_. Permet d'entrer une valeur qui sera appliqué à la class de la answer de la boîte et à la class du body de la page
