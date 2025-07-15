![art-contribution-512](https://github.com/user-attachments/assets/8ab944cc-13f7-4c6c-88bd-0dd38fca52bd)

# Disclaimer

## Legal

If you contribute art to GnollHack, you must allow your art to be distributed with GnollHack. To make the distribution with GnollHack sufficiently simple, you should release your art first to public domain, and we can then use your art in GnollHack on that basis; and so can anybody else in their own projects. Alternatively, if you wish just us to be able to use the art (and anybody else who licenses the GnollHack Tile Set), you can transfer or assign the copyright ownership to us, e.g. via a sale for a token amount, but this may be a more cumbersome process than just releasing the art to public domain and achieve very little more in practice. We seek to list all contributors in GnollHack's credits, but the accuracy or completeness of the credits list at all times is not guaranteed.

Instead of being public domain, GnollHack Tile Set is subject to [Creative Commons Attribution-NonCommercial 4.0 International Public License](https://github.com/hyvanmielenpelit/GnollHackTileSet/blob/main/LICENSE.md). This means that other non-commercial projects can use the tileset if they attribute GnollHack Tile Set as a source. Your name will be added to the [credits](https://github.com/hyvanmielenpelit/GnollHack/blob/master/dat/credits) but others who use graphics from the GnollHack Tile Set elsewhere will not be required to attribute you in their own projects, but just to mention the fact that the graphics came from the GnollHack Tile Set. The credits file does not necessarily list which individual art pieces have been contributed by different artists.

## AI Usage Policy

**The art must not be created with the use of AI**, but the artist can use AI tools to help their work. This means that the artist should have made the main contribution to the art.

# Guidelines

## Items

### Overview

Items can have two tiles:
- Main Tile
- Floor Tile

### Main Tile

- Full size image, which is displayed in the inventory
- Can be automatically resized to a floor tile, if the floor tile is not provided
- 64x48 pixels
- 32-bit transparent PNG (24-bit PNG with alpha channel)
- Original file as PSD, if possible (other formats are fine as well)

#### Example: Fedora Main Tile

![Fedora Main Tile](https://github.com/hyvanmielenpelit/GnollHackTileSet/blob/main/Objects/armor/fedora/armor_fedora.png?raw=true)

### Floor Tile

- Optional, needed if an item looks different in the inventory and on the floor and cannot be automatically resized
- 64x48 pixels
- 32-bit transparent PNG (24-bit PNG with alpha channel)
- Original file as PSD, if possible (other formats are fine as well)

#### Example: Fedora Floor Tile

![Fedora Floor Tile](https://github.com/hyvanmielenpelit/GnollHackTileSet/blob/main/Objects/armor/fedora/armor_fedora_floor.png?raw=true)

### Notes

Make sure that the tiles do not have any pixels that are almost but not fully transparent. GnollHack does not support partial transparency.

### Reference

- [GnollHack Tile Set Objects](https://github.com/hyvanmielenpelit/GnollHackTileSet/tree/main/Objects)
- [GnollHack Tile Set Artifacts](https://github.com/hyvanmielenpelit/GnollHackTileSet/tree/main/Artifacts)
