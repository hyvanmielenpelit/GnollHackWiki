---
name: asset_and_tileset_compilation
description: Instructions for updating tilesets (`#wizsavetiledata`), running TileSetCompiler, and managing FMOD sound set files.
---

> 👉 **This skill guides you through the process of generating updated tile data, compiling custom tilesets using the GnollHackTileSet repository, and deploying sound banks.**

## 🖼️ Tileset Compilation Process

Whenever you add new monsters, objects, or terrain that require graphical representation, you must update the tileset.

### 1. Generate `tile_definition.csv`

1. Open `win\win32\vs\GnollHack.sln` in Visual Studio.
2. Ensure you have temporary or existing tilesets (`gnollhack_64x96_transparent_32bits.png`, `-2.png`, and `-3.png`) placed in `win\win32\tileset`.
3. Set the **GnollHackW** project's debugging properties: Working Directory to `$(BinDir)`, Command Arguments to `-D -u wizard`.
4. Run GnollHackW in debug mode.
5. In the game, type the extended command `#wizsavetiledata`.
6. This generates `tile_definition.csv` in `bin\Debug\x64`.

### 2. Compile the Tileset

1. Copy the generated `tile_definition.csv` to the root of the **GnollHackTileSet** repository.
2. Open the **GnollHackTileSet** solution and run the **TileSetCompiler** project.
3. The compiler will generate updated `gnollhack_64x96_transparent_32bits.png`, `gnollhack_64x96_transparent_32bits-2.png`, and `gnollhack_64x96_transparent_32bits-3.png` files in the repository root.

### 3. Deploy the Tileset

1. Copy the newly generated `.png` tilesets back to `win\win32\tileset` in the GnollHack repository.
2. Rebuild the `GnollHack.sln` solution.
   - The `copytilesetdroid.proj` MSBuild target will automatically copy and rename these files to `.ghpng` format across all target platform directories in `GnollHackM` (e.g., `GnollHackM\Platforms\Android\tileset\`).
3. Rebuild `GnollHackM.sln` to bundle the updated assets into the modern client.

## 🎵 FMOD Sound Banks

1. Pre-compiled sound banks (`.bank` files) should be placed in `win\win32\bank\Desktop` or `win\win32\bank\Mobile`.
2. These files are typically maintained in the separate **GnollHackSoundSet** repository and copied over.
3. The build process automatically copies them to the appropriate output directories during compilation.
