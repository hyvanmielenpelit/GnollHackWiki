## Preparations

### Devices

You need the following devices to follow these instructions:
1. **Windows computer** — Windows 10 or later, 16 GB or 32 GB RAM, 512 GB or 1 TB SSD space.
2. **Android device** — Android 8.0 Oreo (API 26) or later (as defined by `SupportedOSPlatformVersion` in `GnollHackM.csproj`), but preferably Android 12 or later, 3 GB or more RAM, 4 GB or more free storage space. Note: historically Android 5.0 was supported on older Xamarin versions.

### Software Installation

1. Install the latest Visual Studio version with up-to-date support for .NET MAUI. Make sure to also select the **Mobile development with C++** workload in the Visual Studio Installer (which includes the C++ Android cross-compilation toolchain and Android NDK), as it is explicitly required by `gnollhackdroid.vcxproj`.
2. [[/Development/Install Tile Sets and FMOD Sound Banks]] (must be placed in `win\win32\tileset` and `win\win32\bank\Mobile` *before* building the native solution).
3. [[/Development/Install Secrets File]].
4. [[/Development/Install Windows Subsystem for Linux]].
5. Before building the native solution, start the SSH service in WSL: `sudo service ssh start`. The SSH connection to WSL must also be configured in Visual Studio under **Tools → Options → Cross Platform → Connection Manager** (Host Name: `127.0.0.1`, Port: `22`, User Name & Password: your WSL credentials).
6. Open the native solution `win\win32\vs\GnollHack.sln`.
7. Select the **Android+Windows** platform configuration and rebuild the solution. This compiles the native C core game engine into the Android library (`libgnollhackdroid.so` for both `arm64-v8a` and `x86_64`) and automatically runs `makedefsdroid` to translate the shared XAML UI files from `GnollHackX` to `GnollHackM` formats.


### Android Device Preparation

1. Enable **Developer Mode** and **USB Debugging** — [Configure on-device developer options in Android](https://developer.android.com/studio/debug/dev-options)

## Starting Debugging or Creating Archive

1. [[/Development/Open GnollHackM Solution in Visual Studio]]. This is different from the normal GnollHack solution.
2. Select the right solution configuration in the menu bar:
    - **Debugging** — Select **Debug**.
    - **Archiving** — Select **Release**.

## Debugging

1. Attach your Android device to your computer using a USB cable.
2. Allow **USB debugging** on the device if asked.
3. Select your Android device from the **Android local devices** menu of the device dropdown list with a green start button in the menu bar.
4. [[/Development/Rebuild Solution]].
5. Hit the green **Start button** to start debugging.
    - If the deployment succeeds but debugging does not start, please just try again. It works at some point.

## 🛠️ CLI Build Command

```powershell
dotnet build win/win32/xpl/GnollHackM/GnollHackM.csproj -c Debug -f net10.0-android
```