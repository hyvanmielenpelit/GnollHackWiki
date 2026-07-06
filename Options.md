![options](/uploads/Options/options2.webp)

## Accessing the Options File

### Modern Ports (Android, iOS, and Windows)

You need to enable **Developer Mode** in the settings. Then **Options** will appear in the main menu.

### Linux

The options file is located in your home folder (~) and is named `.gnollhackrc`.

### Linux Server (Hardfought, server.gnollhack.com)

You use the server UI to edit the options file.

### Windows Legacy Ports

The options file is in the same folder as the executable and is named `defaults.gnh`. It is a text file.

## Options

### 🖥️ User Interface & Display

| Option Name | Values | Default | Description |
| :--- | :--- | :--- | :--- |
| **align_message** | `top`, `bottom`, `left`, `right` | `top` | Message window alignment |
| **align_status** | `top`, `bottom`, `left`, `right` | `top` | Status window alignment |
| **autostatuslines** | `true` / `false` | `false` | Automatically adjust message lines and status lines in the curses interface |
| **blinking_cursor_on_tiles** | `true` / `false` | `false` | Display a blinking cursor when using tiles |
| **classic_colors** | `true` / `false` | `false` | Use classic colors for boulders and floor symbols |
| **classic_statue_symbol** | `true` / `false` | `false` | Use classic symbol '`' for statues |
| **dark_room** | `true` / `false` | `true` | Show floor outside line of sight differently |
| **detailed_weights** | `true` / `false` | `false` | Show object weights using more accurate units |
| **fullscreen** | `true` / `false` | `false` | Toggle fullscreen |
| **fullstatuslineorder** | `true` / `false` | `true` | Use full status line order |
| **herewindow** | `true` / `false` | `true` | Show here window |
| **hitpointbar** | `true` / `false` | `false` | Show colored bar for hit points |
| **ibm2utf8** | `true` / `false` | `false` | Convert CP437 symbols to UTF8 format before output |
| **inventory_weights_last** | `true` / `false` | `true` | Display object weights in parentheses after object name |
| **perm_invent** | `true` / `false` | `false` | Show permanent inventory window |
| **show_buff_timer** | `true` / `false` | `false` | Show buff timer when using tiles |
| **show_comparison_stats** | `true` / `false` | `true` | Show comparison statistics for items when picking them up |
| **show_damage_formula** | `true` / `false` | `false` | Show damage formula in examine |
| **show_decorations** | `true` / `false` | `true` | Show decorations via colors in ASCII mode |
| **show_dice_as_ranges** | `true` / `false` | `true` | Show dice as ranges (e.g., 2-12 instead of 2d6) |
| **show_grid** | `true` / `false` | `false` | Show grid between tiles |
| **show_tile_mon_hp_bar** | `true` / `false` | `false` | Show monster hit points on tiles |
| **show_tile_pet_hp_bar** | `true` / `false` | `false` | Show pet hit points on tiles |
| **show_tile_u_hp_bar** | `true` / `false` | `false` | Show player hit points on tiles |
| **show_weapon_style** | `true` / `false` | `true` | Show used weapon type in the status line |
| **show_weight_summary** | `true` / `false` | `true` | Show total weight at the end of inventory |
| **showexp** | `true` / `false` | `true` | Show experience points in status line |
| **showmove** | `true` / `false` | `true` | Show current movement speed in the status line |
| **showrace** | `true` / `false` | `false` | Show your character by race rather than role |
| **showrealtime** | `true` / `false` | `true` | Show elapsed wall-clock time in the status line |
| **showscore** | `true` / `false` | `true` | Show current score in status line |
| **skill_table_format** | `true` / `false` | `false` | Show skills in a table format rather than a list |
| **spell_table_format** | `true` / `false` | `false` | Show spells in a table format rather than a list |
| **use_darkgray** | `true` / `false` | `true` | Use bold black color instead of blue |
| **whatis_menu** | `true` / `false` | `false` | Show menu when getting a map location |
| **worn_shows_equipment** | `true` / `false` | `true` | Worn items shows equipment screen |
| **wraptext** | `true` / `false` | `false` | Wrap text |

### ⚙️ Gameplay & Mechanics

| Option Name | Values | Default | Description |
| :--- | :--- | :--- | :--- |
| **autounlock** | `true` / `false` | `true` | Automatically unlock a locked door or chest |
| **autoswap_launchers** | `true` / `false` | `true` | Automatically swap launchers on for ranged attacks and off for melee attacks |
| **autoswap_polearms** | `true` / `false` | `true` | Automatically swap polearms off for melee attacks |
| **baseacasbonus** | `true` / `false` | `true` | Display base armor class as a bonus rather than a number starting at 10 |
| **displace_peaceful** | `true` / `false` | `true` | Walking into a peaceful monster attempts to displace it |
| **exchange_prompt** | `true` / `false` | `true` | Prompt when exchanging a worn object for another |
| **force_hint** | `true` / `false` | `false` | Force giving hints regardless of other settings |
| **ignore_stopping** | `true` / `false` | `false` | Travelling is not interrupted by items, doors, or engravings |
| **knapsack_prompt** | `true` / `false` | `true` | Prompt for an action when knapsack is full |
| **long_charge_text** | `true` / `false` | `false` | Long format for charges and rechargings in inventory (X charges, Y rechargings) |
| **metric_system** | `true` / `false` | `false` | Use the metric system for weights (kilograms and grams) |
| **multishot_always_fire** | `true` / `false` | `false` | Attack always as many times as possible |
| **pickup_thrown** | `true` / `false` | `true` | Autopickup thrown items |
| **search_box_traps** | `true` / `false` | `true` | Search command searches boxes for traps first |
| **stash_on_autopickup** | `true` / `false` | `false` | Stash items into a container on autopickup (but no thrown if pick_thrown is on) |
| **swap_rhand_only** | `true` / `false` | `false` | Swap right hand weapon only rather than objects in both hands |
| **takeoff_uses_all** | `true` / `false` | `true` | The `takeoff` command uses `takeoffall` command rather than normal implementation |
| **tellexp** | `true` / `false` | `true` | Report experience points gained |

### 🖱️ Controls & Input

| Option Name | Values | Default | Description |
| :--- | :--- | :--- | :--- |
| **clickfire** | `true` / `false` | `true` | Enable firing via mouse click |
| **clicklook** | `true` / `false` | `true` | Enable looking via mouse click |
| **clickpole** | `true` / `false` | `true` | Enable use of polearm via mouse click |
| **engrave_quickstyle** | `0` to `2` | `0` | Stylus selection style for engrave quick command |
| **engrave_quicktext** | *text* | *(none)* | The preset text for engrave quick command |
| **herecmd_menu** | `true` / `false` | `false` | Show commands available in this location |
| **inventory_obj_cmd** | `true` / `false` | `true` | Display a command menu upon selecting an object in inventory |
| **middle_click_command** | *command* | *(none)* | Command upon clicking middle mouse button |
| **prefer_fast_move** | `true` / `false` | `false` | Swap slow move and fast move commands' key bindings |
| **rest_on_space** | `true` / `false` | `false` | Space bar is bound to the rest-command |
| **right_click_command** | *command* | *(none)* | Command upon clicking right mouse button |
| **run_spot_distance** | *number* | `0` | Longest distance for spotting a monster to stop running or travelling |
| **self_click_action** | `true` / `false` | `false` | Clicking the player character executes an action |
| **whatis_moveskip** | `true` / `false` | `false` | Skip same glyph when getting map location |

### 🐾 Pets & Companions

| Option Name | Values | Default | Description |
| :--- | :--- | :--- | :--- |
| **catbreed** | *string* | *(none)* | The breed of your (first) cat (e.g., catbreed:white persian) |
| **catgender** | *string* | *(none)* | The gender of your (first) cat (e.g., catgender:female) |
| **dogbreed** | *string* | *(none)* | The breed of your (first) dog (e.g., dogbreed:black labrador) |
| **doggender** | *string* | *(none)* | The gender of your (first) dog (e.g., doggender:male) |
| **horsegender** | *string* | *(none)* | The gender of your (first) horse (e.g., horsegender:female) |
| **partydetails** | `true` / `false` | `false` | Give detailed information for each pet in the status line |
| **partylinecolor** | `true` / `false` | `true` | Use colors for pet statistics in the status line |
| **partymultiline** | `true` / `false` | `false` | Print statistics of each pet using a separate status line |
| **pets_not_gifted** | `true` / `false` | `false` | You receive no gifted pets |
| **ramgender** | *string* | *(none)* | The gender of your (first) ram (e.g., ramgender:male) |
| **ramname** | *string* | *(none)* | The name of your (first) ram (e.g., ramname:Silver) |
| **underline_peaceful** | `true` / `false` | `true` | Underline peaceful monsters |
| **wolfgender** | *string* | *(none)* | The gender of your (first) direwolf (e.g., wolfgender:female) |
| **wolfname** | *string* | *(none)* | The name of your (first) direwolf (e.g., wolfname:Shadow) |

### 🔊 Audio & Sound

| Option Name | Values | Default | Description |
| :--- | :--- | :--- | :--- |
| **shield_effect_length** | *number* | `20` | Shield effect length |
| **sound_volume_ambient** | `0`-`100` | `20` | Ambient volume |
| **sound_volume_dialogue** | `0`-`100` | `20` | Dialogue volume |
| **sound_volume_effects** | `0`-`100` | `20` | Sound effect volume |
| **sound_volume_general** | `0`-`100` | `20` | Master volume |
| **sound_volume_music** | `0`-`100` | `20` | Music volume |
| **sound_volume_ui** | `0`-`100` | `20` | User interface sound volume |
| **talk_effect_length** | *number* | `20` | Talk effect length |
