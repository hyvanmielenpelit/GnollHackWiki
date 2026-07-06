![options](/uploads/Options/options2.webp)

> 👉 **GnollHack provides a vast array of configuration options that allow you to customize the user interface, gameplay mechanics, controls, and audio settings to fit your playstyle. This page serves as a comprehensive reference for all available options, whether you are playing on a modern graphical port or a classic terminal interface.**

## 🏁 Getting Started

- [[Accessing Options File]] — How to access the Options file on various platforms

## 🖥️ User Interface & Display

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **acoustics** | `true` / `false` | `true` | Can your character hear anything |
| **crawl_interval** | *(varies)* | `15` | Crawl movement interval in milliseconds |
| **dark_room** | `true` / `false` | `true` | Show floor outside line of sight differently |
| **detailed_weights** | `true` / `false` | `false` | Show object weights using more accurate units |
| **implicit_uncursed** | `true` / `false` | `true` | Omit "uncursed" from inventory |
| **inventory_weights_last** | `true` / `false` | `true` | Display object weights in parentheses after object name |
| **last_item_show_duration** | *(varies)* | `10` | Duration for showing last item in context menu |
| **legacy** | `true` / `false` | `true` | Show introductory message |
| **lit_corridor** | `true` / `false` | `false` | Show dark corridors as lit if in sight |
| **long_charge_text** | `true` / `false` | `false` | Long format for charges and rechargings in inventory |
| **menu_headings** | *(varies)* | *(varies)* | Text attribute for menu headings |
| **menucolors** | `true` / `false` | `true` | Use colors in menus |
| **menustyle** | *(varies)* | *(varies)* | User interface for object selection |
| **move_interval** | *(varies)* | `15` | Normal movement interval in milliseconds |
| **runmode** | *(varies)* | *(varies)* | Display frequency when `running' or `travelling' |
| **shield_effect_length** | *(varies)* | `20` | Shield effect length |
| **show_comparison_stats** | `true` / `false` | `true` | Show comparison statistics for items when picking them up |
| **show_damage_formula** | `true` / `false` | `false` | Show damage formula in examine |
| **show_dice_as_ranges** | `true` / `false` | `true` | Show dice as ranges (e.g., 2-12 instead of 2d6) |
| **show_weight_summary** | `true` / `false` | `true` | Show total weight at the end of inventory |
| **showrace** | `true` / `false` | `false` | Show your character by race rather than role |
| **showscore** | `true` / `false` | `true` | Show current score in status line |
| **skill_table_format** | `true` / `false` | `false` | Show skills in a table format rather than a list |
| **sortloot** | *(varies)* | *(varies)* | Sort object selection lists by description |
| **sparkle** | `true` / `false` | `true` | Display sparkly effect when resisting magic |
| **spell_table_format** | `true` / `false` | `false` | Show spells in a table format rather than a list |
| **talk_effect_length** | *(varies)* | `20` | Talk effect length |
| **tombstone** | `true` / `false` | `true` | Show tombstone when your character dies |
| **whatis_menu** | `true` / `false` | `false` | Show menu when getting a map location |
| **wiz_mstatusline** | `true` / `false` | `false` | Enable extended monster status line in wizard mode |
| **wizweight** | `true` / `false` | `false` | Show weights in inventory in wizard mode |
| **worn_shows_equipment** | `true` / `false` | `true` | Worn items shows equipment screen |

## ⚙️ Gameplay & Mechanics

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **autodescribe** | `true` / `false` | `true` | Describe terrain under cursor |
| **autodig** | `true` / `false` | `true` | Dig if moving and wielding a digging tool |
| **autokick** | `true` / `false` | `true` | Walking into a door attempts to kick it |
| **autoopen** | `true` / `false` | `true` | Walking into a door attempts to open it |
| **autopickup** | `true` / `false` | `false` | Automatically pick up objects |
| **autoquiver** | `true` / `false` | `false` | Fill empty quiver automatically when firing |
| **autoswap_launchers** | `true` / `false` | `true` | Automatically swap launchers on for ranged attacks and off for melee attacks |
| **autoswap_polearms** | `true` / `false` | `true` | Automatically swap polearms off for melee attacks |
| **autounlock** | `true` / `false` | `true` | Automatically unlock a locked door or chest |
| **baseacasbonus** | `true` / `false` | `true` | Display base armor class as a bonus rather than a number starting at 10 |
| **bones** | `true` / `false` | `true` | Allow loading bones files |
| **checkpoint** | `true` / `false` | `true` | Save game state after each level change |
| **confirm** | `true` / `false` | `true` | Ask before hitting tame or peaceful monsters |
| **disclose** | *(varies)* | *(varies)* | The kinds of information to disclose at end of game |
| **displace_peaceful** | `true` / `false` | `true` | Walking into a peaceful monster attempts to displace it |
| **dumplog** | `true` / `false` | `false` | Print dumplogs |
| **exchange_prompt** | `true` / `false` | `true` | Prompt when exchanging a worn object for another |
| **fixinv** | `true` / `false` | `true` | Inventory items keep their letters |
| **force_hint** | `true` / `false` | `false` | Force giving hints regardless of other settings |
| **force_invmenu** | `true` / `false` | `true` | Commands asking for inventory item show a menu |
| **goldX** | `true` / `false` | `false` | Classify gold as unknown or uncursed |
| **ignore_stopping** | `true` / `false` | `false` | Travelling is not interrupted by items, doors, or engravings |
| **knapsack_prompt** | `true` / `false` | `true` | Prompt for an action when inventory is full |
| **lootabc** | `true` / `false` | `false` | Use a/b/c rather than o/i/c when looting |
| **max_hint_difficulty** | *(varies)* | `10` | Maximum difficulty level for showing hints |
| **mention_walls** | `true` / `false` | `false` | Give feedback when walking into walls |
| **metric_system** | `true` / `false` | `false` | Use the metric system for weights |
| **monpolycontrol** | `true` / `false` | `false` | Control monster polymorphs |
| **multishot_always_fire** | `true` / `false` | `false` | Attack always as many times as possible |
| **packorder** | *(varies)* | *(varies)* | The inventory order of the items in your pack |
| **paranoid_confirmation** | *(varies)* | *(varies)* | Extra prompting in certain situations |
| **pickup_burden** | *(varies)* | *(varies)* | Maximum burden picked up before prompt |
| **pickup_thrown** | `true` / `false` | `true` | Autopickup thrown items |
| **pickup_types** | *(varies)* | *(varies)* | Types of objects to pick up automatically |
| **pile_limit** | *(varies)* | *(varies)* | Threshold for 'there are many objects here' |
| **player_selection** | *(varies)* | *(varies)* | Choose character via dialog or prompts |
| **playmode** | *(varies)* | *(varies)* | Classic or modern play, non-scoring explore or casual mode, or debug mode |
| **pushweapon** | `true` / `false` | `false` | Previous weapon goes to secondary slot |
| **rlecomp** | `true` / `false` | `true` | Use rlecomp |
| **sanity_check** | `true` / `false` | `false` | Perform data sanity checks |
| **scores** | *(varies)* | *(varies)* | The parts of the score list you wish to see |
| **search_box_traps** | `true` / `false` | `true` | Search command searches boxes for traps first |
| **selectsaved** | `true` / `false` | `true` | Select a saved game at program start |
| **sortpack** | `true` / `false` | `true` | Group inventory items by type |
| **spellorder** | *(varies)* | *(varies)* | Default spell sorting |
| **stash_on_autopickup** | `true` / `false` | `false` | Stash items into a container on autopickup (but no thrown if pick_thrown is on) |
| **suppress_alert** | *(varies)* | *(varies)* | Suppress alerts about version-specific features |
| **swap_rhand_only** | `true` / `false` | `false` | Swap right hand weapon only rather than objects in both hands |
| **takeoff_uses_all** | `true` / `false` | `true` | Takeoff command uses takeoffall command rather than normal implementation |
| **tellexp** | `true` / `false` | `true` | Report experience points gained |
| **verbose** | `true` / `false` | `true` | Enable longer messages |
| **wiz_alwaysenc** | `true` / `false` | `false` | Always generate an encounter in wizard mode |
| **zerocomp** | `true` / `false` | `true` | Use zerocomp |


## 🖱️ Controls & Input

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **clickfire** | `true` / `false` | `true` | Enable firing via mouse click |
| **clicklook** | `true` / `false` | `true` | Enable looking via mouse click |
| **clickpole** | `true` / `false` | `true` | Enable use of polearm via mouse click |
| **cmdassist** | `true` / `false` | `true` | Give help for errors on direction input |
| **engrave_quickstyle** | *(varies)* | `0` | Stylus selection style for engrave quick command |
| **engrave_quicktext** | *(varies)* | *(none)* | The preset text for engrave quick command |
| **help** | `true` / `false` | `true` | Show all available info when using whatis-command |
| **herecmd_menu** | `true` / `false` | `false` | Show commands available in this location |
| **inventory_obj_cmd** | `true` / `false` | `true` | Display a command menu upon selecting an object in inventory |
| **middle_click_command** | *(varies)* | *(none)* | Command upon clicking middle mouse button |
| **mouse_support** | *(varies)* | *(varies)* | Game receives click info from mouse |
| **number_pad** | *(varies)* | *(varies)* | Use the number pad for movement |
| **prefer_fast_move** | `true` / `false` | `false` | Swap slow move and fast move commands' key bindings |
| **rest_on_space** | `true` / `false` | `false` | Space bar is bound to the rest-command |
| **right_click_command** | *(varies)* | *(none)* | Command upon clicking right mouse button |
| **run_spot_distance** | *(varies)* | `0` | Longest distance for spotting a monster to stop running or travelling |
| **self_click_action** | `true` / `false` | `false` | Clicking the player character executes an action |
| **travel** | `true` / `false` | `true` | Enable traveling via mouse click |
| **travel_debug** | `true` / `false` | `false` | Display debugging graphics for travel algorithm |
| **whatis_filter** | *(varies)* | *(varies)* | Filter coordinate locations when targeting next or previous |
| **whatis_moveskip** | `true` / `false` | `false` | Skip same glyph when getting map location |


## 🐾 Pets & Companions

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **catbreed** | *(varies)* | *(none)* | The breed of your (first) cat (e.g., catbreed:white persian) |
| **catgender** | *(varies)* | *(none)* | The gender of your (first) cat (e.g., catgender:female) |
| **catname** | *(varies)* | *(none)* | The name of your (first) cat (e.g., catname:Tabby) |
| **dogbreed** | *(varies)* | *(none)* | The breed of your (first) dog (e.g., dogbreed:black labrador) |
| **doggender** | *(varies)* | *(none)* | The gender of your (first) dog (e.g., doggender:male) |
| **dogname** | *(varies)* | *(none)* | The name of your (first) dog (e.g., dogname:Fang) |
| **horsegender** | *(varies)* | *(none)* | The gender of your (first) horse (e.g., horsegender:female) |
| **horsename** | *(varies)* | *(none)* | The name of your (first) horse (e.g., horsename:Silver) |
| **pets_not_gifted** | `true` / `false` | `false` | You receive no gifted pets |
| **pettype** | *(varies)* | *(varies)* | Your preferred initial pet type |
| **ramgender** | *(varies)* | *(none)* | The gender of your (first) ram (e.g., ramgender:male) |
| **ramname** | *(varies)* | *(none)* | The name of your (first) ram (e.g., ramname:Silver) |
| **safe_pet** | `true` / `false` | `true` | Prevent you from hitting pets |
| **wolfgender** | *(varies)* | *(none)* | The gender of your (first) direwolf (e.g., wolfgender:female) |
| **wolfname** | *(varies)* | *(none)* | The name of your (first) direwolf (e.g., wolfname:Shadow) |

## 🧬 Character & Roleplay

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **align** | *(varies)* | *(varies)* | Your starting alignment (lawful, neutral, or chaotic) |
| **blind** | `true` / `false` | `false` | Your character is permanently blind |
| **female** | `true` / `false` | `false` | Is your character female |
| **fruit** | *(varies)* | *(varies)* | The name of a fruit you enjoy eating |
| **gender** | *(varies)* | *(varies)* | Your starting gender (male or female) |
| **luggagename** | *(varies)* | *(varies)* | The name of your (first) luggage (e.g., luggagename:Albert) |
| **name** | *(varies)* | *(varies)* | Your character's name (e.g., name:Merlin-W) |
| **nudist** | `true` / `false` | `false` | Start your character without armor |
| **race** | *(varies)* | *(varies)* | Your starting race (e.g., Human, Elf) |
| **role** | *(varies)* | *(varies)* | Your starting role (e.g., Barbarian, Valkyrie) |

## 🏛️ Legacy Versions

> ℹ️ **Note:** These options are shared across multiple legacy interfaces (such as TTY/ASCII, Curses, and/or the legacy Windows GUI). They are not used by the modern .NET MAUI frontend.

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **extmenu** | `true` / `false` | `true` | Use menu for getting extended commands (supported by TTY/ASCII, Curses, and Legacy Windows GUI) |
| **menu_deselect_all** | *(varies)* | *(varies)* | Deselect all items in a menu (supported by TTY/ASCII and Curses) |
| **menu_deselect_page** | *(varies)* | *(varies)* | Deselect all items on this page of a menu (supported by TTY/ASCII and Curses) |
| **menu_first_page** | *(varies)* | *(varies)* | Jump to the first page in a menu (supported by TTY/ASCII and Curses) |
| **menu_invert_all** | *(varies)* | *(varies)* | Invert all items in a menu (supported by TTY/ASCII and Curses) |
| **menu_invert_page** | *(varies)* | *(varies)* | Invert all items on this page of a menu (supported by TTY/ASCII and Curses) |
| **menu_last_page** | *(varies)* | *(varies)* | Jump to the last page in a menu (supported by TTY/ASCII and Curses) |
| **menu_next_page** | *(varies)* | *(varies)* | Goto the next menu page (supported by TTY/ASCII and Curses) |
| **menu_previous_page** | *(varies)* | *(varies)* | Goto the previous menu page (supported by TTY/ASCII and Curses) |
| **menu_search** | *(varies)* | *(varies)* | Search for a menu item (supported by TTY/ASCII and Curses) |
| **menu_select_all** | *(varies)* | *(varies)* | Select all items in a menu (supported by TTY/ASCII and Curses) |
| **menu_select_page** | *(varies)* | *(varies)* | Select all items on this page of a menu (supported by TTY/ASCII and Curses) |
| **msg_window** | *(varies)* | *(varies)* | The type of message window required LIFO/FIFO (supported by TTY/ASCII and Curses) |
| **roguesymset** | *(varies)* | *(varies)* | Load a set of rogue display symbols from the symbols file (supported by TTY/ASCII and Curses) |
| **symset** | *(varies)* | *(varies)* | Load a set of display symbols from the symbols file (supported by TTY/ASCII and Curses) |
| **windowchain** | *(varies)* | *(varies)* | Window processor to use (supported by TTY/ASCII and Curses) |
| **windowtype** | *(varies)* | *(varies)* | Windowing system to use (supported by TTY/ASCII, Curses, and Legacy Windows GUI) |

## ⌨️ ASCII

> ℹ️ **Note:** These options pertain to the legacy ASCII version of the game. They are not used by the modern versions of GnollHack.

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **DECgraphics** | *(varies)* | *(varies)* | Load DECGraphics display symbols |
| **IBMgraphics** | *(varies)* | *(varies)* | Load IBMGraphics display symbols |
| **Macgraphics** | *(varies)* | *(varies)* | Load MACGraphics display symbols |
| **altmeta** | `true` / `false` | `true` | Treat 'ESC c' as M-c |
| **ascii_map** | `true` / `false` | `false` | Show map as text |
| **classic_colors** | `true` / `false` | `false` | Use classic colors for boulders and floor symbols |
| **classic_statue_symbol** | `true` / `false` | `false` | Use classic symbol \'`\' for statues |
| **color** | `true` / `false` | `true` | Use color in map |
| **dungeon** | *(varies)* | *(varies)* | The symbols to use in drawing the dungeon map |
| **effects** | *(varies)* | *(varies)* | The symbols to use in drawing special effects |
| **eight_bit_tty** | `true` / `false` | `false` | Send 8-bit characters directly to terminal |
| **enablettyarrowkeys** | `true` / `false` | `false` | Enable tty arrow keys |
| **hilite_pet** | `true` / `false` | `false` | Use highlight for pets |
| **hilite_pile** | `true` / `false` | `false` | Highlight piles of items |
| **ibm2utf8** | `true` / `false` | `false` | Convert CP437 symbols to UTF8 format before output |
| **menu_overlay** | `true` / `false` | `true` | Menus overlay and align to right |
| **monsters** | *(varies)* | *(varies)* | The symbols to use for monsters |
| **null** | `true` / `false` | `true` | Allow nulls to be sent to terminal |
| **objects** | *(varies)* | *(varies)* | The symbols to use for objects |
| **petattr** | *(varies)* | *(varies)* | Attributes for highlighting pets |
| **show_decorations** | `true` / `false` | `true` | Show decorations via colors in ASCII mode |
| **silent** | `true` / `false` | `true` | Don't use terminal bell |
| **standout** | `true` / `false` | `false` | Use standout for --more-- |
| **traps** | *(varies)* | *(varies)* | The symbols to use in drawing traps |
| **underline_peaceful** | `true` / `false` | `true` | Underline peaceful monsters |
| **use_darkgray** | `true` / `false` | `true` | Use bold black color instead of blue |
| **use_inverse** | `true` / `false` | `true` | Display detected monsters in inverse |
| **video** | *(varies)* | *(varies)* | Method of video updating |
| **videocolors** | *(varies)* | *(varies)* | Color mappings for internal screen routines |
| **videoshades** | *(varies)* | *(varies)* | Gray shades to map to black/gray/white |
| **vt_tiledata** | `true` / `false` | `false` | Use VT codes for tiles |
| **whatis_coord** | *(varies)* | *(varies)* | Show coordinates when auto-describing cursor position |

## 🖥️ Curses Interface

> ℹ️ **Note:** These options are specific to the curses terminal interface. They are generally not applicable to the modern GUI versions of GnollHack.

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **align_message** | *(varies)* | `top` | Message window alignment |
| **align_status** | *(varies)* | `top` | Status window alignment |
| **autostatuslines** | `true` / `false` | `false` | Adjust the number of status lines automatically |
| **cursesgraphics** | *(varies)* | *(varies)* | Load curses display symbols |
| **fullstatuslineorder** | `true` / `false` | `true` | Use full status line order |
| **guicolor** | `true` / `false` | `true` | Use color for UI |
| **here_window_size** | *(varies)* | `20` | Number of rows in the here window |
| **hicolor** | *(varies)* | *(varies)* | Same as palette, only order is reversed |
| **show_weapon_style** | `true` / `false` | `true` | Show used weapon type in status line |
| **showexp** | `true` / `false` | `true` | Show experience points in status line |
| **showmove** | `true` / `false` | `true` | Show current movement speed in status line |
| **showrealtime** | `true` / `false` | `true` | Show elapsed wall-clock time in status line |
| **status_updates** | `true` / `false` | `true` | Allow the status lines to update |
| **statushilites** | *(varies)* | *(varies)* | Highlight control |
| **statuslines** | *(varies)* | *(varies)* | 2 to 8 lines for status display |
| **term_cols** | *(varies)* | *(varies)* | Number of columns |
| **term_rows** | *(varies)* | *(varies)* | Number of rows |
| **time** | `true` / `false` | `false` | Display game turns in status line |
| **windowborders** | *(varies)* | *(varies)* | 0 (off), 1 (on), 2 (auto) |
| **windowcolors** | *(varies)* | *(varies)* | The foreground/background colors of windows |

## 🪟 Legacy Windows GUI

> ℹ️ **Note:** These options are specific to the legacy Windows GUI port (`GnollHackW.exe`). They are not applicable to the modern .NET MAUI frontend.

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **blinking_cursor_on_tiles** | `true` / `false` | `false` | Display a blinking cursor when using tiles |
| **font_map** | *(varies)* | *(varies)* | The font to use in the map window |
| **font_menu** | *(varies)* | *(varies)* | The font to use in menus |
| **font_message** | *(varies)* | *(varies)* | The font to use in the message window |
| **font_size_menu** | *(varies)* | *(varies)* | The size of the menu font |
| **font_size_message** | *(varies)* | *(varies)* | The size of the message font |
| **font_size_status** | *(varies)* | *(varies)* | The size of the status font |
| **font_size_text** | *(varies)* | *(varies)* | The size of the text font |
| **font_status** | *(varies)* | *(varies)* | The font to use in status window |
| **font_text** | *(varies)* | *(varies)* | The font to use in text windows |
| **fullscreen** | `true` / `false` | `false` | Toggle fullscreen |
| **herewindow** | `true` / `false` | `true` | Show here window |
| **hitpointbar** | `true` / `false` | `false` | Show colored bar for hit points |
| **map_mode** | *(varies)* | *(varies)* | Map display mode under Windows |
| **menu_tab_sep** | `true` / `false` | `false` | Menu formatting |
| **msghistory** | *(varies)* | `20` | Number of top line messages to save |
| **news** | `true` / `false` | `true` | Show any news at game start |
| **palette** | *(varies)* | *(varies)* | Palette |
| **perm_invent** | `true` / `false` | `false` | Show permanent inventory window |
| **popup_dialog** | `true` / `false` | `false` | Use popup dialog |
| **preferred_screen_scale** | *(varies)* | *(varies)* | Preferred screen scale |
| **scroll_amount** | *(varies)* | *(varies)* | Amount to scroll map when scroll_margin is reached |
| **scroll_margin** | *(varies)* | *(varies)* | Scroll map when this far from the edge |
| **show_buff_timer** | `true` / `false` | `false` | Show buff timer on tiles |
| **show_grid** | `true` / `false` | `false` | Show grid between tiles |
| **show_tile_mon_hp_bar** | `true` / `false` | `false` | Show monster hit points on tiles |
| **show_tile_pet_hp_bar** | `true` / `false` | `false` | Show pet hit points on tiles |
| **show_tile_u_hp_bar** | `true` / `false` | `false` | Show player hit points on tiles |
| **splash_screen** | `true` / `false` | `true` | Show splash screen |
| **sound_volume_ambient** | *(varies)* | `20` | Ambient volume |
| **sound_volume_dialogue** | *(varies)* | `20` | Dialogue volume |
| **sound_volume_effects** | *(varies)* | `20` | Sound effect volume |
| **sound_volume_general** | *(varies)* | `20` | General game volume |
| **sound_volume_music** | *(varies)* | `20` | Music volume |
| **sound_volume_ui** | *(varies)* | `20` | User interface sound volume |
| **tile_file** | *(varies)* | *(varies)* | Name of tile file |
| **tile_height** | *(varies)* | *(varies)* | Height of tiles |
| **tile_width** | *(varies)* | *(varies)* | Width of tiles |
| **toptenwin** | `true` / `false` | `false` | Show top scores in window |
| **vary_msgcount** | *(varies)* | *(varies)* | Show more old messages at a time |

## 🗑️ Obsolete

> ⚠️ **Warning:** These options are obsolete, deprecated, or only used by legacy versions of the game.

| Option Name | Values | Default | Description |
| :---------- | :----: | :-----: | :---------- |
| **altkeyhandler** | *(varies)* | *(varies)* | Alternate key handler |
| **animation_interval** | *(varies)* | `20` | Animation frame interval in milliseconds |
| **asksavedisk** | `true` / `false` | `false` | Prompt for saving to a disk |
| **BIOS** | `true` / `false` | `false` | Use IBM ROM BIOS calls |
| **boulder** | *(varies)* | *(varies)* | Deprecated (use S_boulder in sym file instead) |
| **checkspace** | `true` / `false` | `true` | Check disk space on a floppy disk |
| **fast_map** | `true` / `false` | `true` | Use optimized, less flexible map display |
| **flush** | `true` / `false` | `false` | Use flush on Amiga |
| **font_size_map** | *(varies)* | *(varies)* | The size of the map font |
| **ignintr** | `true` / `false` | `false` | Ignore interrupt signals |
| **large_font** | `true` / `false` | `false` | Obsolete: use large font |
| **mail** | `true` / `false` | `true` | Enable the mail daemon |
| **menu_objsyms** | `true` / `false` | `false` | Show object symbols in menus |
| **page_wait** | `true` / `false` | `true` | Page wait on Mac |
| **partydetails** | `true` / `false` | `false` | Give detailed information for each pet |
| **partylinecolor** | `true` / `false` | `true` | Use colors for pet statistics |
| **partymultiline** | `true` / `false` | `false` | Print statistics of each pet on a separate status line |
| **preload_tiles** | `true` / `false` | `true` | Preload tiles |
| **rawio** | `true` / `false` | `false` | Allow use to raw I/O |
| **softkeyboard** | `true` / `false` | `false` | Soft keyboard |
| **soundcard** | *(varies)* | *(varies)* | Type of sound card to use |
| **subkeyvalue** | *(varies)* | *(varies)* | Override keystroke value |
| **tiled_map** | `true` / `false` | `true` | Tiled map |
| **timed_delay** | `true` / `false` | `true` | Use time delay |
| **wraptext** | `true` / `false` | `false` | Wrap text |

