---
name: build_windows_client
description: Step-by-step instructions for configuring and compiling the .NET MAUI (WinUI 3), Win32 GUI, and ASCII console clients on Windows.
---

> 👉 **This skill provides instructions for building the various Windows clients of GnollHack, including the modern .NET MAUI version and the legacy Win32 GUI and ASCII versions.**

## 💻 Modern Client (.NET MAUI / WinUI 3)

### Prerequisites

- Visual Studio with .NET MAUI workloads installed.
- Ensure tile sets and FMOD sound banks are installed in the repository.
- Ensure the secrets file (`Assets\ghsecrets.sjson`) is installed (this JSON file contains API keys and configuration secrets, is not part of the repository, and must be copied there separately by the programmer).

### Build Steps

1. Open the native solution `win\win32\vs\GnollHack.sln` in Visual Studio.
2. Select the **x64** platform and your desired configuration (**Debug** or **Release**).
3. Rebuild the solution. This builds `gnollhackwin.dll` and core data (`nhdat`), and copies them along with other assets to `win\win32\xpl\GnollHackM\Platforms\Windows\gnh`.
4. Open the MAUI solution `win\win32\xpl\GnollHackM\GnollHackM.sln` in Visual Studio.
5. Select the same configuration (**Debug** or **Release**) as used for the native solution.
6. Rebuild the `GnollHackM.sln` solution.
7. Set `GnollHackM` as the startup project and start debugging.

## 🖥️ Legacy Win32 GUI Client

1. Open `win\win32\vs\GnollHack.sln`.
2. Ensure tile sets and FMOD sound banks are installed.
3. Select the **x64** platform and **Debug** or **Release** configuration.
4. Right-click the `GnollHackW` project and select **Rebuild**.
5. The executable `GnollHackW.exe` will be located in `bin\Debug\x64` (or `Release`).
6. **Debugging:** Set `GnollHackW` as the startup project, set Working Directory to `$(BinDir)`, and optionally set Command Arguments to `-D -u wizard` for wizard mode.

## ⌨️ Legacy ASCII Console Client

1. Open `win\win32\vs\GnollHack.sln`.
2. Select the **x64** platform and **Debug** or **Release** configuration.
3. If building only ASCII, you can optionally unload the `GnollHackW` project to save time.
4. Rebuild the `GnollHack` project.
5. The executable `GnollHack.exe` will be located in `bin\Debug\x64` (or `Release`).
6. **Debugging:** Set `GnollHack` as the startup project, set Working Directory to `$(BinDir)`, and optionally set Command Arguments to `-D -u wizard`.
