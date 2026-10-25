> 👉 **The Avalonia port of GnollHack also runs on Windows, through Avalonia's own Windows backend. These instructions build and run it, which is the quickest way to develop and test the Avalonia port without a Linux computer. Windows players get the WinUI 3 version instead, which is built as described in [[/Development/Build Instructions for WinUI3 Version on Windows (.NET MAUI)]].**

For what the Avalonia port is and how its Windows and Linux flavors differ, see [[/Development/Avalonia Port]].

## 📋 Prerequisites

### 💻 Devices

- **Windows computer** with an x64 processor — Windows 10 or later, 16 GB or 32 GB RAM, 512 GB or 1 TB SSD space.

### 🛠️ Software

1. [[/Development/Install Visual Studio 2026 for .NET MAUI Development]].
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
6. [[/Development/Install Windows Subsystem for Linux]], and configure its SSH connection in Visual Studio under **Tools → Options → Cross Platform → Connection Manager** (Host Name `127.0.0.1`, Port `22`, and your WSL user name and password). WSL is needed only for the first native build, which stages the tile sets and sound banks; see [[Build the Native Solution|#1-build-the-native-solution]].
7. The **Microsoft Edge WebView2 Runtime**, which shows in-game web pages such as this wiki. Windows 11 includes it; on Windows 10, install it from the [WebView2 download page](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) if it is missing.

## 🛠️ Building

Run the commands from the repository root in PowerShell, unless a step says otherwise.

### 1. Build the Native Solution

The Avalonia port on Windows uses the same native files as the WinUI 3 version: the game engine `gnollhackwin.dll`, the FMOD libraries, the `nhdat` game data file, the tile sets and the Desktop sound banks, all under `win\win32\xpl\GnollHackM\Platforms\Windows\`.

1. Start the SSH server in WSL: `sudo service ssh start`.
2. Open `win\win32\vs\GnollHack.sln` — [[/Development/Open GnollHack Solution in Visual Studio]].
3. Select the **Android+Windows** (or **MauiAndroid**) solution platform, and the **Debug** or **Release** configuration.
4. Rebuild the solution.

The same from the command line:

```powershell
$msbuild = & "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe" -latest -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\MSBuild.exe
& $msbuild win/win32/vs/GnollHack.sln /t:Rebuild /p:Configuration=Debug /p:Platform="Android+Windows"
```

Check that these files now exist under `win\win32\xpl\GnollHackM\Platforms\Windows\`:

- `libs\gnollhackwin.dll`
- `gnh\nhdat`
- `banks\` — six `.bank` files
- `tileset\` — three `.ghpng` files

> 💡 **Tip:** After the first build, the **x64** solution platform is enough when only the C code or the game data changes. It needs no WSL, but it does not stage the tile sets and sound banks, and it does not convert the shared XAML files. Use **Android+Windows** again when those change.

### 2. Build the Avalonia Port

Run `dotnet` from `Platforms\Avalonia`, so that its `global.json` selects the pinned SDK. The `GnhAvalonia=true` property switches the project to the Avalonia port:

```powershell
cd win\win32\xpl\GnollHackM\Platforms\Avalonia
dotnet build ..\..\GnollHackM.csproj -p:GnhAvalonia=true
```

The game lands in `win\win32\xpl\GnollHackM\bin\Debug\net11.0\win-x64\`, together with its native libraries and game data. Add `-c Release` for a Release build, which lands in `bin\Release\net11.0\win-x64\`.

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
| The game starts without graphics or sound | The tile sets or sound banks were not staged. Rebuild the native solution with **Android+Windows**, and check the files listed in step 1. |
| The game does not start | `gnollhackwin.dll` or the FMOD libraries are missing from the output folder. Do step 1, and build the Avalonia port again. |
| In-game web pages stay empty | The WebView2 runtime is missing. Install it. |
| XAML changes do not appear | The shared XAML files were not converted. Rebuild the native solution with **Android+Windows**, then build the Avalonia port again. |

For general build problems, see [[/Development/Troubleshooting Building GnollHack with .NET MAUI]].

## 📖 Learn More

- [[/Development/Avalonia Port]]
- [[/Development/Build Instructions for Avalonia Linux Version on Windows]]
- [[/Development/Overview of Building GnollHack with .NET MAUI]]

## 🔗 External Links

- [Avalonia UI](https://avaloniaui.net/)
- [Microsoft Edge WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
