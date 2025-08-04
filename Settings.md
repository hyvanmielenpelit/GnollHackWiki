## Modern Port Settings

These settings pertain to GnollHack's **modern ports** only.

## Simple Command Layout

- **Off:** Advanced Command Layout
    - Shows two rows of commands in the bottom of the game screen.
    - Shows extra commands in more commands.
    - Shows Travel Mode and Alternate Zoom Mode buttons in the upper right corner of the game screen.
- **On:** Simple Command Layout _(Default)_
    - Shows one row of commands in the bottom of the game screen.
    - Shows only most important extra commands in more commands.
    - Hides Travel Mode and Alternate Zoom Mode buttons in the upper right corner of the game screen.

## GPU Acceleration

Enables and disables the GPU acceleration of the game. If disabled, the game uses CPU for rendering graphics.

_Default: On_

Note that GPU acceleration can cause crashes on some systems.

## Graphics

- **Tiles:** Shows the game in 2D tile graphics. _(Default)_
- **ASCII:** Shows the game in ASCII graphics, i.e. in text.

## Cursor Style

_ASCII graphics only_

Determines the way how the player character is identified in the game.

- **Green Block** _(Default)_
- **Blinking Underline**

## Max FPS

Determines the max refresh rate of the game. This can be used to save battery or to make the game smoother.

Options range from 20 FPS to 120 FPS.

_Default: 60_

## Messages

Determines the number of messages shown in the bottom left corner of the screen.

Options range from 1 to 50. 

_Default: 5_

### Show All

Toggle for showing all messages. The same as tapping the message area in the game screen.

## Hide Navigation

_Android only_

Determines whether to hide the operating system navigation buttons in the bottom of the screen. 

_Default: On_

## Hide Status Bar

_iOS only_

Determines if the top status bar of the operating system is hidden.

_Default: On_

## Silent Mode

- **Off:** The game plays game sounds and music. _(Default)_
- **On:** Game sounds and music are not played.

## Default Auto-Center

Determines if the Auto-Center button in the game screen is enabled by default.

_Default: On_

## Grid

Determines if the game shows grid lines in the game for easier tile position discernment.

_Default: Off_

## Hit Point Bars

Determines if the game shows hit point bars under the player character, NPCs, pets, and monsters.

_Default: Off_

## Classic Status Bar

- **Off:** Shows the modern graphical game status bar in the game. _(Default)_
- **On:** Shows the game status bar in text in the NetHack style.

## Show Status Screen

Toggle for showing the status screen. The same as tapping the middle area of the status bar at the top of the screen.

## Show Pets

Determines if the game shows pet icons in the top of the game screen (under the game status bar).

_Default: On_

## Pet Rows

Determines how many rows of pet icons are allowed in the top of the screen.

Options range from 1 to 4.

_Default: 2_

## Orbs

Determines if health and mana orbs are shown in the top left corner of the screen.

_Default: On_

## Show Max Hit Points

Determines if maximum hit points are shown under the current hit points in the health orb.

_Default: Off_

## Show Max Mana

Determines if maximum mana is shown under the current mana in the mana orb. 

_Default: Off_

## Player Mark

Determines if a green targeting icon is displayed above the player character. 

_Default: Off_

## Targeting

Determines if a red targeting icon is displayed above hostile monsters. 

_Default: Off_

## Walk Arrows

Determines if there are walk arrows when Travel Mode is disabled.

_Default: On_

## Lighter Unlit Areas

Determines the shading level of unlit areas. 

- **Off:** Darker
- **On:** Lighter _(Default)_

## Draw Wall Ends

Determines if the game draws wall end graphics. Can be disabled to save processor time.

_Default: On_

## Volume

- Master Volume — Changes the volume of all sounds and music
- Music Volume — Changes the volume of music
- Ambient Volume — Changes the volume of ambient sounds
- Dialogue Volume — Changes the volume of voice overs
- Effects Volume — Changes the volume of sound effects
- Interface Volume — Changes the volume of interface sounds, such as button clicks

## Developer Mode

Activates [[Developer Mode]], which does the following things:

- Enables choosing of [[Wizard Mode]].
- Enables editing of the [[options]] file.

_Default: Off_

## Debug Log Messages

Shows message boxes that contain debug information whenever appropriate.

_Default: Off_

## Show Memory

Shows the current managed memory usage on the game screen.

_Default: Off_

## Show FPS

Shows the current FPS on the game screen.

_Default: Off_

## Load Sound Banks

Determines if FMOD sound banks are loaded. Can be disabled to save memory. However, if disabled, the game will have no sounds.

_Default: On_

## Streaming Banks to Memory

Determines if streaming sound banks are loaded to memory.

- **Off:** Streaming sound banks are streamed from inside the AAB file (or wherever it is unpacked). This uses less memory. _(Default)_
- **On:** Streaming sound banks are read to memory and streamed from there. This uses more memory, which can lead to out-of-memory crashes.

## Streaming Banks to Disk

Determines if streaming banks are copied to the disk.

- **Off:** Streaming sound banks are streamed from inside the AAB file (or wherever it is unpacked). This uses less storage space. _(Default)_
- **On:** Streaming sound banks are copied to the storage and streamed from there. This uses consideraebly more storage space, since streaming banks are large in size.

## Allow Ghost Levels

Determines if the game uses so called bones files of dead characters.

_Default: On_

## Post Game Status

If enabled, the game will send live reports to a Discord server channel about important events in a game.

_Default: Off_

### Webhook Link

The link used to send the game status updates. If empty, status updates are sent to the **player-log** channel of the GnollHack Discord server.

_Default: Empty_

## Post Diagnostic Data

If enabled, diagnostic data about the game is sent to a private channel of the GnollHack Discord server.

_Default: Off_

## Use Single Dumplog

- **Off:** The game asks whether the user wants to open the plain text dumplog or the HTML dumplog in the top scores screen.
- **On:** The game opens the plain text dumplog or the Html dumplog based on the **Use HTML Dumplog** setting. _(Default)_

### Use HTML Dumplog

If **Use Single Dumplog** is **On**, this setting does the following:

- **Off:** The game opens a **plain text dumplog** in the top scores screen.
- **On:** The game opens a **HTML dumplog** in the top scores screen. _(Default)_

If **Use Single Dumplog** is **Off**, this setting does nothing.
