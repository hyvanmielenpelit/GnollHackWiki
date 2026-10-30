> 👉 **This page explains how the Linux version of GnollHack is put together and why: how the .NET MAUI app runs on Avalonia, how it starts, draws, reads the keyboard and stores its files, how the built-in Chromium web view works, how crashes reach Sentry, and how the packages stay compatible with old Linux distributions.**

For what the Avalonia port is, see [[/Development/Avalonia Port]]. For building it, see [[/Development/Build Instructions for Avalonia Linux Version on Windows]].

## ℹ️ Overview

The Linux version is the `linux-x64` flavor of the Avalonia port. Most of its design is shared with the Windows flavor, which is built from the same project with the same code; this page describes all of it. The Windows flavor's differences are on [[/Development/Design Details of Windows Avalonia Port]].

In this page, `Platforms\` means `win\win32\xpl\GnollHackM\Platforms\`. The Avalonia-only C# code is in `Platforms\Avalonia\`, the CEF code in `Platforms\Avalonia\Cef\`, and the files that only the Linux version ships in `Platforms\Linux\`.

## 🏗️ Project Structure

### ⚙️ The GnhAvalonia Build

The Avalonia port is `GnollHackM.csproj` built with `-p:GnhAvalonia=true`. That property:

- sets the target framework to plain `net11.0`, with no platform suffix, and registers Avalonia.Controls.Maui as the app's .NET MAUI backend (`MauiActiveBackend=avalonia`, with `Platforms\Avalonia\` as its platform folder);
- takes the runtime identifier from the computer that builds, unless `-r` names one, so a plain build on Windows is the Windows flavor and the Linux flavor needs `-r linux-x64`;
- replaces the preprocessor symbols instead of adding to them: only `GNH_MAUI`, `GNH_AVALONIA`, `USE_SPAN_FOR_SUBSTRING` and `CORECLR`, plus `LINUX` and `SENTRY` for a Linux runtime identifier;
- turns off the `Main` that Avalonia.Controls.Maui would generate, .NET MAUI's image processing, and globalization data (`InvariantGlobalization=true`).

Because the target framework is not `-windows`, `WINDOWS` is never defined, and none of the WinUI 3 code is compiled into either flavor.

### 🧱 Why Avalonia.Controls.Maui and .NET 11

.NET MAUI has no Linux backend. Avalonia.Controls.Maui implements .NET MAUI's controls on Avalonia UI, so the same XAML pages and C# code run on Linux without a second user interface. Avalonia.Controls.Maui is built only for .NET 11 and .NET MAUI 11, and the build support for an external .NET MAUI backend exists only in the .NET MAUI 11 build tasks. The Avalonia port is therefore a .NET 11 app, while the shipped Android, iOS and WinUI 3 clients stay on .NET 10.

Two `global.json` files keep the two SDKs apart. `GnollHackM\global.json` selects the SDK of the shipped clients. `Platforms\Avalonia\global.json` pins the Avalonia port's SDK and .NET MAUI workload set, and allows a preview or release candidate, so `dotnet` must run in that folder for every Avalonia build.

The Avalonia.Controls.Maui packages, and `Microsoft.Maui.Controls` for .NET 11, are referenced in `GnollHackM.csproj` and pinned together. Avalonia itself and Avalonia's web view package come with them.

### 🏃 Runtime

Both flavors run on CoreCLR with the JIT, like the WinUI 3 version. Android and iOS run Mono. The publish is self-contained, so the game needs no .NET installed, and it is neither trimmed nor compiled ahead of time.

### 🔀 Shared Code

About 23 shared files branch on `GNH_AVALONIA` or `LINUX`, with about a hundred conditional blocks; `GHApp.cs`, `OverseerPage.xaml.cs`, `SwitchableCanvasView.xaml.cs` and `MauiProgram.cs` have the most. The branches fall into a few kinds:

- **Startup and hosting**: handler registration and early setup in `MauiProgram.cs`.
- **Frame loop and frame rate**: the platform frame loop, the 90 FPS map refresh option, which only the Avalonia port offers, and the defaults for tile batching and rectangle fixing, which follow the WinUI 3 version.
- **Desktop input**: most branches are `WINDOWS || GNH_AVALONIA` pairs that reuse the WinUI 3 version's mouse hover, cursor and mouse wheel code.
- **Platform identity**: `IsDesktop` is true, `IsLinux` is true on Linux, and the version pages show "Linux Avalonia" or "Windows Avalonia".
- **Native library and files**: `GnollHackService.cs` names the game engine library, reads assets from the application folder instead of an app package, and takes its data folder from `GHAvaloniaPaths`.
- **Web view and Gnoll Overseer**: see [[Web View Engine|#web-view-engine]].

Thread handling has no branches: shared code keeps marshaling to the UI thread with `MainThread.BeginInvokeOnMainThread`, while the Avalonia-only code uses Avalonia's `Dispatcher.UIThread` directly.

## 🚀 Startup

GnollHack writes its own `Main`, in `AvaloniaDesktopProgram.cs`, instead of using the one Avalonia.Controls.Maui generates, because several things must happen on Linux before Avalonia starts:

1. **CEF helper processes leave at once.** Chromium's renderer, GPU and utility processes are started from the game's own executable, with a `--type=` argument. `Main` hands them to CEF before anything of the game is initialized.
2. **HarfBuzzSharp is preloaded** with `RTLD_NOW` (WA-SKIASHARP-0009). With FreeType 2.14 and later, fontconfig loads the system HarfBuzz globally while it scans fonts, and HarfBuzzSharp's lazily bound calls would then go to the system copy and abort.
3. **fontconfig is configured**, before any other thread starts, because changing the environment is not safe while another thread reads it. See [[Fonts|#fonts]].
4. **A native library resolver** is installed for `fmod`, `fmodstudio` and `sentry`. See [[Game Engine, Data and Sound|#game-engine-data-and-sound]].
5. **Avalonia starts** with X11 options (see [[Window|#window]]) and a 1 GiB Skia GPU resource budget, and runs the .NET MAUI app.
6. **CEF shuts down** after the window has closed and Avalonia has returned.

`MauiProgram.CreateMauiApp` then sets up the .NET MAUI side, in this order:

1. The replacement Essentials APIs are installed, because `GHApp`'s static initializers already read the device display, device information and app information. See [[Essentials|#essentials]].
2. The web view engine is chosen (Linux only).
3. Mapper fixes are registered for margins, layout input transparency, control colors, alignment and the web view. They must be in place before any handler is created.
4. The secrets file is read, and Sentry starts (Linux only).
5. The app is built with Avalonia.Controls.Maui, its Essentials and its SkiaSharp views, and GnollHack's own handlers replace Avalonia.Controls.Maui's for `SKGLView`, `SKCanvasView`, `CustomLabel` and, with CEF, `WebView`.
6. The window hooks are attached to the window before it is shown.
7. Preferences and app information are installed again, because Avalonia.Controls.Maui's builder replaced them, and GnollHack's font registrar replaces Avalonia.Controls.Maui's.

The app ends through Avalonia's desktop lifetime: closing the application posts a shutdown to Avalonia's UI thread.

## 🖥️ Window

The Linux version uses Avalonia's X11 backend; on Wayland desktops it runs through XWayland. The window's options are set in `AvaloniaDesktopProgram.cs`:

- **Rendering mode**: GLX, with Avalonia's software renderer as the fallback. Vulkan and EGL are not used.
- **Popups**: drawn inside the main window (`OverlayPopups`), not as separate X11 windows.
- **Window class**: `GnollHack`, which the AppImage's desktop entry matches with `StartupWMClass`, so the desktop groups the window under the right icon.

`GHAvaloniaWindowHooks.cs` sets up the window before it is shown:

- **Full screen**: the window opens full screen unless the Windowed Mode setting is on, as on Windows. It always opens full screen in Steam's Gaming Mode (`SteamGamepadUI=1`, as on the Steam Deck) or with `--fullscreen`.
- **Windowed bounds**: the position, size and maximized state are saved, and restored only when they still overlap a screen; otherwise the window is centered.
- **Icon**: the game's PNG icon as is, since the window manager scales it.
- **Keyboard, frame loop and display tracking** start when the window opens and stop when it closes. Closing the window also closes all CEF browsers.

## 🎨 Rendering

The game's SkiaSharp views are drawn by GnollHack's own Avalonia controls rather than by Avalonia.Controls.Maui's:

- **GPU views** (`SKGLView`, which includes the map): `GHAvaloniaGLControl` keeps one GPU surface per pixel size and paints into it on Avalonia's render thread, then draws a snapshot of it onto Avalonia's canvas. It skips the paint when the game has sent no new render data, so a replay of the same frame costs nothing. Under the software renderer it paints into a CPU surface instead.
- **CPU views** (`SKCanvasView`): `GHAvaloniaCanvasControl` paints on the UI thread, outside Avalonia's render pass, and hands the finished image to the render thread (WA-AVALONIA-0010). GnollHack's views read and write .NET MAUI properties while they paint, which is not allowed during Avalonia's render pass. Paint requests are merged into one, run after layout, and a view that asks for another paint from its own paint waits behind input.

All GPU views share Avalonia's single Skia GPU context, so GnollHack does not manage that context's resource cache as it does on the other clients; the 1 GiB budget set at startup takes its place. GPU surfaces are released through `GHGLResourceGraveyard`, which disposes them only on the render thread with the context current. It also disposes resources of a context that Avalonia has already replaced, since Skia would otherwise free only their CPU side.

Avalonia.Controls.Maui's own Skia handlers have defects that GnollHack's handlers work around: their property mappers do nothing (WA-AVALONIA-0002), aligned views collapse to zero size (WA-AVALONIA-0003), and they raise no mouse hover (WA-AVALONIA-0009). The files are in `Platforms\Avalonia\Rendering\`.

## ⏱️ Frame Loop and Refresh Rate

On the other clients, the platform drives GnollHack's frames: WinUI 3's rendering event, Android's Choreographer and iOS's display link. On Avalonia, `GHAvaloniaFrameLoop` asks the window for an animation frame, asks again from inside the callback, and calls the shared frame handler each time.

Avalonia reports neither the display's refresh rate on Linux nor when a frame is presented, so `GHRefreshRateEstimator` measures it from the last 120 frame intervals. When frames are paced by vertical sync, it takes the median, which a missed frame does not move; otherwise it takes the mean without the slowest 5 percent of frames. The estimate becomes the device display's refresh rate, which the game's frame skipping uses.

On Linux, `GHGlx` sets the GLX swap interval to 1 for every new drawable, through `GLX_EXT_swap_control` or `GLX_MESA_swap_control`, and checks that it took effect. With the swap interval on, frames arrived below the display's rate, because Avalonia's render timer keeps a stale refresh rate from RandR; GnollHack raises the timer's rate when it lags behind the estimate (WA-AVALONIA-0014).

The map refresh rate setting offers 90 FPS in the Avalonia port, in addition to the rates the other clients offer.

## ⌨️ Keyboard and Mouse

`GHAvaloniaKeyboard` handles keys on the window before any control sees them, as the WinUI 3 version's low-level keyboard hook does. The game therefore gets Tab, the arrow keys and Alt combinations before Avalonia uses them for focus navigation, access keys or back navigation.

- Special keys and Ctrl or Alt combinations go to the game when the key goes down, with the key tables of the WinUI 3 version; Ctrl with a letter becomes the matching control character.
- Characters come from Avalonia's text input, so keyboard layouts, dead keys and AltGr work. Ctrl+Alt counts as AltGr.
- The system keeps `Win`/`Super` combinations, `Alt+Tab` and `Alt+F4`.
- A key the game does not take goes on to the focused control.

The mouse uses the WinUI 3 version's desktop code: hover, at most 120 moves per second, and mouse wheel events, which Avalonia.Controls.Maui delivers as touch actions in WinUI's wheel units. The game's Windows cursor files are converted to Avalonia cursors at run time by `GHAvaloniaCursors`, using the 64-pixel cursors on high-density displays.

## 🎮 Game Controllers

The Linux version reads **Steam Input's virtual gamepad**, not the Steam Deck's own controller, so the player needs a Steam Input layout that outputs a gamepad. `GHEvdevGamepadBackend` reads the pad from `/dev/input/event*` with non-blocking reads on the UI thread, watches the folder with inotify for new pads, and never grabs a device. Steam may recreate the pad when an app starts, and the backend opens the new one by itself. With a keyboard and mouse layout no virtual pad exists, and the controls do nothing.

- **Shared code**: `GHAvaloniaGamepad` polls `GHGamepadService` from the frame loop. The service, the page navigation and the button hints are in `GnollHackX\Gamepad\`, and the radial menus in `GnollHackX\Radial\`. This code is shared with the other clients, which have no backend yet.
- **Back grips**: the virtual pad has no paddle buttons, so GnollHack's Steam Input layout sends the grips as F2 to F5, and `GHGamepadKeyBridge` turns them back into grips (WA-STEAM-0001).
- **File dialogs**: Gaming Mode has no FileChooser portal, and its GTK dialogs take no controller input, so the game draws its own dialog there and whenever the last input came from a controller (WA-STEAM-0002).
- **Avalonia Windows**: `GHXInputGamepadBackend` reads Xbox controllers through XInput. This flavor is for development and testing only, so it is not a test of what players get.

The control scheme, the Steam Input layout and how to publish it are in the GnollHack repository's `DEVEL\gamepad_controls.md`. For testing on a device, see [[/Development/Testing Avalonia Linux Version on Steam Deck]].

## 🔤 Fonts

The game's own fonts are added to the build as Avalonia resources, because Avalonia.Controls.Maui leaves .NET MAUI's font items out of it (WA-AVALONIA-0012). They are loaded by `GHAvaloniaFontRegistrar` instead of Avalonia.Controls.Maui's registrar, which misreads font names stored in UTF-16 (WA-AVALONIA-0011). The registrar also copies each font's Windows ascent and descent into its horizontal header: Avalonia lays out text with the horizontal header, while DirectWrite, and so the WinUI 3 version, uses the Windows metrics, and some fonts sat visibly higher on Linux than on Windows.

Web pages use the system's fonts through fontconfig. At every start, `GHAvaloniaFontConfig` writes a `fonts.conf` into the data folder that includes the system configuration, adds the game's bundled Noto Color Emoji font, which web pages fall back to, and keeps fontconfig's cache in the data folder. It sets `FONTCONFIG_FILE` with the C library's `setenv`, so that CEF's processes inherit it; .NET would change only its own copy of the environment. The file is written again at every start because the game's folder can move.

In the AppImage, the bundled fonts are first copied to the data folder (WA-LINUX-0001). The AppImage is mounted at a new path on every start, and fontconfig keys its cache by folder, so it would otherwise rebuild the cache every time.

## 🧰 Essentials

Avalonia.Controls.Maui's Essentials implement only a few of .NET MAUI's Essentials APIs; the rest throw an exception (WA-AVALONIA-0013). GnollHack installs its own implementations into .NET MAUI's static facades, from `Platforms\Avalonia\Essentials\`:

| API | Implementation |
|:----|:---------------|
| **Preferences** | Kept in memory and written to `preferences.json` in the data folder shortly after a change and at exit, through a temporary file. An unreadable file is kept aside as `.corrupt`. GnollHack replaces Avalonia.Controls.Maui's own implementation too, since preferences are read before the app is built. |
| **Secure storage** | One AES-GCM encrypted file, `securestore.bin`, readable only by the user. The key is derived from `/etc/machine-id`, so the protection is obfuscation-level only. |
| **Battery** | Read from `/sys/class/power_supply` every minute. Energy saver is always off. |
| **Connectivity** | From .NET's network information, with change events posted to the UI thread. |
| **Device display** | Follows the window's screen; the refresh rate is the frame loop's estimate. |
| **Device information** | Platform "Linux", desktop idiom, model and manufacturer from DMI, version from `os-release`. |
| **App information** | Unpackaged; the version and build number come from the executable. |
| **Launcher** | Avalonia's launcher, for web, mail and file addresses. |
| **Browser** | When Steam's overlay is loaded into the game, Steam's own browser; otherwise Avalonia's launcher, `gio open` and `$BROWSER`, in that order. |
| **Share** | Desktop behavior: a file goes to a save dialog, several files to a folder, and text to the clipboard. |

Storage permissions are always granted, since desktop storage needs no runtime permission.

## 📁 Files and Folders

The game reads its own files only from the folder of the executable, and writes only to its data folder, `~/.local/share/GnollHack`, which `GHAvaloniaPaths` creates if it is missing:

| Path in the data folder | Contents |
|:------------------------|:---------|
| **(root)** | The game's own files, such as saved games and options |
| **preferences.json** | The app's settings |
| **securestore.bin** | Secure storage |
| **cef/** | CEF's cache and log, and temporary HTML pages |
| **fontconfig/** | The generated `fonts.conf` and fontconfig's cache |
| **fonts/** | The bundled fonts, in the AppImage only |
| **sentry-native/** | Native crash reports waiting to be sent |
| **sentry-dotnet/** | The .NET crash reporter's session and unsent events |

## 🔊 Game Engine, Data and Sound

- **Game engine**: `libgnollhacklinux.so`, built by `win\win32\vs\gnollhacklinux.vcxproj` remotely in WSL, as a Unix library with the mobile options, like the Android engine. It installs no signal handlers of its own, so crashes in it reach Sentry's handler (see [[Crash Reporting|#crash-reporting]]), and it recovers interrupted games itself.
- **Game data**: the Linux version ships the `nhdat` and the other files of the Android version, built by the WSL data pipeline of `GnollHack.sln`. That pipeline also writes the version header the Linux engine compiles against, so it must run before the engine is built.
- **Save recovery utility**: `recover`, built by `Build-LinuxRecover.ps1` and committed to `Platforms\Linux\gnh\`, as `recover.exe` is shipped on Windows. The game never runs it; it is for recovering a save by hand.
- **Sound**: FMOD's `libfmod.so.14` and `libfmodstudio.so.14` are committed to `Platforms\Linux\libs\` and shipped under those names, with the Desktop sound banks. The FMOD Studio library loads its core library by that file name, so the resolver in `Main` loads exactly that file: a core library loaded under any other name would be a second FMOD instance, in which the Studio system's core handle is invalid.
- **Tile sets**: the same ones as the Windows versions.

## 🌐 Web View Engine

In-game web pages, such as this wiki and [[/Gnoll Overseer]], use the Chromium Embedded Framework (CEF), which ships with the game, so players need no web browser components. The managed bindings are CefGlue, and the native CEF build comes from a NuGet package; both are referenced in `GnollHackM.csproj` for Linux only, at matching versions. The code is in `Platforms\Avalonia\Cef\`, and none of it is compiled into the Windows flavor.

### 🔀 Engine Selection

The engine is chosen once, early in `MauiProgram.CreateMauiApp`:

1. The environment variable `GNOLLHACK_WEBVIEW`: `cef`, or `native` for WebKitGTK.
2. Otherwise, in developer mode only, the preference `AvaloniaWebViewEngine`, with the same values. It has no setting in the game's user interface.
3. Otherwise CEF, if `libcef.so` is in the game's folder.

If CEF is chosen but fails to start, web views use Avalonia's WebKitGTK web view instead, and CEF is not tried again. WebKitGTK must be installed on the system for that. If neither engine is available, the game opens the wiki in the system's web browser.

### 📦 Packaging

GnollHack copies CEF's files itself rather than with the package's own build step, which keeps CEF's resources in a subfolder where CEF cannot find its ICU data, and copies nothing on publish (WA-CEF-0001). The files land flat next to the executable. Only the English locale is shipped, and the `chrome-sandbox` helper is left out. CEF's and Chromium's licenses are in `Platforms\Linux\licenses\cef\`, and must be refreshed with every CEF update.

CEF is loaded only when the first web view needs it. As soon as CefGlue's runtime class is touched, it installs a native library resolver that scans the disk for every library that .NET fails to find (WA-CEF-0002).

### ⚙️ Processes and Settings

Chromium's helper processes run the game's own executable, and leave `Main` before the game starts. Every helper process watches the game's process and exits shortly after it, so a crashed game leaves no CEF processes behind. A second game started while CEF runs does not open a browser window in the first one.

CEF runs with these choices:

- **No sandbox and no zygote process** (WA-LINUX-0003). Steam's Linux runtime container does not provide what Chromium's sandbox needs.
- **No GPU.** The CEF package has no ANGLE, and the pages are painted on the CPU for off-screen rendering anyway.
- **X11**, like the game window.
- **No component updates and no background networking**, and a basic password store instead of the desktop keyring.
- **No signal handlers of Chromium's own**, so that Chromium does not reset the crash handlers that Sentry installed. After CEF starts, the game checks that the handlers are still in place.
- **A cache in the data folder**, under `cef/`, and no persistent session cookies.

### 🎨 Off-Screen Rendering

CEF renders each page without a window of its own: it hands the game the changed parts of each frame, which the game copies into an Avalonia bitmap and draws as an ordinary Avalonia control. Pop-ups, such as the lists of drop-down boxes, are drawn the same way, kept inside the web view. Because the page is an ordinary control, Avalonia content can be drawn on top of it, unlike a native web view, which is a separate window above the game.

Avalonia has no event for when a control becomes visible or hidden through one of its ancestors, so the web view watches the visibility of all its ancestors and tells CEF, which stops painting a hidden browser (WA-AVALONIA-0017).

### 🧵 Threading

CEF runs on Avalonia's UI thread through CEF's external message pump: CEF asks for work, and the game schedules it on Avalonia's dispatcher, at most 33 milliseconds apart. Every CEF callback catches its own exceptions, because an exception that escapes one would end the game. The web view raises its events to .NET MAUI afterward, never inside a CEF callback; only the start of a navigation is reported at once, so that the page can cancel it.

### ⌨️ Input

The web view forwards keys, characters, mouse buttons, mouse movement, the mouse wheel and touch to CEF, with the key codes that Chromium's own X11 code would produce.

- **Clipboard**: copy, cut and paste shortcuts are handled by the game through Avalonia's clipboard (WA-CEF-0003). Chromium's own X11 clipboard blocked the page on paste and did not reach the system clipboard on copy.
- **File dialogs**: use Avalonia's file dialogs. Chromium's own portal dialog listed folders but no files when the page filtered by file type.
- **Not supported**: input method composition inside the page (composed text arrives when it is committed), context menus and an on-screen keyboard of the web view's own. In Gaming Mode, the controller opens Steam's on-screen keyboard for a text field.
- **Escape** never reaches the page: the game window takes it first.

### 🔌 JavaScript Bridge

For [[/Gnoll Overseer]], each page gets a `window.GnollHackBridge` object before the page's own scripts run. It is defined outside the page's scripts, so the page's Content Security Policy does not apply to it. Messages from it reach the game only from the main frame, and the Overseer page accepts them only from its own origin. Scripts the game runs in the page are sent to CEF's renderer process directly, without .NET MAUI's `eval` wrapper, which the Overseer's Content Security Policy refuses (WA-MAUI-0027).

### 🧭 Navigation

- New windows and pop-ups are never opened; their addresses are reported to the page, which opens them in the game or in the system's browser.
- JavaScript dialogs are answered automatically, and leaving a page is always allowed.
- HTML that the game shows directly is written to a temporary file under `cef/` and opened from there.
- The user agent and cookies of a web view are not set: CEF has one user agent and one cookie store for the whole game.

### 🔚 Shutdown

Closing the window closes all browsers. After Avalonia has returned, `Main` runs CEF's message loop by itself for up to two seconds until every browser is closed, and then shuts CEF down. If a browser is still open, the shutdown is skipped and the process simply exits, since CEF requires every browser closed first.

### 🎮 Steam Linux Runtime

The Steam Linux Runtime 4.0 lacks two accessibility libraries that `libcef.so` links against, `libatk-bridge-2.0.so.0` and `libatspi.so.0`, so CEF would fail to load (WA-LINUX-0002). The Steam content for that runtime ships them from `Platforms\Linux\libs-steamrt4\`; the AppImage, the tar.gz and the Steam content for the Steam Linux Runtime 3.0 do not.

## 🐞 Crash Reporting

The Linux version reports both .NET exceptions and native crashes to Sentry, with the same release name. The Windows flavor has no crash reporting. The code is in `GHAvaloniaSentry.cs` and `GHAvaloniaSentryNative.cs` in `Platforms\Avalonia\`, and in `GHSentryNative.cs`, which the WinUI 3 version shares.

### 🧩 Two SDKs

- **.NET exceptions** go through the Sentry .NET SDK, the core package, not the .NET MAUI integration, which does not work on the Avalonia backend.
- **Native crashes** go through sentry-native's `inproc` backend, which catches signals inside the game's own process and needs no separate crash handler program. It is built without a network transport into `libsentry.so` by `Build-LinuxSentryNative.ps1`, and committed to `Platforms\Linux\libs\`. The Sentry .NET SDK starts its own native SDK only in trimmed or ahead-of-time compiled builds, which GnollHack does not make, so GnollHack starts sentry-native itself and turns the .NET SDK's off (WA-SENTRY-0003).
- **One sentry-native version** is used on Linux and Windows. `libsentry.build.props`, written next to the library by the build script, records its version, source commit and hashes, and `GnhSentryNative.targets` checks them at build time against the Windows library and the Sentry .NET package. A mismatch is an error in Release publish and package builds, and a warning in others.

### 🚦 Start-Up

Sentry starts when a DSN is available, from the `SENTRY_DSN` environment variable or the secrets file; without one, neither SDK starts. sentry-native starts first, so that the .NET SDK can learn whether the last run crashed. Both get the same release and environment, so native and .NET events match. The .NET SDK keeps the one release health session.

Every event gets these tags, among others:

| Tag | Value |
|:----|:------|
| **linux.package** | `appimage`, `steam` or `other` |
| **linux.container** | `pressure-vessel` inside Steam's container |
| **linux.session** | The desktop session type, such as `x11` or `wayland` |
| **linux.glibc** | The system's glibc version |

### 🔁 Scope Sync

The .NET SDK's scope (tags, extras, breadcrumbs and user) is mirrored into sentry-native as it changes, so that a native crash, which runs no managed code, still carries it. Attachments are not mirrored, because a crashing process cannot read files safely.

The most important extras are the crash context: whenever the game is about to wait for the player's input, the C engine sends its debug buffers and a summary of the game state, which become the extras "Debug Buffers", "Game State" and "Crash Context Snapshot", the last with a sequence number and time. A "Scope Sync Check" extra, set at start, shows in a native event whether mirroring worked at all.

### 🚨 Signal Handlers

CoreCLR turns faults in managed code, such as a null reference, into .NET exceptions from its own signal handlers, so sentry-native must not report them as crashes. It is set to run the previous handler first and report a crash only when that handler returns without having handled the fault (`CHAIN_AT_START`).

- **Alternate signal stack**: sentry-native's handlers for `SIGILL`, `SIGTRAP`, `SIGBUS` and `SIGFPE` are changed to run on the thread's own stack (WA-SENTRY-0005). On the alternate stack, CoreCLR's handler overflowed it, and a caught `DivideByZeroException` ended the game. `SIGSEGV` keeps the alternate stack, which a native stack overflow needs. If the change fails, sentry-native is closed again.
- **No duplicates**: when a .NET exception ends the game, sentry-native is closed first, so that only the .NET report is sent.
- **Handler checks**: the handlers are recorded after start, and checked again after CEF starts; a change is logged, since inproc cannot install its handlers again.

The `#crashtest` command in wizard mode causes a segmentation fault or an abort, for testing.

### 📤 Sending Native Crashes

A native crash is sent at the next start of the game:

1. At the crash, sentry-native writes the report into its database, `sentry-native/` in the data folder. Its default location is inside the AppImage's read-only mount, because the AppImage starts the game in its own folder.
2. At the next start, sentry-native hands the report to GnollHack's transport callback, which only saves it to an outbox folder, with no network access.
3. After the .NET SDK has started, GnollHack posts the saved reports, unchanged, to Sentry's envelope endpoint for the DSN. Sending them through the .NET SDK could drop native-only fields, such as the registers and the loaded libraries (WA-SENTRY-0004).

At most 20 reports are sent at a start. A report that Sentry accepts, or rejects as invalid, is deleted; on a rate limit, a server error or no network, the rest wait for the next start. Reports older than 30 days are deleted, and at most 50 are kept.

### 🔍 Debug Symbols

The game engine is built with full debug information. A Release publish uploads that copy to Sentry as ELF debug files when `SENTRY_AUTH_TOKEN` is set, unless `-p:GnhSentryUpload=false` is given; Sentry's own build integration uploads ELF files only for Android (WA-SENTRY-0006). The packages ship the engine stripped of its debug information, which makes it about a third of the size and keeps its build ID, by which Sentry matches crashes to the uploaded copy.

### 🧱 Missing or Incompatible Libraries

If the game engine or another native library cannot be loaded, `NativeLibraryPreflightLinux` reports it to Sentry with its own grouping, explains it on the standard error output and in a dialog (with zenity, kdialog or xmessage, whichever the system has), and exits. When the cause is a too-old glibc, the message names the required and the installed version. No Avalonia window exists yet at that point.

## 🐧 Binary Compatibility

Every native file in the packages must load on glibc 2.27 and the libstdc++ of GCC 8. That covers Debian 10, Ubuntu 18.04 and RHEL 8 and newer. libstdc++ is not bundled, unlike on Android, so the system's own must be new enough. The player-facing requirements are in [[/Linux System Requirements]].

- **Sysroot**: GnollHack's own Linux binaries, the game engine, `recover` and `libsentry.so`, are compiled and linked against a copy of glibc 2.27 from Ubuntu 18.04, in `/opt/gnollhack/sysroot-glibc-2.27`, instead of the build computer's glibc. Any Ubuntu from 20.04 to 26.04 can therefore build them, and the result is the same. `Install-LinuxSysroot.ps1` installs it from pinned, hash-checked packages, and test-builds against it before marking it ready.
- **No unversioned symbols**: the linker refuses any function that glibc 2.27 does not have (`-z defs`). Without that, such a function would link without a version, pass every version check, and crash the game on an older system.
- **Packaging check**: `Build-LinuxPackages.ps1` reads the required glibc and libstdc++ versions of every native file in the publish, including CEF and SkiaSharp, and stops if any is above the floor. The floor values are at the top of that script.

Before the sysroot, the engine was built on a newer glibc, with individual math functions pinned to older versions (WA-LINUX-0004, now removed).

## 📦 Packages

All three packages are made by `Build-LinuxPackages.ps1` from one self-contained publish. The publish runs on Windows; the packages are assembled in the WSL home folder, where Linux tools are fast and keep file permissions.

- **AppImage**: built with pinned, hash-checked AppImage tools, and with update information for GitHub releases, so AppImage updaters can fetch only the changed parts. Its start script changes into the game's folder and starts `GnollHackM`. The game offers, once, to add itself to the desktop's application menu, unless an AppImage manager already did; the entry and icon have names of their own, so entries made by hand or by AppImage managers are left alone, and the game updates its entry when the AppImage moves. The menu entry can also be added or removed in the settings.
- **Steam depot content**: for the Steam Linux Runtime 4.0 by default, with the two libraries CEF needs, or for the Steam Linux Runtime 3.0 (sniper). The SteamPipe build scripts are filled in from templates.
- **tar.gz**: the game as a plain folder for testers, with an optional test runbook.

The game engine ships stripped of its debug information (see [[Debug Symbols|#debug-symbols]]). A Linux executable carries no icon of its own, so the game's PNG icon ships next to it.

## ⚠️ Workarounds

The Linux version works around defects in Avalonia, Avalonia.Controls.Maui, CEF, Sentry, SkiaSharp, the Steam Linux Runtime and .NET MAUI. Each workaround is recorded, with its symptom, cause, checks and removal condition, in the GnollHack repository's `DEVEL\workarounds\` folder, and tagged `WORKAROUND(WA-...)` in the code:

| Register | Workarounds on this page |
|:---------|:-------------------------|
| **avalonia.md** | WA-AVALONIA-0002, 0003, 0009, 0010, 0011, 0012, 0013, 0014, 0017; also 0001 (margins measured twice), 0004 to 0008 (sizes, input transparency, alignment and control colors) and 0018 (WebKitGTK ignores cancelled navigations) |
| **cef.md** | WA-CEF-0001, 0002, 0003 |
| **linux.md** | WA-LINUX-0001, 0002, 0003; WA-LINUX-0004 (removed) |
| **sentry.md** | WA-SENTRY-0003, 0004, 0005, 0006 |
| **skiasharp.md** | WA-SKIASHARP-0009 |
| **maui.md** | WA-MAUI-0027 |
| **steam.md** | WA-STEAM-0001, 0002 |

## 📖 Learn More

- [[/Development/Avalonia Port]]
- [[/Development/Design Details of Windows Avalonia Port]]
- [[/Development/Build Instructions for Avalonia Linux Version on Windows]]
- [[/Linux System Requirements]]

## 🔗 External Links

- [Avalonia UI](https://avaloniaui.net/)
- [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef)
- [sentry-native](https://github.com/getsentry/sentry-native)
- [AppImage documentation](https://docs.appimage.org/)
- [Steam Linux Runtime](https://gitlab.steamos.cloud/steamrt/steam-runtime-tools/-/blob/main/docs/container-runtime.md)
