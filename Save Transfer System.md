> 👉 **The Save Transfer system moves a saved game between devices through cloud storage. It is built so that a lost connection, a closed app or a damaged file never leaves you without a copy of your game. This page explains how transfers work and how they protect your files. For step-by-step instructions, see [[Save File Transfer]].**

## 📖 Overview

A transfer is a move, not a copy: a successful upload deletes the game from the device, and a successful download deletes it from the cloud. The game therefore follows one rule in both directions: **the old copy is deleted only after the new copy has been verified.**

Save Transfer requires an internet connection and a verified [[GnollHack Account]]. Your cloud saves are stored under your account name, and each transfer has its own folder there.

Only regular saved games can be transferred. An imported or error save file is not offered for upload, and neither is a character that has one beside its regular save file. A game that fails validation shows a **Delete** button instead of a transfer button.

Cloud saves are stored separately for each group of compatible game versions. A version that cannot load a save usually does not list it at all. See [[Save Game Compatibility]].

## 📦 What Is Transferred

| File | Purpose | When It Is Included |
| :--- | :------ | :------------------ |
| **Manifest** | Describes the transfer: the character, game versions, and the size and SHA-256 hash of each file | Always |
| **Save file** | The saved game | Always |
| **[[Backup save file|Save Recovery System]]** | The copy from your last successful load | If it differs from the save file |
| **Tracking record** | The [[Save File Tracking]] record | If the game is tracked and the record exists |
| **Lock** | Marks a transfer as being in progress | Only during the transfer |

## 📤 How an Upload Works

1. **Checking the connection:** The game checks your internet connection and the GnollHack server. If the server cannot be reached, you can cancel or continue, but a tracked game may then fail to register.
2. **Checking the cloud:** The game looks for locks and existing cloud saves of the same character. If a lock is less than one hour old, you can abort or override it. Older locks are removed. If a cloud save of the character already exists, you must confirm before continuing.
3. **Checking the save file:** The save file must exist, pass validation and have a readable header.
4. **Creating the lock:** The game uploads a lock with a unique ID and reads it back. If the ID does not match, the upload stops.
5. **Handling tracking:** On the desktop versions, the existing tracking record is included. On Android and iOS, a tracked game is registered with the server, which creates the record and refuses a save that has already been uploaded. A game must be played further before it can be uploaded again.
6. **Uploading:** The game calculates the hashes, writes the manifest, makes a local copy of the files and uploads them.
7. **Verifying:** The game checks the size of each file in the cloud and downloads the files again. The downloaded save file must have the right size and hash and pass validation, and the manifest must match the original.
8. **Finishing:** Only now does the game delete the lock and the local save file, backup and tracking record.

If an upload fails or you cancel it, the game removes the unfinished files from the cloud and cancels the tracking registration. Your local save file is not touched.

## 📥 How a Download Works

1. **Checking for a local save:** If a local save of the same name exists, the game describes both saves, with their characters and turn counts, and asks whether to overwrite the local one.
2. **Checking the connection:** The game checks your internet connection and the GnollHack server. If the server cannot be reached, you are warned about a tracked game.
3. **Creating the lock:** If the cloud save has a lock less than one hour old, you can abort or override it. The game then uploads its own lock and reads it back.
4. **Checking the manifest:** The manifest must exist and be readable, and the save must be compatible with your game version. Otherwise, you are asked to update the app.
5. **Downloading:** The files are downloaded to a temporary folder, not to the save folder.
6. **Verifying:** The save file, backup and tracking record must have the right sizes and hashes. The save file must also pass validation, and its tracking status must match the manifest.
7. **Placing the files:** The save file and backup are copied to the save folder. If the upload had no separate backup, a new one is made from the save file.
8. **Handling tracking:** The desktop versions place the tracking record in the save folder, while Android and iOS use up the record on the server. These steps come after the files are in place, so a failure here cannot lose the game. If the server cannot register the record, you get a warning, and the game is still playable.
9. **Cleaning up the cloud:** The game deletes the files and the lock from the cloud. If that fails, you get a notice, and the cloud copy appears in the list again.

If a download fails or you cancel it before the files are placed, the game removes its lock and temporary files. The cloud copy stays, and your local save is not touched. If the downloaded save fails validation, you are asked whether to delete it from the cloud.

## 🛡️ All Protections

- **Verified before deleting:** Neither direction deletes the old copy until the new copy has passed its checks.
- **Failed cleanup is harmless:** If deleting the old copy fails after a verified transfer, you get a warning and the transfer still counts as successful.
- **Locks:** A lock stops two devices from working on the same save at once. A lock from a crashed session expires after one hour, and you can override it sooner.
- **Size, hash and validation checks:** These catch files that are cut off, damaged or not usable by your game version.
- **Separate temporary folder:** Downloads stay out of the save folder until verified. If the temporary folder is locked by another program, the game tries up to ten alternative folders. Temporary folders are cleared whenever the app starts.
- **Duplicate protection:** On Android and iOS, the server refuses to register the same tracked save twice, so a game cannot be duplicated by uploading it again.
- **Older formats:** A cloud save with an unrecognized manifest is never loaded. The game asks whether to delete it or keep it.
- **Local copies:** Each upload leaves a copy of its files in the `transfer_upload` folder in the data folder, and each download leaves its manifest in `transfer_download`. They are normally kept for 30 days, and for less time when the device runs low on disk space.

## ⚠️ Limits of the System

- **Transfers are not backups:** A transfer moves your only copy. Use **About → Manage Files → Export Saved Games** if you want an extra copy.
- **Older cloud copies stay:** An upload does not remove an earlier cloud save of the same character, although the confirmation says that it will be replaced. Both copies then appear in the download list.
- **A missing tracking record on the desktop versions:** If you continue such an upload without tracking, the save file still says that it is tracked, so its download fails the tracking status check with *"Tracked status mismatch"*. If you see the **Tracking Token Missing** question, it is safest to answer **No**.
- **An interrupted upload can leave two copies:** If the app dies after the upload but before the local files are deleted, the game exists both locally and in the cloud.

## 📖 Learn More

- [[Save File Transfer]]
- [[Save Recovery System]]
- [[Save File Tracking]]
- [[Save Game Compatibility]]
- [[Technical Systems]]
