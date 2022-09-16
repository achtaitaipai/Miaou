# Premiers pas

[Version anglaise](../getting-started.md)

---

## Autres resources

- [Miaou](https://achtaitaipai.github.io/Miaou/)
- [Intro](./LISEZMOI.md)
- [Principes fondamentaux](./principes-fondamentaux.md)
- [Guide Complet](./guide-complet.md)

---

## Sommaire

- [Dire bonjour](#dire-bonjour)
- [Un peu de conversation](#un-peu-de-conversation)
- [Lorsque mon chatbot ne comprend pas...](#lorsque-mon-chatbot-ne-comprend-pas)
- [Rebonjour](#rebonjour)
- [Comment ça va ?](#comment-ça-va)
- [Image](#image)
- [Fin](#fin)

---

Voyons ensemble comment créer un simple chatbot. Pour commencer j'efface tout, en allant dans **file**, puis **new**, je confirme que je veux tout effacer et voilà.

## Dire bonjour

Comme tout chatbot bien éduqué, le notre se doit de dire bonjour. Pour celà, je clique sur le bouton **+** afin de créer une nouvelle boîte. Je sélectionne la boîte en cliquant dessus, puis je modifie ses paramètres à droite de l'écran :

En titre à la place de **_box 0_**, j'écris : `bonjour`

|  property   |      value       |
| :---------: | :--------------: |
| **trigger** |    `bonjour`     |
| **answer**  | `Je vous salue.` |

et enfin j'essaye mon chatbot en cliquant sur **PLAY** et miracle : lorsque je lui dis bonjour, il me répond je vous salue

Tout ça est bien sympathique, mais il y a mille façons de dire bonjour. Mon chatbot aura l'air bien bête s'il ne sait pas répondre à salut par exemple.

Pour résoudre ce problème majeur sans devoir créer une boîte pour chaque façon de dire bonjour, il faut que ma boîte ait plusieurs **trigger**. Je modifie donc mon **trigger** comme suit :

|  property   |                    value                     |
| :---------: | :------------------------------------------: |
| **trigger** | `bonjour & salut & coucou & wesh & hey & hi` |
| **answer**  |               `Je vous salue.`               |

Où chaque `&` permet de séparer mes différents trigger.

## Un peu de conversation

Dire bonjour c'est sympa, mais ça ne suffit pas à faire une conversation. J'ajoute donc quelques boîtes à ce chatbot. Seulement chemin faisant, j'ai rencontré un nouveau problème (zut alors...).

Je voudrai que mon chatbot (que j'ai décidé d'appeler Gérard) soit capable de dire son nom lorsqu'on lui demande. Seulement là encore il y a bien des façons de demander à quelqu'un comment il s'appelle et pour chacune on peut ponctuer différement et faire différentes fautes.

Heureusement, il est possible d'utiliser les **_expressions régulières_** dans les **trigger**.
Je peux par exemple écrire `.*` pour désigner n'importe quelle suite de caractères.

Fort de ce savoir, je configure ma nouvelle boîte :

|  property   |                         value                          |
| :---------: | :----------------------------------------------------: |
| **trigger** | `qui.*tu & co.*ent.*ap.*le & quel.*nom & quel.*pr.*om` |
| **answer**  |                 `Mon nom est Gérald.`                  |

**Attention dans un cas comme celui-ci il est tentant d'utiliser le caractère : `?`. Néanmoins comme les caractères : `[\^$.|?*+(){}` sont utilisés dans les expressions régulières, ils doivent être précédés d'un antislash : `\` pour être utilisés 'normalement'.**

## Lorsque mon chatbot ne comprend pas...

Cher Journal, me voilà face à un nouveau problème. Je viens de réaliser que malgrès tout mes efforts et toutes les boîtes que j'ai créées, il arrive que les utilisateurs écrivent des choses que je n'avais pas prévu... En quel cas Gérard répond par un horrible : miaou n'a pas trouvé de boite qui corresponde à la requête. Que faire ?

Ouf... Il y a une solution je vais créé la boîte suivante :

|  property   |         value         |
| :---------: | :-------------------: |
| **trigger** |         `.*`          |
| **answer**  | `Je n'ai pas compris` |

Comme vu dans l'épisode précédent : `.*` désigne tout et n'importe quoi, de fait ma boîte se déclenchera toujours.

Pour éviter qu'elle ne se déclenche à la place des autres boîtes que j'ai créé, je la mets en dernière position par un habile drag n drop.

## Rebonjour

Tout ces problèmes et toutes ces solutions m'ont rendu plus exigent : je voudrai que lorsqu'on dit bonjour (ou salut ou coucou...) pour la deuxième foix, Gérard réponde par un culpabilisant rebonjour.

Je modifie donc ma première boîte bonjour :

|  property   |                    value                     |
| :---------: | :------------------------------------------: |
| **trigger** | `bonjour & salut & coucou & wesh & hey & hi` |
| **answer**  |         `je vous salue. & rebonjour`         |
|  **mode**   |                     `↳`                      |

De fait la boîte n'a plus une mais deux **answer**, le **mode** : `↳` précise que Gérard doit d'abord répondre par la première réponse, puis la suivante, jusqu'à ce qu'il arrive à la dernière qu'il utilisera toujours.

## Comment ça va ?

Je voudrais que lorsqu'on demande à Gérard comment il va, il réponde à merveille et vous-même ? puis réagisse selon la réponse.

Pour la première partie pas de souci je crée la boîte :

|  property   |            value             |
| :---------: | :--------------------------: |
| **trigger** |          `com.*va`           |
| **answer**  | `à merveille et vous-même ?` |

Mais pour la seconde partie je suis embêté... Si je crée une boîte avec comme **trigger** : bien, elle risque de se déclencher dans un autre contexte.

La solution c'est l'imbrication de dialogues. Je m'explique : si je double clique sur ma boîte comment ça va j'accède à son contenu (pour l'instant rien). Je peux alors créer deux boîtes :

|  property   |          value          |
| :---------: | :---------------------: |
| **trigger** |         `bien`          |
| **answer**  | `Vous m'en voyez ravi.` |

|  property   |        value         |
| :---------: | :------------------: |
| **trigger** |     `pas.*bien`      |
| **answer**  | `J'en suis navré...` |

Ces deux boîtes ne s'activeront qu'une fois que leur boîte 'mère' a été activée. N'est-ce pas merveilleux ?

Seulement un problème persiste. Une fois que l'utilisateur a activé la boîte comment ça va. Il est impossible d'activer d'autres boîtes que bien et pas bien. Il faut pour celà ressortir de la boîte.

Le paramètre dont on a besoin est : **links**, qui permet de sortir d'une boîte pour aller ailleurs. Pour pouvoir le modifier il faut cocher **links** dans le menu **tools**. Dans notre cas on souhaite revenir à la base de notre arborescence. On peut donc paramêtrer les deux boites que l'on vient de créer avec **links** : `home` ou `return`. home renvoit à la base de l'arborescence et retour renvoit à la boîte supérieur, dans notre cas c'est la même chose. ça nous donne :

|  property   |         value          |
| :---------: | :--------------------: |
| **trigger** |         `bien`         |
| **answer**  | `Vous m'en voyez ravi` |
|  **links**  |        `return`        |

|  property   |        value         |
| :---------: | :------------------: |
| **trigger** |     `pas.*bien`      |
| **answer**  | `J'en suis navré...` |
|  **links**  |        `home`        |

## Image

Gérard a un poisson dont-il est un peu gaga, je voudrai que lorsqu'on lui parle de poisson il envoie une photo du sien.

Pour se faire j'ai besoin du paramètre **image**, je l'active donc via le menu **tools**. On me demdande l'url de mon image. Je la renseigne et voilà ma photo s'affichera.

Les images ne se lancent pas dans la fenêtre **PLAY**. Il faut attendre d'avoir exporter son bot pour les voir.

## Fin

Voilà mon bot est super, maintenant je veux l'enregistrer !

Pour celà je peux directement aller dans **file** puis **download** et une page html contenant mon bot se télécharge. Si j'ai fait des erreur ou que je veux apporter des modifications je peux réouvrir mon chatbot en passant par **file**, **open**.

Mini-précision : en bas à gauche des boîtes se trouvent deux boutons. Le premier permet d'accéder au menu apparence dans lequel il est possible de coder l'aspect de son chatbot. Si le code CSS n'est pas votre truc vous pouvez simplement choisir parmis les thèmes mis à disposition. Le second bouton permet de régler les paramètres généraux du chatbot tel que son nom, le temps qu'il met à répondre...
