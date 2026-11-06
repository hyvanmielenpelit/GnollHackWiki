> 👉 **What the macOS flavor of the Avalonia port adds to the shared design, and why: the app bundle, the menu bar, Metal rendering, the Option key, Apple's game controllers, WKWebView and native crash reporting.**

The design that every flavor shares is on [[/Development/Design Details of Avalonia Port]]. Building and releasing are on [[/Development/Build Instructions for Avalonia macOS Version on Windows]], and players' information is on [[/macOS Version]].

## ℹ️ At a Glance

| | |
|:--|:--|
| **Macs** | Apple Silicon only, `osx-arm64` |
| **Minimum macOS** | macOS 15; `GHMacDeploymentTarget` in `win\win32\vs\gnollhackmac.vcxproj` is the source of truth |
| **Publish** | Self-contained single file, in `GnollHack.app`; symbols in [[Build Configuration Per Flavor|/Development/Design Details of Avalonia Port#build-configuration-per-flavor]] |
| **UI backend** | Avalonia.Native, drawing with Metal, then OpenGL, then software |
| **Data folder** | `~/Library/Application Support/GnollHack` |
| **Log** | `~/Library/Logs/GnollHack/GnollHack.log` |
| **Bundle identifier** | `com.soundmindgames.GnollHackMac`, separate from the iOS app's |
| **Distribution** | Steam, and a notarized DMG |
| **Paths** | `Platforms\` means `win\win32\xpl\GnollHackM\Platforms\`; the macOS code is `Platforms\MacOS\` and `#if MACOS` blocks in `Platforms\Avalonia\` |

## 🧠 Design Decisions

| Decision | Choice | Why |
|:---------|:-------|:----|
| **Publish** | One executable, with native libraries and content beside it | Every file in `Contents/MacOS` must be signed as code; a single file keeps hundreds of .NET `.dll` files out of it |
| **Minimum macOS** | macOS 15 | The oldest macOS that .NET 11 supports |
| **Architecture** | Apple Silicon only | Not recorded. The native libraries are universal, so an `osx-x64` build is possible |
| **Menu bar** | GnollHack's own, replacing Avalonia's default | Mac shortcuts do what a Mac player expects and pass through the game's save-and-quit flow |
| **Option key** | The game's `Alt` by default; the Allow Option Keys setting makes it type characters | `Option` also types characters, and many layouts put essential ones there, such as `@` on `Option+2` in Finnish |
| **Native Sentry library** | `libgnhsentry.dylib`, exporting the functions of the Windows `gnhsentry.dll` | The Sentry .NET package carries sentry-native for macOS only as a static library, which .NET cannot load; the same exports let one set of imports serve both |
| **Signal handlers** | No changes for sentry-native | CoreCLR receives faults in managed code through Mach exception ports, before any signal is raised |
| **Hardened runtime** | Yes, without the App Sandbox | Notarization requires the hardened runtime; Steam does not support the App Sandbox |
| **Log** | Standard output and error go to a file when not started from a terminal | Started from Finder or Steam, the game would otherwise lose its output |
| **Retina density** | From the window's render scaling | Avalonia.Native reports every screen at a scaling of 1 |

## 🚀 Startup

Only what differs from the shared [[Startup|/Development/Design Details of Avalonia Port#startup]]:

- **Log redirection**: `GHMacStderrLog` sends the output, the native engine's included, to `GnollHack.log`, keeping the previous run's as `GnollHack.previous.log`.
- **Second instance**: a second copy says so in a system alert through `osascript`, since Avalonia has not started yet.

## 🖥️ Window and Menu Bar

`GHMacApplicationMenu` builds the menu bar:

| Menu | Items |
|:-----|:------|
| **GnollHack** | About GnollHack, Hide GnollHack (`Cmd+H`), Hide Others (`Cmd+Option+H`), Show All, Quit GnollHack (`Cmd+Q`) |
| **Window** | Minimize (`Cmd+M`), Close Window (`Cmd+W`) |

- **Quit and Close Window** run the window close button's flow, which saves a game in progress; **Minimize** in full screen hides the app instead, so the Dock icon returns to the full-screen Space.

## 🎨 Rendering

- **Metal Rendering setting**: on by default; off starts with OpenGL. It applies after a restart, because the rendering mode is fixed when Avalonia starts.
- **`GNOLLHACK_MAC_RENDERING`**: `metal`, `opengl` or `software` overrides the setting, for testing.
- **GPU budget**: 2 GiB, against 1.5 GiB elsewhere, because Metal needs about 1.3 GB on some levels.
- **Refresh rate**: the monitor's rate is read through CoreGraphics; see [[Frame Loop and Refresh Rate|/Development/Design Details of Avalonia Port#frame-loop-and-refresh-rate]].

## ⌨️ Input

- **`Cmd` combinations** stay with the system and the menu bar; the game never sees them.
- **`Option`** is the game's `Alt`. With Allow Option Keys off, the default and shown only on macOS, `Option` with a letter is the meta command of the letter the key types in the current layout, which `GHMacKeyboardLayout` asks macOS for; with it on, `Option` types the layout's printable ASCII character. `Ctrl+Option` counts as AltGr.
- **Game controllers**: `GHGameControllerBackend` reads Apple's GameController framework through the Objective-C runtime, with no binding library. The rest is shared; see [[/Development/Gamepad Support]].
- **Supported controllers**: those with an extended gamepad profile. Rumble, back paddles and the Home button, which keeps its macOS action, are not supported.

## 🔊 Game Engine and Sound

- **Game engine**: the universal `libgnollhackmac.dylib`, built on a Mac over SSH; a Unix build with the mobile options that shares its source list with the iOS engine and installs no signal handlers. The game data is the Linux version's `nhdat`.
- **FMOD**: universal `libfmod.dylib` and `libfmodstudio.dylib`. The resolver loads the core library first, because FMOD Studio refers to it by install name, and a second copy would be a second FMOD instance.

## 🌐 Web View

- **Bridge**: `window.GnollHackBridge` is added after each page load. Why WKWebView is hidden and moved by the game is on the shared [[Web View|/Development/Design Details of Avalonia Port#web-view]].
- **File inputs**: Avalonia's WKWebView answers no file input, so on the [[/Gnoll Overseer]] page a script asks the game to pick the files.

## 🐞 Crash Reporting

- **`libgnhsentry.dylib`**: the Sentry package's static library, linked unchanged into a universal dynamic library on the Mac; `libgnhsentry.build.props` records the versions the build checks.
- **Tags and testing**: every event has `macos.package` set to `steam`, `bundle` or `unbundled`; `GNOLLHACK_SENTRY_TEST=1` sends one test message at start.
- **Debug symbols**: a Release publish uploads `libgnhsentry.dylib` and the engine's dSYM itself, because Sentry's build integration uploads dSYMs only for iOS and Mac Catalyst.
- **The whole mechanism**, and how `libgnhsentry.dylib` follows a Sentry update, is on [[/Development/Native Crash Reporting in Avalonia Port]].

## 📦 App Bundle

- **Layout**: Mach-O files go to `Contents/MacOS`, everything else to `Contents/Resources`, where `GHAvaloniaPaths` looks for the game's assets. There is no `Frameworks` folder.
- **Info.plist**: the bundle identifier, the version from `GnollHackM.csproj`, macOS 15 as `LSMinimumSystemVersion`, and the reasons macOS shows when the game first opens Documents, Downloads, the Desktop or a removable volume.
- **Signing**: each program file is signed separately, the bundle last with the entitlements, never with `--deep`. A release uses the Developer ID certificate and is notarized and stapled; a test build is signed ad hoc.

### 🔏 Entitlements

| Entitlement | Why |
|:------------|:----|
| **allow-jit**, **allow-unsigned-executable-memory** | CoreCLR's JIT compiler |
| **allow-dyld-environment-variables** | .NET's default for the hardened runtime |
| **disable-library-validation** | Loading libraries signed by other teams, such as Steam's overlay and FMOD |

## 📁 Dedicated Files

### 🧩 Code and Libraries

| File | Role |
|:-----|:-----|
| **MacOS\GHMacStderrLog.cs** | Log redirection |
| **MacOS\GHMacApplicationMenu.cs** | The menu bar |
| **MacOS\GHMacKeyboardLayout.cs** | What a key types in the current layout |
| **MacOS\GHGameControllerBackend.cs**, **MacOS\GHGameControllerNative.cs** | GameController backend; its Objective-C runtime calls |
| **MacOS\libs\libfmod.dylib**, **MacOS\libs\libfmodstudio.dylib** | FMOD |
| **MacOS\libs\libgnhsentry.dylib**, **MacOS\libs\libgnhsentry.build.props** | sentry-native; its recorded versions |
| **MacOS\licenses\sentry-native\LICENSE** | sentry-native's license |

### 📦 Packaging

| File | Role |
|:-----|:-----|
| **MacOS\Packaging\Build-MacPackage.ps1** | Publishes on Windows and runs the packaging on the Mac over SSH |
| **MacOS\Packaging\package-mac.sh** | Assembles, signs and notarizes the app, the DMG and the Steam content on the Mac |
| **MacOS\Packaging\Info.plist.template**, **MacOS\Packaging\GnollHack.entitlements** | The bundle's `Info.plist`; its entitlements |
| **MacOS\Packaging\New-MacAppIcon.ps1** | Composes the app icon from the iOS icon's layers |
| **MacOS\Packaging\Build-MacSentryNative.ps1**, **MacOS\Packaging\gnhsentry.exports** | Builds `libgnhsentry.dylib` on the Mac; its exported functions |
| **MacOS\Packaging\steam\app_build_mac.vdf.template**, **MacOS\Packaging\steam\depot_build_mac.vdf.template** | Steam build scripts |

### 🔗 Outside the Platform Folder

Paths from the GnollHack repository's root:

| File | Role |
|:-----|:-----|
| **win/win32/vs/gnollhackmac.vcxproj** | Builds the game engine, libgnollhackmac.dylib, and its dSYM on the Mac over SSH, and copies them, uncommitted, to `Platforms\MacOS\libs\` |
| **win/win32/vs/gnollhackapple.props** | The engine source list shared with iOS |
| **win/win32/xpl/GnollHackM/Resources/AppIcon/macOS/appicon-macos.png** | The app icon, turned into GnollHack.icns when the app is packaged |

## ⚠️ Workarounds

Defects in third-party components are worked around and recorded in the GnollHack repository's workaround register: the macOS build's in [build_tooling.md](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/build_tooling.md), and those of the shared code as listed in the shared page's [[Workarounds|/Development/Design Details of Avalonia Port#workarounds]].

## 📖 Learn More

- [[/Development/Design Details of Avalonia Port]]
- [[/Development/Design Details of Linux Avalonia Port]]
- [[/Development/Design Details of Windows Avalonia Port]]
- [[/Development/Native Crash Reporting in Avalonia Port]]
- [[/Development/Avalonia Port]]
- [[/Development/Build Instructions for Avalonia macOS Version on Windows]]

## 🔗 External Links

- [GnollHack workaround register: build_tooling.md](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/build_tooling.md)
- [Apple GameController framework](https://developer.apple.com/documentation/gamecontroller)
- [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview)
- [Notarizing macOS software before distribution](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution)
- [sentry-native](https://github.com/getsentry/sentry-native)
