> 👉 **These instructions build the Linux version of GnollHack on a Windows computer: the AppImage published on GitHub, the Steam depot content, and a tar.gz for testers. All three come from one self-contained Linux build of the Avalonia port, made with Visual Studio, the .NET SDK and one WSL distribution.**

For what the Avalonia port is and how it differs from the other modern clients, see [[/Development/Avalonia Port]].

## 📋 Prerequisites

### 💻 Devices

- **Windows computer** with an x64 processor — Windows 10 or later, 16 GB or 32 GB RAM, 512 GB or 1 TB SSD space.
- A Linux computer or a Steam Deck is useful for testing, but not required: the game also runs in WSL.

### 🛠️ Software

1. [[/Development/Install Visual Studio 2026 for .NET MAUI Development]]. The **Linux and embedded development with C++** workload is required: the Linux game engine and the Linux data tools are Visual Studio Linux projects.
2. Install the .NET SDK and the .NET MAUI workload of the Avalonia port. Their versions are pinned in `win\win32\xpl\GnollHackM\Platforms\Avalonia\global.json` and are newer than those of the other modern clients:
    - Download the SDK whose version is `sdk.version` in that file from the [.NET download page](https://dotnet.microsoft.com/en-us/download/dotnet), and install it. It can be a preview or release candidate.
    - Install the workload from that folder, so that the pinned workload version in the same file is used:

    ```powershell
    cd win\win32\xpl\GnollHackM\Platforms\Avalonia
    dotnet workload install maui
    ```

3. Clone the [GnollHack repository](https://github.com/hyvanmielenpelit/GnollHack) — [[/Development/Clone Repository in Visual Studio]].
4. [[/Development/Install Tile Sets and FMOD Sound Banks]]. The Linux version uses the **Desktop** sound banks.
5. [[/Development/Install Secrets File]].

### 🐧 WSL Distribution

One WSL distribution does all the Linux work. It is Visual Studio's Linux build host, it compiles the game data and the game engine, it assembles the packages, and it runs the game for testing. Any Ubuntu LTS release from 20.04 to 26.04 works, and they all produce the same result: the Linux binaries are built against a fixed copy of an older glibc, the *sysroot*, rather than against the distribution's own, so that they run on old Linux distributions too.

1. Install Ubuntu on WSL 2, and make it the default WSL distribution, which the build scripts use. For example, in PowerShell:

    ```powershell
    wsl --install -d Ubuntu-24.04
    wsl --set-version Ubuntu-24.04 2
    wsl --set-default Ubuntu-24.04
    ```

    `wsl -l -v` lists the installed distributions and their WSL versions.

    > ℹ️ **Note:** Use WSL 2. Ubuntu 26.04 cannot unpack packages on WSL 1, and only WSL 2 can show the game's window for testing. Ubuntu 20.04 also works on WSL 1, but then you cannot test the game in it.

2. Set up the distribution as a build host as described in [[/Development/Install Windows Subsystem for Linux]]: the build tools, Bison, Flex, dos2unix, and the SSH server with password authentication.
3. Configure the SSH connection in Visual Studio under **Tools → Options → Cross Platform → Connection Manager**: Host Name `127.0.0.1`, Port `22`, and your WSL user name and password. Visual Studio uses this connection for every Linux project, including the command-line builds below. WSL 2 forwards the port to the distribution.
4. Install the packaging tools in the distribution. The sysroot installer in the next step needs `curl` too:

    ```bash
    sudo apt update
    sudo apt install -y rsync binutils curl zsync
    ```

5. Install the glibc 2.27 sysroot. The script downloads three Ubuntu 18.04 packages from Ubuntu's archive, checks their SHA-256 values, and unpacks them to `/opt/gnollhack/sysroot-glibc-2.27`. Then it builds a test library against the sysroot, and checks that it needs no newer glibc. It runs as root in WSL and asks for no password:

    ```powershell
    win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Install-LinuxSysroot.ps1
    ```

    It ends with `Sysroot ready`. Run it again in every other distribution you build in. If a tool is missing, it stops and prints the command that installs it.

6. Download the pinned AppImage tools into the distribution. The packaging script never downloads anything; it checks the file names and SHA-256 values set at the top of `win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Build-LinuxPackages.ps1`. Run these commands in WSL, after checking that the versions and hashes still match that script:

    ```bash
    mkdir -p ~/.cache/gnollhack-packaging/tools
    cd ~/.cache/gnollhack-packaging/tools
    wget -O appimagetool-1.9.1-x86_64.AppImage https://github.com/AppImage/appimagetool/releases/download/1.9.1/appimagetool-x86_64.AppImage
    wget -O type2-runtime-20251108-x86_64 https://github.com/AppImage/type2-runtime/releases/download/20251108/runtime-x86_64
    chmod 755 appimagetool-1.9.1-x86_64.AppImage
    sha256sum appimagetool-1.9.1-x86_64.AppImage type2-runtime-20251108-x86_64
    ```

    The two hashes that `sha256sum` prints must equal `$AppImageToolSha256` and `$AppImageRuntimeSha256` in the script.

7. Create the staging folders that the native solution copies assets to. It does not create them itself:

    ```powershell
    New-Item -ItemType Directory -Force C:\wsl-in\assetpack\Assets\tileset, C:\wsl-in\assetpack2, C:\wsl-in\assetpack-maui, C:\wsl-in\assetpack-maui2
    ```

### ⚙️ Optional: Separate Build and Test Distributions

You can also split the work between two distributions, for example an existing Ubuntu 20.04 on WSL 1 that Visual Studio already builds in, and a newer Ubuntu on WSL 2 for packaging and testing. Install the sysroot in the distribution that Visual Studio's Connection Manager points to, and in any distribution that runs the maintenance scripts. Then pass the distribution's name to each script with `-WslDistro`, for example `Build-LinuxPackages.ps1 -WslDistro Ubuntu-24.04`. Without `-WslDistro`, the scripts use the default WSL distribution, and print its name.

## 🛠️ Building

Run the commands from the repository root in PowerShell, unless a step says otherwise.

### 1. Start the SSH Server

Start the SSH server in the WSL distribution. It must run during steps 2 and 3:

```powershell
wsl -u root -e /usr/sbin/service ssh start
```

This starts it in the default distribution; add `-d <name>` for another one.

### 2. Build the Native Solution

The native solution compiles the game data for Linux in WSL, and stages the tile sets and sound banks. The Linux version uses the same `nhdat` game data file as the Android version.

1. Open `win\win32\vs\GnollHack.sln` — [[/Development/Open GnollHack Solution in Visual Studio]].
2. Select the **MauiAndroid** solution platform. The **x64** platform is not enough, because it skips the WSL data pipeline. Do not use **Android+Windows**: it also builds the legacy Xamarin projects, which need Visual Studio 2022, or Visual Studio 2026 with those projects unloaded, and the Linux version uses none of them.
3. Select **Release**, and rebuild the solution.

The same from the command line, with the 64-bit MSBuild, which is the one Visual Studio itself uses. The 32-bit MSBuild in `MSBuild\Current\Bin` crashes on Visual Studio's Linux projects without printing anything:

```powershell
$msbuild = & "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe" -latest -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\amd64\MSBuild.exe
& $msbuild win/win32/vs/GnollHack.sln /t:Rebuild /p:Configuration=Release /p:Platform=MauiAndroid
```

Check that these files now exist under `win\win32\xpl\GnollHackM\Platforms\`:

- `Android\gnh\nhdat`
- `Windows\banks\` — six `.bank` files
- `Windows\tileset\` — three `.ghpng` files

The same build writes the version header that the Linux game engine compiles against, so do this step before step 3. You need to repeat it only when the C code, the game data in `dat\`, the tile sets or the sound banks change.

### 3. Build the Linux Game Engine

The game engine for Linux, `libgnollhacklinux.so`, is built by the `gnollhacklinux` project, which no solution platform builds automatically. Build it separately, in the **Release** configuration:

- **In Visual Studio:** right-click the **gnollhacklinux** project in Solution Explorer, and choose **Build**.
- **From the command line:** use the 64-bit MSBuild of step 2:

    ```powershell
    $msbuild = & "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe" -latest -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\amd64\MSBuild.exe
    & $msbuild win/win32/vs/gnollhacklinux.vcxproj /t:Build /p:Configuration=Release /p:Platform=x64
    ```

The build compiles and links against the sysroot, and copies the library to `win\win32\xpl\GnollHackM\Platforms\Linux\libs\libgnollhacklinux.so`. Rebuild it whenever the C code changes.

The configuration matters because every build of the project, **Debug** or **Release**, copies its library to that folder, and the packaging script in step 4 ships whatever library is there. If you build Debug for debugging, build Release again before you build the packages.

> ⚠️ **Warning:** `Could not connect to the remote system` means that the SSH server is not running, or that the Connection Manager settings are wrong. Repeat step 1. `error: the glibc 2.27 sysroot is missing` means that the distribution Visual Studio builds in has no sysroot. Run `Install-LinuxSysroot.ps1` for it.

### 4. Build the Packages

One script publishes the game for Linux and builds the packages:

```powershell
win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Build-LinuxPackages.ps1
```

The script:

1. Runs `dotnet publish` for `linux-x64` in the **Release** configuration, self-contained, from `Platforms\Avalonia`, whose `global.json` selects the SDK.
2. Copies the publish to the WSL distribution, under `~/.cache/gnollhack-packaging/`, where the files get Linux permissions.
3. Strips the debug information from the game engine. The copy in `Platforms\Linux\libs\` keeps it.
4. Checks that no file needs a newer glibc or libstdc++ than the oldest version the game supports, and stops otherwise, naming each file.
5. Builds the packages, and copies them to `win\win32\xpl\GnollHackM\bin\LinuxPackages\<version>\`, where the version is `ApplicationDisplayVersion.ApplicationVersion` from `GnollHackM.csproj`.

| Output | Contents |
|:-------|:---------|
| **GnollHack-&lt;version&gt;-x86_64.AppImage** | The AppImage for the GitHub release |
| **GnollHack-&lt;version&gt;-x86_64.AppImage.zsync** | Update information for AppImage updaters; upload it to the same release |
| **GnollHack-&lt;version&gt;-linux-x64.tar.gz** | The game as a plain folder, for testers |
| **SHA256SUMS** | Checksums of the AppImage and the tar.gz |
| **steam\\** | The Steam depot content and the SteamPipe build scripts |

The script's most useful parameters:

| Parameter | Effect |
|:----------|:-------|
| **-Targets** | `AppImage`, `TarGz`, `Steam`, or several separated by commas. Default: all three. |
| **-SkipPublish** | Uses the previous publish in `bin\Release\net11.0\linux-x64\publish\` instead of publishing again. |
| **-SteamRuntime** | `steamrt4` (default, Steam Linux Runtime 4.0) or `sniper` (Steam Linux Runtime 3.0). |
| **-SteamAppId**, **-SteamDepotId**, **-SteamBranch**, **-BuildDescription** | Values for the SteamPipe build scripts. An empty value leaves its placeholder in the file. |
| **-KeepDebugInfo** | Ships the game engine with its debug information. |
| **-RunbookPath** | A Markdown file added to the tar.gz as `README-LINUX-TEST.md`. |
| **-WslDistro** | The distribution that assembles the packages. Default: the default WSL distribution. |

For example, to rebuild only the AppImage from the previous publish:

```powershell
win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Build-LinuxPackages.ps1 -Targets AppImage -SkipPublish
```

> ℹ️ **Note:** If the `SENTRY_AUTH_TOKEN` environment variable is set, the publish uploads the debug symbols of the release to Sentry. To publish without uploading, run the publish yourself with `-p:GnhSentryUpload=false`, as shown in [[Publishing Without the Script|#publishing-without-the-script]], and then run the script with `-SkipPublish`.

## 🎮 Steam Upload

The Steam content is built for the Steam Linux Runtime 4.0 by default, with the two libraries that the built-in web browser needs and that runtime lacks. Build it with the real IDs:

```powershell
win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Build-LinuxPackages.ps1 -Targets Steam -SteamAppId <app ID> -SteamDepotId <Linux depot ID> -SteamBranch <branch> -BuildDescription '<description>'
```

Then upload it with `steamcmd` in the WSL distribution, from the copy in the WSL home that the script names in its summary, so that the executable permissions survive. The copy under `bin\LinuxPackages\` on Windows has lost them.

```bash
cd ~/.cache/gnollhack-packaging/stage-<version>/out/steam
steamcmd +login <Steam user> +run_app_build "$PWD/app_build_linux.vdf" +quit
```

> 📢 **Important:** A beta branch build must also list the current Windows depot in `app_build_linux.vdf`, so that Windows players on that branch keep a working game. The template has a comment at the right place.

The executable `GnollHackM` is at the root of the depot content, which is where the Linux launch option in Steamworks must point. The Steam Linux Runtime selected for the app in Steamworks must match the `-SteamRuntime` the content was built for.

## 🧪 Testing in WSL

A WSL 2 distribution can run the game through WSLg. Start the staged copy that the script left in the WSL home:

```bash
cd ~/.cache/gnollhack-packaging/stage-<version>/gnollhack
GALLIUM_DRIVER=d3d12 ./GnollHackM
```

Or the AppImage, which needs no FUSE when started like this:

```bash
cd ~/.cache/gnollhack-packaging/stage-<version>/out
GALLIUM_DRIVER=d3d12 ./GnollHack-<version>-x86_64.AppImage --appimage-extract-and-run
```

`GALLIUM_DRIVER=d3d12` makes Mesa draw with your Windows graphics card. Without it, the game falls back to slow software rendering. Saved games and settings go to `~/.local/share/GnollHack` in the distribution.

> 💡 **Tip:** Run the game from the WSL home, never from `/mnt/c`. Files on the Windows drive load slowly and have no executable permissions.

## ⚙️ Publishing Without the Script

To build only the Linux publish, for example to check that the code compiles, run `dotnet` from `Platforms\Avalonia`, so that its `global.json` selects the pinned SDK:

```powershell
cd win\win32\xpl\GnollHackM\Platforms\Avalonia
dotnet publish ..\..\GnollHackM.csproj -p:GnhAvalonia=true -r linux-x64 -f net11.0 -c Release --self-contained true -p:GnhSentryUpload=false
```

The publish lands in `win\win32\xpl\GnollHackM\bin\Release\net11.0\linux-x64\publish\`. Never run `dotnet` for the Avalonia port from the repository root or from `GnollHackM`: other `global.json` files, or none, select a different SDK there.

## 🔧 Maintenance Scripts

Two files in the Linux build are committed to the repository rather than built every time. Rebuild them only when their sources change. Both scripts run in the default WSL distribution, or the one `-WslDistro` names, build against the sysroot, and print the `apt-get` command for any tool that is missing. `Build-LinuxSentryNative.ps1` also needs `cmake`, `g++` and `git`, and prints the `git clone` command for the sentry-native version it expects.

| Script | Builds | When to run |
|:-------|:-------|:------------|
| **Build-LinuxRecover.ps1** | `Platforms\Linux\gnh\recover`, the save recovery utility | After a change to the recovery utility or to the save file format it reads |
| **Build-LinuxSentryNative.ps1** | `Platforms\Linux\libs\libsentry.so`, the native crash reporter | After a Sentry upgrade, following `win\win32\xpl\gnhsentrywin\README.md` |

Both are in `win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\`.

`Build-LinuxSentryNative.ps1` also writes `Platforms\Linux\libs\libsentry.build.props`, which records the sentry-native version and the hashes of the library. Every build of the Avalonia port checks it against the Sentry .NET package and the Windows version's native crash reporter, which must use the same sentry-native version. A mismatch is an error in a Release publish or package build, and a warning otherwise.

## ❓ Troubleshooting

| Symptom | Cause and fix |
|:--------|:--------------|
| `Missing '...\libgnollhacklinux.so'` | The game engine has not been built. Do step 3. |
| `Could not connect to the remote system` | The SSH server in the WSL distribution is not running, or the Connection Manager settings are wrong. Do step 1. If Windows' own OpenSSH Server runs, it may hold port 22; stop it, or use another port for WSL. |
| `error: the glibc 2.27 sysroot is missing` | Run `Install-LinuxSysroot.ps1` for the distribution that Visual Studio's Connection Manager points to. |
| `Install-LinuxSysroot.ps1` reports that the distribution cannot extract packages | The distribution runs on WSL 1. Convert it with `wsl --set-version <name> 2`. |
| MSBuild exits at once with no output when building `gnollhacklinux` | The 32-bit MSBuild was used. Use the one in `MSBuild\Current\Bin\amd64\`. |
| The game starts without graphics or sound | The tile sets or sound banks were not staged. Rebuild the native solution with **MauiAndroid**, and check the files listed in step 2. |
| `... needs GLIBC_2.xx, above the GLIBC_2.27 floor` | A library was built without the sysroot. Run `Install-LinuxSysroot.ps1` for the distribution that built it, and build the library again. |
| `undefined reference to '...'` when linking a Linux library | The code calls a function that glibc 2.27 does not have. The build refuses it, because the game would crash on older Linux systems. |
| `... is missing. Put the pinned file there` or a SHA-256 mismatch | The AppImage tools are missing or are the wrong version. Repeat step 6 of the WSL setup. |
| `The WSL distribution '...' cannot run commands`, or the default distribution is Docker Desktop's | Install Ubuntu and make it the default with `wsl --set-default <name>`, or pass `-WslDistro <name>`. |
| A wrong .NET SDK is used, or the `GnhAvalonia` build fails to restore | `dotnet` was run outside `Platforms\Avalonia`, or the pinned SDK or workload is not installed. |
| `GNHSN011` to `GNHSN016` errors or warnings about `libsentry.so` | `libsentry.so` does not match the Sentry version the project uses. After a Sentry upgrade, rebuild it with `Build-LinuxSentryNative.ps1`, following `win\win32\xpl\gnhsentrywin\README.md`. For a local test build only, `-p:GnhAllowStaleSentryNative=true` turns the errors into warnings. |

For general build problems, see [[/Development/Troubleshooting Building GnollHack with .NET MAUI]].

## 📖 Learn More

- [[/Development/Avalonia Port]]
- [[/Development/Design Details of Linux Avalonia Port]]
- [[/Development/Build Instructions for Avalonia Windows Version on Windows]]
- [[/Development/Overview of Building GnollHack with .NET MAUI]]
- [[/Linux System Requirements]]
- [[/Installing the AppImage on Linux]]

## 🔗 External Links

- [AppImage documentation](https://docs.appimage.org/)
- [Steam Linux Runtime](https://gitlab.steamos.cloud/steamrt/steam-runtime-tools/-/blob/main/docs/container-runtime.md)
- [SteamPipe documentation](https://partner.steamgames.com/doc/sdk/uploading)
