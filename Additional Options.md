> 👉 **This page details advanced configuration settings available in the GnollHack options file, explaining their functionality, syntax, and compatibility with the modern graphical client.**

For instructions on how to locate and modify the options file, see [[Accessing Options File]]. For general options, see [[Options]].

## ⚙️ Fully-Supported in Modern Versions

These settings are parsed by the C game engine and are fully operational in the .NET MAUI graphical client, affecting game logic, menus, message logs, and controls.

### 🎨 MENUCOLOR

The `MENUCOLOR` configuration allows you to colorize specific lines in menus and inventory screens based on regular expression matches. The C core evaluates these rules and passes the color attributes to the graphical interface, which renders the styled text.

**Syntax:**

```
MENUCOLOR="regular expression" = color
MENUCOLOR="regular expression" = color&attribute
```

> 💡 **Example — Highlight blessed items in green:**
> 
> `MENUCOLOR=" blessed " = green`

> 💡 **Example — Highlight cursed items in red:**
> 
> `MENUCOLOR=" cursed " = red`

> 💡 **Example — Highlight worn cursed items in orange and underline them:**
> 
> `MENUCOLOR=" cursed .* (being worn)" = orange&underline`

> 💡 **Example — Mark spells that cannot be recalled in gray (black):**
> 
> `MENUCOLOR="(You cannot recall this spell)" = black`

### 📊 HILITE_STATUS

The `HILITE_STATUS` configuration defines color highlights for stats displayed in the status window or bar (such as hit points, mana, hunger status, and attributes). Highlighting thresholds can be based on percentages, values, or text states.

**Syntax:**

```
HILITE_STATUS=field/value/color
HILITE_STATUS=field/value/color&attribute
```

> 💡 **Example — HP bar highlighting based on percentage ranges:**
> 
> ```
> HILITE_STATUS=hitpoints/100%/gray&normal
> HILITE_STATUS=hitpoints/<100%/green&normal
> HILITE_STATUS=hitpoints/<66%/yellow&normal
> HILITE_STATUS=hitpoints/<50%/orange&normal
> HILITE_STATUS=hitpoints/<33%/red&bold
> HILITE_STATUS=hitpoints/<15%/red&inverse
> ```

> 💡 **Example — Hunger status warnings:**
> 
> `HILITE_STATUS=hunger/satiated/yellow/hungry/orange/weak/red&bold/fainting/red&inverse`

> 💡 **Example — Attribute improvements or penalties:**
> 
> `HILITE_STATUS=characteristics/up/green/down/red`

### 💬 MSGTYPE

The `MSGTYPE` configuration lets you manage how specific messages in the game message log are handled, using regular expression matching. You can choose to show, hide, stop (prompt with a `--More--` page block), or suppress repeats for matching messages.

**Syntax:**

```
MSGTYPE=action "regular expression"
```

The supported actions are:
- `show`: Display the message normally.
- `hide` (or `noshow`): Do not show the message at all.
- `stop` (or `more`): Force the player to press `--More--` or tap to acknowledge the message.
- `norep`: Suppress the message if it is an exact repeat of the previous message.

> 💡 **Example — Force a pause when a monster is nearby:**
> 
> `MSGTYPE=stop "You see here a .*"`

> 💡 **Example — Suppress repetitive spam messages:**
> 
> `MSGTYPE=norep "You swap places with your pet."`

> 💡 **Example — Hide trivial environment messages:**
> 
> `MSGTYPE=hide "You hear a faint sloshing sound."`

### 🎒 AUTOPICKUP_EXCEPTION

The `AUTOPICKUP_EXCEPTION` configuration defines custom inclusion and exclusion rules for picking up items automatically. These exceptions are processed by the C core and override the generic `pickup_types` settings.

**Syntax:**

```
AUTOPICKUP_EXCEPTION="<pattern>"   # Automatically picks up items matching the pattern
AUTOPICKUP_EXCEPTION="!<pattern>"  # Excludes items matching the pattern from autopickup
```

> 💡 **Example — Always pick up gold pieces (even if other coins are ignored):**
> 
> `AUTOPICKUP_EXCEPTION="gold piece"`

> 💡 **Example — Always pick up potions of extra healing:**
> 
> `AUTOPICKUP_EXCEPTION="potion of extra healing"`

> 💡 **Example — Never pick up heavy boulders or loadstones:**
> 
> ```
> AUTOPICKUP_EXCEPTION="!loadstone"
> AUTOPICKUP_EXCEPTION="!boulder"
> ```

### ⌨️ BINDINGS

The `BINDINGS` configuration allows hardware keyboard users to remap key presses to standard game commands or menu shortcuts. This is particularly useful when playing on desktop platforms (Windows) or using a physical keyboard connected to a mobile device.

**Syntax:**

```
BINDINGS=key:command
```

> 💡 **Example — Map the `x` key to the drop (`d`) command:**
> 
> `BINDINGS=x:d`

> 💡 **Example — Map the `v` key to the look (`:`) command:**
> 
> `BINDINGS=v:look`

## 🖥️ Only Supported in ASCII Mode in Modern Version

The modern graphical client renders map items as tiles (sprites) by default, ignoring custom characters. However, these settings are fully utilized when the game is switched to **ASCII mode** (`GHGraphicsStyle.ASCII`) via the in-game settings. They are also used in targeting overlays (e.g. `playerMark` or `monsterTargeting`).

### 🧱 SYMBOLS

The `SYMBOLS` configuration allows you to redefine individual symbols used to represent walls, floors, corridors, and other map terrain when displaying the map in text mode.

**Syntax:**

```
SYMBOLS=S_symbolname:character
```

You can choose symbol sets like `IBMGraphics_2` or `DECgraphics` in your main `OPTIONS` line:
`OPTIONS=symset:IBMGraphics_2`

> 💡 **Example — Change vertical wall display to a custom vertical bar character:**
> 
> `SYMBOLS=S_vwall:|`

> 💡 **Example — Change floor representation to a dot:**
> 
> `SYMBOLS=S_room:.`

### 🪨 BOULDER

The `BOULDER` configuration sets the character symbol specifically representing boulders on the map in ASCII graphics mode.

**Syntax:**

```
BOULDER=character
```

> 💡 **Example — Set the boulder symbol to a capital `O`:**
> 
> `BOULDER=O`

> 💡 **Example — Set the boulder symbol to a percent sign:**
> 
> `BOULDER=%`
