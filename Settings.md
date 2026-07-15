![settings](/uploads/Settings/settings.webp)

> 👉 **These settings relate to GnollHack's modern ports only.**

## ⚙️ General Settings

### ℹ️ General

| Setting Name | Options / Values | Default | Description |
| :----------- | :--------------: | :-----: | :---------- |
| **GPU Acceleration** | On / Off | On | Enables and disables the GPU acceleration of the game. If disabled, the game uses CPU for rendering graphics. Note that GPU acceleration can cause crashes on some systems. |
| **Graphics** | Tiles / ASCII | Tiles | Shows the game in 2D tile graphics or in ASCII text. |
| **Map FPS** | Default / 20 FPS / 30 FPS / 40 FPS / 60 FPS / 72 FPS / 80 FPS | Default | Determines the max refresh rate of the game. This can be used to save battery or to make the game smoother. The default refresh rate varies by device (typically 60 FPS). |
| **Screen Resolution** | Multiple resolutions | Native | *(Windows only)* Determines the rendering resolution of the game map. |
| **Screen Scale** | Percentage | 100% | Custom scale to make UI components larger or smaller than normal. |
| **Windowed Mode** | On / Off | Off | *(Desktop only)* Determines if the game runs in windowed or fullscreen mode. |
| **Edge to Edge** | On / Off | Off | *(Mobile only)* Determines whether the game expands to cover the safe area of the screen (such as screen cutouts or notches). |
| **Cursor Style** | Green Block / Underline | Green Block | *(ASCII graphics only)* Determines the way how the player character is indicated in the game. |
| **Hide Navigation** | On / Off | On | *(Android only)* Determines whether to hide the operating system navigation buttons in the bottom of the screen. |
| **Hide Status Bar** | On / Off | On | *(iOS only)* Determines if the top status bar of the operating system is hidden. |
| **Show Battery** | On / Off | Off | Displays a battery icon in the status bar indicating the current battery level. |
| **Show FPS** | On / Off | Off | Displays a frames-per-second icon in the status bar indicating the current refresh rate of the game. |
| **Show Zoom** | On / Off | Off | Displays a zoom icon in the status bar indicating the current zoom level of the map. |
| **Silent Mode** | On / Off | Off | Game sounds and music are not played if turned on. |
| **Dark Mode** | On / Off | Off | **Off (Light mode):** Menu and text window backgrounds are light and texts are black.<br>**On (Dark mode):** Menu and text window backgrounds are dark and texts are white. |
| **Tournament Mode** | On / Off | Off | Toggles several other settings to values required by tournaments like [[Junethack]]. Also forces on [[Casual-Classic Mode]]. More info about [[Tournament Mode]]. |

### 📏 Format

| Setting Name | Options / Values | Default | Description |
| :----------- | :--------------: | :-----: | :---------- |
| **Metric System** | On / Off | Off | Enables the metric system, displaying weights in kilograms (`kg`), grams (`g`), or tons. If disabled (default), the game uses the imperial system, displaying weights in pounds (`lbs` / `lb`), ounces (`oz`), or hundredweights (`cwt`). Mirrors the `metric_system` option. |
| **Show Dice as Ranges** | On / Off | On | Converts traditional D&D-style dice notation (like `2d6`) into a simple range (like `2-12`) in item descriptions. If disabled, traditional XdY notation is used. Mirrors the `show_dice_as_ranges` option. |
| **Show Damage Formula** | On / Off | Off | Shows the underlying dice formula (e.g., `1d6+2`) used to calculate an item's damage when examining it. Mirrors the `show_damage_formula` option. |

### 🎨 Menu Appearance

| Setting Name | Options / Values | Default | Description |
| :----------- | :--------------: | :-----: | :---------- |
| **Menu Fade Effects** | On / Off | On | Determines whether the texts in the menu and text pages fade in and out when opening and closing the page. Only available on Android. |
| **Improved Menu Images** | On / Off | On | **Off:** Nearest neighbour (faster but worse quality).<br>**On:** Bilinear interpolation (slower but better quality). |
| **Highlighted Menu Keys** | On / Off | On *(Desktop)* / Off *(Mobile)* | **Off:** Hotkeys are grayed.<br>**On:** Hotkeys are colored black/white based on light/dark mode. |
| **Show Equipment Icons** | On / Off | On | Displays equipment slot icons in the inventory menu. |
| **Equipment Flip Animation** | On / Off | On | Enables a 3D flip animation when moving between inventory and equipment screens. |
| **Worn Shows Equipment** | On / Off | On | Determines whether the worn item command (`]`) shows a full graphical equipment screen with all body slots or a plain text list of currently worn items. Mirrors the `worn_shows_equipment` option. |

## 🧭 Adventuring Settings

| Setting Name | Options / Values | Default | Description |
| :----------- | :--------------: | :-----: | :---------- |
| **Starting and Gifted Pets** | On / Off | On | Determines whether the player starts with a pet and receives gifted pets in special situations. Turn off the setting (or enable the option) if you are attempting a petless conduct. Mirrors the `pets_not_gifted` option (with inverted value). |
| **Allow Ghost Levels** | On / Off | On | Determines if the game uses so-called bones files of dead characters. |

## 🖥️ Layout & Interface Settings

### 📱 Layout

| Setting Name | Options / Values | Default | Description |
| :----------- | :--------------: | :-----: | :---------- |
| **Simple Command Layout** | On / Off | Off *(Desktop)* / On *(Mobile)* | **Off:** Shows two rows of commands in the bottom of the screen, and extra commands in more commands.<br>**On:** Shows one row of commands and only the most important extra commands in more commands. |
| **Alternative Zoom Button** | On / Off | Off | Displays the alternative zoom toggle button in the top-right corner of the map. |
| **Travel Mode Button** | On / Off | Off | Displays the travel mode toggle button in the top-right corner of the map. |
| **Auto-Dig Button** | On / Off | Off | Displays the auto-dig toggle button in the top-right corner of the map. |
| **Ignore Stopping Button** | On / Off | Off | Displays the ignore stopping toggle button in the top-right corner of the map. |
| **Desktop Buttons** | On / Off | On *(Desktop)* / Off *(Mobile)* | Determines whether Stats and Equipment buttons are shown on the left and right side of command buttons. |
| **Skill Context Button** | On / Off | On | Determines whether to show the skill context button on the left side of the screen. |
| **Polearm Context Button** | On / Off | Off | Determines whether to show the polearm context button on the left side of the screen. |
| **Single Commands Page** | On / Off | On *(Desktop)* / Off *(Mobile)* | Uses a single large commands page instead of several categorized pages. |

### 📊 Status Bar

| Setting Name | Options / Values | Default | Description |
| :----------- | :--------------: | :-----: | :---------- |
| **Classic Status Bar** | On / Off | Off | **Off:** Shows the modern graphical game status bar.<br>**On:** Shows the game status bar in text in the NetHack style. |
| **Desktop Status Bar** | On / Off | On *(Desktop)* / Off *(Mobile)* | Displays ability scores and other extra information on the status bar. |
| **Show Score** | On / Off | On *(Desktop)* / Off *(Mobile)* | Displays the game score on the status bar. |
| **Show XP** | On / Off | On *(Desktop)* / Off *(Mobile)* | Displays experience points on the status bar. |
| **Right-Aligned on 2nd Row** | On / Off | Off | Moves the display location of score, experience points and gold to the 2nd status bar row. |
| **Show Status Screen** | On / Off | Off | Toggle for showing the status screen. The same as tapping the middle area of the status bar. |

### 🕹️ Interface

| Setting Name | Options / Values | Default | Description |
| :----------- | :--------------: | :-----: | :---------- |
| **Grid** | On / Off | Off | Determines if the game shows grid lines in the game for easier tile position discernment. |
| **Grid Opacity** | Default (100%) / 5% to 100% | Default (100%) | Adjusts the opacity of the grid lines if they are shown. |
| **Hit Point Bars** | On / Off | Off | Determines if the game shows hit point bars under the player character, pets, and monsters. |
| **Player Mark** | On / Off | Off | Determines if a green targeting icon is displayed above the player character. |
| **Targeting** | On / Off | Off | Determines if a red targeting icon is displayed above hostile monsters. |
| **Show Pets** | On / Off | On | Determines if the game shows pet icons in the top of the game screen (under the game status bar). |
| **Pet Rows** | 1 to 4 / Maximum | 2 | Determines how many rows of pet icons are allowed in the top of the screen. |
| **Orbs** | On / Off | On | Determines if health and mana orbs are shown in the top left corner of the screen. |
| **Show Max Hit Points** | On / Off | Off | Determines if maximum hit points are shown under the current hit points in the health orb. |
| **Show Max Mana** | On / Off | Off | Determines if maximum mana is shown under the current mana in the mana orb. |
| **Messages** | 1 to 50 | 5 | Determines the number of messages shown in the bottom left corner of the screen. |
| **Show All** | On / Off | Off | Toggle for showing all messages. The same as tapping the message area in the game screen. |
| **Walk Arrows** | On / Off | On | Determines if there are walk arrows when Travel Mode is disabled. |
| **Default Auto-Center** | On / Off | On | Determines if the Auto-Center button in the game screen is enabled by default. |
| **Show Keyboard Shortcuts** | On / Off | On *(Desktop)* / Off *(Mobile)* | Determines if keyboard shortcuts are shown in menus. |

### 🖌️ Drawing

| Setting Name | Options / Values | Default | Description |
| :----------- | :--------------: | :-----: | :---------- |
| **Lighter Unlit Areas** | On / Off | On | **Off:** Unlit areas are darker.<br>**On:** Unlit areas are lighter. |
| **Colored X-Ray Vision** | On / Off | On | Determines whether tiles and creatures seen through X-Ray Vision are highlighted with a semi-transparent blue overlay tint. |
| **Draw Wall Ends** | On / Off | On | Determines if the game draws wall end graphics. Can be disabled to save processor time. |
| **Breathing Animations** | On / Off | On | Determines if the game shows the breathing animations of various creatures. |

## 🕹️ Behavior Settings

| Setting Name | Options / Values | Default | Description |
| :----------- | :--------------: | :-----: | :---------- |
| **Empty Wish is Nothing** | On / Off | On | **Off:** A random item is received if the wish is left blank.<br>**On:** Nothing is received. Keep on to preserve wishless conduct. |
| **Character Click Action** | On / Off | Off | Binds clicking or tapping on the player character to execute an action appropriate to the location (e.g., descending stairs or resting). Mirrors the `self_click_action` option. |
| **OK on Double Click** | On / Off | Off | Double-clicking a menu item also presses OK button automatically in menus. |
| **Traditional Get Position** | On / Off | Off | When asked to select a location, the location is selected by moving around a tile-based game cursor using arrow icons or keyboard, rather than clicking a location on the map. |
| **Auto-Dig** | On / Off | On | Automatically attempts to dig through solid rock or walls when moving into, clicking, or tapping them if wielding a suitable digging tool (like a pick-axe or mattock). Mirrors the `autodig` option. |
| **Ignore Stopping** | On / Off | Off | Prevents automated pathfinding travel from stopping when your character passes over items, closed doors, or engravings. Mirrors the `ignore_stopping` option. |
| **Right Mouse Button** | Action | By Role | Configures the game command bound to a right mouse button click. The default "by role" setting triggers role-specific default actions. Mirrors the `right_click_command` option. |
| **Middle Mouse Button** | Action | By Role | Configures the game command bound to a middle mouse button click. The default "by role" setting triggers role-specific default actions. Mirrors the `middle_click_command` option. |
| **Quick Engrave Text** | Text String | None | The default text written when using the quick engrave command. Mirrors the `engrave_quicktext` option. |
| **Quick Engrave Style** | Always ask / Always finger / Last item | Always ask | Selects which engraving method or tool is automatically chosen when executing the quick engrave command: ask every time, always use finger, or use last item. Mirrors the `engrave_quickstyle` option. |

## 📱 Bar Commands Settings

This section enables you to specify which commands are displayed in the command bar.

## 🔊 Volume Settings

| Setting Name | Description |
|---|---|
| **Master** | Changes the volume of all sounds and music. |
| **Music** | Changes the volume of music. |
| **Ambient** | Changes the volume of ambient sounds. |
| **Dialogue** | Changes the volume of voice overs. |
| **Effects** | Changes the volume of sound effects. |
| **Interface** | Changes the volume of interface sounds, such as button clicks. |

## 📢 Forum Posting Settings

| Setting Name | Options / Values | Default | Description |
| :----------- | :--------------: | :-----: | :---------- |
| **Post Game Progress** | On / Off | Off | Posts updates of new events of your journey to a selected channel on a Discord Server. |
| **Webhook Link** | URL | player-log channel on the GnollHack Discord server | Specifies the webhook link to the channel on a Discord server where your game progress is posted. |
| **Post Diagnostic Data** | On / Off | Off | Enables posting of anonymous game diagnostics and crash logs to the developer server. |

## 🌐 Server Posting Settings

| Setting Name | Options / Values | Default | Description |
| :----------- | :--------------: | :-----: | :---------- |
| **Account** | URL | account.gnollhack.com | Enables you to access and specify the GnollHack Server web address. |
| **User Name** | Text | None | Your user name on the GnollHack server. |
| **Password** | Text | None | Your password on the GnollHack server. |
| **Post Top Scores** | On / Off | Off | Posts your score to the GnollHack Server when your game has ended. |
| **Share Bones Files** | On / Off | Off | Posts bones files to the server, and allows you to encounter other players' dead characters' ghosts (if Allow Ghost Levels is on). |
| **Use Blacklist** | On / Off | Off | Determines whether to use blacklist or whitelist in blocking unwanted users' bones files. |
| **Whitelist/Blacklist** | Comma-separated names | None | List of allowed or blocked user names on the GnollHack server for bones files. |
| **Save File Tracking** | On / Off | Off | *(Desktop only)* Determines whether the save files are tracked by the GnollHack Server. |

## 📹 Replays Settings

| Setting Name | Options / Values | Default | Description |
| :----------- | :--------------: | :-----: | :---------- |
| **Record Game** | On / Off | Off | Determines whether the game records a replay of your game. |
| **Show Recording** | On / Off | On | Determines whether a red dot appears on the status bar to indicate that game recording is on. |
| **Auto-Upload to Cloud** | On / Off | Off | Determines whether the saved replay is automatically uploaded to an Azure cloud storage. |
| **Cloud Storage** | URL / Edit | None | Specifies a custom Azure cloud storage connection string to upload replays to. |

## 🛠️ System Settings

| Setting Name | Options / Values | Default | Description |
| :----------- | :--------------: | :-----: | :---------- |
| **Developer Mode** | On / Off | Off | Activates [[Developer Mode]], which enables [[Wizard Mode]] and editing the [[options]] file. |
| **Debug Logging** | On / Off | Off | Debug information is written in the app log. |
| **Low-Level Logging** | On / Off | Off | Extensive logging of various low-level events. Can clog the app log quickly. |
| **Screen Logging** | On / Off | Off | Toggles printing of log messages directly on the game screen. |
| **Debug Post Channel** | On / Off | Off | Use an alternative post channel instead of the one specified under Post Game Progress. |
| **Show Memory** | On / Off | Off | Shows the current managed memory usage on the game screen. |
| **Low Disk Space Warning** | On / Off | On | Displays a warning if free disk space is low (less than 5 GB) to prevent save game corruption. |
| **Load Sound Banks** | On / Off | On | Determines if the sound banks are loaded. Can be disabled to save memory, but the game will have no sounds. |
| **Streaming Banks to Memory** | On / Off | Off | **Off:** Streamed from their default location (or to disk).<br>**On:** Read to memory and streamed from there (uses more memory). |
| **Streaming Banks to Disk** | On / Off | Off | **Off:** Streamed from their default location (or to memory).<br>**On:** Copied to the storage and streamed from there (uses more storage space). |
| **Longer Message History** | On / Off | Off | Shows 16,384 last messages instead of 250, and adds a search bar. Switches off automatically for performance reasons upon adding new messages or restarting. |
| **Hide Message History** | On / Off | Off | The game will not show latest messages at all. Useful for taking cleaner screenshots. |
| **Use Single Dumplog** | On / Off | On | **Off:** The game asks whether to open plain text or HTML dumplog.<br>**On:** Opens the dumplog based on the **Use HTML Dumplog** setting. |
| **Use HTML Dumplog** | On / Off | On | If **Use Single Dumplog** is **On**, determines if the dumplog is plain text (**Off**) or HTML (**On**). |
| **GZip Replay Compression** | On / Off | On | **Off:** Zip format is used.<br>**On:** GZip format is used. |
| **Platform Render Loop** | On / Off | On | **Off:** UI framework specific animation system is used.<br>**On:** Platform-specific render loop linking to display refresh rate is used. |
| **Runtime GL Effects** | On / Off | Off | *(Experimental)* Enables runtime GL shaders for advanced visual effects on the map. |
| **GL Only on Map** | On / Off | Off | **Off:** Skia GL rendering is used on map, menus, and more commands page.<br>**On:** Skia GL rendering is used only on map. Other pages use CPU-based rendering. |
| **Mipmapping on Map** | On / Off | Off | Toggles whether mipmapping is used in map rendering. Mostly obsolete. |
| **Adjust Rectangles** | On / Off | On | Toggles whether the game adjusts tile rectangles to prevent Skia from drawing non-existing lines between tiles. |
| **Fix Filtering** | On / Off | On *(iOS)* / Off *(Others)* | Adjusts texture coordinates to prevent graphics filtering artifacts on some devices. |
| **Disable Windows Key** | On / Off | Off | *(Windows only)* Prevents the Windows key from opening the Start menu, to avoid accidental focus loss during gameplay. |
| **Default Vi-Keys** | On / Off | Off | **Off**: The default setting for the `number_pad` option is `2` (numbers for movement).<br>**On**: The default setting is `0` (vi-keys for movement). |
| **On Switching Apps** | Save Game / Checkpoint | Save Game | **Save Game**: The game is automatically saved and restored when the player returns. Menus close.<br>**Checkpoint**: The game creates a checkpoint and doesn't close menus, but recovers to checkpoint if terminated. |
| **Map GPU Cache** | Number | Varies | Determines the cache size for Skia GPU rendering for the map. Large numbers can lead to out of memory. |
| **Menu GPU Cache** | Number | Varies | Determines the cache size for Skia GPU rendering for the menu and more commands pages. |
