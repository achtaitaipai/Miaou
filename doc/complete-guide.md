# Complete guide

---

## Other resources

- [Intro](../README.md)
- [Getting started](./getting-started.md)
- [Main concepts](./main-concepts.md)

---

## Summary

- [Title and colours](#title-and-colours)
- [Trigger](#trigger)
- [Answer](#answer)
  - [Several answers](#several-answers)
  - [Several messages and time](#several-messages-and-time)
  - [Embedding](#embedding)
- [Variables](#variables)
  - [Flag](#flag)
  - [String](#string)
  - [Operation](#operation)
  - [Pre-defined variables](#pre-defined-variables)
- [Conditions](#conditions)
- [Links](#links)
- [Images](#images)
- [Sound](#sound)
- [Tags](#tags)

---

## Title and colours

The title and the colour of the boxes have no impact on the bot’s operation, they simply facilitate the organisation of the boxes.

## Trigger

Trigger: Describes what will trigger the box.

When the user sends text, the bot checks each box until it finds one whose trigger is part of the user’s text.

A box with: `hello` as a trigger will be triggered for`hello`, `so-and-so says hello` and
`blablablahelloblablabla`

The triggers use regular expressions, which means that the following characters:`[\^$.|?\\*+(){}` must be preceded by `\` in order to be used normally.On the other hand, it is possible to use the superpowers of the regular expressions.

- `.*` designates any sequence of characters. So the trigger: `How .* are` is triggered for `how are you?` and `how are things`.

- `^` indicates that what follows must be at the beginning of the text sent by the user. For instance: `^hello` will be triggered for `hello`, but not for `so-and-so says hello`.

- `$` indicates that what precedes must be at the end of the text sent by the user. For instance: `hello$` will be triggered for `hello`, but not for `hello to you`

## Answer

Answer designates what the box will answer when it is triggered.

### Several answers

It is possible to write several answers. They have to be separated by `& `

The answer will be selected according to the mode:

- Random: the bot will choose an answer at random
- loop : the bot will choose the first answer, then the second and so on until it returns to the first when all answers have been read
- Sequential: the bot will choose the first answer, then the second etc. and will remain on the last one until all answers have been read

### Several messages and time

Each answer can include several messages. To do so, messages need to be separated by `--`

You can specify a waiting time before the bot answers, for instance if you want the bot to wait for three seconds, add `((3))` at the end of the message. If you do not want the bot to answer, write `NOTHING`.

### Embedding

It is possible to create boxes within boxes.

When a box containing other boxes is triggered, its content will be used for the rest of the conversation.

Thus, the next replies of the user can only trigger the boxes within.

## Variables

The variables enable values to be stored so that the bot evolves alongside the conversation. They can be called up in the Answer, and will for instance have to be written between `[` and `]`, such as `[hello]`

### Flag

Flags are variables which initially are all equal to 0 When you name a flag in a box, it increases by 1 each time the box is opened.

They enable you to know if a box has already been opened.

### String

Strings make it possible to store a user’s answer.

You can for instance create a box which asks for the user’s first name and store the answer in the first name string. Subsequent boxes will be able to use this variable in their answer. For instance `hello [first name]`

### Operation

The operations make it possible to freely modify the variables. For example, if you want the lives variable to be 5, write: `[lives]=5`

To remove 2 lives, write:`[lives]=[lives]-2`
To ensure the mood variable equals the contents, write: `[mood]='contents'`

### Pre-defined variables

There are several variables which do not need to be defined

|       variable        |                       description                       |
| :-------------------: | :-----------------------------------------------------: |
|       `[LAST]`        |                   user's last answer                    |
|     `[DURATION]`      | interval in seconds between the user’s last two answers |
|      `[RANDOM]`       |              random number between 0 and 9              |
|       `[RAND]`        |             random number between 0 and 11              |
|  `[DAY]` or `[JOUR]`  |                     day of the week                     |
| `[MONTH]` or `[MOIS]` |                    month of the year                    |
|       `[HOUR]`        |                      current hour                       |
|       `[YEAR]`        |                      current year                       |

## Conditions

The conditions allow you to specify in which cases the box can be opened

For example:

- The 'hello' flag is necessary: `[hello]>0`
- The 'hello' flag and the 'hi' flag are necessary: `[hello]>0 && [hi]>0`
- If it is necessary to have at least 3 'hello' flags: `[hello]>=3`
- If, on the contrary, it is necessary not to have the 'hello' flag: `[hello]<1`

## Links

Links make it possible to continue the conversation inside another box. In other words, when the A box is open, if it is linked to the B box, the following searches will only be made on the boxes contained by the B box. The `return` value allows you to return to the box above in the tree structure

The `home` value allows you to return to the bottom of the tree structure

## Images

In most themes, it is possible to display an image when a box is open. To do so, simply enter the URL of an image. It can be an online image or an image stored on your computer

## Sound

### Music

Enables you to enter the URL of a sound which will be played in a loop when the box is opened. When a sound is played, the current sound is interrupted. To interrupt a sound without playing a new one, type `SILENCE`

### Sound

Enables you to enter the URL of a sound which will be played once the box is opened.

## Tags

Exclusive to people wanting to code a theme specific to their chatbot in _CSS_ Enables them to enter a value which will be applied to the answer’s class of the box and to the body class of the page
