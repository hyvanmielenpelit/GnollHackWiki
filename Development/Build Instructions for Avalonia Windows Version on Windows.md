> 👉 **The Avalonia port of GnollHack also runs on Windows, through Avalonia's own Windows backend. These instructions build and run it, which is the quickest way to develop and test the Avalonia port without a Linux computer. Windows players get the WinUI 3 version instead, which is built as described in [[/Development/Build Instructions for WinUI3 Version on Windows (.NET MAUI)]].**

For what the Avalonia port is and how its Windows and Linux flavors differ, see [[/Development/Avalonia Port]].

## 📋 Prerequisites

### 💻 Devices

- **Windows computer** with an x64 processor — Windows 10 or later, 16 GB or 32 GB RAM, 512 GB or 1 TB SSD space.

### 🛠️ Software

1. [[/Development/Install Visual Studio 2026 for .NET MAUI Development]]. Of the workloads on that page, this version uses **Desktop development with C++**, with the **MSVC v143** and **Windows 11 SDK** components listed there, and **.NET desktop development**.
2. Install the .NET SDK and the .NET MAUI workload of the Avalonia port. Their versions are pinned in `win\win32\xpl\GnollHackM\Platforms\Avalonia\global.json` and are newer than those of the other modern clients:
    - Download the SDK whose version is `sdk.version` in that file from the [.NET download page](https://dotnet.microsoft.com/en-us/download/dotnet), and install it. It can be a preview or release candidate.
    - Install the workload from that folder, so that the pinned workload version in the same file is used:

    ```powershell
    cd win\win32\xpl\GnollHackM\Platforms\Avalonia
    dotnet workload install maui
    ```

3. Clone the [GnollHack repository](https://github.com/hyvanmielenpelit/GnollHack) — [[/Development/Clone Repository in Visual Studio]].
4. [[/Development/Install Tile Sets and FMOD Sound Banks]]. The Avalonia port uses the **Desktop** sound banks.
5. [[/Development/Install Secrets File]].
6. The **Microsoft Edge WebView2 Runtime**, which shows in-game web pages such as this wiki. Windows 11 includes it; on Windows 10, install it from the [WebView2 download page](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) if it is missing.

## 🛠️ Building

Run the commands from the repository root in PowerShell, unless a step says otherwise.

### 1. Build the Native Solution

The native solution builds the game engine `gnollhackwin.dll` and the `nhdat` game data file, which the Avalonia port on Windows shares with the WinUI 3 version, under `win\win32\xpl\GnollHackM\Platforms\Windows\`. The tile sets and the Desktop sound banks are read straight from `win\win32\tileset` and `win\win32\bank\Desktop`, where you installed them.

1. Open `win\win32\vs\GnollHack.sln` — [[/Development/Open GnollHack Solution in Visual Studio]].
2. Select the **x64** solution platform, and the **Debug** or **Release** configuration.
3. Rebuild the solution.

The same from the command line, with the 64-bit MSBuild, which is the one Visual Studio itself uses:

```powershell
$msbuild = & "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe" -latest -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\amd64\MSBuild.exe
& $msbuild win/win32/vs/GnollHack.sln /t:Rebuild /p:Configuration=Debug /p:Platform=x64
```

Check that these files now exist under `win\win32\xpl\GnollHackM\Platforms\Windows\`:

- `libs\gnollhackwin.dll`
- `gnh\nhdat`

> 💡 **Tip:** The **x64** platform does not convert the shared XAML files. After you edit XAML in `GnollHackX`, rebuild the native solution once with **MauiAndroid**, which needs [[WSL|/Development/Install Windows Subsystem for Linux]].

### 2. Build the Avalonia Port

Run `dotnet` from `Platforms\Avalonia`, so that its `global.json` selects the pinned SDK. The `GnhAvalonia=true` property switches the project to the Avalonia port:

```powershell
cd win\win32\xpl\GnollHackM\Platforms\Avalonia
dotnet build ..\..\GnollHackM.csproj -p:GnhAvalonia=true
```

The game lands in `win\win32\xpl\GnollHackM\bin\Debug\net11.0\win-x64\`, together with its native libraries and game data. Add `-c Release` for a Release build, which lands in `bin\Release\net11.0\win-x64\`.

If the game engine, the game data, a sound bank or a tile set file is missing, the build stops with an error `GNHNI001`, `GNHNI002` or `GNHNI003` that names the file.

> ⚠️ **Warning:** Never run `dotnet` for the Avalonia port from the repository root or from `GnollHackM`. Other `global.json` files, or none, select a different SDK there, and the build fails or uses the wrong one.

### 3. Run the Game

Start `GnollHackM.exe` from the output folder:

```powershell
& win\win32\xpl\GnollHackM\bin\Debug\net11.0\win-x64\GnollHackM.exe
```

To debug it in Visual Studio, start the game, and choose **Debug → Attach to Process**, then select `GnollHackM.exe` with the **Managed (.NET Core, .NET 5+)** code type. Opening `GnollHackM.sln` and pressing the Start button builds the WinUI 3 version, not the Avalonia port.

Saved games and settings go to `%LOCALAPPDATA%\GnollHack-Avalonia`, so the Avalonia port never touches the saved games of the WinUI 3 version.

## 📦 Making a Folder for Testers

A self-contained publish includes the .NET runtime, so it runs on a Windows computer without the SDK:

```powershell
cd win\win32\xpl\GnollHackM\Platforms\Avalonia
dotnet publish ..\..\GnollHackM.csproj -p:GnhAvalonia=true -r win-x64 -f net11.0 -c Release --self-contained true
```

The publish lands in `win\win32\xpl\GnollHackM\bin\Release\net11.0\win-x64\publish\`. Zip that folder and send it; the tester starts `GnollHackM.exe` in it. There is no installer for the Avalonia port on Windows.

Build the native solution in **Release** before a Release publish, so that the published game engine is a Release build too.

## ❓ Troubleshooting

| Symptom | Cause and fix |
|:--------|:--------------|
| The build fails to restore, or an unexpected .NET SDK is used | `dotnet` was run outside `Platforms\Avalonia`, or the pinned SDK or workload is not installed. Install them as described in [[Software|#software]]. |
| Error `GNHNI001` | The game engine or the game data is missing. Do step 1. |
| Error `GNHNI002` or `GNHNI003` | A sound bank or tile set file is missing. [[/Development/Install Tile Sets and FMOD Sound Banks]]. |
| The game does not start | The FMOD libraries are missing from the output folder. Do step 1, and build the Avalonia port again. |
| In-game web pages stay empty | The WebView2 runtime is missing. Install it. |
| XAML changes do not appear | The shared XAML files were not converted. Rebuild the native solution with **MauiAndroid** (it needs WSL), then build the Avalonia port again. |

For general build problems, see [[/Development/Troubleshooting Building GnollHack with .NET MAUI]].

## 📖 Learn More

- [[/Development/Avalonia Port]]
- [[/Development/Design Details of Windows Avalonia Port]]
- [[/Development/Build Instructions for Avalonia Linux Version on Windows]]
- [[/Development/Overview of Building GnollHack with .NET MAUI]]

## 🔗 External Links

- [Avalonia UI](https://avaloniaui.net/)
- [Microsoft Edge WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
