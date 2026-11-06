> 👉 **How the Avalonia port of GnollHack is built, and why: the design that the Linux, macOS and Windows flavors share, the decisions behind it, and the files that make it up.**

What the Avalonia port is and which flavors exist is on [[/Development/Avalonia Port]]. What each flavor adds is on [[/Development/Design Details of Linux Avalonia Port]], [[/Development/Design Details of macOS Avalonia Port]] and [[/Development/Design Details of Windows Avalonia Port]].

## ℹ️ At a Glance

| | |
|:--|:--|
| **What** | `GnollHackM.csproj` built with `-p:GnhAvalonia=true`, running .NET MAUI on Avalonia.Controls.Maui |
| **.NET** | .NET 11, with the SDK pinned in `Platforms\Avalonia\global.json`; the Android, iOS and WinUI 3 clients stay on .NET 10 |
| **Runtime** | CoreCLR with the JIT, self-contained, not trimmed, not compiled ahead of time |
| **Flavors** | `linux-x64`, `osx-arm64` and `win-x64`; see [[Flavors|/Development/Avalonia Port#flavors]] |
| **Shared code** | `Platforms\Avalonia\`, plus `#if GNH_AVALONIA` branches in shared files, most of them in `GHApp.cs`, `OverseerPage.xaml.cs`, `SwitchableCanvasView.xaml.cs` and `MauiProgram.cs` |
| **Flavor code** | `Platforms\Linux\` and `Platforms\MacOS\`; the Windows flavor has none |
| **Paths** | `Platforms\` means `win\win32\xpl\GnollHackM\Platforms\` in the GnollHack repository |

## 🧱 Layers

| Layer | What it is |
|:------|:-----------|
| **Game pages and logic** | The shared C# and XAML in `GnollHackX\GnollHackX\`, the same as on every modern client |
| **App** | `GnollHackM`, the .NET MAUI app, with `Platforms\Avalonia\` as its platform folder |
| **.NET MAUI backend** | Avalonia.Controls.Maui, which implements .NET MAUI's controls on Avalonia |
| **UI framework** | Avalonia, with its X11 backend on Linux, Avalonia.Native on macOS and its Win32 backend on Windows |
| **Drawing** | SkiaSharp, on Avalonia's single Skia GPU context |
| **Game engine** | The native C library, called through P/Invoke as on the other clients |

## ⚙️ Build Configuration Per Flavor

Every flavor defines `GNH_MAUI`, `GNH_AVALONIA`, `USE_SPAN_FOR_SUBSTRING` and `CORECLR`, and the target framework is plain `net11.0`, so `WINDOWS` is never defined and no WinUI 3 code is compiled.

| | 🐧 Linux | 🍎 macOS | 🪟 Windows |
|:--|:--|:--|:--|
| **Extra symbols** | `LINUX`, `SENTRY` | `MACOS`, `SENTRY` | None |
| **Platform folders compiled** | `Avalonia\`, `Linux\` | `Avalonia\`, `MacOS\` | `Avalonia\` |
| **Game engine** | `libgnollhacklinux.so`, built in WSL | `libgnollhackmac.dylib`, built on a Mac over SSH | `gnollhackwin.dll`, the WinUI 3 version's |
| **Game data** | The Android version's `nhdat` | The same as Linux | The WinUI 3 version's Windows-format `nhdat` |
| **Publish** | Self-contained folder | Self-contained single file, in an app bundle | Self-contained folder |
| **Native libraries** | Loaded by exact file name by a resolver in `Main` | Loaded from the app's folder by a resolver in `Main` | Default search |
| **One instance, saving on termination signals** | Yes | Yes | No |
| **Crash reporting** | Sentry, .NET and native | Sentry, .NET and native | None |

## 🧠 Design Decisions

| Decision | Choice | Why |
|:---------|:-------|:----|
| **UI backend** | Avalonia.Controls.Maui | .NET MAUI has no Linux backend; the same XAML pages and C# run without a second user interface |
| **.NET version** | .NET 11 for the Avalonia port only | Avalonia.Controls.Maui, and the build support for an external .NET MAUI backend, exist only for .NET MAUI 11. Two `global.json` files keep the shipped clients on .NET 10 |
| **One project** | A build property on `GnollHackM.csproj`, not a fork | One code base for every client |
| **Runtime** | CoreCLR with the JIT, self-contained | No .NET installation needed, and the same runtime as the WinUI 3 version. Why it is not trimmed or compiled ahead of time is not recorded |
| **Entry point** | GnollHack's own `Main` | Some setup must run before Avalonia starts; see [[Startup|#startup]] |
| **Skia views** | GnollHack's own Avalonia controls and handlers | Avalonia.Controls.Maui's handlers have layout and hover defects, and paint inside Avalonia's render pass, where GnollHack's views cannot touch .NET MAUI properties |
| **GPU memory** | Avalonia's single Skia context with a fixed budget: 1.5 GiB, 2 GiB on macOS | Avalonia owns the context, so the budget replaces the cache management of the other clients; a full cache would re-upload textures every frame |
| **Frame pacing** | GnollHack's own frame loop and refresh-rate estimate | Avalonia reports neither when a frame is presented nor the display's refresh rate |
| **Keyboard** | Keys are routed at the window, before any control | The game gets Tab, the arrow keys and Alt before Avalonia uses them for focus and access keys, as with the WinUI 3 version's keyboard hook |
| **Essentials** | GnollHack's own implementations in .NET MAUI's static facades | Avalonia.Controls.Maui's own throw an exception for most APIs |
| **Fonts** | GnollHack's own font registrar, which copies each font's Windows metrics | Avalonia.Controls.Maui misreads some font names, and text should sit where DirectWrite puts it in the WinUI 3 version |
| **Crash reporting** | The core Sentry .NET SDK, plus sentry-native started by GnollHack | The .NET SDK starts native crash capture only in builds compiled ahead of time; see [[Crash Reporting|#crash-reporting]] |
| **Data folder** | One per flavor, apart from the WinUI 3 version's | Testing the Avalonia port on Windows never touches the WinUI 3 version's saved games |
| **One process per data folder** | `instance.lock` in the data folder, on Linux and macOS | A second copy would write the same saved games |

## 🚀 Startup

`Main` is in `AvaloniaDesktopProgram.cs`. These steps run before Avalonia starts, in this order:

| Step | 🐧 Linux | 🍎 macOS | 🪟 Windows | Why first |
|:-----|:--|:--|:--|:--|
| **CEF helper processes exit** | Yes | — | — | Chromium starts them from the game's own executable |
| **HarfBuzzSharp preload** | Yes | — | — | Must bind before fontconfig loads the system HarfBuzz |
| **Log redirection** | — | Yes | — | Started from Finder or Steam, the game has no terminal |
| **Instance lock, termination signals** | Yes | Yes | — | Nothing may start in a second copy |
| **fontconfig setup** | Yes | — | — | The environment must be changed before other threads start |
| **Native library resolver** | Yes | Yes | — | Must be in place before the first P/Invoke |

`MauiProgram.CreateMauiApp` then installs the Essentials replacements first, because `GHApp`'s static initializers already read them, registers the layout fixes before any handler is created, starts Sentry, and replaces Avalonia.Controls.Maui's handlers for `SKGLView`, `SKCanvasView`, `CustomLabel` and, with CEF, `WebView`.

## 🎨 Rendering

- **GPU views** (`SKGLView`, which includes the map): drawn by `GHAvaloniaGLControl` into a cached GPU surface on Avalonia's render thread, and skipped when the game has sent nothing new.
- **CPU views** (`SKCanvasView`): drawn by `GHAvaloniaCanvasControl` on the UI thread, outside Avalonia's render pass, and handed to the render thread as an image.
- **GPU resources** are disposed only on the render thread, with the context current, by `GHGLResourceGraveyard`.

## ⏱️ Frame Loop and Refresh Rate

- **Frame loop**: `GHAvaloniaFrameLoop` asks the window for an animation frame, again from inside each callback, and calls the shared frame handler, as WinUI 3's rendering event, Android's Choreographer and iOS's display link do on the other clients.
- **Refresh rate**: `GHRefreshRateEstimator` measures it from recent frame intervals, and snaps it to the monitor's display-mode rate, which `GHAvaloniaMonitorRefreshRate` reads through RandR on Linux, the Windows API and CoreGraphics on macOS.
- **90 FPS**: the map refresh rate setting offers it only in the Avalonia port.

## ⌨️ Input

- **Keyboard**: `GHAvaloniaKeyboard` gives special keys and Ctrl and Alt combinations to the game when the key goes down, with the WinUI 3 version's key tables, and characters from Avalonia's text input, so layouts, dead keys and AltGr work. The system keeps `Win`/`Super`/`Cmd` combinations, `Alt+Tab` and `Alt+F4`.
- **Mouse**: the WinUI 3 version's desktop code, for hover, cursors and the wheel.
- **Game controllers**: one backend per flavor, registered by `GHAvaloniaGamepad`: evdev on Linux, Apple's GameController framework on macOS, XInput on Windows. The rest is shared with the other clients; see [[/Development/Gamepad Support]].

## 🧰 Essentials

All live in `Platforms\Avalonia\Essentials\`, installed by `GHAvaloniaEssentials`:

| API | 🐧 Linux | 🍎 macOS | 🪟 Windows |
|:----|:--|:--|:--|
| **Preferences** | `preferences.json` in the data folder, written shortly after a change and at exit | Same | Same |
| **Secure storage** | AES-GCM encrypted `securestore.bin`, key from `/etc/machine-id` | Key from the hardware UUID | Key from the computer's name |
| **Battery** | `/sys/class/power_supply` | IOKit's power sources | Always full, on mains |
| **Device information** | Platform "Linux", model from DMI | Platform macOS, the Mac's model identifier | Platform "WindowsAvalonia", so the game's Windows checks, which mean WinUI 3, stay false |
| **Device display** | Follows the window's screen; refresh rate from the frame loop | Density from the window's render scaling | Same as Linux |
| **Browser** | Steam's overlay browser when present, otherwise the system's | The system's | The system's |
| **File picker** | The system's dialog; the game's own with a controller or in Steam's Gaming Mode | Same | Same |
| **Share** | A file to a save dialog, several to a folder, text to the clipboard | Same | Same |

The secure storage is obfuscation-level only on every flavor: it uses neither the macOS keychain nor Windows' data protection. App information, connectivity and the launcher are plain desktop implementations.

## 📁 Files and Folders

The game reads its own files from the executable's folder, or from `Contents/Resources` inside a macOS app bundle, and writes only to its data folder, which `GHAvaloniaPaths` resolves:

| | 🐧 Linux | 🍎 macOS | 🪟 Windows |
|:--|:--|:--|:--|
| **Data folder** | `~/.local/share/GnollHack` | `~/Library/Application Support/GnollHack` | `%LOCALAPPDATA%\GnollHack-Avalonia` |
| **Besides the game's files** | `preferences.json`, `securestore.bin`, `instance.lock`, `sentry-native/`, `sentry-dotnet/`, `cef/`, `fontconfig/`, `fonts/` (AppImage only) | The same, without `cef/`, `fontconfig/` and `fonts/` | `preferences.json`, `securestore.bin`, `WebView2\` |
| **Log** | Standard output | `~/Library/Logs/GnollHack/GnollHack.log` | Standard output |

## 🌐 Web View

| | 🐧 Linux | 🍎 macOS | 🪟 Windows |
|:--|:--|:--|:--|
| **Engine** | CEF, built into the game; WebKitGTK as a fallback | WKWebView, part of macOS | Microsoft Edge WebView2, which must be installed |
| **Drawn as** | An ordinary Avalonia control | A native view above all Avalonia content | A native window above all Avalonia content |

- **Native views** cannot be covered, so the [[/Gnoll Overseer]] page hides them while it shows its own overlays, and the game moves them itself when a modal page slides in, which Avalonia does not.
- **Scripts** are run directly, not through .NET MAUI's `eval` wrapper, which the Overseer's Content Security Policy refuses.
- **Controller navigation** inside web pages is a page script, `gamepad_web.js`, driven by `GHAvaloniaWebScriptHost`.
- **No engine**: the game opens the page in the system's browser.

## 🐞 Crash Reporting

Linux and macOS report to Sentry; the Windows flavor does not.

- **.NET exceptions**: the core Sentry .NET SDK, started by `GHAvaloniaSentry`; the .NET MAUI integration does not work on Avalonia.
- **Native crashes**: sentry-native's `inproc` backend, started by GnollHack before the .NET SDK, with the .NET SDK's own native SDK turned off. Its scope is mirrored from the .NET SDK, so a native crash carries the game's crash context.
- **Sending**: a native crash report is saved at the crash and posted unchanged to Sentry at the next start, so no field that only native events have is lost.
- **One sentry-native version** on Linux, macOS and WinUI 3, checked at build time by `GnhSentryNative.targets`.

## 📁 Shared Files

The files of `Platforms\Avalonia\`, which every flavor compiles.

### 🚀 Startup, Window and Lifetime

| File | Role |
|:-----|:-----|
| **AvaloniaDesktopProgram.cs** | `Main`: early setup, Avalonia's options, library resolvers, CEF shutdown |
| **GHAvaloniaWindowHooks.cs** | Window lifecycle: full screen, windowed bounds, icon; starts the keyboard and the frame loop |
| **GHAvaloniaInstanceLock.cs** | One process per data folder |
| **GHAvaloniaShutdown.cs** | Ends the process with the game saved |
| **GHAvaloniaPaths.cs** | Data folder and read-only asset folders |
| **PlatformServiceAvalonia.cs** | The platform service of the Avalonia target |
| **global.json** | Pins the .NET 11 SDK and the .NET MAUI workload set |
| **app.manifest** | Windows only: supported operating systems, per-monitor DPI awareness |

### 📐 Layout and Theming

| File | Role |
|:-----|:-----|
| **GHAvaloniaMargin.cs**, **GHAvaloniaLayoutInput.cs**, **GHAvaloniaAlignment.cs** | Margins, input transparency and alignment as .NET MAUI defines them |
| **GHAvaloniaControlTheming.cs**, **GHAvaloniaPickerTheming.cs** | Control and picker colors matching the WinUI 3 version |
| **GHAvaloniaFocusGuard.cs** | Keeps keyboard focus on controls a pointer could reach |

### 🎨 Rendering

| File | Role |
|:-----|:-----|
| **Rendering\GHAvaloniaGLViewHandler.cs**, **Rendering\GHAvaloniaGLControl.cs** | GPU views |
| **Rendering\GHAvaloniaCanvasViewHandler.cs**, **Rendering\GHAvaloniaCanvasControl.cs** | CPU views, painted outside the render pass |
| **Rendering\GHAvaloniaPointerHover.cs**, **Rendering\GHAvaloniaTouchTracker.cs** | Mouse hover; touches that Avalonia.Controls.Maui loses |
| **Rendering\GHGLResourceGraveyard.cs**, **Rendering\GHRefCountedImage.cs** | GPU disposal on the render thread; images shared with draw operations |

### ⏱️ Frame Loop and Display

| File | Role |
|:-----|:-----|
| **GHAvaloniaFrameLoop.cs** | Drives the shared frame handler from animation frames |
| **GHRefreshRateEstimator.cs** | Refresh rate from measured frame intervals |
| **GHAvaloniaMonitorRefreshRate.cs** | The monitor's display-mode rate on each operating system |

### ⌨️ Input

| File | Role |
|:-----|:-----|
| **GHAvaloniaKeyboard.cs**, **GHAvaloniaKeyText.cs** | Window-level key routing; key-to-character rules, including the macOS Option key |
| **GHAvaloniaCursors.cs** | The game's Windows cursor files as Avalonia cursors |
| **GHAvaloniaGamepad.cs**, **GHAvaloniaGamepadScroll.cs** | Registers the flavor's controller backend; scrolls the focused view into sight |
| **GHAvaloniaSteamKeyboard.cs** | Steam's on-screen keyboard |
| **GHAvaloniaKeyLog.cs**, **GHAvaloniaPointerLog.cs** | Diagnostic logs, on with `GNOLLHACK_KEY_LOG=1` and `GNOLLHACK_POINTER_LOG=1` |

### 🌐 Fonts, Web View and Crash Reporting

| File | Role |
|:-----|:-----|
| **GHAvaloniaFontRegistrar.cs** | .NET MAUI font registrar over Avalonia resources |
| **GHAvaloniaWebView.cs** | Avalonia's native web view: WebView2, WKWebView or WebKitGTK |
| **GHAvaloniaOverseerHost.cs** | The Gnoll Overseer page's web view host |
| **GHAvaloniaWebScriptHost.cs**, **Web\gamepad_web.js** | Controller navigation in web pages |
| **GHAvaloniaSentry.cs** | The Sentry .NET SDK on Linux and macOS |

### 🧰 Essentials

| File | Role |
|:-----|:-----|
| **Essentials\GHAvaloniaEssentials.cs** | Installs the implementations before `GHApp` initializes |
| **Essentials\GHAvaloniaAppInfo.cs**, **GHAvaloniaBattery.cs**, **GHAvaloniaBrowser.cs**, **GHAvaloniaConnectivity.cs**, **GHAvaloniaDeviceDisplay.cs**, **GHAvaloniaDeviceInfo.cs**, **GHAvaloniaFilePicker.cs**, **GHAvaloniaLauncher.cs**, **GHAvaloniaPreferences.cs**, **GHAvaloniaSecureStorage.cs**, **GHAvaloniaShare.cs** | One implementation per API; see [[Essentials|#essentials]] |

### 🔗 Shared Files Outside the Platform Folder

Paths from the GnollHack repository's root:

| File | Role |
|:-----|:-----|
| **win/win32/xpl/GnollHackM/GnollHackM.csproj** | The `GnhAvalonia` build: target framework, symbols, packages and content per runtime identifier |
| **win/win32/xpl/GnollHackM/MauiProgram.cs** | App builder: Essentials, layout fixes, handlers, Sentry |
| **win/win32/xpl/GnollHackM/GnhSentryNative.targets** | Checks that one sentry-native version is used everywhere |
| **win/win32/xpl/GnollHackM/GHSentryNative.cs**, **GHSentryNativeScopeObserver.cs** | sentry-native imports and scope mirroring, shared with WinUI 3 |
| **win/win32/xpl/GnollHackM/GHXInputGamepadBackend.cs** | XInput controllers, shared with WinUI 3 |
| **win/win32/xpl/GnollHackX/GnollHackX.Common/GnollHackService.cs** | Native bridge: engine library name, asset and data folders |
| **win/win32/xpl/GnollHackX/GnollHackX/GHApp.cs** | Most `GNH_AVALONIA` branches: platform identity, frame handling, defaults |
| **win/win32/xpl/GnollHackX/GnollHackX/Gamepad/**, **Radial/**, **FileDialog/** | Controller service, radial menus, the game's own file dialog |
| **DEVEL/gamepad_controls.md** | The control scheme and the Steam Input layout |

## ⚠️ Workarounds

Avalonia, Avalonia.Controls.Maui, .NET MAUI, SkiaSharp and Sentry have defects that GnollHack works around. Each workaround is recorded, with its symptom, cause and removal condition, in the GnollHack repository's [workaround register](https://github.com/hyvanmielenpelit/GnollHack/tree/master/DEVEL/workarounds), and tagged `WORKAROUND(...)` in the code. The register files for the shared code are [avalonia.md](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/avalonia.md), [maui.md](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/maui.md), [skiasharp.md](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/skiasharp.md) and [sentry.md](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/sentry.md).

## 📖 Learn More

- [[/Development/Avalonia Port]]
- [[/Development/Design Details of Linux Avalonia Port]]
- [[/Development/Design Details of macOS Avalonia Port]]
- [[/Development/Design Details of Windows Avalonia Port]]
- [[/Development/Gamepad Support]]

## 🔗 External Links

- [Avalonia UI](https://avaloniaui.net/)
- [sentry-native](https://github.com/getsentry/sentry-native)
- [GnollHack workaround register](https://github.com/hyvanmielenpelit/GnollHack/tree/master/DEVEL/workarounds)
