## Modern Port Settings

These settings relate to GnollHack's **modern ports** only.

## General Settings

### GPU Acceleration

Enables and disables the GPU acceleration of the game. If disabled, the game uses CPU for rendering graphics.

_Default: On_

Note that GPU acceleration can cause crashes on some systems.

### Graphics Style

- **Tiles:** Shows the game in 2D tile graphics. _(Default)_
- **ASCII:** Shows the game in ASCII graphics, i.e. in text.

### Map FPS

Determines the max refresh rate of the game. This can be used to save battery or to make the game smoother.

Options range from 20 FPS to 80 FPS.

_Default: 60_

### Screen Scale

Custom scale to make UI componenets larger or smaller than normal.

_Default: 100%_

### Cursor Style

_ASCII graphics only_

Determines the way how the player character is identified in the game.

- **Green Block** _(Default)_
- **Blinking Underline**

### Hide Navigation

_Android only_

Determines whether to hide the operating system navigation buttons in the bottom of the screen. 

_Default: On_

### Hide Status Bar

_iOS only_

Determines if the top status bar of the operating system is hidden.

_Default: On_

### Show Battery

Displays a battery icon in the status bar indicating the current battery level.

_Default: Off_

### Show FPS

Displays a frames-per-second icon in the status bar indicating the current refresh rate of the game.

_Default: Off_

### Show Zoom

Displays a zoom icon in the status bar indicating the current zoom level of the map.

_Default: Off_

### Silent Mode

- **Off:** The game plays game sounds and music. _(Default)_
- **On:** Game sounds and music are not played.

### Dark Mode

- **Off:** Light mode: Menu and text window backgrounds are beige and texts are black. _(Default)_
- **On:** Dark mode: Menu and text window backgrounds are black and texts are white.

### Tournament Mode

Toggles several other settings to values required by tournaments like Junethack. Also forces on Classic game mode.

_Default: Off_

## Adventuring Settings

### Starting and Gifted Pets

Determines whether the player starts with a pet and gets new pets in certain special situations. Turn off if you are attempting a petless conduct.

_Default: On_

### Allow Ghost Levels

Determines if the game uses so called bones files of dead characters.

_Default: On_

## Interface Settings

### Simple Command Layout

- **Off:** Advanced Command Layout
    - Shows two rows of commands in the bottom of the game screen.
    - Shows extra commands in more commands.
- **On:** Simple Command Layout _(Default)_
    - Shows one row of commands in the bottom of the game screen.
    - Shows only most important extra commands in more commands.

### Alternative Zoom Button

Displays the alternative zoom toggle button in the top-right corner of the map. Alternative zoom is a third adjustable zoom level that may sometimes be useful.

_Default: Off_

### Travel Mode Button

Displays the travel mode toggle button in the top-right corner of the map. Travel mode toggles between moving to the tapped / clicked location vs. moving by tapping / clicking arrows around the character.

_Default: Off_

### Auto-Dig Button

Displays the auto-dig toggle button in the top-right corner of the map. This button can be used to toggle the auto-dig option on and off. Auto-dig determines whether clicking a stone wall causes the player to start digging the location when wielding a digging tool.

_Default: Off_

### Ignore Stopping Button

Displays the ignore stopping toggle button in the top-right corner of the map. This button can be used to toggle the ignore stopping option on and off. Ignore stopping determines whether travelling is stopped by items, doors, or engravings.

_Default: Off_

### Desktop Buttons

Determines whether Stats and Equipment buttons are shown on the left and right side of command buttons, instead of being invisible at the top-left and top-right corners of the screen.

_Default: Off on mobile, On on desktop_

### Classic Status Bar

- **Off:** Shows the modern graphical game status bar in the game. _(Default)_
- **On:** Shows the game status bar in text in the NetHack style.

### Desktop Status Bar

Displays ability scores and other extra information on the status bar.

_Default: Off on mobile, On on desktop_

### Show Score

Displays the game score on the status bar.

_Default: Off_

### Show XP

Displays experience points on the status bar.

_Default: Off_

### Right-aligned on 2nd row

Moves the display location of score, experience points and gold to the 2nd status bar row.

_Default: Off_

### Show Status Screen

Toggle for showing the status screen. The same as tapping the middle area of the status bar at the top of the screen.

_Default: Off_

### Grid

Determines if the game shows grid lines in the game for easier tile position discernment.

_Default: Off_

### Hit Point Bars

Determines if the game shows hit point bars under the player character, NPCs, pets, and monsters.

_Default: Off_

### Player Mark

Determines if a green targeting icon is displayed above the player character. 

_Default: Off_

### Targeting

Determines if a red targeting icon is displayed above hostile monsters. 

_Default: Off_

### Show Pets

Determines if the game shows pet icons in the top of the game screen (under the game status bar).

_Default: On_

### Pet Rows

Determines how many rows of pet icons are allowed in the top of the screen.

Options range from 1 to 4.

_Default: 2_

### Orbs

Determines if health and mana orbs are shown in the top left corner of the screen.

_Default: On_

### Show Max Hit Points

Determines if maximum hit points are shown under the current hit points in the health orb.

_Default: Off_

### Show Max Mana

Determines if maximum mana is shown under the current mana in the mana orb. 

_Default: Off_

### Messages

Determines the number of messages shown in the bottom left corner of the screen.

Options range from 1 to 50. 

_Default: 5_

#### Show All

Toggle for showing all messages. The same as tapping the message area in the game screen.

### Walk Arrows

Determines if there are walk arrows when Travel Mode is disabled.

_Default: On_

### Lighter Unlit Areas

Determines the shading level of unlit areas. 

- **Off:** Darker
- **On:** Lighter _(Default)_

### Draw Wall Ends

Determines if the game draws wall end graphics. Can be disabled to save processor time.

_Default: On_

### Breathing Animations

Determines if the game shows the breathing animations of various creatures.

_Default: On_

### Default Auto-Center

Determines if the Auto-Center button in the game screen is enabled by default.

_Default: On_

### Menu Fade Effects

Determines whether the texts in the menu and text pages fade in and out when opening and closing the page.

_Default: On_

### Improved Menu Images

Determines the algorithm for scaling menu images.

- **Off:** Nearest neighbour (faster)
- **On:** Bilinear interpolation (slower) _(Default)_

### Highlighted Menu Keys
Determines the coloring of hotkeys of menu items.

- **Off:** Grayed _(Default on mobile)_
- **On:** Black/white in light/dark mode  _(Default on desktop)_

### Show Dice As Ranges

Determines the format in which die throws in the game are displayed.

- **Off:** XdY format where X is the number of dice and Y is the number of sides in the dice (e.g., 2d6)
- **On:** A-B format where A is the lowest possible result and B is the highest possible result (e.g., 2-12) _(Default)_

## Behavior

### Empty Wish is Nothing

Determines what happens if the wish in the game is left blacnk. Keep on to preserve wishless conduct from unexpected wishes.

- **Off:** A random item is received
- **On:** Nothing is received _(Default)_

### Character Click Action

Clicking or tapping on the player character executes an action appropriate for the location, e.g., descending the stairs if standing at a stairway downwards.

_Default: Off_

### OK on Double Click

Double-clicking a menu item also presses OK button automatically in menus.

_Default: Off_

### Traditional Get Position

When asked to select a location, the location is selected by moving around a tile-based game cursor using arrow icons or keyboard, rather than clicking a location on the map.

_Default: Off_

### Auto-Dig

Automatically dig a clicked or tapped wall when wielding a digging tool.

Mirrors the *autodig* option in the game.

_Default: On_

### Ignore Stopping

Travelling does not stop at items, doors, or engravings.

Mirrors the *ignore_stopping* option in the game.

_Default: Off_

## Bar Commands

This section enables you to specify which commands are displayed in the command bar.

## Volume

- Master Volume — Changes the volume of all sounds and music
- Music Volume — Changes the volume of music
- Ambient Volume — Changes the volume of ambient sounds
- Dialogue Volume — Changes the volume of voice overs
- Effects Volume — Changes the volume of sound effects
- Interface Volume — Changes the volume of interface sounds, such as button clicks

## Forum Posting

### Post Game Progress

Posts updates of new events of you journey to a selected channel on a Discord Server.

_Default: Off_

### Webhook Link

Enables you to specify the webhook link to the channel on a Discord server to where your game progress is posted.

_Default: player-log channel on the GnollHack Discord server_

## Server Posting

### Account

Enables you to access and specify the GnollHack Server address

_Default: account.gnollhack.com_

### User Name

Your user name on the GnollHack server.

### Password

Your password on the GnollHack server.

### Posting

Enables you to specify the connection string to access and post information to the GnollHack Server.

_Default: a connection string to account.gnollhack.com_

### Post Top Scores

Posts your score to the GnollHack Server when your game has ended.

_Default: Off_

### Share Bones Files

Determines whether bones files containing information on the level where your character has died is posted to the server. Other players can consequently meet the character's ghost in their own games. Also, you receive other peoples' bones files, and can encounter their dead characters' ghosts if Allow Ghost Levels setting is on.

_Default: Off_

### Use Blacklist

Determines whether to use blacklist or whitelist in blocking unwanted users' bones files.

_Default: Off_

### Whitelist/Blacklist

A comma or space separated list of user names on the GnollHack server.

- **Whitelist:** List of allowed user names.
- **Blacklist:** List of blocked user names.

## Replays

### Record Game

Determines whether the game save a replay recording of your game.

_Default: Off_

### Show Recording

Determines whether a red dot appears on the status bar to indicate that game recording is on.

_Default: On_

### Auto-Upload to Cloud

Determines whether the saved replay is automatically uploaded to an Azure cloud storage.

_Default: Off_

### Cloud Storage

Enables you to specify the connection string an Azure cloud storage to where your game recording is uploaded.

_Default: GnollHack Azure Cloud Storage_

## System Settings

### Developer Mode

Activates [[Developer Mode]], which does the following things:

- Enables choosing of [[Wizard Mode]].
- Enables editing of the [[options]] file.

_Default: Off_

### Debug Logging

Debug information is written in the app log.

_Default: Off_

### Low-Level Logging

Extensive logging of various low-level events. Can clog the app log quickly.

_Default: Off_

### Debug Post Channel

Use an alternative post channel instead of the one specified under Post Game Progress.

_Default: Off_

### Show Memory

Shows the current managed memory usage on the game screen.

_Default: Off_

### Load Sound Banks

Determines if FMOD sound banks are loaded. Can be disabled to save memory. However, if disabled, the game will have no sounds.

_Default: On_

### Streaming Banks to Memory

Determines if streaming sound banks are loaded to memory.

- **Off:** Streaming sound banks are streamed from inside the AAB file (or wherever it is unpacked). This uses less memory. _(Default)_
- **On:** Streaming sound banks are read to memory and streamed from there. This uses more memory, which can lead to out-of-memory crashes.

### Streaming Banks to Disk

Determines if streaming banks are copied to the disk.

- **Off:** Streaming sound banks are streamed from inside the AAB file (or wherever it is unpacked). This uses less storage space. _(Default)_
- **On:** Streaming sound banks are copied to the storage and streamed from there. This uses consideraebly more storage space, since streaming banks are large in size.

### Longer Message History

The game will show over 16000 last messages instead of 250 last messages. For performance reasons, the setting will automatically switch off upon adding new messages or restarting the game. Also, a search bar appears.

_Default: Off_

### Hide Message History

The game will not show latest messages at all. Could be used to take cleaner screenshots, for example.

_Default: Off_

### Use Single Dumplog

- **Off:** The game asks whether the user wants to open the plain text dumplog or the HTML dumplog in the top scores screen.
- **On:** The game opens the plain text dumplog or the Html dumplog based on the **Use HTML Dumplog** setting. _(Default)_

### Use HTML Dumplog

If **Use Single Dumplog** is **On**, this setting does the following:

- **Off:** The game opens a **plain text dumplog** in the top scores screen.
- **On:** The game opens a **HTML dumplog** in the top scores screen. _(Default)_

If **Use Single Dumplog** is **Off**, this setting does nothing.

### GZip Replay Compression

- **Off:** Zip format is used.
- **On:** GZip format is used. _(Default)_

### Platform Render Loop

- **Off:** .NET MAUI animation system is used to create the game render loop.
- **On:** A platform-specific render loop linking the game refresh rate to the display refresh rate is used. _(Default)_

### GL Only on Map

- **Off:** Skia GL rendering is used on map, menu pages, text pages, and more commands page. _(Default)_
- **On:** Skia GL rendering is used on only on map. Other pages use Skia's CPU-based rendering.

### Mipmapping On Map

Toggles whether mipmapping is used in map rendering. Mostly obsolete.

_Default: Off_

### Adjust Rectangles

Toggles whether the game adjusts tile rectangles to prevent Skia from drawing non-existing lines between tiles.

_Default: On_

### Default Vi-Keys

- **Off**: The default setting for the `number_pad` option is `2` *(=use numbers for movement)*. _(Default)_
- **On**: The default setting for the `number_pad` option is `0` *(=use vi-keys for movement)*.

### On Switching Apps

Determines what happens when the player switches away from GnollHack to another app.

- **Save Game**: The game is automatically saved, and restored when the player returns. This results in closing various input, menu and text pages, so the game state may not be exactly where the player left it. A notable case is in the middle of wishing for an item, where the game makes a checkpoint instead prior to wishing. _(Default)_
- **Checkpoint**: The game creates a checkpoint, so if the app is terminated later without saving, the game recovers to the checkpoint but a crash is recorded. However, if the player returns to the game before it is terminated in the background, the game state will be exactly where he/she left it. It also works in the middle of wishing, where this is default special behavior.

### Map GPU Cache

Determines the cache size for Skia GPU rendering for the map. If the game is slow in GPU rendering, you can try to increase the cache, but large numbers can lead to the app running out of memory.

### Menu GPU Cache

Determines the cache size for Skia GPU rendering for the menu, text, and more commands pages.
