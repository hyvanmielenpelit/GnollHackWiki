> 👉 **How GnollHack reports native crashes, faults in the game engine or in other native code, to Sentry on every client, how the parts fit together, and why it is built this way.**

Building the native crash reporting libraries, the build-time check, updating Sentry and testing are on [[/Development/Build Instructions for Native Crash Reporting]]. Paths on this page are in the GnollHack repository: `xpl` stands for `win/win32/xpl`, and a path that starts with `Platforms/` is in `xpl/GnollHackM/`.

## ℹ️ Overview

Two Sentry SDKs run in the same process:

- **Sentry .NET** reports .NET exceptions. The WinUI 3, Android and iOS versions use its .NET MAUI integration, `Sentry.Maui`; the Avalonia builds use the core `Sentry` package, because `Sentry.Maui` does not work on Avalonia.
- **sentry-native**, with its `inproc` backend, reports native crashes: a fault in the game engine or in any other native code.

On Android and iOS, `Sentry.Maui` brings and starts its own native crash handling. On the desktop, Sentry .NET starts sentry-native only in trimmed or Native AOT builds, and GnollHack's desktop builds use the JIT, so `SentryNative` is `false` in `GnollHackM.csproj`, and GnollHack starts sentry-native itself (WA-SENTRY-0003).

| Client | Sentry .NET | Native Crashes | Native Library |
|:-------|:------------|:---------------|:---------------|
| **Android** | `Sentry.Maui` | `Sentry.Maui`'s own native SDK, with the system tombstone on Android 12 and later | In the Sentry package |
| **iOS** | `Sentry.Maui` | `Sentry.Maui`'s own native SDK | In the Sentry package |
| **Windows (WinUI 3)** | `Sentry.Maui` | sentry-native, started by GnollHack | `gnhsentry.dll` |
| **Windows (Avalonia)** | `Sentry` | sentry-native, started by GnollHack | `gnhsentry.dll`, the same file |
| **Linux (Avalonia)** | `Sentry` | sentry-native, started by GnollHack | `libsentry.so` |
| **macOS (Avalonia)** | `Sentry` | sentry-native, started by GnollHack | `libgnhsentry.dylib` |

The rest of this page is about the four desktop clients. Android and iOS are summarized in [[Android and iOS|#android-and-ios]].

## 🏗️ Architecture

| Part | What It Does | File |
|:-----|:-------------|:-----|
| **sentry-native's imports and life cycle** | Imports sentry-native, starts it, writes crash reports to the outbox, uploads them, closes it; shared by the four desktop clients | `xpl/GnollHackM/GHSentryNative.cs` |
| **Scope copy** | Copies Sentry .NET's scope into sentry-native, so a native crash carries the game's crash context | `xpl/GnollHackM/GHSentryNativeScopeObserver.cs` |
| **Event fallback** | Gives an event whose exception data was lost a minimal exception or message; on every client (WA-SENTRY-0009) | `xpl/GnollHackM/GHSentryEventFallback.cs` |
| **WinUI 3 start** | Starts sentry-native before the app is built, for `Sentry.Maui` to read | `Platforms/Windows/WindowsSentryNative.cs`, `xpl/GnollHackM/MauiProgram.cs` |
| **Avalonia start** | Starts both SDKs on Linux, macOS and Windows, and sets the platform tags | `Platforms/Avalonia/GHAvaloniaSentry.cs` |
| **Windows library** | The Sentry package's static `sentry-native.lib`, linked into a DLL with GnollHack's crash shim | `Platforms/Windows/libs/gnhsentry.dll`, built from `xpl/gnhsentrywin/gnhsentry.c` and `gnhsentry.def` |
| **Linux library** | sentry-native built from its source, without a network transport | `Platforms/Linux/libs/libsentry.so` |
| **Linux signal handling** | The handler strategy, the signal stack flags and the handler check | `Platforms/Linux/GHAvaloniaSentryNative.cs` |
| **macOS library** | The Sentry package's static `libsentry-native.a`, linked unchanged into a universal dylib, with no shim | `Platforms/MacOS/libs/libgnhsentry.dylib`, exports in `Platforms/MacOS/Packaging/gnhsentry.exports` |
| **Build-time check** | Checks that every committed library is the sentry-native of the Sentry package in use | `xpl/GnollHackM/GnhSentryNative.targets` |

The three libraries are committed, each with a `.build.props` manifest that records what it was built from, because building them needs MSVC, WSL or the Mac, which an ordinary build of the game does not. The macOS dylib exists because .NET cannot load a static library, and it exports the functions of `gnhsentry.def` without the Windows-only ones, so one set of imports serves both.

A native crash goes through these steps:

1. **Start**: GnollHack starts sentry-native before Sentry .NET, with GnollHack's own transport and a database in the data folder; see [[Startup|#startup]].
2. **Context**: while the game runs, the scope observer copies Sentry .NET's tags, extras, breadcrumbs and user into sentry-native; see [[What a Report Contains|#what-a-report-contains]].
3. **Crash**: sentry-native's handler writes the report into its database, and nothing is sent from the crashing process; see [[At a Crash|#at-a-crash]].
4. **Next start**: sentry-native finds the report and hands it to GnollHack's transport, which writes it to the outbox, and Sentry .NET ends the previous session as crashed.
5. **Upload**: a background task posts the report unchanged to Sentry; see [[Sending at the Next Start|#sending-at-the-next-start]].
6. **In Sentry**: the uploaded debug symbols name the engine's functions; see [[Debug Symbols|#debug-symbols]].

## 🧠 Design Decisions

| Decision | Choice | Why |
|:---------|:-------|:----|
| **Who starts sentry-native** | GnollHack, with `SentryNative` off in Sentry .NET (WA-SENTRY-0003) | Sentry .NET starts it only in trimmed or Native AOT builds, and the desktop builds use the JIT |
| **Backend** | `inproc`, in the game's own process | Not recorded |
| **Transport** | GnollHack's own: a report is written to an outbox, and posted unchanged at the next start | Sentry .NET's `CaptureEnvelope` parses the event again and can drop fields that only native events have, such as registers and signal details (WA-SENTRY-0004) |
| **Database folder** | `sentry-native` in the game's data folder | The default, the current folder, is inside the read-only AppImage on Linux and `/` for an app started from Finder; on WinUI 3, the cache folder may be cleaned by Windows |
| **Release and environment** | Computed once, and given to both SDKs | Native and .NET events then match |
| **Sessions** | Sentry .NET's release-health session only; sentry-native's own is off, and its crashed-last-run answer ends Sentry .NET's previous session as crashed | One session per run |
| **Crash context** | Sentry .NET's scope, copied by the scope observer | The game keeps its crash context in tags, extras and breadcrumbs, which a native crash would otherwise lack |
| **Unhandled .NET exception** | Reported by Sentry .NET; GnollHack then closes sentry-native | No native duplicate of the same crash follows |
| **Windows filter** | A filter in front of sentry-native's that passes every exception on to the filter that was current before (WA-SENTRY-0001) | sentry-native's own filter does not chain, so an unhandled .NET exception would no longer reach CoreCLR |
| **Windows vectored handler** | Captures hardware faults in a list of GnollHack's native modules (WA-SENTRY-0002) | Under managed frames, such a fault ends in CoreCLR's fail-fast and never reaches the filter, the only hook `inproc` installs on Windows |
| **Linux signals** | `CHAIN_AT_START`, and `SA_ONSTACK` cleared on four signals (WA-SENTRY-0005) | CoreCLR turns faults in managed code into .NET exceptions from its own signal handlers, and its chained handler overflows the alternate stack |
| **macOS signals** | No changes | CoreCLR receives faults in managed code through Mach exception ports, before any signal is raised |
| **One sentry-native version** | The one in the Sentry package, on every desktop client, checked at build time | Native events from every client then come from the same SDK, which the C and C# code were checked against |
| **Committed libraries** | Built by scripts, recorded in manifests | Building them needs tools that an ordinary build of the game does not: MSVC and the restored Sentry package, a WSL distribution with the pinned sentry-native checkout, and the Mac with Xcode |

## 🚀 Startup

### 🪟 WinUI 3

From `MauiProgram.CreateMauiApp`:

1. **DSN, release and environment**: `WindowsSentryNative.Init` reads the DSN from the `SENTRY_DSN` environment variable, or else from the secrets file, and computes the release and the environment as below.
2. **sentry-native starts** before the app builder exists, once. `Sentry.Maui` calls its options callback twice, so a start placed there would run twice (WA-SENTRY-0007). Its database is `sentry-native` in the app's data folder.
3. **`Sentry.Maui` starts** with the same DSN, release and environment, and, with sentry-native running, the scope observer and sentry-native's crashed-last-run answer.
4. **After the app is built**, sentry-native is closed at process exit and on a terminating .NET exception, after Sentry .NET's own handler, and the upload of stored reports starts in the background.

### 🖥️ Avalonia

From `MauiProgram.CreateMauiApp`, in `GHAvaloniaSentry.Init`, on Linux, macOS and Windows:

1. **DSN**: the game reads the secrets file, then takes the DSN from `SENTRY_DSN`, or else from the secrets file. Without a DSN, neither SDK starts.
2. **Release and environment** are computed once and given to both SDKs. The release is `SENTRY_RELEASE`, or else `<assembly name>@<version>`. The environment is `SENTRY_ENVIRONMENT`, or else `debug` with a debugger attached, and `production` otherwise.
3. **sentry-native starts first.** Its database is `sentry-native` in the game's data folder (see [[Files and Folders|/Development/Design Details of Avalonia Port#files-and-folders]]). Its own session tracking is off, and its transport is GnollHack's. The crash handlers are then set up for the operating system, as below.
4. **Sentry .NET starts** with one global scope, release-health sessions and its cache in `sentry-dotnet` in the data folder. With sentry-native running, it also gets the scope observer and sentry-native's crashed-last-run answer. Before an event is sent, the event fallback runs, and on Windows the Smart App Control tag is added.
5. **Tags** are set; see [[What a Report Contains|#what-a-report-contains]].
6. **Handlers**: sentry-native is closed at process exit and on a terminating .NET exception, and the upload of stored reports starts in the background.

`GNOLLHACK_SENTRY_TEST=1` sends one test message at this point; WinUI 3 has no such switch.

### ⚙️ Crash Handlers per Operating System

| | 🪟 Windows | 🐧 Linux | 🍎 macOS |
|:--|:--|:--|:--|
| **Before `sentry_init`** | The current unhandled-exception filter is recorded | The handler strategy is set to `CHAIN_AT_START` | Nothing |
| **After `sentry_init`** | GnollHack's filter is put in front of sentry-native's, and the vectored handler is added | `SA_ONSTACK` is cleared on `SIGILL`, `SIGTRAP`, `SIGBUS` and `SIGFPE`; `SIGSEGV` keeps the alternate stack, for native stack overflows | Nothing |
| **If that fails** | sentry-native is closed, and the game runs without native crash reporting | The same | — |
| **At close** | GnollHack's filter and handler are removed first, then sentry-native is closed | sentry-native is closed | sentry-native is closed |

**Later, on Linux**, when CEF starts for the first web view that needs it, the crash signal handlers are compared with those installed at startup. A change is logged and added as a breadcrumb; sentry-native cannot reinstall its handlers.

## 💥 At a Crash

- **The report is written to disk.** sentry-native's handler thread writes the crash into its database while the crashing thread waits. Nothing is sent from the crashing process.
- **Only the first crash is reported.** Other threads that crash meanwhile wait for it, and the handlers are then removed.
- **The game engine** installs no handler of its own for crashes, so its crashes reach sentry-native.
- **Faults in .NET code are not crashes.** CoreCLR turns a null reference or a division by zero in managed code into a .NET exception.
- **An unhandled .NET exception** is reported by Sentry .NET, as a .NET event. GnollHack's own handler, which runs after Sentry .NET's, then closes sentry-native, so no native duplicate follows.

| | What Reaches sentry-native |
|:--|:--|
| **🪟 Windows** | A fault in a native module that the game called from .NET code reaches sentry-native through the vectored handler, when the module is one of `gnollhackwin.dll`, `libSkiaSharp.dll`, `fmod.dll`, `fmodstudio.dll`, `libEGL.dll`, `libGLESv2.dll` and `SkiaSharp.Views.WinUI.Native.dll`. Any other unhandled exception, except a .NET one, reaches it through the filter, which then passes it on to CoreCLR's filter, so an unhandled .NET exception still raises `AppDomain.UnhandledException` |
| **🐧 Linux** | With `CHAIN_AT_START`, CoreCLR's own handler runs first, and sentry-native reports only what CoreCLR leaves unhandled; `SIGABRT` is never passed on |
| **🍎 macOS** | CoreCLR receives faults in managed code through Mach exception ports before any signal is raised, so every signal that reaches sentry-native is a native crash |

## 📤 Sending at the Next Start

> 📢 **Important:** A native crash appears in Sentry only after the game has been started again with a network connection.

1. At the next start, `sentry_init` finds the stored crash and passes it to GnollHack's transport, which writes it to `sentry-native/outbox/<UTC time>-<id>.envelope`.
2. A background task posts each file, oldest first, unchanged to the envelope endpoint of the DSN, with a 30-second timeout. Sentry .NET's own `CaptureEnvelope` is not used (WA-SENTRY-0004).

| Response | What Happens to the File |
|:---------|:-------------------------|
| **2xx** | Deleted |
| **429** (rate limited) | Kept; uploading stops until the next start |
| **Other 4xx** | Deleted, since it can never succeed |
| **5xx or a network error** | Kept; uploading stops until the next start |

At most 20 files are uploaded per start. Files older than 30 days, and all but the newest 50, are deleted.

## 🏷️ What a Report Contains

- **The game's crash context.** As Sentry .NET's scope changes, the scope observer copies into sentry-native its tags, its extras (other values than strings as JSON), its breadcrumbs (without their data), the user's id, name, email and IP address, and the environment. A native crash therefore carries the game state that GnollHack keeps in tags, extras and breadcrumbs. Contexts, attachments and trace links are not copied.
- **The same release, environment and platform tags** as .NET events.
- **A native event** has the platform `native` and the tag `mechanism` set to `signalhandler`, with the signal as its title, such as `SIGSEGV: Segfault`.

The platform tags; a value that cannot be read is `unknown`:

| Tag | Client | Values |
|:----|:-------|:-------|
| **`linux.package`** | Linux | `appimage`, `steam` or `other` |
| **`linux.container`** | Linux | `pressure-vessel` inside Steam's container, else `none` |
| **`linux.session`** | Linux | The session type, such as `x11` or `wayland` |
| **`linux.glibc`** | Linux | The glibc version |
| **`macos.package`** | macOS | `steam`, `bundle` or `unbundled` |
| **`windows.package`** | Avalonia Windows | `steam` or `unbundled` |
| **`windows.sac_state`** | Avalonia Windows | Smart App Control: `Off`, `On`, `Evaluation` or `Unavailable` |
| **`native_load.file`**, **`native_load.win32_error`** | Avalonia Windows | When a native library fails to load: the file, and Windows' error |

## 🔣 Debug Symbols

A Release publish uploads the symbols that Sentry needs to name the engine's functions. Sentry's build integration uploads ELF files only for Android and dSYMs only for iOS and Mac Catalyst, so GnollHack uploads the others itself:

| Client | Uploaded | By |
|:-------|:---------|:---|
| **Windows (WinUI 3 and Avalonia)** | `gnollhackwin.pdb`, when its debug ID matches the DLL's; `gnhsentry.pdb`, only on the computer that built the committed `gnhsentry.dll`, since its hash must match the manifest's | GnollHack |
| **Linux** | The full `libgnollhacklinux.so`; the packages ship it stripped, with the build ID by which Sentry matches the two (WA-SENTRY-0006) | GnollHack |
| **macOS** | The engine's `libgnollhackmac.dylib.dSYM`, and `libgnhsentry.dylib`, whose symbol table names its functions (WA-SENTRY-0011) | GnollHack |
| **Android** | The full `libgnollhackdroid.so` | GnollHack, beside Sentry's own upload |
| **iOS** | The dSYMs, copied from the Mac before Sentry's upload runs | Sentry, after GnollHack's copy |

`libsentry.so`'s own symbols are not uploaded. When an upload runs, and how to turn it off, is in [[Upload Debug Symbols|/Development/Build Instructions for Native Crash Reporting#8-upload-debug-symbols]].

## 📱 Android and iOS

- **Native crashes** are caught by the native SDKs that `Sentry.Maui` brings, which GnollHack configures but does not build.
- **Crash context**: scope sync is on, so a native crash carries the same game state as on the desktop.
- **Android** also sends the system tombstone on Android 12 and later, merged with the native event, which adds every thread's stack and the system's crash record.
- **No build-time check** runs for them: the native SDKs come with the Sentry package.

## 🚧 Limits

- **Only the first crash** of a run is reported.
- **No report before the next start** with a network connection.
- **`libsentry.so`'s own symbols** are not uploaded, so frames inside it have no function names.
- **On Linux, CEF** could replace sentry-native's handlers, and the game can only detect that, not undo it.
- **On Windows**, the vectored handler covers only the modules in its list.
- **Sentry .NET 7.0** makes `ScopeObserver`, `EnableScopeSync` and `CrashedLastRun` internal, and this design sets all three. Sentry .NET 7.0 is still a release candidate (7.0.0-rc.3). Updating to it needs another way to copy the scope into sentry-native and to report the crashed session.

## ⚠️ Workarounds

The defects in Sentry .NET, Sentry.Maui and sentry-native that this design works around are recorded, with their symptoms, causes and removal conditions, in the GnollHack repository's workaround register, in [sentry.md](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/sentry.md). The register is kept current as workarounds are added and removed; the `WA-SENTRY` numbers on this page refer to its entries.

## 📁 Files

| File | Role |
|:-----|:-----|
| **xpl/GnollHackM/GHSentryNative.cs** | sentry-native's imports, startup, transport, uploads and close; shared by the desktop clients |
| **xpl/GnollHackM/GHSentryNativeScopeObserver.cs** | Copies Sentry .NET's scope into sentry-native |
| **xpl/GnollHackM/GHSentryEventFallback.cs** | The event fallback, on every client |
| **xpl/GnollHackM/MauiProgram.cs** | Starts Sentry on every client |
| **xpl/GnollHackM/Platforms/Windows/WindowsSentryNative.cs** | Starts sentry-native for WinUI 3 |
| **xpl/GnollHackM/Platforms/Avalonia/GHAvaloniaSentry.cs** | Starts both SDKs on the Avalonia builds; tags |
| **xpl/GnollHackM/NativeLibraryPreflightWindows.cs** | The Smart App Control tag, and why a native library failed to load |
| **xpl/GnollHackM/Platforms/Linux/GHAvaloniaSentryNative.cs** | Linux's handler strategy, `SA_ONSTACK` flags and handler check |
| **xpl/GnollHackM/Platforms/Windows/libs/gnhsentry.dll**, **gnhsentry.build.props** | sentry-native for Windows, and its manifest |
| **xpl/GnollHackM/Platforms/Linux/libs/libsentry.so**, **libsentry.build.props** | sentry-native for Linux, and its manifest |
| **xpl/GnollHackM/Platforms/MacOS/libs/libgnhsentry.dylib**, **libgnhsentry.build.props** | sentry-native for macOS, and its manifest |
| **xpl/gnhsentrywin/gnhsentry.c**, **gnhsentry.def** | The Windows crash shim, and the functions `gnhsentry.dll` exports |
| **xpl/GnollHackM/Platforms/MacOS/Packaging/gnhsentry.exports** | The functions `libgnhsentry.dylib` exports |
| **xpl/gnhsentrywin/Build-GnhSentry.ps1**, **xpl/GnollHackM/Platforms/Linux/Packaging/Build-LinuxSentryNative.ps1**, **xpl/GnollHackM/Platforms/MacOS/Packaging/Build-MacSentryNative.ps1** | Build the three libraries |
| **xpl/GnollHackM/GnhSentryNative.targets** | The build-time check |
| **xpl/gnhsentrywin/include/sentry.h**, **Compare-SentryNativeApi.ps1**, **README.md** | The checked API, its comparison, and the update runbook |
| **DEVEL/workarounds/sentry.md** | The Sentry workarounds |

## 📖 Learn More

- [[/Development/Build Instructions for Native Crash Reporting]]
- [[/Development/Design Details of Avalonia Port]]
- [[/Development/Design Details of Linux Avalonia Port]]
- [[/Development/Design Details of macOS Avalonia Port]]
- [[/Development/Design Details of Windows Avalonia Port]]
- [[/Development/Design Details]]

## 🔗 External Links

- [Sentry update runbook (gnhsentrywin README)](https://github.com/hyvanmielenpelit/GnollHack/blob/master/win/win32/xpl/gnhsentrywin/README.md)
- [GnollHack workaround register: sentry.md](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/sentry.md)
- [sentry-native](https://github.com/getsentry/sentry-native)
- [Sentry .NET](https://github.com/getsentry/sentry-dotnet)

## 📅 Validity

As of version 3.39, with Sentry 6.12.1 and sentry-native 0.17.2.
