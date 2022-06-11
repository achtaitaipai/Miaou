# Main concepts# Getting started

---

## Other resources

- [Intro](../README.md)
- [Getting started](./getting-started.md)
- [Complete guide](./complete-guide.md)

---

## Summary

- [General](#general)
- [Navigation](#navigation)
- [Title and colours](#title-and-colours)
- [Trigger](#trigger)
- [Answer](#answer)
  - [Several answers](#several-answers)
  - [Several messages and time](#several-messages-and-time)

---

## General

Miaou is a system of boxes. When the user sends a sentence to the bot, Miaou checks each box until it finds a suitable one. Then it gives this particular box’s answer.

## Navigation

In order to change a box, click on it and change the settings displayed on the right hand side

In order to move a box, you can drag and drop it where needed. The order of the boxes is important: when several boxes are likely to be triggered, it will always be the first one which is triggered.

To create a new box, click on the **+** button next to the boxes or press the n key. To delete a box: select it, then click on the bin button at the bottom of the form or press the **Del** key. Double click on a box to enter it.

The banner above the boxes enables you to know where you are in the tree structure.

## Title and colours

The title and the colour of the boxes have no impact on the bot’s operation. They simply enable you to organise the boxes.

## Trigger

Trigger: Describes what will trigger the box.

When the user sends text, the bot checks each box until it finds one whose trigger is
part of the user’s text.

A box with: `hello` as a trigger will be triggered for `hello`, `so-and-so says hello` and
`blablablahelloblablabla`

The triggers use regular expressions, which means that the following characters:
`[\^$.|?*+(){}` must be preceded by `\` in order to be used normally.

On the other hand, it is possible to use the superpowers of the **_regular expressions_**.

- `.*` designates any sequence of characters. So the trigger: `How .* are` is triggered for `how are you?` and `how are things`.

- `^` indicates that what follows must be at the beginning of the text sent by the user. For instance: `^hello` will be triggered for `hello`, but not for `so-and-so says hello`.

- `$` indicates that what precedes must be at the end of the text sent by the user. For instance: `hello$` will be triggered for `hello`, but not for `hello to you`

It is possible to have several triggers for the same box. They have to be separated by `&`

## Answer

Answer designates what the box will answer when it is triggered.

### several answers

It is possible to write several answers. They have to be separated by `& `

The answer will be selected according to the mode:

- Random: the bot will choose an answer at random
- loop : the bot will choose the first answer, then the second and so on until it returns to the first when all answers have been read
- Sequential: the bot will choose the first answer, then the second etc. and will remain on the last one until all answers have been read

### several messages and time

Each answer can include several messages. To do so, messages need to be separated by `--`

You can specify a waiting time before the bot answers, for instance if you want the bot to wait for three seconds, add `((3))` at the end of the message. If you do not want the bot to answer, write `NOTHING`.
