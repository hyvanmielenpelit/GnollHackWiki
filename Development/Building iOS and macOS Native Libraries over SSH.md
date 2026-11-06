> 👉 **The Windows build of GnollHack compiles the game engine for iOS and macOS on a Mac over SSH, with Xcode's own compiler, and copies the finished library back to Windows. This page explains how that works, how to set it up and build, and how to fix the build when it fails.**

## 📖 Overview

Two projects of `win\win32\vs\GnollHack.sln` build the Apple engine libraries:

| Library | Project | Architectures | Copied to |
|:--|:--|:--|:--|
| **`libgnollhackios.a`**, static, for the iOS app | `gnollhackios.vcxproj` | arm64 | `win/win32/xpl/GnollHackM/Platforms/iOS/libs/` and `win/win32/xpl/GnollHackX/GnollHackX.iOS/Native References/` |
| **`libgnollhackmac.dylib`**, dynamic, for the macOS app, with `libgnollhackmac.dylib.dSYM` | `gnollhackmac.vcxproj` | arm64 and x86_64 | `win/win32/xpl/GnollHackM/Platforms/MacOS/libs/` |

Both projects first write the library to `tools\<Configuration>\x64\`, and a copy step then puts it where the app takes it from.

The build has its own SSH connection to the Mac, set up once for each Windows computer. **Pair to Mac** in Visual Studio is a separate connection, used only by the .NET MAUI iOS app. The macOS app's packaging (`Build-MacPackage.ps1`) and its sentry-native library (`Build-MacSentryNative.ps1`) use the same SSH connection, but they are separate scripts, described in [[/Development/Build Instructions for Avalonia macOS Version on Windows]].

## 🏗️ How It Works

Both projects are Makefile projects that import `win\win32\vs\gnollhackapple.props`. Build, Rebuild and Clean run one PowerShell script, `win\win32\xpl\libapple\Build-AppleEngine.ps1`. A build goes like this:

1. **The project lists the sources.** It writes its C sources, one full path per line, to `gnh-sources.txt` in its intermediate folder, `win\win32\vs\obj\<Configuration>\x64\<project>\`. They are the `ClCompile` items of `gnollhackapple.props`, plus `gnollhackios.c` for iOS.
2. **The script packs them on Windows.** The sources, every header of `include\`, `win\win32\xpl\libshare\` and the platform folder (`win\win32\xpl\gnollhackios\` or `win\win32\xpl\gnollhackmac\`), and line-feed copies of `engine.mk` and `sync-tree.sh` go into one tar file, made with Windows' own `tar.exe`.
3. **It checks the Mac.** It runs `xcrun --sdk iphoneos --show-sdk-path` (or `macosx`) on the Mac. It stops with `GNHAB006` if it cannot connect, and with `GNHAB007` if the SDK is not there.
4. **It copies and syncs.** `scp` copies the tar file to the Mac, compressed on the way. There it is unpacked beside the build tree, and `sync-tree.sh` copies into the tree only the files whose content has changed. Only those files get a new time, so Windows file times never decide what is recompiled.
5. **The Mac compiles.** `make` runs `win\win32\xpl\libapple\engine.mk` with one job per processor core and Xcode's `clang`. Debug compiles with `-O0` and Release with `-O3`, both with debug information. The iOS library is made with `libtool`, the macOS library with `clang -dynamiclib`, and for macOS `dsymutil` then writes the `.dSYM`.
6. **Errors open in Visual Studio.** Each source prints `Compiling <file>`, followed by its warnings and errors as one block. Their paths are rewritten to your Windows checkout, so double-clicking one in the Error List opens the file.
7. **The library comes back.** `scp` copies it to the project's output folder, and `lipo -info` prints its architectures in the build output. For macOS, the script checks with `dwarfdump` that the `.dSYM` belongs to the library, and copies it too. The macOS app's Release publish uploads it to Sentry.
8. **The library goes into the app.** `aftergnollhackios.proj` (iOS) or the `CopyToMauiMacLibs` target (macOS) copies it to the folders in the [[Overview|#overview]].

What keeps the system simple to run:

- **The Mac needs only Xcode.** The build connects to the Mac's own SSH server, **Remote Login**. Nothing else is installed or started there.
- **It never prompts.** Every connection uses `BatchMode` and a 15-second connect timeout, so a missing key, an unknown host key or a sleeping Mac fails at once with an error instead of waiting for a password.
- **The Mac's address is in one place:** the `HostName` line of the SSH host alias in `%USERPROFILE%\.ssh\config`. Nothing in the repository or in Visual Studio holds it.
- **Objects stay on the Mac between builds**, so a build compiles only what changed. See [[Incremental Builds|#incremental-builds]].

## 📋 Setup

Do this once for each Mac and once for each Windows computer.

### 1. Prepare the Mac

1. Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835) and start it once, so that it installs its components. The engine libraries need only a working Xcode; the iOS app may need a specific version, given in [[/Development/Build Instructions for iOS Version on Windows (.NET MAUI)]].
2. In Terminal, select Xcode and accept its license:

    ```bash
    sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
    ```

    ```bash
    sudo xcodebuild -license accept
    ```

    If your Xcode has another name, such as `Xcode 26.app` when you keep several versions, put its path in the first command, in quotes if it has a space.

3. Turn on **Remote Login** under **System Settings → General → Sharing**. Note your short user name, which `whoami` prints in Terminal.
4. Keep the Mac awake while you build. Under **System Settings → Energy** (**Battery → Options** on a laptop), turn on the option that prevents automatic sleeping when the display is off, and **Wake for network access**. A sleeping Mac is the most common reason a build cannot connect.

> ℹ️ **Note:** If a build stops with `GNHAB007` after an Xcode update, repeat step 2.

### 2. Set Up SSH Access

On the Windows computer, follow [[/Development/Set Up SSH Access to the Mac for Native Libraries]]:

1. [[Create a key|/Development/Set Up SSH Access to the Mac for Native Libraries#2-create-a-key-on-windows]], without a passphrase.
2. [[Add the host alias|/Development/Set Up SSH Access to the Mac for Native Libraries#3-add-the-host-alias]] `gnollhack-mac`, with the Mac's address on its `HostName` line.
3. [[Install the key on the Mac|/Development/Set Up SSH Access to the Mac for Native Libraries#4-install-the-key-on-the-mac]].
4. [[Test the connection|/Development/Set Up SSH Access to the Mac for Native Libraries#5-test-the-connection]].

The setup is done when this command prints two paths, one ending in `iPhoneOS<version>.sdk` and one in `MacOSX<version>.sdk`, without asking for anything:

```powershell
ssh -o BatchMode=yes gnollhack-mac "xcrun --sdk iphoneos --show-sdk-path; xcrun --sdk macosx --show-sdk-path"
```

Run it again whenever a build cannot connect: it tests everything the build needs from the Mac.

### 3. Set Up WSL

The engine includes `date_unix.h` from the platform folder, which the WSL data pipeline writes. The solution build therefore needs a WSL distribution set up as Visual Studio's Linux build host, as in steps 1.3.1–1.3.3 of [[WSL Distribution|/Development/Build Instructions for Avalonia Linux Version on Windows#1-3-wsl-distribution]]. Start its SSH server before you build:

```powershell
wsl -u root -e /usr/sbin/service ssh start
```

### 4. Pair to Mac (iOS App Only)

Building and deploying the .NET MAUI iOS app needs **Pair to Mac** in Visual Studio, as described in [[/Development/Build Instructions for iOS Version on Windows (.NET MAUI)]]. The engine libraries do not use it, and the macOS app does not need it.

## 🛠️ Building

### 🧩 Solution Platforms

Choose a solution platform of `win\win32\vs\GnollHack.sln` that builds the library you need:

| Solution platform | `libgnollhackios.a` | `libgnollhackmac.dylib` |
|:--|:--:|:--:|
| **iPhone** | ✅ | ❌ |
| **iPhoneSimulator** | ✅ | ❌ |
| **macOS** | ❌ | ✅ |
| **Any CPU** | ✅ | ✅ |
| **MauiAll** | ✅ Debug only | ❌ |

The other platforms build neither, and the app keeps the library copied last. **iPhoneSimulator** builds the same arm64 device library as **iPhone**, not a simulator library. **Any CPU** also builds the legacy Xamarin projects, which Visual Studio 2026 cannot build unless they are unloaded.

### 🖥️ In Visual Studio

1. Start WSL's SSH server and make sure the Mac is awake.
2. Open `win\win32\vs\GnollHack.sln`, choose **Debug** or **Release** and a platform from the table, and build.

**Build** compiles what changed. **Rebuild** first deletes this checkout's objects on the Mac and compiles everything. **Clean** deletes the local library and this checkout's folder on the Mac.

### ⌨️ From the Command Line

Use the 64-bit MSBuild, as Visual Studio does; the 32-bit one fails on the solution's Linux projects. From the repository root:

```powershell
$msbuild = & "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe" -latest -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\amd64\MSBuild.exe
```

```powershell
& $msbuild win\win32\vs\GnollHack.sln /t:Build /p:Configuration=Release /p:Platform=macOS /v:m
```

Once the solution has written `date_unix.h`, one project can be built alone:

```powershell
& $msbuild win\win32\vs\gnollhackmac.vcxproj /t:Build /p:Configuration=Release /p:Platform=x64 /v:m
```

### 🔁 Incremental Builds

- `make` recompiles a source when it, any header, `engine.mk`, or the compiler, its flags or the SDK has changed. Every source depends on every header.
- The WSL data pipeline rewrites `date_unix.h` on every solution build, so a solution build usually recompiles everything. While working on engine code, build the project alone for a faster loop.
- An Xcode update changes the SDK, so the next build recompiles everything once.

### 📦 Debug and Release

The copy into the app runs after every build of either configuration, so the app gets whichever configuration was built last. Build Release before you build or publish a release of the app.

## 🗂️ Files on the Mac

The build works under `~/gnollhack-build` in your home folder on the Mac:

| Folder | Contents |
|:--|:--|
| **`<platform>-<Configuration>-<computer>-<hash>`** | One folder for each platform, configuration, Windows computer and checkout, such as `ios-Debug-mypc-1a2b3c4d`. The hash is taken from the checkout's path, so worktrees and computers never share objects |
| **`…/incoming`** | The sources as last copied from Windows, with `gnh-src.tar` beside it |
| **`…/tree`** | The synced sources that `make` builds |
| **`…/obj`** | The objects, and `flags.txt`, which records the compiler, its flags and the SDK |
| **`…/out`** | The library, and for macOS its `.dSYM` |
| **`sentry-native-<computer>-<hash>`** | The sentry-native library of the macOS app |
| **`package-in`, `package`** | The macOS app's packaging |

Deleting any of them is safe: the next build recreates it and compiles everything again.

## ⚙️ Configuration

| Setting | Where it is set | Notes |
|:--|:--|:--|
| **Mac host alias** | `-SshHost`, else the environment variable `GNOLLHACK_MAC_SSH_HOST`, else `gnollhack-mac` | From MSBuild, `/p:GnhAppleExtraArgs="-SshHost <alias>"`. See [[Using another alias|/Development/Set Up SSH Access to the Mac for Native Libraries#using-another-alias]] |
| **Mac address** | `HostName` in `%USERPROFILE%\.ssh\config` | See [[When the Mac's address changes|/Development/Set Up SSH Access to the Mac for Native Libraries#when-the-macs-address-changes]] |
| **iOS deployment target** | `GHiOSDeploymentTarget` in `win\win32\vs\gnollhackios.vcxproj` | Not lower than the iOS `SupportedOSPlatformVersion` in `GnollHackM.csproj` |
| **macOS deployment target** | `GHMacDeploymentTarget` in `win\win32\vs\gnollhackmac.vcxproj` | The oldest macOS that .NET supports |
| **Engine sources** | The `ClCompile` items of `win\win32\vs\gnollhackapple.props` | The same list as in `gnollhacklinux.vcxproj`: add a new engine source to both |
| **Compiler flags** | `win\win32\xpl\libapple\engine.mk` | A change recompiles everything |
| **Folder on the Mac** | `-RemoteRoot`, default `gnollhack-build` | Relative to the home folder on the Mac |

To find out whether a problem is on the Windows side or on the Mac, run the script by hand with `-PackageOnly`. It packs the tar file and stops without connecting to the Mac. `-SourceList` is the file that the project writes in step 1 of [[How It Works|#how-it-works]], and `-MinOS` is the project's deployment target. From the repository root:

```powershell
.\win\win32\xpl\libapple\Build-AppleEngine.ps1 -Platform macos -Configuration Release -MinOS 15.0 -SourceList win\win32\vs\obj\Release\x64\gnollhackmac\gnh-sources.txt -IntDir $env:TEMP\gnh-apple\obj -OutDir $env:TEMP\gnh-apple\out -PackageOnly
```

It prints how many sources and headers it packed.

## 🔄 How It Differs from vcremote

Until November 2026, the iOS library was built by a Visual Studio iOS project through `vcremote` on the Mac, and copied back to Windows by PuTTY's `pscp`. The current system replaces both:

| | Before: vcremote and PSCP | Now: OpenSSH |
|:--|:--|:--|
| **Libraries** | iOS only | iOS, and macOS with its `.dSYM` |
| **Visual Studio project** | An iOS project with an Xcode platform toolset and an `ARM64` configuration | A Makefile project that runs a PowerShell script |
| **On the Mac** | `vcremote`, a Node.js package installed with npm, started in Terminal before building | Nothing to install or start: Xcode and Remote Login |
| **Pairing** | A PIN from `vcremote generateClientCert`, entered with the Mac's address and port under **Tools → Options → Cross Platform → C++ → iOS** | An SSH key and a host alias, set up once for each Windows computer |
| **Copying the library back** | A post-build `download-<Configuration>-ARM64.bat` ran `pscp` with the Mac password written in the script, into `C:\mac-out` | The script's own `scp`, with the key, into the project's output folder |
| **Host key** | Accepted by running a download script by hand once; otherwise the build failed or hung | Accepted once during setup; an unknown key fails at once with `GNHAB006` |
| **Mac's address** | In Visual Studio's options and in every download script, often one script for each network | One `HostName` line in `%USERPROFILE%\.ssh\config` |
| **Folder on the Mac** | `~/vcremote/C/hmp/GnollHack/…`, a mirror of the Windows path | `~/gnollhack-build/<platform>-<Configuration>-<computer>-<hash>`, one for each checkout and computer |
| **Deployment target** | Written into the generated Xcode project by a build step | Passed to `clang` from `GHiOSDeploymentTarget` |

The current system also decides what to recompile by file content, not by file times, and reports its problems as MSBuild errors `GNHAB001`–`GNHAB013`, with compiler messages that open in Visual Studio.

### 🚚 Moving from the Old Setup

1. Do the [[Setup|#setup]] above. Pair to Mac stays as it was, for the iOS app.
2. On the Mac, `vcremote` no longer needs to run. If nothing else uses it, remove it, and delete the `vcremote` folder in your home folder:

    ```bash
    sudo npm uninstall -g vcremote
    ```

3. On Windows, delete your `download-*.bat` scripts, which hold the Mac password, and the folder `C:\mac-out`. GnollHack no longer uses the pairing under **Tools → Options → Cross Platform → C++ → iOS**.
4. PuTTY can stay installed. GnollHack's build no longer uses it.

## ❓ Troubleshooting

The problems are grouped in the order a build meets them. Each `GNHAB` error is printed as `Build-AppleEngine.ps1 : error GNHABnnn: <message>`, and the message itself names the likely fix.

### 🔧 Before the Build Starts

| Problem | Solution |
|:--|:--|
| **`GNHAB001`**: `ssh`, `scp` or `tar` was not found | Install the **OpenSSH Client** under **Settings → System → Optional features**. `tar.exe` is part of Windows. |
| **`GNHAB002`**: `date_unix.h` is missing | The WSL data pipeline has not run in this checkout. Start WSL's SSH server and build the solution with the **iPhone** or **macOS** platform, not the project alone. See [[Set Up WSL|#3-set-up-wsl]]. |
| **`GNHAB003`**: the source list is missing, or names a file outside the repository | Build through the solution or the project, which write the list before every build. When you run the script by hand, pass the list the project wrote, as in [[Configuration|#configuration]]. |
| **`GNHAB004`**: invalid SSH host or remote folder | The alias may contain only letters, digits and `.` `_` `@` `-`, and the folder only letters, digits and `.` `_` `/` `-`. |
| **`GNHAB005`**: packing failed | The `tar` message above the error names the file. It is usually missing or locked by another program. |
| `Could not connect to the remote system` from the WSL projects | WSL's SSH server is not running, or Visual Studio's Connection Manager settings are wrong. See [[Set Up WSL|#3-set-up-wsl]]. |

### 🔧 Connecting to the Mac

| Problem | Solution |
|:--|:--|
| **`GNHAB006`**: cannot connect to the Mac | Check, in order: the Mac is awake; its address on the `HostName` line is current, as in [[When the Mac's address changes|/Development/Set Up SSH Access to the Mac for Native Libraries#when-the-macs-address-changes]]; **Remote Login** is on; the macOS firewall does not have **Block all incoming connections** on. Then run the test command in [[Set Up SSH Access|#2-set-up-ssh-access]]. |
| **`GNHAB006`** after the Mac moved to another network, although the address is right | Your alias has no `HostKeyAlias` line, so the Mac's key is trusted under its old address only. Add the line and accept the key once, as in [[When the Mac's address changes|/Development/Set Up SSH Access to the Mac for Native Libraries#when-the-macs-address-changes]]. |
| `Permission denied (publickey…)`, or the test asks for a password | The key is not in `~/.ssh/authorized_keys` on the Mac, or the `IdentityFile` line does not point to it. Repeat steps 3 and 4 of [[/Development/Set Up SSH Access to the Mac for Native Libraries]]. |
| `WARNING: UNPROTECTED PRIVATE KEY FILE!` | Other users can read the key file, and `ssh` refuses it. Create the key again in `%USERPROFILE%\.ssh` with `ssh-keygen`, as in [[Create a key|/Development/Set Up SSH Access to the Mac for Native Libraries#2-create-a-key-on-windows]], instead of copying it there from elsewhere. |
| `REMOTE HOST IDENTIFICATION HAS CHANGED` | Another computer answered at the Mac's address, or the Mac's system was reinstalled. Find out which before you remove the old key with `ssh-keygen -R gnollhack-mac`. |
| Pair to Mac works, but the library build cannot connect | They are separate connections. Pair to Mac does not set up the SSH alias; do [[Set Up SSH Access|#2-set-up-ssh-access]]. |

### 🔧 Checking Xcode

| Problem | Solution |
|:--|:--|
| **`GNHAB007`**: the SDK is not available on the Mac | Xcode is not installed, not selected, or its license is not accepted. Do step 2 of [[Prepare the Mac|#1-prepare-the-mac]], also after an Xcode update. |
| `xcrun: error: SDK "iphoneos" cannot be located` in the test | Only the Command Line Tools are selected, and they have no iOS SDK. Select Xcode with `xcode-select -s`, as in [[Prepare the Mac|#1-prepare-the-mac]]. |

### 🔧 Compiling on the Mac

| Problem | Solution |
|:--|:--|
| **`GNHAB008`**: preparing or cleaning the folder on the Mac failed | The Mac's disk is full, or the build folder's permissions have changed. Delete the folder under `~/gnollhack-build` and build again. |
| **`GNHAB009`**: copying or unpacking the sources failed | The connection dropped, or the Mac's disk is full; `df -h ~` on the Mac shows the free space. Build again. |
| **`GNHAB010`**: the engine build on the Mac failed | The compiler's errors are above it. Double-click one to open the file. If the errors make no sense for the current code, use **Rebuild**. |
| Code that compiles on Windows fails only here | Clang warns and errors in places where MSVC does not, and the iOS and macOS code paths (`GNH_IOS`, `GNH_MAC`) are compiled only here. Fix the code for both compilers. |
| `Undefined symbols for architecture arm64` (or `x86_64`) when linking the macOS library | A new engine source is in `gnollhacklinux.vcxproj` but not in `gnollhackapple.props`, or the other way round. Add it to both. The iOS library does not link its symbols, so for iOS the error appears only when the app is built. |
| Every source recompiles on each solution build | That is expected: the WSL data pipeline rewrites `date_unix.h`. Build the project alone for a faster loop, as in [[Incremental Builds|#incremental-builds]]. |

### 🔧 Copying the Library Back

| Problem | Solution |
|:--|:--|
| **`GNHAB011`**: copying the library or its `.dSYM` from the Mac failed | The connection dropped, or another program holds the library open on Windows. Close it and build again. |
| **`GNHAB013`**: the `.dSYM` does not match the library | Use **Rebuild**, which deletes the objects, the library and the `.dSYM` on the Mac. |
| Warning **`GNHAB012`** during Clean | The Mac could not be reached. The local files were deleted, but this checkout's folder on the Mac was not. It is harmless; delete the folder by hand later if you want the space back. |

### 🔧 After the Build

| Problem | Solution |
|:--|:--|
| The app still uses the old engine | The solution platform you built does not build that library (see [[Solution Platforms|#solution-platforms]]), or a later build of the other configuration replaced it. Check the time of the file in `Platforms/iOS/libs/` or `Platforms/MacOS/libs/`. |
| The macOS Release publish fails because the `.dSYM` is missing or does not match | Build `gnollhackmac` again in Release, so that the library and its `.dSYM` in `Platforms/MacOS/libs/` come from the same build. |

For general build problems, see [[/Development/Troubleshooting Building GnollHack with .NET MAUI]].

## 📖 Learn More

- [[/Development/Set Up SSH Access to the Mac for Native Libraries]]
- [[/Development/Build Instructions for iOS Version on Windows (.NET MAUI)]]
- [[/Development/Build Instructions for Avalonia macOS Version on Windows]]
- [[/Development/Overview of Building GnollHack with .NET MAUI]]
