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

## Old Options from NetHack

- [NetHack options on NetHack wiki](https://nethackwiki.com/wiki/Options)

## New Options in GnollHack

### Boolean Options

- autostatuslines — Automatically adjust message lines and status lines in the curses interface.
- autounlock — Automatically unlock a locked door or chest
- baseacasbonus — Display base armor class as a bonus rather than a number starting at 10
- blinking_cursor_on_tiles — Display a blinking cursor when using tiles
- classic_statue_symbol — Use classic symbol '`' for statues
- clickfire — Enable firing via mouse click
- detailed_weights — Show object weights using more accurate units 
- displace_peaceful — Walking into a peaceful monster attempts to displace it
- exchange_prompt — Prompt when exchanging a worn object for another
- force_hint — Force giving hints regardless of other settings
- fullstatuslineorder — Use full status line order
- herewindow — Show here window
- ibm2utf8 — Convert CP437 symbols to UTF8 format before output
- inventory_obj_cmd — Display a command menu upon selecting an object in inventory
- inventory_weights_last — Display object weights in parentheses after object name
- knapsack_prompt — Prompt for an action when knapsack is full
- long_charge_text — Long format for charges and rechargings in inventory (X charges, Y rechargings)
- metric_system — Use the metric system for weights (kilograms and grams)
- partylinecolor — Use colors for pet statistics in the status line
- partydetails — Give detailed information for each pet in the status line
- partymultiline — Print statistics of each pet using a separate status line
- prefer_fast_move — Swap slow move and fast move commands' key bindings
- search_box_traps — Search command searches boxes for traps first
- self_click_action — Clicking the player character executes an action
- showmove — Show current movement speed in the status line
- showrealtime — Show elapsed wall-clock time in the status line
- show_buff_timer — Show buff timer when using tiles
- show_decorations — Show decorations via colors in ASCII mode
- show_grid — Show grid between tiles
- show_tile_mon_hp_bar — Show monster hit points on tiles
- show_tile_pet_hp_bar — Show pet hit points on tiles
- show_tile_u_hp_bar — Show player hit points on tiles
- show_weapon_style — Show used weapon type in the status line
- show_weight_summary — Show total weight at the end of inventory
- skill_table_format — Show skills in a table format rather than a list
- spell_table_format — Show spells in a table format rather than a list
- swap_rhand_only — Swap right hand weapon only rather than objects in both hands
- takeoff_uses_all — The `takeoff` command uses `takeoffall` command rather than normal implementation
- tellexp — Report experience points gained
- underline_peaceful — Underline peaceful monsters

### Compound Options

- animation_interval — Animation frame interval in milliseconds
- catbreed — The breed of your (first) cat (e.g., catbreed:white persian)
- catgender — The gender of your (first) cat (e.g., catgender:female)
- crawl_interval — Crawl movement interval in milliseconds
- dogbreed — The breed of your (first) dog (e.g., dogbreed:black labrador)
- doggender — The gender of your (first) dog (e.g., doggender:male)
- here_window_size — Number of rows in the here window
- horsegender — The gender of your (first) horse (e.g., horsegender:female)
- last_item_show_duration — Duration for showing last item in context menu
- luggagename — The name of your (first) luggage (e.g., luggagename:Albert)
- max_hint_difficulty — Maximum difficulty level for showing hints
- move_interval — Normal movement interval in milliseconds
- ramgender — The gender of your (first) ram (e.g., ramgender:male)
- ramname — The name of your (first) ram (e.g., ramname:Silver)
- sound_volume_ambient — Ambient volume
- sound_volume_dialogue — Dialogue volume
- sound_volume_effects — Sound effect volume
- sound_volume_general — Master volume
- sound_volume_music — Music volume
- sound_volume_ui — User interface sound volume
- spellorder — Default spell sorting
- talk_effect_length — Talk effect length
- wolfgender — The gender of your (first) direwolf (e.g., wolfgender:female)
- wolfname — The name of your (first) direwolf (e.g., wolfname:Shadow)