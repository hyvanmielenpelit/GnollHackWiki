## Preparations


### Devices


You need the following devices to follow these instructions:
1. **Windows computer** — Windows 10 or later, 16 GB or 32 GB RAM, 512 GB or 1 TB SSD space.


### Software


1. Install the latest Visual Studio version with up-to-date support for .NET MAUI 9.0 Preview 4.
2. Clone this [GnollHack repository](https://github.com/hyvanmielenpelit/GnollHack) — [[Clone Repository in Visual Studio]].


## Build


1. [[Install Tile Sets and FMOD Sound Banks]].
2. [[Install Secrets File]].
3. (You probably do not need to build Android or iOS Xamarin.Forms apps. They will create various files for the .NET MAUI app based on Xamarin.Forms files, but most likely you won't need these files for .NET MAUI Windows version.)
4. Locate `GnollHack.sln` in `win\win32\vs` directory and open it — [[Open GnollHack Solution in Visual Studio]].
5. Choose the **x64** solution platform in the menu bar.
6. Select **Debug** as your solution configuration. You can also use **Release**, when you plan to build a release build.
7. Rebuild GnollHack solution.
    - This will create NetHack game data file called `nhdat` in Windows format and copy it together with `credit`, `defaults.gnh`, `license`, `symbols`, `sysconf`,  and `xcredits `to `win\win32\xpl\GnollHackM\Platforms\Windows\gnh`.
    - (It will also build ASCII and GUI versions of GnollHack. You may want to check out [[Build Instructions for ASCII Version on Windows]] and [[Build Instructions for Windows GUI Version on Windows]] for reference.)
8. Locate `GnollHackM.sln` in `win\win32\xpl\GnollHackM` directory and open it in Visual Studio.
9. Rebuild the GnollHackM solution.


## Starting Debugging or Creating Archive


1. [[Open GnollHackM Solution in Visual Studio]]. This is different from the normal GnollHack solution.
2. Select the right solution configuration in the menu bar:
    - **Debugging** — Select **Debug**.
    - **Archiving** — Select **Release**.


## Debugging


1. [[Rebuild Solution]].
2. Hit the green **Start button** to start debugging.