> 👉 **How to rebuild GnollHack's three native crash reporting libraries, what the build-time check reports, how to update Sentry, how debug symbols are uploaded, and how to test that crash reports arrive.**

How native crash reporting works, and why, is on [[/Development/Design Details of Native Crash Reporting]]. Run the commands on this page in Windows PowerShell from the GnollHack repository's root, unless a step says otherwise.

> 📢 **Important:** The maintained runbook is `win\win32\xpl\gnhsentrywin\README.md` in the GnollHack repository. This page summarizes it; where the two differ, follow the README.

| Goal | Sections |
|:-----|:---------|
| **Set up a computer for rebuilding the libraries** | 1 |
| **Find out what to rebuild** | 2, 6 |
| **Rebuild a library** | 3, 4, 5 |
| **Update Sentry** | 7 |
| **Check that crash reports arrive** | 9 |

## 1. Prerequisites

The three libraries are committed to the repository, so an ordinary build of the game needs none of this. Each library needs its own tools.

### 1.1. Windows, for gnhsentry.dll

- **Visual Studio 2026** with the **Desktop development with C++** workload and a Windows 10 or 11 SDK, as described in [[/Development/Install Visual Studio 2026 for .NET MAUI Development]]. The script finds MSVC with `vswhere.exe` and takes the newest Windows SDK.
- **GnollHackM restored**, for example by building it once, so that the Sentry package is in the NuGet package folder. The scripts never download anything. This applies to `libgnhsentry.dylib` too.

### 1.2. WSL, for libsentry.so

- **A WSL distribution** set up as for the Linux version, as in [[WSL Distribution|/Development/Build Instructions for Avalonia Linux Version on Windows#1-3-wsl-distribution]], with `cmake`, `g++` and `git` added. The script prints the `apt-get` command for any tool that is missing.
- **The glibc 2.27 sysroot** in `/opt/gnollhack/sysroot-glibc-2.27`, installed by `win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Install-LinuxSysroot.ps1`.
- **A sentry-native checkout** at the version's tag, in `$HOME/.cache/gnollhack-sentry-native/sentry-native` in WSL. When it is missing, the script stops and prints the `git clone` command.

### 1.3. The Mac, for libgnhsentry.dylib

- **A Mac with Xcode**, reached over SSH as described in [[/Development/Set Up SSH Access to the Mac for Native Libraries]]. The script uses the host alias `gnollhack-mac`, or the one in the environment variable `GNOLLHACK_MAC_SSH_HOST`, or `-SshHost`.

## 2. When to Rebuild

| Change | Rebuild |
|:-------|:--------|
| **The Sentry packages are updated** (`GnhSentryVersion`) | All three; follow section 7 |
| **`win\win32\xpl\gnhsentrywin\gnhsentry.c`** | `gnhsentry.dll` |
| **`win\win32\xpl\gnhsentrywin\gnhsentry.def`** | `gnhsentry.dll` and `libgnhsentry.dylib`, since the macOS imports are the same |
| **`win\win32\xpl\GnollHackM\Platforms\MacOS\Packaging\gnhsentry.exports`** | `libgnhsentry.dylib` |
| **`win\win32\xpl\gnhsentrywin\include\sentry.h`** | All three; it changes only through section 7 |

The build-time check in section 6 reports each of these.

## 3. Build gnhsentry.dll

**3.1. Run the script:**

```powershell
win\win32\xpl\gnhsentrywin\Build-GnhSentry.ps1
```

It links `sentry-native.lib` from the Sentry package with GnollHack's crash shim, `gnhsentry.c`. It stops before compiling if the package's sentry-native is another version than `include\sentry.h` declares, and names that version. It then checks the DLL: no dependency on the Visual C++ runtime DLLs, every export of `gnhsentry.def` and the three `gnh_crash_` functions, and the right sentry-native version.

**3.2. Check the results.** ✅ These have changed:

- `win\win32\xpl\GnollHackM\Platforms\Windows\libs\gnhsentry.dll`
- `win\win32\xpl\GnollHackM\Platforms\Windows\libs\gnhsentry.build.props`, the manifest
- `win\win32\xpl\GnollHackM\Platforms\Windows\licenses\sentry-native\LICENSE`

The PDB is in `win\win32\vs\symbols\Release\x64\gnhsentry\gnhsentry.pdb`, which is not committed. Keep it on this computer: a Release publish uploads it to Sentry only from here, since its hash must match the manifest's.

## 4. Build libsentry.so

**4.1. Run the script:**

```powershell
win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Build-LinuxSentryNative.ps1
```

`-WslDistro <name>` picks a distribution other than the default, and `-SourceDir <path>` a checkout other than the default. The script builds the checkout with CMake against the glibc 2.27 sysroot, with the `inproc` backend and no transport. The checkout must be the version that `include\sentry.h` declares, twice over: that version's tag must resolve to the commit pinned as `$SentryNativeCommit` in the script, and the checkout's `include/sentry.h` must equal the repository's copy. The library is stripped, keeping its build ID, and checked: no libcurl or libstdc++ dependency, nothing above glibc 2.27, and the functions GnollHack calls exported.

**4.2. Check the results.** ✅ These have changed:

- `win\win32\xpl\GnollHackM\Platforms\Linux\libs\libsentry.so`
- `win\win32\xpl\GnollHackM\Platforms\Linux\libs\libsentry.build.props`, the manifest
- The licenses in `win\win32\xpl\GnollHackM\Platforms\Linux\licenses\sentry-native\`

## 5. Build libgnhsentry.dylib

**5.1. Run the script**, with the Mac awake:

```powershell
win\win32\xpl\GnollHackM\Platforms\MacOS\Packaging\Build-MacSentryNative.ps1
```

It copies `libsentry-native.a` from the Sentry package and the export list to the Mac, links a universal arm64 and x86_64 dylib there that exports only the functions in `gnhsentry.exports`, and checks it: both architectures, exactly those exports, no dependency but the system library, the macOS deployment target of the game engine, and an ad hoc signature. Its errors are printed as `Build-MacSentryNative.ps1 : error GNHMS0nn: ...`.

**5.2. Check the results.** ✅ These have changed:

- `win\win32\xpl\GnollHackM\Platforms\MacOS\libs\libgnhsentry.dylib`
- `win\win32\xpl\GnollHackM\Platforms\MacOS\libs\libgnhsentry.build.props`, the manifest
- `win\win32\xpl\GnollHackM\Platforms\MacOS\licenses\sentry-native\LICENSE`

## 6. The Build-Time Check

`win\win32\xpl\GnollHackM\GnhSentryNative.targets` compares each library's manifest with the current Sentry package and sources before every Windows, Linux and macOS build of GnollHackM. Android and iOS are not checked.

| Codes | Library | Checked In | Fix |
|:------|:--------|:-----------|:----|
| **GNHSN001-006** | `gnhsentry.dll` | WinUI 3 and Avalonia Windows builds | Section 3 |
| **GNHSN011-016** | `libsentry.so`, also checked against `gnhsentry.dll`'s manifest | Linux builds | Section 4, after section 3 |
| **GNHSN021-026** | `libgnhsentry.dylib`, also checked against `gnhsentry.dll`'s sentry-native version | macOS builds | Section 5 |

What each code means:

| Code | Problem |
|:-----|:--------|
| **GNHSN001** | `GnhSentryVersion` is not the package version `gnhsentry.dll` was built from |
| **GNHSN002** | The restored `sentry-native.lib` is not the one `gnhsentry.dll` linked |
| **GNHSN003** | `gnhsentry.dll` is not the DLL the script built |
| **GNHSN004** | `gnhsentry.c`, `gnhsentry.def` or `include\sentry.h` changed since the DLL was built |
| **GNHSN005** | The Windows manifest or the restored `sentry-native.lib` is missing |
| **GNHSN006** | A Sentry package reference, or the restored Sentry package folder, is not at `GnhSentryVersion` |
| **GNHSN011** | `GnhSentryVersion` is not the package version in the Windows manifest, which the Linux build follows |
| **GNHSN012** | `libsentry.so`'s sentry-native version is not `gnhsentry.dll`'s |
| **GNHSN013** | `libsentry.so` is not the library the script built |
| **GNHSN014** | `include\sentry.h` changed since `libsentry.so` was built |
| **GNHSN015** | The Linux or the Windows manifest is missing |
| **GNHSN016** | As GNHSN006, for the Linux build |
| **GNHSN021** | `GnhSentryVersion` is not the package version `libgnhsentry.dylib` was built from, or its sentry-native version is not `gnhsentry.dll`'s |
| **GNHSN022** | The restored `libsentry-native.a` is not the one `libgnhsentry.dylib` linked |
| **GNHSN023** | `libgnhsentry.dylib` is not the library the script built |
| **GNHSN024** | `gnhsentry.exports`, `gnhsentry.def` or `include\sentry.h` changed since `libgnhsentry.dylib` was built |
| **GNHSN025** | The macOS manifest or the restored `libsentry-native.a` is missing |
| **GNHSN026** | As GNHSN006, for the macOS build |

- **Warnings** in ordinary builds; **errors** in a Release build that publishes, archives, packages or uploads symbols.
- `-p:GnhSentryNativeStrict=true` makes them errors in any build; `-p:GnhAllowStaleSentryNative=true` makes them warnings in any build, for a local test build.
- **A release that knowingly ships a stale library** records `<GnhAllowStaleSentryNative>true</GnhAllowStaleSentryNative>` in a property group of `GnollHackM.csproj` with a dated comment giving the reason, never only on a command line, and removes it at the next rebuild. The usual case is a Linux-only release after a Sentry update from a computer without MSVC, which GNHSN011 blocks until `gnhsentry.dll` is rebuilt.

## 7. Update Sentry

Most Sentry .NET releases ship a newer sentry-native, and two of the three libraries link the package's own copy of it, so a Sentry update is never only a version change. The sources of truth are `GnhSentryVersion` in `win\win32\xpl\GnollHackM\GnollHackM.csproj`, the version of the `Sentry` and `Sentry.Maui` packages, and `win\win32\xpl\gnhsentrywin\include\sentry.h`, the sentry-native API that the C and C# code were checked against.

1. **Read** the Sentry .NET release notes, their Breaking Changes and "update Native SDK" lines, and sentry-native's changelog for every version in between, looking for `inproc`, Windows and the functions GnollHack uses.
2. **Change `GnhSentryVersion`** and restore. The build now reports GNHSN001 and GNHSN002.
3. **Run `Build-GnhSentry.ps1`**, as in section 3. If the new package's sentry-native is another version than the header's, it stops and names it.
4. **Pin that version's commit** as `$SentryNativeCommit` in `Build-LinuxSentryNative.ps1`; `git ls-remote https://github.com/getsentry/sentry-native refs/tags/<version>` prints it. Then clone sentry-native at that tag again in WSL with the command in the README. The command the Linux script prints still names the old version at this point.
5. **Compare the API** with `win\win32\xpl\gnhsentrywin\Compare-SentryNativeApi.ps1 -NewHeader <the new checkout's include\sentry.h>`. Exit 0: nothing GnollHack uses changed, so run it again with `-Update`. Exit 1: update `gnhsentry.c`, `GHSentryNative.cs`, `GHAvaloniaSentryNative.cs` and `gnhsentry.exports` to the new declarations, then run it again with `-Update -AcceptChanges`. Exit 2: the script itself needs fixing first.
6. **Build the three libraries**, as in sections 3, 4 and 5.
7. **Re-check the workarounds** whose package is `Sentry`, `Sentry.Maui` or `sentry-native` in `DEVEL\workarounds\sentry.md`, and run `DEVEL\workarounds\Test-WorkaroundRegister.ps1`.
8. **Test**: `#crashtest` on the WinUI 3 version, the Avalonia Windows version, Linux and macOS, each followed by a restart and one native report in Sentry, as in section 9; and, on Windows, an unhandled .NET exception still raises `AppDomain.UnhandledException`.
9. **Commit together** the version change, the header, the three libraries, their manifests and the license copies.

> ⚠️ **Warning:** Sentry .NET 7.0 makes `ScopeObserver`, `EnableScopeSync` and `CrashedLastRun` internal, and native crash reporting sets all three. Updating to it needs a new design, not only this procedure; see [[Limits|/Development/Design Details of Native Crash Reporting#limits]].

## 8. Upload Debug Symbols

A Release build uploads debug symbols to Sentry when the `SENTRY_AUTH_TOKEN` environment variable is set and the build publishes, archives or makes a package; an Android Release build that Visual Studio starts uploads them too. Sentry CLI reads the token, and the organization and project from `SENTRY_ORG` and `SENTRY_PROJECT`, from the environment; the token is never passed on a command line. What is uploaded for each client is in [[Debug Symbols|/Development/Design Details of Native Crash Reporting#debug-symbols]].

- **`-p:GnhSentryUpload=true`** uploads from any Release build; **`-p:GnhSentryUpload=false`** turns the upload off.
- **`-NoSentryUpload`** on the Linux and macOS packaging scripts turns it off, for example for a build for testers.
- **Windows**: `gnollhackwin.pdb` is uploaded only when its debug ID matches the DLL's, and `gnhsentry.pdb` only when its hash matches the manifest's. Otherwise the build warns that the symbols were not uploaded.
- **macOS**: a missing engine `.dSYM`, or one whose arm64 UUID is not the engine's, stops the upload with an error, unless `GnhAllowStaleSentryNative=true` is set.

## 9. Test Crash Reporting

**9.1. Check delivery without a crash** on an Avalonia build: start the game with `GNOLLHACK_SENTRY_TEST=1`, and one message, "Sentry test from …", arrives in Sentry. This does not test the native upload, and the WinUI 3 version has no such switch. On Windows:

```powershell
$env:GNOLLHACK_SENTRY_TEST = '1'
& win\win32\xpl\GnollHackM\bin\Debug\net11.0\win-x64\GnollHackM.exe
```

On Linux and macOS, put `GNOLLHACK_SENTRY_TEST=1` in front of the command that starts the game, as in [[Run the Game in WSL|/Development/Build Instructions for Avalonia Linux Version on Windows#3-1-run-the-game-in-wsl]] and [[Testing on the Mac|/Development/Build Instructions for Avalonia macOS Version on Windows#3-testing-on-the-mac]].

**9.2. Make a native crash.** Build the game engine in Debug, the only configuration with the wizard-mode command `#crashtest`, start a [[/Wizard Mode]] game and use `#crashtest`, which crashes the game with a segmentation fault or an abort. Then start the game again with a network connection. ✅ The report arrives in Sentry, with the platform `native` and the signal as its title.

**9.3. When nothing arrives**, turn on [[/Developer Mode]] and then **Debug Logging** in the settings. The game's log then has the `GHSentryNative:` lines that say how many reports were uploaded, rate limited or rejected. Startup failures go to standard error. A report that is waiting is a file in the `sentry-native\outbox` folder of the game's data folder: on the Avalonia builds, see [[Files and Folders|/Development/Design Details of Avalonia Port#files-and-folders]]; on the WinUI 3 version, [[/Development/Data File Locations (WinUI 3 Version – .NET MAUI)]].

> ℹ️ **Note:** Test builds report to the same Sentry project and the same environment, `production`, as releases, unless `SENTRY_ENVIRONMENT` is set or a debugger is attached.

## ❓ Troubleshooting

| Problem | Fix |
|:--------|:----|
| **`GNHSN001` to `GNHSN006`** | `gnhsentry.dll` does not match the Sentry package or its sources. Do section 3 |
| **`GNHSN011` to `GNHSN016`** | `libsentry.so` does not match. Do section 3 if `gnhsentry.dll` is stale too, then section 4 |
| **`GNHSN021` to `GNHSN026`** | `libgnhsentry.dylib` does not match. Do section 5 |
| **A script says the Sentry package is missing** | GnollHackM has not been restored since `GnhSentryVersion` changed. Build it once, then run the script again |
| **The Linux script prints a clone command for the old version** | Expected during an update, before step 7.4 |
| **No crash report arrives** | Do section 9.3 |
| **Native frames in Sentry have no function names** | The symbols were not uploaded. See section 8, and check the build's warnings |

## 📖 Learn More

- [[/Development/Design Details of Native Crash Reporting]]
- [[/Development/Build Instructions]]
- [[/Development/Build Instructions for WinUI3 Version on Windows (.NET MAUI)]]
- [[/Development/Build Instructions for Avalonia Windows Version on Windows]]
- [[/Development/Build Instructions for Avalonia Linux Version on Windows]]
- [[/Development/Build Instructions for Avalonia macOS Version on Windows]]

## 🔗 External Links

- [Sentry update runbook (gnhsentrywin README)](https://github.com/hyvanmielenpelit/GnollHack/blob/master/win/win32/xpl/gnhsentrywin/README.md)
- [GnollHack workaround register: sentry.md](https://github.com/hyvanmielenpelit/GnollHack/blob/master/DEVEL/workarounds/sentry.md)
- [sentry-native](https://github.com/getsentry/sentry-native)
