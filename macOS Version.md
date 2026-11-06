> 👉 **GnollHack has a native macOS version on Steam for Macs with Apple Silicon, which is the recommended way to play on a Mac. The iOS version from the App Store also runs on these Macs, but it has some quirks there.**

## 1. Download Options

GnollHack's macOS version has the following download options:

- **Steam** — Recommended download option. A native Mac app, with full keyboard, mouse, and game controller support.
- **App Store** — The iOS version, which also runs on Macs with Apple Silicon, but has some quirks on a Mac.

### 1.1. Steam

<a href="https://store.steampowered.com/app/3558190/GnollHack/?utm_source=wiki">![Available on Steam](/uploads/Download/steam-q90.webp)</a><br />

The Steam version is a native Mac app, signed and notarized by Apple. It has the same desktop interface as the Linux and Windows versions; see [[Desktop Features]].

#### 1.1.1. Auto-Update Can't Be Disabled

You can't disable auto-update in Steam, but if your saved games become invalid, you can revert to a compatible version of GnollHack as follows:

1. [[Contact the GnollHack Dev Team|Contact Information]] and ask that the previous game version will be made available. They will give you a code.
2. Go to GnollHack Properties in Steam.
3. Go to the Game Versions & Betas tab.
4. Enter the code to Private Versions and click Check Code.
5. The requested game version should become available for choosing.

#### 1.1.2. Steam Platform Features

- **Revert to Old Version** — You can revert to an old version using the Game Versions & Betas tab in the GnollHack properties in Steam *(see above)*.

### 1.2. App Store

<a href="https://apps.apple.com/app/gnollhack/id1626979951">![Download on the App Store](/uploads/Download/app-store-q90.webp)</a><br />

- This is the iOS version of GnollHack, which macOS runs on Macs with Apple Silicon.
- It works on a Mac, but it is made for iPhones and iPads, so it has some quirks. We recommend the Steam version for playing on macOS.
- **Please *disable* Automatic Updates in the App Store Settings/Preferences.**
- It does not support game controllers.
- More information: [[iOS and macOS Version]]

The Steam version and the App Store version keep their saved games separately.

## 2. System Requirements

- A Mac with Apple Silicon (M1 or later). Intel Macs are not supported.
- macOS 15 (Sequoia) or later.
- In-game web pages, such as this wiki and the [[Gnoll Overseer]], use the WebKit engine built into macOS, so nothing else needs to be installed.

## 3. Graphics

The Steam version draws the game with **Metal**, Apple's current graphics interface. If the game window flickers, stays black, or shows graphical glitches, turn **Metal Rendering** off under System in [[Settings]] to draw with OpenGL instead. The change takes effect when you start GnollHack the next time.

## 4. Keyboard

The **Option** key works as the **Alt** key of GnollHack's [[Keyboard Shortcuts]]. For example, Option+P is Pray (`Alt+p`).

If your keyboard layout types characters with the Option key, such as `@` on Option+2 in the Finnish layout, turn on **Allow Option Keys** under System in [[Settings]]. Option and a key then types the character your layout puts there, and other Option combinations remain Alt commands. Text fields always accept the characters that Option types.

Cmd+Q and Cmd+W close the game the same way as the game's own exit. Quitting from the Dock, or logging out of macOS, saves the game without asking.

## 5. Game Controllers

You can play the Steam version with a game controller. The controls are the same as on the Steam Deck; see [[Steam Deck Controls]].

- Xbox controllers and PlayStation DualShock 4 and DualSense controllers are supported, as are other controllers that macOS supports as gamepads.
- Pair a wireless controller in **System Settings → Bluetooth**, or connect it with a USB cable. The controller can be switched on before or during the game.
- Nintendo controllers have not been tested. Their face buttons may work by label rather than by position.
- The paddles of Xbox Elite controllers are not read, and the Home button keeps its usual macOS action.
- There is no on-screen keyboard, so type text, such as a wish or a name, on a keyboard.

## 6. Files and Logs

- **Saved games and settings:** `~/Library/Application Support/GnollHack`
- **Log file:** `~/Library/Logs/GnollHack/GnollHack.log`, and the previous run's log in `GnollHack.previous.log` in the same folder.

If you [[contact the GnollHack Dev Team|Contact Information]] about a problem, attaching the log file helps.
