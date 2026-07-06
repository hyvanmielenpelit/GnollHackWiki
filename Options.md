![options](/uploads/Options/options2.webp)

> 👉 **GnollHack provides a vast array of configuration options that allow you to customize the user interface, gameplay mechanics, controls, and audio settings to fit your playstyle. This page serves as a comprehensive reference for all available options, whether you are playing on a modern graphical port or a classic terminal interface.**

## 🏁 Getting Started

- [[Accessing Options File]] — How to access the Options file on various platforms
- [[Additional Options]] — Advanced configuration options (e.g., colorizing menus, status highlighting, message filtering)

## 💡 Configuration Examples

Here are some of the most common configuration examples to help you customize your options file.

### ⌨️ Number Pad Movement

If you have a keyboard with a numeric keypad, you can configure it to move in all eight directions.

**Syntax:**

```
OPTIONS=number_pad:value
```

> 💡 **Example — Enable standard 8-direction movement on the numeric keypad:**
> 
> ```
> OPTIONS=number_pad:1
> ```

### 🎒 Autopickup Customization

Configure the game to automatically pick up specific types of items (such as gold, scrolls, and potions) while ignoring others.

**Syntax:**

```
OPTIONS=autopickup
OPTIONS=pickup_types:characters
```

> 💡 **Example — Turn on autopickup and only pick up gold ($), scrolls (?), potions (!), and wands (/):**
> 
> ```
> OPTIONS=autopickup
> OPTIONS=pickup_types:$?!/
> ```

## 🖥️ User Interface & Display

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **acoustics** | `true` / `false` | `true` | Enables in-game audio messages (such as doors opening or monster noises). |
| **crawl_interval** | *(varies)* | `125` | Delay in milliseconds between animation steps when the player or a monster is crawling. Lowering this speeds up crawling. |
| **dark_room** | `true` / `false` | `true` | Renders floors and features that have been explored but are currently out of line of sight in a darker shade to distinguish them from active vision. |
| **detailed_weights** | `true` / `false` | `false` | Displays small object weights using more precise units: ounces (`oz`) for the imperial system or grams (`g`) for the metric system, rather than standard pounds (`lbs`) or kilograms (`kg`). |
| **herewindow** | `true` / `false` | `true` | If enabled, displays a floating window listing all objects present on the player's current tile (the modern .NET MAUI frontend handles auto-placement and renders this window in the SkiaSharp map layer). |
| **hitpointbar** | `true` / `false` | `false` | Draws a color-changing health bar (green-to-red) background behind the HP text in the status panel (fully supported in the .NET MAUI frontend via the Settings page toggle). |
| **implicit_uncursed** | `true` / `false` | `true` | Omit the "uncursed" label from inventory descriptions to keep menus cleaner, showing only "blessed" or "cursed" tags. |
| **inventory_weights_last** | `true` / `false` | `true` | Appends item weights in parentheses after the item name in menus rather than before it. |
| **last_item_show_duration** | *(varies)* | `3` | Number of turns that the Last Item context button remains visible in the modern GUI. |
| **legacy** | `true` / `false` | `true` | Displays the classic introductory welcome message when starting a new game. |
| **lit_corridor** | `true` / `false` | `false` | Renders dark corridor squares in full visibility (as if lit) once they enter your character's field of view. |
| **long_charge_text** | `true` / `false` | `false` | Uses a verbose description for tool and wand charges (e.g., "1 charge left, 0 times recharged") instead of standard abbreviated numbers. |
| **move_interval** | *(varies)* | `50` | Delay in milliseconds between animation steps during normal walking movement. Lowering this speeds up walking. |
| **runmode** | `teleport` / `run` / `walk` / `crawl` | `run` | Configures map redrawing during automated travel or running. `teleport` updates only at the end of movement; `run` updates every 7 steps; `walk`/`crawl` update every step (with `crawl` using the `crawl_interval` delay). |
| **shield_effect_length** | *(varies)* | `10` | Number of animation frames to display for shield block or magical protection visual effects. |
| **show_comparison_stats** | `true` / `false` | `true` | Displays comparison statistics (e.g., changes to Armor Class or weapon damage) in pickup and loot menus against your currently equipped gear. |
| **show_damage_formula** | `true` / `false` | `false` | Shows the underlying dice formula (e.g., `1d6+2`) used to calculate an item's damage when examining it. |
| **show_dice_as_ranges** | `true` / `false` | `true` | Converts traditional D&D-style dice notation (like `2d6`) into a simple range (like `2-12`) in item descriptions. |
| **show_weight_summary** | `true` / `false` | `true` | Displays your total carried weight and carrying capacity at the bottom of the inventory screen. |
| **showrace** | `true` / `false` | `false` | Displays your character symbol on the map representing your race (e.g., `@` for human) instead of your role symbol. |
| **showscore** | `true` / `false` | `true` | Shows your current calculated game score directly in the on-screen status bar. |
| **skill_table_format** | `true` / `false` | `false` | Formats the skill enhancement and level-up menus as an organized grid table instead of a plain text list. |
| **sortloot** | `none` / `loot` / `full` | `loot` | Controls list sorting in inventory/loot screens. `none` sorts by slot letter; `loot` sorts ground loot alphabetically; `full` sorts all lists alphabetically. |
| **sparkle** | `true` / `false` | `true` | Renders a shiny sparkle effect animation around your character on the map whenever magic resistance successfully blocks a spell. |
| **spell_table_format** | `true` / `false` | `false` | Formats the spellcasting menu as an organized grid table instead of a plain text list. |
| **talk_effect_length** | *(varies)* | `6` | Length/duration in animation frames that dialogue speech bubbles and talk effects remain visible on screen. |
| **tombstone** | `true` / `false` | `true` | Displays a graphical tombstone illustration at game over, detailing your character's level, score, and cause of death. |
| **whatis_menu** | `true` / `false` | `false` | Displays an interactive menu identifying all symbols and objects at a targeted location when using the target inspection command. |
| **wiz_mstatusline** | `true` / `false` | `false` | Displays extended debugging statistics (such as level, HP, speed) for monsters under the cursor (requires Wizard/Debug mode). |
| **wizweight** | `true` / `false` | `false` | Displays the exact weight of all inventory items, bypassing character identification checks (requires Wizard/Debug mode). |
| **worn_shows_equipment** | `true` / `false` | `true` | Opens the full equipment screen when typing the worn items command (`w`) instead of showing a plain text inventory list. |

## ⚙️ Gameplay & Mechanics

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **autodescribe** | `true` / `false` | `true` | Automatically shows descriptions of terrain, features, and monsters in the status bar as you hover your cursor over them. |
| **autodig** | `true` / `false` | `true` | Automatically attempts to dig through solid rock or walls when moving into them if you are wielding a suitable digging tool (like a pick-axe or mattock). |
| **autokick** | `true` / `false` | `true` | Automatically attempts to kick open closed doors or force locked chests/containers when walking into or looting them (Android port only). |
| **autoopen** | `true` / `false` | `true` | Automatically opens a closed, unlocked door when you walk into it, saving a manual input turn. |
| **autopickup** | `true` / `false` | `false` | Automatically picks up items on the ground when walking over them if they match the categories configured in `pickup_types`. |
| **autoquiver** | `true` / `false` | `false` | Automatically fills an empty ammunition quiver with suitable projectiles from your inventory when firing a ranged weapon. |
| **autoswap_launchers** | `true` / `false` | `true` | Automatically swaps your wielded weapon to a launcher (like a bow) when performing ranged attacks, and swaps back to your melee weapon when attacking adjacent targets. |
| **autoswap_polearms** | `true` / `false` | `true` | Automatically swaps from a polearm to a standard melee weapon when a monster moves into adjacent range. |
| **autounlock** | `true` / `false` | `true` | Automatically attempts to unlock doors or containers using keys or lock picks from your inventory when you walk into them or loot them. |
| **baseacasbonus** | `true` / `false` | `true` | Displays Armor Class (AC) as a positive protection bonus starting at 0 (higher is better) instead of the classic descending system starting at 10 (lower is better). |
| **bones** | `true` / `false` | `true` | Allows loading "bones" files (the layout, items, and ghosts of deceased characters from previous runs) when entering a dungeon level. |
| **checkpoint** | `true` / `false` | `true` | Saves the game state automatically after changing dungeon levels to protect progress in case of a crash. |
| **confirm** | `true` / `false` | `true` | Prompts for confirmation before you attack a peaceful or friendly monster, preventing accidental hostile acts. |
| **disclose** | `iavgco` options | `ni na nv ng nc no` | Configures what game information (inventory `i`, attributes `a`, vanquished monsters `v`, genocided species `g`, conduct `c`, dungeon overview `o`) is revealed upon game over. Prefix each category letter with `+` (always disclose), `-` (never disclose), `y` (prompt, default yes), `n` (prompt, default no), or `?` (prompt, default special). |
| **displace_peaceful** | `true` / `false` | `true` | Automatically swaps places with a peaceful monster or pet when walking into them instead of blocking movement or attacking. |
| **dumplog** | `true` / `false` | `false` | Generates a complete text log summarizing character statistics, inventory, and recent events in your game folder upon death or ascension. |
| **exchange_prompt** | `true` / `false` | `true` | Prompts for confirmation when equipping items that would require removing currently worn gear (e.g. swapping rings or armor). |
| **fixinv** | `true` / `false` | `true` | Keeps inventory slot letters assigned to items constant, even if items in preceding slots are dropped or consumed. |
| **force_hint** | `true` / `false` | `false` | Forces the game to show tutorial tips and hints regardless of other settings. Enabled by default in Casual and Modern modes. |
| **force_invmenu** | `true` / `false` | `true` (Mobile) / `false` (Desktop) | Displays a visual menu of valid items when executing commands that require inventory selection, rather than prompting for a raw keyboard letter. |
| **goldX** | `true` / `false` | `false` | Categorizes gold as "uncursed gold pieces" or "unknown gold pieces" instead of just "gold" in your inventory menu. |
| **ignore_stopping** | `true` / `false` | `false` | Prevents automated pathfinding travel from stopping when your character passes over items, closed doors, or engravings. |
| **knapsack_prompt** | `true` / `false` | `true` | Prompts for a specific action (like dropping or stashing) when picking up an item while carrying a full inventory. |
| **lootabc** | `true` / `false` | `false` | Formats loot menu shortcuts as generic `a`, `b`, `c` letters rather than mnemonic letters (such as `o` for open, `i` for inspect, `c` for close). |
| **max_hint_difficulty** | *(varies)* | `veteran (-1)` | Limits tutorial tips and hints to games played at or below this difficulty level. |
| **mention_walls** | `true` / `false` | `false` | Prints a message in the message log (e.g. "You bump into a wall") when walking into a wall. |
| **metric_system** | `true` / `false` | `false` | Enables the metric system, displaying weights in kilograms (`kg`), grams (`g`), or tons. If disabled (default), the game uses the imperial system, displaying weights in pounds (`lbs` / `lb`), ounces (`oz`), or hundredweights (`cwt`). |
| **monpolycontrol** | `true` / `false` | `false` | Enables manual selection of the new form when polymorphing monsters (requires Wizard/Debug mode). |
| **multishot_always_fire** | `true` / `false` | `false` | Forces ranged attacks to fire the maximum possible number of projectiles per turn based on your skill level. |
| **packorder** | *(varies)* | ``$")[8=%?+!(9*7`0_`` | Defines the sorting order of item classes (weapons, armor, food, scrolls, etc.) in your pack display. |
| **paranoid_confirmation** | *(varies)* | `pray Autoall multishot` | Requires typing "yes" instead of "y" to confirm dangerous actions (like breaking items, eating non-vegan food, or attacking peacefuls). |
| **pickup_burden** | `unencumbered` / `burdened` / `stressed` / `strained` / `overtaxed` / `overloaded` | `stressed` | Configures the maximum encumbrance level you can reach before the game prompts you before automatically picking up items. |
| **pickup_thrown** | `true` / `false` | `true` | Automatically picks up ammunition and weapons that were thrown by you or monsters when you walk over them. |
| **pickup_types** | *(varies)* | `all` | Restricts `autopickup` to specific item classes represented by their symbol characters (e.g. `?` for scrolls, `!` for potions). |
| **pile_limit** | *(varies)* | `5` | Sets the minimum number of items on a single grid tile required to trigger the "There are many objects here" message. |
| **player_selection** | `dialog` / `prompts` | `dialog` | Selects whether character generation questions are asked using graphical dialog pop-ups or sequential text prompts. |
| **playmode** | `normal` / `explore` / `debug` / `casual` / `modern` / `reloadable` | `normal` | Configures active rules: `normal` (classic roguelike), `explore` (sandbox), `debug` (wizard mode), `casual` (unlimited saves/revives), `modern` (automatic assists), `reloadable` (manual reloading). |
| **pushweapon** | `true` / `false` | `false` | Automatically pushes your previously wielded weapon into your secondary slot when wielding a new weapon. |
| **rlecomp** | `true` / `false` | `false` | Compresses save files using Run-Length Encoding to save disk space at the cost of slightly longer save times. |
| **sanity_check** | `true` / `false` | `false` | Performs regular validation of internal data structures to detect memory corruption (requires Wizard/Debug mode). |
| **scores** | *(varies)* | `3 top/2 around` | Configures the leaderboard view (e.g., displaying the top N scores and the scores surrounding your rank). |
| **search_box_traps** | `true` / `false` | `true` | Causes the search command to check adjacent chests/boxes for traps before searching floor tiles. |
| **selectsaved** | `true` / `false` | `true` | Displays a list of existing save files at launch to choose which game to load. |
| **sortpack** | `true` / `false` | `true` | Groups your inventory items by type (weapons, armor, potions, etc.) instead of showing them in the order they were acquired. |
| **spellorder** | `0` to `7` | `0` | Selects the sorting criteria for spell books and casting lists (e.g. alphabetically, by level, or by spell school). |
| **stash_on_autopickup** | `true` / `false` | `false` | Automatically stashes newly picked up items into an active container (like a sack or bag of holding) in your inventory. |
| **swap_rhand_only** | `true` / `false` | `false` | Swaps only the weapon in your primary hand, leaving off-hand shields or secondary weapons equipped. |
| **takeoff_uses_all** | `true` / `false` | `true` | Makes the take-off command (`T`) remove all armor pieces sequentially rather than prompting you to pick a single piece. |
| **tellexp** | `true` / `false` | `true` | Prints a message in the message log whenever your character gains experience points (XP). |
| **verbose** | `true` / `false` | `true` | Shows descriptive log messages for game events rather than short, abbreviated notices. |
| **wiz_alwaysenc** | `true` / `false` | `false` | Forces random monster encounters to generate on every step (requires Wizard/Debug mode). |
| **zerocomp** | `true` / `false` | `false` | Enables zero-compression for save files to save disk space. |


## 🖱️ Controls & Input

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **clickfire** | `true` / `false` | `true` | Allows firing or throwing your readied projectile/weapon directly at a map tile by clicking on it. |
| **clicklook** | `true` / `false` | `true` | Enables describing and identifying items or monsters on a map tile by clicking on it. |
| **clickpole** | `true` / `false` | `true` | Allows attacking an adjacent or distant (2 tiles away) enemy with a polearm by clicking on them. |
| **cmdassist** | `true` / `false` | `true` | Displays helpful warnings and directional indicators if you enter an invalid movement key or direction. |
| **engrave_quickstyle** | *(varies)* | `0` | Selects which engraving stylus/tool is automatically chosen when executing the quick engrave command: `0` (ask every time), `1` (always use finger), `2` (use last item). |
| **engrave_quicktext** | *(varies)* | *(none)* | The default text written when using the quick engrave command (commonly set to "Elbereth"). |
| **help** | `true` / `false` | `true` | Displays the complete database description/lore for targeted items/monsters when running the `whatis` lookup command. |
| **herecmd_menu** | `true` / `false` | `false` | Displays a popup menu of context-sensitive actions you can take on your current tile (such as opening chests, kicking, searching) instead of requiring individual keys. |
| **inventory_obj_cmd** | `true` / `false` | `true` | Displays an action menu (wear, read, eat, drop, etc.) when selecting an item in your inventory, rather than immediately triggering a default action. |
| **middle_click_command** | `default` / `by role` / `?` / `off` / `look` / `move` / `cast` / `fire` / `zap` | `by role` | Configures the game command bound to a middle mouse button click. `by role` triggers role-specific default actions. |
| **mouse_support** | `0` (off) / `1` (on, OS adjusted) / `2` (on, OS unchanged) | `0` | Configures mouse click support. `0` disables mouse clicks; `1`/`2` enable mouse inputs with different OS QuickEdit/terminal integration settings. |
| **number_pad** | `-2` (off, yuhj) / `-1` (off, y/z swapped) / `0` (off) / `1` (on) / `2` (on, MSDOS) / `3` (on, phone-style) / `4` (on, phone MSDOS) | `0` | Configures numeric pad keys for movement. Useful for keyboards with or without numpads, supporting standard, MSDOS, or phone-style layouts. |
| **prefer_fast_move** | `true` / `false` | `false` | Swaps key bindings for running and walking so that pressing movement keys defaults to running (fast move) and shift/control walks (slow move). |
| **rest_on_space** | `true` / `false` | `false` | Binds the Space bar to wait/rest one turn, making it easier to skip turns or wait for enemies to approach. |
| **right_click_command** | `default` / `by role` / `?` / `off` / `look` / `move` / `cast` / `fire` / `zap` | `by role` | Configures the game command bound to a right mouse button click. `by role` triggers role-specific default actions. |
| **run_spot_distance** | *(varies)* | `10` | The maximum distance (in tiles) at which detecting a monster will automatically stop your automated travel or running movement. |
| **self_click_action** | `true` / `false` | `false` | Binds clicking or tapping on your own player character to trigger a custom action (like resting). |
| **travel** | `true` / `false` | `true` | Enables pathfinding travel, allowing you to move to a destination tile automatically by clicking it. |
| **travel_debug** | `true` / `false` | `false` | Draws debug visualization lines on the map showing pathfinding calculations (requires Wizard/Debug mode). |
| **whatis_filter** | `none` / `view` / `area` | `none` | Configures target filtering when cycling through map entities: `none` cycles all, `view` cycles only visible tiles, `area` cycles a regional area. |
| **whatis_moveskip** | `true` / `false` | `false` | Speeds up keyboard targeting by skipping the cursor over groups of identical tiles (like solid walls) instead of moving one grid cell at a time. |


## 🐾 Pets & Companions

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **catbreed** | *(varies)* | *(none)* | Selects the breed of your starting cat companion (e.g. `white persian`, `siamese`), changing its visual tile representation. |
| **catgender** | `male` / `female` / `random` | `random` | Sets the starting gender of your cat companion. |
| **catname** | *(varies)* | *(none)* | Sets the custom name for your starting cat companion. |
| **dogbreed** | *(varies)* | *(none)* | Selects the breed of your starting dog companion (e.g. `black labrador`, `german shepherd`), changing its visual tile representation. |
| **doggender** | `male` / `female` / `random` | `random` | Sets the starting gender of your dog companion. |
| **dogname** | *(varies)* | *(none)* | Sets the custom name for your starting dog companion. |
| **horsegender** | `male` / `female` / `random` | `random` | Sets the starting gender of your horse mount/companion. |
| **horsename** | *(varies)* | *(none)* | Sets the custom name for your starting horse mount/companion. |
| **pets_not_gifted** | `true` / `false` | `false` | If enabled, you will not receive any default starting pets/mounts regardless of your character role (e.g. Knights starting without a pony). |
| **pettype** | `cat` / `dog` / `horse` / `none` / `random` | `random` | Selects your preferred species for your starting pet companion. |
| **ramgender** | `male` / `female` / `random` | `random` | Sets the starting gender of your ram companion. |
| **ramname** | *(varies)* | *(none)* | Sets the custom name for your starting ram companion. |
| **safe_pet** | `true` / `false` | `true` | Prevents you from accidentally attacking your own pets, mounts, or companions in combat. |
| **wolfgender** | `male` / `female` / `random` | `random` | Sets the starting gender of your direwolf companion. |
| **wolfname** | *(varies)* | *(none)* | Sets the custom name for your starting direwolf companion. |

## 🧬 Character & Roleplay

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **align** | `lawful` / `neutral` / `chaotic` / `random` | `random` | Selects your character's starting moral alignment. If set to `random`, alignment is picked based on what is compatible with your selected role. |
| **blind** | `true` / `false` | `false` | If enabled, starts your character with permanent blindness. Renders the screen pitch black except for items/monsters felt via touch or telepathy (a hard difficulty challenge). |
| **female** | `true` / `false` | `false` | Determines whether your starting character is female (affects role titles and specific interactions like succubi/incubi). |
| **fruit** | *(varies)* | `slime mold` | Sets the name of a custom fruit your character enjoys eating, renaming the in-game "slime mold" item. |
| **gender** | `male` / `female` / `random` | `random` | Sets your starting character gender. |
| **luggagename** | *(varies)* | *(none)* | Sets the custom name for your starting luggage container monster (specific to the Tourist role). |
| **name** | *(varies)* | *(none)* | Configures your character's name. |
| **nudist** | `true` / `false` | `false` | If enabled, starts your character without any equipped starting armor (an extra gameplay challenge). |
| **race** | *(varies)* | `random` | Selects your character's starting race (e.g. `Human`, `Elf`, `Dwarf`), which influences stat caps and specific traits. |
| **role** | *(varies)* | `random` | Selects your character's starting role/class (e.g. `Valkyrie`, `Wizard`, `Barbarian`), which defines starting equipment and skills. |

## 🏛️ Legacy Versions

> ℹ️ **Note:** These options are shared across multiple legacy interfaces (such as TTY/ASCII, Curses, and/or the legacy Windows GUI). They are not used by the modern .NET MAUI frontend.

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **animation_interval** | *(varies)* | `25` | Configures the animation speed (delay in milliseconds between frames) for map movements and spell effects in legacy interfaces. |
| **extmenu** | `true` / `false` | `false` | If enabled, displays a visual selection menu when entering extended commands (`#`) rather than requiring manual text entry. |
| **ignintr** | `true` / `false` | `false` | Prevents standard OS keyboard interrupts (like `Ctrl+C`) from immediately terminating the game process in terminal interfaces. |
| **mail** | `true` / `false` | `true` | Enables the in-game mail daemon character to deliver real-world system mail notifications as scroll items (specific to ASCII/TTY ports). |
| **menu_deselect_all** | *(varies)* | *(varies)* | Binds a keyboard shortcut to deselect all checked items in a menu. |
| **menu_deselect_page** | *(varies)* | *(varies)* | Binds a keyboard shortcut to deselect all checked items on the currently visible menu page. |
| **menu_first_page** | *(varies)* | *(varies)* | Binds a keyboard shortcut to jump immediately to the first page of a multi-page menu. |
| **menu_headings** | *(varies)* | *(varies)* | Sets the text display style (e.g. bold, underline, inverse video) used for header text in menus. |
| **menu_invert_all** | *(varies)* | *(varies)* | Binds a keyboard shortcut to invert all item selections in a menu list. |
| **menu_invert_page** | *(varies)* | *(varies)* | Binds a keyboard shortcut to invert all item selections on the current menu page. |
| **menu_last_page** | *(varies)* | *(varies)* | Binds a keyboard shortcut to jump immediately to the last page of a multi-page menu. |
| **menu_next_page** | *(varies)* | *(varies)* | Binds a keyboard shortcut to flip to the next page of a multi-page menu. |
| **menu_objsyms** | `true` / `false` | `false` | Displays the ASCII character representations (e.g., `)` for weapons) next to items listed in selection menus. |
| **menu_previous_page** | *(varies)* | *(varies)* | Binds a keyboard shortcut to flip back to the previous page of a multi-page menu. |
| **menu_search** | *(varies)* | *(varies)* | Binds a keyboard shortcut to perform a text search within active menus. |
| **menu_select_all** | *(varies)* | *(varies)* | Binds a keyboard shortcut to check/select all items in the current menu list. |
| **menu_select_page** | *(varies)* | *(varies)* | Binds a keyboard shortcut to check/select all items on the current menu page. |
| **menucolors** | `true` / `false` | `true` (Mobile) / `false` (Desktop) | Enables colored text highlighting (such as coloring blessed items green and cursed items red) inside menus. |
| **menustyle** | `traditional` / `combination` / `full` / `partial` | `full` | Selects the user interface style for multi-item selection menus: `traditional` (pure character prompts), `combination` (text lists with quick letters), `full` (standard checkbox menus), `partial` (simple listing). |
| **msg_window** | `single` / `combination` / `full` / `reversed` | `full` (TTY) / `reversed` (Curses) | Configures how message history lists are aligned and updated on screen: `single` (single line top window), `combination` (in-line text log), `full` (popup full-page text), `reversed` (reverse chronological history). |
| **partydetails** | `true` / `false` | `false` | If enabled, lists detailed statistics (level, exact HP, status effects) for all current pets in the status window. |
| **partylinecolor** | `true` / `false` | `true` | Uses color codes in the status window to display the health and attributes of pets. |
| **partymultiline** | `true` / `false` | `false` | Displays each active pet's statistics on a separate line in the status window, instead of combining them into a single row. |
| **roguesymset** | *(varies)* | *(varies)* | Selects a symbol set mapping from the symbols database to use when rendering the classic Rogue-like levels. |
| **symset** | *(varies)* | *(varies)* | Selects a custom mapping of symbols from the symbols database for drawing map terrain and objects. |
| **windowchain** | *(varies)* | *(varies)* | Selects which windowing processor library handles display rendering callbacks. |
| **windowtype** | *(varies)* | *(varies)* | Selects which windowing backend interface runs the game (e.g. `TTY`, `Curses`, `MSWin`, or `Qt`). |

## ⌨️ ASCII

> ℹ️ **Note:** These options pertain to the legacy ASCII version of the game. They are not used by the modern versions of GnollHack.

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **DECgraphics** | *(varies)* | *(varies)* | Loads DEC VT100-style line-drawing characters for dungeon walls and borders on compatible terminal emulators. |
| **IBMgraphics** | *(varies)* | *(varies)* | Loads classic IBM PC CP437 character set symbols for high-quality terminal map rendering. |
| **Macgraphics** | *(varies)* | *(varies)* | Loads Apple Macintosh-specific character mappings for map symbols. |
| **altkeyhandler** | *(varies)* | `default` | Selects an external keyboard mapping module or DLL to process custom key handlers (legacy Windows GUI only). |
| **altmeta** | `true` / `false` | `false` | If enabled, interprets pressing the Escape key followed by a character `c` as the Meta-key combination `M-c`. |
| **ascii_map** | `true` / `false` | `false` | If enabled, forces the game map to render in plain text ASCII/UTF-8 mode instead of graphical tiles. |
| **boulder** | *(varies)* | *(none)* | Overrides the character symbol used to represent boulders on text/terminal displays (e.g. `boulder:`). It is recommended to use `S_boulder` instead. |
| **classic_colors** | `true` / `false` | `false` | Uses classic NetHack low-contrast colors for floor dots and boulders, instead of updated high-contrast palettes. |
| **classic_statue_symbol** | `true` / `false` | `false` | Renders map statues using the legacy backtick symbol (`` ` ``) instead of showing the underlying monster's character glyph. |
| **color** | `true` / `false` | `true` | Enables color rendering for map symbols, menus, and text logs; if disabled, displays everything in monochrome. |
| **dungeon** | *(varies)* | *(varies)* | Defines the specific ASCII character symbols used to draw wall segments, corridors, stairs, and doors on the map. |
| **effects** | *(varies)* | *(varies)* | Defines the specific ASCII symbols used to draw spell animations, explosions, and projectile flight paths. |
| **eight_bit_tty** | `true` / `false` | `false` | Enables sending raw 8-bit character codes directly to the terminal emulator, required for displaying non-ASCII international characters. |
| **enablettyarrowkeys** | `true` / `false` | `false` | Enables standard keyboard arrow keys for navigation and movement in Unix terminal environments. |
| **hilite_pet** | `true` / `false` | `false` | Highlights pet character symbols on the map (typically using bold or inverse text) to make them stand out from enemies. |
| **hilite_pile** | `true` / `false` | `false` | Highlights map tiles containing multiple items (typically using underline or a unique color attribute). |
| **ibm2utf8** | `true` / `false` | `false` | Translates CP437 line-drawing character symbols into standard Unicode UTF-8 symbols for modern terminal environments. |
| **menu_overlay** | `true` / `false` | `true` | Overlays interactive menus on top of the right-hand portion of the map screen, keeping the left side visible (TTY only). |
| **monsters** | *(varies)* | *(varies)* | Defines the custom character symbol assignments for all monster types on the map. |
| **null** | `true` / `false` | `true` | Allows sending null bytes to the terminal as output padding, which is required for terminal compatibility on some legacy systems. |
| **objects** | *(varies)* | *(varies)* | Defines the custom character symbol assignments for all item categories on the map. |
| **petattr** | *(varies)* | *(none)* | Configures the visual style attribute (e.g. bold, reverse video, underline) used to highlight pet symbols on the map. |
| **show_decorations** | `true` / `false` | `true` | Colors decorative map elements (like fountains or alters) with high-visibility colors in ASCII mode to aid navigation. |
| **silent** | `true` / `false` | `true` | Suppresses the terminal bell/bleep sound when trying to make invalid movements or commands. |
| **standout** | `true` / `false` | `false` | Highlights the `--more--` message log pauses using the terminal's standout/reverse video mode. |
| **subkeyvalue** | *(varies)* | *(varies)* | Allows overriding specific raw keyboard input values and mapping them to custom commands. |
| **tiled_map** | `true` / `false` | `true` | Tiled map display mode (renders graphical tiles inside the window). |
| **timed_delay** | `true` / `false` | `true` | Uses short pauses (time delays) during spell animations and projectile actions so they are visually readable. |
| **traps** | *(varies)* | *(varies)* | Defines the character symbol assignments used to draw active and discovered traps on the map. |
| **underline_peaceful** | `true` / `false` | `true` | Renders peaceful or neutral monsters with an underline character to distinguish them from hostile targets. |
| **use_darkgray** | `true` / `false` | `true` | Uses bold black / dark gray instead of dark blue for low-visibility dungeon walls and unlit areas. |
| **use_inverse** | `true` / `false` | `true` (Windows/Android) / `false` (other) | Renders monsters detected via telepathy or detection spells in inverse video color. |
| **video** | *(varies)* | *(varies)* | Configures video update routines and window scaling methods for terminal display optimization. |
| **videocolors** | *(varies)* | *(varies)* | Configures raw color mapping values for the internal console rendering loop. |
| **videoshades** | *(varies)* | *(varies)* | Configures the mapping of gray shades to black/gray/white for monochrome terminal displays. |
| **vt_tiledata** | `true` / `false` | `false` | Sends special VT terminal control codes to render graphical tiles inside compatible terminal emulators. |
| **whatis_coord** | `none` / `map` / `compass` / `full compass` / `screen` | `none` | Configures the coordinate description style shown when inspecting tiles: `none` hides coordinates; `map` shows grid (e.g. `[12, 10]`); `compass` shows relative direction/distance (e.g. `2 East`); `screen` shows window coordinates. |

## 🖥️ Curses Interface

> ℹ️ **Note:** These options are specific to the curses terminal interface. They are generally not applicable to the modern GUI versions of GnollHack.

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **align_message** | *(varies)* | `top` | Anchors the message history log window to either the `top` or `bottom` of the terminal screen. |
| **align_status** | *(varies)* | `bottom` | Anchors the character status bar window to either the `top` or `bottom` of the terminal screen. |
| **autostatuslines** | `true` / `false` | `false` | If enabled, automatically expands the status window height (up to 8 lines) to display active status effects, pet stats, and mounts. |
| **cursesgraphics** | *(varies)* | *(varies)* | Loads customized character mappings for wall and corner drawing specific to the Curses terminal interface. |
| **fullstatuslineorder** | `true` / `false` | `true` | Standardizes character status field order (HP, mana, strength, etc.) across different window widths and terminal resolutions. |
| **guicolor** | `true` / `false` | `true` | Enables colored graphics for terminal UI components, border frames, and dialog boxes. |
| **here_window_size** | *(varies)* | `8` | Configures the display height (number of rows) of the auxiliary "here" tile info window. |
| **hicolor** | *(varies)* | *(varies)* | Configures terminal highlighting colors using reverse-order color palette logic. |
| **show_weapon_style** | `true` / `false` | `true` | Displays your active weapon's damage style (Slash, Pierce, Blunt) in the status bar. |
| **showexp** | `true` / `false` | `true` | Displays your current total experience points (XP) and level progress on the status line. |
| **showmove** | `true` / `false` | `true` | Displays your current character movement speed factor on the status line. |
| **showrealtime** | `true` / `false` | `true` | Displays the total elapsed real-world time (wall-clock duration) of your run on the status line. |
| **status_updates** | `true` / `false` | `true` | Enables real-time redraws of status line fields during gameplay actions; if disabled, status lines update only at turn boundaries. |
| **statushilites** | *(varies)* | *(varies)* | Configures the highlight control rules (e.g. flashing red on low HP, green on level up) for character status values. |
| **statuslines** | *(varies)* | `2` | Allocates a fixed height (2 to 8 rows) on screen to display character status values. |
| **term_cols** | *(varies)* | *(varies)* | Sets a fixed terminal window width in columns (overriding automatic resize detection). |
| **term_rows** | *(varies)* | *(varies)* | Sets a fixed terminal window height in rows (overriding automatic resize detection). |
| **time** | `true` / `false` | `false` | Displays the current in-game turn counter on the status line. |
| **windowborders** | `0` (off) / `1` (on) / `2` (auto) | `2` (auto) | Configures window borders: `0` hides all borders, `1` forces borders on all windows, `2` draws borders automatically if terminal width/height allows. |
| **windowcolors** | *(varies)* | *(varies)* | Configures custom foreground and background colors for specific Curses window panels. |

## 🪟 Legacy Windows GUI

> ℹ️ **Note:** These options are specific to the legacy Windows GUI port (`GnollHackW.exe`). They are not applicable to the modern .NET MAUI frontend.

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **blinking_cursor_on_tiles** | `true` / `false` | `false` | If enabled, draws a blinking indicator on the tile where the cursor or target is located to improve visibility. |
| **font_map** | *(varies)* | *(varies)* | Selects the font family used for text overlays in the dungeon map window. |
| **font_menu** | *(varies)* | *(varies)* | Selects the font family used inside selection lists and interactive menus. |
| **font_message** | *(varies)* | *(varies)* | Selects the font family used in the message history log window. |
| **font_size_menu** | *(varies)* | *(varies)* | Sets the font size (in points) for text inside menus. |
| **font_size_message** | *(varies)* | *(varies)* | Sets the font size (in points) for text inside the message window. |
| **font_size_status** | *(varies)* | *(varies)* | Sets the font size (in points) for text inside the character status window. |
| **font_size_text** | *(varies)* | *(varies)* | Sets the font size (in points) for plain text popups and encyclopedia windows. |
| **font_status** | *(varies)* | *(varies)* | Selects the font family used in the character status window. |
| **font_text** | *(varies)* | *(varies)* | Selects the font family used inside plain text popups and helper windows. |
| **fullscreen** | `true` / `false` | `false` | Toggles whether the legacy GUI client launches in full screen or windowed mode. |
| **map_mode** | *(varies)* | *(varies)* | Configures the scaling and rendering mode of the graphical map tiles (such as stretched, centered, or pixel-perfect scaling). |
| **menu_tab_sep** | `true` / `false` | `false` | Uses tab characters instead of spaces to format and align columns inside menus. |
| **msghistory** | *(varies)* | `20` | Sets the maximum number of recent game messages retained in scrollable message history. |
| **news** | `true` / `false` | `true` | Displays the server news and update text when starting the game. |
| **palette** | *(varies)* | *(varies)* | Selects the color palette template used for drawing text and window interfaces. |
| **perm_invent** | `true` / `false` | `false` | If enabled, displays a persistent inventory sidebar panel, allowing you to see your items at a glance without opening a menu. |
| **popup_dialog** | `true` / `false` | `false` | If enabled, displays text prompts and questions in modal popup dialog boxes instead of writing them to the message line. |
| **preferred_screen_scale** | *(varies)* | *(varies)* | Sets the default display scale percentage for high-DPI monitors. |
| **scroll_amount** | *(varies)* | *(varies)* | Configures how many tiles the map view pans/scrolls when the player reaches the camera scrolling margins. |
| **scroll_margin** | *(varies)* | *(varies)* | Sets the camera panning margin (number of tiles from the screen edge the player can reach before the map scrolls). |
| **show_buff_timer** | `true` / `false` | `false` | Renders numerical duration countdown timers directly on top of active status effect buff icons. |
| **show_grid** | `true` / `false` | `false` | Draws a grid overlay pattern separating individual map tiles to aid spatial alignment. |
| **show_tile_mon_hp_bar** | `true` / `false` | `false` | Renders a small visual health bar directly over hostile monsters on the map screen. |
| **show_tile_pet_hp_bar** | `true` / `false` | `false` | Renders a small visual health bar directly over your pets and companions on the map screen. |
| **show_tile_u_hp_bar** | `true` / `false` | `false` | Renders a small visual health bar directly over your character on the map screen. |
| **splash_screen** | `true` / `false` | `true` | Displays the graphical logo splash screen during game launch. |
| **sound_volume_ambient** | *(varies)* | `50` | Sets the volume percentage for ambient background soundscapes. |
| **sound_volume_dialogue** | *(varies)* | `50` | Sets the volume percentage for character voices and dialogue. |
| **sound_volume_effects** | *(varies)* | `50` | Sets the volume percentage for combat actions and spell sound effects. |
| **sound_volume_general** | *(varies)* | `100` | Sets the master volume percentage for all game audio outputs. |
| **sound_volume_music** | *(varies)* | `50` | Sets the volume percentage for background music. |
| **sound_volume_ui** | *(varies)* | `50` | Sets the volume percentage for interface button clicks and menu sounds. |
| **tile_file** | *(varies)* | *(varies)* | Sets the path or filename of the active graphical tileset sheet. |
| **tile_height** | *(varies)* | *(varies)* | Sets the height of graphical tiles in pixels. |
| **tile_width** | *(varies)* | *(varies)* | Sets the width of graphical tiles in pixels. |
| **toptenwin** | `true` / `false` | `false` | Displays the high scores leaderboard screen immediately at game over. |
| **vary_msgcount** | *(varies)* | *(varies)* | Dynamically adjusts the number of older message log lines shown simultaneously based on window height. |

## 🗑️ Obsolete

> ⚠️ **Warning:** These options are obsolete or deprecated.

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **asksavedisk** | `true` / `false` | `false` | Deprecated floppy disk option: prompts the user to insert a save disk before saving. |
| **BIOS** | `true` / `false` | `false` | Deprecated MSDOS option: forces using raw IBM ROM BIOS screen write calls. |
| **checkspace** | `true` / `false` | `true` | Deprecated floppy disk option: checks for sufficient free disk space before saving. |
| **fast_map** | `true` / `false` | `true` | Deprecated console option: uses a high-performance, less flexible map rendering algorithm. |
| **flush** | `true` / `false` | `false` | Deprecated Amiga option: flushes keyboard buffer inputs. |
| **font_size_map** | *(varies)* | *(varies)* | Obsolete option: sets the font size for text map overlays. |
| **large_font** | `true` / `false` | `false` | Obsolete console option: enables high-density large font mode. |
| **page_wait** | `true` / `false` | `true` | Deprecated Macintosh option: waits for mouse click between text page displays. |
| **preload_tiles** | `true` / `false` | `true` | Obsolete memory option: preloads tileset graphic files into RAM at launch. |
| **rawio** | `true` / `false` | `false` | Deprecated MSDOS option: enables raw keyboard input polling. |
| **softkeyboard** | `true` / `false` | `false` | Obsolete option: displays a software keyboard helper overlay on touch screen devices. |
| **soundcard** | *(varies)* | *(varies)* | Deprecated MSDOS option: selects active sound card hardware registers. |
| **suppress_alert** | *(varies)* | *(varies)* | Obsolete version option: suppresses notifications regarding version mismatches and feature updates. |
| **wraptext** | `true` / `false` | `false` | Obsolete layout option: wraps text blocks inside popups and menus. |

