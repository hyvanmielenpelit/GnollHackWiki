> 👉 **GnollHack for Linux is available on Steam and as an AppImage. The AppImage is a single file that contains the whole game. It needs no installation and no administrator rights, and it runs on most 64-bit (x86-64) Linux distributions.**

## 📥 Downloading the AppImage

Download `GnollHack-<version>-x86_64.AppImage` from the [GitHub releases](https://github.com/hyvanmielenpelit/GnollHack/releases). A release also lists a `.zsync` file and `SHA256SUMS`, which are for AppImage updaters and for checking the download; to play, you need only the `.AppImage` file.

> ℹ️ **Note:** We recommend getting the game on [Steam](https://store.steampowered.com/app/3558190/GnollHack/?utm_source=wiki), which also covers the Steam Deck. Steam installs and updates the game for you, so this page does not apply to the Steam version.

## 🏁 Starting the Game

1. **Make the file executable.** Browsers do not keep the "executable" mark on downloads. Either right-click the file, open **Properties**, and turn on **Allow executing file as program** (the wording depends on your desktop), or run:

   ```bash
   chmod +x GnollHack-*-x86_64.AppImage
   ```

2. **Start it** by double-clicking the file, or from a terminal:

   ```bash
   ./GnollHack-*-x86_64.AppImage
   ```

### ❓ If the Game Does Not Start

If nothing happens, or a message mentions **FUSE**, your system lacks the FUSE support that AppImages use to open themselves. Start the game this way instead:

```bash
./GnollHack-*-x86_64.AppImage --appimage-extract-and-run
```

To add FUSE support, so that the plain start works afterward, install the `fuse3` package: `sudo apt install fuse3` on Debian and Ubuntu, or `sudo dnf install fuse3` on Fedora.

## ⚙️ Adding GnollHack to the Application Menu

The first time you start the AppImage, GnollHack asks whether to add itself to your desktop's application menu. Choose **Add**, and GnollHack appears in the menu with its icon. If you choose **Not Now**, the game does not ask again.

- To add or remove the entry later, use **Settings > Application Menu Entry**. The switch is shown only when GnollHack runs from an AppImage.
- The menu entry starts the AppImage file you last started GnollHack from. If you move the file, the entry disappears from the menu until you start the game once from its new place; after that, the entry follows it.
- Some desktops show a new menu entry only after you log out and in again.

### 🧰 AppImage Managers

If you use an AppImage manager such as **Gear Lever** or **AppImageLauncher**, it can make the menu entry instead. When such a tool already has an entry for the file, GnollHack does not ask, and its switch in Settings is disabled.

If you have already added GnollHack's own entry and start using an AppImage manager later, turn off **Settings > Application Menu Entry** first. Otherwise, you end up with two menu entries.

## 🔄 Updating

1. Download the new AppImage from the GitHub releases.
2. Make it executable, as described in [[Starting the Game|#starting-the-game]].
3. Start it once. If you added the menu entry, the entry now starts the new file.
4. Delete the old file when you no longer need it.

AppImage updaters can also update the file for you. AppImageUpdate downloads only the parts that have changed. Gear Lever can update AppImages as well.

### ⚠️ Updates That Break Saved Games

**Some updates make saved games incompatible.** GnollHack warns you about such updates. If you have a game in progress, turn off automatic updates in your AppImage updater, and update only when you have no saved games. Alternatively, keep the old AppImage file and continue that game with the old file only. See [[Save Game Compatibility]] for which versions can load each other's saved games.

## 💾 Where Your Games Are Saved

Saved games, settings and the game's log are in `~/.local/share/GnollHack`, not inside the AppImage. Replacing or deleting the AppImage file does not touch them.

## 🗑️ Removing the Game

1. Turn off **Settings > Application Menu Entry**, so that the menu entry and its icon are removed too.
2. Delete the AppImage file.
3. To delete your saved games and settings as well, delete the folder `~/.local/share/GnollHack`.

> ⚠️ **Warning:** Deleting `~/.local/share/GnollHack` deletes all your saved games, and it cannot be undone.

## 📋 Requirements

- A 64-bit (x86-64) Linux desktop with a working graphics driver (Mesa for AMD and Intel, or NVIDIA's driver). X11 and Wayland desktops both work.
- Sound through PulseAudio or PipeWire, which most desktops use.
- In-game web pages, such as this wiki and [[Gnoll Overseer]], use the Chromium engine built into the game, so no web browser components need to be installed.

## 📖 See Also

- [[Download]]
- [[Linux Version]]
- [[Save Game Compatibility]]

## 🔗 External Links

- [GnollHack on Steam](https://store.steampowered.com/app/3558190/GnollHack/?utm_source=wiki)
- [GnollHack releases on GitHub](https://github.com/hyvanmielenpelit/GnollHack/releases)
