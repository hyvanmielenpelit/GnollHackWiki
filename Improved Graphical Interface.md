> 👉 **GnollHack features a heavily modernized graphical user interface with enhanced tile layers, dynamic updates, and high-resolution sprites, designed for optimal visual clarity.**

## 📱 Android Screenshot

![Android Screenshot](/uploads/Improved%20Graphical%20Interface/android-screenshot.webp)

## ⚙️ Interface Features

### 🗺️ Dungeon & Tile Enhancements

- **Several dungeon tilesets** — Supports up to 16 tilesets for different parts of the dungeon, including dedicated tilesets for Gnomish Mines, Valley of the Dead, and Gehennom.
- **Tile layers** — Several layers (background, items, monsters, effects) drawable at the same square.
- **Enlarged tiles** — Monsters, dungeon features (such as trees), and items (e.g., statues of large monsters) spanning over multiple squares.
- **Hidden monster transparency** — Monsters hidden behind enlarged tiles are displayed transparently.
- **Dynamic tile update** — Tiles can be updated based on underlying item or monster statistics (such as chest being locked or not). There are also automatic drawing routines for more complicated operations, such as generating endings for walls and drawing weapon rack contents.
- **New outdoor tiles** — Grass and ground to make outdoor maps look better.
- **Tile variations** — Each dungeon ("cmap") tile can have variations, such as dedicated tiles for differently aligned altars.

### 🎭 Character & Effect Graphics

- **Condition graphics** — Small graphics drawn on top of the player and monsters for various statuses, conditions, and buffs.
- **Player character graphics** — Dedicated graphics for all player character types.
- **Female monster graphics** — Dedicated graphics for various female monsters.
- **Missile graphics** — Thrown and fired missile tiles are rotated to face the correct direction.
- **Artifact graphics** — Dedicated graphics for all artifacts.
- **Special effects** — Special effect graphics for spells, summoning, and teleportation.
- **Linked tile drawing** — Dedicated drawing system for linked tiles such as a leash between the player and the leashed monster. Also, support for drawing a tethered aklys, a chain for an iron ball, and a long worm.

## 🧠 Design Philosophy

The design style of GnollHack's tile graphics emphasizes **clarity over artistic style**. This is especially important for NetHack veterans who are used to the clear ASCII presentation of the game.

### 📐 Aspect Ratio of Tiles

Tiles have an aspect ratio of 2:3, which on one hand, is meant to make human-shaped creatures easier to fit into a tile, while, on the other hand, it draws inspiration from the aspect ratio of monospaced letters in most modern operating systems (usually something like 8&times;12 pixels). Since GnollHack's and NetHack's map area is 80&times;21 tiles and the whole screen is traditionally 80&times;24 characters, there is plenty of reason to use tiles that are vertically longer than horizontally.

### 🖥️ Desktop Computers

Most regular displays used with desktop computers have a 16:9 aspect ratio, which means that they can accommodate 80&times;45 square tiles in the full-map mode. This translates into 80&times;30 tiles that have an aspect ratio of 2:3. This still leaves a total of 30% free space at the top and bottom of the screen, which is well enough for the top status bar and the bottom command row.
