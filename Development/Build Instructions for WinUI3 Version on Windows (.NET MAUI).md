## Preparations

### Devices

You need the following devices to follow these instructions:
1. **Windows computer** — Windows 10 or later, 16 GB or 32 GB RAM, 512 GB or 1 TB SSD space.

### Software

1. Install the latest Visual Studio version with up-to-date support for .NET MAUI 10.0.
> ℹ️ **Note:** To build the native engine (`GnollHack.sln`), you must also install the **Desktop development with C++** workload and the Windows 10/11 SDKs.
2. Clone this [GnollHack repository](https://github.com/hyvanmielenpelit/GnollHack) — [[/Development/Clone Repository in Visual Studio]].

## Build

1. [[/Development/Install Tile Sets and FMOD Sound Banks]].
2. [[/Development/Install Secrets File]].
3. (Note: You do not need to build the legacy Xamarin.Forms app projects, but you do need the converted XAML UI files. If you are starting fresh or editing XAML files, build the native solution using the **Android+Windows** configuration first to run the XAML translation. > ⚠️ **Warning:** The `Android+Windows` configuration requires a running WSL environment with SSH configured, as it cross-compiles the Android libraries. If you are building purely for Windows and do not have WSL set up, choose the **x64** configuration and run the XAML translation step manually via the `makedefsdroid` project.)
4. Locate `GnollHack.sln` in the `win\win32\vs` directory and open it — [[/Development/Open GnollHack Solution in Visual Studio]].
5. Choose the **x64** solution platform in the menu bar for a pure Windows build. (Or **Android+Windows** if you have WSL configured and need the Android libraries / automatic XAML translation.)
6. Select **Debug** as your solution configuration. You can also use **Release**, when you plan to build a release build.
7. Rebuild the GnollHack solution.
    - This will compile the native C library (`gnollhackwin.dll`), create the NetHack game data file called `nhdat` in Windows format, and copy them together with `credit`, `defaults.gnh`, `license`, `symbols`, `sysconf`, and `xcredits` to `win\win32\xpl\GnollHackM\Platforms\Windows\gnh`.
    - (It will also build ASCII and GUI versions of GnollHack. You may want to check out [[/Development/Build Instructions for ASCII Version on Windows]] and [[/Development/Build Instructions for Windows GUI Version on Windows]] for reference.)
8. Locate `GnollHackM.sln` in `win\win32\xpl\GnollHackM` directory and open it in Visual Studio.
9. Rebuild the GnollHackM solution.

## 🛠️ CLI Build Commands

You can also build from the command line:

```powershell
# Build native solution
$msbuild = & "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe" -latest -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\MSBuild.exe
& $msbuild win/win32/vs/GnollHack.sln /t:Rebuild /p:Configuration=Debug /p:Platform=x64

# Build MAUI solution
dotnet build win/win32/xpl/GnollHackM/GnollHackM.csproj -c Debug -f net10.0-windows10.0.19041.0
```

See also: [[/Development/Troubleshooting Building GnollHack with .NET MAUI]]

## Starting Debugging or Creating Archive

1. [[/Development/Open GnollHackM Solution in Visual Studio]]. This is different from the normal GnollHack solution.
2. Select the right solution configuration in the menu bar:
    - **Debugging** — Select **Debug**.
    - **Archiving** — Select **Release**.

## Debugging

1. [[/Development/Rebuild Solution]].
2. Hit the green **Start button** to start debugging.