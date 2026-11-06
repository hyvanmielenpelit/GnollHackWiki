> 👉 **These instructions build the Linux version of GnollHack on a Windows computer: the AppImage for GitHub, the Steam depot content and a tar.gz for testers, all from one build made with Visual Studio, the .NET SDK and WSL.**

For what the Avalonia port is, see [[/Development/Avalonia Port]]. How the Linux version works inside, and why it is built this way, is on [[/Development/Design Details of Linux Avalonia Port]].

| Goal | Sections |
|:-----|:---------|
| **Set up a new computer** | 1, then 2 |
| **Build new packages** | 2 |
| **Test the game** | 3 |
| **Release on Steam** | 2, then 4 |
| **Rebuild a file that is committed to the repository** | 5 |

## 1. Prerequisites

### 1.1. Devices

- **Windows computer** with an x64 processor — Windows 10 or later, 16 GB or 32 GB RAM, 512 GB or 1 TB SSD space.
- A Linux computer or a Steam Deck is useful for testing, but not required: the game also runs in WSL.

### 1.2. Software

**1.2.1. Install Visual Studio 2026** as described in [[/Development/Install Visual Studio 2026 for .NET MAUI Development]], with the **Linux and embedded development with C++** workload. The Linux game engine and data tools are Visual Studio Linux projects.

**1.2.2. Install the .NET SDK of the Avalonia port.** Its version is `sdk.version` in `win\win32\xpl\GnollHackM\Platforms\Avalonia\global.json`, and is newer than that of the other modern clients. Download that version from the [.NET download page](https://dotnet.microsoft.com/en-us/download/dotnet) and install it. It can be a preview or a release candidate.

**1.2.3. Install the .NET MAUI workload** from the same folder, so that the workload version pinned in `global.json` is used:

```powershell
cd win\win32\xpl\GnollHackM\Platforms\Avalonia
dotnet workload install maui
```

**1.2.4. Clone the [GnollHack repository](https://github.com/hyvanmielenpelit/GnollHack)** as described in [[/Development/Clone Repository in Visual Studio]].

**1.2.5. Install the tile sets and the Desktop sound banks** as described in [[/Development/Install Tile Sets and FMOD Sound Banks]].

**1.2.6. Install the secrets file** as described in [[/Development/Install Secrets File]].

### 1.3. WSL Distribution

One Ubuntu distribution on WSL 2 does all the Linux work: it is Visual Studio's Linux build host, it compiles the game data and the game engine, it assembles the packages, and it runs the game for testing. Any Ubuntu LTS release from 20.04 to 26.04 gives the same result, because the binaries are built against a fixed old glibc, the *sysroot*; see [[Binary Compatibility|/Development/Design Details of Linux Avalonia Port#binary-compatibility]].

**1.3.1. Install Ubuntu on WSL 2, and make it the default distribution**, which the build scripts use. For example, in PowerShell:

```powershell
wsl --install -d Ubuntu-24.04
wsl --set-version Ubuntu-24.04 2
wsl --set-default Ubuntu-24.04
```

✅ `wsl -l -v` lists the distribution as the default, with version 2.

Use WSL 2: Ubuntu 26.04 cannot unpack packages on WSL 1, and only WSL 2 can show the game's window. An existing Ubuntu 20.04 on WSL 1 can still build; see [[Separate Build and Test Distributions|#1-4-optional-separate-build-and-test-distributions]].

**1.3.2. Set up the distribution as a build host** as described in [[/Development/Install Windows Subsystem for Linux]]: the build tools, Bison, Flex, dos2unix, and the SSH server with password authentication.

**1.3.3. Add the connection to Visual Studio** under **Tools → Options → Cross Platform → Connection Manager**: Host Name `127.0.0.1`, Port `22`, and your WSL user name and password. Visual Studio uses this connection for every Linux project, including command-line builds.

**1.3.4. Install the packaging tools** in the distribution. The sysroot installer in the next step also needs `curl`:

```bash
sudo apt update
sudo apt install -y rsync binutils curl zsync
```

**1.3.5. Install the glibc 2.27 sysroot.** The script downloads three Ubuntu 18.04 packages, checks their SHA-256 values, unpacks them to `/opt/gnollhack/sysroot-glibc-2.27`, and tests the result. It runs as root in WSL and asks for no password:

```powershell
win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Install-LinuxSysroot.ps1
```

✅ It ends with `Sysroot ready`. If a tool is missing, it stops and prints the command that installs it. Run it again in every other distribution you build in.

**1.3.6. Download the pinned AppImage tools** into the distribution. The packaging script never downloads anything; it checks the file names and SHA-256 values set at the top of `win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Build-LinuxPackages.ps1`. Check that the versions below still match that script, then run in WSL:

```bash
mkdir -p ~/.cache/gnollhack-packaging/tools
cd ~/.cache/gnollhack-packaging/tools
wget -O appimagetool-1.9.1-x86_64.AppImage https://github.com/AppImage/appimagetool/releases/download/1.9.1/appimagetool-x86_64.AppImage
wget -O type2-runtime-20251108-x86_64 https://github.com/AppImage/type2-runtime/releases/download/20251108/runtime-x86_64
chmod 755 appimagetool-1.9.1-x86_64.AppImage
sha256sum appimagetool-1.9.1-x86_64.AppImage type2-runtime-20251108-x86_64
```

✅ The two hashes equal `$AppImageToolSha256` and `$AppImageRuntimeSha256` in the script.

### 1.4. Optional: Separate Build and Test Distributions

You can split the work between two distributions, for example an existing Ubuntu 20.04 on WSL 1 that Visual Studio already builds in, and a newer Ubuntu on WSL 2 for packaging and testing. Install the sysroot (step 1.3.5) in the distribution that Visual Studio's Connection Manager points to, and in any distribution that runs the packaging or maintenance scripts. Pass the distribution's name to each script with `-WslDistro`, for example `Build-LinuxPackages.ps1 -WslDistro Ubuntu-24.04`; without it, the scripts use the default distribution and print its name.

## 2. Building

Run the commands from the repository root in PowerShell, unless a step says otherwise.

### 2.1. Start the SSH Server

Start the SSH server in the WSL distribution. It must run while the native solution builds:

```powershell
wsl -u root -e /usr/sbin/service ssh start
```

This starts it in the default distribution; add `-d <name>` for another one.

### 2.2. Build the Native Solution

The **Linux** solution platform compiles the game data in WSL, the same `nhdat` file as the Android version, and then the Linux game engine `libgnollhacklinux.so` against the sysroot. Repeat this section whenever the C code or the game data in `dat\` changes.

**2.2.1. Open `win\win32\vs\GnollHack.sln`** as described in [[/Development/Open GnollHack Solution in Visual Studio]].

**2.2.2. Select the Linux solution platform and the Release configuration.**

**2.2.3. Rebuild the solution.** Or, from the command line, with the 64-bit MSBuild that Visual Studio itself uses:

```powershell
$msbuild = & "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe" -latest -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\amd64\MSBuild.exe
& $msbuild win/win32/vs/GnollHack.sln /t:Rebuild /p:Configuration=Release /p:Platform=Linux
```

**2.2.4. Check the results.** ✅ These files exist under `win\win32\xpl\GnollHackM\Platforms\`:

- `Android\gnh\nhdat`
- `Linux\libs\libgnollhacklinux.so`

> ⚠️ **Warning:** Every build, Debug or Release, copies its game engine to `Platforms\Linux\libs\`, and the packages ship whichever engine is there. You can test either configuration, but build Release last before you build packages.

### 2.3. Build the Packages

**2.3.1. Run the packaging script:**

```powershell
win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Build-LinuxPackages.ps1
```

It publishes the game for `linux-x64` in the Release configuration, assembles the packages in the WSL distribution under `~/.cache/gnollhack-packaging/`, and stops if any file needs a newer glibc or libstdc++ than the oldest version the game supports. Its options are in [[Packaging Script Options|#packaging-script-options]].

> ℹ️ **Note:** If the `SENTRY_AUTH_TOKEN` environment variable is set, the publish uploads the debug symbols of the release to Sentry. Add `-NoSentryUpload` to build packages without uploading, for example for testers.

**2.3.2. Find the packages** in `win\win32\xpl\GnollHackM\bin\LinuxPackages\<version>\`, where the version is `ApplicationDisplayVersion.ApplicationVersion` from `GnollHackM.csproj`:

| Output | Contents |
|:-------|:---------|
| **GnollHack-&lt;version&gt;-x86_64.AppImage** | The AppImage for the GitHub release |
| **GnollHack-&lt;version&gt;-x86_64.AppImage.zsync** | Update information for AppImage updaters; upload it to the same release |
| **GnollHack-&lt;version&gt;-linux-x64.tar.gz** | The game as a plain folder, for testers |
| **SHA256SUMS** | Checksums of the AppImage and the tar.gz |
| **steam\\** | The Steam depot content and the SteamPipe build scripts |

The script also leaves a staged copy in WSL, in `~/.cache/gnollhack-packaging/stage-<version>/`, which sections 3 and 4 use.

## 3. Testing

### 3.1. Run the Game in WSL

A WSL 2 distribution can run the game through WSLg.

**3.1.1. Start the staged copy** from the WSL home:

```bash
cd ~/.cache/gnollhack-packaging/stage-<version>/gnollhack
GALLIUM_DRIVER=d3d12 ./GnollHackM
```

Or start the AppImage, which needs no FUSE when started like this:

```bash
cd ~/.cache/gnollhack-packaging/stage-<version>/out
GALLIUM_DRIVER=d3d12 ./GnollHack-<version>-x86_64.AppImage --appimage-extract-and-run
```

`GALLIUM_DRIVER=d3d12` makes Mesa draw with your Windows graphics card; without it, the game falls back to slow software rendering. Saved games and settings go to `~/.local/share/GnollHack` in the distribution.

> 💡 **Tip:** Run the game from the WSL home, never from `/mnt/c`. Files on the Windows drive load slowly and have no executable permissions.

**3.1.2. Debug the game**, if needed, as described in [[/Development/Debugging Linux Version in WSL using Visual Studio Code]].

### 3.2. Test on a Steam Deck

Deploy the staged build to a Steam Deck and run it in Gaming Mode as described in [[/Development/Testing Avalonia Linux Version on Steam Deck]].

## 4. Steam Upload

The Steam content is built for the Steam Linux Runtime 4.0 by default, with the two libraries that the built-in web browser needs and that runtime lacks.

**4.1. Check the Steamworks settings**, once. The Linux launch option must point to the executable `GnollHackM`, which is at the root of the depot content. The Steam Linux Runtime selected for the app must match the `-SteamRuntime` that the content is built for.

**4.2. Build the Steam content** with the real IDs, which are in Steamworks under **SteamPipe → Depots**:

```powershell
win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Build-LinuxPackages.ps1 -Targets Steam -SteamAppId <app ID> -SteamDepotId <Linux depot ID> -SteamBranch <branch> -BuildDescription '<description>'
```

> 📢 **Important:** A beta branch build must also list the current Windows depot in `app_build_linux.vdf`, so that Windows players on that branch keep a working game. The template has a comment at the right place.

**4.3. Upload the content** with ContentBuilder or `steamcmd` on Windows, from `bin\LinuxPackages\<version>\steam\`. A depot uploaded from Windows installs with every file marked executable, so this works. Or upload it with `steamcmd` in the WSL distribution, from the staged copy:

```bash
cd ~/.cache/gnollhack-packaging/stage-<version>/out/steam
steamcmd +login <Steam user> +run_app_build "$PWD/app_build_linux.vdf" +quit
```

## 5. Other Tasks

### 5.1. Publish Without Packaging

To check that the code compiles for Linux, publish without the packaging script. Run `dotnet` from `Platforms\Avalonia`, so that its `global.json` selects the pinned SDK:

```powershell
cd win\win32\xpl\GnollHackM\Platforms\Avalonia
dotnet publish ..\..\GnollHackM.csproj -p:GnhAvalonia=true -r linux-x64 -f net11.0 -c Release --self-contained true -p:GnhSentryUpload=false
```

The publish lands in `win\win32\xpl\GnollHackM\bin\Release\net11.0\linux-x64\publish\`.

### 5.2. Rebuild a Committed Binary

Two files of the Linux version are committed to the repository rather than built every time. Rebuild one only when its sources change. Both scripts are in `win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\`, run in the default WSL distribution or the one `-WslDistro` names, build against the sysroot, and print the `apt-get` command for any tool that is missing.

**5.2.1. Rebuild the save recovery utility** `Platforms\Linux\gnh\recover` with `Build-LinuxRecover.ps1`, after a change to the recovery utility or to the save file format it reads.

**5.2.2. Rebuild the native crash reporter** `Platforms\Linux\libs\libsentry.so` with `Build-LinuxSentryNative.ps1`, after a Sentry upgrade, following `win\win32\xpl\gnhsentrywin\README.md`. It also needs `cmake`, `g++` and `git`, and prints the `git clone` command for the sentry-native version it expects. It writes `libsentry.build.props` beside the library, which every build checks against the Sentry .NET package and the Windows version's crash reporter: a mismatch is an error in a Release publish or a package build, and a warning otherwise.

### 5.3. Refresh the CEF License Texts

The license texts of CEF and Chromium that the packages ship are in `Platforms\Linux\licenses\cef\`. Refresh them with every CEF update.

## ⚙️ Packaging Script Options

The parameters of `Build-LinuxPackages.ps1`:

| Parameter | Effect |
|:----------|:-------|
| **-Targets** | `AppImage`, `TarGz`, `Steam`, or several separated by commas. Default: all three. |
| **-SkipPublish** | Uses the previous publish in `bin\Release\net11.0\linux-x64\publish\` instead of publishing again. |
| **-NoSentryUpload** | Publishes without uploading debug symbols to Sentry. Has no effect with `-SkipPublish`. |
| **-SteamRuntime** | `steamrt4` (default, Steam Linux Runtime 4.0) or `sniper` (Steam Linux Runtime 3.0). |
| **-SteamAppId**, **-SteamDepotId**, **-SteamBranch**, **-BuildDescription** | Values for the SteamPipe build scripts. An empty value leaves its placeholder in the file. |
| **-KeepDebugInfo** | Ships the game engine with its debug information. The copy in `Platforms\Linux\libs\` keeps it either way. |
| **-RunbookPath** | A Markdown file added to the tar.gz as `README-LINUX-TEST.md`. |
| **-OutputRoot** | The folder that receives the `<version>` folder of packages. Default: `bin\LinuxPackages`. |
| **-WslDistro** | The distribution that assembles the packages. Default: the default WSL distribution. |

For example, to rebuild only the AppImage from the previous publish:

```powershell
win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Build-LinuxPackages.ps1 -Targets AppImage -SkipPublish
```

## ❓ Troubleshooting

For general build problems, such as a locked file, see [[/Development/Troubleshooting Building GnollHack with .NET MAUI]]. Problems with the Steam Deck are on [[/Development/Testing Avalonia Linux Version on Steam Deck]].

### 🔧 Setup and WSL

| Problem | Fix |
|:--------|:----|
| **`A compatible .NET SDK was not found`** | The SDK pinned in `Platforms\Avalonia\global.json` is not installed. Do step 1.2.2. |
| **`NETSDK1147`**: a workload must be installed | The .NET MAUI workload was installed from another folder, so for another SDK. Do step 1.2.3. |
| **A wrong .NET SDK is used, or the `GnhAvalonia` build fails to restore** | `dotnet` was run outside `Platforms\Avalonia`, where other `global.json` files, or none, select a different SDK. |
| **`The WSL distribution '...' cannot run commands`**, or the default distribution is Docker Desktop's | Install Ubuntu and make it the default with `wsl --set-default <name>`, or pass `-WslDistro <name>`. |
| **`wsl.exe was not found`** | WSL is not installed. Do step 1.3.1. |
| **`Install-LinuxSysroot.ps1` reports that the distribution cannot extract packages** | The distribution runs on WSL 1. Convert it with `wsl --set-version <name> 2`. |
| **`Cannot map '...' to a WSL path: only paths on a drive letter are supported`** | The repository is on a network path. Clone it to a drive with a letter, such as `C:`. |

### 🔧 Native Build

| Problem | Fix |
|:--------|:----|
| **`Could not connect to the remote system`** | The SSH server in the WSL distribution is not running, or the Connection Manager settings are wrong. Do step 2.1, and check step 1.3.3. If Windows' own OpenSSH Server runs, it may hold port 22; stop it, or use another port for WSL. |
| **`error: the glibc 2.27 sysroot is missing`** | The distribution that Visual Studio's Connection Manager points to has no sysroot. Do step 1.3.5 in it. |
| **MSBuild exits at once with no output when building `gnollhacklinux`** | The 32-bit MSBuild was used. Use the one in `MSBuild\Current\Bin\amd64\`, as in step 2.2.3. |
| **`MSB4057: The target "GetRecipeFile" does not exist`** in a command-line build | A Linux project is missing its `AddSyntheticProjectReferencesForSolutionDependencies` setting; see `WA-BUILD-0003` in the repository's `DEVEL\workarounds\build_tooling.md`. |
| **`... needs GLIBC_2.xx, above the GLIBC_2.27 floor`** | A library was built without the sysroot. Do step 1.3.5 in the distribution that built it, and build the library again. |
| **`undefined reference to '...'`** when linking a Linux library | The code calls a function that glibc 2.27 does not have. The build refuses it, because the game would crash on older Linux systems. |

### 🔧 Packaging

| Problem | Fix |
|:--------|:----|
| **`Missing '...\libgnollhacklinux.so'`**, or error **`GNHNI001`** | The game engine or the game data has not been built. Do section 2.2. |
| **Error `GNHNI002` or `GNHNI003`** | A sound bank or tile set file is missing. Do step 1.2.5. |
| **`dotnet was not found on PATH`** | Install the SDK (step 1.2.2), and open a new PowerShell window. |
| **`'...' is not installed in WSL`** | A Linux tool that the script uses is missing. Do steps 1.3.2 and 1.3.4. |
| **`the publish needs a newer glibc or libstdc++ than the floor`** | The files listed above the message need a newer glibc or libstdc++ than the oldest version the game supports; see [[Binary Compatibility|/Development/Design Details of Linux Avalonia Port#binary-compatibility]]. Rebuild a library that GnollHack builds against the sysroot (step 1.3.5). |
| **`... is missing. Put the pinned file there`**, or a SHA-256 mismatch | The AppImage tools are missing or are the wrong version. Do step 1.3.6. |
| **`GNHSN011` to `GNHSN016`** errors or warnings about `libsentry.so` | `libsentry.so` does not match the Sentry version the project uses. Do step 5.2.2. For a local test build only, `-p:GnhAllowStaleSentryNative=true` turns the errors into warnings. |

### 🔧 Running in WSL

| Problem | Fix |
|:--------|:----|
| **The game is very slow** | It runs with software rendering. Start it with `GALLIUM_DRIVER=d3d12`, as in step 3.1.1. |
| **`Permission denied` when starting the game** | It was started from `/mnt/c`, where files have no executable permissions. Start the staged copy in the WSL home, as in step 3.1.1. |

## 📖 Learn More

- [[/Development/Avalonia Port]]
- [[/Development/Design Details of Linux Avalonia Port]]
- [[/Development/Testing Avalonia Linux Version on Steam Deck]]
- [[/Development/Build Instructions for Avalonia Windows Version on Windows]]
- [[/Linux System Requirements]]
- [[/Installing the AppImage on Linux]]

## 🔗 External Links

- [AppImage documentation](https://docs.appimage.org/)
- [Steam Linux Runtime](https://gitlab.steamos.cloud/steamrt/steam-runtime-tools/-/blob/main/docs/container-runtime.md)
- [SteamPipe documentation](https://partner.steamgames.com/doc/sdk/uploading)
