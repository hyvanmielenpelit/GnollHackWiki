> 👉 **How the Linux and macOS versions of the Avalonia port report native crashes to Sentry, from startup to the report in Sentry, and what has to be rebuilt when the Sentry packages are updated. It reflects the state of the code on November 6, 2026 (version 3.39).**

The rest of the port's design is on [[/Development/Design Details of Avalonia Port]]. Paths on this page are in the GnollHack repository: `xpl` stands for `win/win32/xpl`, and a path that starts with `Platforms/` is in `xpl/GnollHackM/`.

## ℹ️ Overview

Two Sentry SDKs run in the same process:

- **Sentry .NET** reports .NET exceptions. The Avalonia builds use the core `Sentry` package, because the .NET MAUI integration, `Sentry.Maui`, does not work on Avalonia.
- **sentry-native**, with its `inproc` backend, reports native crashes: a fault in the game engine or in any other native code.

Sentry .NET starts its own sentry-native only in trimmed or Native AOT builds. The Avalonia builds use the JIT, so `SentryNative` is `false` in `GnollHackM.csproj`, and GnollHack starts sentry-native itself (WA-SENTRY-0003).

| Build | Native crash reporting |
|:------|:-----------------------|
| **Avalonia Linux** | ✅ `libsentry.so` |
| **Avalonia macOS** | ✅ `libgnhsentry.dylib` |
| **Avalonia Windows** | ❌ No Sentry at all; the flavor is for development only |
| **WinUI 3** | ✅ `gnhsentry.dll`, with the same shared C# code; not described here, but part of [[Updating Sentry|#updating-sentry]] |

## 🧩 Components

| Platform | Library | Built from | Built by |
|:---------|:--------|:-----------|:---------|
| **Linux** | `Platforms/Linux/libs/libsentry.so` | sentry-native's source, at the commit pinned in the build script, built in WSL with CMake against the glibc 2.27 sysroot, without a network transport | `Platforms/Linux/Packaging/Build-LinuxSentryNative.ps1` |
| **macOS** | `Platforms/MacOS/libs/libgnhsentry.dylib` | The Sentry NuGet package's static `sentry-native/osx/libsentry-native.a`, linked unchanged into a universal arm64 and x86_64 dylib | `Platforms/MacOS/Packaging/Build-MacSentryNative.ps1`, on the Mac over SSH |

- **Both are committed**, with a `.build.props` manifest beside each that records what it was built from. Building them needs WSL or the Mac, which an ordinary build of the game does not.
- **The macOS dylib exists** because .NET cannot load a static library. It exports the sentry-native functions of the WinUI 3 version's `gnhsentry.dll` without the Windows-only ones, listed in `Platforms/MacOS/Packaging/gnhsentry.exports`, so one set of imports serves both.
- **The C# side** is shared: `GHSentryNative.cs` imports sentry-native, starts it and uploads its reports; `GHSentryNativeScopeObserver.cs` copies Sentry .NET's scope into it; `Platforms/Avalonia/GHAvaloniaSentry.cs` starts both SDKs; `Platforms/Linux/GHAvaloniaSentryNative.cs` adds Linux's signal handling.

## 🚀 Startup

In the order the code runs, from `MauiProgram.CreateMauiApp`:

1. **DSN.** The game reads the secrets file, then `GHAvaloniaSentry.Init` takes the DSN from the `SENTRY_DSN` environment variable, or else from the secrets file. Without a DSN, neither SDK starts.
2. **Release and environment** are computed once and given to both SDKs, so native and .NET events match. The release is `SENTRY_RELEASE`, or else `<assembly name>@<version>`. The environment is `SENTRY_ENVIRONMENT`, or else `debug` with a debugger attached, and `production` otherwise.
3. **sentry-native starts first.** Its database is `sentry-native/` in the game's data folder (see [[Files and Folders|/Development/Design Details of Avalonia Port#files-and-folders]]), because the default, the current folder, is inside the read-only AppImage on Linux and `/` for an app started from Finder. Its own session tracking is off, and its transport is GnollHack's (see [[Sending at the Next Start|#sending-at-the-next-start]]).
4. **On Linux**, the handler strategy is set to `CHAIN_AT_START` before `sentry_init`, and after it, `SA_ONSTACK` is cleared on `SIGILL`, `SIGTRAP`, `SIGBUS` and `SIGFPE` (WA-SENTRY-0005). If sentry-native cannot start, or a step after `sentry_init` throws, the game runs without native crash reporting.
5. **Sentry .NET starts** with one global scope, release-health sessions and its cache in `sentry-dotnet/` in the data folder. With sentry-native running, it also gets the scope observer and sentry-native's crashed-last-run answer, by which it ends the previous session as crashed.
6. **Tags** are set: on Linux `linux.package` (`appimage`, `steam` or `other`), `linux.container` (`pressure-vessel` inside Steam's container, else `none`), `linux.session` and `linux.glibc`; on macOS `macos.package` (`steam`, `bundle` or `unbundled`). A value that cannot be read is `unknown`.
7. **Handlers**: sentry-native is closed at process exit and on a terminating .NET exception, and the upload of stored reports starts in the background.

**Later, on Linux**, when CEF starts for the first web view that needs it, the crash signal handlers are compared with those installed at startup. A change is logged and added as a breadcrumb; sentry-native cannot reinstall its handlers.

## 💥 At a Crash

- **The report is written to disk.** sentry-native's handler thread writes the crash into its database while the crashing thread waits. Nothing is sent from the crashing process.
- **Only the first crash is reported.** Other threads that crash meanwhile wait for it, and the handlers are then removed.
- **Faults in .NET code are not crashes.** CoreCLR turns a null reference or a division by zero into a .NET exception. On Linux, `CHAIN_AT_START` lets CoreCLR's own handler run first, and sentry-native reports only what CoreCLR leaves unhandled; `SIGABRT` is never passed on. On macOS, CoreCLR receives these faults through Mach exception ports before any signal is raised.
- **An unhandled .NET exception** is reported by Sentry .NET, as a .NET event. GnollHack's own handler, which runs after Sentry .NET's, then closes sentry-native, so no native duplicate follows.
- **The game engine** installs no handler for crash signals, so its crashes reach sentry-native.

## 📤 Sending at the Next Start

> 📢 **Important:** A native crash appears in Sentry only after the game has been started again with a network connection.

1. At the next start, `sentry_init` finds the stored crash and passes it to GnollHack's transport, which writes it to `sentry-native/outbox/<UTC time>-<id>.envelope`.
2. A background task posts each file, oldest first, unchanged to the envelope endpoint of the DSN. Sentry .NET's own `CaptureEnvelope` is not used, because it parses the event again and can drop fields that only native events have, such as registers and signal details (WA-SENTRY-0004).

| Response | What happens to the file |
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

## 🔣 Debug Symbols

A Release publish uploads the symbols that Sentry needs to name the engine's functions. Sentry's build integration uploads ELF files only for Android and dSYMs only for iOS and Mac Catalyst, so GnollHack uploads these itself:

| Platform | Uploaded | Workaround |
|:---------|:---------|:-----------|
| **Linux** | The full `libgnollhacklinux.so`; the packages ship it stripped by default, with the build ID by which Sentry matches the two | WA-SENTRY-0006 |
| **macOS** | The engine's `libgnollhackmac.dylib.dSYM`, and `libgnhsentry.dylib`, whose symbol table names its functions | WA-SENTRY-0011 |

- **When**: a Release publish, archive or package build, or any Release build with `-p:GnhSentryUpload=true`, and only when the `SENTRY_AUTH_TOKEN` environment variable is set. `-NoSentryUpload` on the packaging scripts, or `-p:GnhSentryUpload=false` on `dotnet publish`, turns the upload off.
- **On macOS**, a missing `.dSYM`, or one whose arm64 UUID is not the engine's, stops the upload with an error, unless `GnhAllowStaleSentryNative=true` is set.
- **Not uploaded**: `libsentry.so`'s symbols.

## 🧪 Testing

- **Delivery without a crash**: start the game with `GNOLLHACK_SENTRY_TEST=1`. Sentry .NET sends one message, "Sentry test from …". This does not test the native upload.
- **A native crash**: build the engine in Debug, the only configuration with the wizard-mode command `#crashtest`, which crashes the game with a segmentation fault or an abort. Then start the game again: the report arrives.
- **When nothing arrives**: turn on **Developer Mode** and then **Debug Logging** in the settings. The game's log then has the `GHSentryNative:` lines that say how many reports were uploaded, rate limited or rejected. Startup failures go to standard error.
- **Test builds report to the same Sentry project and the same environment**, `production`, as releases, unless `SENTRY_ENVIRONMENT` is set or a debugger is attached.

The commands are in [[/Development/Build Instructions for Avalonia Linux Version on Windows]] and [[/Development/Build Instructions for Avalonia macOS Version on Windows]].

## 🔄 Updating Sentry

Most Sentry .NET releases ship a newer sentry-native, and the three committed libraries, `libsentry.so`, `libgnhsentry.dylib` and the WinUI 3 version's `gnhsentry.dll`, must all be the sentry-native of the package in use. Two of them link the package's own library, so a Sentry update is never only a version change.

### 📋 Sources of Truth

- **`GnhSentryVersion`** in `xpl/GnollHackM/GnollHackM.csproj`: the version of the `Sentry` and `Sentry.Maui` packages. At the time of writing, Sentry 6.12.1, with sentry-native 0.17.2.
- **`xpl/gnhsentrywin/include/sentry.h`**: sentry-native's header, unchanged. It is the API the C and C# code was checked against, and its version macros say which sentry-native the build scripts build.

### 🛡️ The Build-Time Check

`xpl/GnollHackM/GnhSentryNative.targets` compares each library's manifest with the current package and sources before every Windows, Linux and macOS build. Android and iOS are not checked.

| Codes | Library | Fix |
|:------|:--------|:----|
| **GNHSN001-006** | `gnhsentry.dll` | `xpl/gnhsentrywin/Build-GnhSentry.ps1` |
| **GNHSN011-016** | `libsentry.so`, also checked against `gnhsentry.dll`'s manifest | `Build-LinuxSentryNative.ps1`, after `Build-GnhSentry.ps1` |
| **GNHSN021-026** | `libgnhsentry.dylib`, also checked against `gnhsentry.dll`'s sentry-native version | `Build-MacSentryNative.ps1`, also after any edit of `gnhsentry.def` |

- **Warnings** in ordinary builds; **errors** in a Release build that publishes, archives, packages or uploads symbols.
- `-p:GnhSentryNativeStrict=true` makes them errors in any build; `-p:GnhAllowStaleSentryNative=true` makes them warnings in any build, for a local test build.
- **A release that knowingly ships a stale library** records `<GnhAllowStaleSentryNative>true</GnhAllowStaleSentryNative>` in `GnollHackM.csproj` with a dated comment giving the reason, never only on a command line, and removes it at the next rebuild. The usual case is a Linux-only release from a computer without MSVC.

### 🔄 The Procedure

The maintained runbook, with every command, is `xpl/gnhsentrywin/README.md`; follow it rather than this summary.

1. **Read** the Sentry .NET release notes, their Breaking Changes and "update Native SDK" lines, and sentry-native's changelog for every version in between, looking for `inproc`, Windows and the functions GnollHack uses.
2. **Change `GnhSentryVersion`** and restore. The build now reports GNHSN001 and GNHSN002.
3. **Run `Build-GnhSentry.ps1`** on Windows. If the new package's sentry-native is another version than the header's, it stops and names it.
4. **Pin that version's commit** as `$SentryNativeCommit` in `Build-LinuxSentryNative.ps1`, and clone sentry-native at that tag again in WSL with the command in the README. The command the Linux script prints still names the old version at this point.
5. **Compare the API** with `xpl/gnhsentrywin/Compare-SentryNativeApi.ps1`. Exit 0: nothing GnollHack uses changed, so rerun with `-Update`. Exit 1: update `gnhsentry.c`, `GHSentryNative.cs`, `GHAvaloniaSentryNative.cs` and `gnhsentry.exports`, then rerun with `-Update -AcceptChanges`. Exit 2: the script itself needs fixing.
6. **Build the three libraries** from Windows PowerShell: `Build-GnhSentry.ps1` with MSVC, `Build-LinuxSentryNative.ps1`, which builds in WSL, and `Build-MacSentryNative.ps1`, which builds on the Mac over SSH.
7. **Re-check the workarounds** for `Sentry`, `Sentry.Maui` and `sentry-native` in `DEVEL/workarounds/sentry.md`, and run `DEVEL/workarounds/Test-WorkaroundRegister.ps1`.
8. **Test**: `#crashtest` on Windows, Linux and macOS, each followed by a restart and one report in Sentry; and, on Windows, an unhandled .NET exception still raises `AppDomain.UnhandledException`.
9. **Commit together** the version change, the header, the three libraries, their manifests and the license copies.

> ⚠️ **Warning:** Sentry .NET 7.0 makes `ScopeObserver`, `EnableScopeSync` and `CrashedLastRun` internal, and this design sets all three. As of November 6, 2026, 7.0 is still a release candidate (7.0.0-rc.3). Updating to it needs another way to copy the scope into sentry-native and to report the crashed session, not only the procedure above.

## 📁 Files

| File | Role |
|:-----|:-----|
| **xpl/GnollHackM/Platforms/Avalonia/GHAvaloniaSentry.cs** | Starts both SDKs; tags |
| **xpl/GnollHackM/GHSentryNative.cs** | sentry-native's imports, startup, transport and uploads; shared with WinUI 3 |
| **xpl/GnollHackM/GHSentryNativeScopeObserver.cs** | Copies Sentry .NET's scope into sentry-native |
| **xpl/GnollHackM/Platforms/Linux/GHAvaloniaSentryNative.cs** | Linux's handler strategy, `SA_ONSTACK` flags and handler check |
| **xpl/GnollHackM/Platforms/Linux/libs/libsentry.so**, **libsentry.build.props** | sentry-native for Linux, and its manifest |
| **xpl/GnollHackM/Platforms/MacOS/libs/libgnhsentry.dylib**, **libgnhsentry.build.props** | sentry-native for macOS, and its manifest |
| **xpl/GnollHackM/Platforms/MacOS/Packaging/gnhsentry.exports** | The functions `libgnhsentry.dylib` exports |
| **xpl/GnollHackM/Platforms/Linux/Packaging/Build-LinuxSentryNative.ps1** | Builds `libsentry.so` |
| **xpl/GnollHackM/Platforms/MacOS/Packaging/Build-MacSentryNative.ps1** | Builds `libgnhsentry.dylib` |
| **xpl/GnollHackM/GnhSentryNative.targets** | The build-time check |
| **xpl/gnhsentrywin/include/sentry.h**, **Compare-SentryNativeApi.ps1**, **README.md** | The checked API, its comparison, and the update runbook |
| **DEVEL/workarounds/sentry.md** | The Sentry workarounds |

## 📖 Learn More

- [[/Development/Design Details of Avalonia Port]]
- [[/Development/Design Details of Linux Avalonia Port]]
- [[/Development/Design Details of macOS Avalonia Port]]
- [[/Development/Build Instructions for Avalonia Linux Version on Windows]]
- [[/Development/Build Instructions for Avalonia macOS Version on Windows]]

## 🔗 External Links

- [Sentry update runbook (gnhsentrywin README)](https://github.com/hyvanmielenpelit/GnollHack/blob/master/win/win32/xpl/gnhsentrywin/README.md)
- [GnollHack workaround register: sentry.md](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/sentry.md)
- [sentry-native](https://github.com/getsentry/sentry-native)
- [Sentry .NET](https://github.com/getsentry/sentry-dotnet)
