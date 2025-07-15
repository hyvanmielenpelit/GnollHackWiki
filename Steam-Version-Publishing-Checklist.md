## Steamworks SDK Setup

- Download Steamworks SDK ZIP from Steamworks website:
    - https://partner.steamgames.com/downloads/list
- Create `C:\Steamworks` directory.
- Unzip SDK files to `C:\Steamworks`.

## Main Game

### 1. Edit Package Manifest 
In the GnollHackM project, update `Platforms\Windows\Package.appxmanifest`:
- Change **Packaging** → **Package Name** to `Hyvnmielenpelitry.889864DD5340.Steam` (**Identity** → **Name** in XML).
- Change **Packaging** → **Version** to the right number (**Identity** → **Version** in XML).

### 2. Build GnollHack

1. Update GnollHack Library **Build Number** in `patchlevel.h`.
2. Ensure that `WindowsPackageType` is `None` in GnollHackM.csproj. This will build an unpackaged version.
3. Delete GnollHackM's `bin` and `obj` directories.
4. Build a Release version of GnollHackM.

### 3. Copy Files to Steamworks

1. If contents of `tools\ContentBuilder\content` is not empty: 
    - Check if `tools\ContentBuilder\content_old` is empty, move the files there.
    - If it is not empty, delete the files in `tools\ContentBuilder\content_old` and move the files then there.
2. Now `tools\ContentBuilder\content` directory should be empty. 
3. **Copy** the built files there.
4. Compare `content` and `content_old` with **WinMerge** and check that everything is ok.
    - Click File → Open and continue from there to select the directories.
    

### 4. Edit Steamworks Files and Upload to Steam

1. Edit Steamworks' `tools\ContentBuilder\scripts\gnollhack.vdf` and add a meaningful description there (it's like a build commit message).
2. Check that `tools\ContentBuilder\build_gnollhack.bat` contains your Steamworks user name and password. If not, add them there.
3. Open Terminal in Steamworks' `tools\ContentBuilder` folder.
4. Run `tools\ContentBuilder\build_gnollhack.bat` there.
    - You may need to enter Steam Guard code from your email before proceeding.

### 5. Move Published Files to Old Directory

Move published files from `content` to `content_old`.

### 6. Edit Package Manifest Again

In the GnollHackM project, update `Platforms\Windows\Package.appxmanifest`:
- Change **Packaging** → **Package Name** back to `Hyvnmielenpelitry.889864DD5340` (**Identity** → **Name** in XML).

### Notes

You get `tools\ContentBuilder\scripts\gnollhack.vdf` and `tools\ContentBuilder\build_gnollhack.bat` from the dev team.


## Playtest Version

### 1. Edit Package Manifest
In the GnollHackM project, update `Platforms\Windows\Package.appxmanifest`:
- Change **Packaging** → **Package Name** to `Hyvnmielenpelitry.889864DD5340.Playtest` (**Identity** → **Name** in XML).
- Change **Packaging** → **Version** to the right number (**Identity** → **Version** in XML).

### 2. Build GnollHack

1. Update GnollHack Library **Build Number** in `patchlevel.h`.
2. Ensure that `WindowsPackageType` is `None` in GnollHackM.csproj. This will build an unpackaged version.
3. Delete GnollHackM's `bin` and `obj` directories.
4. Build a Release version of GnollHackM.

### 3. Copy Files to Steamworks

1. If contents of `tools\ContentBuilder\content_playtest` is not empty: 
    - Check if `tools\ContentBuilder\content_playtest_old` is empty, move the files there.
    - If it is not empty, delete the files in `tools\ContentBuilder\content_playtest_old` and move the files then there.
2. Now `tools\ContentBuilder\content_playtest` directory should be empty. 
3. **Copy** the built files there.
4. Compare `content_playtest` and `content_old` with **WinMerge** and check that everything is ok.
    - Click File → Open and continue from there to select the directories.
    - Ensure especially that all icons and fonts are included.
5. Ensure that `output_playtest` folder exists. If not, create it.

### 4. Edit Steamworks Files and Upload to Steam

1. Edit Steamworks' `tools\ContentBuilder\scripts\playtest_gnollhack.vdf` and add a meaningful description there (it's like a build commit message).
2. Check that `tools\ContentBuilder\build_playtest_gnollhack.bat` contains your Steamworks user name and password. If not, add them there.
3. Open Terminal in Steamworks' `tools\ContentBuilder` folder.
4. Run `tools\ContentBuilder\build_playtest_gnollhack.bat` there.
    - You may need to enter Steam Guard code from your email before proceeding.

### 5. Move Published Files to Old Directory

Move published files from `content_playtest` to `content_playtest_old`.

### 6. Edit Package Manifest Again

In the GnollHackM project, update `Platforms\Windows\Package.appxmanifest`:
- Change **Packaging** → **Package Name** back to `Hyvnmielenpelitry.889864DD5340` (**Identity** → **Name** in XML).


### Notes

You get `tools\ContentBuilder\scripts\playtest_gnollhack.vdf` and `tools\ContentBuilder\build_playtest_gnollhack.bat` from the dev team.