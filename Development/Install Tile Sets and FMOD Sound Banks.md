## Tile Sets

### Overview

Tile sets are three large PNG files:

- gnollhack_64x96_transparent_32bits.png
- gnollhack_64x96_transparent_32bits-2.png
- gnollhack_64x96_transparent_32bits-3.png

### Building

You can build them using [TileSetCompiler](https://github.com/hyvanmielenpelit/TileSetCompiler) and [GnollHackTileSet](https://github.com/hyvanmielenpelit/GnollHackTileSet) repositories. The [README.md](https://github.com/hyvanmielenpelit/GnollHackTileSet#readme) file of the GnollHackTileSet repository has instructions how to do it.

### Prebuilt Tile Sets

You can find prebuilt tile sets in the [Releases](https://github.com/hyvanmielenpelit/GnollHackTileSet/releases) section of the GnollHackTileSet repository. However, please note that the prebuilt tile sets may only work for GnollHack releases and not for the latest commit of code. Code and tile sets need always be aligned.

## FMOD Sound Banks

### Overview 

There are 12 FMOD sound banks files. They come in two flavors: Desktop and Mobile.

- There are 6 desktop sound banks, which are used for the Windows GUI version.
- There are 6 mobile sound banks, which are used for the Android and iOS versions.

They are in respective subdirectories: `Desktop` and `Mobile`. The sound banks are:

- **Auxiliary.bank** — Contains most voice overs. A streaming bank.
- **Intro.bank** — Contains voice overs for the intro. A streaming bank.
- **Master.bank** — Everything that is not in other banks. Read to memory.
- **Master.strings.bank** — A special bank which contains the string lookup of event path to GUID.
- **Music.bank** — Contains game music. A streaming bank.
- **Preliminary.bank** — Main menu music and sounds. Everything that is needed before the game starts.

Both desktop and mobile sound banks have the same names.

### Building

You can **build the sound banks** using [FMOD Studio](https://www.fmod.com/) and the files in the [GnollHackSoundSet](https://github.com/hyvanmielenpelit/GnollHackSoundSet) repository. The GnollHackSoundSet repository contains also [build instructions](https://github.com/hyvanmielenpelit/GnollHackSoundSet#readme).

### Prebuilt Sound Banks

You can find prebuilt sound banks in the [Releases](https://github.com/hyvanmielenpelit/GnollHackSoundSet/releases) section of the GnollHackSoundSet repository. However, please note that the prebuilt sound banks may only work for GnollHack releases and not for the latest commit of code. Code and sound banks need always be aligned.

## Installing the Files

1. Copy the **tile set files** to the `win\win32\tileset` directory.
2. Copy the **sound banks** to the `win\win32\bank` directory so that on the first level are `Desktop` and `Mobile` subdirectories.

