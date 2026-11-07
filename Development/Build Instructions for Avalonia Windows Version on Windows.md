> 👉 **The Avalonia port of GnollHack also runs on Windows, through Avalonia's own Windows backend. These instructions build and run it, which is the quickest way to develop and test the Avalonia port without a Linux computer. Windows players get the WinUI 3 version instead, which is built as described in [[/Development/Build Instructions for WinUI3 Version on Windows (.NET MAUI)]].**

For what the Avalonia port is, see [[/Development/Avalonia Port]]. How the Windows flavor differs from the WinUI 3 version is on [[/Development/Design Details of Windows Avalonia Port]].

## 1. Prerequisites

### 1.1. Devices

- **Windows computer** with an x64 processor — Windows 10 or later, 16 GB or 32 GB RAM, 512 GB or 1 TB SSD space.

### 1.2. Software

**1.2.1. Install Visual Studio 2026** as described in [[/Development/Install Visual Studio 2026 for .NET MAUI Development]], with **Desktop development with C++**, including its **MSVC v143** and **Windows 11 SDK** components, and **.NET desktop development**.

**1.2.2. Install the .NET SDK of the Avalonia port.** Its version is `sdk.version` in `win\win32\xpl\GnollHackM\Platforms\Avalonia\global.json`, and is newer than that of the other modern clients. Download that version from the [.NET download page](https://dotnet.microsoft.com/en-us/download/dotnet) and install it. It can be a preview or a release candidate.

**1.2.3. Install the .NET MAUI workload** from the same folder, so that the workload version pinned in `global.json` is used:

```powershell
cd win\win32\xpl\GnollHackM\Platforms\Avalonia
dotnet workload install maui
```

**1.2.4. Clone the [GnollHack repository](https://github.com/hyvanmielenpelit/GnollHack)** as described in [[/Development/Clone Repository in Visual Studio]].

**1.2.5. Install the tile sets and the Desktop sound banks** as described in [[/Development/Install Tile Sets and FMOD Sound Banks]].

**1.2.6. Install the secrets file** as described in [[/Development/Install Secrets File]].

**1.2.7. Install the Microsoft Edge WebView2 Runtime** on Windows 10, if it is missing, from the [WebView2 download page](https://developer.microsoft.com/en-us/microsoft-edge/webview2/). It shows in-game web pages, such as this wiki. Windows 11 includes it.

## 2. Building and Running

Run the commands from the repository root in PowerShell, unless a step says otherwise.

### 2.1. Build the Native Solution

The native solution builds the game engine `gnollhackwin.dll` and the `nhdat` game data file, which the Avalonia port on Windows shares with the WinUI 3 version. Repeat this section whenever the C code or the game data in `dat\` changes.

**2.1.1. Open `win\win32\vs\GnollHack.sln`** as described in [[/Development/Open GnollHack Solution in Visual Studio]].

**2.1.2. Select the x64 solution platform**, and the **Debug** or **Release** configuration.

**2.1.3. Rebuild the solution.** Or, from the command line, with the 64-bit MSBuild that Visual Studio itself uses:

```powershell
$msbuild = & "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe" -latest -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\amd64\MSBuild.exe
& $msbuild win/win32/vs/GnollHack.sln /t:Rebuild /p:Configuration=Debug /p:Platform=x64
```

**2.1.4. Check the results.** ✅ These files exist under `win\win32\xpl\GnollHackM\Platforms\Windows\`:

- `libs\gnollhackwin.dll`
- `gnh\nhdat`

> 💡 **Tip:** The **x64** platform does not convert the shared XAML files. After you edit XAML in `GnollHackX`, rebuild the native solution once with **MauiAndroid**, which needs [[WSL|/Development/Install Windows Subsystem for Linux]].

### 2.2. Build the Avalonia Port

**2.2.1. Build the project** with `dotnet` from `Platforms\Avalonia`, so that its `global.json` selects the pinned SDK. The `GnhAvalonia=true` property switches the project to the Avalonia port:

```powershell
cd win\win32\xpl\GnollHackM\Platforms\Avalonia
dotnet build ..\..\GnollHackM.csproj -p:GnhAvalonia=true
```

✅ The game is in `win\win32\xpl\GnollHackM\bin\Debug\net11.0\win-x64\`, with its native libraries and game data. Add `-c Release` for a Release build, which lands in `bin\Release\net11.0\win-x64\`.

> ⚠️ **Warning:** Never run `dotnet` for the Avalonia port from the repository root or from `GnollHackM`. Other `global.json` files, or none, select a different SDK there, and the build fails or uses the wrong one.

### 2.3. Run the Game

**2.3.1. Start `GnollHackM.exe`** from the output folder:

```powershell
& win\win32\xpl\GnollHackM\bin\Debug\net11.0\win-x64\GnollHackM.exe
```

Saved games and settings go to `%LOCALAPPDATA%\GnollHack-Avalonia`, apart from those of the WinUI 3 version. No console window opens: the game's output goes to `%LOCALAPPDATA%\GnollHack-Avalonia\Logs\GnollHack.log`, and the previous run's to `GnollHack.previous.log`.

> 💡 **Tip:** `--win-composition=<mode>` on the command line, or the environment variable `GNOLLHACK_WIN_COMPOSITION`, picks how the window is drawn, for testing: `dxgi` (the default), `winui`, `dcomp`, `redirect`, `wgl`, or `avalonia` for Avalonia's own defaults. The log's `GnollHack: Windows composition request` line shows what was applied. Likewise `--win-gpu=<mode>` or `GNOLLHACK_WIN_GPU` picks the GPU: `auto` (the default: the high-performance GPU unless Windows' per-app graphics setting says Power saving), `dedicated`, `integrated`, or `avalonia` for Avalonia's own first adapter; the `GnollHack: Windows GPU` log line names the adapter chosen.

**2.3.2. Attach the debugger**, if needed: in Visual Studio, choose **Debug → Attach to Process**, and select `GnollHackM.exe` with the **Managed (.NET Core, .NET 5+)** code type.

## 3. Making a Folder for Testers

A self-contained publish includes the .NET runtime, so it runs on a Windows computer without the SDK. There is no installer for the Avalonia port on Windows.

**3.1. Build the native solution in Release**, as in section 2.1, so that the published game engine is a Release build too.

**3.2. Publish the game:**

```powershell
cd win\win32\xpl\GnollHackM\Platforms\Avalonia
dotnet publish ..\..\GnollHackM.csproj -p:GnhAvalonia=true -r win-x64 -f net11.0 -c Release --self-contained true
```

✅ The publish is in `win\win32\xpl\GnollHackM\bin\Release\net11.0\win-x64\publish\`.

**3.3. Zip the `publish` folder and send it.** The tester starts `GnollHackM.exe` in it.

## ❓ Troubleshooting

For general build problems, such as a locked file, see [[/Development/Troubleshooting Building GnollHack with .NET MAUI]].

### 🔧 Building

| Problem | Fix |
|:--------|:----|
| **`A compatible .NET SDK was not found`** | The SDK pinned in `Platforms\Avalonia\global.json` is not installed. Do step 1.2.2. |
| **`NETSDK1147`**: a workload must be installed | The .NET MAUI workload was installed from another folder, so for another SDK. Do step 1.2.3. |
| **The build fails to restore, or an unexpected .NET SDK is used** | `dotnet` was run outside `Platforms\Avalonia`. Run it there, as in step 2.2.1. |
| **Error `GNHNI001`** | The game engine or the game data is missing. Do section 2.1. |
| **Error `GNHNI002` or `GNHNI003`** | A sound bank or tile set file is missing. Do step 1.2.5. |
| **XAML changes do not appear** | The shared XAML files were not converted. Rebuild the native solution with **MauiAndroid** (it needs WSL), then build the Avalonia port again. |

### 🔧 Running

| Problem | Fix |
|:--------|:----|
| **Pressing Start in Visual Studio runs the WinUI 3 version** | `GnollHackM.sln` builds and starts the WinUI 3 version. Start the Avalonia port from its output folder, and attach the debugger, as in section 2.3. |
| **No console output** | The game is a GUI program. Read `%LOCALAPPDATA%\GnollHack-Avalonia\Logs\GnollHack.log` |
| **"GnollHack is already running"** | Another copy uses the same data folder. Close it first; only one copy may run at a time |
| **The game does not start** | The FMOD libraries are missing from the output folder. Do section 2.1, and build the Avalonia port again. |
| **A change to the C code does not show in the game** | The native solution was not built after the change. Do section 2.1, and build the Avalonia port again. |
| **In-game web pages stay empty** | The WebView2 runtime is missing. Do step 1.2.7. |

## 📖 Learn More

- [[/Development/Avalonia Port]]
- [[/Development/Design Details of Windows Avalonia Port]]
- [[/Development/Build Instructions for Avalonia Linux Version on Windows]]
- [[/Development/Overview of Building GnollHack with .NET MAUI]]

## 🔗 External Links

- [Avalonia UI](https://avaloniaui.net/)
- [Microsoft Edge WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
