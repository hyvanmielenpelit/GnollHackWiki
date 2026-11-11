> 👉 **GnollHack keeps several copies of your game, a checkpoint, an earlier save file and a backup save file, so a crash, a killed app, a full disk or a damaged file rarely costs you your character.**

## 📖 How Your Game Is Stored

A game in GnollHack exists in one of two forms:

- **While you play**, the game lives in its level files: one file for each dungeon level you have visited, plus a special level 0 file that holds the checkpoint.
- **After you save**, everything is folded into a single save file, and the level files are deleted.

When you load a game in [[Classic Mode]] or [[Modern Mode]], the save file is deleted once the game has fully loaded, so during play the level files are your game. [[Casual Mode]] keeps the save file on disk, and explore mode asks whether to keep it.

Three safety nets stand behind the save file, from newest to oldest:

1. **The checkpoint:** the state of the game in progress, written to the level files during play. Crash recovery rebuilds a save file from it.
2. **The earlier save file:** the save file that crash recovery replaced, kept in case the rebuilt save does not load.
3. **The backup save file:** a copy of the save file as it was when you last loaded the game successfully.

## 🗂️ Files the Game Keeps

In the table, `<name>` stands for a user number followed by the character's name. The files ending in a number or `.new` are directly in the game's data folder, and the rest are in its `save` subfolder. On Windows, you can find the data folder in [[/Development/Data File Locations (WinUI 3 Version – .NET MAUI)]].

| File | What It Is | When It Exists |
| :--- | :--------- | :------------- |
| **`<name>.1`, `<name>.2`, …** | Level file: one dungeon level | During play |
| **`<name>.0`** | Level 0 file: the checkpoint, with the game state and the number of the level you are on | During play |
| **`<name>.0.new`, `<name>.1.new`, …** | A level file being written | Only for a moment while it is written |
| **`<name>`** | Save file | After saving; during play only in Casual Mode, or in explore mode if you chose to keep it |
| **`<name>.e`** | Error save file, listed as **[Saved upon Error]** | After the game saved itself because of an internal error |
| **`<name>.i`** | Imported save file, listed as **[Imported]** | After importing a game or converting a backup, until it is loaded |
| **`<name>.bup`** | Backup save file | From the first successful load until the game ends |
| **`<name>.bup.tmp`** | Backup candidate | During a load |
| **`<name>.rec.tmp`** | Earlier save file | After crash recovery replaced a save file, until the next successful load |
| **`<name>.tmp`** | Save file being rebuilt | During crash recovery |
| **`<name>.ghsft`** | Tracking record of [[Save File Tracking]] | With a tracked save file on the desktop versions |
| **`<name>.ghsft.rec.tmp`** | Tracking record of the earlier save file | With a tracked earlier save file |

The **Load Saved Game** list does not show the backup, temporary and tracking files, so they never appear as extra characters.

Starting a new game with the name of a saved character and answering **Yes** to **Overwrite Existing Character?** deletes all of these files for that name, so the new character never starts from the old one's backup. A new character cannot take the name of a character in the other mode, tournament or regular, nor the name of a game that did not end properly; recover or delete that game first.

## 💾 The Backup Save File

### 🛠️ How the Backup Is Created

The backup is made when a game is **loaded**, not when it is saved:

1. Before reading anything, the game copies the save file to the backup candidate, `<name>.bup.tmp`.
2. The game loads the save file.
3. Only when the load has finished without any sign of damage does the candidate replace `<name>.bup`.
4. If the load fails or the save file turns out to be damaged, the candidate is discarded and the previous backup stays.

A damaged save file therefore cannot overwrite a good backup. The backup returns you to the moment of your last successful load, which may be well behind your latest save.

An imported game gets no backup on the load that imports it. Its first backup is made the next time you load it.

### 🔁 When the Backup Is Used

| Situation | What Happens |
| :-------- | :----------- |
| **The save file is invalid, for example from an incompatible version** | You are asked whether to replace it with its backup. |
| **The save file is corrupted** | You are asked whether to replace it with its backup. |
| **The save file is missing when you load the game** | The error save file is used if there is one, otherwise the backup is used automatically. |
| **The save file fails to load** | The game automatically replaces it with the earlier save file, or otherwise with the backup, and tries once more. |
| **The save file lacks dungeon levels** | You are asked whether to replace it with its backup and return to the main screen. |
| **A crashed game cannot be recovered, and it has no save file** | The backup automatically becomes the save file again. |
| **You delete a crashed game, and it has no save file** | You are asked whether to restore the backup. Answering no deletes it. |
| **The game cannot be saved because level files are missing** | Outside [[Tournament Mode]], you can end the session and continue later from the backup as a non-scoring game. |
| **You use About → Manage Files → Convert Backups** | A backup with no save file or imported save file beside it becomes a non-scoring imported game. Any error save file of that character is deleted. |

The game offers a backup only if it passes the version check. A backup with the same contents as the damaged save file is not offered, because it would not help.

> ℹ️ **Note:** On the desktop versions, a tracked game restored from its backup may fail the tracking check, because that file has already been loaded once. You can then mark the save as unsuccessfully tracked, or return to the main menu. See [[Save File Tracking]].

### 🗑️ When the Backup Is Deleted

The backup is deleted when the game truly ends, and when you delete the saved game from the menu. An internal error does not delete it. A successful [[Save File Transfer]] upload moves it to the cloud with the save file. A backup identical to the save file is not uploaded, and a new one is made on the receiving device.

## 🚑 Crash Recovery

If the app crashes or is killed, the level files stay on disk. On the next start, the game finds them and can show a **Crash Detected** message that offers to create a crash report. The character is listed as **[Crashed]**, and **Continue Current Game** prefers the crashed game over a saved game of the same character.

When you continue, the game rebuilds the save file:

1. It reads the checkpoint from level 0. If the file holds no checkpoint, there is nothing to recover: the level files are removed and the backup is restored if the save file is missing.
2. It builds the new save file under a temporary name, `<name>.tmp`, from the level you were on, the game state and all other level files. If anything fails, the temporary file is removed and an existing save file stays untouched.
3. If a save file of the same game already exists, it is kept as the earlier save file, `<name>.rec.tmp`, together with its tracking record. The character name, role, race, difficulty and game mode must match. Otherwise, the old file is simply replaced.
4. It moves the new save file into place. If that fails, the earlier save file is put back.
5. Only now does it delete the level files.
6. On the desktop versions, it registers the new save file with [[Save File Tracking]].
7. It loads the rebuilt save file like any other.

If recovery fails, the game reports why, removes the level files and restores the backup if the save file is missing.

Recovery does not make a game non-scoring. It is recorded, though: the end-of-game summary says *"The dungeon collapsed on you 2 times"*, or *"The dungeon never collapsed on you"* if it did not happen, and the count is stored with your score.

### ⏪ The Earlier Save File

The earlier save file exists because a rebuilt save can occasionally be worse than the save it replaced, and that save is newer than the backup. If the rebuilt save file is invalid, corrupted, lacks levels or fails to load, the game first offers to restore the earlier save file, and only then the backup.

The earlier save file is offered only if it is readable, has a compatible version and belongs to the same game as the current save file. If it is identical to the backup, it is deleted as a duplicate. It is removed after the next successful load.

## 📋 All Protections

### ⏱️ While Playing

- **Checkpoints at key moments:** The game writes a checkpoint when a new game starts, each time you arrive on a level and right after a load. It also writes one after a wish, and before you zap a wand of wishing or a similar device.
- **Checkpoints when the app may be closed:** Switching apps writes a checkpoint when **On Switching Apps** is set to **Checkpoint**, the default on desktop. The **Save Game** setting, the default on mobile and always used in [[Tournament Mode]], writes a checkpoint just before saving. A checkpoint is also written when a device's battery runs down to about 5%.
- **Temporary files for every checkpoint:** The current level and level 0 are first written completely to `.new` files, so a killed process cannot leave a cut-off checkpoint.
- **Matching level and checkpoint:** The two files are moved into place one right after the other, level first. If the level cannot be stored, level 0 stays as it was, because a checkpoint must not point to a level whose latest state is not on disk.
- **Temporary file for the level you leave:** The level you are leaving is also written to a `.new` file and moved over the old one only when complete. If the move fails, the game copies the file instead. If that fails too, it reports the error.
- **A full disk does not lose the level:** If the game cannot create the file for the level you are leaving, it tells you why and you stay on the level.
- **Ownership check:** Level 0 and every level file begin with the ID of the process that wrote them, and each level file also names its level. The game checks these when it reads its own files back, so it will not overwrite another process's checkpoint or load the wrong level.
- **Turning checkpoints off is safe:** With the `checkpoint` option off (see [[Options]]), level 0 is rewritten once without the game state, so the game can never recover from outdated information. No crash recovery is possible after that.
- **Safe background saves:** A background save or checkpoint does not start if the game is over, in an error state, already saving, loading or writing a checkpoint, or in the middle of a wish or a quest message.

### 💾 While Saving

- **Checking every level first:** Before it creates the save file or releases anything from memory, the game checks that it can open every level file. If one cannot be opened, the save is refused and the game stays intact.
- **A way out of an unsaveable game:** If that check fails, you can keep playing or quit. If you have a usable backup but no save file, and you are outside [[Tournament Mode]], you can also end the session and continue later from the backup as a non-scoring game. The backup is moved and never overwrites another imported game.
- **Checkpoint before a background save:** A save made when you switch apps writes a checkpoint first, in case the save fails. If it does fail, the game continues, and the main screen later shows a **Save Error** notice.
- **Level files stay until the save is complete:** The checkpoint and level files are deleted only after the whole save file has been written. If the process dies during saving, the game is recovered from the checkpoint at the next start.
- **Level 0 is deleted first:** After a successful save, level 0 goes first, so an interrupted cleanup can never rebuild a game from leftover levels. Leftover level files are removed the next time that character starts.
- **Overwrite confirmation:** If an old save file exists during a normal save, you are normally asked before overwriting it, except in [[Casual Mode]], which keeps its save file by design.
- **A partial save file is removed:** If the save file cannot be created, or a level file fails to open in the instant after the check, the partial save file is deleted. A failure to create it returns you to the game, while a level file failing at that late point ends the session with an error.
- **Error save file:** When an internal error occurs during play (*"Suddenly, the dungeon collapses."*), the game tries to save itself as an error save file, `<name>.e`, unless it was already saving or loading. You can load that file normally from the list.
- **Tracking check:** If [[Save File Tracking]] has been turned off during a tracked game, you are asked whether to mark the save as unsuccessfully tracked. Answering no cancels the save.

### 📂 While Loading

- **Checking the list:** Each save file is checked when the **Load Saved Game** list is built. An invalid file leads to the same choices as below, instead of appearing as a broken entry.
- **Version check:** A save file from an incompatible version is treated as invalid. See [[Save Game Compatibility]].
- **Three choices for an invalid or corrupted file:** The game offers the earlier save file, then the backup and finally deletion. If you delete the file and a useful backup exists, the backup is kept.
- **Cut-off level data:** If the file ends in the middle of a dungeon level, the game offers the earlier save file, and then asks whether to delete the save file and load the backup instead.
- **Missing dungeon levels:** After reading the file, the game compares the levels in the save file with the levels the game says exist. If any are missing, the game is not loaded: it offers the earlier save file and then the backup, or explains why neither can be used. It then returns to the main screen.
- **Automatic fallback:** If a save file fails to load, the game replaces it with the earlier save file, unless you declined that during this load, or otherwise with the backup. It then tries again once.
- **Errors during a load:** If the load hits an internal error, the game offers the earlier save file. If the error points to bad save data, it also offers the backup. It then returns to the main screen or closes the app, and it never writes an error save file over a load in progress.
- **The save file is deleted last:** All level files are written first, then the tracking record is checked, and then the checkpoint is written. Only after that is the save file deleted. If the app dies during a load, the save file is still there, and the unfinished level files are discarded at the next start.
- **Leftover level files:** After a successful load, any level files that do not belong to the loaded game are deleted. They can remain, for example, after a backup has been restored following a crash.
- **Items in use:** An item that was being used up when the game ended abruptly, such as a potion you were drinking, is finished off on load (*"Finishing off potion of healing..."*). This stops a crash from giving you the item back. The [[/Items/Amulet of Yendor]], the Candelabrum, the Bell, the Book of the Dead, artifacts and containers are exempt, so they cannot be lost this way.
- **Tracking check:** On the desktop versions, the game verifies the save file with [[Save File Tracking]] if it is tracked. If the check fails, you can mark the save as unsuccessfully tracked or return to the main menu. Returning leaves the save file in place.

### 🖥️ With Several Windows

- **One window per character:** On Windows and Linux, each character has an instance lock. Starting a character that is already being played in another window is refused with a message, because both windows would share the same files.
- **No false crashes:** A character running in another window is listed as **[Running in another window]**. It is not offered for crash recovery, and its files cannot be deleted.
- **A starting game leaves other games alone:** Until a starting game has taken charge of its own level files, its cleanups do not touch any level files.
- **One start at a time:** A short-lived lock file makes the checks at game start run one at a time.

### 🏁 When Deleting or Ending a Game

- **Clean end of a game:** When a game truly ends, its backup, backup candidate, earlier save file and error save file are deleted. This does not happen after an internal error, so the copies stay available.
- **Casual Mode:** The save file stays on disk and is deleted only upon ascension.
- **Deleting a crashed game:** After a confirmation, the game removes the level files, including any `.new` files. If no save file remains, it asks whether to restore the backup.
- **Deleting a saved game:** After a confirmation, the game removes the save file, its backup, backup candidate, earlier save file and error save file.

### ☁️ When Moving Files Between Devices

These protections apply to [[Save File Transfer]] and to importing. The [[Save Transfer System]] page describes transfers in detail.

- **Cloud lock:** An upload creates a lock in the cloud and verifies it before transferring any files.
- **Upload verification:** The game checks the size of each uploaded file and downloads the files again. The downloaded save file must match the original's size and SHA-256 hash and pass validation, and the manifest must match too. Only then is the local copy deleted.
- **Download verification:** The save file, backup and tracking record are checked for size and hash, and the save file is validated, before anything is placed in the save folder.
- **Safe order:** The local files are put in place before the tracking record is used up. If cleaning up the cloud or local copies fails afterward, you get a warning and the verified game stays safe.
- **Backup after a download:** If the upload contained no separate backup, a new one is made from the downloaded save file.
- **Import validation:** An imported file must pass validation and is stored as `<name>.i`, so importing never overwrites your regular save file. Loading an imported game asks before it replaces a regular saved game of the same name. Loading it makes the game non-scoring for good.

### ⚰️ For Bones Files

- **Temporary file:** A [[bones file|Bones Sharing]] is written under a temporary `.bn` name and renamed when complete, so another game never reads a half-written file.
- **Discarding unusable bones:** Bones files that fail the version check or do not match the level are discarded, and the level is generated normally.

## 🧯 Quick Guide to Special Situations

| Situation | What the Game Does | What You Keep |
| :-------- | :----------------- | :------------- |
| **Crash or killed app during play** | Recovers the game at the next start | The game as of the last checkpoint |
| **Crash during saving** | Recovers from the checkpoint that is still on disk | The game as of the last checkpoint |
| **Crash just after saving, during cleanup** | Removes leftover level files | The complete save file |
| **Crash during loading** | Discards the unfinished level files | The save file, untouched |
| **Recovered save does not load** | Offers the earlier save file, then the backup | The earlier save file or the backup |
| **Save file missing** | Uses the error save file or the backup | That file |
| **Save file invalid or corrupted** | Offers the earlier save file, the backup and deletion | Your choice of these |
| **Save file lacks dungeon levels** | Refuses to load, and offers the earlier save file and the backup | The save file, unless you replace it |
| **Level file missing when saving** | Refuses to save, and you can keep playing | The game in progress, or the backup as a non-scoring game |
| **Level file missing when you return to the level** | Ends the session with an error | The backup, through **Convert Backups** |
| **Disk full when changing levels** | Keeps you on the current level | The game in progress |
| **Character already open in another window** | Refuses to start it | The game running in the other window |

## ⚠️ Limits of the System

- **You can lose recent progress:** A recovered game returns to the last checkpoint. Because checkpoints are mostly written at level changes, a long stay on one level can be lost in a crash, unless a save, wish or app switch wrote a newer checkpoint.
- **The backup can be old:** It is as old as your last successful load.
- **Save files have no checksum:** The game notices damage when a file is too short, has the wrong version, or its contents do not add up during the load. Other damage can go unnoticed. [[Save File Tracking]] does hash the file on the desktop versions, but its purpose is to keep the game fair.
- **The save file is written in place:** Unlike checkpoints and level files, the save file is not written through a temporary file. It is protected by keeping the checkpoint until the save is complete.
- **A level file removed during play ends the game:** If something outside the game removes the file of a level you return to, the game cannot continue, and it also removes the remaining level files. The backup stays in the save folder, but it does not appear in the list until you convert it with **About → Manage Files → Convert Backups**. Such a game is non-scoring.
- **All copies are in one place:** The backup, checkpoint and save file are all on the same device. If its data folder is lost, so are they. To keep a copy elsewhere, use **About → Manage Files → Export Saved Games**. Importing such a copy later makes the game non-scoring.

The Windows and Linux versions also include a separate `recover` tool for rebuilding a save file by hand. The game itself never runs it, because it has its own built-in recovery.

## 📖 Learn More

- [[Save File Tracking]]
- [[Save Transfer System]]
- [[Save Game Compatibility]]
- [[Troubleshooting]]
- [[Technical Systems]]
