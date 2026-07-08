![Desktop only features](/uploads/Desktop-Only%20Features/desktop-only-features.webp)

> 👉 **This page outlines the user interface features, mouse button quick actions, and settings optimized exclusively for the desktop versions of GnollHack.**

## ⌨️ Keyboard Shortcuts

The desktop versions support playing entirely with [[Keyboard Shortcuts]], just like in the original NetHack. This allows for fast, efficient, and classic roguelike control without requiring mouse interaction for most gameplay tasks.

## 🖱️ Mouse Button Quick Actions

You can configure quick actions for the **Right Mouse Button** and **Middle Mouse Button** in the [[Settings]] screen.

The following options are available:

| Quick Action Option | Description |
| :--- | :--- |
| **Default / By Role** | Executes a default action based on your character class. For details, see [[Character Classes]]. |
| **Off** | Disables clicks on the configured button. |
| **Look** | Performs a look command at the target tile (equivalent to Far Look `Alt-Shift-l`). |
| **Move** | Commands your character to travel or move to the clicked tile. |
| **Cast** | Casts your configured **Quick Spell** at the target (configurable in the cast menu). |
| **Fire** | Fires or throws your quivered ranged weapon or projectile at the target (automatically swapping to the correct launcher if autoswapping is enabled and needed). |
| **Zap** | Zaps your configured **Quick Wand** at the target (configurable in the item action screen of the inventory). |
| **Polearm** | Attacks the target with a polearm (automatically swapping to it if autoswapping is enabled). |

### ⚙️ Role-Specific Defaults

When set to **Default / By Role**, the game determines the click action dynamically depending on the selected character class:

| Character Class / Role | Right Click Default | Middle Click Default |
| :--------------------- | :-----------------: | :------------------: |
| [[/Roles/Healer]] / [[/Roles/Monk]] / [[/Roles/Priest]] / [[/Roles/Wizard]] | Cast | Zap |
| [[/Roles/Knight]] | Polearm | Look |
| All Other [[Character Classes]] | Fire | Look |

## ⚙️ Desktop-Only Settings

Several gameplay settings are optimized specifically for desktop play. You can customize these in the [[Settings]] screen:

- **Single Commands Page**: Displays all commands in the More Commands launcher on a single, unified page. On mobile devices, these commands are paginated instead.
- **OK on Double Click**: Allows you to double-click an item in menus to automatically select it and press the OK button.
- **On Switching Apps**: Controls how the game state is handled when focus is lost. On desktop, this defaults to **Checkpoint** (which creates a background checkpoint without closing open menus or exiting), whereas on mobile it defaults to **Save Game** (saving and returning to the main menu).
- **Desktop Status Bar**: Formatted specifically for wide desktop monitors. It displays additional game data including:
  - **Show Score**: Displays your current score directly.
  - **Show XP**: Displays your current experience points.
- **Desktop Buttons**: Shows dedicated **Stats** and **Equipment** buttons in the bottom-left and bottom-right corners of the main screen. On mobile, or when this option is disabled, these are accessed by clicking/tapping the top-left and top-right corners of the screen.

## 🔍 More Commands Search Filter

In the More Commands menu, desktop players have access to a real-time search filter text input. You can type directly in the search field to filter and locate specific commands using your keyboard, bypassing manual scroll navigation.

## 🖱️ Menu Navigation

In various menu screens, right-clicking an item acts as a **Long Tap** (which on mobile opens context menus, item details, or extra options).

## 🖥️ Windowed Mode

The **Windowed Mode** setting allows desktop users to toggle between full-screen mode and windowed mode.

> ⚠️ **Warning:** Changing this setting requires you to restart the game to take effect.
