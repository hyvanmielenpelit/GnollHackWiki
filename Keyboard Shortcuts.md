## Commands Bound to Letters

- Commands in *italic* are new commands in GnollHack that do not appear in NetHack.

| Key | Key Command | Shift + Key | Shift + Key Command | Alt + Key | Alt + Key Command | Ctrl + Key | Ctrl + Key Command |
| :-: | :------ | :-: | :---------- | :-: | :--------- | :-: | :-------- |
| a | Apply | *A* | *Abilities (status screen)* | Alt-a | Adjust | Ctrl-a | Repeat |
| *b* | *Take items out of **b**ag in inventory* | *B* | *Put items into **B**ag in inventory* | Alt-b |  | *Ctrl-b* | *Break* |
| c | Close door | C | Chat | Alt-c | Commands menu | Ctrl-c |  |
| d | Drop | D | Drop multiple | Alt-d | Dip | Ctrl-d | Kick |
| e | Eat | E | Engrave | Alt-e | Wipe face | Ctrl-e | Detect _(wizard mode only)_ |
| f | Fire | F | Fight | Alt-f | Force lock | Ctrl-f | Reveal map _(wizard mode only)_ |
| g | Go mode — Rush | G | Go mode — Run | Alt-g | Genocided monsters | Ctrl-g | Create monster _(wizard mode only)_ |
| h | Help | H |  | Alt-h | Handedness | Ctrl-h |  |
| i | Inventory | I | Inventory of specific types | Alt-i | Invoke | Ctrl-i | Identify _(wizard mode only)_ |
| j | Jump | J |  | Alt-j | Jump | Ctrl-j |  |
| k | Kick | K |  | *Alt-k* | *Vanquished creatures* | Ctrl-k |  |
| l | Loot | L | Look | Alt-l | Loot | *Ctrl-l* | *Light/Snuff out* |
| m | Move mode — Rush | M | Move mode — Run | Alt-m | Use monster ability | Ctrl-m |  |
| n | Number of actions<sup>1</sup> | N | Name | Alt-n | Name | Ctrl-n | Annotate dungeon level |
| o | Open door | O | Options | Alt-o | Offer sacrifice | Ctrl-o | Dungeon overview |
| p | Pay bill | P | Put on | Alt-p | Pray | Ctrl-p |  |
| q | Drink (quaff) | Q | Quiver | Alt-q | Quit | Ctrl-q |  |
| r | Read | R | Remove | Alt-r | Rub | Ctrl-r | Redraw screen |
| s | Search | S | Skills | Alt-s | Save | Ctrl-s | Sit |
| t | Throw | T | Take off | Alt-t | Take off many | Ctrl-t | Teleport |
| u | Untrap | U |  | Alt-u | Untrap | Ctrl-u |  |
| v | Version info | V | Game history info | Alt-v | GnollHack library info | Ctrl-v | Level teleport _(wizard mode only)_ |
| w | Wield weapon | W | Wear armor | Alt-w | | Ctrl-w | Wish _(wizard mode only)_ |
| x | Swap weapons | *X* | *Mix spells* | *Alt-x* | *Examine* | *Ctrl-x* | *Dual weapon mode* |
| *y* | *Take loot out of container on floor (**y**ank)* | *Y* | *Put loot into container on floor (**Y**ank)* | Alt-y |  | *Ctrl-y* | *Yell for pets* |
| z | Zap wand | Z | Cast spell | *Alt-z* | *View spell* | Ctrl-z |  |

- <sup>1</sup> Number of actions works like this: You first press `n`, then write the number of actions in numerals, and then choose the action. For example, `n20s` searches 20 times.


## Other Commands

- Commands in *italic* are new commands in GnollHack that do not appear in NetHack.

| Key | Key Command |
| :-: | :---------- |
| , | Pick up |
| *;* | *Pick up and stash* |
| . | Wait |
| : | Near look (at the ground) |
| _ | Travel |
| < | Go up |
| > | Go down |
| / | Far look |
| _*_ | *Equipment (worn items)* |
| " | Show worn amulet |
| # | Extended command |
| ? | Help |
| + | Spell menu |
| ( | List tools |
| ) | Show weapon |
| = | Show worn rings |

## Movement By Arrow Keys

| Key | Direction | Ctrl + Key | Direction | Alt + Key | Direction |
| :-: | :-------: | :--------: | :-------: | :-------: | :-------: |
| ↑ | `↑` | Ctrl + ↑ | `↖` | Alt + ↑ | `↗` |
| ↓ | `↓` | Ctrl + ↓ | `↙` | Alt + ↓ | `↘` |
| ← | `←` | Ctrl + ← | `↖` | Alt + ← | `↙` |
| → | `→` | Ctrl + → | `↗` | Alt + → | `↘` |

## Movement by Number Pad

While **Num Lock** is **on**, you can use the number pad for movement. 

- 1–4, 6–9 for directions.
- 5 in the middle enables run mode.

## Vi-Keys

You can activate vi-keys in one of the following ways:

- In [[settings]], **enable** **Default Vi-Keys** and ensure that **number_pad** is not set in [[options]].
- In [[settings]], keep **Default Vi-Keys** **disabled** and set **number_pad:0** in [[options]].

When you have vi-keys enabled, you can use the following keys for movement:

<table>
<tbody>
<tr><td><code>y</code></td><td><code>k</code></td><td><code>u</code></td></tr>
<tr><td><code>h</code></td><td>&nbsp;</td><td><code>l</code></td></tr>
<tr><td><code>b</code></td><td><code>j</code></td><td><code>n</code></td></tr>
</tbody>
</table>

### Alternate Key Bindings When Vi-Keys Are Enabled

| Normal Key | Command | Alternate Key |
| :--------: | :------ | :-----------: |
| b | Take items out of **b**ag in inventory | Alt-F |
| B | Put items into **B**ag in inventory | Alt-E |
| Ctrl-b | Break | Alt-B |
| j | Jump | Alt-j |
| k | Kick | Ctrl-d |
| `l` | Loot | Alt-`l` |
| Ctrl-`l` | Light | Alt-`I` |
| n | Number of actions | *Automatic*<sup>1</sup>  |
| u | Untrap | Alt-u |
| y | Take loot out of container on floor (**y**ank) | Alt-D |
| Y | Put loot into container on floor (**Y**ank) | Alt-C |

- <sup>1</sup> When you press a number key, the game automatically assumes that it's the number of actions command.
