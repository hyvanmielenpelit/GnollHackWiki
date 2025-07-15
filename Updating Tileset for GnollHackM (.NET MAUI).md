## 1. Create `tile_definition.csv`

### 1.1 Ensure Right Debugging Options for GnollHackW

- In GnollHack solution, ensure that GnollHackW project has in Debugging Options Command Arguments `-D -u wizard` and Working Directory `$(BinDir)`.

### 1.2 Get Sound Banks

- Ensure that there are necessary sound banks built and copied to `win\win32\bank` of the GnollHack solution repository.
- See: https://github.com/hyvanmielenpelit/GnollHackSoundSet

### 1.3 Get Temporary Tilesets

- You may download some necessary tilesets for compiling GnollHackW from https://github.com/hyvanmielenpelit/GnollHackTileSet/releases
- They are named `gnollhack_64x96_transparent_32bits.png` and `gnollhack_64x96_transparent_32bits-2.png`.
- The game will be messed up, but don't worry about it.
- They need to be placed to `win\win32\tileset`.

### 1.4 Rebuild GnollHack Solution

- Change Solution Platform to Android + Windows.
- Start Windows Subsystem for Linux.
- Start the SSH Service in WSL.
- Rebuild Solution.

### 1.5 Start Debugging GnollHackW and Save `tile_definition.csv`

- Start Debugging GnollHackW in Visual Studio
- Start a game.
- Type `#wizsavetiledata` to create a tile data file.
- `tile_definition.csv` will appear in the game directory `bin\Debug\x64`.

## 2. Create Tileset

### 2.1. Copy `tile_definition.csv` to GnollHackTileSet repository

- Copy `tile_definition.csv` to the root of the GnollHackTileSet repository.

### 2.2 Run TilesetCompiler

- Run TileSetCompiler using the right Launch Configuration (it needs to point to the GnollHackTileSet repository location).
- This will create `gnollhack_64x96_transparent_32bits.png` and `gnollhack_64x96_transparent_32bits-2.png` to the root of the GnollHackTileSet repository.

### 2.3 Copy Tileset Files to GnollHack repository

- Copy `gnollhack_64x96_transparent_32bits.png` and `gnollhack_64x96_transparent_32bits-2.png` from the root of the GnollHackTileSet repository to `win\win32\tileset` in the GnollHack solution repository.

## 3. Rebuild GnollHack Solution

- Using `Android + Windows` solution platform, rebuild the GnollHack solution.
- This will copy necessary files to the GnollHackM project.

## 4. Rebuild GnollHackM Solution

- Using Visual Studio 2022 Preview, rebuild the GnollHackM solution.