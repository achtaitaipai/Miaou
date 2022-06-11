# Getting started

---

## Other resources

- [Intro](../README.md)
- [Main concepts](./main-concepts.md)
- [Complete guide](./complete-guide.md)

---

## Summary

- [Saying hello](#saying-hello)
- [Small talk](#small-talk)
- [When my chatbot does not understand](#when-my-chatbot-does-not-understand)
- [Hello again](#hello-again)
- [How are you?](#how-are-you)
- [Image](#image)
- [Ending](#ending)

---

Let’s see together how to create a simple chatbot. To start with, I
delete everything by going to **file**, then **new**, I simply confirm that I
want to delete.

## Saying hello

Like all polite chatbots, ours must say hello. In order to do so, I click on the + button in order to create a new box. I click on the box to select it and I modify its settings on the right hand side of the screen:

As a title, instead of **_box 0_**,I write: `hello`

|  property   |      value      |
| :---------: | :-------------: |
| **trigger** |     `hello`     |
| **answer**  | `I salute you.` |

And finally, I click on **PLAY** to try my chatbot and… hey presto: when I say hello, it answers I salute you.

That is all jolly well, but there are thousands of ways of saying hello. My chatbot will appear really silly if he can only reply to hi, for instance.

In order to solve this major problem without having to create a box
for each of the different ways of saying hello, my box needs several
**triggers**. This is how to change my trigger:

|  property   |                       value                        |
| :---------: | :------------------------------------------------: |
| **trigger** | `hello & hi & hey up & bonjour & salut & good day` |
| **answer**  |                  `I salute you.`                   |

Where each `&` enables me to separate my different triggers.

## Small talk

Saying hello, that’s all very well, but it is not enough to hold a conversation. So I add a few boxes to this chatbot. But as I do so, I come across a new problem (oh dear!...)

I would like my chatbot (which I have named Gerald) to be able to say his name when asked. But again, there are many ways of asking someone what their name is, and each can be punctuated differently and contain different mistakes.

Fortunately, it is possible to use the **_regular expressions_** in the
**triggers**.

For instance, I can write `.*` to designate any sequence of characters.

Armed with this knowledge, I can configure my new box:

|  property   |                           value                           |
| :---------: | :-------------------------------------------------------: |
| **trigger** | `who.*you & ho.*w.*cal.*led & what.*name & what.*fir.*am` |
| **answer**  |                   `My name is Gerald.`                    |

**Careful : in such a case, it is tempting to use the `?` character. However, as `[\^$.|?*+(){}` characters are used in regular expressions, they must be preceded by a backslash `\` in order to use them &#39;normally&#39;.**

## When my chatbot does not understand...

Dear Diary, here I am again, with another problem. I have just realised that in spite of all my efforts and of all the boxes I have created, sometimes users write things I had not anticipated… When it is the case, Gerald replies with a horrible: miaou did not find a box which matches the request. What to do?

Phew... There is a solution. I am going to create the following box:

|  property   |         value          |
| :---------: | :--------------------: |
| **trigger** |          `.*`          |
| **answer**  | `I did not understand` |

As explained previously, `.*` indicates all and everything, so my box will always be triggered.

To avoid triggering it rather than the other boxes I created, I place it last, thanks to a clever drag and drop.

## Hello again

All those problems and all those solutions have made me more demanding: when someone says hello (or hi or hey…) for the second time, I would like Gerald to answer by a guilt-tripping Hello again.

So, I am changing my first hello box:

|  property   |                       value                        |
| :---------: | :------------------------------------------------: |
| **trigger** | `hello & hi & hey up & bonjour & salut & good day` |
| **answer**  |           `I salute you. & hello again`            |
|  **mode**   |                        `↳`                         |

This way, the box no longer has one but two **answers**, the **mode**: `↳`. specifies that Gerald must first answer with the first answer, then the next one, until he gets to the last one which he will always use.

## How are you?

When Gerald is asked how he is, I would like him to answer wonderfully well and you? and that he then reacts according to the answer.

For the first part, no worries, I can create the box:

|  property   |            value            |
| :---------: | :-------------------------: |
| **trigger** |         `how.*you`          |
| **answer**  | `Wonderfully well and you?` |

But for the second part, I have a problem… If I create a box with well as a **trigger**, it is likely to be triggered in a different context.

The solution consists in interlocking dialogues. Let me explain: if I double click on my how are you box, I get to its contents (nothing for now). I can then create two boxes:

|  property   |            value             |
| :---------: | :--------------------------: |
| **trigger** |            `well`            |
| **answer**  | `I am delighted to hear it.` |

|  property   |           value            |
| :---------: | :------------------------: |
| **trigger** |        `not.*well`         |
| **answer**  | `I am sorry to hear it...` |

Those two boxes will only be activated once their ‘parent’ box has been activated. Isn’t it just wonderful?

But one problem remains. Once the user has activated the how are you box, it is impossible to activate boxes other than well and not well. So, you need to a method to exit the box.

The necessary setting is **links**, which enables you to exit a box to go somewhere else. In order to change it, you must tick **links** in the **tools** menu. In our case, we want to return to the bottom of our tree structure. You can therefore configure the two boxes we have just created with **links**: home or return. home sends you back to the bottom of the tree structure and return sends you back one box above. In our case, it is the same thing and we get:

|  property   |            value            |
| :---------: | :-------------------------: |
| **trigger** |           `well`            |
| **answer**  | `I am delighted to hear it` |
|  **links**  |          `return`           |

|  property   |           value            |
| :---------: | :------------------------: |
| **trigger** |        `not.*well`         |
| **answer**  | `I am sorry to hear it...` |
|  **links**  |          `return`          |

## Image

Gerald has a fish and he is slightly gaga with it. I would like him to send a photo of his fish when we talk to him about fish.

To do so, I need the image setting, which I activate via the tools menu. I am invited to give the URL of my image. I type it and my photo is displayed.

The images are not activated in the **PLAY** window. The bot must have been exported in order to see them.

## Ending

Here you are, my bot is great and now I want to register it!

To do so, I can go directly in **file** then **download** and an html page including my bot is downloaded. If I make a mistake or if I want to make changes, I can reopen my chatbot via **file**, **open**.

Tiny detail: there are two buttons at the bottom left hand side of the boxes. The first one allows you to access the layout menu, in which you can code the look of the chatbot. If CSS code is not your thing, you can simply choose amongst the available themes. The second button allows you to configure the general settings of the chatbot such as its name, the time it takes to answer…
