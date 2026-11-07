> 👉 **What the Linux version of GnollHack adds to the shared design of the Avalonia port, and why: the X11 window, the built-in Chromium web view, controllers through evdev, native crash reporting, and the packages that run on old Linux distributions.**

The design that every flavor shares is on [[/Development/Design Details of Avalonia Port]]; building is on [[/Development/Build Instructions for Avalonia Linux Version on Windows]].

## ℹ️ At a Glance

| | |
|:--|:--|
| **Flavor** | `linux-x64` of the Avalonia port, with the symbols `LINUX` and `SENTRY`; see [[Build Configuration Per Flavor|/Development/Design Details of Avalonia Port#build-configuration-per-flavor]] |
| **Window** | Avalonia's X11 backend; XWayland on Wayland desktops |
| **Renderer** | GLX, with Avalonia's software renderer as the fallback |
| **Web view** | The Chromium Embedded Framework (CEF), shipped with the game; WebKitGTK as a fallback |
| **Controllers** | evdev, with Steam Input's virtual gamepad on a Steam Deck |
| **Crash reporting** | Sentry: the .NET SDK and sentry-native's `inproc` backend in `libsentry.so` |
| **Data folder** | `~/.local/share/GnollHack` |
| **Packages** | AppImage, Steam depot content for the Steam Linux Runtime 4.0 or 3.0, and a tar.gz |
| **Binary floor** | glibc 2.27 and the libstdc++ of GCC 8: Debian 10, Ubuntu 18.04, RHEL 8 and newer |
| **Paths** | `Platforms\` means `win\win32\xpl\GnollHackM\Platforms\`; the Linux-only code is in `Platforms\Linux\` |

## 🧠 Design Decisions

| Decision | Choice | Why |
|:---------|:-------|:----|
| **Window system** | X11 only, through XWayland on Wayland | Not recorded |
| **Web view engine** | CEF built into the game, WebKitGTK as a fallback | Players need no web browser components installed |
| **Web view rendering** | CEF renders off-screen into an ordinary Avalonia control | Avalonia content can be drawn over it, unlike a native web view, which is a separate window above the game |
| **Controllers** | evdev; on a Steam Deck only Steam Input's virtual pad, elsewhere physical pads too; no device is grabbed | Not recorded |
| **Native crash signals** | sentry-native runs the previous handler first and reports only what it leaves unhandled (`CHAIN_AT_START`) | CoreCLR turns faults in managed code into .NET exceptions from its own signal handlers |
| **Binary compatibility** | Linked against a glibc 2.27 sysroot, refusing unversioned symbols | Every native file must load on old distributions, and any Ubuntu from 20.04 to 26.04 builds the same result |
| **Packages** | Three packages from one self-contained publish, assembled in the WSL home folder | Linux tools are fast there and keep file permissions |

## 🖥️ Window

- **Window class**: `GnollHack`, which the desktop entry's `StartupWMClass` matches, so the desktop groups the window under the game's icon.
- **Full screen**: always in Steam's Gaming Mode (`SteamGamepadUI=1`, as on the Steam Deck) or with `--fullscreen`; otherwise the Windowed Mode setting decides.

## 🎨 Rendering and Refresh Rate

- **Renderer**: GLX, falling back to Avalonia's software renderer; Vulkan and EGL are not used. The views themselves are shared; see [[Rendering|/Development/Design Details of Avalonia Port#rendering]].
- **Swap interval**: `GHGlx` sets the GLX swap interval to 1 for every new drawable, and checks that it took effect.
- **Render timer**: Avalonia's render timer keeps a stale refresh rate, so frames arrived below the display's rate; the frame loop raises the timer's rate when it lags behind the estimate.
- **Monitor rate**: read through RandR by `GHRandr`; how it combines with the estimate is in [[Frame Loop and Refresh Rate|/Development/Design Details of Avalonia Port#frame-loop-and-refresh-rate]].

## 🎮 Game Controllers

- **Backend**: `GHEvdevGamepadBackend` reads `/dev/input/event*` on the UI thread and finds new pads by itself. `GNOLLHACK_GAMEPAD_EVDEV` is `auto` (the default), `off`, or `any`, which also reads physical pads on a Steam Deck.
- **Steam Deck**: the player needs a Steam Input layout that outputs a gamepad; with a keyboard and mouse layout, no virtual pad exists and the controls do nothing.
- **Back grips**: the virtual pad has no paddle buttons, so GnollHack's Steam Input layout sends the grips as F2 to F5, and the game turns them back into grips.
- **File dialogs**: Gaming Mode has no FileChooser portal, and its GTK dialogs take no controller input, so the game draws its own dialog there.
- **Shared controller code and testing**: [[/Development/Gamepad Support]] and [[/Development/Testing Avalonia Linux Version on Steam Deck]].

## 🔤 Fonts

- **Web pages**: `GHAvaloniaFontConfig` writes a `fonts.conf` into the data folder at every start, adding the bundled Noto Color Emoji font, and sets `FONTCONFIG_FILE` with the C library's `setenv`, so that CEF's processes inherit it; .NET would change only its own copy of the environment.
- **AppImage**: the bundled fonts are first copied to the data folder, because the AppImage is mounted at a new path on every start and fontconfig would otherwise rebuild its cache every time.

## 🔊 Game Engine, Data and Sound

- **Game engine**: `libgnollhacklinux.so`, built by `gnollhacklinux.vcxproj` in WSL as a Unix library with the mobile options. It installs no signal handlers, so its crashes reach Sentry.
- **Game data**: the Android version's `nhdat`. Its WSL pipeline also writes the version header the engine compiles against, so it runs first.
- **Save recovery**: `recover` ships in `gnh\` for recovering a save by hand; the game never runs it.
- **Sound**: FMOD is loaded by its exact file name, `libfmod.so.14`, because FMOD Studio loads its core library by that name, and a copy under any other name would be a second FMOD instance that breaks Studio.

## 🌐 Chromium Web View (CEF)

The managed bindings are CefGlue, and the native CEF build comes from a NuGet package, both referenced for Linux only. The code is in `Platforms\Linux\Cef\`.

| Aspect | Choice | Why |
|:-------|:-------|:----|
| **Engine selection** | `GNOLLHACK_WEBVIEW` (`cef` or `native`), then the `AvaloniaWebViewEngine` preference in developer mode, then CEF if `libcef.so` is present. WebKitGTK if CEF fails to start; the system's browser if neither works | WebKitGTK must be installed on the system, CEF ships with the game |
| **Packaging** | GnollHack copies CEF's files itself, flat next to the executable, with the English locale only | The package's own build step leaves CEF unable to find its ICU data, and copies nothing on publish |
| **Loading** | Only when the first web view needs it | CefGlue's runtime class installs a library resolver that scans the disk as soon as it is touched |
| **Sandbox** | None, and no zygote process | Steam's Linux runtime container does not provide what Chromium's sandbox needs |
| **GPU** | Not used | The CEF package has no ANGLE, and off-screen pages are painted on the CPU anyway |
| **Signal handlers** | Chromium installs none; the game checks after CEF starts that Sentry's are still in place | Chromium would otherwise reset Sentry's crash handlers |
| **Rendering** | Off-screen into an Avalonia bitmap; pop-ups stay inside the view; a hidden view stops painting | Avalonia has no event for a control hidden through one of its ancestors, so the view watches them itself |
| **Threading** | Avalonia's UI thread, through CEF's external message pump; every callback catches its own exceptions | An exception that escapes a CEF callback ends the game |
| **Clipboard and file dialogs** | Avalonia's | Chromium's X11 clipboard blocked the page on paste and missed the system clipboard; its portal dialog listed no files when the page filtered by type |
| **Steam Linux Runtime 4.0** | Its Steam content ships `libatk-bridge-2.0.so.0` and `libatspi.so.0` | The runtime lacks them, and `libcef.so` links against them |

## 🐞 Crash Reporting

The shared model is in [[Crash Reporting|/Development/Design Details of Avalonia Port#crash-reporting]]. On Linux:

- **sentry-native**: `libsentry.so`, built without a network transport, started by `GHSentryNative`, with its Linux options set by `GHAvaloniaSentryNative`.
- **Signal stacks**: `SIGILL`, `SIGTRAP`, `SIGBUS` and `SIGFPE` run on the thread's own stack, because CoreCLR's chained handler overflows the alternate stack; `SIGSEGV` keeps it, for native stack overflows.
- **Tags**: `linux.package` (`appimage`, `steam` or `other`), `linux.container` (`pressure-vessel` inside Steam's container), `linux.session` (such as `x11` or `wayland`) and `linux.glibc`.
- **The whole mechanism**, and how `libsentry.so` follows a Sentry update, is on [[/Development/Native Crash Reporting in Avalonia Port]].
- **Missing libraries**: `NativeLibraryPreflightLinux` reports a native library that fails to load, explains it on standard error and in a dialog, naming the glibc versions when glibc is too old, and exits. No Avalonia window exists yet at that point.

## 🐧 Binary Compatibility

Every native file in the packages must load on glibc 2.27 and the libstdc++ of GCC 8, which is not bundled. The player-facing requirements are in [[/Linux System Requirements]].

- **Sysroot**: the game engine, `recover` and `libsentry.so` are compiled and linked against glibc 2.27 from Ubuntu 18.04, in `/opt/gnollhack/sysroot-glibc-2.27`, not against the build computer's glibc.
- **No unversioned symbols**: the linker refuses any function that glibc 2.27 lacks (`-z defs`), which would otherwise pass every version check and crash the game on an older system.
- **Packaging check**: `Build-LinuxPackages.ps1` reads the glibc and libstdc++ versions every native file needs, CEF and SkiaSharp included, and stops if any is above the floor set at the top of the script.

## 📦 Packages

- **AppImage**: with update information for GitHub releases. The game offers once to add itself to the desktop's application menu, unless an AppImage manager already did; the settings can add or remove the entry.
- **Steam depot content**: for the Steam Linux Runtime 4.0 by default, or 3.0 (sniper), with SteamPipe scripts filled in from templates.
- **tar.gz**: the game as a plain folder, for testers.
- **Game engine**: shipped stripped of its debug information but with its build ID, by which Sentry matches crashes to the full copy that a Release publish uploads.

## 📁 Dedicated Files

Paths are relative to `Platforms\Linux\` unless the row says otherwise.

### 🖥️ Display, Controllers and Fonts

| File | Role |
|:-----|:-----|
| **Rendering\GHGlx.cs**, **GHRandr.cs** | GLX swap interval; the monitor's refresh rate through RandR |
| **GHEvdevGamepadBackend.cs**, **GHEvdevNative.cs** | Controllers through evdev, and its native calls |
| **Packaging\steam\input\controller_neptune.vdf**, **Packaging\steam\input\gnollhack_input_manifest.vdf**, **Packaging\steam\input\README.md** | GnollHack's Steam Input layout |
| **GHAvaloniaFontConfig.cs**, **fonts\NotoColorEmoji.ttf**, **fonts\NotoColorEmoji-LICENSE.txt** | fontconfig for web pages; the emoji fallback font and its license |

### 🔊 Game Engine and Sound

| File | Role |
|:-----|:-----|
| **win\win32\vs\gnollhacklinux.vcxproj** | Path from the repository root: builds the game engine in WSL into `libs\` |
| **libs\libfmod.so.14**, **libs\libfmodstudio.so.14** | FMOD sound |
| **gnh\recover** | Save recovery utility |

### 🌐 Web View

| File | Role |
|:-----|:-----|
| **Cef\GHCefEngine.cs** | Engine selection |
| **Cef\GHCefRuntime.cs**, **Cef\GHCefApp.cs**, **Cef\GHCefSubprocess.cs** | Loading, settings, helper processes |
| **Cef\GHCefWebViewHandler.cs**, **Cef\GHCefWebViewControl.cs**, **Cef\GHCefClient.cs**, **Cef\GHCefInput.cs** | .NET MAUI handler, off-screen control, CEF client, input mapping |
| **Cef\GHCefRenderProcessHandler.cs**, **Cef\GHCefOverseerHost.cs** | JavaScript bridge; the Gnoll Overseer page's host |
| **libs-steamrt4\libatk-bridge-2.0.so.0**, **libs-steamrt4\libatspi.so.0**, **libs-steamrt4\licenses\at-spi2-core\copyright** | Libraries CEF needs in the Steam Linux Runtime 4.0, and their license |
| **licenses\cef\LICENSE.txt**, **licenses\cef\CREDITS.html** | CEF's and Chromium's licenses |

### 🐞 Crash Reporting

| File | Role |
|:-----|:-----|
| **GHAvaloniaSentryNative.cs** | sentry-native's signal strategy, `SA_ONSTACK` flags and handler check |
| **NativeLibraryPreflightLinux.cs** | Missing-library report |
| **GHIBusDestroyReplyFilter.cs** | Keeps a harmless IBus reply out of Sentry |
| **libs\libsentry.so**, **libs\libsentry.build.props**, **licenses\sentry-native\LICENSE**, **licenses\sentry-native\LICENSE-libunwind** | sentry-native, the version record the build checks, and its licenses |

### 📦 Packaging

| File | Role |
|:-----|:-----|
| **Packaging\Build-LinuxPackages.ps1** | Publish and all three packages |
| **Packaging\Build-LinuxRecover.ps1**, **Packaging\Build-LinuxSentryNative.ps1**, **Packaging\Install-LinuxSysroot.ps1** | Build `recover` and `libsentry.so`; install the glibc 2.27 sysroot |
| **Packaging\Deploy-SteamDeck.ps1**, **Packaging\steamdeck\run-gnollhack.sh** | Deploy to a Steam Deck, and its launcher |
| **Packaging\AppRun**, **Packaging\gnollhack.desktop**, **GHAvaloniaDesktopEntry.cs** | AppImage start script, desktop entry, application menu entry |
| **Packaging\steam\app_build_linux.vdf.template**, **Packaging\steam\depot_build_linux.vdf.template** | SteamPipe build scripts |

## ⚠️ Workarounds

The Linux version works around defects in CEF, Steam, the Steam Linux Runtime and Linux desktop components, each recorded in the GnollHack repository's register: [linux.md](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/linux.md), [cef.md](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/cef.md) and [steam.md](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/steam.md). Those of the shared code are under [[Workarounds|/Development/Design Details of Avalonia Port#workarounds]].

## 📖 Learn More

- [[/Development/Design Details of Avalonia Port]]
- [[/Development/Avalonia Port]]
- [[/Development/Design Details of macOS Avalonia Port]]
- [[/Development/Design Details of Windows Avalonia Port]]
- [[/Development/Native Crash Reporting in Avalonia Port]]
- [[/Development/Build Instructions for Avalonia Linux Version on Windows]]
- [[/Linux System Requirements]]
- [[/Development/Design Details]]

## 🔗 External Links

- [linux.md workaround register](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/linux.md)
- [cef.md workaround register](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/cef.md)
- [steam.md workaround register](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/steam.md)
- [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef)
- [sentry-native](https://github.com/getsentry/sentry-native)
- [AppImage documentation](https://docs.appimage.org/)
- [Steam Linux Runtime](https://gitlab.steamos.cloud/steamrt/steam-runtime-tools/-/blob/main/docs/container-runtime.md)
