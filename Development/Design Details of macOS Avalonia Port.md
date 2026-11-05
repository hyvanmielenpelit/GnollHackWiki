> 👉 **This page explains how the macOS version of GnollHack is put together and why: where it differs from the Linux version that shares its code, how it draws with Metal, reads the Mac keyboard and Apple's game controllers, shows web pages with WKWebView, reports crashes to Sentry, and how it becomes a signed and notarized app bundle.**

For what the Avalonia port is, see [[/Development/Avalonia Port]]. For building it, see [[/Development/Build Instructions for Avalonia macOS Version on Windows]].

## ℹ️ Overview

The macOS version is the `osx-arm64` flavor of the Avalonia port, from the same project and code as the Linux version. Everything that [[/Development/Design Details of Linux Avalonia Port]] describes applies to it, except what this page lists: the .NET MAUI app on Avalonia.Controls.Maui, .NET 11 and CoreCLR, GnollHack's own Skia controls, the frame loop, the font registrar, most of the Essentials replacements, the preferences and the crash context sent to Sentry are shared.

It is released to players on Steam, for Macs with Apple Silicon and macOS 15 or later. Players' information is on [[/macOS Version]].

In this page, `Platforms\` means `win\win32\xpl\GnollHackM\Platforms\`. The shared Avalonia code is in `Platforms\Avalonia\`, where the macOS branches are `#if MACOS` blocks. `Platforms\MacOS\` holds the C# that only the macOS version compiles, its native libraries in `libs\`, and its packaging scripts in `Packaging\`.

## 🏗️ Build Configuration

### ⚙️ Symbols and Packages

For an `osx` runtime identifier, `GnollHackM.csproj` defines `GNH_MAUI`, `GNH_AVALONIA`, `USE_SPAN_FOR_SUBSTRING` and `CORECLR`, plus `MACOS` and `SENTRY`:

- **No `LINUX`**: none of the CEF, GLX, fontconfig, evdev, desktop entry or Linux packaging code is compiled, and the CEF packages are not referenced.
- **`SENTRY`**: the core Sentry .NET package is referenced, with its own native SDK turned off (`SentryNative=false`, WA-SENTRY-0003), as on Linux.
- **`Platforms\MacOS\`** is compiled only for an `osx` runtime identifier.

### 📦 Publish

The game is published self-contained, without trimming or ahead-of-time compilation, like the Linux version, but as a **single file**, with the native libraries and content left beside it (`IncludeNativeLibrariesForSelfExtract=false`, `IncludeAllContentForSelfExtract=false`). Every file in an app bundle's `Contents/MacOS` must be signed as code, so a single executable keeps hundreds of .NET `.dll` files out of it. JIT compilation needs the `allow-jit` and `allow-unsigned-executable-memory` entitlements; see [[App Bundle|#app-bundle]].

### 🍎 Apple Silicon and macOS 15

- **macOS 15** is the oldest macOS that .NET 11 supports. The deployment target `GHMacDeploymentTarget` in `win\win32\vs\gnollhackmac.vcxproj` is the source of truth for the native libraries, and the app's `Info.plist` repeats it as `LSMinimumSystemVersion`.
- **Apple Silicon only**: the app is published for `osx-arm64` alone. The native libraries, the game engine, FMOD and the Sentry library, are universal arm64 and x86_64 binaries, so an `osx-x64` build is possible, but releases are arm64 only.

## 🚀 Startup

`Main` in `AvaloniaDesktopProgram.cs` does less on macOS than on Linux: there are no CEF helper processes, no HarfBuzzSharp preload and no fontconfig setup. In their place:

1. **The log is redirected.** When the game is not started from a terminal, `GHMacStderrLog` sends its standard output and error, the native engine's included, to `~/Library/Logs/GnollHack/GnollHack.log`, keeping the previous run's log as `GnollHack.previous.log`. A game started from Finder or Steam would otherwise lose its output.
2. **One instance per data folder.** As on Linux, `instance.lock` in the data folder keeps a second copy from starting; on macOS the second copy says so in a system alert, shown with `osascript`.
3. **Termination signals** (`SIGTERM`, `SIGINT`, `SIGHUP`) save the game and end it, as on Linux.
4. **A native library resolver** loads `fmod`, `fmodstudio` and `gnhsentry` from the app's own folder. See [[Game Engine, Data and Sound|#game-engine-data-and-sound]].
5. **Avalonia starts** with its macOS backend, Avalonia.Native: the rendering modes of the Metal Rendering setting (see [[Rendering|#rendering]]), popups drawn inside the main window, Avalonia's default application menu items turned off, a 2 GiB Skia GPU resource budget, and GnollHack's own menu bar (see [[Window and Menu Bar|#window-and-menu-bar]]).

`MauiProgram.CreateMauiApp` then runs as on Linux, without the web view engine selection and the CEF handler.

## 🖥️ Window and Menu Bar

The window behaves as on Linux: it opens full screen unless the Windowed Mode setting is on, and the windowed position, size and maximized state are restored when they still fit on a screen.

`GHMacApplicationMenu` replaces Avalonia's default menu bar, so that the Mac shortcuts do what a Mac player expects and pass through the game's own save-and-quit flow:

| Menu | Item | Shortcut |
|:-----|:-----|:---------|
| **GnollHack** | About GnollHack | — |
| **GnollHack** | Hide GnollHack | `Cmd+H` |
| **GnollHack** | Hide Others | `Cmd+Option+H` |
| **GnollHack** | Show All | — |
| **GnollHack** | Quit GnollHack | `Cmd+Q` |
| **Window** | Minimize | `Cmd+M` |
| **Window** | Close Window | `Cmd+W` |

- **Quit and Close Window** run the same flow as the window's close button: in a game, the game is saved first; on the main screen, any open popup is closed and the main screen's own exit runs. With nothing to take it over, as in a replay, the app simply shuts down.
- **Minimize in full screen** hides the app instead, so the Dock icon returns the player to the full-screen Space. Avalonia.Native would otherwise leave full screen first.

The app's Dock and Finder icon is `GnollHack.icns` in the bundle; the window itself shows the game's PNG icon, as on Linux.

## 🎨 Rendering

The GPU views use the same `GHAvaloniaGLControl` as on Linux, on Avalonia's single shared Skia GPU context. Avalonia.Native draws with **Metal**, then **OpenGL**, then the software renderer, whichever starts first:

- **Metal Rendering setting**: on by default. Turning it off starts with OpenGL. It applies after a restart, because the rendering mode is fixed when Avalonia starts, so the settings page asks the player to restart when the switch no longer matches the running mode. The setting is read from the preferences before Avalonia starts, which is why the Essentials replacements are installed that early.
- **`GNOLLHACK_MAC_RENDERING`**: the environment variable `metal`, `opengl` or `software` overrides the setting, for testing.
- **GPU budget**: Skia's resource cache may use 2 GiB on macOS, against 1.5 GiB elsewhere, because Metal needs about 1.3 GB on some levels.
- **Retina displays**: Avalonia.Native reports every Mac screen at a scaling of 1, with its size in points. On a Retina display, everything the game draws at its display density was half its size, and the map texts sat off their tiles. The game takes the density from the window's render scaling instead, and follows it when the window moves to another display (WA-AVALONIA-0025).

## ⏱️ Refresh Rate

Avalonia reports no refresh rate on macOS either. `GHAvaloniaMonitorRefreshRate` reads the current display mode of the window's display through CoreGraphics, with CoreVideo's nominal refresh period as the fallback, and the frame loop's measured rate is snapped to it when it is within 5 percent (WA-AVALONIA-0015, as on Windows). Without it, a Mac measured 60.66 Hz on a 60 Hz panel.

GnollHack sets no swap interval on macOS, so frames are never treated as paced by vertical sync: the estimate always uses the trimmed mean, and the Linux render timer adjustment of WA-AVALONIA-0014 does not apply.

## ⌨️ Keyboard and Mouse

`GHAvaloniaKeyboard` handles keys as on Linux, with these Mac rules:

- **`Cmd` combinations** stay with the system and the menu bar; the game never sees them.
- **`Ctrl`** works as on the other desktops: `Ctrl` with a letter is the matching control character.
- **`Option`** is the game's `Alt`. On the Mac, `Option` also types characters, and many layouts put essential ones there, such as `@` on `Option+2` in Finnish. The Allow Option Keys setting, shown only on macOS and off by default, chooses between the two:
  - **Off**: `Option` with a letter key is that letter's meta command, by the letter the key types in the current layout, so `Option+Z` is `Alt+z` on a German QWERTZ keyboard and `Option+A` is `Alt+a` on French AZERTY. Other keys use the shared `Alt` tables.
  - **On**: `Option` types whatever printable ASCII character the layout puts on the key.
- **`Ctrl+Option`** counts as AltGr, as `Ctrl+Alt` does on Linux.

Avalonia reports physical keys, not what they type with no modifiers in the current layout. `GHMacKeyboardLayout` asks macOS for that through the current keyboard layout's Unicode data (`UCKeyTranslate`), ignoring dead keys.

The mouse is handled as on Linux.

## 🎮 Game Controllers

`GHGameControllerBackend` in `Platforms\MacOS\` reads controllers through **Apple's GameController framework**, which pairs with MFi, Xbox, PlayStation and Switch controllers. It calls the framework through the Objective-C runtime directly, with no binding library:

- **Polling**: the list of connected controllers is read on every frame, so a controller switched on or off during the game is picked up within a frame. No notifications are needed.
- **Supported controllers**: those with an extended gamepad profile. Others are skipped, with a `GAMEPAD gc skip` line in the log.
- **Button labels**: PlayStation for DualSense and DualShock controllers, Xbox for Xbox controllers, and otherwise from the controller's product category.
- **Safety**: every Objective-C selector the backend uses is checked before it starts, because a missing selector raises an Objective-C exception that .NET cannot catch.
- **Not supported**: rumble, back paddles, and the Home button, which keeps its macOS action.

The control scheme, page navigation, button hints and radial menus are the shared code described on [[/Development/Gamepad Support]]. Steam's on-screen keyboard and the Steam Deck's grip key bridge are Linux-only.

## 🔤 Fonts

The game's fonts load as on Linux, through `GHAvaloniaFontRegistrar`, with the same name and metric fixes. Web pages use macOS's own fonts, so there is no fontconfig configuration, no bundled emoji font and no `fonts/` folder.

## 🧰 Essentials

The Essentials replacements are shared with Linux, with these differences:

| API | On macOS |
|:----|:---------|
| **Device information** | Platform macOS, manufacturer Apple, and the Mac's model identifier, such as `MacBookPro17,1`. The version pages show "macOS Avalonia". |
| **Battery** | Read from IOKit's power sources every minute. A desktop Mac reports a full battery on mains power. |
| **Secure storage** | The key is derived from the Mac's hardware UUID instead of `/etc/machine-id`. It does not use the macOS keychain, so the protection is obfuscation-level only. |
| **Browser** | Avalonia's launcher only, which opens the default browser. |
| **Device display** | The density comes from the window's render scaling, and the refresh rate is snapped to the display's real rate. |
| **File dialogs** | The game's own dialog, used with a controller, offers Desktop, Documents, Downloads, Pictures, Steam's screenshots and mounted volumes. |

## 📁 Files and Folders

The data folder is `~/Library/Application Support/GnollHack`, with the same contents as on Linux apart from the CEF, fontconfig and fonts folders. The log is in `~/Library/Logs/GnollHack`, where Console.app also shows it.

In an app bundle, program files must be in `Contents/MacOS` and everything else in `Contents/Resources`. `GHAvaloniaPaths` therefore reads the game data, sound banks, tile sets and other assets from `../Resources` when the executable runs inside `Contents/MacOS`, and from the executable's own folder otherwise, as in an unbundled development build. Native libraries are always loaded from the executable's folder.

## 🔊 Game Engine, Data and Sound

- **Game engine**: `libgnollhackmac.dylib`, built by `win\win32\vs\gnollhackmac.vcxproj` on a Mac over SSH, as a universal library. Like the Linux engine, it is a Unix build with the mobile options, and it shares its source list with the iOS engine in `gnollhackapple.props`. It installs no signal handlers and recovers interrupted games itself. Each Windows checkout builds in a folder of its own on the Mac, and only files whose contents changed are copied there, so builds from several computers never share objects.
- **Game data**: the same `nhdat` as the Android and Linux versions, built by the WSL data pipeline of `GnollHack.sln` under the **macOS** solution platform. No `recover` utility is shipped.
- **Sound**: FMOD's universal `libfmod.dylib` and `libfmodstudio.dylib` are committed to `Platforms\MacOS\libs\`, with the Desktop sound banks. The FMOD Studio library refers to its core library by install name, so the resolver loads the core from the app's folder first and the dynamic loader reuses that image. As on Linux, a second copy of the core library would be a second FMOD instance, in which the Studio system's core handle is invalid.
- **Tile sets**: the same ones as the other desktop versions.

## 🌐 Web View

In-game web pages, such as this wiki and the [[/Gnoll Overseer]], use **WKWebView**, through Avalonia's own web view. It is part of macOS, so nothing is shipped and no engine is chosen. Because WKWebView is a native view drawn above all Avalonia content, the macOS web view behaves like WebView2 on the [[Windows flavor|/Development/Design Details of Windows Avalonia Port]], not like CEF on Linux:

- **Drawn on top**: the Gnoll Overseer page hides the web view while its progress overlay, a message or the file dialog is shown.
- **Modal pages**: the game moves the web view itself when a modal page slides in with a render transform (WA-AVALONIA-0016).
- **Scripts** run through Avalonia's web view directly, without .NET MAUI's `eval` wrapper, which WebKit refuses under the Overseer's Content Security Policy.
- **JavaScript bridge**: `window.GnollHackBridge` is added after each page load and posts its messages through the message function of Avalonia's web view. A small script forwards the Escape key from the page to the game.
- **File inputs**: Avalonia's WKWebView sets no UI delegate, so a file input does nothing, and neither do JavaScript alerts. On the Overseer page, an injected script catches the click on a file input and asks the game to pick the files instead, with the system's open panel or, with a controller, the game's own dialog. Up to five files of at most 20 MB each are handed to the page (WA-AVALONIA-0026).

## 🐞 Crash Reporting

The macOS version reports .NET exceptions and native crashes to Sentry, as the Linux version does, with the same scope sync, crash context, outbox and next-start sending of native reports. The differences are in how sentry-native gets into the app and how it meets CoreCLR.

### 🧩 libgnhsentry.dylib

The Sentry .NET package carries sentry-native for macOS only as a static library, which only a Native AOT build links in (WA-SENTRY-0003), and .NET cannot load a static library. `Build-MacSentryNative.ps1` therefore links the package's library, unchanged, into a universal `libgnhsentry.dylib` on the Mac, and it is committed to `Platforms\MacOS\libs\`:

- **Same name as on Windows**: the library exports exactly the functions of the Windows `gnhsentry.dll`, from `gnhsentry.exports`, so `GHSentryNative` uses one set of imports, named `gnhsentry`, for both.
- **inproc backend, no transport of its own**: the game's transport callback saves crash reports to the outbox, as on Linux.
- **Checked when linked**: both architectures, exactly the listed exports, no dependencies beyond the system library, and the deployment target.
- **One sentry-native version**: `libgnhsentry.build.props` records the package and sentry-native versions, hashes and UUIDs, and the build checks them against the package and the Windows library, as for the Linux `libsentry.so`.

### 🚨 No Signal Handler Changes

On macOS, CoreCLR receives faults in managed code, such as a null reference, through **Mach exception ports**, before any signal is raised. sentry-native's signal handlers therefore never see those faults, and the macOS version needs neither the Linux chain-at-start setting nor the alternate signal stack change of WA-SENTRY-0005.

### 🏷️ Tags and Testing

Every event gets the tag `macos.package`: `steam` when Steam started the game, `bundle` in an app bundle, and `unbundled` otherwise. `GNOLLHACK_SENTRY_TEST=1` sends one test message at start. Sentry's database folder is set explicitly, because a game started from Finder runs in `/`.

### 🔍 Debug Symbols

The engine build makes `libgnollhackmac.dylib.dSYM` beside the library, and checks that its UUID matches. Sentry's own build integration uploads dSYMs only for iOS and Mac Catalyst (WA-SENTRY-0011), so a Release publish with `SENTRY_AUTH_TOKEN` set uploads `libgnhsentry.dylib` and the engine's dSYM itself, the latter only when its arm64 UUID matches the library being shipped. The .NET symbol files are kept out of the bundle.

### 🧱 Missing Libraries

The macOS version has no native library check like those of the WinUI 3 and Linux versions: if the game engine cannot be loaded, the error surfaces as an ordinary .NET exception, with no explanatory dialog.

## 📦 App Bundle

The publish runs on Windows, and `Build-MacPackage.ps1` copies it to the Mac, where `package-mac.sh` builds `GnollHack.app`. Signing and notarization need macOS's own tools. The steps are on [[/Development/Build Instructions for Avalonia macOS Version on Windows]]; this section explains what the bundle contains.

- **Layout**: every Mach-O file of the publish goes to `Contents/MacOS`, and every other file and folder to `Contents/Resources`. There is no `Frameworks` folder, since the resolver loads the native libraries from beside the executable. Symbol files go to a `symbols` folder outside the app.
- **Icon**: `New-MacAppIcon.ps1` composes `appicon-macos.png` on Windows from the two layers of the iOS icon, as a rounded square with a shadow, and `package-mac.sh` turns it into `GnollHack.icns`.
- **Info.plist**: the bundle identifier `com.soundmindgames.GnollHackMac`, separate from the iOS app's; the version and build number from `GnollHackM.csproj`; macOS 15 as the minimum; high resolution support; the role-playing games category; and the reasons macOS shows when the game first opens Documents, Downloads, the Desktop or a removable volume, for importing and exporting files.

### 🔏 Entitlements and Signing

The app is signed with the hardened runtime, which Apple's notarization requires. `GnollHack.entitlements` grants only what .NET and the game need:

| Entitlement | Why |
|:------------|:----|
| **allow-jit**, **allow-unsigned-executable-memory** | CoreCLR's JIT compiler |
| **allow-dyld-environment-variables** | .NET's default for the hardened runtime |
| **disable-library-validation** | Loading libraries signed by other teams, such as Steam's overlay and FMOD |

There is no App Sandbox, which Steam does not support. The program files are signed one by one, the executable and the bundle last with the entitlements, never with `--deep`. A release is signed with the team's Developer ID certificate, notarized by Apple and stapled, so it opens on any Mac without a warning; a test build is signed ad hoc and opens only on the Mac that built it.

### 🎮 Distribution

- **Steam**: the depot holds `GnollHack.app`. Steam starts its executable with `-store steam`, which tells the game it runs from Steam. A depot uploaded from Windows installs every file as executable, which the code signature does not cover, so the app stays valid.
- **DMG**: a notarized disk image with the app and a link to Applications, and a zip of the stapled app.

## 🚫 What the macOS Version Leaves Out

- **CEF**, the web view engine selection, and WebKitGTK.
- **fontconfig** and the bundled fonts.
- **evdev**, Steam Input's virtual pad, the grip key bridge and Steam's on-screen keyboard.
- **X11, GLX and RandR**, and with them the swap interval and the render timer adjustment.
- **The Linux crash reporting adjustments**: the signal handler chaining and stack change, the Linux tags and the IBus filter.
- **The native library check** and its dialogs.
- **The AppImage, the desktop entry and the `recover` utility.**
- **The glibc sysroot**: macOS compatibility comes from the deployment target instead.

## ⚠️ Workarounds

The shared Avalonia and Avalonia.Controls.Maui workarounds of the Linux version apply here too; they are listed on [[/Development/Design Details of Linux Avalonia Port]]. Of those, WA-AVALONIA-0014, 0017, 0018 and 0023 are Linux-only. The macOS version adds or extends these, recorded in the GnollHack repository's `DEVEL\workarounds\` folder:

| Register | Workarounds on this page |
|:---------|:-------------------------|
| **avalonia.md** | WA-AVALONIA-0015 (extended to macOS), 0016, 0025, 0026 |
| **sentry.md** | WA-SENTRY-0003, 0004, 0011 |
| **build_tooling.md** | WA-BUILD-0004 and 0005 (Xcode's GNU make 3.81, in the engine build), 0006 (the signing keychain over SSH) |

## 📖 Learn More

- [[/Development/Avalonia Port]]
- [[/Development/Design Details of Linux Avalonia Port]]
- [[/Development/Build Instructions for Avalonia macOS Version on Windows]]
- [[/Development/Gamepad Support]]
- [[/macOS Version]]

## 🔗 External Links

- [Avalonia UI](https://avaloniaui.net/)
- [Apple GameController framework](https://developer.apple.com/documentation/gamecontroller)
- [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview)
- [Notarizing macOS software before distribution](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution)
- [sentry-native](https://github.com/getsentry/sentry-native)
