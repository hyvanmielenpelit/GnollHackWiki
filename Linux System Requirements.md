GnollHack for Linux comes in two forms:

- **AppImage**: a single file from the [GnollHack releases page](https://github.com/hyvanmielenpelit/GnollHack/releases). It runs on most Linux distributions without installation.
- **Steam**: installed and updated through the Steam client, including on SteamOS and the Steam Deck.

Both include everything GnollHack needs to run, including the .NET runtime, the sound engine, the web view, and fonts. You do not need to install .NET, Mono, or Wine.

## At a Glance

| | Minimum | Recommended |
|---|---|---|
| **Processor architecture** | 64-bit x86 (x86_64, also called amd64) | 64-bit x86 (x86_64) |
| **GNU C Library (glibc)** | 2.27 | Your distribution's current version |
| **C++ runtime (libstdc++)** | From GCC 8 (GLIBCXX 3.4.25) | Your distribution's current version |
| **Distribution** | Ubuntu 18.04, Debian 10, RHEL 8, or equivalent | A release that still receives security updates |
| **Display** | X11, or Wayland with XWayland | X11, or Wayland with XWayland |
| **Graphics** | Any; software rendering is used without OpenGL | Working OpenGL driver (Mesa, NVIDIA, or AMD) |
| **Sound** | Optional | PipeWire, PulseAudio, or ALSA |

**Not supported:** 32-bit x86 systems, ARM computers (such as a Raspberry Pi or Apple Silicon running Asahi Linux), and distributions built on the musl C library instead of glibc (such as Alpine Linux).

## Supported Distributions

GnollHack doesn't depend on any particular distribution. It runs on any 64-bit x86 distribution that meets the minimums above. The table shows the oldest release of common distributions that meets them.

| Distribution | Oldest release that meets the minimum | Notes |
|---|---|---|
| Ubuntu | 18.04 LTS | 22.04 LTS or 24.04 LTS recommended |
| Kubuntu, Xubuntu, Lubuntu, Ubuntu MATE | 18.04 | Same as the Ubuntu release they are based on |
| Linux Mint | 19 | 21 or 22 recommended |
| Pop!_OS, Zorin OS, elementary OS | Based on Ubuntu 18.04 or newer | Same as the Ubuntu release they are based on |
| Debian | 10 (buster) | 12 (bookworm) or 13 (trixie) recommended |
| Fedora | Every currently supported release | |
| Red Hat Enterprise Linux, Rocky Linux, AlmaLinux | 8 | 9 or newer recommended |
| openSUSE Leap | 15.3 | |
| openSUSE Tumbleweed | Current | Rolling release |
| Arch Linux, Manjaro, EndeavourOS | Current | Rolling release |
| SteamOS 3 (Steam Deck) | Current | Use the Steam version |

> **Note:** Several of the oldest releases in this table, such as Ubuntu 18.04, Debian 10, and Linux Mint 19, no longer receive security updates from their distributions. GnollHack may still run on them, but a currently supported release is recommended.

If your distribution isn't listed, check the requirements below. Most distributions released since 2018 meet them.

## How to Check Your System

Open a terminal and run these commands.

**Processor architecture.** The output must be `x86_64`.

```bash
uname -m
```

**glibc version.** The first line must show 2.27 or newer.

```bash
ldd --version
```

**Display type.** The output shows `x11` or `wayland`. Both work.

```bash
echo $XDG_SESSION_TYPE
```

**Graphics driver (optional).** The `OpenGL renderer string` line should name your graphics card. If it says `llvmpipe` or `softpipe`, your system is using software rendering, and GnollHack will run more slowly. The `glxinfo` command is in the `mesa-utils` package on Ubuntu and Debian, and in `glx-utils` on Fedora.

```bash
glxinfo -B
```

## Requirements in Detail

### glibc and libstdc++

GnollHack uses two libraries that come with your distribution rather than with the game: the GNU C Library (glibc), and the C++ standard library (libstdc++). Every Linux distribution that uses glibc has both, so normally you don't need to install anything.

If your glibc is too old, GnollHack doesn't start, and shows a message saying it needs a newer GNU C Library. The fix is to upgrade your distribution to a newer release. Installing a different glibc by hand is not recommended, because it can make the whole system unusable.

### Display: X11 and Wayland

GnollHack draws its window with X11. On Wayland desktops, it runs through XWayland, the compatibility layer that GNOME, KDE Plasma, and most other Wayland desktops include and turn on by default. You don't need to change any settings.

### Graphics

GnollHack uses OpenGL when it is available, and otherwise falls back to software rendering. Software rendering works, but it is slower, especially on large screens.

For the best performance, use the graphics driver your distribution recommends:

- **Intel and AMD:** the Mesa drivers, which most distributions install by default.
- **NVIDIA:** the proprietary NVIDIA driver, installed through your distribution's driver manager or package manager.

### Sound

GnollHack includes its own sound engine and works with PipeWire, PulseAudio, and ALSA. Current distributions use PipeWire or PulseAudio by default. Without a working sound system, GnollHack runs with no sound.

## Running the AppImage

1. Download `GnollHack-<version>-x86_64.AppImage` from the [releases page](https://github.com/hyvanmielenpelit/GnollHack/releases).
2. Make it executable. Either right-click the file, open **Properties**, and turn on **Allow executing file as program**, or run:

   ```bash
   chmod +x GnollHack-*-x86_64.AppImage
   ```

3. Double-click the file, or run it from a terminal:

   ```bash
   ./GnollHack-*-x86_64.AppImage
   ```

When you start the AppImage, GnollHack can add itself to your application menu.

### If the AppImage Doesn't Start

AppImages use a system feature called FUSE to open themselves. Most desktop distributions support it out of the box. If you see an error that mentions FUSE, for example in a container or on a minimal installation, you can run the AppImage without FUSE:

```bash
./GnollHack-*-x86_64.AppImage --appimage-extract-and-run
```

When the game library can't load, GnollHack explains why in the terminal. If `zenity`, `kdialog`, or `xmessage` is installed, it also shows the explanation in a dialog.

## Steam and the Steam Deck

The Steam version runs inside the Steam Linux Runtime, a container that Steam downloads and updates for you. It doesn't use your distribution's libraries, so most of the requirements above don't apply. You only need a 64-bit x86 computer on which the Steam client runs.

On the Steam Deck, install GnollHack from Steam in Gaming Mode or Desktop Mode, as you would any other game.

## Where Your Games Are Saved

GnollHack keeps saved games, settings, and other data in your home folder:

```
~/.local/share/GnollHack
```

If the `XDG_DATA_HOME` environment variable is set, the folder is `$XDG_DATA_HOME/GnollHack` instead. To keep your progress, back up this folder before reinstalling your system or moving to a new computer.
