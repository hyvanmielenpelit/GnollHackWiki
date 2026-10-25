> 👉 **The Avalonia port is GnollHack's modern .NET MAUI client running on Avalonia UI instead of the platform UI frameworks of Android, iOS and Windows. It brings the modern client to Linux and the Steam Deck, and it also runs on Windows for development and testing.**

## ℹ️ Overview

GnollHack's modern client is a single .NET MAUI app, `GnollHackM`. On Android, iOS and Windows, .NET MAUI draws it with each platform's own UI framework, such as WinUI 3 on Windows. .NET MAUI has no Linux backend of its own, so the Linux version uses **Avalonia.Controls.Maui**, which implements .NET MAUI's controls on top of [Avalonia UI](https://avaloniaui.net/). Avalonia runs on Linux, Windows and macOS, so the same build also runs on Windows.

The Avalonia port is not a separate code base. It is the same `GnollHackM.csproj`, the same C# code and the same XAML pages, built with the MSBuild property `GnhAvalonia=true`. Code that only the Avalonia port needs is in `win\win32\xpl\GnollHackM\Platforms\Avalonia\`, and files that only the Linux version ships are in `Platforms\Linux\`.

## 🖥️ Flavors

The Avalonia port is built in two flavors, one for each operating system:

| | 🐧 Linux | 🪟 Windows |
|:--|:--|:--|
| **Purpose** | Released to players | Development and testing only |
| **Distribution** | Steam (also on the Steam Deck), and an AppImage on GitHub | A self-contained folder for testers; Windows players get the WinUI 3 version |
| **Runtime identifier** | `linux-x64` | `win-x64` |
| **Game engine** | `libgnollhacklinux.so` | `gnollhackwin.dll`, the same as the WinUI 3 version |
| **Game data (`nhdat`)** | The Linux-format file of the Android version | The Windows-format file of the WinUI 3 version |
| **Sound banks** | Desktop | Desktop |
| **Window system** | X11, and XWayland on Wayland desktops | Avalonia's Windows backend |
| **Rendering** | OpenGL through GLX, with a software fallback | Avalonia's Windows renderer |
| **In-game web pages** | Chromium (CEF), built into the game; WebKitGTK as a fallback | Microsoft Edge WebView2 |
| **Crash reporting** | Sentry, including native crashes | None |
| **Saved games and settings** | `~/.local/share/GnollHack` | `%LOCALAPPDATA%\GnollHack-Avalonia` |
| **Build instructions** | [[/Development/Build Instructions for Avalonia Linux Version on Windows]] | [[/Development/Build Instructions for Avalonia Windows Version on Windows]] |

Both flavors are built on Windows. The Linux flavor also needs WSL, which compiles the game engine and the game data, assembles the packages, and can run the game for testing.

## 🧑‍💻 Building

The Avalonia port uses a newer .NET SDK than the other modern clients. Its SDK and .NET MAUI workload versions are pinned in `Platforms\Avalonia\global.json`, and every `dotnet` command for the Avalonia port must run in that folder, for example:

```powershell
cd win\win32\xpl\GnollHackM\Platforms\Avalonia
dotnet build ..\..\GnollHackM.csproj -p:GnhAvalonia=true
```

Without `-r`, the build targets the operating system it runs on, so this command builds the Windows flavor. The Linux flavor is published with `-r linux-x64`, which `Build-LinuxPackages.ps1` does for you. The native libraries, the game data, the tile sets and the sound banks come from the native solution `GnollHack.sln`, as for the other modern clients; see [[/Development/Overview of Building GnollHack with .NET MAUI]].

## 🐧 Linux Packages

The Linux version comes in three packages, all made from one self-contained publish:

- **AppImage** — A single file for the GitHub releases, which runs on most 64-bit Linux distributions without installation. Players' instructions: [[/Installing the AppImage on Linux]].
- **Steam depot content** — For the Steam Linux Runtime 4.0 by default, or 3.0 (sniper) on request.
- **tar.gz** — The game as a plain folder, for testers.

Every file in the packages must load on glibc 2.27 and the libstdc++ of GCC 8, which covers Ubuntu 18.04, Debian 10 and RHEL 8 and newer. The packaging script checks this and refuses to build packages that need anything newer. The player-facing requirements are in [[/Linux System Requirements]].

## 🌐 Web View Engine on Linux

In-game web pages, such as this wiki and [[/Gnoll Overseer]], use the Chromium Embedded Framework (CEF), which ships with the game, so players need no web browser components. If CEF cannot start, the game falls back to WebKitGTK when the system has it.

For testing, the environment variable `GNOLLHACK_WEBVIEW` selects the engine: `cef` or `native` (WebKitGTK). In developer mode, the setting can also be stored as a preference.

## ⚠️ Known Third-Party Issues

Avalonia.Controls.Maui is younger than .NET MAUI's own backends, and GnollHack works around a number of its defects. The workarounds, with their symptoms and removal conditions, are recorded in the GnollHack repository:

- `DEVEL/workarounds/avalonia.md` — Avalonia and Avalonia.Controls.Maui.
- `DEVEL/workarounds/linux.md` — Linux, glibc and the Steam Linux Runtime.

## 📖 Learn More

- [[/Development/Build Instructions for Avalonia Linux Version on Windows]]
- [[/Development/Build Instructions for Avalonia Windows Version on Windows]]
- [[/Linux Version]]
- [[/Development Information]]

## 🔗 External Links

- [Avalonia UI](https://avaloniaui.net/)
- [.NET MAUI](https://dotnet.microsoft.com/en-us/apps/maui)
