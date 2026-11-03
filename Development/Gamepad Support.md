> 👉 **This page describes how game controller support works in GnollHack, which platforms and controllers it covers, and what it does not cover yet. It reflects the state of the code on November 1, 2026 (version 3.35).**

## ℹ️ Overview

GnollHack can be played from start to finish with a game controller on the **Steam Deck**, which is the primary target. The same controls also work with an **Xbox controller** on **Windows** and with a controller on **desktop Linux**. **Android** and **iOS** have no controller support yet.

Controller support is built into the shared C# frontend, so all platforms use the same controls, radial menus and on-screen hints. Each platform only adds a small backend that reads the controller. The game never takes input away from the other devices: the first controller press switches the game into controller mode, and touch, the mouse or a key switches it back.

> ℹ️ **Note:** Windows and desktop Linux support was added on November 1, 2026. Steam Deck support came first.

The full reference for every button, setting and environment variable is `DEVEL/gamepad_controls.md` in the GnollHack repository.

## 🖥️ Platform Coverage

| Platform | Build | Reads the controller through | Back grips | On-screen keyboard |
|:---------|:------|:-----------------------------|:-----------|:-------------------|
| **Steam Deck** | Avalonia Linux, started from Steam | Steam Input's virtual pad, through evdev | ✅ With the right layout | ✅ Steam's keyboard, in Gaming Mode |
| **Desktop Linux** | Avalonia Linux | evdev: physical pads, and Steam's virtual pads when started from Steam | ❌<sup>1</sup> | ❌<sup>2</sup> |
| **Windows** | WinUI 3 | XInput | ❌ | ❌ |
| **Windows (development)** | Avalonia Windows, not released | XInput | ❌<sup>1</sup> | ❌ |
| **Android** | .NET MAUI | ❌ Not supported | | |
| **iOS, and iOS on macOS** | .NET MAUI | ❌ Not supported | | |

- <sup>1</sup> With `GNOLLHACK_GAMEPAD_KEYS=on`, the keys F2-F5 act as the grips on any Avalonia build. This is meant for testing.
- <sup>2</sup> With `GNOLLHACK_STEAM_KEYBOARD=on`, Steam's keyboard is allowed in any Linux session.

Only the Steam Deck is recognized as such, by its Valve model name. Another device running SteamOS counts as desktop Linux: it reads the virtual pad, but by default gets neither Steam's keyboard nor the grips.

On a Steam Deck, the controls only work when the game is started from Steam. Gaming Mode is the real target. In Desktop Mode, Steam's keyboard does not open by itself (Steam + X opens it by hand), and a game started from a terminal does not read the controller at all.

## 🎮 Supported Controllers

| Controller | Steam Deck | Desktop Linux | Windows |
|:-----------|:-----------|:--------------|:--------|
| **Steam Deck's own controls** | ✅ Through Steam Input | | |
| **Xbox and XInput-compatible** | Through Steam Input | ✅ Tested | ✅ Tested |
| **PlayStation** | Through Steam Input | Should work, not tested | Only if Steam presents it as an XInput pad, not tested |
| **Nintendo** | Through Steam Input | Should work, not tested | Only if Steam presents it as an XInput pad, not tested |
| **Other gamepads** | Through Steam Input | Should work when the device reports standard gamepad controls, not tested | Only XInput devices |

On Linux, a device counts as a gamepad when it has a south face button and left stick axes. Motion sensor devices are skipped, and Valve's own physical controllers are never read directly. Sony controllers have their X and Y buttons swapped to the positions the game expects.

The buttons are positional, not printed labels: A is the south button, B the east, X the west and Y the north. The on-screen hints draw the labels of the controller in use, such as Cross and Circle on PlayStation or B and A on Nintendo. A Nintendo controller read directly on desktop Linux has not been tested, and its X and Y may come out reversed. Button names on this page follow the Steam Deck; on an Xbox controller L1/R1 are LB/RB, L2/R2 are LT/RT, View is Back and Menu is Start.

Several controllers can be connected at once, but they do not play separately. The last one with a button press or a clear stick or trigger push becomes the active one. Stick drift does not count.

## 🕹️ What Is Covered

### 🗺️ On the Map

L1 and R1 are hold modifiers, and neither does anything on its own. L1 changes the right-side controls and R1 the left-side controls. A hint strip always shows the current layer.

| Control | Alone | L1 held | R1 held |
|:--------|:------|:--------|:--------|
| **A** | Context command, or the Actions radial when there are several | Commands radial | |
| **B** | Closes an overlay if one is open, else interrupts an occupation, else Search (`s`) | Search 20 times | |
| **X** | Pick Up (`,`) | Pick Up and Stash (`;`) | |
| **Y** | Repeat (`Ctrl+a`) | Wait (`.`) | |
| **L1 + R1 + Y** | Rest | | |
| **R2** | Assigned action, by default Fire (`f`) | Right Quick radial | Set R2 radial |
| **L2** | Assigned action, by default Kick (`k`) | Set L2 radial | Left Quick radial |
| **Menu** | Game menu | Abilities (`Shift+a`) | |
| **View** | Inventory (`i`) | | Equipment (`*`) |
| **D-pad** | Walk one step, repeating while held | | Zoom, minimap |
| **Left stick** | Walk in 8 directions | | Run |
| **Right stick** | Pan the map | | |
| **L3** | Run: the next direction runs, as the `Shift+g` prefix does; L3 again or B cancels | | Center the map on the hero |
| **R3** | Toggles radial | | |
| **L4, L5, R4, R5** | Configurable; by default Apply (`a`), Cast (`Shift+z`), Cast Quick and Zap Quick | | |

### ⚙️ Radial Menus and Quick Actions

Radial menus stay open until an item is chosen or they are closed, except for the direction radial below. Either stick selects, or the D-pad steps. A activates, B closes and L1/R1 change the page.

- **Actions radial**: the current context commands with Skills, Polearm and Wield Last or Unwield, followed by the commands of the commands page, eight per page. This is how commands without a button of their own are reached, including the Extended Command. On the map it has all of them except Back to Game, the count pad and, outside wizard mode, the wizard commands. In position and direction prompts, L3 opens it without the commands.
- **Toggles radial**: More Messages, Status Screen, Auto-Center, Look Mode, Auto-Dig, Ignore Stopping, Max Hit Points and Max Mana.
- **Trigger quick actions**: L2 and R2 each have eight quick actions, set in Settings. The Set radial, or the R2 Action and L2 Action settings, pick which one the trigger runs when pressed alone, and the Quick radial runs one at once.
- **Direction radial**: when a trigger's action asks for a direction while the trigger is still held, a violet, see-through radial opens. Select with a stick and release the trigger or press A to confirm; releasing with nothing selected cancels the command. D-pad Up answers up (`<`), D-pad Down answers down (`>`) and Y answers self. A stick already pushed when the radial opens counts at once. Actions with a menu first, such as Throw, ask for the direction with the ordinary prompt.

| Trigger | Quick actions by default |
|:--------|:-------------------------|
| **R2** | Fire (`f`), Swap (`x`), Chat (`Shift+c`), Throw (`t`), Cast (`Shift+z`), Cast Quick, Zap (`z`), Zap Quick |
| **L2** | Kick (`k`), Drop Items, Pray (`Alt+p`), Yell (`Alt+y`), Engrave (`Shift+e`), 2-Weapon, Pick-axe (`Alt+Shift+x`), Polearm (`Alt+Shift+p`) |

### 💬 In-Game Prompts

All of these are covered, and show their controls in a hint strip:

- **Menus**: a gold focus selector, with row counts and row actions on a long A press, and X as OK. In an inventory menu, Menu flips between the item list and the equipment view.
- **Yes/no prompts, message boxes, text windows, the count dialog and the tips**.
- **Choosing a position**: the left stick moves the cursor, and the shoulder buttons and triggers jump between interesting spots and monsters.
- **Choosing a direction**: a D-pad press picks it at once, or aim with the left stick and confirm with A. A prompt raised by a held trigger opens the direction radial instead.
- **Text prompts**, such as wishing or naming, as far as text can be entered; see [[Text Entry|#text-entry]].
- **More Messages and the Status Screen**, which scroll while the left stick still walks.
- **Replays**: A pauses, L1/R1 and L2/R2 change the speed, D-pad Right steps forward, Y opens Go to Turn and B quits.

### 📄 Pages Outside the Map

| Page | Coverage |
|:-----|:---------|
| **Main menu** | ✅ Focus over the buttons and the mode switches, with shortcut buttons |
| **Game menu** | ✅ Focus navigation |
| **Settings** | ✅ Every row: switches, pickers, sliders and text fields, with L1/R1 jumping between sections |
| **About, Reset, Import/Export, Vault, Version** | ✅ Focus navigation |
| **Library, Oracle, Music, Snapshots, Achievements, Save Transfer** | ✅ Focus over the rows and buttons |
| **Top Scores, Replays** | ✅ List selection, except multiple selection in Replays |
| **Text viewer** | ✅ Scrolling and paging of text; an HTML view has only its buttons |
| **Name page** | ✅ Starts on the name field |
| **Wiki and other web pages** | ✅ A gold focus ring moves between the page's links and controls |
| **Gnoll Overseer chat** | ✅ The page is divided into zones, and the composer, model selector and text cursor all work |
| **File dialogs** | ✅ An in-page dialog replaces the system's: always in Gaming Mode, and elsewhere while the controller is the active input |
| **Message popups** | ✅ On every page |
| **Tombstone** | 🟡 Either A or B dismisses it |
| **Editor, performance suite** | 🟡 Developer pages; B closes them, and nothing else works |

On most pages with a scrolling list, the right stick scrolls it and L2/R2 go to its first and last entries. The exceptions are the game menu, where neither does anything, and Top Scores and Replays, where the right stick does nothing and L2/R2 move between the list and the last button. Web pages use L2/R2 for Page Up and Page Down.

### ⚙️ Settings

The **Controller** section of Settings appears only when a controller can be used: on a Steam Deck started from Steam from the start, and elsewhere once a controller has been detected in the session.

- **Use Controller** turns the whole feature off.
- **Hide Command Bar**, on by default, hides the command bar and the menus' OK and Cancel buttons while the controller is the active input. They keep their space, so nothing on the screen moves.
- **Back Grip L4, L5, R4 and R5** set the grips' commands, and appear only when the controller has grips.
- **Trigger Quick Actions** is a section of its own, set to any command the bar buttons can hold. It appears while the Controller section is shown and Use Controller is on. Bar Commands is then hidden if Hide Command Bar is on, and shown next to it if off.

## ❌ What Is Not Covered

### 📱 Platforms

- **Android and iOS** have no backend, so the controller code is compiled for them but never receives any input. This includes the iOS version running on macOS. On Android, any D-pad key codes the system produces are treated as ordinary keyboard keys, which is not controller support.
- **Xamarin.Forms and the other legacy clients** are not supported.

### ⌨️ Text Entry

By default, only the Steam Deck in Gaming Mode opens an on-screen keyboard. On Windows and desktop Linux, and in the Deck's Desktop Mode without Steam + X, text must be typed on a keyboard. This affects:

- **Text prompts in the game**, such as wishing, engraving and naming. A is OK and submits what has been typed so far, and B cancels or, when wishing, picks at random. Some prompts also offer a list of choices with X.
- **Text fields on pages**, such as Settings and the name page, where A only focuses the field.
- **Web pages**, including the Overseer's chat entry.
- **Go to Turn in replays**, where a controller can only confirm or cancel the number.

### 🕹️ Controller Hardware and Features

- **Rumble, gyro and motion controls** are not used. GnollHack's Steam Input layout has gyro off.
- **Controller touchpads** are not read. The Steam Deck's right trackpad stays a mouse.
- **The Guide and Steam buttons** are not read.
- **Back grips** work by default only on a Steam Deck started from Steam. Paddles on other controllers, such as the Xbox Elite controllers, are not read.
- **Other controllers on Windows without Steam**: only XInput is read, so DirectInput devices and native PlayStation or Nintendo support are not available.
- **Local multiplayer** does not apply: one controller is active at a time.

### 🎛️ Customization

There is no free button remapping. Only the back grips and the trigger actions can be changed in the game. Everything else is fixed, although Steam Input's own remapping can change what the buttons send on Steam.

### 🚂 Steam Input

- GnollHack does not use the **Steam Input API**. It reads the virtual pad, so it has no in-game action sets.
- **Without a gamepad layout there is no virtual pad**. Steam's default for a game with no declared controller support sends only keyboard and mouse, which makes the controller appear dead.
- **A player's earlier layout choice is kept**. Publishing a new default does not reach a player who already selected another layout.
- **The Windows Steam depot has no layout**, and how XInput behaves under Steam Input on Windows has not been tested.

### 📁 File Dialogs

The in-page dialog deliberately does less than the system's:

- It reads only from named places: Pictures, Documents and Downloads, plus GnollHack Exports when importing. On Linux it also lists removable media and, on a Steam launch, GnollHack Screenshots.
- It saves only to a `GnollHack` folder under Documents or Downloads, or on Linux on removable media, and never overwrites a file. A second copy gets a new name.
- It cannot change a file. Anything else is done in Desktop Mode or with the mouse.

On the unreleased Avalonia Windows build, A on the Overseer's `+` opens Windows' own dialog, which a controller cannot use.

### 📋 Smaller Gaps

- **Multiple selection in Replays** is left to touch and the mouse.
- **The equipment side of an inventory menu** has no navigation of its own: only Menu, which returns to the list, and B.
- **The touch command canvas** (More Commands) can be paged and closed, but a command cannot be picked on it. The Actions radial is the controller's way to the same commands.
- **The number pad** and other waits for an unknown key take only B, which cancels them.
- **The tombstone, the editor and the performance suite** only get the basic keys listed in the table above.

## 🏗️ How It Is Implemented

### 🧱 Layers

Input travels from a backend through a shared service to whichever page is on top. Code above the backends never asks which backend is in use; it checks the controller's capabilities instead, such as whether it has analog triggers or grips.

| Layer | What it does | Code |
|:------|:-------------|:-----|
| **Backends** | Read the hardware and report buttons, sticks and triggers | `GHEvdevGamepadBackend`, `GHXInputGamepadBackend`, `GHGamepadKeyBridge` |
| **Frame glue** | Registers the backends and polls the service once per UI frame | `GHAvaloniaGamepad`, `GHWinUIGamepad` |
| **Service** | Applies the gates, tracks presses, derives triggers and stick directions, and routes the events | `GHGamepadService`, `GHGamepadButtonTracker`, `GHGamepadControllerSelector`, `GHGamepadPressRouter` |
| **Pages** | Handle focus and actions | `IGHGamepadHandlingPage`, `GHGamepadPageNavigator`, `GHGamepadFocusList` |
| **Game page** | Map controls, dialogs and radial menus | `GamePage.Gamepad.cs`, `GamePage.GamepadDialogs.cs`, `GamePage.Radial.cs`, `Radial/` |
| **Hints and focus** | Draw the button badges and the focus highlight | `GHGamepadHintRenderer`, `GHGamepadGlyphs`, `GHGamepadFocusGlow` |
| **Web pages** | Move a focus ring inside the page | `GHWebGamepadNavigator`, `gamepad_web.js`, `GHAvaloniaWebScriptHost`, `GHWinUIWebScriptHost` |
| **File dialogs** | An in-page dialog that takes the controller | `GHFileDialogHost`, `FileDialogView` |
| **On-screen keyboard** | Opens Steam's keyboard next to the field | `GHScreenKeyboard`, `GHAvaloniaSteamKeyboard` |

Most of this is in `win/win32/xpl/GnollHackX/GnollHackX/Gamepad/`. The Windows XInput backend is in `GnollHackM/Gamepad/`, and the platform glue in `GnollHackM/Platforms/Avalonia/` and `GnollHackM/Platforms/Windows/`.

### 🔌 Backends

- **evdev (Linux)** reads `/dev/input/event*` directly and never grabs a device. It watches `/dev/input` with inotify, so plugged-in controllers appear by themselves, and so does the new virtual pad when Steam recreates it. It honors the device lists Steam sets to hide the controllers it wraps. On a Steam launch it also reads the file that names the real controller behind each virtual pad, which decides the hint labels.
- **XInput (Windows)** calls `xinput1_4.dll`, a part of Windows. It polls connected slots every frame, and checks one empty slot every 0.5 seconds, so hot-plugging works for up to four controllers.
- **Back-grip key bridge (Avalonia)** is an auxiliary backend. Steam's virtual pad has no paddle buttons, so GnollHack's layout sends the grips as the keys F2, F3, F4 and F5, and the bridge turns those back into grip presses (WA-STEAM-0001). It runs by default only on a Steam Deck started from Steam.

### 🚦 The Service

`GHGamepadService` runs on the UI thread, once per frame:

1. **Pump** every backend, so nothing queues up.
2. **Apply the gates**. Input is discarded when Use Controller is off, the window is inactive, the app is suspended or the keyboard hook is disabled. Presses held at that moment end as cancelled. A gap of over 0.25 seconds between frames also resynchronizes the backends silently, so a stall cannot cause phantom presses.
3. **Derive buttons** from analog values: L2/R2 from the triggers, and four virtual directions per stick.
4. **Track presses** into Pressed, Released, ShortPressed, LongPressed and Repeat events.
5. **Route the events**, then the stick values, to the top target.

The routing order is an open message popup, then an open file dialog, then a page that handles the controller itself, and finally the **keyboard adapter**. The adapter is the fallback for pages without their own handling, and sends A as Enter, B as Escape, directions as arrow keys and L1/R1 as Page Up and Page Down. A press belongs to the target it started on, so it cannot act on a page or popup that opens while it is held.

If a frame fails, the error is logged at most once every 10 seconds, and 30 failed frames in a row stop the controller for the session rather than risking the game.

| Timing | Value |
|:-------|:------|
| **Long press** | 0.5 s |
| **Repeat** | After 0.4 s, then every 0.09 s |
| **Stick deadzone** | Radial, 0.15 on Steam's virtual pad and 0.24 on physical pads and XInput; full push at 0.95 |
| **Trigger press and release** | 0.55 and 0.35 of full travel |
| **Stick direction press and release** | 0.6 and 0.4 of full push |

### 👁️ Controller Mode

The service tracks whether the last input came from the controller, and pages use this to show or hide the controller's interface. On pages and in dialogs, the press that enters controller mode only reveals the focus and the hints, so it cannot activate something the player did not see. On the map, in radial menus, targeting prompts and replays, and on pages that use the keyboard adapter, the first press already acts, and so do the sticks. While editing a web page's text field, A, B, L1/R1 and L2/R2 act too. Touch, moving the mouse or a key leaves controller mode, and a controller press returns to it.

### 🌐 Web Pages

The wiki, the Overseer and other web pages are real web pages, so the focus ring has to be drawn inside them. The script `gamepad_web.js` is injected into each document, and it collects the geometry of the links and controls, draws the ring, scrolls and activates controls. On an ordinary page, the C# side picks the target from that geometry. A page that marks its zones with `data-gnh-pad-zone` attributes gets zone navigation instead, with the script moving the ring, and this is how the Overseer gets its zones. A profile (`GHWebGamepadProfile`) sets a page's hint labels and page-specific actions; only the Overseer has its own.

The script is evaluated directly through the web view, not through .NET MAUI's wrapper, because a page with a strict Content Security Policy refuses the wrapper's `eval`. Under Chromium on Linux, `CefBrowser.GoBack` does nothing after a link followed by a script, so the game uses `history.back()` (WA-CEF-0004). On WinUI 3, a page's file input is intercepted through the DevTools protocol while the controller is active, since WebView2 has no public way to replace its file dialog (WA-WINUI-0009).

### 🚂 The Steam Input Layout

GnollHack's layout, "GnollHack (Steam Deck)", is Steam's **Gamepad with Mouse Trackpad** template with the left trackpad's click as L3, the back grips bound to F2-F5 and gyro off. It ships with the game as an Action Manifest in the Linux Steam depot, in `steam_input/`, so no Steam account is attached to it and it is versioned with the code. The source files are in `win/win32/xpl/GnollHackM/Platforms/Linux/Packaging/steam/input/`.

## ❓ Troubleshooting

| Problem | Cause and solution |
|:--------|:-------------------|
| **The Deck's controls do nothing, but touch works** | The Steam Input layout sends only keyboard and mouse. Open the Steam button menu, Controller Settings, and select "GnollHack (Steam Deck)" from the official layouts, or the template "Gamepad with Mouse Trackpad". |
| **The Deck's controls still do nothing** | Steam Input may be off for the game. Turn it on in the game's Properties, Controller. |
| **The back grips do nothing** | The layout does not send the grips as keys. Use GnollHack's layout, or bind L4, L5, R4 and R5 to F2, F3, F4 and F5 in your own layout. |
| **No Controller section in Settings** | No controller has been detected in this session. Connect the controller and open Settings again. |
| **A controller does nothing on desktop Linux** | The user may not have access to the device. Look for `open=EACCES` on the `GAMEPAD dev` lines of the game's standard error. |
| **A controller does nothing on Windows** | It may not be an XInput device. Only XInput controllers are read. |

On Linux, every run writes lines starting with `GAMEPAD` to standard error at startup and on every hot-plug, naming each device and why it was accepted or skipped. They also reach the game's log when its debug logging is on. `GNOLLHACK_GAMEPAD_LOG=raw` additionally logs every input event. On Windows, only failures are logged.

## 🧪 Testing

A change to what a controller does or shows is not considered verified until it has been tested on a real device:

- **Shared controller code** is tested on the Steam Deck in Gaming Mode.
- **Code specific to one platform** is tested on that platform.
- **Before a release**, the Windows WinUI 3 build gets a short smoke test on an Xbox controller.

The Avalonia Windows build is a backup for an unavailable Deck, but it cannot speak for evdev, Steam Input, the grips, Steam's keyboard or Gaming Mode.

Unit tests in `win/win32/xpl/GnollHackTests/` cover the decoding and logic: the evdev protocol, decoder and device filter (with the capability data of Steam's virtual pad, measured on a Deck, and raw dumps as fixtures), press tracking, routing, controller selection, stick math, button labels, the key bridge, radial geometry and selection, web navigation, and file dialogs. They do not replace a device.

Setting up a Deck for testing is explained in [[/Development/Testing Avalonia Linux Version on Steam Deck]].

## 📖 Learn More

- [[/Development/Testing Avalonia Linux Version on Steam Deck]]
- [[/Development/Design Details of Linux Avalonia Port]]
- [[/Development/Avalonia Port]]
- [[/Commands]]
- [[/Development Information]]
