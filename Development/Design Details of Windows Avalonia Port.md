> 👉 **The Windows flavor of the Avalonia port runs the Linux version's code on Avalonia's Windows backend, so the Avalonia port can be developed and tested without a Linux computer. This page explains where it differs from the Linux version, and how it differs from the WinUI 3 version that Windows players get.**

For what the Avalonia port is, see [[/Development/Avalonia Port]]. For building it, see [[/Development/Build Instructions for Avalonia Windows Version on Windows]].

## ℹ️ Overview

The Windows flavor is the `win-x64` build of the Avalonia port, from the same project and code as the Linux version. Everything that [[/Development/Design Details of Linux Avalonia Port]] describes applies to it, except what this page lists: the project structure and runtime, the startup, the rendering, the frame loop, the keyboard and mouse handling, the font loading and the Essentials replacements are shared.

It is for development and testing only and is never shipped. It is the quickest way to try a change to the Avalonia port: it builds with `dotnet` alone, starts without WSL, and can be debugged in Visual Studio by attaching to the process.

## 🏗️ Build Configuration

A plain `dotnet build` with `-p:GnhAvalonia=true` on Windows builds this flavor, since the runtime identifier defaults to the computer's own. Its preprocessor symbols are only `GNH_MAUI`, `GNH_AVALONIA`, `USE_SPAN_FOR_SUBSTRING` and `CORECLR`:

- **No `LINUX`**: none of the CEF, GLX, fontconfig, desktop entry or Linux packaging code is compiled.
- **No `SENTRY`**: no Sentry package is referenced, and nothing is reported.
- **No `WINDOWS`**: the target framework is plain `net11.0`, not `-windows`, so none of the WinUI 3 version's Windows-specific code is compiled either, even though the game runs on Windows.

The flavor takes its native files and game data from `win\win32\xpl\GnollHackM\Platforms\Windows\`, the same files as the WinUI 3 version:

| File | Contents |
|:-----|:---------|
| **libs\gnollhackwin.dll** | The game engine |
| **libs\fmod.dll**, **fmodstudio.dll** and the other FMOD libraries | Sound |
| **gnh\\** | The Windows-format `nhdat` and the other game data files |
| **banks\\** | The Desktop sound banks, which the Linux version uses too |
| **tileset\\** | The tile sets, which the Linux version uses too |

The `libs\` folder is copied as a whole, so files that only the WinUI 3 version needs, such as its native crash reporter `gnhsentry.dll`, land in the output too. Avalonia's own Direct3D translation layer is named `av_libglesv2.dll`, so it does not clash with the WinUI 3 version's `libGLESv2.dll`. The native libraries load from the application folder by the default search, without the Linux version's resolver.

There is no installer and no MSIX package. A self-contained publish folder, zipped, is what testers get.

### 📄 Application Manifest

`Platforms\Avalonia\app.manifest` is used on Windows only:

- **Supported operating systems**: Windows 10 and 11. Without a supported operating system list, Avalonia cannot create the child windows that host native controls, such as the web view.
- **DPI awareness**: per-monitor (version 2). The display density comes from Avalonia's screen scaling, and the platform service reports a screen scale of 1.

## 🖥️ Window

The window uses Avalonia's Windows backend. GnollHack sets no Windows-specific rendering options, so Avalonia's default rendering mode applies; the X11 options in `Main` have no effect here.

- **Full screen and windowed bounds** behave as on Linux, and the bounds are kept in this flavor's own preferences.
- **Icon**: Windows picks the matching size from an icon, but scales a single large image with point sampling. The game therefore builds a multi-size icon at run time, from 16 to 256 pixels, with smooth filtering.
- **Keyboard**: the same window-level handling as on Linux, which already copies the WinUI 3 version's key tables. `Win` combinations, `Alt+Tab` and `Alt+F4` stay with Windows.

## ⏱️ Refresh Rate

Avalonia's screen information has no refresh rate on Windows either, but Windows itself knows it. `GHAvaloniaMonitorRefreshRate` reads the current display mode of the window's monitor through the Windows API (WA-AVALONIA-0015), when the window opens, when the scaling or screen changes, and when the window moves to another monitor. The frame loop's measured rate is snapped to it.

The GLX swap interval does not exist on Windows, so frames are never treated as paced by vertical sync, and the frame rate estimate always uses the trimmed mean. The render timer adjustment of WA-AVALONIA-0014 does not apply.

## 🌐 Web View

The Windows flavor has no CEF. Web views use Avalonia's own web view on Microsoft Edge WebView2, so the WebView2 Runtime must be installed; if it is not, the game opens the wiki in the system's browser.

- **User data folder**: `WebView2\` in the data folder. WebView2's default is a folder next to the executable, which may not be writable.
- **A native window**: the page is drawn by WebView2 in a window of its own, above all Avalonia content. The [[/Gnoll Overseer]] page therefore hides it while its progress overlay or a message is shown, which it does not need to do with CEF on Linux.
- **Modal pages**: .NET MAUI's modal pages slide in with a render transform, which Avalonia's native control host does not follow. The game moves the web view itself when the transform changes (WA-AVALONIA-0016).
- **Scripts** are run through Avalonia's web view directly, without .NET MAUI's `eval` wrapper, which the Overseer's Content Security Policy refuses (WA-MAUI-0027). The Escape key is forwarded from the page to the game by a small script added after each load.

## 📁 Data Folder

The data folder is `%LOCALAPPDATA%\GnollHack-Avalonia`, with the same contents as on Linux, apart from the CEF, fontconfig and Sentry folders. The WinUI 3 version keeps its files in its own app data folder, so testing the Avalonia port never touches the saved games and settings of the WinUI 3 version on the same computer.

## 🧰 Essentials

The Essentials replacements are shared with Linux, with these differences:

| API | On Windows |
|:----|:-----------|
| **Device information** | Platform "WindowsAvalonia", so that the game's Windows checks, which mean the WinUI 3 version, stay false. The model is the computer's name, and the version comes from the operating system. |
| **Battery** | Always reports a full battery on mains power, which keeps the game's battery-dependent saving enabled. |
| **Secure storage** | The key is derived from the computer's name instead of `/etc/machine-id`. It does not use Windows' data protection, so the protection is obfuscation-level only. |
| **Browser** | Avalonia's launcher only. |
| **Device display** | The refresh rate is snapped to the monitor's real rate. |

## 🚫 What the Windows Flavor Leaves Out

- **Crash reporting**, both .NET and native.
- **CEF**, and the Linux web view engine selection.
- **The native library check** that the WinUI 3 and Linux versions show when the game engine cannot be loaded.
- **The WinUI 3 version's Windows-specific machinery**, such as its present feedback, raw rendering, render surface diagnostics, memory watchdogs and touch handling.
- **Text blob caching**, whose default is on only in the WinUI 3 version.
- **Desktop entries, the AppImage and Steam packages**, which are Linux-only.

## ⚖️ Compared with the WinUI 3 Version

| | 🪟 Windows Avalonia | 🪟 WinUI 3 |
|:--|:--|:--|
| **Purpose** | Development and testing of the Avalonia port | Released to players |
| **User interface** | .NET MAUI on Avalonia.Controls.Maui | .NET MAUI on WinUI 3 |
| **.NET** | .NET 11, SDK pinned in `Platforms\Avalonia\global.json` | .NET 10, SDK pinned in `GnollHackM\global.json` |
| **Game engine and data** | `gnollhackwin.dll`, Windows-format `nhdat` | The same |
| **Web view** | WebView2 through Avalonia | WebView2 through .NET MAUI |
| **Crash reporting** | None | Sentry, including native crashes |
| **Data folder** | `%LOCALAPPDATA%\GnollHack-Avalonia` | The app's own data folder |
| **Distribution** | A zipped folder | MSIX and Steam |

## ⚠️ Workarounds

Most Avalonia and Avalonia.Controls.Maui workarounds of the Linux version apply here too, since they are in shared code; they are listed on [[/Development/Design Details of Linux Avalonia Port]]. Of those, WA-AVALONIA-0014, 0017 and 0018 are Linux-only. WA-AVALONIA-0015 and 0016, and WA-MAUI-0027, are described above. The register is `DEVEL\workarounds\avalonia.md` in the GnollHack repository.

## 📖 Learn More

- [[/Development/Avalonia Port]]
- [[/Development/Design Details of Linux Avalonia Port]]
- [[/Development/Build Instructions for Avalonia Windows Version on Windows]]

## 🔗 External Links

- [Avalonia UI](https://avaloniaui.net/)
- [Microsoft Edge WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
