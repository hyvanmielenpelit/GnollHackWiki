> 👉 **The Windows flavor runs the Avalonia port on Avalonia's Windows backend, so the port can be developed and tested without a Linux computer. This page covers what is specific to it, and how it differs from the WinUI 3 version that Windows players get.**

The design that every flavor shares is on [[/Development/Design Details of Avalonia Port]]; building is on [[/Development/Build Instructions for Avalonia Windows Version on Windows]].

## ℹ️ At a Glance

| | |
|:--|:--|
| **Purpose** | Development and testing of the Avalonia port; never shipped to players |
| **Runtime identifier** | `win-x64`, the default when `-p:GnhAvalonia=true` is built on Windows |
| **Symbols** | No `LINUX`, `SENTRY` or `WINDOWS`; see [[Build Configuration Per Flavor|/Development/Design Details of Avalonia Port#build-configuration-per-flavor]] |
| **Game engine and data** | The WinUI 3 version's `gnollhackwin.dll` and Windows-format `nhdat` |
| **Web view** | Microsoft Edge WebView2, which must be installed; see [[Web View|/Development/Design Details of Avalonia Port#web-view]] |
| **Game controllers** | XInput |
| **Crash reporting** | None |
| **Single instance** | No instance lock and no save on termination signals; only Linux and macOS have them |
| **Data folder** | `%LOCALAPPDATA%\GnollHack-Avalonia`; see [[Files and Folders|/Development/Design Details of Avalonia Port#files-and-folders]] |
| **Distribution** | A zipped self-contained publish folder; no installer and no MSIX package |
| **Manifest** | `Platforms\Avalonia\app.manifest`, used on Windows only |
| **Paths** | `Platforms\` means `win\win32\xpl\GnollHackM\Platforms\` in the GnollHack repository |

## 🧠 Design Decisions

| Decision | Choice | Why |
|:---------|:-------|:----|
| **Why it exists** | A Windows build of the Avalonia port, for testing only | The quickest loop for an Avalonia change: it builds with `dotnet` alone, starts without WSL, and Visual Studio can attach its debugger to the process |
| **No `WINDOWS` symbol** | Plain `net11.0`, not a `-windows` target framework | `WINDOWS` marks the WinUI 3 version's code; for the same reason the platform name is "WindowsAvalonia", so the game's run-time Windows checks stay false |
| **Data folder** | `%LOCALAPPDATA%\GnollHack-Avalonia`, apart from the WinUI 3 version's | Testing never touches the WinUI 3 version's saved games and settings on the same computer |
| **Window icon** | A multi-size icon, built at run time with smooth filtering | Windows picks the matching size from an icon, but scales a single large image with point sampling |
| **Application manifest** | Lists the supported operating systems, Windows 10 and 11 | Without the list, Avalonia cannot create the child windows that host native controls, such as the web view |
| **WebView2 user data** | `WebView2\` in the data folder | WebView2's default, a folder next to the executable, may not be writable |

## 📁 Files

The Windows flavor has no platform folder of its own. It uses these, relative to `Platforms\` except the last:

| File | Role |
|:-----|:-----|
| **Windows\libs\\** | The game engine, gnollhackwin.dll, built by `win\win32\vs\gnollhackwin.vcxproj` and not in Git; FMOD's `fmod.dll`, `fmodstudio.dll` and its other libraries |
| **Windows\gnh\\** | The Windows-format `nhdat` and the other game data files |
| **Avalonia\app.manifest** | Supported operating systems and per-monitor DPI awareness |
| **win\win32\xpl\GnollHackM\GHXInputGamepadBackend.cs** | XInput controllers, shared with the WinUI 3 version |

- **`libs\` is copied whole**, so files only the WinUI 3 version needs, such as its native crash reporter `gnhsentry.dll`, land in the output too. Avalonia's own Direct3D translation layer is named `av_libglesv2.dll`, so it does not clash with the WinUI 3 version's `libGLESv2.dll`.

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

The Windows flavor's workarounds are in the shared Avalonia code and recorded with the others; see [[Workarounds|/Development/Design Details of Avalonia Port#workarounds]].

## 📖 Learn More

- [[/Development/Avalonia Port]]
- [[/Development/Design Details of Avalonia Port]]
- [[/Development/Design Details of Linux Avalonia Port]]
- [[/Development/Design Details of macOS Avalonia Port]]
- [[/Development/Build Instructions for Avalonia Windows Version on Windows]]

## 🔗 External Links

- [Avalonia UI](https://avaloniaui.net/)
- [Microsoft Edge WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
