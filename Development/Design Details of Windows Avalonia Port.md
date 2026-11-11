> 👉 **The Windows flavor runs the Avalonia port on Avalonia's Windows backend. It is the quickest way to develop and test the port without a Linux computer, and an alternative to the WinUI 3 version that Windows players get, one in which the Steam overlay works. This page covers what is specific to it, and how it differs from the WinUI 3 version.**

The design that every flavor shares is on [[/Development/Design Details of Avalonia Port]]; building is on [[/Development/Build Instructions for Avalonia Windows Version on Windows]].

## ℹ️ At a Glance

| | |
|:--|:--|
| **Purpose** | Development and testing of the Avalonia port, and an alternative Windows version; not shipped to players yet |
| **Runtime identifier** | `win-x64`, the default when `-p:GnhAvalonia=true` is built on Windows |
| **Symbols** | `WINDOWS_AVALONIA` and `SENTRY`, never `WINDOWS`; see [[Build Configuration Per Flavor|/Development/Design Details of Avalonia Port#build-configuration-per-flavor]] |
| **Game engine and data** | The WinUI 3 version's `gnollhackwin.dll` and Windows-format `nhdat` |
| **Rendering** | Direct3D 11 through ANGLE, on a DXGI flip-model swap chain of the window (`LowLatencyDxgiSwapChain`) |
| **Web view** | Microsoft Edge WebView2, which must be installed; see [[Web View|/Development/Design Details of Avalonia Port#web-view]] |
| **Game controllers** | XInput |
| **Crash reporting** | Sentry, including native crashes, through the WinUI 3 version's `gnhsentry.dll` |
| **Single instance** | `instance.lock` in the data folder; a second copy says so and exits. Windows has no termination signals: a logoff ends Avalonia's lifetime, after which the game saves |
| **Executable** | A GUI program; standard output and error go to `Logs\GnollHack.log` in the data folder |
| **Data folder** | `%LOCALAPPDATA%\GnollHack-Avalonia`; see [[Files and Folders|/Development/Design Details of Avalonia Port#files-and-folders]] |
| **Distribution** | A zipped self-contained publish folder; no installer, no MSIX package and no Steam depot yet |
| **Manifest** | `Platforms\Avalonia\app.manifest`, used on Windows only |
| **Paths** | `Platforms\` means `win\win32\xpl\GnollHackM\Platforms\` in the GnollHack repository |

## 🧠 Design Decisions

| Decision | Choice | Why |
|:---------|:-------|:----|
| **Why it exists** | A Windows build of the Avalonia port, for testing and as an alternative to the WinUI 3 version | The quickest loop for an Avalonia change: it builds with `dotnet` alone, starts without WSL, and Visual Studio can attach its debugger to the process. Unlike WinUI 3, it can give the Steam overlay a swap chain to draw on |
| **`WINDOWS_AVALONIA`, not `WINDOWS`** | Plain `net11.0`, not a `-windows` target framework, with a symbol of its own | `WINDOWS` marks the WinUI 3 version's code; for the same reason the platform name is "WindowsAvalonia", so `GHApp.IsWindows` stays false and `GHApp.IsWindowsAvalonia` is the run-time check |
| **Composition** | `LowLatencyDxgiSwapChain`, then `WinUIComposition`, then `RedirectionSurface` | Steam's overlay draws on a window swap chain's `Present`. Avalonia's default, Windows composition, never presents one, so the overlay never appeared with it (WA-STEAM-0003). In the Steam overlay test of November 2026 the swap chain also ran the map faster |
| **GPU** | The high-performance GPU, unless Windows' per-app graphics setting for the executable says Power saving | Avalonia otherwise takes the first adapter Windows lists, which is the integrated GPU on most hybrid laptops; in November 2026 the map ran GPU-bound at 40 fps there instead of 60 |
| **Overlay keep-alive** | While Steam's overlay library is loaded, a 1 × 1 visual is redrawn about 30 times a second on pages that draw nothing | Avalonia presents only when something changed, so the overlay could not open over a still menu |
| **Screen resolution** | The WinUI 3 version's display mode change, made with `CDS_FULLSCREEN` | The mode ends with the process, so a crash cannot leave the desktop at the game's resolution |
| **Secure storage** | Windows' data protection (DPAPI) for the current user | A key from the computer's name could be rebuilt by anyone; a store in the older format is converted the first time it is read |
| **Executable** | A GUI program with its own icon, logging to a file | A console window would open beside the game when it is started from Explorer or Steam |
| **Data folder** | `%LOCALAPPDATA%\GnollHack-Avalonia`, apart from the WinUI 3 version's | Testing never touches the WinUI 3 version's saved games and settings on the same computer |
| **Window icon** | A multi-size icon, built at run time with smooth filtering | Windows picks the matching size from an icon, but scales a single large image with point sampling |
| **Application manifest** | Lists the supported operating systems, Windows 10 and 11 | Without the list, Avalonia cannot create the child windows that host native controls, such as the web view |
| **WebView2 user data** | `WebView2\` in the data folder | WebView2's default, a folder next to the executable, may not be writable |

## 📁 Files

The Windows flavor's own C# is in `Platforms\WindowsAvalonia\`; `Platforms\Windows\` is the WinUI 3 version's, and the Avalonia build never compiles it. Paths are relative to `Platforms\` except the last five:

| File | Role |
|:-----|:-----|
| **WindowsAvalonia\GHWindowsStderrLog.cs** | Standard output and error, the engine's included, to `Logs\GnollHack.log` |
| **WindowsAvalonia\GHAvaloniaWindowsKeyHook.cs** | The low-level keyboard hook behind Disable Windows Key |
| **WindowsAvalonia\GHWindowsGpuSelection.cs** | Chooses the GPU Avalonia renders on, and reports it to the performance test |
| **WindowsAvalonia\appicon.ico**, **WindowsAvalonia\Packaging\New-WindowsAppIcon.ps1** | The executable's icon, and the script that makes it from `Resources\AppIcon\appicon.png` |
| **Windows\libs\\** | The game engine, gnollhackwin.dll, built by `win\win32\vs\gnollhackwin.vcxproj` and not in Git; `gnhsentry.dll`; FMOD's `fmod.dll`, `fmodstudio.dll` and its other libraries |
| **Windows\gnh\\** | The Windows-format `nhdat` and the other game data files |
| **Avalonia\app.manifest** | Supported operating systems and per-monitor DPI awareness |
| **win\win32\xpl\GnollHackM\GHXInputGamepadBackend.cs** | XInput controllers, shared with the WinUI 3 version |
| **win\win32\xpl\GnollHackM\NativeLibraryPreflightWindows.cs** | Why a native library failed to load, and the Smart App Control tag of crash reports; shared with the WinUI 3 version |
| **win\win32\xpl\GnollHackM\GHSentryNative.cs** | sentry-native through `gnhsentry.dll`, shared with the WinUI 3 version |
| **win\win32\xpl\GnollHackM\GHDxgiAdapters.cs** | The Direct3D adapter list and the high-performance and power-saving adapters, shared with the WinUI 3 version |
| **win\win32\xpl\GnollHackM\GHWindowsGpuChoice.cs** | The GPU rule and the "Multiple GPUs" alert rule, without Windows calls, so the unit tests can check them |

- **Composition switch**: `--win-composition=<mode>` or `GNOLLHACK_WIN_COMPOSITION` picks `dxgi`, `winui`, `dcomp`, `redirect`, `wgl` or `avalonia` (Avalonia's own defaults), for testing. The log's `GnollHack: Windows composition request` line names the render timer that was applied.

- **GPU switch**: `--win-gpu=<mode>` or `GNOLLHACK_WIN_GPU` picks `auto` (the default: the high-performance GPU unless Windows says Power saving), `dedicated`, `integrated` or `avalonia` (Avalonia's own first adapter), for testing. The log's `GnollHack: Windows GPU` line names the adapter that was chosen. The choice applies only to ANGLE on Direct3D 11, so with `--win-composition=wgl` it applies only when OpenGL is unavailable, and ARM64 builds keep Avalonia's own rule.

- **`libs\` is copied whole**, so files only the WinUI 3 version needs, such as its native crash reporter `gnhsentry.dll`, land in the output too. Avalonia's own Direct3D translation layer is named `av_libglesv2.dll`, so it does not clash with the WinUI 3 version's `libGLESv2.dll`.

## ⚖️ Compared with the WinUI 3 Version

| | 🖥️ Windows Avalonia | 🖥️ WinUI 3 |
|:--|:--|:--|
| **Purpose** | Development, testing, and an alternative Windows version | Released to players |
| **User interface** | .NET MAUI on Avalonia.Controls.Maui | .NET MAUI on WinUI 3 |
| **.NET** | .NET 11, SDK pinned in `Platforms\Avalonia\global.json` | .NET 10, SDK pinned in `GnollHackM\global.json` |
| **Game engine and data** | `gnollhackwin.dll`, Windows-format `nhdat` | The same |
| **Rendering** | ANGLE on the window's DXGI swap chain | SkiaSharp on a `SwapChainPanel`, or a XAML `Canvas` without GPU acceleration |
| **GPU** | The high-performance GPU, unless Windows' per-app setting says Power saving, chosen through Avalonia's adapter callback | The same rule while GPU Acceleration is on, applied by initializing ANGLE's display on that GPU before SkiaSharp creates it; with GPU Acceleration off, Windows' default GPU |
| **Steam overlay** | Draws over the game; tested on the map in November 2026 | Does not appear |
| **Web view** | WebView2 through Avalonia | WebView2 through .NET MAUI |
| **Crash reporting** | Sentry, including native crashes | The same |
| **Windows-only settings** | Screen Resolution, Disable Windows Key, Right and Middle Mouse Button | The same |
| **Data folder** | `%LOCALAPPDATA%\GnollHack-Avalonia` | The app's own data folder |
| **Distribution** | A zipped folder | MSIX and Steam |

## 🐞 Crash Reporting

The shared model is in [[Crash Reporting|/Development/Design Details of Avalonia Port#crash-reporting]]. On Windows:

- **sentry-native**: `gnhsentry.dll`, the same file as the WinUI 3 version's, with GnollHack's crash shim: a filter that keeps CoreCLR's unhandled-exception filter in the chain, and a vectored handler that reports faults in the game engine, SkiaSharp, FMOD and ANGLE under .NET code. Its module list names the WinUI 3 version's ANGLE files, not this flavor's `av_libglesv2.dll`.
- **Tags**: `windows.package` (`steam` or `unbundled`), `windows.sac_state` (the Smart App Control state), and `native_load.file` and `native_load.win32_error` when a native library fails to load.
- **Debug symbols**: a Release publish uploads `gnollhackwin.pdb` and, from the computer that built the committed DLL, `gnhsentry.pdb`.
- **The whole mechanism** is on [[/Development/Design Details of Native Crash Reporting]], and how `gnhsentry.dll` is rebuilt on [[Build gnhsentry.dll|/Development/Build Instructions for Native Crash Reporting#3-build-gnhsentry-dll]].

## ⚠️ Workarounds

The Windows flavor's workarounds are in the shared Avalonia code and recorded with the others; see [[Workarounds|/Development/Design Details of Avalonia Port#workarounds]].

## 📖 Learn More

- [[/Development/Avalonia Port]]
- [[/Development/Design Details of Avalonia Port]]
- [[/Development/Design Details of Linux Avalonia Port]]
- [[/Development/Design Details of macOS Avalonia Port]]
- [[/Development/Build Instructions for Avalonia Windows Version on Windows]]
- [[/Development/Design Details of Native Crash Reporting]]
- [[/Development/Design Details]]

## 🔗 External Links

- [Avalonia UI](https://avaloniaui.net/)
- [Microsoft Edge WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
